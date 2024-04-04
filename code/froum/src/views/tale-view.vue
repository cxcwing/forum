<template>
    <div class="body">
        <div class="mainBox">
            <div class="left">
                <div :class="`left-item left-magic ${isCollOrtoke(taleForm.whoGood, userId) === 1 ? 'active' : ''}`"
                    @click="handleLike">
                    <el-tag class="left-el-tag" :type="info" color="rgb(138, 145, 159)" effect="dark" round>
                        {{ taleForm.goodNumber }}
                    </el-tag>
                    <el-icon class="left-el-icon ">
                        <MagicStick />
                    </el-icon>
                </div>
                <div class="left-item ">
                    <el-tag class="left-el-tag" :type="info" color="rgb(138, 145, 159)" effect="dark" round>
                        {{ HowComment(taleForm.Comment) }}
                    </el-tag>
                    <el-icon class="left-el-icon">
                        <Comment />
                    </el-icon>

                </div>
                <div :class="`left-item ${isCollOrtoke(taleForm.whoCollection, userId) ? 'active' : ''}`">
                    <el-tag class="left-el-tag" :type="info" color="rgb(138, 145, 159)" effect="dark" round>
                        {{ HowCollection(taleForm.whoCollection) }}
                    </el-tag>
                    <el-icon class="left-el-icon">
                        <StarFilled />
                    </el-icon>
                </div>
                <div></div>
            </div>
            <div class="center">2
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
            </div>
            <div class="right">3</div>

        </div>
    </div>
</template>


<script setup>
import { TagProps } from 'element-plus'
import { onMounted, ref } from 'vue'

import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { MagicStick, ChatDotRound, StarFilled, Comment } from '@element-plus/icons-vue'
import { useStore } from 'vuex';
const store = useStore()
const route = useRoute()
const router = useRouter()
const userForm = ref({})
const taleForm = ref({})
const isActive = ref('active')
const userId = ref(0)
const isCollOrtoke = (item, id) => {
    // console.log(item,id)
    if (item && item.length) {
        let arr = JSON.parse(item)
        if (arr.indexOf(id) != -1) {
            return 1//非空 且有
        } else {
            return 2//非空 但是无
        }
    } else {
        return 0 //空
    }
}
const HowCollection = (item) => {
    let num = 0
    if (item) {
        let arr = JSON.parse(item)
        num = arr.length
    }
    return num
}
const HowComment = (item) => {
    let num = 0
    if (item) {
        let arr = JSON.parse(item)
        num = arr.length
    }
    return num
}
const handleLike = async () => {//点过

    // console.log(isCollOrtoke(taleForm.value.whoGood,userId.value))
    // console
    if (isCollOrtoke(taleForm.value.whoGood, userId.value) === 1) {//删除
        let arrLike = JSON.parse(taleForm.value.whoGood)
        let arrUser = store.state.userFormInfo.toGood
        let index1 = arrLike.indexOf(userId.value)
        let index2 = arrUser.indexOf(taleForm.value.id)
        console.log()
        arrLike.splice(index1, 1)
        arrUser.splice(index2, 1)
        let form = {
            likeArr: JSON.stringify(arrLike),
            userGood: JSON.stringify(arrUser),
            taleId: taleForm.value.id,
            userId: userId.value
        }
        let res = await axios.post(`/froumApi/froum/like`, form)
        if (res.data.ok) {
            console.log(res.data)
            store.commit("changeUserFormInfo",res.data.data)
            taleForm.value.whoGood = JSON.stringify(arrLike)
            taleForm.value.goodNumber--
        }
    } else if (isCollOrtoke(taleForm.value.whoGood, userId.value) === 2) {
        let arrLike = JSON.parse(taleForm.value.whoGood)
        let arrUser = store.state.userFormInfo.toGood
        if (!arrUser) {
            arrUser = []
        }
        arrLike.push(userId.value)
            arrUser.push(taleForm.value.id)
            let form = {
                likeArr: JSON.stringify(arrLike),
                userGood: JSON.stringify(arrUser),
                taleId: taleForm.value.id,
                userId: userId.value
            }
            let res = await axios.post(`/froumApi/froum/like`, form)
            if (res.data.ok) {
                console.log(res.data)
                store.commit("changeUserFormInfo", res.data.data)
                taleForm.value.whoGood = JSON.stringify(arrLike)
                taleForm.value.goodNumber ++
            }
    } else if (isCollOrtoke(taleForm.value.whoGood, userId.value) === 0) {
        let arrLike = []
        let arrUser = store.state.userFormInfo.toGood
        if (!arrUser) {
            arrUser = []
        }
        arrLike.push(userId.value)
            arrUser.push(taleForm.value.id)
            let form = {
                likeArr: JSON.stringify(arrLike),
                userGood: JSON.stringify(arrUser),
                taleId: taleForm.value.id,
                userId: userId.value
            }
            let res = await axios.post(`/froumApi/froum/like`, form).then(res =>{
                console.log(res.data)
                store.commit("changeUserFormInfo", res.data.data)
                taleForm.value.whoGood = JSON.stringify(arrLike)
                taleForm.value.goodNumber --
            })
          
    }
}
onMounted(() => {
    // console.log(route.params.id)
    userId.value = store.state.userFormInfo._id
    axios.get(`/froumApi/froum/getTale?id=${route.params.id}`).then(res => {
        // console.log(res.data)
        userForm.value = res.data.athorData
        taleForm.value = res.data.data
        // console.log(isCollOrtoke(taleForm.value.whoGood,store.state.userFormInfo._id))

    })
})


</script>


<style scoped>
.body {
    margin-top: 2vh;
}

.mainBox {
    /* margin-top: 200px; */
    display: flex;
    margin: 0 auto;
    width: 85%;

}

.left-item {

    background-color: white;
    height: 50px;
    width: 50px;
    text-align: center;
    box-sizing: content-box;

    font-size: 25px;
    line-height: 50px;
    border-radius: 25px;
    margin-bottom: 20px;
    color: rgb(138, 145, 159);
    box-shadow: 1px 1px 2px rgba(138, 145, 159, 0.451);
    position: relative;
}

.left-el-icon {
    margin-top: 12px;
    /* color: aqua; */
}

.left-item:hover {
    color: rgba(24, 220, 2, 0.914);
    cursor: pointer;
}

.left {
    /* margin-top:5vh; */
    height: 50vh;
    flex: 1;
    /* background-color: aqua; */
    display: flex;
    position: sticky;
    top: 5vh;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.left-el-tag {
    border: none;
    position: absolute;
    font-size: 12px;
    max-width: 30px;
    overflow: hidden;
    right: -5px;
    height: 15px;
    line-height: 15px;
    text-align: left;
}

.active {
    color: rgba(24, 220, 2, 0.879);
}


.center {
    flex: 7;
    margin-right: 10px;
    background-color: antiquewhite;
    padding: 30px;
}

.right {
    flex: 2;
    background-color: violet;
}
</style>