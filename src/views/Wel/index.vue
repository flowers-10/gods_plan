<template>
  <div class="welcome">
    <router-link to="/app">
      你好!
      <br>
      welcome
      <br>
      <br>
    </router-link>
    <div class="login" @click="loginCloudMusic">登录</div>

  </div>
  <dialoge title="" :flag="flag" @on-click="getFlag"></dialoge>
</template>

<script setup lang="ts">
import dialoge from '../../components/Dialog/index.vue'
import { ref } from 'vue'
const flag = ref<boolean>(false)
const loginCloudMusic = () => {
  flag.value = true
}

const getFlag = (flagChild: boolean) => {
  // console.log(flagChild,'我接收到了子组件的传参')
  flag.value = flagChild
}
</script>

<style lang="less" scoped>
.welcome {
  width: 400px;
  height: 500px;
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  // align-items: center;
  background-color: var(--theme-bg-color);
  border-radius: 4px;

  a {
    color: var(--theme-color);
    padding: 30px 0;
    text-decoration: none;
  }

  .login {
    margin: 10px auto;
    width: 100px;
    border-radius: 3px;
    line-height: 40px;
    border: 1px solid var(--button-inactive);
  }
}
</style>
