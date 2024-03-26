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
async function toPostAdd(title,type,content,author,authorId,time,cover){
    await sqlPool.query('insert into `post`(`title`,`type`,`content`,`author`,`authorId`,`time`,`cover`) values (?,?,?,?,?,?,?)',[title,type,content,author,authorId,time,cover])
}


async function toGetList(){
    let data = await sqlPool.query(`select * from post`)
    return data[0]
}

async function toChangePublish(id,isPublish){
    await sqlPool.query('update post set isPublish = ? where id = ?',[isPublish,id])
}

async function toGetThisPost(id){
    let res = await sqlPool.query('select * from post where id=?',[id])
    return res[0]
}

async function toPostUpdate(id,title,type,content,author,authorId,time,cover){
    await sqlPool.query(`update post set title = ?,type = ?,content = ?,author = ?,authorId = ?,time = ?,cover = ? where id = ?`,[title,type,content,author,authorId,time,cover,id])
}
async function toPostDelete(id){
    await sqlPool.query(`delete from post where id = ?`,[id])
}

const postController = {
    postAdd:async (req,res)=>{

        let cover = `/${req.file.destination.split('/')[1]}/${req.file.filename}`
        // console.log(cover)
        let time = new Date()
        // console.log(time.getDate())
        
        // console.log(time, moment().format('lll') )
        let {title,type,content,author,authorId} = req.body
        await toPostAdd(title,type,content,author,authorId,time,cover)
        res.send({
            ok:1
        })
    },
    getPostList:async (req,res)=>{
        let data = await toGetList()
        res.send({
            ok:1,
            data
        })
    },
    changePublish:async (req,res) =>{
        console.log(req.body.id,req.body.isPublish)
        await toChangePublish(req.body.id,req.body.isPublish)
        res.send({
            ok:1 
        })
    },
    getThisPost:async (req,res) =>{
        // console.log(req.body.id,'111')
        // console.log(req.query)
        let id = Number(req.query.id)

        // let id = req.boyd.id
        let data = await toGetThisPost(id)
        // console.log(data)
        res.send({
            ok:1,
            data:data[0] 
        }) 
    },
    postUpdate:async (req,res)=>{
        
        let cover = `/${req.file.destination.split('/')[1]}/${req.file.filename}`
        // console.log(cover)
        let time = new Date()
        // console.log(time.getDate())
       
        // console.log(time, moment().format('lll') )
        let {id,title,type,content,author,authorId} = req.body
        await toPostUpdate(id,title,type,content,author,authorId,time,cover)
        res.send({
            ok:1 
        }) 
    },
    postDelete:async (req,res)=>{
        let id = req.query.id
        
        console.log(id)
        await toPostDelete(id)
        res.send({
            ok:1
        })
    }
}


module.exports = postController  