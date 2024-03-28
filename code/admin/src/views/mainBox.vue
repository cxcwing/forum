<template>
    <div class="common-layout">
        <el-container>
            <el-aside :width="whichOne">
                <side></side>
            </el-aside>
            <el-container>
                <el-header >

                    <topBar></topBar>
                </el-header>
                <el-main id='el-main'>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>


<script setup>
import topBar from '@/components/topBar.vue'
import side from '@/components/side.vue'
import store from '@/store/index.js';

const whichOne=()=> store.state.isCollapse?'64px':'200px'

</script>

<style scoped>
.el-header{
    background: rgb(1, 60, 118);
}
.el-main {
    width: 100%;
    /* background-color: rgb(82, 135, 135); */
    overflow: auto;
    height: calc(100vh - 60px);
}
</style>