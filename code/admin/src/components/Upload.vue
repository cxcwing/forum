<template>
  <div>

    <el-upload class="avatar-uploader" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      :show-file-list="false" :auto-upload="false" :on-change="handleChange" :on-success="handleAvatarSuccess">
      <img v-if="porps.avatar" :src="imageUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon">
        <Plus />
      </el-icon>
    </el-upload>
  </div>

</template>

<script setup>
import { computed, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { UploadProps } from 'element-plus'

const emi = defineEmits("[handleChange]")

const porps = defineProps({
  avatar: String
})
const imageUrl = computed(() =>
  porps.avatar.includes('blob') ?porps.avatar: `http://localhost:3000/${porps.avatar}`
)
console.log(porps.avatar)
const handleChange = (file) => {
  console.log(porps.avatar,'xxxxxxxxxxxxxxxxxx')
  emi('handleChange', file)

}

const handleAvatarSuccess = (res, file) => {
  console.log('1')
}
const beforeAvatarUpload = () => {

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

.avatar-uploader {
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