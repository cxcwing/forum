<template>
    <div class="top">

        <div class='left'>
            <el-menu :router="true" :ellipsis="false" active-text-color="#02c9a6" id="el-menu"
                :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <div class="logo">
                    草吧
                </div>
                <el-menu-item index="/tale">故事</el-menu-item>
                <el-menu-item index="/post">贴子</el-menu-item>
                <!-- <el-menu-item index="/home">个人中心</el-menu-item> -->
                <div class="searchInput">
                    <el-input id="search" @input="handleInput" v-model="search" size="large"
                        style=" min-width: 400px;max-width: 500px;" placeholder="搜索" class="input-with-select">
                        <template #append>
                            <el-button :icon="Search" />
                        </template>
                    </el-input>
                    <div v-if="searchList.length" class="search-ul">
                        <div v-for="item in searchList" :key="item.id" class="search-li" @click="handleTo(item.id)">
                            {{ item.title }}
                        </div>


                    </div>
                </div>
                <div class='avatar'>
                    <el-avatar v-if="userForm.avatar" @mouseover="avatarHover" @mouseout="mouseOut" :class="avatarClass"
                        :size="40" :src='`http://localhost:3000${store.state.userFormInfo.avatar}`' />
                    <el-avatar v-else="userForm.avatar" @mouseover="avatarHover" @mouseout="mouseOut"
                        :class="avatarClass" :size="40" :src='`http://localhost:3000/images/1711108153245-0.png`' />

                    <div v-if="userForm._id" @mouseover="avatarHover" @mouseout="mouseOut" :class="form">

                        <span class="username">{{ userForm.username }}</span>
                        <div class="idLevelBox">
                            <span :class="idLevel">{{ whatRole() }}</span>
                            <span>lv{{ userForm.level }}</span>
                        </div>
                        <div class="powerBox">
                            <span class="power">能量 :{{ userForm.power }}</span>
                        </div>
                        <div class="goodBox">
                            <div @click="handlecollection" class="good">
                                <p class="goodTop">{{ howCollection }}</p>
                                <p class="goodFooter goodFooter">收藏</p>
                            </div>
                            <div @click="handleTale" class="beGood">
                                <p class="goodTop">{{ userForm.taleNum }}</p>
                                <p class="goodFooter beGoodFooter">故事</p>
                            </div>
                            <div @click="handlePost" class="beShou">
                                <p class="goodTop">{{ userForm.postNum }}</p>
                                <p class="goodFooter beShouFooter">贴子</p>
                            </div>

                        </div>
                        <div class="guangGao">意见征集 </div>
                        <div @click="handleCenter" class="center goToBox">
                            <el-icon>
                                <User />
                            </el-icon>
                            <span class="goTo">个人中心</span>
                            <el-icon>
                                <ArrowRight />
                            </el-icon>
                        </div>
                        <div @click="handleController" class="conBox goToBox">
                            <el-icon>
                                <EditPen />
                            </el-icon>
                            <span class="goTo">创作管理</span>

                            <el-icon>
                                <ArrowRight />
                            </el-icon>
                        </div>

                        <div @click="handleExit" class="exit goToBox">
                            <el-icon>
                                <SwitchButton />
                            </el-icon>
                            <span class="goTo">退出登陆</span>
                            <el-icon>
                                <ArrowRight />
                            </el-icon>
                        </div>
                    </div>
                    <div v-else="userForm._id" @mouseover="avatarHover" @mouseout="mouseOut" :class="form">
                        <span class="username">{{ userForm.username }}</span>
                        <div class="idLevelBox">
                            <span :class="idLevel">神秘用户</span>
                            <span>lv?</span>
                        </div>
                        <div class="powerBox">
                            <span class="power">能量 :???</span>
                        </div>
                        <div class="goodBox">
                            <div class="good">
                                <p class="goodTop">?</p>
                                <p class="goodFooter goodFooter">收藏</p>
                            </div>
                            <div class="beGood">
                                <p class="goodTop">?</p>
                                <p class="goodFooter beGoodFooter">故事</p>
                            </div>
                            <div class="beShou">
                                <p class="goodTop">?</p>
                                <p class="goodFooter beShouFooter">贴子</p>
                            </div>

                        </div>
                        <div class="guangGao">意见征集</div>
                        <div class="center goToBox">
                            <el-icon>
                                <User />
                            </el-icon>
                            <span class="goTo">没有个人中心</span>
                            <el-icon>
                                <ArrowRight />
                            </el-icon>
                        </div>
                        <div class="conBox goToBox">
                            <el-icon>
                                <EditPen />
                            </el-icon>
                            <span class="goTo">创作管理不了</span>

                            <el-icon>
                                <ArrowRight />
                            </el-icon>
                        </div>

                        <div @click="handleToLogin" class="exit goToBox">
                            <el-icon>
                                <Van />
                            </el-icon>
                            <span class="goTo">点击登陆</span>
                            <el-icon>
                                <ArrowRight />
                            </el-icon>
                        </div>

                    </div>
                </div>
                <div class="toLogin" v-if="!isLogin">
                    <el-button type="success" plain @click="handleToLogin" >点击登陆</el-button>
                </div>

            </el-menu>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { Search, Van, EditPen, ArrowRight, SwitchButton, User } from '@element-plus/icons-vue'
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

