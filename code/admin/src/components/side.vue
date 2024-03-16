<template>
    <el-menu default-active="1" 
    class="el-menu-vertical-demo"
    :collapse="false">
        <el-menu-item index="1">
            <template #title>
                <el-icon ><HomeFilled /></el-icon>
                首页
            </template>
        </el-menu-item>
        <el-menu-item index="2">
            <template #title>
                
                <el-icon><Avatar /></el-icon>
                个人中心
            </template>
        </el-menu-item>
        <el-sub-menu @click='handleClose' index="4">
            <template #title>
                <el-icon><UserFilled /></el-icon>
                <span>用户管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="4-1">用户列表</el-menu-item>
                <el-menu-item index="4-2">添加用户</el-menu-item>
            </el-menu-item-group>
        </el-sub-menu>

        <el-sub-menu index="5">
            <template #title>
                <el-icon><Notebook /></el-icon>
                <span>故事管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="5-1">故事列表</el-menu-item>
                <el-menu-item index="5-2">添加故事</el-menu-item>
            </el-menu-item-group>
        </el-sub-menu>

        <el-sub-menu index="4">
            <template #title>
                <el-icon><MessageBox /></el-icon>
                <span>贴子管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="4-1">贴子列表</el-menu-item>
                <el-menu-item index="4-2">添加贴子</el-menu-item>
            </el-menu-item-group>
        </el-sub-menu>

    </el-menu>
</template>

<script setup>
import { ref } from 'vue'
import { House,HomeFilled,UserFilled,MessageBox,Avatar,Notebook} from '@element-plus/icons-vue'

let isCollapse = false

function handleClose(){
    return 1
}

</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
</style>