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


async function login(username, password) {
    let data = await sqlPool.query(`select * from user where username=? and password=?`, [username, password])
    return data
}


const UserController = {
    login: async (req, res) => {
        // console.log(req.body._value.username)
        let { username, password} = req.body._value
        // console.log(username, password)
        // console.log(_id)
        let user = await login(username, password)
        console.log(user[0][0])
        let _id = user[0][0]._id
        if (user[0].length) {
            const token = JWT.create({username,_id},'1d')
            res.header("Authorization",token)
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

}





module.exports = UserController