<template>
    <el-card class="mainBox">
        <div class="common-layout">
            <el-container>
                <el-aside width="200px">
                    <el-col :span="166">
                   
                        <el-menu :router="true" :default-active="active" class="el-menu-vertical-demo" @open="handleOpen"
                            @close="handleClose">
                            <el-menu-item index="/home/center">
                                <el-icon><icon-menu /></el-icon>
                                <span>首页</span>
                            </el-menu-item>
                            <el-menu-item index="/home/message">
                                <el-icon>
                                    <setting />
                                </el-icon>
                                <span>个人信息</span>
                            </el-menu-item>
                        </el-menu>
                    </el-col>

                </el-aside>
                <el-main>
                    <RouterView></RouterView>
                </el-main>
            </el-container>
        </div>
    </el-card>
</template>
<script setup>
import { reactive, ref } from 'vue'
const active = ref(`${window.location.href.includes('/home/center')?'/home/center':'/home/message'}`)


</script>
<style scoped>
.mainBox {
    
    width: 76%;
    margin: 0 auto;
    margin-top: 20px;
}
</style>
