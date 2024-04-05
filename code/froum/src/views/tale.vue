<template>
    <div class="mainBox">
        <div class='left'>
            <div :class="`select first no-no ${selectWhich === 0 ? 'be-select' : ''}`" @click="handleSelect"
                data-id="0">
                <el-icon>
                    <Grid />
                </el-icon>
                <span>综合</span>

            </div>
            <div :class="`select no-no ${selectWhich === 1 ? 'be-select' : ''}`" @click="handleSelect" data-id="1">
                <el-icon>
                    <Ship />
                </el-icon>
                <span>自创故事</span>
            </div>
            <div :class="`select no-no ${selectWhich === 2 ? 'be-select' : ''}`" @click="handleSelect" data-id="2">
                <el-icon>
                    <Link />
                </el-icon>
                <span>据事实改编</span>
            </div>

            <div :class="`select no-no ${selectWhich === 3 ? 'be-select' : ''}`" @click="handleSelect" data-id="3">

                <el-icon>
                    <Pear />
                </el-icon>
                <span>我有一个朋友</span>
            </div>

            <div :class="`select no-no ${selectWhich === 4 ? 'be-select' : ''}`" @click="handleSelect" data-id="4">
                <el-icon>
                    <Bicycle />
                </el-icon>
                <span>搬运</span>
            </div>
            <div :class="`select no-no ${selectWhich === 5 ? 'be-select' : ''}`" @click="handleSelect" data-id="5">
                <el-icon>
                    <Headset />
                </el-icon>
                我听说
            </div>

            <div :class="`select yse-yse ${selectWhich === 6 ? 'yes-select' : ''}`" @click="handleSelect" data-id="6">
                <el-icon>
                    <Warning />
                </el-icon>
                恐怖
            </div>
        </div>
        <div class='center'>
            <div class="sortBox">
                <div class="sort">
                    <span :class="`sort-one ${howSort === 0 ? 'active' : ''}`" @click="sortSelect" data-id="0">推荐</span>
                    <span :class="`sort-two ${howSort === 1 ? 'active' : ''}`" @click="sortSelect" data-id="1">最新</span>

                </div>
            </div>
            <ul class="infinite-list" infinite-scroll-delay="5000" :infinite-scroll-distance="10"
                style="overflow: auto">
                <li  v-for="item in taleList" :key="item.id"  @click="handleView(item.id)" class="infinite-list-item list-item">
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

                                    <div @click.stop="handleLike(item)" :class="`likeBox  ${isCollOrtoke(item.whoGood,userId) === 1? 'beLiked' : ''}`" :data-id="item.id">

                                        <el-icon :class="`like`">
                                            <MagicStick />
                                        </el-icon>
                                        {{ item.goodNumber }}
                                    </div>

                                </div>
   
                                <div class="after">
                                    <span>{{whatType(item.type)}}</span>
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
        </div>
        <div class="right">
            <div class="rightOne">
                <div class="rightWord">
                    <span class="rightTime">{{ whatTime }}</span>
                    <div class="rightToke">今天我来过！</div>
                </div>
                <div v-if="!isMark" @click="handleMarck" class="rightMark">
                    点击签到
                </div>
                <div v-else class="rightMark">已签到</div>
            </div>
            <div class="rightTwo">作品榜</div>

        </div>
    </div>
