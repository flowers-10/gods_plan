<template>
  <div class="update">
    <div>
      <el-button>添加文章类型</el-button>
      <el-button>删除文章</el-button>
      <el-button>编辑文章</el-button>
      <el-button>添加文章</el-button>
    </div>
    <md-editor v-model="saveForm.articleContent" class="mdEditor" @onSave="onSave" />
  </div>

  <dialoge :flag="flag" @on-click="closeDialog">
    <template #Title>
      <span>Save</span>
    </template>
    <template #default>
      <div class="formClass">
        <el-form ref="ruleFormRef" :model="saveForm" status-icon :rules="rules" label-width="120px" label-position="top"
          class="demo-ruleForm">
          <el-form-item label="article Title" prop="articleTitle">
            <el-input v-model="saveForm.articleTitle" />
          </el-form-item>
          <el-form-item label="article IMG">
            <el-upload class="avatar-uploader" ref="uploadFile" action='#' :http-request="uploadAction"
              :on-exceed="handleExceed" :limit="1" :show-file-list="false" :auto-upload="true"
              :before-upload="beforeUpload">
              <img v-if="state.bannerUrl" :src="state.bannerUrl" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon">
                <Plus />
              </el-icon>
            </el-upload>
          </el-form-item>
          <el-form-item label="article Type" prop="typeId">
            <el-select v-model="saveForm.typeId" placeholder="zone">
              <el-option v-for="(item, index) in articleTypeList" :label="item.articleType" :value="item.t_id" />
            </el-select>
          </el-form-item>

        </el-form>
      </div>
    </template>
    <template #Footer>
      <div class="content-button-wrapper">
        <button class="content-button status-button open close" @click="flag = false">Cancel</button>
        <button class="content-button status-button" @click="saveContinue(ruleFormRef)">Continue</button>
      </div>
    </template>
  </dialoge>
</template>

<script lang="ts" setup>
import { ref, reactive, toRaw, onMounted } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import dialoge from '../../../../components/Dialog/index.vue'
import type { FormInstance, FormRules, UploadRawFile, UploadFile, Action } from 'element-plus'
import { saveArticle, getArticleType, upload_image } from '@/api/gsApi'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'
import axios from 'axios';

// 编辑器输入内容
// const text = ref('');
// 控制diglog开关
let flag = ref<boolean>(false)

// 点击保存按钮
// const dialogVisible = ref(false)
const onSave = () => {
  // console.log(v);
  // dialogVisible.value = true
  flag.value = true
}
// 控制dialog状态
const closeDialog = (flagChild: boolean) => {
  flag.value = flagChild
}

// input中的数据
const saveForm = reactive({
  articleTitle: "",
  typeId: "",
  articleContent: ""
})
// formref节点
const ruleFormRef = ref<FormInstance>()
// 表单验证规则
const rules = reactive<FormRules>({
  articleTitle: [
    { required: true, message: 'Please input article title', trigger: 'blur' },
  ],
  typeId: [
    { required: true, message: 'Please select article type', trigger: 'change' },
  ],
})
// 继续保存
const saveContinue = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      let data = toRaw(saveForm)
      console.log(data)
      let res = await saveArticle(data)
      console.log(res);
      flag.value = false
    }
  })
}
// 总文章类型
const articleTypeList = ref()
// 获取总类型
const getArticleTypes = async () => {
  let res = await getArticleType()
  console.log(res.message);
  articleTypeList.value = res.message
}



// 保存图片
const state = reactive({
  bannerUrl: '',
  fileList: [],
})
const uploadFile = ref();

const handleExceed = (files: File[], fileList: UploadFile[]) => {
  if (state.fileList.length >= 1) {
    ElMessage.error('只能上传一个图片')
    return;
  }
}

const beforeUpload = (file: UploadRawFile) => {
  const type = ['image/jpeg', 'image/jpg', 'image/png']
  if (type.indexOf(file.type) === -1) {
    ElMessage.error('上传的文件必须是JPG、JPEG、PNG三种之一!')
    return false
  } else if (file.size / 1024 / 1024 > 2) {
    ElMessage.error('图片大小不能超过2MB!')
    return false
  }
  return true
}

const uploadAction: UploadProps['onChange'] = (option: any) => {

  let file = option.file
  let param = new FormData();
  param.append('file', file);
  upload_image(param).then((res: any) => {
    if (res && res.code === 200) {
      state.bannerUrl = res.data;
      ElMessage.success('图片上传成功！');
    } else {
      if (res && res.msg) {
        ElMessage.error(res.msg);
      } else {
        ElMessage.error('图片上传失败！');
      }
    }
  })
}


onMounted(() => {
  getArticleTypes()
})
</script>

<style lang="less" scoped>
.update {
  width: 100%;
  height: 100%;
  background-color: #fff;
  cursor: pointer;
  background-color: var(--theme-bg-color);
}

.mdEditor {
  height: 100%;
}

.formClass {
  padding: 25px 10px 10px 10px;
  color: var(--theme-color);
  position: relative;
}

// 按钮样式
.content-button-wrapper .content-button.status-button.open.close {
  width: auto;
}



.status-button {
  font-size: 15px;
  margin-top: 0;
  padding: 6px 24px;

  @media screen and (max-width: 390px) {
    padding: 6px 14px;
  }

  &.open {
    background: none;
    color: var(--button-inactive);
    border: 1px solid var(--button-inactive);
  }

  &:not(.open):hover {
    color: #fff;
    border-color: #fff;
  }
}

.content-button-wrapper {
  margin-top: auto;
  margin-left: auto;

  .open {
    margin-right: 8px;
  }

  .content-button:not(.open):hover {
    background: #1e59f1;
  }


}

.content-button {
  background-color: #3a6df0;
  border: none;
  padding: 8px 26px;
  color: #fff;
  border-radius: 20px;
  margin-top: 16px;
  cursor: pointer;
  transition: 0.3s;
  white-space: nowrap;
}

// 上传图片
.avatar-uploader .avatar {
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
