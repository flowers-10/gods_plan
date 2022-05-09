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
// 使用pinia
const store = useStore()

// 获得用户id
const uid: string = store.$state.userinfo.account.id
// 获得用户歌单列表
store.getUserPlaylist(uid)
</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  flex-grow: 1;
  overflow: hidden;
}


// .left-side {
//   flex-basis: 240px;
//   border-right: 1px solid var(--border-color);
//   padding: 26px;
//   overflow: auto;
//   flex-shrink: 0;

//   @media screen and (max-width: 945px) {
//     display: none;
//   }
// }

// .side-wrapper+.side-wrapper {
//   margin-top: 20px;
// }

// .side-title {
//   color: var(--inactive-color);
//   margin-bottom: 14px;
// }

// .side-menu {
//   display: flex;
//   flex-direction: column;
//   white-space: nowrap;

//   a {
//     text-decoration: none;
//     color: var(--theme-color);
//     display: flex;
//     align-items: center;
//     font-weight: 400;
//     padding: 10px;
//     font-size: 14px;
//     border-radius: 6px;
//     transition: 0.3s;
//     position: relative;

//     &:hover {
//       background-color: var(--hover-menu-bg);
//     }
//   }

//   svg {
//     width: 16px;
//     margin-right: 8px;
//   }
// }

// .updates {
//   position: relative;
//   top: 0;
//   right: 0;
//   margin-left: auto;
//   width: 18px;
//   height: 18px;
//   font-size: 11px;
// }

// .notification-number {
//   position: absolute;
//   background-color: #3a6df0;
//   width: 16px;
//   height: 16px;
//   border-radius: 50%;
//   font-size: 10px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   color: #fff;
//   right: 10px;
//   top: 11px;
// }
</style>