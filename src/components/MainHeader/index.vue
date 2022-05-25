<template>
  <div class="main-header">
    <div class="menu-link-main">{{ menuLink }}</div>
    <div class="header-menu">
      <a v-for="(item, index) in menuItemsList" :key="index" class="main-header-link"
        :class="index == flag ? 'is-active' : ''" :href="item.path"
        @click="clickTags(index,item.title)"
        >
        {{ item.title }}
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// 接收父组件传参
defineProps<{
  menuLink: string,
  menuItemsList?: [
    { title: string, path: string },
  ]
}>()
// 控制menu高亮
let flag = ref(0)
// 派生事件给父组件传参
const emit = defineEmits(['on-click'])
const clickTags = (index:number,tag:string) => {
  flag.value=index
  emit('on-click', tag)
}
</script>

<style lang="less" scoped>
.main-header {
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
  height: 58px;
  flex-shrink: 0;
  width: auto;
  position: relative;
  overflow: hidden;

  .header-menu {
    margin-left: 220px;
    height: 100%;
    width: 80%;
    position: absolute;
    top: 0px;
    display: flex;
    overflow-y: hidden;
    flex-wrap: nowrap;
    white-space: nowrap;

    @media screen and (max-width: 1055px) {
      margin-left: 0px;
      width: 100%;
    }

    @media screen and (max-width: 480px) {
      margin: auto;
      height: 150%;
      // justify-content: center;
      width: 100%;
    }


    a {
      cursor: pointer;
      padding: 20px 24px;
      text-decoration: none;
      color: var(--inactive-color);
      border-bottom: 2px solid transparent;
      transition: 0.3s;

      &.is-active,
      &:hover {
        color: var(--theme-color);
        border-bottom: 2px solid var(--theme-color);
      }
    }

  }
}

.menu-link-main {
  // width: 20%;
  text-decoration: none;
  color: var(--theme-color);
  padding: 0 30px;

  @media screen and (max-width: 1055px) {
    display: none;
  }
}
</style>