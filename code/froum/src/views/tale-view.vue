<template>
    <div class="body">
        <div class="mainBox">
            <div class="left">
                <div :class="`left-item left-magic ${isCollOrtoke(taleForm.whoGood, userId) === 1 ? 'active' : ''}`"
                    @click="handleLike">
                    <el-tag class="left-el-tag" :type="info" color="rgb(138, 145, 159)" effect="dark" round>
                        {{ taleForm.goodNumber }}
                    </el-tag>
                    <el-icon class="left-el-icon ">
                        <MagicStick />
                    </el-icon>
                </div>
                <div class="left-item ">
                    <el-tag class="left-el-tag" :type="info" color="rgb(138, 145, 159)" effect="dark" round>
                        {{ taleForm.Comment }}
                    </el-tag>
                    <el-icon class="left-el-icon">
                        <Comment />
                    </el-icon>

                </div>
                <div :class="`left-item ${isCollOrtoke(taleForm.whoCollection, userId) === 1 ? 'active' : ''}`"
                    @click="handleCollection">
                    <el-tag class="left-el-tag" :type="info" color="rgb(138, 145, 159)" effect="dark" round>
                        {{ HowCollection(taleForm.whoCollection) }}
                    </el-tag>
                    <el-icon class="left-el-icon">
                        <StarFilled />
                    </el-icon>
                </div>
                <div></div>
            </div>
            <div class="center">
                <div class="contentBox">
                    <h1> {{ taleForm.title }}</h1>
                    <div class="twoBox">
                        <span class="two">{{ taleForm.author }}</span>
                        <span class="two">{{ whatTime(taleForm.time) }}</span>
                        <span class="two">
                            <el-icon class="eyse">
                                <View />
                            </el-icon> {{ taleForm.lookNumber }}
                        </span>
                        <el-divider>
                            <el-icon><star-filled /></el-icon>
                        </el-divider>
                    </div>

                    <div class="contentBox1008611">
                        <div v-html="taleForm.content"></div>
                    </div>
                </div>

                <div class="Comment">
                    <div class="comment-editor">
                        <editor></editor>
                    </div>

                    <div class="comment-content-box">
                        <div v-for="item in commentForm" :key="item.id" class="comment-content-box-item">
                            <div class="comment-content-box-item-left">
                                <el-avatar :src="`http://localhost:3000${item.userAvatar}`" />
                            </div>
                            <div calss="comment-content-box-item-right">
                                <div class="comment-content-box-item-right-username">{{ item.userName }}</div>
                                <div class="comment-content-box-item-right-content">{{ item.content }}

                                </div>
                       
                            </div>
                        </div>
                    </div>
                
                </div>

            </div>
            <div class="right">
                <div class="right-one">
                    <div class="right-one-avatar">
                        <el-avatar :size="60" :src="`http://localhost:3000${authorItem.avatar}`" />
                    </div>
                    <div >
                        <div class="right-one-username"> {{ authorItem.username }}</div>
                        <div class="right-one-introduction">{{ authorItem.introduction }}</div>
                    </div>
                 
                </div>
            </div>

        </div>
    </div>
</template>


<script setup>
import { TagProps } from 'element-plus'
import { onMounted, ref } from 'vue'

