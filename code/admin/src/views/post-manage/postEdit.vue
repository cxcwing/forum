<template>
    <div>
        <el-card v-loading="loading">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <p style="color: black; font-weight:500;">草吧后台管理中心</p>
                </el-breadcrumb-item>
                <el-breadcrumb-item>
                    <h2 class="homeXie" href="/">首页</h2>
                </el-breadcrumb-item>
            </el-breadcrumb>
            <el-form ref="ruleFormRef" style="max-width: 100%;" :model="postForm" :rules="rules" label-width="auto"
                class="demo-ruleForm" :size="formSize" status-icon>
                <el-form-item label="标题" prop="title">
                    <el-input size="large" placeholder="建议不超过30个字哦" v-model="postForm.title" />
                </el-form-item>
                <el-form-item label="内容" prop="content">
                    <div id="app">
                        <ckeditor :class="'editorEr'" style="min-height:400px;" class="editor" :editor="editor"
                            v-model="postForm.content" :config="editorConfig" @input="WhenInput"></ckeditor>
                        <!-- <button @click="click">post</button> -->

                    </div>
                </el-form-item>

                <el-form-item :size="'large'" label="类型" prop="gender">
                    <el-select style="width: 200px;" v-model="postForm.type" placeholder="选择类型" class="sel">
                                  <el-option label="无事水水" value="0" />
                        <el-option label="趣事分享" value="1" />
                        <el-option label="游戏相关" value="2" />
                        <el-option label="意见征集" value="3" />
                        <el-option label="求助" value="4" />
                    </el-select>
                </el-form-item>
                <el-form-item label="封面" prop="cover">
                    <Upload :avatar="postForm.cover" @handleChange="handleChange" />
                </el-form-item>
            </el-form>
            <div class="bottom">
                <el-button type="primary" size="large" round @click="handleCommit">修改故事</el-button>
                <el-button round size="large">预览故事</el-button>
                <!-- <el-button type="primary" round></el-button> -->
                <!-- <el-button type="primary" round>发布故事</el-button> -->
            </div>
        </el-card>
        <el-dialog v-model="dialogVisible" title="Tips" width="500">
            <span>确认要更改吗</span>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="commitSure">
                        确认发布
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import Upload from '@/components/Upload.vue';
import { ref, reactive ,onMounted} from 'vue';
import { useStore } from 'vuex';
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Bold, Code, Italic, Strikethrough, Subscript, Superscript, Underline } from '@ckeditor/ckeditor5-basic-styles';
import { Link, LinkImage } from '@ckeditor/ckeditor5-link';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { Font } from '@ckeditor/ckeditor5-font';
import { CodeBlock } from '@ckeditor/ckeditor5-code-block';
import { Clipboard } from '@ckeditor/ckeditor5-clipboard';
import { Indent } from '@ckeditor/ckeditor5-indent';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import { FindAndReplace } from '@ckeditor/ckeditor5-find-and-replace';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { HorizontalLine } from '@ckeditor/ckeditor5-horizontal-line';
import { Image, AutoImage, ImageCaption, ImageResize, ImageStyle, ImageToolbar, ImageInsert } from '@ckeditor/ckeditor5-image';
import { SimpleUploadAdapter } from '@ckeditor/ckeditor5-upload';
import { ListProperties } from '@ckeditor/ckeditor5-list';
import { List } from '@ckeditor/ckeditor5-list';
import { Table, TableToolbar } from '@ckeditor/ckeditor5-table';
import { WordCount } from '@ckeditor/ckeditor5-word-count';
import { SpecialCharacters, SpecialCharactersEssentials } from '@ckeditor/ckeditor5-special-characters';
import axios from 'axios';
import { ElNotification } from 'element-plus'
import upLoad from '@/util/upLoad';
import {useRoute,useRouter} from 'vue-router'
const router = useRouter()
const route = useRoute()
const store = useStore()
const dialogVisible = ref(false)
const ruleFormRef = ref()
const loading = ref(false)
const postForm = ref({
    title: '',
    type: '0',
    content: '',
    cover: '',
    file: null,
    author: '',
    authorId: '',
})
onMounted(async ()=>{
    console.log(route.params.id)
    let res = await axios.get(`/adminApi/post/getThisPost?id=${route.params.id}`)
    if(res.data.ok){
        postForm.value = res.data.data
    }
})

