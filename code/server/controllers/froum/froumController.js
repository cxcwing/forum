const mysql = require('mysql2')
const JWT = require("../../util/JWT.js")
const nodemailer = require("nodemailer");
const { search } = require('../../app.js');
const mailerConfig = {
    host: 'smtp.163.com',
    secureConnection: true,
    port: 465,
    secure: true,
    auth: {
        user: 'cunxicao@163.com',
        pass: 'VLHOSBIHMYKMPZIV'
    }
}
const maileOption = (email, Captcha) => {
    return {

        from: 'cunxicao@163.com',
        to: email,
        subject: `草吧注册验证信息，您的验证码是:${Captcha}`,
        text: `
    <div>
        <p>宝贝您好！</p>
        <br>
        <p>欢迎注册草吧，您的验证码是 :${Captcha}</p>
        
    </div>
    `,
        // attachments:[{   发送附件
        //     filename:'',
        //     path:''  地址
        // }]
    }
}


const sqlPool = mysql.createPool({
    host: '127.0.0.1',
    port: 3306,
    user: "cunxicao",
    password: '52cunxicao.',
    database: 'froum',
    connectionLimit: 1
}).promise()

const transporter = nodemailer.createTransport(mailerConfig)
async function saveCaptcha(idCode, createtime, email) {
    console.log(createtime)
    await sqlPool.query(`insert into token (idCode,createtime,email) values (?,?,?)`, [idCode, createtime, email])
}
async function searchCaptcha(captcha, email) {
    let data = await sqlPool.query('select * from token where idCode = ? and email = ?', [captcha, email])
    return data[0]
}
async function toRegister(username, email, password, captcha) {
    await sqlPool.query(`insert into users (username,email,password) values (?,?,?)`, [username, email, password])
    await sqlPool.query(`delete from token where idCode=? and email=?`, [captcha, email])
}
async function isUserName(username) {
    let data = await sqlPool.query(`select * from users where username = ?`, [username])
    return data[0]
}
async function isEmail(email) {
    let data = await sqlPool.query(`select * from users where email=?`, [email])
    return data[0]
}

async function toLogin(username, password) {
    let data = await sqlPool.query(`select * from users where username=? and password=?`, [username, password])
    return data[0]
}
async function toGetTaleList(id) {
    if (id === 0) {
        //除了id = 6
        let data = await sqlPool.query(`select * from tale where type!=?`, [6])
        return data[0]
    } else {
        let data = await sqlPool.query(`select * from tale where type=?`, [id])
        return data[0]
    }
}
async function toMarck(_id, marckTime) {
    await sqlPool.query(`update users set power = power + 10 where _id=?`, [_id])
    await sqlPool.query(`update users set marckTime=? where _id=?`, [marckTime, _id])
    let data = await sqlPool.query(`select * from users where _id = ?`, [_id])
    return data
}
async function toAddLike(likeArr, num, userGood, taleId, userId) {
    await sqlPool.query(`update users set toGood=? where _id=?`, [userGood, userId])
    await sqlPool.query(`update tale set whoGood=?,goodNumber=? where id=?`, [likeArr, num, taleId])
    let res = await sqlPool.query(`select * from users where _id=?`, [userId])
    return res[0]
}
async function toAddCollection(likeArr, userGood, taleId, userId) {
    await sqlPool.query(`update users set collection=? where _id=?`, [userGood, userId])
    await sqlPool.query(`update tale set whoCollection=? where id=?`, [likeArr,taleId])
    let res = await sqlPool.query(`select * from users where _id=?`, [userId])
    return res[0]
}
async function toGetTale(id) {
    let res = await sqlPool.query(`select * from tale where id=?`, [id])
    return res[0]
}
async function toGetAuthor(id) {
    let res = await sqlPool.query(`select * from users where _id =?`, [id])
    return res[0]
}

