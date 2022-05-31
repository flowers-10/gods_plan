<template>
  <div class="app">
    <div class="header" :class="SearchFlag === true ? 'wide' : ''">
      <div class="menu-circle" @click="leftSideShow">
        <img src="../../assets/images/logoG.png" alt="">
      </div>
      <div class="header-menu">
        <router-link class="menu-link"
          :class="[tabSwith === index ? 'is-active' : '', (index + 1) % 2 === 0 ? 'notify' : '']" :to="item.path"
          @click="tabSwith = index" v-for="(item, index) in tabSwithList">
          {{ item.title }}
        </router-link>
      </div>
      <div class="search-bar">
        <input @focus="SearchFlag = true" @blur="SearchFlag = false" type="text" placeholder="Search">
      </div>
      <div class="header-profile">
        <div class="notification">
          <span class="notification-number">3</span>
          <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" class="feather feather-bell">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
          </svg>
        </div>
        <svg viewBox="0 0 512 512" fill="currentColor">
          <path
            d="M448.773 235.551A135.893 135.893 0 00451 211c0-74.443-60.557-135-135-135-47.52 0-91.567 25.313-115.766 65.537-32.666-10.59-66.182-6.049-93.794 12.979-27.612 19.013-44.092 49.116-45.425 82.031C24.716 253.788 0 290.497 0 331c0 7.031 1.703 13.887 3.006 20.537l.015.015C12.719 400.492 56.034 436 106 436h300c57.891 0 106-47.109 106-105 0-40.942-25.053-77.798-63.227-95.449z" />
        </svg>

        <!-- <img v-if="avatarUrl!==null" class="profile-img" src="../../assets/SPY×FAMILY/1.jpg" alt=""> -->
        <!-- http://localhost:8080/src/assets/SPY%C3%97FAMILY/4.jpg -->
        <img class="profile-img" :src="avatarUrl" alt="" @click="loginOut">


      </div>
    </div>
    <router-view></router-view>
    <div class="left-side" v-if="status && sideShow">
      <div class="side-wrapper">
        <div class="side-title">App</div>
        <div class="side-menu">
          <router-link @click="sideShow = false" to="/apps">
            <svg viewBox="0 0 512 512">
              <g xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                <path d="M0 0h128v128H0zm0 0M192 0h128v128H192zm0 0M384 0h128v128H384zm0 0M0 192h128v128H0zm0 0"
                  data-original="#bfc9d1" />
              </g>
              <path xmlns="http://www.w3.org/2000/svg" d="M192 192h128v128H192zm0 0" fill="currentColor"
                data-original="#82b1ff" />
              <path xmlns="http://www.w3.org/2000/svg"
                d="M384 192h128v128H384zm0 0M0 384h128v128H0zm0 0M192 384h128v128H192zm0 0M384 384h128v128H384zm0 0"
                fill="currentColor" data-original="#bfc9d1" />
            </svg>
            All Apps
          </router-link>
          <router-link @click="sideShow = false" to="/apps/updates">
            <svg viewBox="0 0 488.932 488.932" fill="currentColor">
              <path
                d="M243.158 61.361v-57.6c0-3.2 4-4.9 6.7-2.9l118.4 87c2 1.5 2 4.4 0 5.9l-118.4 87c-2.7 2-6.7.2-6.7-2.9v-57.5c-87.8 1.4-158.1 76-152.1 165.4 5.1 76.8 67.7 139.1 144.5 144 81.4 5.2 150.6-53 163-129.9 2.3-14.3 14.7-24.7 29.2-24.7 17.9 0 31.8 15.9 29 33.5-17.4 109.7-118.5 192-235.7 178.9-98-11-176.7-89.4-187.8-187.4-14.7-128.2 84.9-237.4 209.9-238.8z" />
            </svg>
            Updates
            <span class="notification-number updates">3</span>
          </router-link>
        </div>
      </div>
      <div class="side-wrapper">
        <div class="side-title">Music</div>
        <div class="side-menu">
          <router-link @click="sideShow = false" to="/music/myhome">
            <svg viewBox="0 0 1024 1024" fill="currentColor">
              <path
                d="M947.2 422.4L572.8 115.2c-32-25.6-86.4-25.6-118.4 0L76.8 425.6c-12.8 6.4-16 22.4-9.6 35.2 3.2 12.8 16 19.2 28.8 19.2h32v364.8C128 892.8 163.2 928 211.2 928H416c19.2 0 32-12.8 32-32v-147.2c0-22.4 35.2-44.8 64-44.8 28.8 0 67.2 22.4 67.2 44.8V896c0 19.2 12.8 32 32 32h208c48 0 80-32 80-83.2V480h32c12.8 0 25.6-9.6 28.8-22.4 3.2-12.8 0-25.6-12.8-35.2z"
                p-id="4314"></path>
            </svg>
            My Home
          </router-link>
          <router-link @click="sideShow = false" to="/music">
            <svg t="1651369194282" class="icon" viewBox="0 0 1024 1024" version="1.1" fill="currentColor"
              xmlns="http://www.w3.org/2000/svg" p-id="2209">
              <path
                d="M875.52 433.152q-7.168-1.024-12.8-10.24t-8.704-33.792q-5.12-39.936-26.112-58.88t-65.024-27.136q-46.08-9.216-81.408-37.376t-58.88-52.736q-22.528-21.504-34.816-15.36t-12.288 22.528l0 44.032 0 96.256q0 57.344-0.512 123.904t-0.512 125.952l0 104.448 0 58.368q1.024 24.576-7.68 54.784t-32.768 56.832-64 45.568-99.328 22.016q-60.416 3.072-109.056-21.504t-75.264-61.952-26.112-81.92 38.4-83.456 81.92-54.272 84.992-16.896 73.216 5.632 47.616 13.312l0-289.792q0-120.832 1.024-272.384 0-29.696 15.36-48.64t40.96-22.016q21.504-3.072 35.328 8.704t28.16 32.768 35.328 47.616 56.832 52.224q30.72 23.552 53.76 33.792t43.008 18.944 39.424 20.992 43.008 39.936q23.552 26.624 28.672 55.296t0.512 52.224-14.848 38.4-17.408 13.824z"
                p-id="2210"></path>
            </svg>
            My Music
          </router-link>
          <a @click="getPlayListId">
            <svg t="1652001031085" fill="currentColor" class="icon" viewBox="0 0 1024 1024">
              <path
                d="M383.104 802.133333C375.466667 855.04 321.493333 896 256 896c-70.698667 0-128-47.786667-128-106.666667S185.301333 682.666667 256 682.666667c14.933333 0 29.312 2.133333 42.666667 6.058666V253.098667c0-21.888 13.653333-41.216 33.706666-47.786667l245.333334-75.008c30.890667-10.069333 62.293333 13.994667 62.293333 47.786667v75.008c0 25.002667-23.424 40.96-42.666667 45.568-27.733333 6.613333-98.816 20.821333-213.333333 42.666666v450.176c0 3.84-0.298667 7.381333-0.896 10.666667z"
                p-id="4252"></path>
              <path
                d="M682.666667 384h170.666666a42.666667 42.666667 0 0 1 0 85.333333h-170.666666a42.666667 42.666667 0 0 1 0-85.333333z m-85.333334 170.666667h256a42.666667 42.666667 0 0 1 0 85.333333h-256a42.666667 42.666667 0 0 1 0-85.333333z m0 170.666666h256a42.666667 42.666667 0 0 1 0 85.333334h-256a42.666667 42.666667 0 0 1 0-85.333334z"
                opacity=".3" p-id="4253"></path>
            </svg>
            Playlist Detail
          </a>
          <router-link @click="sideShow = false" to="/music/discovermusic">
             <svg viewBox="0 0 1117 1024" fill="currentColor">
            <path
              d="M875.056498 1023.999379c-9.650418 0-19.300837-2.885816-27.554893-8.564358L558.547598 811.907387l-159.49566 137.246947c-13.09478 9.526297-20.479988 15.577203-32.892102 11.636356s-20.6972-18.276837-24.824227-34.071252L273.068984 581.135163 31.560281 519.446958A49.679485 49.679485 0 0 1 0.002482 473.398016a49.710515 49.710515 0 0 1 30.968224-46.514396L1048.764029 1.023999c5.151027-2.23418 29.106407-0.124121 31.092344 0 11.450175 0.682666 24.296713 9.77454 25.07247 10.736479 7.292117 8.409207 11.263993 18.618171 12.03975 29.106406a98.366001 98.366001 0 0 1-0.868848 13.560235L923.33962 983.66001c-3.103028 16.446051-14.118779 30.192467-29.41671 36.584705a48.314153 48.314153 0 0 1-18.835382 3.785695zM369.79038 533.720889c-21.410896 13.280962-29.168467 37.701795-22.217684 62.060568l40.33937 211.005933c4.31321 15.111748 19.64217 3.22715 21.721198-12.412114l8.874662-130.327194c2.978907-24.824227 13.436113-28.268589 29.633921-43.442398L943.323123 198.593819c8.626419-8.067874-2.358302-18.618171-12.412114-12.412114L369.759349 533.720889z"
              p-id="5140"></path>
          </svg>
            DiscoverMusic
          </router-link>
          <router-link @click="sideShow = false" to="/music/topcharts">
          <svg viewBox="0 0 1024 1024" fill="currentColor"><path d="M432 112l160 0 0 800-160 0 0-800Z" p-id="4679"></path><path d="M165.34 432.03l160 0 0 479.97-160 0 0-479.97Z" p-id="4680"></path><path d="M698.66 538.71l160 0 0 373.29-160 0 0-373.29Z" p-id="4681"></path></svg>
          TopCharts
        </router-link>
        </div>
      </div>
      <div class="side-wrapper">
        <div class="side-title">Discover</div>
        <div class="side-menu">
        </div>
      </div>
      <div class="side-wrapper">
        <div class="side-title">Knowledge</div>
        <div class="side-menu">

        </div>
      </div>

    </div>
    <div v-if="status" class="overlay-app" :class="sideShow ? 'is-active' : ''" @click="sideShow = false"></div>
  </div>
