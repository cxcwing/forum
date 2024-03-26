var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');  
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var userApi = require('./routes/admin/userAPI.js');
var taleApi = require('./routes/admin/taleAPI.js');
var postApi = require('./routes/admin/postAPI.js');
const JWT = require('./util/JWT.js');

var app = express();
// app.use(cors());  
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);

// app.use('/users', usersRouter);

app.use((req,res,next)=>{
  if(req.url === '/adminApi/user/login'){//排除登陆接口
    next()
    return
  } 
  const token = req.headers["authorization"].split(' ')[1]
  // console.log(token)
  if(token){
    let payload = JWT.verify(token) 
    // console.log(payload,11)
    if(payload){
      // console.log('111111111111111111')
      const newToken = JWT.create({
        _id:payload._id,
        username:payload.username
      },"1d")
      res.header("authorization",newToken)
      next()
    }else{
      res.status(401).send({errCode:-1,errInfo:"身份验证过期"})
    }
 
  }else{
     
  }
})


app.use(userApi)
app.use(taleApi)
app.use(postApi)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
