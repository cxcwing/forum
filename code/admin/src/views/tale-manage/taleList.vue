<template>
    <el-card>
        <div class="topXie">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <p style="color: black; font-weight:500;">故事管理</p>
                </el-breadcrumb-item>
                <el-breadcrumb-item>
                    <h2 class="listXie" href="/">故事列表</h2>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-table size="large" :data="taleList" style="width: 100%">
            <el-table-column label="封面" width="180">
                <template #default="scope">
                    <div v-if="scope.row.cover"><el-avatar :size="50"
                            :src="`http://localhost:3000/${scope.row.cover}`" /></div>
                    <div v-else>
                        <el-avatar :size="50"src="http://localhost:3000/images/1711076201666-QQå¾ç20231130165119.gif" />
                        </div>
                </template>
            </el-table-column>
            <el-table-column label="标题" prop="title" width="200" />

            <el-table-column label="类型" width="100">
                <template #default="scope">
                    <div v-if="scope.row.type === 0">
                        <span>自创故事</span>
                    </div>
                    <div v-else-if="scope.row.gender === 1">
                        <span>女</span>
                    </div>
                    <div v-else-if="scope.row.gender === 2">
                        <span>男</span>
                    </div>
                    <div v-else>
                        <span>武装直升机</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column width="100" prop="" label="收藏数" />
            <el-table-column width="100" prop="" label="点赞数" />
            <el-table-column width="100" prop="" label="浏览量" />
            <el-table-column width="120" prop="author" label="作者" />
            <el-table-column fixed="right" label="发布" width="120">
                <template #default="scoe">
                    <el-switch :v-model="scoe.row.isPublish" @click="handlePublish(scoe.row)"/>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="180">
                <template #default="scoe">
                    <el-button type="primary" @click="handleEdit(scoe.row)" size='small'>编辑</el-button>
                    <el-button type="danger" @click="handleDelete(scoe.row)" size='small'>删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>

    <el-dialog v-model="dialogVisible" title="用户信息更改" width="60%" :before-close="handleClose">
        <div>
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
                <el-form-item :size="'large'" label="性别" prop="region">
                    <el-select v-model="userForm.gender" placeholder="Activity zone" class="sel">
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

            </el-form>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="handleSure">确认更改 </el-button>
                <el-button @click="dialogVisible = false">
                    取消
                </el-button>
            </div>
        </template>
    </el-dialog>

</template>

<script setup>
import axios from 'axios'
import { onMounted, ref, reactive } from 'vue'
import Upload from '@/components/Upload.vue'
import upLoad from '@/util/upLoad';
import { ElMessage } from 'element-plus'
const userList = ref([])
const userForm = ref({})

const dialogVisible = ref(false)
const taleList = ref([])
const taleForm = ref({})
const statistics  = (arr)=>{
    arr.forEach((item)=>{
        if(item.whoGood){

        }
    })
}

const getTaleList = async ()=>{
   let res = await axios.get(`/adminApi/tale/getTaleList`)
    if(res.data.ok){
        console.log(res.data.data)
        taleList.value = res.data.data
        statistics(taleList.value)
    }else{
        console.log("请求失败")
    }
} 

const handlePublish = async (data)=>{

    // console.log(taleList.value[1].whoGood.length,data)
}

const handleChange = (file) => {
    userForm.value.file = file.raw
    userForm.value.avatar = URL.createObjectURL(file.raw)
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
    ]
})

onMounted(async() => {
    getTaleList()
})


const handleEdit = (data) => {
    // console.log(data.username)
    dialogVisible.value = true


}

const handleDelete = async (data) => {

}

const handleSure = async () => {
    dialogVisible.value = false
    console.log(userForm.value)
    let res = await upLoad(`/adminApi/user/userUpdate`, userForm.value)
    if (res.data.ok) {
        console.log(res.data)
        userForm.value = {
            ...userForm.value,
            ...res.data.data
        }
        ElMessage({
            message: '修改成功.',
            type: 'success',
        })
    } else {
        ElMessage({
            message: '更新失败',
            type: 'error',
        })
    }
}


</script>

<style scoped>
.topXie {
    margin-bottom: 20px;
}
</style>