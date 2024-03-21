import axios from 'axios'

axios.interceptors.request.use(function (config) {
    //请求拦截
    let token = localStorage.getItem("token")
    if(token){
        config.headers.Authorization =  `Bearer ${token}`
    }else{
        console.log("登录凭证过期，请重新登陆")
    }
    return config;
  }, function (error) {
  
    return Promise.reject(error);
  });

axios.interceptors.response.use(function (response) {
    //响应拦截
    // console.log(response.headers.authorization)
    const {authorization} = response.headers
    if(authorization){
        localStorage.setItem("token",authorization)
    }
    return response;
  }, function (error) {
    const {status} = error.response
    if(status===401){
        window.location.href="#/login"
    }
    return Promise.reject(error);
  });