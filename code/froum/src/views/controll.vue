<template>
    <div>
       <el-card class="mainCard">
            <el-container>
                <el-aside width="240px">
                    <el-col :span="166">
    
                        <el-menu :default-active="activeIndex " :router="true" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                   
                            <el-menu-item index="/controll/article-home">
    
                                <span>首页</span>
                            </el-menu-item>
                            <el-menu-item index="/controll/taleList">
    
                                <span>故事列表</span>
                            </el-menu-item>
                            <el-menu-item index="/controll/postList">
    
                                <span>贴子列表</span>
                            </el-menu-item>
                            <el-menu-item index="/controll/article-add">
    
                                <span>开始创作</span>
                            </el-menu-item>
                        </el-menu>
                    </el-col>
                </el-aside>
                <el-main>
                    <RouterView></RouterView>
                </el-main>
    
            </el-container>
       </el-card>

    </div>

</template>

<script setup>
import { RouterView, useRoute, useRouter } from 'vue-router';
import {ref} from 'vue'
const route = useRoute()
const router = useRouter()
const activeIndex = ref('/controll/article-home')


</script>
<style scoped>

.mainCard{
    min-height: 100vh;

}

</style>