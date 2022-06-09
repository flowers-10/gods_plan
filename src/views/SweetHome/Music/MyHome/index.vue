<template>
  <div class="main-container">
    <main-header :menuLink="menuLink" :menuItemsList="menuItemsList"></main-header>
    <div class="content-wrapper" >
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { recommendResource } from '@/api/api'
import { ref } from 'vue'
// 给子组件传参
const menuLink = ref<string>('My Home')
const menuItemsList = ref([
  { title: '我喜欢的音乐', path: '#1' },
  { title: '全部歌单', path: '#2' },
])
</script>

<style lang="less" scoped>
.main-header {
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
  height: 58px;
  flex-shrink: 0;

  .header-menu {
    margin-left: 150px;

    @media screen and (max-width: 1055px) {
      margin: auto;
    }

    a {
      padding: 20px 24px;
    }
  }
}

.main-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.menu-link-main {
  text-decoration: none;
  color: var(--theme-color);
  padding: 0 30px;

  @media screen and (max-width: 1055px) {
    display: none;
  }
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  color: var(--theme-color);
  padding: 20px 40px;
  height: 100%;
  overflow: auto;
  background-color: var(--theme-bg-color);
  background-size: 100% 100%;
  background-position: center center;

  @media screen and (max-width: 510px) {
    padding: 20px;
  }

  &-header {
    display: flex;
    align-items: center;
    width: 100%;
    border-radius: 14px;
    padding: 20px 40px;
    background-color: var(--content-bg);

    @media screen and (max-width: 415px) {
      padding: 20px;
    }
  }

  &.overlay {
    pointer-events: none;
    transition: 0.3s;
    background-color: var(--overlay-bg);
  }
}

.loginout {
  cursor: pointer;
}
</style>