</template>

<script lang="ts" setup>
// 引入工具
import { ref, reactive, onMounted, watch, toRaw } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useStore } from '@/stores';


// 路由
const route = useRoute()
// 使用路由
const router = useRouter()
// pinia
const store = useStore()
// 获得头像(ts报错因为没有整合类型)
const avatarUrl = ref<string>(toRaw(store.$state.userinfo.profile.avatarUrl))

// 导航栏的数据
const tabSwithList = reactive([{
  title: 'Apps',
  path: '/apps'
}, {
  title: 'Music',
  path: '/music'
}, {
  title: 'Discover',
  path: '/discover'
}, {
  title: 'Knowledge',
  path: '/knowledge'
}])

// 控制tab栏的动态样式
const tabSwith = ref(0)
// 控制搜索框的动态样式
const SearchFlag = ref(false)
// 控制侧边栏的显示
const sideShow = ref<boolean>(false)

// 识别用户是否是移动端，如果移动端，就让 video 标签失效
const IsPc = () => {
  let userAgent = navigator.userAgent, Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
  return Agents.some((i) => {
    return userAgent.includes(i)
  })
}
let status = IsPc()
// 左侧边栏的显示
const leftSideShow = () => {
  sideShow.value = true
}

// 退出登录
const loginOut = () => {

}

