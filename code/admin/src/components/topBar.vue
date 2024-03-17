<template>

        <div class="top-bar">
            <div class="left">
                <el-icon @click="handleColl"><Menu /></el-icon>
                <span class="title">
                    草吧后台管理中心
                </span>
            </div>
            <div class="right">
                <el-dropdown trigger="click">
                    <el-avatar :size="50" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
    
    
            </div>
        </div>
</template>

<style scoped>
/* .header{
    
} */
.top-bar {
  
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    /* width: 100%; */
    /* background-color: aqua; */

}
.el-icon{
    margin-right:10px ;
}
.left {
    display: flex;
    align-items: center;
    background-color: antiquewhite;
    line-height: 60px;
    height: 100%;
    font-size: 20px;
    font-weight: 600;
    color: white;
    /* font-size: 36px;
    font-weight: bold; */
    background-image: -webkit-linear-gradient(0deg, rgb(228, 255, 244) 0%, rgb(180, 250, 215) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.right {
    display: flex;
    align-items: center;
    /* background-color: red; */
    line-height: 60px;
    height: 100%;
    margin-right: 20px;
}
</style>
<script setup>
import { Menu } from '@element-plus/icons-vue'
import { handleError } from 'vue';
import { useStore } from 'vuex';
const store = useStore()
const handleColl = ()=>{
    store.commit('changeIsCollapse')
    // console.log(store.state.isCollapse)
}


</script>