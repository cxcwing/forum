<template>
    <div>
        <el-card>
            <div class="searchBox">
                <span style="margin-right: 100px;font-weight: 600;font-size: 18px;">我的贴子</span>
                <el-input v-model="centerSearch" style="width: 300px" size="large" placeholder="搜索"
                            :suffix-icon="Search" @input="centerSearchInput" />
            </div>
            <div class="listBox">

                <div class='center'>

                    <ul v-if="articleList.length && !searchList.length" class="infinite-list" style="overflow: auto">
                        <li v-for="(item, index) in articleList" :key="item.id" @click="handleView(item)"
                            class="infinite-list-item list-item">
                            <div class="border-bottom">
                                <div class='content-item'>
                                    <div class="title">
                                        {{ item.title }}
                                    </div>
                                    <div class="content">
                                        {{ contentValue(item.content) }}
                                    </div>
                                    <div class="good">
                                        <div class="head">
                                            <div class="goodFirst">{{ item.author }}</div>
                                            <div class="eyseBox">
                                                <el-icon class="eyse">
                                                    <View />
                                                </el-icon> {{ item.lookNumber }}
                                            </div>

                                            <div :class="`likeBox beLiked`" :data-id="item.id">

                                                <el-icon :class="`like`">
                                                    <MagicStick />
                                                </el-icon>
                                                {{ item.goodNumber }}
                                            </div>

                                        </div>

                                        <div class="after">
                                            <span class="after-editor" @click.stop="handleEdit(item)">编辑</span>
                                            <span class="after-delete" @click.stop="handleDelete(item)">删除</span>
                                            <span class="after-type">{{ whatType(item.type) }}</span>
                                        </div>

                                    </div>
                                </div>
                                <div class="coverBox">
                                    <div class="image"
                                        :style="'background-image:url(http://localhost:3000' + `${item.cover}` + ');'">

                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>


                    <ul v-else-if="searchList.length" class="infinite-list" style="overflow: auto">
                        <li v-for="item in searchList" :key="item.id" @click="handleView(item)"
                            class="infinite-list-item list-item">
                            <div class="border-bottom">
                                <div class='content-item'>
                                    <div class="title">
                                        {{ item.title }}
                                    </div>
                                    <div class="content">
                                        {{ contentValue(item.content) }}
                                    </div>
                                    <div class="good">
                                        <div class="head">
                                            <div class="goodFirst">{{ item.author }}</div>
                                            <div class="eyseBox">
                                                <el-icon class="eyse">
                                                    <View />
                                                </el-icon> {{ item.lookNumber }}
                                            </div>

                                            <div :class="`likeBox beLiked`" :data-id="item.id">

                                                <el-icon :class="`like`">
                                                    <MagicStick />
                                                </el-icon>
                                                {{ item.goodNumber }}
                                            </div>

                                        </div>

                                        <div class="after">
                                            <span class="after-editor" @click.stop="handleEdit(item)">编辑</span>
                                            <span class="after-delete" @click.stop="handleDelete(item)">删除</span>
                                            <span class="type">{{ whatType(item.type) }}</span>
                                        </div>

                                    </div>
                                </div>
                                <div class="coverBox">
                                    <div class="image"
                                        :style="'background-image:url(http://localhost:3000' + `${item.cover}` + ');'">

                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>

                    <div v-else> <el-empty :image-size="200" description="空空如也，快去寻找心仪的文章吧" /></div>
                </div>
            </div>
        </el-card>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex'
