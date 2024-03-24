<template>
    <div>
    <el-menu 
    :default-active="defultHref" 
    class="el-menu-vertical-demo"
    :collapse="$store.state.isCollapse"
    :router="true"

    >

        <el-menu-item  index="/home">
                <el-icon ><HomeFilled /></el-icon>
                <span>首页</span>
        </el-menu-item>

        <el-sub-menu index="4">
            <template #title>
                <el-icon><UserFilled /></el-icon>
                <span>用户管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="/user-manage/userList">用户列表</el-menu-item>
                <el-menu-item index="/user-manage/userAdd">添加用户</el-menu-item>
            </el-menu-item-group>
        </el-sub-menu>

        <el-sub-menu index="5">
            <template #title>
                <el-icon><Notebook /></el-icon>
                <span>故事管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="/tale-manage/taleList">故事列表</el-menu-item>
                <el-menu-item index="/tale-manage/taleAdd">添加故事</el-menu-item>
            </el-menu-item-group>
        </el-sub-menu>

        <el-sub-menu index="6">
            <template #title>
                <el-icon><MessageBox /></el-icon>
                <span>贴子管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="/post-manage/postAdd">贴子列表</el-menu-item>
                <el-menu-item index="/post-manage/postList">添加贴子</el-menu-item>
            </el-menu-item-group>
        </el-sub-menu>

    </el-menu>
</div>
</template>

<script setup>
// import {store} from 'vuex'
import {useStore} from "vuex"
import { ref } from 'vue'
import { House,HomeFilled,UserFilled,MessageBox,Avatar,Notebook} from '@element-plus/icons-vue'
const store = useStore()
// let isCollapse = false
// console.log()

let str1 = window.location.href.split('/')


let itemIndex = str1.length
const defultHref = ref('')
defultHref.value = window.location.href.includes('home')?'/home':`/${str1[itemIndex - 2]}/${str1[itemIndex - 1]}`
// console.log(defultHref.value)

</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
</style>