</template>
<script setup>
import { Grid, Ship, Link, Bicycle, Pear, Headset, Warning } from '@element-plus/icons-vue'
import { ref, computed, onMounted, onUnmounted, h } from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import axios from 'axios'
import { ElMessage, ElNotification, componentSizeMap, ElMessageBox } from 'element-plus'
import { MagicStick, View } from '@element-plus/icons-vue'
import { timePanelSharedProps } from 'element-plus/es/components/time-picker/src/props/shared';
const router = useRouter()
const store = useStore()
const userId = ref(store.state.userFormInfo._id)
const taleList = ref([])
const selectWhich = ref(0)
const howSort = ref(0)
const isDisabled = ref(false)
const isMark = ref(false)
const whatTime = ref('贵安！')
const taleForm = ref({})
let count = 1
//有没有人点过赞 
const handleView = (id)=>{
    router.push(`/tale-view/${id}`)
}
const whatType = (type)=>{
    if(type ===0 ){
        return "非恐怖" 
    }
    else if(type === 1){
        return "自创故事"
    }
    else if(type === 2){
        return "据事实改编"
    }
    else if(type === 3){
        return "我有一个朋友"
    }
    else if(type === 4){
        return "搬运"
    }
    else if(type === 5){
        return "我听说" 
    }
    else if(type === 6){
        return "恐怖"
    }
}


            
const ifLike= (item)=>{
    
    if(store.state.userFormInfo.toGood && store.state.userFormInfo.toGood.indexOf(item.id) != -1){

            return true
    }else{
        console.log(store.state.userFormInfo.toGood.indexOf(item.id),item.id)
        return false
    }
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

const handleLike = async (item) => {//点过
    taleForm.value = item
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
        console.log(res.data)
        store.commit("changeUserFormInfo",res.data.data)
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
            taleForm.value.goodNumber ++
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
        let res = await axios.post(`/froumApi/froum/like`, form).then(res =>{
            console.log(res.data)
            store.commit("changeUserFormInfo", res.data.data)
            taleForm.value.whoGood = JSON.stringify(arrLike)
            taleForm.value.goodNumber --
        })
      
}
}
const handleMarck = async () => {
    let res = await axios.get(`/froumApi/froum/marck?id=${store.state.userFormInfo._id}`)
    if (res.data.ok) {
        isMark.value = true
        ElNotification({
            title: '签到成功',
            message: h('i', { style: 'color: teal' }, '能量加10,power!!!'),
        })
        store.commit("changeUserFormInfo", res.data.data)

    } else {
        console.log('签到出错')
    }
}

const contentValue = (content) => {
    let rm = /<(\w+)(?:\s+[^>]+)?>|<\/\w+>/g
    let str1 = content.replace(rm, '')
    str1 = str1.replace(rm, '')
    str1 = str1.replace(/&nbsp;/g, '')
    return str1.substring(0, 100)
}

const getList = async (id, num, page, sort) => {
    let res = await axios.get(`/froumApi/froum/getTaleList?id=${id}&num=${num}&page=${page}&Hsort=${sort}`)

    return res
}

const sortSelect = async (evt) => {
    howSort.value = parseInt(evt.currentTarget.dataset.id)
    count = 1
    // console.log(evt.currentTarget.dataset.id)
    let res = await getList(selectWhich.value, 6, count, howSort.value)

    if (res.data.ok) {
        taleList.value = res.data.data
        console.log(res.data.data)
    } else {
        taleList.value = []
    }
}
const handleSelect = async (evt) => {

    count = 1
    // console.log(evt.currentTarget.dataset.id)
    selectWhich.value = Number(evt.currentTarget.dataset.id)
    let res = await getList(selectWhich.value, 6, count, howSort.value)

    if (res.data.ok) {
        taleList.value = res.data.data
        store.commit('changeTaleList',taleList.value)
    } else {
        taleList.value = []
    }
}
const handleScroll = async () => {
    // console.log(window.scrollY)
    // console.log(document.documentElement.scrollHeight, document.documentElement.clientHeight)
    let toBottom = document.documentElement.scrollHeight - document.documentElement.clientHeight - window.scrollY
    if (toBottom <= 50) {

        window.removeEventListener('scroll', handleScroll)
        setTimeout(() => {
            window.addEventListener('scroll', handleScroll)
            console.log()
        }, 2000);

        console.log('到底了')
        count++
        isDisabled.value = true

        let res = await getList(selectWhich.value, 6, count, howSort.value)
        if (res.data.ok) {
            // console.log(res.data.data)
            taleList.value = [
                ...taleList.value,
                ...res.data.data
            ]
       
            store.commit('changeTaleList',taleList.value)
        } else {
            console.log('无了')
        }
    }
}
onMounted(async () => {

    let userMarckTime = new Date(store.state.userFormInfo.marckTime)
    let nowTime = new Date()

    if (userMarckTime.getDay() != nowTime.getDay()) {
        isMark.value = false
    } else {
        isMark.value = true
    }
    window.addEventListener('scroll', handleScroll);
    let res = await getList(selectWhich.value, 6, count, howSort.value)
    if (res.data.ok) {
        taleList.value = res.data.data
        store.commit('changeTaleList',taleList.value)
    } else {
        taleList.value = []
    }

})
onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})



