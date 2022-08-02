<template>
  <div class="update">
    <div style="margin:10px 0">
      <el-button @click="addTypeflag = true">添加文章类型</el-button>
      <el-button @click="deleteAClick">删除文章</el-button>
      <el-button @click="editorAClick">编辑文章</el-button>
      <el-button @click="addArticle">新增文章（不是保存！！按下后会重置所有内容）</el-button>
    </div>

    <md-editor v-if="dialogeModelFlag === 'save'" v-model="saveForm.articleContent" class="mdEditor" @onSave="onSave"
      @onUploadImg="onUploadImg" :toolbars-exclude="['github', 'pageFullscreen',
      'fullscreen',]" />
    <md-editor v-else v-model="editAForm.articleContent" class="mdEditor" @onSave="onEditorSave"
      @onUploadImg="onUploadImg" :toolbars-exclude="['github', 'pageFullscreen',
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
            <el-upload class="avatar-uploader" action='#' :http-request="uploadAction" :limit="1"
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
  <!-- 编辑文章 -->
  <dialoge :flag="editAflag" @on-click="closeDialog">
    <template #Title>
      <span>Edit</span>
    </template>
    <template #default>
      <div class="formClass">
        <el-form ref="editAFormRef" :model="editASelectForm" status-icon label-width="120px" label-position="top"
          class="demo-ruleForm">
          <el-form-item label="article Type" prop="typeId">
            <el-select v-model="editASelectForm.typeId" placeholder="zone">
              <el-option label="全部" value="0" @click="optionClick()" />
              <el-option v-for="(item, index) in articleTypeList" :label="item.articleType" :value="item.t_id"
                @click="optionClick(item.t_id)" />
            </el-select>
          </el-form-item>

          <el-form-item label="articles" prop="type">
            <el-table :data="tableData" style="width: 100%" height="300" highlight-current-row
              @current-change="handleCurrentChange">
              <el-table-column type="index" width="55" />
              <el-table-column property="articleTitle" label="articleTitle" />
            </el-table>
          </el-form-item>
        </el-form>
      </div>
    </template>
    <template #Footer>
      <div class="content-button-wrapper">
        <button class="content-button status-button open close" @click="editAflag = false">Cancel</button>
        <button class="content-button status-button" @click="editAflag = false">Continue</button>
      </div>
    </template>
  </dialoge>
  <!-- 保存编辑的文章 -->
  <dialoge :flag="saveEidtflag" @on-click="closeDialog">
    <template #Title>
      <span>Save Editor</span>
    </template>
    <template #default>
      <div class="formClass">
        <el-form ref="ruleFormRef" :model="editAForm" status-icon :rules="rules" label-width="120px"
          label-position="top" class="demo-ruleForm">
          <el-form-item label="article Title" prop="articleTitle">
            <el-input v-model="editAForm.articleTitle" />
          </el-form-item>
          <el-form-item label="article Introduce" prop="articleIntroduce">
            <el-input v-model="editAForm.articleIntroduce" autosize type="textarea" />
          </el-form-item>
          <el-form-item label="article IMG">
            <el-upload class="avatar-uploader" action='#' :http-request="uploadAction" :limit="1"
              :show-file-list="false" :auto-upload="true" :before-upload="beforeUpload" :file-list="fileList">
              <img v-if="editAForm.articleIMG" :src="editAForm.articleIMG" class="avatar" />
              <el-icon class="avatar-uploader-icon">
                <Plus />
              </el-icon>
            </el-upload>
          </el-form-item>
          <el-form-item label="article Type" prop="typeId">
            <el-select v-model="editAForm.typeId" placeholder="zone">
              <el-option v-for="(item, index) in articleTypeList" :label="item.articleType" :value="item.t_id" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </template>
    <template #Footer>
      <div class="content-button-wrapper">
        <button class="content-button status-button open close" @click="saveEidtflag = false">Cancel</button>
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
import type { FormInstance, FormRules, UploadRawFile } from 'element-plus'
import { saveArticle, getArticleType, _addArticleType, _deleteArticle, getArticle, _editArticle } from '@/api/gsApi'
import { ElMessage, ElTable } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'
import axios from 'axios';

// 通用功能公共部分
// 控制所有dialog状态
const closeDialog = (flagChild: boolean) => {
  flag.value = flagChild
  addTypeflag.value = flagChild
  deleteAflag.value = flagChild
  editAflag.value = flagChild
  saveEidtflag.value = flagChild
}
// 所有文章类型列表
const articleTypeList = ref()
// 通过接口获取总类型数据
const getArticleTypes = async () => {
  let res: any = await getArticleType()
  // console.log(res.message);
  articleTypeList.value = res.message
}
// 接口的文章type
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
// 抽离的公共部分 获取文章
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
// 判断当前弹框是 edit or save
let dialogeModelFlag = ref<string>('save')

// 1.保存文章功能 (编辑保存 和 新增文章保存)
// 控制保存弹框的状态
let flag = ref<boolean>(false)
// 点击保存按钮
const onSave = () => {
  flag.value = true
}
// 保存弹框中的Form数据
const saveForm = reactive({
  articleTitle: "",
  typeId: "",
  articleContent: "",
  articleIMG: '',
  articleIntroduce: ''
})
// 保存弹框的ref元素节点
const ruleFormRef = ref<FormInstance>()

