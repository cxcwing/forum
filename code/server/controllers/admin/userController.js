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


async function test(_id,dingzhen){
    // let data = await sqlPool.query(`select * from user where _id = ?`,[_id])
    await sqlPool.query(`update user set username = ? where _id = ?`,[dingzhen,_id])
    // return data
}
async function login(username, password) {
    let data = await sqlPool.query(`select * from user where username=? and password=?`, [username, password])
    return data
}
async function upload(_id, email, username, gender, introduction, avatar) {
    if (avatar != '') {
        await sqlPool.query(`update user set username=?,gender=?,introduction=?,avatar=?,email=? where _id = ?`, [username, gender, introduction, avatar, email, _id])
    } else {
        await sqlPool.query(`update user set username=?,gender=?,introduction=?,email=?where _id = ?`, [username, gender, introduction, avatar,email, _id])
    }
    return 'ok'
}

async function getList(){
    let data = await sqlPool.query(`select * from users`)
    return data
}

const UserController = {
    login: async (req, res) => {
        // console.log(req.body._value.username)
        console.log(req.body)
        let { username, password } = req.body._value
        // console.log(username, password)
        // console.log(_id)
        let user = await login(username, password)  
        // console.log(user[0][0])
        if (user[0].length) {
            let _id = user[0][0]._id
            const token = JWT.create({ username, _id }, '1d')
            res.header("Authorization", token)
            res.send({
                ok: 1,
            })

        } else {
            res.send({
                ok: 0,
                error: "用户名密码不匹配"
            })
        }
    },
    Update: async (req, res) => {
        const token = JWT.verify(req.headers["authorization"].split(' ')[1])
        let { _id } = token
        console.log(_id)
        let { username, email, gender, introduction } = req.body
        
        let avatar = req.file ? `/${req.file.destination.split('/')[1]}/${req.file.filename}` : ""
        // console.log(avatar)
        await upload(_id,email,username,gender,introduction,avatar)
        // let data = await test(_id,'寸夕屮')
        // console.log(data)
        // console.log(_id,token)
        // console.log(req.file)
        // console.log(req.body)
        if (avatar != '') {

            res.send({
                ok: 1,
                data: {
                    username,
                    email,
                    gender,
                    introduction,
                    avatar,
                }
            })
        } else {
            res.send({
                ok: 1,
                data: {
                    username,
                    email,
                    gender,
                    introduction
                }
            })
        }
    },

    getUserList:async(req,res)=>{
        // console.log(req.body)
        let list = await getList()
        console.log(list[0])
        res.send({
            ok:1,
            data:list[0]
        })
    }

}





module.exports = UserController