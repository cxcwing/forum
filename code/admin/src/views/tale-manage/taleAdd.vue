<template>
    <div id="app">
        <ckeditor :class="'editorEr'" style="min-height:400px;" class="editor" :editor="editor" v-model="editorData"
            :config="editorConfig" @input="WhenInput"></ckeditor>
        <!-- <button @click="click">post</button> -->
        <div class="box2">
            <div v-html="views"></div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

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
import axios from 'axios';
const click = async () => {
    axios.post(`http://localhost:3000/adminApi/user/imageAdd`, { ok: 1 },
        {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
}
let views = ref()

const WhenInput = (data) => {
    console.log(editorData.value)
    views.value = editorData.value
}





const editor = ClassicEditor;
const editorData = ref('<p>Content of the editor.</p>');
let token = localStorage.getItem("token")
const editorConfig = ref({
    plugins: [
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
    ],
    toolbar: {
        items: [
            'undo',
            'redo',
            'selectAll',
            '|',
            'blockQuote',
            'outdent', 'indent',
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
        uploadUrl: '/adminApi/user/imageAdd',

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
#app {
    width: 80%;
    margin: 0 auto;
}

.editorEr {
    height: 500px;
}

img{
    height: auto   ;
    /* max-width: 80%; */
    /* overflow: hidden; */
}
</style>
