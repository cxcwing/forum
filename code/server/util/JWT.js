const jsonwebtoken = require('jsonwebtoken')
const secret = "52cunxicaoNie"
const JWT = {
    //expries 多长时间过期
    create(value,expries){
        return jsonwebtoken.sign(value,secret,{expiresIn:expries})
    },
    verify(token){
       try{
        return jsonwebtoken.verify(token,secret)
       }catch(err){
        return false
       }
    }
}



module.exports = JWT