// 获得用户的歌单列表
const getPlayListId = () => {
  sideShow.value = false
  const id = store.$state.playListId
  // console.log('我是pinia中的id', id);
  router.push({
    name: 'PlayListDetail',
    params: {
      id
    }
  })
}

onMounted(() => {
  // 根据路由高亮当前的头部导航栏样式
  let tab = route.path.split('/')
  // console.log(tab[1]);
  switch (tab[1]) {
    case 'apps':
      tabSwith.value = 0;
      break;
    case 'music':
      tabSwith.value = 1;
      break;
    case 'discover':
      tabSwith.value = 2;
      break;
    case 'knowledge':
      tabSwith.value = 3;
      break;
  }

})

</script>

<style lang="less" scoped>
img {
  max-width: 100%;
}

.overlay-app {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  pointer-events: all;
  background-color: rgba(36, 39, 59, 0.8);
  opacity: 0;
  visibility: hidden;
  transition: 0.3s;
  z-index: 10;

  &.is-active {
    visibility: visible;
    opacity: 1;
  }
}

.app {
  background-color: var(--theme-bg-color);
  max-width: 1500px;
  max-height: 880px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  border-radius: 14px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  font-size: 15px;
  font-weight: 500;
  margin: auto;

  @media screen and (max-width: 480px) {
    border-radius: 0px;
  }

  .header {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    height: 58px;
    width: 100%;
    border-bottom: 1px solid var(--border-color);
    padding: 0 30px;
    white-space: nowrap;

    @media screen and (max-width: 480px) {
      padding: 0 16px;
    }

    &-menu {
      display: flex;
      align-items: center;

      a {
        padding: 20px 30px;
        text-decoration: none;
        color: var(--inactive-color);
        border-bottom: 2px solid transparent;
        transition: 0.3s;

        @media screen and (max-width: 610px) {
          &:not(.main-header-link) {
            display: none;
          }
        }

        &.is-active,
        &:hover {
          color: var(--theme-color);
          border-bottom: 2px solid var(--theme-color);
        }
      }
    }

    .search-bar {
      height: 40px;
      display: flex;
      width: 100%;
      max-width: 400px;
      padding-left: 16px;
      border-radius: 4px;

      input {
        width: 100%;
        height: 100%;
        border: none;
        background-color: var(--search-bg);
        border-radius: 4px;
        font-family: var(--body-font);
        font-size: 15px;
        font-weight: 500;
        padding: 0 20px 0 40px;
        box-shadow: 0 0 0 2px rgb(134 140 160 / 2%);
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 56.966 56.966' fill='%23717790c7'%3e%3cpath d='M55.146 51.887L41.588 37.786A22.926 22.926 0 0046.984 23c0-12.682-10.318-23-23-23s-23 10.318-23 23 10.318 23 23 23c4.761 0 9.298-1.436 13.177-4.162l13.661 14.208c.571.593 1.339.92 2.162.92.779 0 1.518-.297 2.079-.837a3.004 3.004 0 00.083-4.242zM23.984 6c9.374 0 17 7.626 17 17s-7.626 17-17 17-17-7.626-17-17 7.626-17 17-17z'/%3e%3c/svg%3e");
        background-size: 14px;
        background-repeat: no-repeat;
        background-position: 16px 48%;
        color: var(--theme-color);

        &::placeholder {
          font-family: var(--body-font);
          color: var(--inactive-color);
          font-size: 15px;
          font-weight: 500;
        }
      }
    }

    .menu-circle {
      width: 29px;
      height: 100%;
      padding: 10px 0;
      // background-color: #f96057;
      // border-radius: 50%;
      // box-shadow: 24px 0 0 0 #f8ce52, 48px 0 0 0 #5fcf65;
      margin-right: 181px;
      flex-shrink: 0;

      img {
        cursor: pointer;
        -webkit-user-select: none;
        -ms-user-select: none;
        -moz-user-select: none;
        -khtml-user-select: none;
        user-select: none;
        border-radius: 5px;
        width: 29px;
        height: 31px;
      }

      @media screen and (max-width: 945px) {
        margin-right: 20px;
      }
    }

    .header-profile {
      display: flex;
      align-items: center;
      padding: 0 16px 0 40px;
      margin-left: auto;
      flex-shrink: 0;


      svg {
        width: 22px;
        color: #f9fafb;
        flex-shrink: 0;
      }

    }

  }

  .wide {

    .menu-circle,
    .header-menu,
    .header-profile {
      display: none;
    }

    .search-bar {
      max-width: 600px;
      margin: auto;
      transition: 0.4s;
      box-shadow: 0 0 0 1px var(--border-color);
      padding-left: 0;
    }

    .menu-circle {
      margin-right: 0;
    }
  }
}

