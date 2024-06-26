import axios from 'axios'

axios.interceptors.request.use(function (config) {
    //请求拦截 每次发送请求都会触发

    let token = localStorage.getItem("Ctoken")
    if(token){
        config.headers.Authorization =  `Bearer ${token}`
    }else{
        console.log("登录凭证过期，请重新登陆")
        // localStorage.removeItem("Ctoken")
    } 
    return config;
  }, function (error) {
  
    return Promise.reject(error);                   
  });

axios.interceptors.response.use(function (response) {
    //响应拦截 每次接受响应都会触发
  
    const {authorization} = response.headers  //解码后端发回的验证信息authorization
    if(authorization){ //如果authorization存在的话，就将它的值设置在本地存储tkoen字段中
        localStorage.setItem("Ctoken",authorization)
    }  
    return response;
  }, function (error) { //如果出现错误401 
    
    const {status} = error.response
    
    if(status===401){
      console.log(error.response.data)
      localStorage.removeItem("Ctoken")
    }
    return Promise.reject(error);
  });
