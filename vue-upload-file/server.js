const express=require('express');
const server=express();
const path=require('path');
const fs=require('fs');
server.use(express.static('./public'));
server.get('/',(req,res)=>{
    res.sendFile(path.resolve('./views/index.html'))
});
server.get('/getFileList',(req,res)=>{
    res.json(fs.readdirSync('./upload'))
});


// 查看文件
const query=require('querystring');
server.get('/look/*',(req,res)=>{
    var fileName=path.basename(query.unescape(req.url));
    res.writeHeader(200,{'Content-Type':'text/plain'});
    var rs=fs.createReadStream(path.join(__dirname,'upload',fileName));
    rs.pipe(res);
    res.on('end',()=>{
        res.end('ok')
    })

});


// 上传文件
const multer=require('multer');
const upload=multer({dest:'./upload'});

server.post('/uploadList',upload.single('file'),(req,res)=>{
    console.log(req.file);
    fs.rename(
        req.file.path,
        path.resolve('upload',req.file.originalname),
        (err)=>{
            if(err){
                console.log(err.message)
            }else{
                res.end('ok')
            }
        }
    )
});


server.listen(3000);