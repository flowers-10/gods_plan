<template>
  <div class="wrapper">
    <left-side></left-side>
    <a-player></a-player>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
// 引入子组件
import LeftSide from './LeftSide/index.vue'
import APlayer from '@/components/APlayer/index.vue'

</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  flex-grow: 1;
  overflow: hidden;
  user-select: none;
}
</style>