import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { MagicStick, View, ChatDotRound, StarFilled, Comment } from '@element-plus/icons-vue'
import editor from '../components/editor.vue'
import { useStore } from 'vuex';
const store = useStore()
const route = useRoute()
const router = useRouter()
const userForm = ref({})
const taleForm = ref({})
const isActive = ref('active')
const userId = ref(0)
const commentForm = ref({})
const authorItem = ref({})
const whatTime = (time) => {
    let date = new Date(time)
    let year = date.getFullYear()
    let mo = date.getMonth() + 1
    let day = date.getDate()
    let newTime = year + '-' + mo + '-' + day
    return newTime
}
const isCollOrtoke = (item, id) => {
    // console.log(item,id)
    if (item && item.length) {
        let arr = JSON.parse(item)
        if (arr.indexOf(id) != -1) {
            return 1//非空 且有
        } else {
            return 2//非空 但是无
        }
    } else {
        return 0 //空
    }
}
const HowCollection = (item) => {
    let num = 0
    if (item) {
        let arr = JSON.parse(item)
        num = arr.length
    }
    return num
}
const HowComment = (item) => {
    let num = 0
    if (item) {
        let arr = JSON.parse(item)
        num = arr.length
    }
    return num
}
const handleLike = async () => {//点过

    // console.log(isCollOrtoke(taleForm.value.whoGood,userId.value))
    // console
    if (isCollOrtoke(taleForm.value.whoGood, userId.value) === 1) {//删除
        let arrLike = JSON.parse(taleForm.value.whoGood)
        let arrUser = store.state.userFormInfo.toGood
        let index1 = arrLike.indexOf(userId.value)
        let index2 = arrUser.indexOf(taleForm.value.id)
        console.log()
        arrLike.splice(index1, 1)
        arrUser.splice(index2, 1)
        let form = {
            likeArr: JSON.stringify(arrLike),
            userGood: JSON.stringify(arrUser),
            taleId: taleForm.value.id,
            userId: userId.value
        }
        let res = await axios.post(`/froumApi/froum/like`, form)
        if (res.data.ok) {

            store.commit("changeUserFormInfo", res.data.data)
            taleForm.value.whoGood = JSON.stringify(arrLike)
            taleForm.value.goodNumber--
        }
    } else if (isCollOrtoke(taleForm.value.whoGood, userId.value) === 2) {
        let arrLike = JSON.parse(taleForm.value.whoGood)
        let arrUser = store.state.userFormInfo.toGood
        if (!arrUser) {
            arrUser = []
        }
        arrLike.push(userId.value)
        arrUser.push(taleForm.value.id)
        let form = {
            likeArr: JSON.stringify(arrLike),
            userGood: JSON.stringify(arrUser),
            taleId: taleForm.value.id,
            userId: userId.value
        }
        let res = await axios.post(`/froumApi/froum/like`, form)
        if (res.data.ok) {
            console.log(res.data)
            store.commit("changeUserFormInfo", res.data.data)
            taleForm.value.whoGood = JSON.stringify(arrLike)
            taleForm.value.goodNumber++
        }
    } else if (isCollOrtoke(taleForm.value.whoGood, userId.value) === 0) {
        let arrLike = []
        let arrUser = store.state.userFormInfo.toGood
        if (!arrUser) {
            arrUser = []
        }
        arrLike.push(userId.value)
        arrUser.push(taleForm.value.id)
        let form = {
            likeArr: JSON.stringify(arrLike),
            userGood: JSON.stringify(arrUser),
            taleId: taleForm.value.id,
            userId: userId.value
        }
        let res = await axios.post(`/froumApi/froum/like`, form).then(res => {
            console.log(res.data)
            store.commit("changeUserFormInfo", res.data.data)
            taleForm.value.whoGood = JSON.stringify(arrLike)
            taleForm.value.goodNumber--
        })

    }
}

const handleCollection = async () => {//点过

    console.log(isCollOrtoke(taleForm.value.whoCollection, userId.value))
    // console
    if (isCollOrtoke(taleForm.value.whoCollection, userId.value) === 1) {//删除
        let arrLike = JSON.parse(taleForm.value.whoCollection)
        let arrUser = store.state.userFormInfo.collection
        let index1 = arrLike.indexOf(userId.value)
        let index2 = arrUser.indexOf(taleForm.value.id)
 
        arrLike.splice(index1, 1)
        arrUser.splice(index2, 1)
        let form = {
            likeArr: JSON.stringify(arrLike),
            userGood: JSON.stringify(arrUser),
            taleId: taleForm.value.id,
            userId: userId.value
        }
        let res = await axios.post("/froumApi/froum/collection", form)
        if (res.data.ok) {
            console.log(res.data)
            store.commit("changeUserFormInfo", res.data.data)
            taleForm.value.whoCollection = JSON.stringify(arrLike)

        }
    } else if (isCollOrtoke(taleForm.value.whoCollection, userId.value) === 2) {
        let arrLike = JSON.parse(taleForm.value.whoCollection)
        let arrUser = store.state.userFormInfo.collection
        if (!arrUser) {
            arrUser = []
        }
        arrLike.push(userId.value)
        arrUser.push(taleForm.value.id)
        let form = {
            likeArr: JSON.stringify(arrLike),
            userGood: JSON.stringify(arrUser),
            taleId: taleForm.value.id,
            userId: userId.value
        }
        let res = await axios.post("/froumApi/froum/collection", form)
        if (res.data.ok) {
            console.log(res.data)
            store.commit("changeUserFormInfo", res.data.data)
            taleForm.value.whoCollection = JSON.stringify(arrLike)

        }
    } else if (isCollOrtoke(taleForm.value.whoCollection, userId.value) === 0) {

        let arrLike = []

        let arrUser = store.state.userFormInfo.collection
        if (!arrUser) {
            arrUser = []
        }

        arrLike.push(userId.value)
        arrUser.push(taleForm.value.id)
        let form = {
            likeArr: JSON.stringify(arrLike),
            userGood: JSON.stringify(arrUser),
            taleId: taleForm.value.id,
            userId: userId.value
        }
        let res = await axios.post("/froumApi/froum/collection", form).then(res => {

            store.commit("changeUserFormInfo", res.data.data)
            taleForm.value.whoCollection = JSON.stringify(arrLike)

        })

    }
}