import axios from 'axios'
import { MagicStick, View } from '@element-plus/icons-vue'
import { ElMessage, Action, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router';
const router = useRouter()
const store = useStore()
const userForm = ref(store.state.userFormInfo)
const percentage = ref(0)
const articleList = ref([])
const searchList = ref([])
const centerSearch = ref('')
const contentValue = (content) => {
    let rm = /<(\w+)(?:\s+[^>]+)?>|<\/\w+>/g
    let str1 = content.replace(rm, '')
    str1 = str1.replace(rm, '')
    str1 = str1.replace(/&nbsp;/g, '')
    return str1.substring(0, 100)
}
const handleView = (item) => {

    if (item.isPost) {
        router.push(`/post-view/${item.id}`)
    } else {

        router.push(`/tale-view/${item.id}`)
    }
}

const whatType = (type) => {
    if (type === 0) {
        return "无事水水"
    } else if (type === 1) {
        return "趣事分享"
    } else if (type === 2) {
        return "游戏相关"
    } else if (type === 3) {
        return "意见征集"
    } else if (type === 4) {
        return "求助"
    }
}
const centerSearchInput = () => {

    if (centerSearch.value != '') {
        // console.log(centerSearch.value)
        searchList.value = articleList.value.filter(item => {

            return item.title.includes(centerSearch.value)
        })
        
    } else {
        searchList.value = []
    }
}
const handleDelete = (item, index) => {

    ElMessageBox.confirm(
        '确认删除该文章吗',
        '请确认操作',
        {
            distinguishCancelAndClose: true,
            confirmButtonText: '确认',
            cancelButtonText: '取消',
        }
    )
        .then(() => {
            axios.delete(`/froumApi/froum/deleteUserPost?id=${item.id}&&authorId=${item.authorId}`).then(res => {
                if (res.data.ok) {
                    articleList.value = articleList.value.filter(it => it.id!=item.id)
                    centerSearchInput()
                    ElMessage({
                        message: '删除成功',
                        type: 'success',
                    })
                } else {
                    ElMessage({
                        message: '删除失败',
                        type: 'error',
                    })
                }
      
            })
        })
        .catch(() => {
         
        })
}
const handleEdit = (item) => {
    
    router.push(`/controll/article-edit/${item.id}/${item.isPost}`)
    
}

onMounted(async () => {
    axios.get(`/froumApi/froum/getUserPost?id=${userForm.value._id}`).then(res => {
        if (res.data.ok) {
            articleList.value = res.data.data
        }
    })
})


</script>
<style scoped>
.center-one-right-userbox-username {
    color: #18dc00;
    font-weight: 600;
    margin-right: 20px;
}

.center-one-right-userbox-userrole {
    font-size: 13px;
    color: white;
    padding: 3px;
    border-radius: 3px;
    background-color: #1adc00e0;
}

.center-one-right-progress-box {
    display: flex;
    margin-top: 20px;
    max-width: 400px;


    /* border-radius: ; */
    /* position: relative; */
}

.center-one-right-power-box {
    margin-top: 20px;
    color: #18d554;
    margin-bottom: 40px;
}

.center-one-right-progress-box-left {
    flex: 1;
}

.center-one-right-progress-box-left>span {
    background-color: #18dc00;
    padding: 1px 5px 1px 5px;
    border-radius: 3px;
    color: white;
}

.center-one-right-progress-box-right {
    flex: 8;
    background-color: #18dc00;
    border-radius: 30px 30px 30px 0px;
}

.center-one {
    display: flex;
    margin-bottom: 10px;
    border-bottom: 1px solid rgba(123, 123, 123, 0.321);
    /* background-color: red; */
}

.center-one-left {
    flex: 1;
    display: flex;
    /* background-color: #18dc00; */
    /* align-items: center; */
    justify-content: center;
}



.center-one-right {
    flex: 7;
}

.center-two-post-MyPostChart {
    width: 300px;
    height: 300px;
}






.el-icon.eyse {
    padding-right: 0;
    margin: 0;
    margin-top: 2px;
    margin-right: 5px;
}

.eyseBox {
    height: 16px;
    line-height: 16px;
    font-size: 13px;
    display: flex;
    justify-content: center;
    justify-items: center;
    margin-right: 20px;
}

.el-icon[data-v-76f4c0c0] {
    padding: 0;
}

.likeBox {
    height: 16px;
    line-height: 16px;
    font-size: 13px;
    display: flex;
    justify-content: center;
    justify-items: center;
}

.like {
    padding: 0;
    margin: 2px;
    font-size: 16px;

}

.likeBox:hover {
    color: rgb(24, 220, 2);
}

.beLiked {
    color: rgb(24, 220, 2);
}





.active {
    color: black;
}



.title {
    font-size: 16px;
    font-weight: 700;
    flex: 1;

}

.content {
    color: #8A919F;
    font-size: 13px;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.head {
    display: flex;
    flex-direction: row;
}

.goodFirst {
    padding-right: 5px;
    position: relative;
    margin-right: 8px;
}

.goodFirst::before {
    content: '';
    width: 2px;
    height: 12px;
    /* background-color: #0055ff; */
    position: absolute;
    right: -2px;
    top: 3px;
    border-right: 1px #8a919f76 solid;
}

.good {
    flex: 1;
    font-size: 13px;
    color: #8A919F;
    display: flex;
    justify-content: space-between;
    /* height: 10px; */

}


.after-editor {
    font-size: 14px;
    margin-right: 15px;
    margin-left: 15px;
    color: rgba(0, 204, 255, 0.896);
}

.after-delete {
    font-size: 14px;
    margin-right: 15px;
    margin-left: 15px;
    color: rgba(255, 94, 0, 0.896);
}

.after-type {
    color: #8A919F;
    background-color: #cdced060;
    padding: 1px 4px;
    border-radius: 2px;
    font-size: 12px;
}

.after-type:hover {
    color: rgba(24, 220, 2, 0.914);
}

.image {
    height: 80px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 10px;
    margin-bottom: 5px;
}

.border-bottom {
    display: flex;
    border-bottom: 1px solid #8a919f24;
}

.list-item {
    padding-top: 12px;
    padding-left: 20px;
    padding-right: 20px;
    cursor: pointer;
}

.list-item:hover {
    background-color: #8a919f0c;
}

.content-item {
    display: flex;
    flex-direction: column;
    flex: 13;
    margin-right: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.coverBox {
    border-radius: 3px;
    flex: 3;
}

.el-icon {
    /* box-sizing: border-box; */
    padding-right: 10px;
}



.center {
    margin-top: 20px;
    background-color: rgb(255, 255, 255);
    margin-left: 15px;
    border-radius: 8px;
    margin-right: 15px;
    max-width: 95%;
}



.first>span {
    margin-bottom: 2px;
}
</style>