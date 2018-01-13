'use strict';
const mysql = require('mysql');
const con = mysql.createConnection({
    host: 'sqld.duapp.com',
    user: '5f6f601b2181410a83f7e2ce5164d2cd',
    port: '4050',
    password: 'd7d3bde6f87a444ba75d321a00ec4ff5',
    database: 'EmUfysPQPNlkSvrCVAAk'
});
module.exports = con;