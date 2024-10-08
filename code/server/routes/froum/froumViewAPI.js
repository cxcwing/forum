var express = require("express");   
var FroumViewRouter = express.Router();
var FroumController = require('../../controllers/froum/froumController')
const multer  = require('multer')
let fs = require('fs');
let createFolder = function(folder) {
    try {
      fs.accessSync(folder); // 打开文件夹
    } catch (e) {
      fs.mkdirSync(folder); // 创建文件夹
    } 
  };
  let uploadFolder = 'public/images'; // 设定存储文件夹为当前目录下的 /upload 文件夹
  createFolder(uploadFolder);

  let storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, uploadFolder); // 他会放在当前目录下的 /upload 文件夹下（没有该文件夹，就新建一个）
    },
    filename: function(req, file, cb) { // 在这里设定文件名
      cb(null, Date.now() +'-' + file.originalname); // file.originalname是将文件名设置为上传时的文件名，file中携带的
      // cb(null, Date.now() + '-' + file.originalname) // 加上Date.now()可以避免命名重复
    }
  })
 
let upload = multer({ storage: storage })


FroumViewRouter.get(`/froumAPI/froumView/getPostList`,FroumController.getPostList)


FroumViewRouter.post('/froumApi/froum/captchaSend',FroumController.captchaSend)
FroumViewRouter.post('/froumApi/froum/register',FroumController.register)
FroumViewRouter.post('/froumApi/froum/login',FroumController.login)

FroumViewRouter.get('/froumApi/froum/getTaleList',FroumController.getTaleList)
FroumViewRouter.get('/froumApi/froum/getTale',FroumController.getTale)
FroumViewRouter.get('/froumApi/froum/getTaleComment',FroumController.getTaleComment)
FroumViewRouter.get('/froumApi/froum/getAuthor',FroumController.getAuthor)
FroumViewRouter.get('/froumApi/froum/getHot',FroumController.getHot)

FroumViewRouter.get('/froumApi/froum/getPostList',FroumController.getPostList)
FroumViewRouter.get('/froumApi/froum/getPost',FroumController.getPost)
FroumViewRouter.get('/froumApi/froum/getPostComment',FroumController.getPostComment)

FroumViewRouter.post('/froumApi/froum/captchaSendForget',FroumController.captchaSendForget)
FroumViewRouter.post('/froumApi/froum/rePassword',FroumController.rePassword)


FroumViewRouter.get('/froumApi/froum/getSearchList',FroumController.getSearchList)

module.exports = FroumViewRouter    
