<template>
    <div class="loginBox">

        <el-card>
            <div class='hBox'>
                <h3>忘记密码</h3>
            </div>

            <div class="inputBox">
                <div class="inputBoxE">
                    <el-input v-model="forgetForm.email" style="width: 320px" size="large" placeholder="请输入邮箱" />
                </div>
                <div class="inputBoxP">
                    <el-input v-model="forgetForm.password" type="password" style="width: 320px" size="large"
                        placeholder="请输入新密码" />
                </div>
                <div class="inputBoxY">
                    <el-input v-model="forgetForm.captcha" style="width: 230px" size="large" placeholder="输入验证码" />
                    <el-button v-if="!isShow" type="success" plain @click="handleFetch">获取验证码</el-button>
                    <el-button v-else type="info" disabled>{{ sec }}</el-button>
                </div>
                <div class="handleCommit">
                    <el-button type="primary" @click="handleCommit">提交</el-button>
                </div>
            </div>
        </el-card>

    </div>

</template>

<script setup>

import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import axios from 'axios'
const sec = ref(60)
const forgetForm = ref({
    email: '',
    password: '',
    captcha: ''
})
const isShow = ref(false)
const ChangeTime = () => {

    let count = 60
    isShow.value = true
    let scTime = setInterval(() => {
        if (count <= 1) {
            clearInterval(scTime)
            sec.value = 60
            isShow.value = false
        } else {
            count--
            sec.value = count
        }
    }, 1000)

}

const valtePassword = (password,captcha) => {
    if (password.length <= 8) {
        return '密码不得小于八位'
    } else if (password.length >= 24) {
        return '密码不得大于二十四位'
    } else if(captcha === ''){
        return '请输入验证码'
    } 
    else {
        return false
    }

}

const handleCommit = async () => {
    const re = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
    if (re.test(forgetForm.value.email)) {
        if (!valtePassword(forgetForm.value.password,forgetForm.value.captcha)) {
            let res = await axios.post("/froumApi/froum/rePassword", forgetForm.value)

            if (res.data.ok) {
                ElMessage({
                    message: `密码重置成功`,
                    type: 'success',
                })
            } else {
                ElMessage({
                    message: `${res.data.errorInfo}`,
                    type: 'error',
                })
            }

        } else {
            ElMessage({
                message: `${valtePassword(forgetForm.value.password,forgetForm.value.captcha)}`,
                type: 'warning',
            })
        }
    } else {
        ElMessage({
            message: '请输入正确的邮箱格式',
            type: 'warning',
        })
    }
}

const handleFetch = async () => {
    // console.log(userRegister.value.email)
    const re = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
    if (re.test(forgetForm.value.email)) {

        let res = await axios.post("/froumApi/froum/captchaSendForget", forgetForm.value)

        if (res.data.ok) {
            ChangeTime()

        } else {
            ElMessage({
                message: '请求错误',
                type: 'error',
            })
        }
    } else {
        ElMessage({
            message: '请输入正确的邮箱格式',
            type: 'warning',
        })
    }
}
</script>

<style scoped>
.loginBox {
    height: 100vh;
    /* background-color: aqua; */
    position: relative;
    background: url('../../public/forget.png');
    background-size: cover;
}

.el-card {
    background: rgba(140, 137, 137, 0.508);
    border-radius: 12px;
    height: 400px;
    width: 600px;
    position: absolute;
    top: calc(50% - 250px);
    right: calc(50% - 300px);
    display: flex;
    align-items: center;
    justify-content: center;
}

.hBox {
    text-align: center;
    margin-bottom: 30px;
}


.inputBoxE {
    margin-bottom: 20px;
    text-align: center;
}

.inputBoxP {
    margin-bottom: 20px;
    text-align: center;
}

.inputBoxY {
    margin-bottom: 30px;
}

.inputBoxY>.el-button {
    margin-left: 10px;
    max-width: 80px;
    height: 40px;
}

.handleCommit {
    text-align: center;
}
</style>