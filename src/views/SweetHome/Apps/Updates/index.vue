<template>
  <div class="update">
    <md-editor v-model="text" theme="light" class="mdEditor" :toolbarsExclude="[
      'github'
    ]" @onSave="onSave" />

    </div>

  <dialoge :flag="flag" @on-click="closeDialog">
    
    <template #Title>
      <span>保存</span>
    </template>
    <template #default>
        <span>
          123123213213
        </span>
    </template>
    <template #Footer>
      <div class="content-button-wrapper">
          <button class="content-button status-button open close" @click="flag=false">Cancel</button>
          <button class="content-button status-button" @click="flag=false">Continue</button>
        </div>
    </template>
  </dialoge>

</template>

<script lang="ts" setup>
import { ref } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import dialoge from '../../../../components/Dialog/index.vue'

const text = ref('');
let flag = ref<boolean>(false)


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