import axios from 'axios';
const isLogin = ref(false)
const route = useRoute()
const router = useRouter()
const store = useStore()
const activeIndex = ref('/tale')
const userForm = ref({})
const search = ref('')
const form = ref('form')
const avatarClass = ref('one')
const idLevel = ref('idLevel')
const searchList = ref([])
const whatRole = () => {
    if (store.state.userFormInfo.level <= 4) {
        return '普通用户'
    } else {
        return '高能用户'
    }

}
const avatarHover = () => {
    // console.log(1)
    form.value = 'form formHover'
    avatarClass.value = 'one Hover'
}
const handleToLogin = () => {
    window.location.href = '/login'
}
const mouseOut = () => {
    form.value = 'form'
    avatarClass.value = 'one'
}
const handleTo = (id) => {
    let arr2 = window.location.href.split('/')
    if (arr2[arr2.length - 1].includes('post')) {
        router.push(`/post-view/${id}`)
    } else if (arr2[arr2.length - 1].includes('tale')) {
        router.push(`/tale-view/${id}`)
    }

    search.value = ''
    searchList.value = []
}
const handleExit = () => {
    localStorage.removeItem('Ctoken')
    localStorage.removeItem('vuex')
    window.location.href = '/login'
}
const handleInput = (evt) => {

    let arr2 = window.location.href.split('/')

    if (arr2[arr2.length - 1].includes('post')) {

        if (evt) {
            searchList.value = store.state.postList.filter((item) => item.title.includes(evt))


        } else {
            searchList.value = []
        }
    } else if (arr2[arr2.length - 1].includes('tale')) {

        if (evt) {
            searchList.value = store.state.taleList.filter((item) => item.title.includes(evt))

        } else {
            searchList.value = []
        }
    }




}
const handlecollection = ()=>{
    router.push(`/home/center`)
}
const handleTale = () => {
    router.push(`/controll/taleList`)
}
const handlePost = () => {
    router.push(`/controll/postList`)
}
const howCollection = computed(() => {
    // userForm.collection===null?0:userForm.collection.length
    if (userForm.value.collection === null) {
        return 0
    } else if (userForm.value.collection != null) {
        return userForm.value.collection.length
    }
})
onMounted(async () => {


    let arr1 = window.location.href.split('/')
    activeIndex.value = `/${window.location.href.split('/')[arr1.length - 1]}`
    userForm.value = store.state.userFormInfo
    if (userForm.value._id) {
        isLogin.value = true
    } else {
        isLogin.value = false
    }
})

const handleCenter = () => {
    router.push('/home/center')
    activeIndex.value = null
}

const handleController = () => {
    router.push('/controll/article-home')
    activeIndex.value = null
}

</script>

<style scoped>
.goToBox:hover {
    background-color: aliceblue;
    border-radius: 15px;
}

.goTo {
    margin-left: 20px;
    margin-right: 40px;
}

.exit {
    margin-top: 10px;
    width: 80%;
    text-align: center;
    height: 50px;
    line-height: 50px;
}

.conBox {

    width: 80%;
    text-align: center;
    height: 50px;
    line-height: 50px;
    border-bottom: rgba(192, 189, 189, 0.692) solid 1px;
}

.center {
    margin-top: 10px;
    width: 80%;
    text-align: center;
    height: 50px;
    line-height: 50px;
}

