<template>
  <div class="main-header">
    <div class="menu-link-main">{{ menuLink }}</div>
    <div class="header-menu">
      <a v-for="(item, index) in menuItemsList" :key="index" class="main-header-link"
        :class="index == flag ? 'is-active' : ''" @click="clickTags(index, item.title)">
        {{ item.title }}
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
// 接收父组件传参
const props = defineProps<{
  menuLink: string,
  menuItemsList?: [
    { title: string, path: string },
  ]
}>()
// 控制menu高亮
let flag = ref<number>(0)
// 派生事件给父组件传参
const emit = defineEmits(['on-click'])
// 点击tag栏
const clickTags = (index: number, tag: string): void => {
  // 控制menu高亮
  flag.value = index
  // 给父组件传递tag
  emit('on-click', tag)
  // 获取父元素整个滚动的div
  let scrollContainer = <HTMLDivElement | null>document.querySelector('.content-wrapper')
  // 点击滚动到相应位置
  if (scrollContainer) {
    // 获得子元素的节点
    let _childrenHTML = <HTMLDivElement | null>scrollContainer.children[index]
    // console.log(_childrenHTML.offsetTop);
    if (_childrenHTML) {
      // 滚动到相应位置
      scrollContainer.scrollTo({
        top: _childrenHTML.offsetTop - 136,
        behavior: "smooth"
      });
    }
  }
}


// 监听滚轮
const handleScroll = (): void => {
  // 获得当前的滚轮高度
  let scrollContainer = <HTMLDivElement | null>document.querySelector('.content-wrapper')
  // arr存放每一层的高度
  let arr: number[] = []
  if (props.menuItemsList) {
    for (let i = 0; i < props.menuItemsList.length; i++) {
      if (scrollContainer) {
        let _childrenHTML = <HTMLDivElement | null>scrollContainer.children[i]
        if (_childrenHTML) {
          arr.push(_childrenHTML.offsetTop - 136)
        }
      }

    }

    arr.push(9999999)
  }
  // console.log(arr);
  // console.log(scrollContainer);

  if (scrollContainer) {
    // 获得滚轮高度
    let scrollTop = <number>scrollContainer?.scrollTop
    arr.map((item, index, arr) => {
      // console.log(arr[index]);
      // 如果滚轮在当前层就高亮当前层
      if (arr[index] <= scrollTop && scrollTop <= arr[index + 1]) {
        flag.value = index
      }
    })
  }
}
onMounted(() => {
  window.addEventListener('scroll', handleScroll, true)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll, true)
})
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
      user-select: none;

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
  user-select: none;

  // cursor: pointer;
  @media screen and (max-width: 1055px) {
    display: none;
  }
}
</style>