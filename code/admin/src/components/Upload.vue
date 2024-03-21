<template>
<div>

        <el-upload
        class="avatar-uploader"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :show-file-list="false"
        :auto-upload="false"
        :on-change="handleChange"
        :on-success="handleAvatarSuccess"
        >
        <img v-if="porps.avatar" :src="porps.avatar" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
</div>
   
</template>

<script setup>
import { ref} from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { UploadProps } from 'element-plus'
const imageUrl = ref()
const emi =defineEmits("[handleChange]")

const porps =  defineProps({
  avatar:String
})

console.log(porps.avatar)
const handleChange = (file)=>{
    console.log('aaaaaaaaaaa')
    emi('handleChange',file)
    
}
const handlePictureCardPreview=(file)=>{
    imageUrl =  file.url
    console.log(imageUrl,2222)
}

const handleAvatarSuccess = (res,file)=>{
    console.log('1')
}
const beforeAvatarUpload = ()=>{

}
</script>

<style scoped>
.avatar {
  width: 178px;
  height: 178px;
  object-fit: cover;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.avatar-uploader  {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

</style>