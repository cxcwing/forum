var express = require("express");   
var TaleRouter = express.Router();
var taleController = require('../../controllers/admin/taleController')
const multer  = require('multer')
let fs = require('fs');

let createFolder = function(folder) {
    try {
      fs.accessSync(folder); // 打开文件夹
    } catch (e) {
      fs.mkdirSync(folder); // 创建文件夹
    } 
  };
  let uploadFolder = 'public/taleImage'; // 设定存储文件夹为当前目录下的 /upload 文件夹
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

TaleRouter.post(`/adminApi/tale/taleAdd`,upload.single('file'),taleController.taleAdd)
TaleRouter.get(`/adminApi/tale/getTaleList`,taleController.getTaleList)
TaleRouter.put(`/adminApi/tale/updateIsPublish`,taleController.changePublish)
TaleRouter.get(`/adminApi/tale/getThisTale`,taleController.getThisTale) 
TaleRouter.post(`/adminApi/tale/taleUpdate`,upload.single('file'),taleController.taleUpdate)
TaleRouter.delete(`/adminApi/tale/taleDelete`,taleController.taleDelete)


module.exports = TaleRouter