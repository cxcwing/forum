<template>
    <div class="mainBox">
        <div class='left'>
            <div class="select first no-no be-select">
                <el-icon>
                    <Grid />
                </el-icon>
                <span>综合</span>
                <hr>
            </div>
            <div class="select no-no">
                <el-icon>
                    <Ship />
                </el-icon>
                <span>自创故事</span>
            </div>
            <div class="select no-no">
                <el-icon><Link /></el-icon>
                <span>据事实改编</span></div>
            <div class="select no-no">
                
                <el-icon><Pear /></el-icon>
                <span>我有一个朋友</span>
            </div>
            <div class="select no-no">
                <el-icon><Bicycle /></el-icon>
                <span>搬运</span>
            </div>
            <div class="select no-no">
                <el-icon><Headset /></el-icon>
                我听说
            </div>

            <div class="select yse-yse">
                <el-icon><Warning /></el-icon>
                恐怖
            </div>
        </div>
        <div class='center'>
            5
        </div>
        <div class="right">3</div>
    </div>
</template>
<script setup>
import { Grid ,Ship,Link,Bicycle ,Pear ,Headset,Warning } from '@element-plus/icons-vue'

</script>
<style scoped>
.el-icon {
    /* box-sizing: border-box; */
    padding-right: 10px;
}

.mainBox {
    display: flex;
    width: 85%;
    margin: 0 auto;
    margin-top: 1.2%;
}

.left {
    padding-top:5px ;
    flex: 4;
    background-color: rgb(255, 255, 255);
    padding-left:5px;
    border-radius: 5px;
}

.center {
    flex: 20;
    background-color: bisque;
    margin-left: 20px;
}

.right {
    flex: 5;
    background-color: burlywood;

}
.first>span{
    margin-bottom:2px ;
}
.select {

    /* text-align: center; */
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
.select.no-no:hover{
    background-color:rgba(182, 188, 182, 0.241) ;
    color: rgb(24, 220, 2);
}
.yse-yse.select:hover{
    background-color:rgba(190, 17, 17, 0.241) ;
    color: rgb(191, 14, 14);
}
.be-select{
    color: rgb(24, 220, 2);
    background-color: rgba(79, 234, 255, 0.077)}
</style>