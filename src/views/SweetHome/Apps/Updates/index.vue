<template>
  <div class="update">
    <md-editor v-model="saveForm.articleContent" theme="light" class="mdEditor" :toolbarsExclude="[
      'github'
    ]" @onSave="onSave" />

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
          <el-form-item label="article Type" prop="articleType">
            <el-select v-model="saveForm.articleType" placeholder="Activity zone">
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
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
import { ref, reactive, toRaw } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import dialoge from '../../../../components/Dialog/index.vue'
import type { FormInstance, FormRules } from 'element-plus'
import { saveArticle } from '@/api/gsApi'

// 编辑器输入内容
// const text = ref('');
// 控制diglog开关
let flag = ref<boolean>(false)

// 点击保存按钮
// const dialogVisible = ref(false)
const onSave = (v: string) => {
  console.log(v);
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
  articleType: "",
  articleContent:""
})
// formref节点
const ruleFormRef = ref<FormInstance>()
// 表单验证规则
const rules = reactive<FormRules>({
  articleTitle: [
    { required: true, message: 'Please input article title', trigger: 'blur' },
  ],
  articleType: [
    { required: true, message: 'Please select article type', trigger: 'change' },
  ],
})
// 继续保存
const saveContinue = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      // flag.value = false
      let data = toRaw(saveForm)
      console.log(data)
      
      let res = await saveArticle(data)
      console.log(res);

    }
  })
}
</script>

<style lang="less" scoped>
.update {
  width: 100%;
  height: 100%;
  background-color: #fff;
  cursor: pointer;
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
</style>
