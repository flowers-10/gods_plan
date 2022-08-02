<template>
  <div class="update">
    <div style="margin:10px 0">
      <el-button @click="addTypeflag = true">添加文章类型</el-button>
      <el-button @click="deleteAClick">删除文章</el-button>
      <el-button>编辑文章</el-button>
      <el-button @click="addArticle">新增文章（不是保存！！按下后会重置所有内容）</el-button>
    </div>
    <md-editor v-model="saveForm.articleContent" class="mdEditor" @onSave="onSave" @onUploadImg="onUploadImg"
      :toolbars-exclude="['github', 'pageFullscreen',
      'fullscreen',]" />
  </div>

  <!-- 保存文章 -->
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
          <el-form-item label="article Introduce" prop="articleIntroduce">
            <el-input v-model="saveForm.articleIntroduce" autosize type="textarea" />
          </el-form-item>
          <el-form-item label="article IMG">
            <el-upload class="avatar-uploader" ref="uploadFile" action='#' :http-request="uploadAction" :limit="1"
              :show-file-list="false" :auto-upload="true" :before-upload="beforeUpload" :file-list="fileList">
              <img v-if="saveForm.articleIMG" :src="saveForm.articleIMG" class="avatar" />
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
  <!-- 添加文章类型 -->
  <dialoge :flag="addTypeflag" @on-click="closeDialog">
    <template #Title>
      <span>addType</span>
    </template>
    <template #default>
      <div class="formClass">
        <el-form ref="addTyperuleFormRef" :model="addTypeForm" status-icon :rules="addTyperules" label-width="120px"
          label-position="top" class="demo-ruleForm">
          <el-form-item label="article Type" prop="articleType">
            <el-input v-model="addTypeForm.articleType" />
          </el-form-item>
        </el-form>
      </div>
    </template>
    <template #Footer>
      <div class="content-button-wrapper">
        <button class="content-button status-button open close" @click="addTypeflag = false">Cancel</button>
        <button class="content-button status-button" @click="addTypeContinue(addTyperuleFormRef)">Continue</button>
      </div>
    </template>
  </dialoge>
  <!-- 删除文章 -->
  <dialoge :flag="deleteAflag" @on-click="closeDialog">
    <template #Title>
      <span>Delete</span>
    </template>
    <template #default>
      <div class="formClass">
        <el-form ref="deleteAFormRef" :model="deleteAForm" status-icon label-width="120px" label-position="top"
          class="demo-ruleForm">
          <el-form-item label="article Type" prop="typeId">
            <el-select v-model="deleteAForm.typeId" placeholder="zone">
              <el-option label="全部" value="0" @click="optionClick()" />
              <el-option v-for="(item, index) in articleTypeList" :label="item.articleType" :value="item.t_id"
                @click="optionClick(item.t_id)" />
            </el-select>
          </el-form-item>

          <el-form-item label="articles" prop="type">
            <el-table :data="tableData" style="width: 100%" height="300" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55" />
              <el-table-column property="articleTitle" label="articleTitle" />
            </el-table>
          </el-form-item>
        </el-form>
      </div>
    </template>
    <template #Footer>
      <div class="content-button-wrapper">
        <button class="content-button status-button open close" @click="deleteAflag = false">Cancel</button>
        <button class="content-button status-button" @click="deleteAContinue()">Continue</button>
      </div>
    </template>
  </dialoge>

</template>

<script lang="ts" setup>
import { ref, reactive, toRaw, onMounted } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import dialoge from '../../../../components/Dialog/index.vue'
import type { FormInstance, FormRules, UploadRawFile } from 'element-plus'
import { saveArticle, getArticleType, _addArticleType, _deleteArticle, getArticle } from '@/api/gsApi'
import { ElMessage, ElTable } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps, UploadFile } from 'element-plus'
import axios from 'axios';

