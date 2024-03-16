<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="200px">
                <side></side>
            </el-aside>
            <el-container>
                <el-header>Header</el-header>
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


</script>

<style scoped>
.el-main {
    background-color: rgb(82, 135, 135);
    overflow: auto;
    height: calc(100vh - 60px);
}
</style>