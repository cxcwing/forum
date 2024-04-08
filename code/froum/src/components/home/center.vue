<template>
    <div class="center">

        <div class="center-one">
            <div class="center-one-left">
                <div class="center-one-left-avatar">
                    <el-avatar :size="70" :src="`http://localhost:3000/${userForm.avatar}`" />
                </div>
            </div>

            <div class="center-one-right">
                <div class="center-one-right-userbox">
                    <span class="center-one-right-userbox-username">{{ userForm.username }}</span>
                    <span class="center-one-right-userbox-userrole">{{ whatRole() }}</span>
                </div>

                <div class="center-one-right-progress-box">
                    <div class="center-one-right-progress-box-left">
                        <span>Lv{{ userForm.level }}</span>
                    </div>
                    <div class="center-one-right-progress-box-right">

                        <el-progress stroke-linecap="round" type="line" :text-inside="true" :stroke-width="24"
                            :percentage="percentage" color="#18dc00" status="success" />
                    </div>
                </div>
                <div class="center-one-right-power-box">
                    <span>能量:{{ userForm.power }}</span>

                </div>
            </div>

        </div>

        <div class="center-two">
            <el-card>
                <div class="sortBox">
                    <div class="sort">
                        <span :class="`sort-one ${howSort === 0 ? 'active' : ''}`" @click="sortSelect"
                            data-id="0">点赞</span>
                        <span :class="`sort-two ${howSort === 1 ? 'active' : ''}`" @click="sortSelect"
                            data-id="1">收藏</span>

                    </div>
                </div>
                <div class="listBox">

                    <div class='center'>

                        <ul v-if="articleList.length" class="infinite-list" style="overflow: auto">
                            <li v-for="item in articleList" :key="item.id" @click="handleView(item)"
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
                                                <span>{{ whatType(item.type) }}</span>
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
                        <div v-else> <el-empty :image-size="200" description="暂无此类型，快来创作吧！" /></div>
                    </div>



                </div>
            </el-card>
        </div>

    </div>
</template>

<script setup>
import { Tickets, Notebook } from '@element-plus/icons-vue'
import { useStore } from 'vuex';
import { ref, onMounted } from 'vue'
import axios from 'axios'
import option from '../../../util/echartsInit';
import * as echarts from 'echarts'
import { MagicStick, View } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const store = useStore()
const userForm = ref(store.state.userFormInfo)
const percentage = ref(0)
const articleList = ref([])
const howSort = ref(0)
const contentValue = (content) => {
    let rm = /<(\w+)(?:\s+[^>]+)?>|<\/\w+>/g
    let str1 = content.replace(rm, '')
    str1 = str1.replace(rm, '')
    str1 = str1.replace(/&nbsp;/g, '')
    return str1.substring(0, 100)
}
const getList =async (taleLink,postLink)=>{
    let res = await axios.get(`/froumApi/froum/getUser?id=${userForm.value._id}`)
    if (res.data.ok) {
        store.commit("changeUserFormInfo", res.data.data)
        userForm.value = store.state.userFormInfo
        percentage.value = parseFloat((store.state.userFormInfo.power - store.state.userFormInfo.level * 200) / 200 * 100)
    } else {
    }
    let res2 = await axios.post(taleLink, userForm.value)
    let res3 = await axios.post(postLink,userForm.value)
    if (res2.data.ok && res3.data.ok) {
        let arr2 = JSON.parse(res2.data.data)
        let arr3 = JSON.parse(res3.data.data)
        articleList.value = [...arr2,...arr3]
   
    } else {

    }
}
const whatType = (type) => {
    if (type === 0) {
        return "非恐怖"
    }
    else if (type === 1) {
        return "自创故事"
    }
    else if (type === 2) {
        return "据事实改编"
    }
    else if (type === 3) {
        return "我有一个朋友"
    }
    else if (type === 4) {
        return "搬运"
    }
    else if (type === 5) {
        return "我听说"
    }
    else if (type === 6) {
        return "恐怖"
    }
}
const handleView = (item) => {

    if (item.isPost) {
        router.push(`/post-view/${item.id}`)
    } else {

        router.push(`/tale-view/${item.id}`)
    }
}

const whatRole = () => {
    if (store.state.userFormInfo.level <= 4) {
        return '普通用户'
    } else {
        return '高能用户'
    }

}
const sortSelect =async (evt) =>{
    // console.log(evt.currentTarget.dataset.id)
    howSort.value = parseInt(evt.currentTarget.dataset.id)

    if(howSort.value === 0){
        await getList(`/froumApi/froum/getLike`,`/froumApi/froum/getLikePost`)
    }else if(howSort.value ===1){
        await getList(`/froumApi/froum/getCollection`,`/froumApi/froum/getCollectionPost`)
    }
}

onMounted(async () => {


    percentage.value = parseFloat((store.state.userFormInfo.power - store.state.userFormInfo.level * 200) / 200 * 100)
    await getList(`/froumApi/froum/getLike`,`/froumApi/froum/getLikePost`)
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

.after {
    color: #8A919F;
    font-size: 12px;

}

.after>span {
    background-color: #cdced060;
    padding: 1px 4px;
    border-radius: 2px;
}

.after:hover {
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
.sortBox {
    border-bottom: #8a919f4a 1px solid;
    padding: 12px;
    font-size: 17px;
    color: #8a919f;

}
.sort-one {
    padding-right: 40px;
    padding-left: 10px;
    position: relative;
    cursor: pointer;
}

.sort-two {
    padding-right: 20px;
    cursor: pointer;
    position: relative;
}

.sort-one:hover {
    color: rgb(24, 220, 2);
}

.sort-two:hover {
    color: rgb(24, 220, 2);
}
.active {
    color: black;
}

.sort-one.active::before {
    content: '';
    width: 20px;
    border-radius: 2px;
    display: block;
    position: absolute;
    height: 4px;
    bottom: -12px;
    left: 15px;
    background-color: rgba(24, 220, 2, 0.914);
}

.sort-two.active::before {
    content: '';
    width: 20px;
    border-radius: 2px;
    display: block;
    position: absolute;
    height: 4px;
    bottom: -12px;
    left: 5px;
    background-color: rgba(24, 220, 2, 0.914);
}
</style>