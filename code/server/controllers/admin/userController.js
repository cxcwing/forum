const mysql = require('mysql2')
const sqlPool = mysql.createPool({
    host: '127.0.0.1',
    port: 3306,
    user: "cunxicao",
    password: '52cunxicao.',
    database: 'froum',
    connectionLimit: 1
  }).promise()

const UserController = {
    login:async (req,res)=>{
        let user = await sqlPool.query(`select * from user`)
        console.log(user[0])
        res.send({ok:1})
    },

}





module.exports = UserController