</script>
<style scoped>
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

.sort-be-select {}


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
.after{
    color: #8A919F;
    font-size: 12px;
  
}
.after > span{
    background-color: #cdced060;
    padding: 1px 4px;
    border-radius: 2px;
}
.after:hover{
   color:rgba(24, 220, 2, 0.914);
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

.mainBox {
    display: flex;
    width: 82%;
    margin: 0 auto;
    margin-top: 1.2%;
    /* overflow: hidden; */

}

.left {
    position: sticky;
    top: 75px;
    padding-top: 5px;
    flex: 4;
    background-color: rgb(255, 255, 255);
    padding-left: 5px;
    border-radius: 5px;
    overflow: hidden;
    height: 360px;
}

.center {
    flex: 20;
    background-color: rgb(255, 255, 255);
    margin-left: 15px;
    border-radius: 8px;
    margin-right: 15px;
    max-width: 53%;
}

.right {
    flex: 4;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    /* justify-items: center; */
    /* text-align: center; */
}

.rightWord {
    margin-right: 60px;
}

.rightOne {
    /* height:100px; */
    background-color: rgb(255, 255, 255);
    padding: 20px;
    /* padding-right: 10px; */
    border-radius: 8px;
    display: flex;
}

.rightTime {
    font-size: 16px;
    font-weight: 600;

}

.rightToke {
    font-size: 13px;
    color: #8A919F;
    margin-top: 10px;
}

.rightTwo {
    height: 100px;
    background-color: white;
    padding: 12px;
    margin-top: 20px;
    border-radius: 8px;
}

.rightMark {
    margin-top: 10px;
    background-color: rgba(135, 248, 137, 0.148);
    border-radius: 5px;
    color: rgb(24, 220, 0);
    border: 1px rgba(26, 220, 0, 0.721) solid;
    text-align: center;
    font-size: 15px;
    height: 36px;
    line-height: 36px;
    padding: 0 12px;
    min-width: 60px;
    /* height: 60px; */
    /* line-height: 60px; */
    cursor: pointer;
    overflow: hidden;
    white-space: nowrap;
}

.first>span {
    margin-bottom: 2px;
}

.select {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    /* text-cunxicaoalign: center; */
    /* margin-left: 5px; */
    padding-left: 3px;
    margin-left: 12px;
    width: 85%;
    line-height: 50px;
    /* width: 100%; */
    height: 50px;
    font-weight: 500;
    color: rgb(81, 87, 103);
    font-size: 16px;
    border-radius: 8px;
    cursor: pointer;
}

.select.no-no:hover {
    background-color: rgba(182, 188, 182, 0.241);
    color: rgb(24, 220, 2);
}

.yse-yse.select:hover {
    background-color: rgba(190, 17, 17, 0.241);
    color: rgb(191, 14, 14);
}

.be-select {
    color: rgb(24, 220, 2);
    background-color: rgba(79, 234, 255, 0.077)
}

.yes-select {
    background-color: rgba(190, 17, 17, 0.241);
    color: rgb(191, 14, 14);
}
</style>