.notify {
  position: relative;

  &:before {
    content: "";
    position: absolute;
    background-color: #3a6df0;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    right: 20px;
    top: 16px;
  }

  @media screen and (max-width: 1055px) {
    display: none;
  }
}

.notification {
  position: relative;

  &-number {
    position: absolute;
    background-color: #3a6df0;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    font-size: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    right: -6px;
    top: -6px;
  }

  &+svg {
    margin-left: 22px;

    @media screen and (max-width: 945px) {
      display: none;
    }
  }
}

.profile-img {
  cursor: pointer;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--theme-color);
  margin-left: 22px;
}

.left-side {
  position: absolute;
  width: 80%;
  height: 100%;
  background-color: var(--popup-bg);
  z-index: 99;
  // padding: 20px;
  flex-basis: 240px;
  border-right: 1px solid var(--border-color);
  padding: 26px;
  overflow: auto;
  flex-shrink: 0;

  .side-wrapper+.side-wrapper {
    margin-top: 20px;
  }

  .side-title {
    color: var(--inactive-color);
    margin-bottom: 14px;
  }

  .side-menu {
    display: flex;
    flex-direction: column;
    white-space: nowrap;

    a {
      text-decoration: none;
      color: var(--theme-color);
      display: flex;
      align-items: center;
      font-weight: 400;
      padding: 10px;
      font-size: 14px;
      border-radius: 6px;
      transition: 0.3s;
      position: relative;

      &:hover {
        background-color: var(--hover-menu-bg);
      }
    }

    svg {
      width: 16px;
      margin-right: 8px;
    }
  }

}
</style>