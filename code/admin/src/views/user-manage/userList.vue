<template>
    <el-card>
        <div class="topXie">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <p style="color: black; font-weight:500;">草吧后台管理中心</p>
                </el-breadcrumb-item>
                <el-breadcrumb-item>
                    <h2 class="listXie" href="/">用户列表</h2>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-table size="large" :data="userList" style="width: 100%">
            <el-table-column label="头像" width="180">
                <template #default="scope">
                    <div v-if="scope.row.avatar"><el-avatar :size="50"
                            :src="`http://localhost:3000${scope.row.avatar}`" /></div>
                    <div v-else><el-avatar :size="50"
                            src="http://localhost:3000/images/1711076201666-QQå¾ç20231130165119.gif" /></div>
                </template>
            </el-table-column>
            <el-table-column prop="username" label="用户名" width="180" />

            <el-table-column label="性别" width="180">
                <template #default="scope">
                    <div v-if="scope.row.gender === 0">
                        <span>保密</span>
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
            <el-table-column prop="email" label="用户邮箱" />
            <el-table-column prop="vip" label="用户等级" />
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

onMounted(() => {
    getUserList()
})
const getUserList = async () => {
    let res = await axios.get(`/adminApi/user/getUserList`)
    if (res.data.ok) {
        console.log(res.data.data)
        userList.value = res.data.data
    } else {
        console.log("获取失败")
    }
}

const handleEdit = (data) => {
    // console.log(data.username)
    dialogVisible.value = true
    // userForm.value = {...data}

    userForm.value = data

}

const handleDelete = async (data) => {
    let _id = data._id
    axios.post()
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