onMounted(() => {
    // console.log(route.params.id)
    userId.value = store.state.userFormInfo._id
    axios.get(`/froumApi/froum/getTale?id=${route.params.id}`).then(res => {
        userForm.value = res.data.athorData
        taleForm.value = res.data.data
        
        axios.get(`/froumApi/froum/getAuthor?id=${taleForm.value.authorId}`).then(res2 =>{
            authorItem.value = res2.data.data
    
        })
    })
    axios.get(`/froumApi/froum/getTaleComment?id=${route.params.id}`).then(res => {
        commentForm.value = res.data.data

    })
   
})


</script>


<style scoped>
.body {
    margin-top: 2vh;
}

.mainBox {
    /* margin-top: 200px; */
    display: flex;
    margin: 0 auto;
    width: 85%;

}

.left-item {

    background-color: white;
    height: 50px;
    width: 50px;
    text-align: center;
    box-sizing: content-box;

    font-size: 25px;
    line-height: 50px;
    border-radius: 25px;
    margin-bottom: 20px;
    color: rgb(138, 145, 159);
    box-shadow: 1px 1px 2px rgba(138, 145, 159, 0.451);
    position: relative;
}

.left-el-icon {
    margin-top: 12px;
    /* color: aqua; */
}

.left-item:hover {
    color: rgba(24, 220, 2, 0.914);
    cursor: pointer;
}

.left {
    /* margin-top:5vh; */
    height: 50vh;
    flex: 1;
    /* background-color: aqua; */
    display: flex;
    position: sticky;
    top: 5vh;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.left-el-tag {
    border: none;
    position: absolute;
    font-size: 12px;
    max-width: 30px;
    overflow: hidden;
    right: -5px;
    height: 15px;
    line-height: 15px;
    text-align: left;
}

.active {
    color: rgba(24, 220, 2, 0.879);
}


.center {
    flex: 7;
    margin-right: 10px;


    border-radius: 5px;
}

.right {
    flex: 3;

}

.twoBox {
    margin-top: 15px;
}

.two {

    color: rgb(116, 116, 118);
    margin-right: 30px;
    font-size: 14px;
}

.contentBox {
    margin-top: 20px;
    background-color: white;
    padding: 30px;
    border-radius: 5px;
}

.contentBox1008611 {
    margin-top: 30px;
}

.comment-editor {
    background-color: white;
    width: 100%;
    border-radius: 7px;
    margin-top: 30px;
    margin-bottom: 70px;
    padding-bottom: 10px;
}

.Comment {
    background-color: white;
    padding: 20px;
}

.comment-content-box-item{
    padding:15px 0px ;
    display: flex;
    margin-bottom: 15px;
    border-bottom:1px solid rgba(219, 217, 217, 0.252);
}
.comment-content-box-item-left{
    margin-right:20px;
}
.comment-content-box-item-right-username{
    color: rgba(24, 220, 2, 0.88);
    padding:5px 0;
}
.comment-content-box-item-right-content{
    max-width: 600px;
    word-wrap: break-word;
    font-size: 16px;
    color: #5b5b5b;
}
.right-one{
    padding: 12px;
    background-color: white;
    border-radius: 5px;
    /* margin-top:20px; */
    position: sticky;
    top:10vh;
    display: flex;

}
.right-one-avatar{
    margin-right: 20px;
}
.right-one-username{
    color: rgba(24, 220, 2, 0.88);
    font-weight: 600;
}
.right-one-introduction{
    padding:3px 0px;
    color: #8A919F;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 240px;
}
</style>
<style lang="scss">
.contentBox1008611 {
    img {
        max-width: 100%;
        height: auto;
    }

    .image_resized {
        max-width: 100%;
    }

    .image-style-side {
        float: right;
        margin-left: var(--ck-image-style-spacing);
    }

    .image-style-align-left {
        float: left;
        margin-right: var(--ck-image-style-spacing);
    }

    .image-style-align-center {
        margin-left: auto;
        margin-right: auto;
        text-align: center;
    }

    .image-style-align-right {
        float: right;
        margin-left: var(--ck-image-style-spacing);
    }
}
</style>