const handleChange = (file) => {
    // console.log(file,'')
    console.log(postForm.value.cover)
    postForm.value.cover = URL.createObjectURL(file.raw)
    postForm.value.file = file.raw
}
const rules = reactive({

    title: [{ required: true, message: '输入标题', trigger: 'blur' },],
    content: [{ required: true, message: '内容不能为空哦', trigger: 'blur' },],

})


let views = ref()

const WhenInput = (data) => {
    console.log(postForm.value.content)

    // views.value = editorData.value
}

const valid = (form) => {
    if (form.title != '' && form.content != '' && form.cover != '') {
        return true
    } else {
        return false
    }
}

const handleCommit = () => {
    postForm.value.authorId = store.state.userFormInfo._id
    postForm.value.author = store.state.userFormInfo.username
    // console.log(postForm.value.author,postForm.value.authorId)/

    if (valid(postForm.value)) {

        dialogVisible.value = true

    } else {
        ElNotification({
            title: '发布失败',
            message: '请确保内容完整后提交哦',
            type: 'warning',
        })
    }
}
const commitSure = async () => {
    loading.value = true
    dialogVisible.value = false
    let res = await upLoad(`/adminApi/post/postUpdate`, postForm.value)
    if (res.data.ok) {

        loading.value = false
    }else{
        loading.value = false
    }
}








const editor = ClassicEditor;
const editorData = ref('');
let token = localStorage.getItem("token")
const editorConfig = ref({
    placeholder: '开始编辑吧！',
    plugins: [
        SpecialCharacters, SpecialCharactersEssentials,
        WordCount,
        Essentials,
        Bold,
        Code,
        Italic,
        Strikethrough,
        Subscript,
        Superscript,
        Underline,
        Link,
        Paragraph,
        CodeBlock,
        Font,
        Clipboard,
        Indent,
        BlockQuote,
        FindAndReplace,
        Heading,
        HorizontalLine,
        Image, ImageCaption, ImageResize, ImageStyle, ImageToolbar, AutoImage, LinkImage,
        ImageInsert,
        SimpleUploadAdapter,
        List,
        Table, TableToolbar,
    ],
    toolbar: {
        items: [

            'undo',
            'redo',
            'selectAll',
            '|',
            'blockQuote',
            'outdent', 'indent',
            'bulletedList', 'numberedList',
            'fontSize',
            'fontColor',
            'fontBackgroundColor',
            'horizontalLine',
            'findAndReplace',
            '|',
            'link',
            'insertImage',

            'code',
            'codeBlock',
            'insertTable',
            'specialCharacters',
            '-',
            'heading',
            '|',
            'bold',
            'italic',
            'underline',
            'strikethrough',
            'superscript',
            'subscript',
        ],
        shouldNotGroupWhenFull: true
    },
    table: {
        defaultHeadings: { rows: 1, columns: 1 },

    },
    image: {
        toolbar: [
            'imageStyle:alignBlockLeft',
            'imageStyle:alignBlockRight',
            'imageStyle:alignCenter',
            'imageStyle:alignRight',
            'imageStyle:alignLeft',
            '|',
            'toggleImageCaption',
            'imageTextAlternative',
            '|',
            'linkImage'
        ],
        resizeUnit: 'px',
        insert: {
            // If this setting is omitted, the editor defaults to 'block'.
            // See explanation below.
            type: 'auto'
        }
    },
    fontSize: {
        options: [
            'tiny',
            'default',
            'big'
        ]
    },
    simpleUpload: {
        // The URL that the images are uploaded to.
        uploadUrl: 'adminApi/user/imageAdd',

        // Enable the XMLHttpRequest.withCredentials property.
        withCredentials: true,

        // Headers sent along with the XMLHttpRequest to the upload server.
        headers: {

            Authorization: `Bearer ${token}`,
        }
    }
});

//http://localhost:3000//images/1711274444185-91FC1776464403A71A5C96309149CC6E.png


</script>

<style scoped>
.bottom {
    text-align: right;
}

.el-breadcrumb {
    margin-bottom: 20px;
}

.el-form-item {
    margin-left: 5%;
}

#app {
    width: 90%;
    margin: 0 auto;
    margin-bottom: 20px;
}

.editorEr {
    height: 500px;
}

img {
    height: auto;
    /* max-width: 80%; */
    /* overflow: hidden; */
}
</style>
