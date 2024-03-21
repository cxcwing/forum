<template>
    <div id="body">
        <div :class="container">
            <div class="container-form container-signup">
                <div action="#" class="form" id="form1">
                    <h2 class="form-title">注册账号</h2>
                    <input type="email" v-model="userForm.email" placeholder="email" class="input" required>
                    <input type="text" v-model="userForm.username" placeholder="username" class="input" required>
                    <input type="password" v-model="userForm.password" placeholder="password" class="input" required>
                    <button type="button" class="btn" @click="handleJoin">点击注册</button>
                </div>
            </div>

            <div class="container-form container-signin">
                <div action="#" class="form" id="form2">
                    <h2 class="form-title">欢迎登陆</h2>

                    <input type="text" v-model="userForm.username" placeholder="username" class="input" required>
                    <input type="password" v-model="userForm.password" placeholder="password" class="input" required>
                    <a href="#" class="link">忘记密码</a>
                    <button type="button" class="btn" @click="handleLogin">登陆</button>
                </div>
            </div>


            <div class="container-overlay">
                <div class="overlay">
                    <div class="overlay-panel over-left">
                        <button class="btn" id="signIn" @click="signIn">已有账号,点击登陆
                        </button>
                    </div>
                    <div class="overlay-panel over-right">
                        <button class="btn" id="signUp" @click="signUp">没有账号,点击登陆
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>

import { ref } from 'vue'
import axios from 'axios';
import upLoad from '@/util/upLoad.js'
import { ElMessage } from 'element-plus'
import router from '@/router';
import { useStore } from 'vuex';
const store = useStore()
let userForm = ref({})
let container = ref('container')



const handleLogin = () => {
    if (userForm.value.username && userForm.value.password) {
        
        axios.post('/adminApi/user/login',userForm).then(res=>{
            console.log(res.data)
            if(res.data.ok){
                store.commit("changeIsAddRouter",false)
                store.commit("changeUserFormInfo",res.data.data)
                ElMessage.success('登录成功')
                router.push("/home")
            }else{
                ElMessage({
                    message:"用户名密码不匹配",
                    type:"error"
                })
            }
        })
        console.log(userForm.value)
    } else if (userForm.value.username && !userForm.value.password) {
        ElMessage({
            message: '请输入密码',
            type: 'warning',
        })
    } else if (userForm.value.password && !userForm.value.username) {
        ElMessage({
            message: '请输入用户名',
            type: 'warning',
        })
    } else {
        ElMessage({
            message: '请输入用户名和密码',
            type: 'warning',
        })
    }
}

const handleJoin = () => {
    if (userForm.value.username && userForm.value.password && userForm.value.email) {

    } else if (!userForm.value.email) {
        ElMessage({
            message: '请输入邮箱',
            type: 'warning',
        })
    }else if(!userForm.value.username){
        ElMessage({
            message: '请输入用户名',
            type: 'warning',
        }) 
    }else if(!userForm.value.password){
        ElMessage({
            message: '请输入密码',
            type: 'warning',
        })
    }
}



const signIn = () => {
    container.value = 'container'
}
const signUp = () => {
    console.log(container.value)
    container.value += " panel-active"

}




</script>


<style scoped>
* {
    margin: 0;
    padding: 0;
}

#body {

    height: 100vh;
    background: #e7e7e7 url('../../public/img.jpg') no-repeat fixed;
    background-size: cover;
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    background-color: #e7e7e7;
    border-radius: 0.7em;
    max-width: 750px;
    width: 100%;
    height: 420px;
    overflow: hidden;
    position: relative;
    box-shadow: 0 0.9rem 1.7rem rgba(0, 0, 0, 0.25), 0 0.7rem 0.7rem rgba(0, 0, 0, 0.22);

}

.container-form {
    height: 100%;
    position: absolute;
    top: 0;
    transition: all 0.6s ease-in-out;
}

.container-signin {
    left: 0;
    width: 50%;
    z-index: 2;
}

.container-signup {
    left: 0;
    opacity: 0;
    width: 50%;
    z-index: 1;
}

.form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 3rem;
    height: 100%;
    text-align: center;
    background-color: #e7e7e7;
}

.form-title {
    font-weight: 300;
    margin: 0;
    margin-bottom: 1.25rem;
}

.link {
    color: #333;
    font-size: 0.9rem;
    margin: 1.5rem 0;
    text-decoration: none;
    /*文字装饰*/
}

.input {
    width: 100%;
    background-color: #fff;
    padding: 0.9rem 0.9rem;
    margin: 0.5rem 0;
    border: none;
    outline: none;
    /*轮廓线*/
}

.btn {
    color: #e7e7e7;
    background-color: #f25d8e;
    box-shadow: 0 4px 4px rgba(255, 112, 159, .3);
    border-radius: 5px;
    border: none;
    cursor: pointer;
    /*鼠标移入变成手指*/
    font-size: 0.8rem;
    font-weight: bold;
    letter-spacing: 0.1rem;
    padding: 0.9rem 4rem;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
}

.form>.btn {
    margin-top: 1.5rem;
}

.btn:active {
    transform: scale(0.95);
}

.container-overlay {
    height: 100%;
    left: 50%;
    overflow: hidden;
    position: absolute;
    top: 0;
    transition: transform 0.6s ease-in-out;
    width: 50%;
    z-index: 100;
}

.overlay {
    width: 200%;
    height: 100%;
    position: relative;
    left: -100%;
    background: url('../../public/img.jpg') no-repeat center fixed;
    background-size: cover;
    transition: transform 0.6s ease-in-out;
    transform: translateX(0);
}

.overlay-panel {
    height: 100%;
    width: 50%;
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    transform: translateX(0);
}

.over-left {
    transform: translateX(-20%);
}

.over-right {
    right: 0;
    transform: translateX(0);
}

.panel-active .over-left {
    transform: translateX(0);
}

.panel-active .container-overlay {
    transform: translateX(-100%);
}

.panel-active .overlay {
    transform: translateX(50%);
}

.panel-active .container-signin {
    transform: translateX(100%);
}

.panel-active .container-signup {
    opacity: 1;
    z-index: 5;
    transform: translateX(100%);
}
</style>