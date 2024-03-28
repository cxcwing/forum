const mysql = require('mysql2')
const JWT = require("../../util/JWT.js")

const sqlPool = mysql.createPool({
    host: '127.0.0.1',
    port: 3306,
    user: "cunxicao",
    password: '52cunxicao.',
    database: 'froum', 
    connectionLimit: 1
}).promise()


const froumController = {
    getPostList:(req,res)=>{
        res.send({
            ok:1
        })
    }
}

module.exports = froumController