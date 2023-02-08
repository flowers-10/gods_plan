<template>
  <div class="wrapper">
    <left-side :sideNavList="sideNavList"></left-side>
    <!-- <a-player></a-player> -->
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 引入子组件
import LeftSide from '@/components/LeftSide/index.vue'


const sideNavList = ref([
  {
    title: 'Discover',
    children: [
      {
        title: 'My Home',
        html: '<svg viewBox="0 0 48 48" fill="currentColor" stroke="currentColor"><path d="M5 7L10 9V37L5 39V7Z" stroke="currentColor" stroke-width="4" stroke-linejoin="round" /><path d="M16 23L21 25V37L16 39V23Z" fill="currentColor" stroke="currentColor" stroke-width="4"stroke-linejoin="round" /><path d="M27 21L32 19V35L27 33V21Z" fill="currentColor" stroke="currentColor" stroke-width="4"stroke-linejoin="round" /><path d="M38 9L43 11V37L38 39V9Z" fill="currentColor" stroke="currentColor" stroke-width="4"stroke-linejoin="round" /></svg>My Home<span class="notification-number updates">8</span>',
        path: '/music/myhome'
      }
    ]
  },
  {
    title: 'Discover',
    children: [
      {
        title: 'My Home',
        html: '<svg viewBox="0 0 48 48" fill="currentColor" stroke="currentColor"><path d="M5 7L10 9V37L5 39V7Z" stroke="currentColor" stroke-width="4" stroke-linejoin="round" /><path d="M16 23L21 25V37L16 39V23Z" fill="currentColor" stroke="currentColor" stroke-width="4"stroke-linejoin="round" /><path d="M27 21L32 19V35L27 33V21Z" fill="currentColor" stroke="currentColor" stroke-width="4"stroke-linejoin="round" /><path d="M38 9L43 11V37L38 39V9Z" fill="currentColor" stroke="currentColor" stroke-width="4"stroke-linejoin="round" /></svg>My Home<span class="notification-number updates">8</span>',
        path: '/music/myhome'
      }
    ]
  }
])

</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  flex-grow: 1;
  overflow: hidden;
  user-select: none;
}
</style>