// 编辑器输入内容
// const text = ref('');
// 控制diglog开关
let flag = ref<boolean>(false)
let addTypeflag = ref<boolean>(false)
let deleteAflag = ref<boolean>(false)
// 点击保存按钮
// const dialogVisible = ref(false)
const onSave = () => {
  // console.log(v);
  // dialogVisible.value = true
  flag.value = true
}
// elupload节点
const uploadFile = ref();
const fileList = ref([])
// 点击上传图片
const onUploadImg = async (files: any, callback: any) => {
  // console.log(`${import.meta.env.VITE_BASE_PUBLICAPI}uploadImage/img`);

  const res = await Promise.all(
    files.map((file: any) => {
      return new Promise((rev, rej) => {
        const form = new FormData();
        form.append('file', file);
        axios
          .post(`${import.meta.env.VITE_BASE_PUBLICAPI}uploadImage/img`, form, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then((res) => rev(
            res
          ))
          .catch((error) => rej(error));
      });
    })
  );

  callback(res.map((item) => {
    // console.log(item);
    return import.meta.env.VITE_BASE_PUBLICAPI + item.data.data
  }));
}
// 控制dialog状态
const closeDialog = (flagChild: boolean) => {
  flag.value = flagChild
  addTypeflag.value = flagChild
  deleteAflag.value = flagChild
}

// Form中的数据
const saveForm = reactive({
  articleTitle: "",
  typeId: "",
  articleContent: "",
  articleIMG: '',
  articleIntroduce: ''
})
const addTypeForm = reactive({
  articleType: '',
})
const deleteAForm = reactive({
  typeId: "0",
})
// formref节点
const ruleFormRef = ref<FormInstance>()
const addTyperuleFormRef = ref<FormInstance>()
const deleteAFormRef = ref<FormInstance>()
// 表单验证规则
const rules = reactive<FormRules>({
  articleTitle: [
    { required: true, message: 'Please input article title', trigger: 'blur' },
  ],
  typeId: [
    { required: true, message: 'Please select article type', trigger: 'change' },
  ],
})
const addTyperules = reactive<FormRules>({
  articleType: [
    { required: true, message: 'Please input article type', trigger: 'blur' },
  ]
})
// 继续保存
const saveContinue = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      let data = toRaw(saveForm)
      // console.log(data)
      let res: any = await saveArticle(data)
      console.log(res);
      if (res.code === 200) {
        flag.value = false
        addArticle()
        ElMessage.success('保存成功')
      }else {
        ElMessage.error('保存失败')
      }

    }
  })
}
// 添加文章类型
const addTypeContinue = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      let data = toRaw(addTypeForm)
      // console.log(data)
      let res: any = await _addArticleType(data)
      // console.log(res);
      if (res.code === 200) {
        ElMessage.success(res.message)
      } else {
        ElMessage.error('添加类型失败')
      }
      addTypeflag.value = false
      addTypeForm.articleType = ""
    }
  })
}
// 删除文章
const deleteAContinue = async () => {
  // console.log({id:selectDeleteOption.value});
  if (selectDeleteOption.value) {
    let res: any = await _deleteArticle({ id: selectDeleteOption.value })
    // console.log(res);
    if (res.code == 200) {
      ElMessage.success('删除文章成功')
      deleteAflag.value = false
    } else {
      ElMessage.error('删除文章失败了！')
    }
  }



}
// 总文章类型
const articleTypeList = ref()
// 获取总类型
const getArticleTypes = async () => {
  let res: any = await getArticleType()
  // console.log(res.message);
  articleTypeList.value = res.message
}


// 更新之后验证格式
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


// 上传图片到服务器并返回图片url
const uploadAction: UploadProps['onChange'] = (option: any) => {
  console.log(`${import.meta.env.VITE_BASE_PUBLICAPI}uploadImage/img`);

  let file = option.file
  let param: string | FormData = new FormData();
  param.append('file', file);
  axios({
    method: 'post',
    url: `${import.meta.env.VITE_BASE_PUBLICAPI}uploadImage/img`,
    data: param,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then((res: any) => {
    // console.log(import.meta.env.VITE_BASE_PUBLICAPI + res.data.data);
    if (res && res.data.code === 200) {
      saveForm.articleIMG = import.meta.env.VITE_BASE_PUBLICAPI + res.data.data;
      ElMessage.success('图片上传成功！');
      param = ''
      fileList.value = []
    } else {
      if (res && res.msg) {
        ElMessage.error(res.msg);
      } else {
        ElMessage.error('图片上传失败！');
      }
    }
  })
}

// 添加新文章按钮
const addArticle = () => {
  saveForm.articleContent = ""
  saveForm.articleIMG = ""
  saveForm.articleTitle = ""
  saveForm.typeId = ""
  saveForm.articleIntroduce = ""
}

// 获得的文章类型
type Article = {
  articleContent: string
  articleIMG: null | string
  articleTitle: string
  creatTime: string
  id: string | number
  typeId: string | number
  views: string | number
  articleIntroduce: string
}
// 获得表格数据
const tableData = ref([])
// 当前选中的文章选项
const selectDeleteOption = ref<string>()
// 点击了多选框
const handleSelectionChange = (val: Article[]) => {
  let ids = (val.map((item: Article) => item.id)).toString()
  selectDeleteOption.value = ids
  // console.log(selectDeleteOption.value);
}
// 获取文章
const _getArticle = async (id?: number | string) => {
  if (id) {
    let res: any = await getArticle({ 'typeId': id })
    // console.log(res);
    tableData.value = res.result
  } else {
    let res: any = await getArticle()
    // console.log(res);
    tableData.value = res.result
  }

}
// 点击删除文章按钮
const deleteAClick = () => {
  deleteAflag.value = true
  // console.log(toRaw(deleteAForm.typeId));

  if (toRaw(deleteAForm.typeId) === '0') {
    _getArticle()
  } else {
    _getArticle(toRaw(deleteAForm.typeId))
  }

}
// 点击选择删除文章的文章选项
const optionClick = (id?: number | string) => {
  _getArticle(id)
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
  height: calc(100% - 52px);
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
