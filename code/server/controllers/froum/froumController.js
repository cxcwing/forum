const mysql = require('mysql2')
const JWT = require("../../util/JWT.js")
const nodemailer = require("nodemailer");
const { search } = require('../../app.js');
const { imageAdd } = require('../admin/userController.js');

const mailerConfig = {
    host: 'smtp.163.com',
    secureConnection: true,
    port: 465,
    secure: true,
    auth: {
        user: 'cunxicao@163.com',
        pass: ''
    }
}
const maileOption = (email, Captcha) => {
    return {

        from: 'cunxicao@163.com',
        to: email,
        subject: `草吧注册验证信息，您的验证码是:${Captcha}`,
        text: `
   
        宝贝您好！
    
        欢迎注册草吧，您的验证码是 :${Captcha}
        
  
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
        let data = await sqlPool.query(`select * from tale where type!=? and isPublish != 0`, [6])
        return data[0]
    } else {
        let data = await sqlPool.query(`select * from tale where type=? and isPublish != 0`, [id])
        return data[0]
    }
}
async function toMarck(_id, marckTime) {
    await sqlPool.query(`update users set power = power + 10 where _id=?`, [_id])
    await sqlPool.query(`update users set marckTime=? ,level = power/200 where _id=?`, [marckTime, _id])
    let data = await sqlPool.query(`select * from users where _id = ?`, [_id])
    return data
}
async function toAddLike(likeArr, num, userGood, taleId, userId) {
    await sqlPool.query(`update users set toGood=? where _id=?`, [userGood, userId])
    await sqlPool.query(`update tale set whoGood=?,goodNumber=? where id=?`, [likeArr, num, taleId])
    let res = await sqlPool.query(`select * from users where _id=?`, [userId])
    return res[0]
}
async function toAddPostLike(likeArr, num, userGood, taleId, userId) {
    await sqlPool.query(`update users set toGoodPost=? where _id=?`, [userGood, userId])
    await sqlPool.query(`update post set whoGood=?,goodNumber=? where id=?`, [likeArr, num, taleId])
    let res = await sqlPool.query(`select * from users where _id=?`, [userId])
    return res[0]
}
async function toAddCollection(likeArr, userGood, taleId, userId) {
    await sqlPool.query(`update users set collection=? where _id=?`, [userGood, userId])
    await sqlPool.query(`update tale set whoCollection=? where id=?`, [likeArr, taleId])
    let res = await sqlPool.query(`select * from users where _id=?`, [userId])
    return res[0]
}
async function toAddCollectionPost(likeArr, userGood, taleId, userId) {
    await sqlPool.query(`update users set collectionPost=? where _id=?`, [userGood, userId])
    await sqlPool.query(`update post set whoCollection = ? where id=?`, [likeArr, taleId])
    let res = await sqlPool.query(`select * from users where _id=?`, [userId])
    return res[0]
}
async function toGetTale(id) {
    await sqlPool.query(`update tale set lookNumber = lookNumber + 1 where id=?`, [id])
    let res = await sqlPool.query(`select * from tale where id=? and isPublish != 0`, [id])
    return res[0]
}
async function toGetAuthor(id) {
    let res = await sqlPool.query(`select * from users where _id =? `, [id])
    return res[0]
}

async function toCommentUpdate(textId, content, userId, userName, userAvatar) {
    await sqlPool.query(`insert into comment (textId,content,userId,userName,userAvatar) values (?,?,?,?,?)`, [textId, content, userId, userName, userAvatar])
    await sqlPool.query(`update tale set Comment = Comment + 1 where id=?`, [textId])

}
async function toCommentUpdatePost(textId, content, userId, userName, userAvatar) {
    await sqlPool.query(`insert into comment (postId,content,userId,userName,userAvatar) values (?,?,?,?,?)`, [textId, content, userId, userName, userAvatar])
    await sqlPool.query(`update post set Comment = Comment + 1 where id=?`, [textId])

}

async function toGetTaleComment(id) {
    let res = await sqlPool.query(`select * from comment where textId = ?`, [id])
    return res[0]
}
async function toGetPostComment(id) {
    let res = await sqlPool.query(`select * from comment where postId = ?`, [id])
    return res[0]
}
async function toGetAuthor(id) {
    let res = await sqlPool.query(`select * from users where _id = ?`, [id])
    return res[0]
}
async function toGetPost() {
    let res = await sqlPool.query(`select * from post where isPublish != 0`)
    return res[0]
}
async function toGetAllTale() {
    let res = await sqlPool.query(`select * from tale where isPublish != 0`)
    return res[0]
}

async function toGetPostList(id) {

    if (id === 100) {

        let data = await sqlPool.query(`select * from post where isPublish != 0`)
        return data[0]
    } else {
        let data = await sqlPool.query(`select * from post where type=? and isPublish != 0`, [id])
        return data[0]
    }


}
async function toGetThePost(id) {
    await sqlPool.query(`update post set lookNumber = lookNumber + 1 where id=?`, [id])
    let res = await sqlPool.query(`select * from post where id=? and isPublish != 0`, [id])
    return res[0]
}
async function toUserUpdate(_id, username, gender, introduction, avatar) {
    if (avatar != '') {
        await sqlPool.query(`update users set username=?,gender=?,introduction=?,avatar=? where _id=?`, [username, gender, introduction, avatar, _id])
    } else {
        await sqlPool.query(`update users set username=?,gender=?,introduction=? where _id=?`, [username, gender, introduction, _id])
    }
}
async function toGetLike(list) {
    let data = await sqlPool.query(`select * from tale where id in (?)`, [list])
    return data[0]
}
async function toGetLikePost(list) {
    let data = await sqlPool.query(`select * from Post where id in (?)`, [list])
    return data[0]
}
async function toGetCollection(list) {
    let data = await sqlPool.query(`select * from tale where id in (?)`, [list])
    return data[0]
}
async function toGetCollectionPost(list) {
    let data = await sqlPool.query(`select * from Post where id in (?)`, [list])
    return data[0]
}
async function toGetUserPost(id) {
    let res = await sqlPool.query(`select * from post where authorId = ?`, [id])
    return res[0]
}
async function toDeleteUserPost(id) {
    await sqlPool.query(`delete from post where id = ?`, [id])

}
async function toGetUserTale(id) {
    let res = await sqlPool.query(`select * from tale where authorId = ?`, [id])
    return res[0]
}
async function toDeleteUserTale(id) {
    await sqlPool.query(`delete from tale where id = ?`, [id])

}
async function toAddUserPost(title, type, content, author, authorId, time, cover) {
    await sqlPool.query('insert into `post`(`title`,`type`,`content`,`author`,`authorId`,`time`,`cover`) values (?,?,?,?,?,?,?)', [title, type, content, author, authorId, time, cover])
    await sqlPool.query('update users set postNum = postNum + 1 where _id=?',[authorId])
}
async function toAddUserTale(title, type, content, author, authorId, time, cover) {
    await sqlPool.query('insert into `tale`(`title`,`type`,`content`,`author`,`authorId`,`time`,`cover`) values (?,?,?,?,?,?,?)', [title, type, content, author, authorId, time, cover])
    await sqlPool.query('update users set taleNum = taleNum + 1 where _id=?',[authorId])
}
async function toPostUpdate(id,title,type,content,author,authorId,time,cover){
    await sqlPool.query(`update users set title = ?,type = ?,content = ?,author = ?,authorId = ?,time = ?,cover = ? where id = ?`,[title,type,content,author,authorId,time,cover,id])
  
}

async function toTaleUpdate(id,title,type,content,author,authorId,time,cover){
    await sqlPool.query(`update tale set title = ?,type = ?,content = ?,author = ?,authorId = ?,time = ?,cover = ? where id = ?`,[title,type,content,author,authorId,time,cover,id])
}


const froumController = {
    getPostList: async (req, res) => {
        let id = parseInt(req.query.id)
        let { num, page, Hsort } = req.query
        num = parseInt(num)
        page = parseInt(page)
        Hsort = parseInt(Hsort)
        let searchRes = await toGetPostList(id)
        searchRes.forEach((item) => {
            if (item.whoGood) {
                item.whoGood = JSON.stringify(item.whoGood)

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
    getPost: async (req, res) => {

        let id = parseInt(req.query.id)
        let data = await toGetThePost(id)

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
                errorInfo: '查无此贴'
            })
        }
    },

    captchaSend: async (req, res) => {
        maileOption.to = req.body.email
        let Captcha = parseInt(Math.random() * 1000000)
        let createTime = new Date().getTime()
   
        await saveCaptcha(Captcha, createTime, req.body.email)
    
        transporter.sendMail(maileOption(req.body.email, Captcha), (err, info) => {
            if (err) {
    
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
     
        let { username, email, password, captcha } = req.body
        let searchRes = await searchCaptcha(captcha, email)


        // console.log(searchRes)


        if (searchRes.length) {
            let time = parseInt((new Date().getTime() - searchRes[0].createtime) / 1000)
  
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
      

        let { username, password } = req.body
        let user = await toLogin(username, password)
        if (user.length) {
            let { _id } = user[0]
            let data = user[0]

            delete data.password
            if (data.toGood) {
                data.toGood = JSON.stringify(data.toGood)

            }
            if (data.toGoodPost) {
                data.toGoodPost = JSON.stringify(data.toGoodPost)
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

        let id = parseInt(req.query.id)
        if (id) {
            let data = await toGetTale(id)


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

        } else {
            res.send({ ok: 0, errorInfo: '查无此故事' })
        }

    },
    getTaleComment: async (req, res) => {

        let id = parseInt(req.query.id)
        let searchRes = await toGetTaleComment(id)
    
        res.send({
            ok: 1,
            data: searchRes
        })
    },
    getPostComment: async (req, res) => {

        let id = parseInt(req.query.id)
        let searchRes = await toGetPostComment(id)

        res.send({
            ok: 1,
            data: searchRes
        })
    },

    getAuthor: async (req, res) => {

        let id = parseInt(req.query.id)
        let searchRes = await toGetAuthor(id)
        if (searchRes.length) {
            let data = searchRes[0]
            delete data.password
            delete data.email
            res.send({
                ok: 1,
                data
            })
        } else {
            res.send({
                ok: 0,
                errorInfo: '查无此人'
            })
        }

    },
    getHot: async (req, res) => {
        let postRes = await toGetPost()
        let taleRes = await toGetAllTale()
        let list = [...postRes, ...taleRes]
        list.sort((a, b) => (b.goodNumber + b.lookNumber) - (a.goodNumber + a.lookNumber))
        if (list.length >= 6) {
            let data = list.slice(0, 6)

            res.send({
                ok: 1,
                data
            })
        } else {
            res.send({
                ok: 1,
                data: list
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
        if (data.toGoodPost) {
            data.toGoodPost = JSON.stringify(data.toGoodPost)
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
    postLike: async (req, res) => {
        let { likeArr, userGood, taleId, userId } = req.body
        // console.log(likeArr,userGood,taleId,userId)
        let num = JSON.parse(likeArr).length
        // console.log(likeArr, userGood, taleId, userId)
        let searchRes = await toAddPostLike(likeArr, num, userGood, taleId, userId)
        if (searchRes.length) {
            let data = searchRes[0]
            delete data.password 
            if (data.toGood) {
                data.toGood = JSON.stringify(data.toGood)
            }
            if (data.toGoodPost) {
                data.toGoodPost = JSON.stringify(data.toGoodPost)
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

        // console.log(likeArr, userGood, taleId, userId)
        let searchRes = await toAddCollection(likeArr, userGood, taleId, userId)
        if (searchRes.length) {
            let data = searchRes[0]
            delete data.password
            if (data.toGood) {
                data.toGood = JSON.stringify(data.toGood)
            }
            if (data.toGoodPost) {
                data.toGoodPost = JSON.stringify(data.toGoodPost)
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
    collectionPost: async (req, res) => {
        let { likeArr, userGood, taleId, userId } = req.body
        // console.log(likeArr,userGood,taleId,userId)

        // console.log(likeArr, userGood, taleId, userId)
        let searchRes = await toAddCollectionPost(likeArr, userGood, taleId, userId)
        if (searchRes.length) {
            let data = searchRes[0]
            delete data.password
            if (data.toGoodPost) {
                data.toGoodPost = JSON.stringify(data.toGoodPost)
            }
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
    commentUpdate: async (req, res) => {
        let { textId, content, userId, userName, userAvatar } = req.body
        // console.log(textId, content, userId, userName, userAvatar)
        await toCommentUpdate(textId, content, userId, userName, userAvatar)

        res.send({
            ok: 1
        })
    },
    commentUpdatePost: async (req, res) => {
        let { textId, content, userId, userName, userAvatar } = req.body
        // console.log(textId, content, userId, userName, userAvatar)
        await toCommentUpdatePost(textId, content, userId, userName, userAvatar)

        res.send({
            ok: 1
        })
    },
    getUser: async (req, res) => {

        let _id = parseInt(req.query.id)
        let searchRes = await sqlPool.query('select * from users where _id = ?', [_id])
        searchRes = searchRes[0]
        if (searchRes.length) {
            let data = searchRes[0]
            delete data.password
            if (data.toGoodPost) {
                data.toGoodPost = JSON.stringify(data.toGoodPost)
            }
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
                errorInfo: '查无此人'
            })
        }
    },
    getUserArticle: async (req, res) => {

        let id = parseInt(req.query.id)
        let postList = await sqlPool.query(`select * from post where authorId = ?`, [id])
        let taleList = await sqlPool.query(`select * from tale where authorId = ?`, [id])
        postList = postList[0]
        taleList = taleList[0]

        res.send({
            ok: 1,
            postList,
            taleList
        })
    },
    usersUpdate: async (req, res) => {
        // console.log(req.body)
        let { _id, username, gender, introduction } = req.body
        // console.log(req.file)
        _id = Number(_id)
        // console.log(_id, username, gender, introduction)
        let avatar = req.file ? `/${req.file.destination.split('/')[1]}/${req.file.filename}` : ''
        await toUserUpdate(_id, username, gender, introduction, avatar)

        res.send({
            ok: 1,
            data: {
                _id,
                username,
                gender,
                introduction,
                avatar
            }
        })
    },
    getLike: async (req, res) => {

        if (req.body.toGood && req.body.toGood.length) {

            like = req.body.toGood
            //    console.log(like.join(','))

            let searchRes = await toGetLike(like)

            res.send({
                ok: 1,
                data: JSON.stringify(searchRes)
            })
        } else {
            res.send({
                ok: 1,
                data: JSON.stringify([])
            })
        }


    },
    getLikePost: async (req, res) => {
        if (req.body.toGoodPost) {
            let like = req.body.toGoodPost
            let searchRes = await toGetLikePost(like)
            // console.log(searchRes.length)
            res.send({
                ok: 1,
                data: JSON.stringify(searchRes)
            })
        } else {
            res.send({
                ok: 1,
                data: JSON.stringify([])
            })
        }
    },
    getCollection: async (req, res) => {

        if (req.body.Collection && req.body.collection.length) {

            Collection = req.body.collection
            //    console.log(like.join(','))

            let searchRes = await toGetCollection(Collection)

            res.send({
                ok: 1,
                data: JSON.stringify(searchRes)
            })
        } else {
            res.send({
                ok: 1,
                data: JSON.stringify([])
            })
        }


    },
    getCollectionPost: async (req, res) => {
        if (req.body.collectionPost) {
            let Collection = req.body.collectionPost
            let searchRes = await toGetCollectionPost(Collection)
            // console.log(searchRes.length)
            res.send({
                ok: 1,
                data: JSON.stringify(searchRes)
            })
        } else {
            res.send({
                ok: 1,
                data: JSON.stringify([])
            })
        }
    },
    getUserPost: async (req, res) => {
        let id = parseInt(req.query.id)
        let searchRes = await toGetUserPost(id)
        let data = searchRes
        res.send({
            ok: 1,
            data
        })
    },
    deleteUserPost: async (req, res) => {
        const token = req.headers["authorization"].split(' ')[1]
        let authorId = parseInt(req.query.authorId)
        let id = parseInt(req.query.id)

        if (token) {
            let payload = JWT.verify(token)
            if (payload && payload._id === authorId) {
                await toDeleteUserPost(id)
                res.send({
                    ok: 1
                })
            } else {
                res.send({
                    ok: 0,
                    errorInfo: '无权限删除'
                })
            }
        } else {
            res.send({
                ok: 0,
                errorInfo: '无权限删除'
            })
        }


    },
    getUserTale: async (req, res) => {
        let id = parseInt(req.query.id)
        let searchRes = await toGetUserTale(id)
        let data = searchRes
        res.send({
            ok: 1,
            data
        })
    },
    deleteUserTale: async (req, res) => {
        const token = req.headers["authorization"].split(' ')[1]
        let authorId = parseInt(req.query.authorId)
        let id = parseInt(req.query.id)

        if (token) {
            let payload = JWT.verify(token)
            if (payload && payload._id === authorId) {
                await toDeleteUserTale(id)
                res.send({
                    ok: 1
                })
            } else {
                res.send({
                    ok: 0,
                    errorInfo: '无权限删除'
                })
            }
        } else {
            res.send({
                ok: 0,
                errorInfo: '无权限删除'
            })
        }

    },
    addUserPost: async (req, res) => {


        let cover = `/${req.file.destination.split('/')[1]}/${req.file.filename}`
        // console.log(cover)
        let time = new Date()
        // console.log(time.getDate())

        // console.log(time, moment().format('lll') )
        let { title, type, content, author, authorId } = req.body
        await toAddUserPost(title, type, content, author, authorId, time, cover)
        res.send({
            ok: 1
        })
    },
    imageAdd: (req, res) => {

        // console.log(req.file)
        let avatar = `/${req.file.destination.split('/')[1]}/${req.file.filename}`
        res.send({
            "url": `http://localhost:3000/${avatar}`
        })
    },
    addUserTale: async (req, res) => {
        let cover = `/${req.file.destination.split('/')[1]}/${req.file.filename}`
        // console.log(cover)
        let time = new Date()
        // console.log(time.getDate())

        // console.log(time, moment().format('lll') )
        let { title, type, content, author, authorId } = req.body
        await toAddUserTale(title, type, content, author, authorId, time, cover)
        res.send({
            ok: 1
        })
    },
    postUpdate: async (req, res) => {

        let cover = `/${req.file.destination.split('/')[1]}/${req.file.filename}`
        // console.log(cover)
        let time = new Date()
        // console.log(time.getDate())

        // console.log(time, moment().format('lll') )
        let { id, title, type, content, author, authorId } = req.body
        id = parseInt(id)
        authorId = parseInt(authorId)
      
        await toPostUpdate(id, title, type, content, author, authorId, time, cover)
        res.send({
            ok: 1
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
}



module.exports = froumController