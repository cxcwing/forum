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
                        <span>非恐怖</span>
                    </div>
                    <div v-else-if="scope.row.type === 1">
                        <span>自创故事</span>
                    </div>
                    <div v-else-if="scope.row.type === 2">
                        <span>据事实改编</span>
                    </div>
                    <div v-else-if="scope.row.type === 3">
                        <span>我有一个朋友</span>
                    </div>
                    <div v-else-if="scope.row.type === 4">
                        <span>搬运</span>
                    </div>
                    <div v-else-if="scope.row.type === 5">
                        <span>我听说</span>
                    </div>
                    <div v-else>
                        <span>恐怖</span>
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



        <el-dialog v-model="dialogVisible" title="Tips" width="500" >
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
const taleList = ref([])
const taleForm = ref(true)
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
            item.HowComment = item.Comment
        } else {
            item.HowComment = item.Comment
        }
        if (item.isPublish) {
            item.isPublish = true
        } else{
            item.isPublish = false

        }
    })
}


const getTaleList = async () => {
    let res = await axios.get(`/adminApi/tale/getTaleList`)
    if (res.data.ok) {
        // console.log(res.data.data)
        taleList.value = res.data.data
        statistics(taleList.value)
    } else {
        console.log("请求失败")
    }
}

const handleSwitchChange = async (data) => {
    // data.isPublish = !data.isPublish
    console.log(data.isPublish, taleList.value[0].isPublish, data.id)

    let res = await axios.put(`/adminApi/tale/updateIsPublish`, {
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




onMounted(async () => {
    getTaleList()
})


const handleEdit = (data) => {
    router.push(`/tale-manage/taleEdit/${data.id}`)
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
    let res = await axios.delete(`/adminApi/tale/taleDelete?id=${deleteId}`)
    getTaleList()
}   


</script>

<style scoped>
.topXie {
    margin-bottom: 20px;
}
</style>