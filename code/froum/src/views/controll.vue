<template>
    <div>
        <el-card class="mainCard">
            <el-container>
                <el-aside width="240px">
                    <el-col :span="166">

                        <el-menu :default-active="activeIndex" :router="true" class="el-menu-vertical-demo"
                            @open="handleOpen" @close="handleClose">

                            <el-menu-item index="/controll/article-home">

                                <span>首页</span>
                            </el-menu-item>
                            <el-menu-item index="/controll/taleList">

                                <span>故事列表</span>
                            </el-menu-item>
                            <el-menu-item index="/controll/postList">

                                <span>贴子列表</span>
                            </el-menu-item>
                            <el-sub-menu index="/controll/post-add">
                                <template #title>
                   
                                    <span> 开始创作</span>
                                </template>
                        
                                    <el-menu-item index="/controll/post-add">发个贴子</el-menu-item>
                                    <el-menu-item index="/controll/tale-add">编写故事</el-menu-item>
                    
                            </el-sub-menu>

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
import { ref, onMounted } from 'vue'
const route = useRoute()
const router = useRouter()
const activeIndex = ref('/controll/tale-add')
onMounted(() => {
    let nowHref = window.location.href
    if (nowHref.includes("/controll/article-home")) {
        activeIndex.value = "/controll/article-home"
    } else if (nowHref.includes("/controll/taleList")) {
        activeIndex.value = "/controll/taleList"
    } else if (nowHref.includes("/controll/postList")) {
        
        activeIndex.value = "/controll/postList"
    } else if (nowHref.includes("/controll/tale-add")) {
        activeIndex.value = "/controll/tale-add"
    } else if (nowHref.includes("/controll/post-add")) {
        activeIndex.value = "/controll/post-add"
    }

})

</script>
<style scoped>
.mainCard {
    min-height: 100vh;

}
</style>