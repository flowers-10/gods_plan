<template>
  <div @click="getPlayListId">1232131</div>


</template>

<script setup lang="ts">
// 引入工具
import { useRouter } from 'vue-router';

const router = useRouter()
const getPlayListId = () => {
  // const id = store.$state.playListId
  // console.log('我是pinia中的id', id);
  router.push({
    name: 'PlayListDetail',
    params: {
      id:1
    }
  })
}
</script>