.guangGao {
    width: 80%;
    text-align: center;
    height: 50px;
    line-height: 50px;
    border-radius: 9px;
    /* background-color: #32de84; */
    background-color: #8bfff4;
    background-image: linear-gradient(45deg, #8bfff4 0%, #2bffdc 52%, #2bff6c 88%);

}
.toLogin{
    height: 100%;
    line-height: 60px;
    margin-left: 70px;
}
.goodTop {
    font-size: 20px;

}

.goodFooter {
    font-size: 13px;
    color: gray;
}

.good {
    flex: 1;
    width: 50px;
    margin-right: 20px;
}

.goodFooter:hover {
    color: #2bf707;
}

.good:hover {
    color: #2bf707;
}


.beGood {
    flex: 1;
    margin-right: 20px;
}

.beGoodFooter:hover {
    color: #2bf707;
}

.beGood:hover {
    color: #2bf707;
}

.beShou {
    flex: 1;
}

.beShouFooter:hover {
    color: #2bf707;
}

.beShou:hover {
    color: #2bf707;
}

.goodBox {
    display: flex;
    text-align: center;
    /* align-items: center; */
    margin: 10px;
}

.powerBox {
    /* height: 100px; */
    margin-top: 10px;
    color: rgb(132, 187, 118);
}

.idLevel {

    margin-top: 20px;
    margin-right: 10px;
    padding-left: 5px;
    padding-right: 5px;
    color: white;
    font-size: 13px;
    font-weight: 800px;
    line-height: 100%;
    background-color: rgb(157, 240, 151);
    border-radius: 100px;
}

.username {

    margin-top: 49px;
    font-size: 18px;
    font-weight: 400;
    color: rgb(104, 227, 104)
}

.form {
    position: absolute;
    width: 320px;
    height: 420px;
    background-color: white;
    top: 70px;
    left: -155px;
    border: rgba(216, 223, 223, 0.6) solid 1px;
    box-shadow: 2px 2px 5px rgb(217, 217, 217), -2px -2px 10px rgb(217, 217, 217);
    border-radius: 8px;
    z-index: 1;

    display: none
}

.formHover {
    display: flex;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
}

.two {
    position: absolute;
    top: 0;
}

.avatar {
    height: 100%;
    margin-left: 10%;
    position: relative;

}

.el-avatar.one {
    margin-top: calc(50% - 10px);
    transition: all 0.5s;
    position: relative;
    z-index: 20;
}

.el-avatar.one.Hover {
    width: 90px;
    height: 90px;
    transform: translate(-40px, -9px);
    z-index: 20;
    cursor: pointer;
}

/* .el-avatar.one.Hover{
    width:90px;
    height:90px;
    transform: translate(-40px,-9px);
    z-index: 20;
    
} */

.searchInput {
    margin-top: 12px;
    margin-left: 10%;
    position: relative;
}

.search-ul {
    position: absolute;
    max-height: 500px;
    width: 400px;
    top: 45px;
    background-color: white;
    border-radius: 5px;
    border: 1px solid rgba(88, 86, 86, 0.077);
    padding-top: 5px;
    padding-bottom: 1px;

}

.search-li {

    background-color: white;
    height: 40px;
    line-height: 40px;
    padding-left: 2px;
    color: #414241;
}

.search-li:hover {
    background-color: #6f746e46;
    cursor: pointer;
}

.top {
    /* height: 6px; */
    position: sticky;
    width: 100%;
    background-color: white;
    top: 0;
    z-index: 1000;
    /* display: grid; */
    /* grid-template-columns: 1fr 1fr; */
}

#el-menu {
    width: 100%;
    height: 60px;
    border: none;
}

.left {
    position: relative;
    margin-left: 10%;

}

.right {
    background-color: wheat;
    align-items: center;
    justify-content: center;
}

.logo {
    position: absolute;
    left: -8%;
    height: 60px;
    line-height: 60px;
    background: rgb(0, 246, 148);
    /* background: linear-gradient(0deg, rgba(0, 246, 148, 1) 0%, rgba(0, 255, 222, 1) 100%); */

    font-size: 30px;
    font-weight: bold;
    background-image: -webkit-linear-gradient(0deg, rgba(0, 246, 148, 1) 0%, rgba(0, 255, 222, 1) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    cursor: pointer;
}
</style>