const froumController = {
    getPostList: (req, res) => {
        res.send({
            ok: 1
        })
    },
    captchaSend: async (req, res) => {
        maileOption.to = req.body.email
        let Captcha = parseInt(Math.random() * 1000000)
        let createTime = new Date().getTime()
        console.log(createTime)
        await saveCaptcha(Captcha, createTime, req.body.email)
        console.log(req.body.email)
        transporter.sendMail(maileOption(req.body.email, Captcha), (err, info) => {
            if (err) {
                console.log(err)
                res.send({
                    ok: 0,
                    data: '发送失败请稍后重试'
                })
            } else {
                console.log('邮件发送' + info.response)
                res.send({
                    ok: 1,
                    data: '发送成功'
                })
            }
        })

    },
    register: async (req, res) => {
        console.log(req.body)
        let { username, email, password, captcha } = req.body
        let searchRes = await searchCaptcha(captcha, email)


        // console.log(searchRes)


        if (searchRes.length) {
            let time = parseInt((new Date().getTime() - searchRes[0].createtime) / 1000)
            console.log(time)
            let isUserNameRes = await isUserName(username)
            console
            if (isUserNameRes.length) {
                res.send({
                    ok: 0,
                    error: '用户名重复'
                })
            } else {
                let isEmailRes = await isEmail(email)
                if (isEmailRes.length) {
                    res.send({
                        ok: 0,
                        error: '该邮箱已经被注册过'
                    })
                } else {
                    if (time <= 3600) {
                        await toRegister(username, email, password)
                        res.send({
                            ok: 1,
                        })

                    } else {
                        res.send({
                            ok: 0,
                            error: '验证码已经过期'
                        })
                    }
                }
            }
        } else {
            res.send({
                ok: 0,
                error: '验证码错误'
            })
        }



    },
    login: async (req, res) => {
        console.log(req.body)

        let { username, password } = req.body
        let user = await toLogin(username, password)
        if (user.length) {
            let { _id } = user[0]
            let data = user[0]

            delete data.password
            if (data.toGood) {
                data.toGood = JSON.stringify(data.toGood)

            }
            // console.log(data.toGood,data.toGood.length)

            const Ctoken = JWT.create({ username, _id }, '180d')
            // console.log(data,Ctoken)
            res.header("Authorization", Ctoken)
            res.send({
                ok: 1,
                data
            })
        } else {
            res.send({
                ok: 0
            })
        }

    },
    getTaleList: async (req, res) => {
        // console.log(req.query)

        let id = parseInt(req.query.id)
        let { num, page, Hsort } = req.query
        num = parseInt(num)
        page = parseInt(page)
        Hsort = parseInt(Hsort)
        let searchRes = await toGetTaleList(id)
        searchRes.forEach((item) => {
            if (item.whoGood) {
                item.whoGood = JSON.stringify(item.whoGood)
                // console.log(item.whoGood.length)
            }
        })

        let end = num * page
        let begin = end - num

        if (searchRes.length && begin <= searchRes.length) {
            // console.log(data)

            if (Hsort === 0) {
                searchRes.sort((a, b) => parseInt(b.lookNumber) - parseInt(a.lookNumber))

            } else if (Hsort === 1) {
                searchRes.sort((a, b) => {
                    return new Date(b.time) - new Date(a.time)
                })

            }

            if (end > searchRes.length && end - num < searchRes.length) {
                end = searchRes.length
            }

            let data = searchRes.slice(begin, end)

            res.send({
                ok: 1,
                data
            })
        } else {
            // console.log('wu')
            res.send({
                ok: 0,
                error: '暂无数据'
            })
        }

    },

    getTale: async (req, res) => {
        console.log(req.query)
        let id = parseInt(req.query.id)
        let data = await toGetTale(id)

        console.log()
        if (data.length) {
            data = data[0]
            let authorId = data.authorId
            let authorData = await toGetAuthor(authorId)
            if (data.whoCollection) {
                data.whoCollection = JSON.stringify(data.whoCollection)
            }
            if (data.whoGood) {
                data.whoGood = JSON.stringify(data.whoGood)
            }
            if (data.Comment) {
                data.Comment = JSON.stringify(data.Comment)
            }
            if (authorData.length) {
                authorData = authorData[0]
                delete authorData.password
                res.send({
                    ok: 1,
                    data,
                    authorData
                })
            }

        } else {
            res.send({
                ok: 0,
                errorInfo: '查无此故事'
            })
        }

    },






    marck: async (req, res) => {
        // console.log(req.query)
        let _id = parseInt(req.query.id)
        let marckTime = new Date()

        let data = await toMarck(_id, marckTime.getTime())
        data = data[0][0]
        delete data.password
        // console.log(data)
        if (data.toGood) {
            data.toGood = JSON.stringify(data.toGood)
        }
        res.send({
            ok: 1,
            data: data
        })

    },
    like: async (req, res) => {
        let { likeArr, userGood, taleId, userId } = req.body
        // console.log(likeArr,userGood,taleId,userId)
        let num = JSON.parse(likeArr).length
        console.log(likeArr, userGood, taleId, userId)
        let searchRes = await toAddLike(likeArr, num, userGood, taleId, userId)
        if (searchRes.length) {
            let data = searchRes[0]
            delete data.password
            if (data.toGood) {
                data.toGood = JSON.stringify(data.toGood)
            }

            res.send({
                ok: 1,
                data
            })
        } else {
            res.send({
                ok: 0,
                errorInfo: '更新数据失败'
            })
        }

    },
    collection: async (req, res) => {
        let { likeArr, userGood, taleId, userId } = req.body
        // console.log(likeArr,userGood,taleId,userId)

        console.log(likeArr, userGood, taleId, userId)
        let searchRes = await toAddCollection(likeArr,userGood, taleId, userId)
        if (searchRes.length) {
            let data = searchRes[0]
            delete data.password
            if (data.toGood) {
                data.toGood = JSON.stringify(data.toGood)
            }

            res.send({
                ok: 1,
                data
            })
        } else {
            res.send({
                ok: 0,
                errorInfo: '更新数据失败'
            })
        }

    },

}



module.exports = froumController