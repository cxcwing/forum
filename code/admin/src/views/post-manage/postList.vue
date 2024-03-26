<template>
    <el-card>
        <div class="topXie">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <p style="color: black; font-weight:500;">贴子管理</p>
                </el-breadcrumb-item>
                <el-breadcrumb-item>
                    <h2 class="listXie" href="/">贴子列表</h2>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-table size="large" :data="postList" style="width: 100%">
            <el-table-column label="封面" width="180">
                <template #default="scope">
                    <div v-if="scope.row.cover">
                        <!-- <el-avatar :size="50"
                            :src="`http://localhost:3000/${scope.row.cover}`" /> -->
                            <el-image style="width: 80px; height: 80px" :src="`http://localhost:3000/${scope.row.cover}`" fit="cover" />
                        </div>
                    <div v-else>
                        <!-- <el-avatar :size="50"
                            src="http://localhost:3000/images/1711076201666-QQå¾ç20231130165119.gif" /> -->
                            <el-image style="width: 80px; height: 80px" src="http://localhost:3000/images/1711076201666-QQå¾ç20231130165119.gif" fit="cover" />
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="标题" prop="title" width="200" />

            <el-table-column label="类型" width="100">
                <template #default="scope">
                    <div v-if="scope.row.type === 0">
                        <span>无事水水</span>
                    </div>
                    <div v-else-if="scope.row.type === 1">
                        <span>趣事分享</span>
                    </div>
                    <div v-else-if="scope.row.type === 2">
                        <span>游戏相关</span>
                    </div>
                    <div v-else-if="scope.row.type === 3">
                        <span>意见征集</span>
                    </div>
                    <div v-else-if="scope.row.type === 4">
                        <span>求助</span>
                    </div>
                    <div v-else>
                        <span>我超，你怎么选到这个的？？？</span>
                    </div>
                   
                </template>
            </el-table-column>
            <el-table-column width="100" prop="HowGood" label="收藏数" />
            <el-table-column width="100" prop="HowCollection" label="点赞数" />
            <el-table-column width="100" prop="HowComment" label="浏览量" />
            <el-table-column width="120" prop="author" label="作者" />
            <el-table-column width="120" prop="time" label="更新时间" />
            <el-table-column fixed="right" label="发布" width="120">
                <template #default="scope">
                    <el-switch v-model="scope.row.isPublish" @change="handleSwitchChange(scope.row)" />
                </template>
            </el-table-column>

            <el-table-column fixed="right" label="操作" width="180">
                <template #default="scoe">
                    <el-button type="primary" @click="handleEdit(scoe.row)" size='small'>编辑</el-button>
                    <el-button type="danger" @click="handleDelete(scoe.row)" size='small'>删除</el-button>
                </template>
            </el-table-column>
        </el-table>



        <el-dialog v-model="dialogVisible" title="请确认删除" width="500" >
            <span>确认删除这个故事吗</span>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="handleSure">确认</el-button>
                    <el-button  @click="dialogVisible = false">
                       取消
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </el-card>


</template>

<script setup>
import axios from 'axios'
import { onMounted, ref, reactive, h } from 'vue'
import { useRouter } from 'vue-router'
import Upload from '@/components/Upload.vue'
import upLoad from '@/util/upLoad';

import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'
// import { ElNotification } from 'element-plus'
const router = useRouter()


const dialogVisible = ref(false)
const postList = ref([])

// const dialogVisible = ref(false) 
const statistics = (arr) => {
    arr.forEach((item) => {
        if (item.whoGood) {
            item.HowGood = item.whoGood.length
        } else {
            item.HowGood = 0
        }
        if (item.whoCollection) {
            item.HowCollection = item.whoCollection.length
        } else {
            item.HowCollection = 0
        }
        if (item.Comment) {
            item.HowComment = item.HowComment.length
        } else {
            item.HowComment = 0
        }
        if (item.isPublish) {
            item.isPublish = true
        } else {
            item.isPublish = false

        }
    })
}


const getPostList = async () => {
    let res = await axios.get(`/adminApi/post/getPostList`)
    if (res.data.ok) {
        // console.log(res.data.data)
        postList.value = res.data.data
        statistics(postList.value)
    } else {
        console.log("请求失败")
    }
}

const handleSwitchChange = async (data) => {
    // data.isPublish = !data.isPublish
    console.log(data.isPublish, postList.value[0].isPublish, data.id)

    let res = await axios.put(`/adminApi/post/updateIsPublish`, {
        id: data.id,
        isPublish: data.isPublish
    })
    if (res.data.ok && data.isPublish) {
        ElNotification({
            title: '操作成功',
            message: h('i', { style: 'color: teal' }, '故事已经成功发布'),
            duration: '1500'
        })
    } else if (res.data.ok && !data.isPublish) {
        ElNotification({
            title: '操作成功',
            message: h('i', { style: 'color: gray' }, '故事已经取消发布'),
            duration: '1500'
        })
    }

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

onMounted(async () => {
    getPostList()
})


const handleEdit = (data) => {
    router.push(`/post-manage/postEdit/${data.id}`)
    // tale-manage/taleEdit
}
let deleteId = new Number()
const handleDelete = async (data) => {
    dialogVisible.value = true
    deleteId = data.id
}

const handleSure = async (data) => {
    dialogVisible.value = false
    console.log(deleteId)
    let res = await axios.delete(`/adminApi/post/postDelete?id=${deleteId}`)
    getPostList()
}   


</script>

<style scoped>
.topXie {
    margin-bottom: 20px;
}
</style>