// 上传图片到服务器并返回图片url
const uploadAction: UploadProps['onChange'] = (option: any) => {
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
      if (dialogeModelFlag.value === 'save') {
        saveForm.articleIMG = import.meta.env.VITE_BASE_PUBLICAPI + res.data.data;
      } else {
        editAForm.articleIMG = import.meta.env.VITE_BASE_PUBLICAPI + res.data.data;
      }
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
// 图片更新之前验证格式
const beforeUpload = (file: UploadRawFile) => {
  const type = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
  if (type.indexOf(file.type) === -1) {
    ElMessage.error('上传的文件格式必须是JPG、JPEG、PNG、WEBP、GIF!')
    return false
  } else if (file.size / 1024 / 1024 > 2) {
    ElMessage.error('图片大小不能超过2MB!')
    return false
  }
  return true
}
// 保存弹框的验证规则
const rules = reactive<FormRules>({
  articleTitle: [
    { required: true, message: 'Please input article title', trigger: 'blur' },
  ],
  typeId: [
    { required: true, message: 'Please select article type', trigger: 'change' },
  ],
})
// 按下Continue按钮继续保存
const saveContinue = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      if (dialogeModelFlag.value === 'save') {
        let data = toRaw(saveForm)
        // console.log(data)
        let res: any = await saveArticle(data)
        console.log(res);
        if (res.code === 200) {
          flag.value = false
          addArticle()
          ElMessage.success('保存成功')
        } else {
          ElMessage.error('保存失败')
        }
      } else {
        let data = toRaw(editAForm)
        // console.log(data);
        let res: any = await _editArticle(data)
        // console.log(res);
        if (res.code === 200) {
          editAForm.articleContent = ''
          editAForm.articleIMG = ''
          editAForm.articleIntroduce = ''
          editAForm.articleTitle = ''
          editAForm.creatTime = ''
          editAForm.id = ''
          editAForm.typeId = ''
          editAForm.views = ''
          saveEidtflag.value = false
          ElMessage.success('编辑保存成功')
        } else {
          ElMessage.error('编辑保存失败')
        }
      }

    }
  })
}

// 2.添加新文章按钮
const addArticle = () => {
  dialogeModelFlag.value = 'save'
  saveForm.articleContent = ""
  saveForm.articleIMG = ""
  saveForm.articleTitle = ""
  saveForm.typeId = ""
  saveForm.articleIntroduce = ""
}

// 3.添加文章类型功能
// 控制添加文章类型弹框
let addTypeflag = ref<boolean>(false)
// 添加文章类型弹框中的Form数据
const addTypeForm = reactive({
  articleType: '',
})
// 添加文章类型弹框的ref元素节点
const addTyperuleFormRef = ref<FormInstance>()
// 添加文章类型表单验证规则
const addTyperules = reactive<FormRules>({
  articleType: [
    { required: true, message: 'Please input article type', trigger: 'blur' },
  ]
})
// 按下继续按钮添加文章类型
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

// 4.删除文章功能
// 控制删除文章弹框的状态
let deleteAflag = ref<boolean>(false)
// 控制删除文章弹框Form中的数据
const deleteAForm = reactive({
  typeId: "0",
})
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
// 控制删除文章formref节点
const deleteAFormRef = ref<FormInstance>()
// 点击选择要删除文章的复选框
const optionClick = (id?: number | string) => {
  _getArticle(id)
}
// 填充到页面中的表格数据
const tableData = ref([])
// 当前选中的多选框 例：'1,2,3,4'
const selectDeleteOption = ref<string>()
// 点击了table中的多选框
const handleSelectionChange = (val: Article[]) => {
  let ids = (val.map((item: Article) => item.id)).toString()
  selectDeleteOption.value = ids
  // console.log(selectDeleteOption.value);
}
// 按下继续按钮后删除文章
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

// 5.md编辑器上传图片功能
// upload中上传文件的列表存储在这里
const fileList = ref([])
// 点击上传图片
const onUploadImg = async (files: any, callback: any) => {
  // console.log(`${import.meta.env.VITE_BASE_PUBLICAPI}uploadImage/img`);

  const res = await Promise.all(
    files.map((file: any) => {
      return new Promise((rev, rej) => {
        const form = new FormData();
        form.append('file', file);
        axios.post(`${import.meta.env.VITE_BASE_PUBLICAPI}uploadImage/img`, form, {
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

// 6.编辑文章功能
// 控制编辑文章dialog开关
const editAflag = ref<boolean>(false)
// 编辑文章弹框中的Form数据
const editASelectForm = reactive({
  typeId: "0",
})
// 点击编辑文章按钮
const editorAClick = () => {
  editAflag.value = true
  if (toRaw(editASelectForm.typeId) === '0') {
    _getArticle()
  } else {
    _getArticle(toRaw(editASelectForm.typeId))
  }
}
// 当前选中要编辑的文章数据
const editAForm = reactive<Article>({
  articleTitle: "",
  typeId: "",
  articleContent: "",
  articleIMG: '',
  articleIntroduce: '',
  creatTime: '',
  id: '',
  views: ''
})
// 选中需要编辑的文章
const handleCurrentChange = (val: Article | undefined) => {
  // console.log(val);
  dialogeModelFlag.value = 'edit'
  if (val) {
    editAForm.articleTitle = val.articleTitle
    editAForm.typeId = val.typeId
    editAForm.articleContent = val.articleContent
    editAForm.articleIMG = val.articleIMG
    editAForm.articleIntroduce = val.articleIntroduce
    editAForm.id = val.id
  }
}
// 控制保存弹框开关
const saveEidtflag = ref<boolean>(false)
// 点击继续保存编辑内容按钮
const onEditorSave = () => {
  saveEidtflag.value = true
}


// 挂载阶段
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
