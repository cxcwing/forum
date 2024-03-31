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
            <ul v-infinite-scroll="load" infinite-scroll-immediate="false" class="infinite-list"
                infinite-scroll-delay="5000" :infinite-scroll-distance="10" style="overflow: auto">
                <li v-for="item in taleList" :key="item.id" class="infinite-list-item list-item">
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
                                    <span class="goodFirst">{{ item.author }}</span>

                                </div>
                                <div class="body">

                                    <span></span>
                                </div>
                                <div class="after">
                                    <span></span>
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
        <div class="right">3</div>
    </div>
</template>
<script setup>
import { Grid, Ship, Link, Bicycle, Pear, Headset, Warning } from '@element-plus/icons-vue'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import axios from 'axios'
const taleList = ref([])
const selectWhich = ref(0)
const howSort = ref(0)
const isDisabled = ref(false)
let count = 1

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
            console.log(res.data.data)
            taleList.value = [
                ...taleList.value,
                ...res.data.data
            ]
            console.log(taleList.value.length)
        } else {
            console.log('无了')
        }
    }
}
onMounted(async () => {
    window.addEventListener('scroll', handleScroll);
    let res = await getList(selectWhich.value, 6, count, howSort.value)
    if (res.data.ok) {
        taleList.value = res.data.data
    } else {
        taleList.value = []
    }

})
onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})



</script>
<style scoped>
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

.goodFirst {
    padding-right: 5px;
    position: relative;
}

.good {
    flex: 1;
    font-size: 13px;
    color: #8A919F;
    display: flex;
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
.list-item:hover{
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
    width: 85%;
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
    flex: 5;
    background-color: burlywood;

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