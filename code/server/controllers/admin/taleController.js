const mysql = require('mysql2')
const moment = require('moment')
const JWT = require("../../util/JWT.js")

const sqlPool = mysql.createPool({
    host: '127.0.0.1',
    port: 3306,
    user: "cunxicao",
    password: '52cunxicao.',
    database: 'froum', 
    connectionLimit: 1
}).promise()
// moment.locale('zh-cn');
async function toTaleAdd(title,type,content,author,authorId,time,cover){
    await sqlPool.query('insert into `tale`(`title`,`type`,`content`,`author`,`authorId`,`time`,``cover) values (?,?,?,?,?,?,?)',[title,type,content,author,authorId,time,cover])
}

async function toGetList(){
    let data = await sqlPool.query(`select * from tale`)
    return data[0]
}

const taleController = {
    taleAdd:async (req,res)=>{

        let cover = `/${req.file.destination.split('/')[1]}/${req.file.filename}`
        // console.log(cover)
        let time = new Date()
        // console.log(time.getDate())
       
        // console.log(time, moment().format('lll') )
        let {title,type,content,author,authorId} = req.body
        await toTaleAdd(title,type,content,author,authorId,time,cover)
        res.send({
            ok:1
        })
    },
    getTaleList:async (req,res)=>{
        let data = await toGetList()
        res.send({
            ok:1,
            data
        })
    }
}


module.exports = taleController