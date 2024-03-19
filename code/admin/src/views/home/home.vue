<template>
    <div class="box">
        <div>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <p style="color: black; font-weight:500;">草吧后台管理中心</p>
                </el-breadcrumb-item>
                <el-breadcrumb-item>
                    <h2 class="homeXie" href="/">首页</h2>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="main-box">
            <el-card class="card1" shadow="always">
                <div class="left">
                    <el-avatar :size="110" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                    <span class="span-name">{{ '寸夕屮' }}</span>
                    <span class="span-role">{{ '管理员' }}</span>
                </div>
            </el-card>
            <el-card class="card2" shadow="always">
                <template #header>
                    <div class="card-header">
                        <h2>个人信息</h2>
                    </div>
                </template>
                <div class="right">
                    <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules"
                        label-width="auto" class="demo-ruleForm" :size="formSize" status-icon>
                        <el-form-item label="用户名" prop="name">
                            <el-input v-model="ruleForm.name" />
                        </el-form-item>
                        <el-form-item label="邮箱" prop="emil">
                            <el-input v-model="ruleForm.emil" />
                        </el-form-item>
                        <el-form-item :size="'large'" label="性别"   prop="region">
                            <el-select  v-model="ruleForm.region" placeholder="Activity zone" class="sel">
                                <el-option label="保密" value="beijing" />
                                <el-option label="男" value="shanghai" />
                                <el-option label="女" value="beijing" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="个人介绍" prop="desc">
                            <el-input v-model="ruleForm.desc" type="textarea" />
                        </el-form-item>
                        <el-form-item label="头像" prop="desc">
                            
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
        </div>

    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { FormInstance, FormRules } from 'element-plus'

const ruleForm = ref({

})
ruleForm.value = {
    name: '寸夕屮',
    region: '保密',
    emil:'2624'
}
console.log(ruleForm.value)

const rules = reactive({
    name: [
        { required: true, message: '输入用户名', trigger: 'blur' },

    ],
    emil: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },

    ]
})

</script>

<style scoped>

.sel{
    width:200px;
}

.main-box {
    display: flex;
}

.card2 {
    flex: 2;
}

.card1 {
    flex: 1;
    margin: 10px;
}

.homeXie {
    color: black;
}

.left {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.span-name {
    font-size: 19px;
    font-weight: 600;
}

.span-role {
    /* font-size: 16px; */
    font-weight: 500;
}
</style>