<template>
    <div>
        <div class="center-two">
            <div class="center-two-title">
                <h3>创作数据</h3>
            </div>
            <div class="center-two-post">
                <div class="center-two-post-h4">

                    <h4>
                        <el-icon>
                            <Tickets />
                        </el-icon>
                        贴子图表
                    </h4>
                </div>
                <div class="center-two-post-chartBox">
                    <div class="center-two-post-MyPostChart" ref="MyPostChart">

                    </div>
                    <div class="center-two-post-MyPostChart" ref="MyPostChart2">

                    </div>

                </div>
            </div>

            <div class="center-two-tale">
                <div class="center-two-post-h4">

                    <h4>
                        <el-icon>
                            <Notebook />
                        </el-icon>
                        故事图表
                    </h4>
                </div>

                <div class="center-two-post-chartBox">
                    <div class="center-two-post-MyPostChart" ref="MyTaleChart">

                    </div>
                    <div class="center-two-post-MyPostChart" ref="MyTaleChart2">

                    </div>

                </div>

            </div>
        </div>
    </div>

</template>
<script setup>
import { Tickets, Notebook } from '@element-plus/icons-vue'
import { useStore } from 'vuex';
import { ref, onMounted } from 'vue'
import axios from 'axios'
import option from '../../../util/echartsInit';
import * as echarts from 'echarts'
const store = useStore()
const userForm = ref(store.state.userFormInfo)
const percentage = ref(0)
const MyPostChart = ref(null)
const MyPostChart2 = ref(null)
const MyTaleChart = ref(null)
const MyTaleChart2 = ref(null)
const postData = ref([ //
    { value: 0, name: "无事水水" },
    { value: 0, name: "游戏相关" },
    { value: 0, name: "趣事分享" },
    { value: 0, name: "意见征集" },
    { value: 0, name: "求助" }
],)
const taleData = ref([ //
    { value: 0, name: "非恐怖" },
    { value: 0, name: "自创故事" },
    { value: 0, name: "据事实改编" },
    { value: 0, name: "我有一个朋友" },
    { value: 0, name: "搬运" },
    { value: 0, name: "我听说" },
    { value: 0, name: "恐怖" }
],)

const randerPost = (res2) => {
    let postList = res2.data.postList

    let postLookNumber = 0
    let postGoodNumber = 0
    let postCollectionNumber = 0

    for (let item of postList) {
        postLookNumber += item.lookNumber
        if (item.whoGood) {
            postGoodNumber += item.whoGood.length
        }
        if (item.whoCollection) {
            postCollectionNumber += item.whoCollection.length
        }
        postData.value[item.type].value++

    }
    randerPostData()
    randerPostGoodData(postLookNumber, postGoodNumber, postCollectionNumber)
}

const randerPostGoodData = (postLookNumberpost, postGoodNumber, CollectionNumber) => {
    if (MyPostChart2.value) {
        MyPostChart2.value = echarts.init(MyPostChart2.value)
        MyPostChart2.value.setOption(option.MyPostChart2(postLookNumberpost, postGoodNumber, CollectionNumber))
    }
}
const randerPostData = () => {
    if (MyPostChart.value) {
        MyPostChart.value = echarts.init(MyPostChart.value)
        MyPostChart.value.setOption(option.MyPostChart(postData.value));
    }
}


const randerTale = (res2) => {

    let taleList = res2.data.taleList

    let TaleLookNumber = 0
    let TaleGoodNumber = 0
    let TaleCollectionNumber = 0

    for (let item of taleList) {
        TaleLookNumber += item.lookNumber
        if (item.whoGood) {
            TaleGoodNumber += item.whoGood.length
        }
        if (item.whoCollection) {
            TaleCollectionNumber += item.whoCollection.length
        }
        taleData.value[item.type].value++

    }
    console.log(TaleLookNumber, TaleGoodNumber, TaleCollectionNumber)

    randerTaleData()
    randerTaleGoodData(TaleLookNumber, TaleGoodNumber, TaleCollectionNumber)
}

const randerTaleGoodData = (TaleLookNumber, TaleGoodNumber, TaleCollectionNumber) => {
    if (MyTaleChart2.value) {
        MyTaleChart2.value = echarts.init(MyTaleChart2.value)
        MyTaleChart2.value.setOption(option.MyTaleChart2(TaleLookNumber, TaleGoodNumber, TaleCollectionNumber))
    }
}
const randerTaleData = () => {
    if (MyTaleChart.value) {
        MyTaleChart.value = echarts.init(MyTaleChart.value)
        MyTaleChart.value.setOption(option.MyTaleChart(taleData.value))
    }
}

const whatRole = () => {
    if (store.state.userFormInfo.level <= 4) {
        return '普通用户'
    } else {
        return '高能用户'
    }

}

onMounted(async () => {



    percentage.value = parseFloat((store.state.userFormInfo.power - store.state.userFormInfo.level * 200) / 200 * 100)
    // let level = power % 100
    let res = await axios.get(`/froumApi/froum/getUser?id=${userForm.value._id}`)
    if (res.data.ok) {

        store.commit("changeUserFormInfo", res.data.data)
        // console.log(res.data.data)
        userForm.value = store.state.userFormInfo

    } else {

    }
    let res2 = await axios.get(`/froumApi/froum/getUserArticle?id=${userForm.value._id}`)
    if (res2.data.ok) {

        randerPost(res2)
        randerTale(res2)
    } else {

    }
})




</script>

<style scoped>
.center-one-right-userbox-username {
    color: #18dc00;
    font-weight: 600;
    margin-right: 20px;
}

.center-one-right-userbox-userrole {
    font-size: 13px;
    color: white;
    padding: 3px;
    border-radius: 3px;
    background-color: #1adc00e0;
}

.center-one-right-progress-box {
    display: flex;
    margin-top: 20px;
    max-width: 400px;


    /* border-radius: ; */
    /* position: relative; */
}

.center-one-right-power-box {
    margin-top: 20px;
    color: #18d554;
    margin-bottom: 40px;
}

.center-one-right-progress-box-left {
    flex: 1;
}

.center-one-right-progress-box-left>span {
    background-color: #18dc00;
    padding: 1px 5px 1px 5px;
    border-radius: 3px;
    color: white;
}

.center-one-right-progress-box-right {
    flex: 8;
    background-color: #18dc00;
    border-radius: 30px 30px 30px 0px;
}

.center-two-post-chartBox {
    display: flex;
    max-width: 100%;
}

.center-two-post-h4 {
    margin-top: 30px;
    margin-left: 40px;
    margin-bottom: 30px;
    height: 40px;
    line-height: 40px;

}

.center-two-post {
    padding-bottom: 10px;
    border-bottom: 1px solid rgb(204, 204, 204);
}


.center-two-post-MyPostChart {
    flex: 1;
}

/* .center-one-right-progress-box-right::before{
    width: 10px;
    height: 10px;
    content: '';

    background-color: #ffffff;
    z-index: 5;
    position: absolute;
  
} */
.center-one {
    display: flex;
    margin-bottom: 10px;
    border-bottom: 1px solid rgba(90, 90, 90, 0.137);

}

.center-one-left {
    flex: 1;
    display: flex;
    /* background-color: #18dc00; */
    /* align-items: center; */
    justify-content: center;
}



.center-one-right {
    flex: 7;
}

.center-two-post-MyPostChart {
    width: 300px;
    height: 300px;
}
</style>