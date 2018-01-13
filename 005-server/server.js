//web服务器  基于http请求的socket.io
'use strict';
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const con = require('./mysql');
const path = require('path');
const pinyin = require('pinyin');
const bodyParser = require('body-parser');
const cookie = require('cookie');

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/api/getAllUser', (req, res)=> {
    con.query('select id,name,name_alias from user', (err, result)=> {
        res.json(result);
    });
});

app.get('/api/getAllUser', (req, res)=> {
    con.query('select * from user', (err, result)=> {
        res.json(result);
    });
});

app.post('/api/register', (req, res)=> {
    let sql = 'insert into user (account,password,name,name_alias) values(?,?,?,?)';
    let alias = pinyin(req.body.name, {
        style: pinyin.STYLE_NORMAL,
    }).join(' ');
    con.query(sql, [req.body.account, req.body.password, req.body.name, alias],
        (err, result)=> {
            if (err) {
                console.log(err.message);
            } else {
                res.json('ok');
            }
        }
    )
});
app.post('/api/login',(req,res)=>{
    con.query(
        'select id,name from user where account = ? and password = ?',
        [req.body.account,req.body.password],
        (err,result)=>{
            if(result.length){
                res.setHeader('Set-Cookie', cookie.serialize('uid', result[0].id, {
                    path:'/',
                    httpOnly: true,
                    maxAge: 60 * 60 * 24 * 7 // 1 week
                }));
                res.json(result[0]);
            } else{
                res.end('error')
            }
        });
});


app.get('/api/getMyInfo',(req,res)=>{
    let id = cookie.parse(req.headers.cookie).uid;
    con.query('select id,name from user where id = ?', [id], (err, result)=> {
        res.json(result[0]);
    })
});


app.get('/*', (req, res)=> {
    res.sendFile(path.resolve('./index.html'))
});


var onlineUser={};

io.on('connection',function (socket) {
    let c = socket.request.headers.cookie;
    if (!c) {
        return;
    }

    let uid = cookie.parse(socket.request.headers.cookie).uid;
    onlineUser[uid] = socket.id;

    socket.emit('news',onlineUser);
    socket.broadcast.emit('news',onlineUser);


    socket.on('message',function (data) {
        socket.broadcast.emit('broad',data);
    });
    socket.on('disconnect',function () {
        delete onlineUser[uid];
        socket.broadcast.emit('news',onlineUser);
    });
    socket.emit('onlineUserChange', onlineUser);
    socket.broadcast.emit('onlineUserChange', onlineUser);
    socket.on('disconnect', ()=> {
        delete onlineUser[uid];
        socket.broadcast.emit('onlineUserChange', onlineUser);
    });
    socket.on('private', (v)=> {
        socket.to(v.data.to.sid).emit('incomingMessage', v)
    })

});

//1.用户一旦连接，发送所有在线的人
//2.一旦有新用户进入，服务器推送所有在线的人
//3.有用户退出，服务器推送所有在线的人
server.listen(18080, ()=> {
    console.log('服务器在18080端口启动');
});

