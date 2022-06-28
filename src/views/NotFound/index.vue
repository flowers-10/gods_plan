<template>
  <div class="notfound">
    <div class="font404">
      抱歉，你访问的页面不存在!
    </div>
    <img src="../../assets/SPY×FAMILY/1.jpg" alt="">

    <div>
      <router-link to="/">返回首页</router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"

</script>

<style lang="less" scoped>
.font404 {
  color: #fff;
  font-size: 30px;
  margin-bottom: 20px;
  text-align: center;
}
.notfound {
  text-align: center;
  a {
    font-size: 24px;
  }
}
</style>