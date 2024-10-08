var express = require("express");   
var PostRouter = express.Router();
var postController = require('../../controllers/admin/postController')
const multer  = require('multer')
let fs = require('fs');

let createFolder = function(folder) {
    try {
      fs.accessSync(folder); // 打开文件夹
    } catch (e) {
      fs.mkdirSync(folder); // 创建文件夹
    } 
  };
  let uploadFolder = 'public/postImage'; // 设定存储文件夹为当前目录下的 /upload 文件夹
  createFolder(uploadFolder);


  let storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, uploadFolder); // 他会放在当前目录下的 /upload 文件夹下（没有single该文件夹，就新建一个）
    },
    filename: function(req, file, cb) { // 在这里设定文件名
      cb(null, Date.now() +'-' + file.originalname); // file.originalname是将文件名设置为上传时的文件名，file中携带的
      // cb(null, Date.now() + '-' + file.originalname) // 加上Date.now()可以避免命名重复
    }
  })
  let upload = multer({ storage: storage })

  PostRouter.get(`/adminApi/post/getPostList`,postController.getPostList)
  PostRouter.put(`/adminApi/post/updateIsPublish`,postController.changePublish)

  PostRouter.get(`/adminApi/post/getThisPost`,postController.getThisPost)
  PostRouter.post(`/adminApi/post/postAdd`,upload.single('file'),postController.postAdd)
  PostRouter.post(`/adminApi/post/postUpdate`,upload.single('file'),postController.postUpdate)
  PostRouter.delete(`/adminApi/post/postDelete`,postController.postDelete)
   


module.exports = PostRouter