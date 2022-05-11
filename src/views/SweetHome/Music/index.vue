<template>
  <div class="wrapper">
    <left-side></left-side>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
// 引入子组件
import LeftSide from './LeftSide/index.vue'
// 引入工具
import { useStore } from '@/stores'
import { onMounted } from 'vue';
// 使用pinia
const store = useStore()

// 获得用户id
const uid: string = store.$state.userinfo.account.id
// 获得用户歌单列表
onMounted(() => {
  
})

</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  flex-grow: 1;
  overflow: hidden;
}
</style>