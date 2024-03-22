<template>
    <div class="box">
        <el-card>
            <div class="box1">
                <el-form ref="ruleFormRef" style="max-width: 600px" :model="userForm" :rules="rules" label-width="auto"
                    class="demo-ruleForm" :size="formSize" status-icon>
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="userForm.username" />
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="userForm.password" />
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="userForm.email" />
                    </el-form-item>
                    <el-form-item :size="'large'" label="性别" prop="gender">
                        <el-select style="width: 200px;" v-model="userForm.gender" placeholder="点击选择性别" class="sel">
                            <el-option label="保密" value="0" />
                            <el-option label="男" value="1" />
                            <el-option label="女" value="2" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="个人介绍" prop="introduction">
                        <el-input v-model="userForm.introduction" type="textarea" />
                    </el-form-item>
                    <el-form-item label="头像" prop="desc">
                        <Upload :avatar="userForm.avatar" @handleChange="handleChange" />
                    </el-form-item>
    
                    <el-form-item >
                        <el-button @click="handleSubmit" class="btn" type="primary">点击更新</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import axios from 'axios'
import Upload from "@/components/Upload.vue"
import upLoad from "@/util/upLoad.js"
import { ElMessage } from 'element-plus'
const ruleFormRef = ref()

const userForm = ref({
    username: '',
    password: '',
    email: '',
    gender: '',
    introduction: '',
    file: null,
    avatar: ''
})


const handleChange = (file) => {
    console.log(URL.createObjectURL(file.raw))
    userForm.value.file = file.raw
    userForm.value.avatar = URL.createObjectURL(file.raw)
}

const handleSubmit =async ()=>{
    // console.log(userForm.value)
    ruleFormRef.value.validate(async (valid)=>{
        if(valid){

            let res = await upLoad(`/adminApi/user/userAdd`,userForm.value)
            if(res.data.ok){
                ElMessage.success(`添加用户成功`)
            }
        }else{

            ElMessage.warning(`用户信息不完整`)
        }

    })
    
}

const rules = reactive({

    username: [
        { required: true, message: '输入用户名', trigger: 'blur' },

    ],
    password: [
        { required: true, message: '输入密码', trigger: 'blur' },

    ],
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
    ],
    gender: [
        { required: true, message: '请选择性别', trigger: 'blur' },
    ]
})


</script>

<style scoped>

.box1{
    margin-left: 10%;
}
.el-card {
    margin-left: 10%;
    width: 80%;
    /* position:relative; */
}
.btn {
    margin-left:80%;
}
</style>