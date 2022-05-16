<template>
  <div class="wrapper">
    <left-side></left-side>
    <router-view></router-view>
    <a-player :audio-list="audiolist"></a-player>
  </div>
</template>

<script setup lang="ts">
// 引入子组件
import LeftSide from './LeftSide/index.vue'
import APlayer from '@/components/APlayer/index.vue'
// 引入工具
import { useStore } from '@/stores'
import { onMounted, nextTick } from 'vue';
// 使用pinia
const store = useStore()
// console.log(store.$state.audioLists);
// 播放列表默认歌曲
let audiolist:any = store.$state.audioLists

onMounted(() => {
  nextTick(()=>{
    // audiolist = store.$state.audioLists
  })
})

</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  flex-grow: 1;
  overflow: hidden;
}
</style>