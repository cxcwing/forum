var express = require("express");   
var UserRouter = express.Router();
var UserController = require('../../controllers/admin/userController')


UserRouter.post(`/adminApi/user/login`,UserController.login)

module.exports = UserRouter