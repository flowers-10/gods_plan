<template>
  <div class="welcome">
    <router-link to="/app">
    你好!
    <br>
    welcome
    <br>
    <br>
    <div class="login">登录</div>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { reactive  } from 'vue';
import { useRouter } from 'vue-router';
// const router = useRouter()


// const formInLine = reactive({
//   username:'',
//   password: '',
// })

</script>

<style lang="less">
.welcome {
  width: 400px;
  height: 500px;
  display: flex;
  justify-content: center;
  text-align: center;
  // align-items: center;
  background-color: var(--theme-bg-color);
  border-radius: 4px;
  a {
    color: var(--theme-color);
    padding: 30px 0;
    text-decoration: none;
  }
  .login {
    border-radius: 3px;
    line-height: 40px;
    border: 1px solid var(--button-inactive);
    height: 40px;
  }
}
</style>
