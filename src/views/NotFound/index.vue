<template>
  <div class="notfound">
    <div class="font404">
      抱歉，你访问的页面不存在!
      或者没有权限访问！
    </div>
    <img src="../../assets/SPY×FAMILY/1.jpg" alt="">

    <div style="margin-top: 10px;">
      <router-link to="/">返回首页</router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"

</script>

<style lang="less" scoped>
.font404 {
  color: var(--theme-color);
  font-size: 30px;
  margin-bottom: 20px;
  text-align: center;
  padding: 40px;
  // position: absolute;
  @media screen and (max-width: 580px) {
    font-size: 16px;
    padding: 15px;
  }
}
.notfound {
  text-align: center;
  width: 100%;
  position: relative;
  a {
    font-size: 24px;
    @media screen and (max-width: 580px) {
    font-size: 16px;
  }
  }
  img {
    max-width: 500px;
    width: 80%;
    border-radius: 15px;
  }
}
</style>