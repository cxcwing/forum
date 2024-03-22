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
                    <div v-if="scope.row.avatar"><el-avatar :size="50" src="" /></div>
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
                    <el-button type="primary" @click="handleEdit(scoe.row)"  size='small'>编辑</el-button>
                    <el-button type="danger" size='small'>删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>

    <el-dialog v-model="dialogVisible" title="Tips" width="500" :before-close="handleClose">
   
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogVisible = false" >确定</el-button>
                <el-button type="primary" @click="dialogVisible = false">
                    取消
                </el-button>
            </div>
        </template>
    </el-dialog>

</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
const userList = ref([])
const dialogVisible = ref(false)
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
    console.log(data)
    dialogVisible.value = true
}




</script>

<style scoped>
.topXie {
    margin-bottom: 20px;
}
</style>