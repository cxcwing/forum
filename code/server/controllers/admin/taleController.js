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
    await sqlPool.query('insert into `tale`(`title`,`type`,`content`,`author`,`authorId`,`time`,`cover`) values (?,?,?,?,?,?,?)',[title,type,content,author,authorId,time,cover])
}


async function toGetList(){
    let data = await sqlPool.query(`select * from tale`)
    return data[0]
}

async function toChangePublish(id,isPublish){
    await sqlPool.query('update tale set isPublish = ? where id = ?',[isPublish,id])
}

async function toGetThisTale(id){
    let res = await sqlPool.query('select * from tale where id=?',[id])
    return res[0]
}

async function toTaleUpdate(id,title,type,content,author,authorId,time,cover){
    await sqlPool.query(`update tale set title = ?,type = ?,content = ?,author = ?,authorId = ?,time = ?,cover = ? where id = ?`,[title,type,content,author,authorId,time,cover,id])
}

async function toTaleDelete(id){
    await sqlPool.query(`delete from tale where id = ?`,[id])
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
    },
    changePublish:async (req,res) =>{

        await toChangePublish(req.body.id,req.body.isPublish)
        res.send({
            ok:1 
        })
    },
    getThisTale:async (req,res) =>{
        // console.log(req.body.id,'111')
        // console.log(req.query)
        let id = Number(req.query.id)

        // let id = req.boyd.id
        let data = await toGetThisTale(id)
        // console.log(data)
        res.send({
            ok:1,
            data:data[0] 
        }) 
    },
    taleUpdate:async (req,res)=>{
        
        let cover = `/${req.file.destination.split('/')[1]}/${req.file.filename}`
        // console.log(cover)
        let time = new Date()
        // console.log(time.getDate())
       
        // console.log(time, moment().format('lll') )
        let {id,title,type,content,author,authorId} = req.body
        await toTaleUpdate(id,title,type,content,author,authorId,time,cover)
        res.send({
            ok:1 
        }) 
    },
    taleDelete:async (req,res)=>{
        let id = req.query.id
        
        console.log(id)
        await toTaleDelete(id)
        res.send({
            ok:1
        })
    }
}


module.exports = taleController  