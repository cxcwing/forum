<template>
    <div class="box">
        <div>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <p style="color: black; font-weight:500;">草吧后台管理中心</p>
                </el-breadcrumb-item>
                <el-breadcrumb-item>
                    <h2 class="homeXie" href="/">首页</h2>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="main-box">
            <el-card class="card1" shadow="always">
                <div class="left">
                    <el-avatar :size="110" :src="avatarUrl" />
                    <span class="span-name">{{  userForm.username }}</span>
                    <span class="span-role">{{ '管理员' }}</span>
                </div>
            </el-card>
            <el-card class="card2" shadow="always">
                <template #header>
                    <div class="card-header">
                        <h2>个人信息</h2>
                    </div>
                </template>
                <div class="right">
                    <el-form ref="ruleFormRef" style="max-width: 600px" :model="userForm" :rules="rules"
                        label-width="auto" class="demo-ruleForm" :size="formSize" status-icon>
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="userForm.username" />
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="userForm.email" />
                        </el-form-item>
                        <el-form-item :size="'large'" label="性别"   prop="region">
                            <el-select  v-model="userForm.gender" placeholder="Activity zone" class="sel">
                                <el-option label="保密" :value="0" />
                                <el-option label="男" :value="1" />
                                <el-option label="女" :value="2" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="个人介绍" prop="introduction">
                            <el-input v-model="userForm.introduction" type="textarea" />
                        </el-form-item>
                        <el-form-item label="头像" prop="desc">
                            <Upload 
                            :avatar="userForm.avatar"
                            @handleChange="handleChange"
                            />
                        </el-form-item>
                        <el-button @click="handleSubmit" class="btn" type="primary">点击更新</el-button>
                    </el-form>
                </div>
            </el-card>
        </div>

    </div>
</template>

<script setup>
import { computed,reactive, ref,onMounted } from 'vue'
import { FormInstance, FormRules,ElMessage} from 'element-plus'
import Upload from '@/components/Upload.vue';
import {useStore} from 'vuex'
import axios from 'axios';
import upLoad from '@/util/upLoad';
const store = useStore()
onMounted(()=>{
    axios.get('/adminApi/user/home')
})
const {username,email,avatar,gender,introduction} = store.state.userFormInfo
const userForm = ref( {
    username,
    email,
    avatar,
    gender,
    introduction,
    file:null

})
const avatarUrl = computed(()=>
    store.state.userFormInfo.avatar?`http://localhost:3000${store.state.userFormInfo.avatar}`:`https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png`
)

const ruleFormRef = ref()

console.log(userForm.value)

const rules = reactive({
    username: [
        { required: true, message: '输入用户名', trigger: 'blur' },

    ],
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },

    ]
})

const handleChange = (file)=>{
    // URL.createObjectURL(file.raw)
    userForm.value.file = file.raw
    userForm.value.avatar = URL.createObjectURL(file.raw)


}

const handleSubmit = ()=>{
    // console.log(userForm.value)
    ruleFormRef.value.validate(async (valid)=>{
        if(valid){
            // console.log("OK")
            // console.log(userForm.value)
            let obj = {
                ok :1
            } 
            // axios.post(`/adminApi/user/Update`,obj).then(res=>{
            //     console.log(res.data)
            // })
            const res = await upLoad(`/adminApi/user/Update`,userForm.value)
            if(res.data.ok){
                console.log(res.data.data) 
                userForm.value = {
                    ...userForm.value,
                    ...res.data.data
                }
                store.commit("changeUserFormInfo",res.data.data)
            }else{
                console.log('失败捏')
            }
        }else{
            
        }
    })
}



</script>

<style scoped>
.btn{
    margin-left: 80px;
}
.sel{
    width:200px;
}

.main-box {
    display: flex;
}

.card2 {
    flex: 2;
}

.card1 {
    flex: 1;
    margin: 10px;
}

.homeXie {
    color: black;
}

.left {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.span-name {
    font-size: 19px;
    font-weight: 600;
}

.span-role {
    /* font-size: 16px; */
    font-weight: 500;
}
</style>