<template>
    <div>

        <div class="input-box">
            <el-input id="el-input3" v-model="emojisOutput" @input="handleInput" :autosize="{ minRows: 3, maxRows: 6 }"
                maxlength="300" placeholder="友好评论哦" show-word-limit type="textarea" />

            <div class="btnBox">
                <span @click="handleEmoji">😀</span>
                <el-button @click="handleUpdate" type="primary">发布</el-button>
            </div>
            <div class="Picker-emoji-box">
                <Picker class="Picker-emoji" v-if="isShow" :data="emojiIndex" set="twitter" @select="showEmoji" />
            </div>
        </div>

    </div>

</template>
<script setup>
import EmojiMartPicker from 'emoji-mart-vue3'
import { ref } from 'vue'
// all emoji sets.
import data from "emoji-mart-vue-fast/data/all.json";
// Import default CSS
import "emoji-mart-vue-fast/css/emoji-mart.css";
import { Picker, EmojiIndex } from "emoji-mart-vue-fast/src";
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios'
import { ElMessage } from 'element-plus'
const route = useRoute()
const router = useRouter()
const isShow = ref(false)
const store = useStore()
const emojiIndex = new EmojiIndex(data)
const emojisOutput = ref('')
const showEmoji = (emoji) => {
    emojisOutput.value = emojisOutput.value + emoji.native;
}
const text = ref('')
const commentForm = ref({
    textId: 0,
    content: emojisOutput,
    userId: '',
    userName: '',
    userAvatar: ''
})
const handleInput = () => {

}
const handleEmoji = () => {
    isShow.value = !isShow.value

}
const handleUpdate = () => {
    if (store.state.userFormInfo._id) {
        if (emojisOutput.value != '') {
            commentForm.value.userId = store.state.userFormInfo._id
            commentForm.value.userName = store.state.userFormInfo.username
            commentForm.value.userAvatar = store.state.userFormInfo.avatar
            commentForm.value.textId = route.params.id
            console.log(route.params.id)
            axios.post(`/froumApi/froum/commentUpdatePost`, commentForm.value).then(res => {
                if (res.data.ok) {
                    ElMessage({
                        message: '发布评论成功',
                        type: 'success',
                    })
                }
            })
            isShow.value = false
        } else {
            ElMessage({
                message: '评论不能为空',
                type: 'warning',

            })
        }

    } else {
        ElMessage({
            message: '请确认登陆后评论哦',
            type: 'warning',
        })
    }
}
</script>
<style scoped>
.btnBox {
    margin-top: 20px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: end;
    justify-items: end;

}

.btnBox>.el-button {

    margin-right: 20px;
}

.btnBox>span {
    margin-right: 25px;
}

.Picker-emoji-box {
    position: relative;
}
</style>