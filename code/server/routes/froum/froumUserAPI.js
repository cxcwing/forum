var express = require("express");   
var FroumUserRouter = express.Router();
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
 
 FroumUserRouter.get("/froumApi/froum/marck",FroumController.marck)
 FroumUserRouter.post("/froumApi/froum/like",FroumController.like)
 FroumUserRouter.post("/froumApi/froum/collection",FroumController.collection)

 FroumUserRouter.post("/froumApi/froum/commentUpdate",FroumController.commentUpdate)

 FroumUserRouter.post("/froumApi/froum/postLike",FroumController.postLike)

 FroumUserRouter.post("/froumApi/froum/collectionPost",FroumController.collectionPost)

 FroumUserRouter.post("/froumApi/froum/commentUpdatePost",FroumController.commentUpdatePost)

 FroumUserRouter.get("/froumApi/froum/getUser",FroumController.getUser)
 FroumUserRouter.get("/froumApi/froum/getUserArticle",FroumController.getUserArticle)

 FroumUserRouter.post("/froumApi/froum/usersUpdate",upload.single('file'),FroumController.usersUpdate)
 FroumUserRouter.post("/froumApi/froum/getLike",FroumController.getLike)
 FroumUserRouter.post("/froumApi/froum/getLikePost",FroumController.getLikePost)
 FroumUserRouter.post("/froumApi/froum/getCollection",FroumController.getCollection)
 FroumUserRouter.post("/froumApi/froum/getCollectionPost",FroumController.getCollectionPost)

module.exports = FroumUserRouter