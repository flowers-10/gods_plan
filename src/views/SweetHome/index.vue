<template>
  <video-bg></video-bg>
  <dark-light></dark-light>
  <div class="app">
    <div class="header" :class="SearchFlag === true ? 'wide' : ''">
      <div class="menu-circle">
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
        <img class="profile-img" src="../../assets/SPY×FAMILY/4.jpg" alt="" @click="loginCloudMusci">
      </div>
    </div>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
  <div class="overlay-app" :class="flag ? 'is-active' : ''"></div>
  <div class="pop-up" :class="flag ? 'visible':''">
    <div class="pop-up__title">Update This App
      <svg @click="flag = false" class="close feather feather-x-circle" width="24" height="24" fill="none" stroke="currentColor"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M15 9l-6 6M9 9l6 6" />
      </svg>
    </div>
    <div class="pop-up__subtitle">Adjust your selections for advanced options as desired before
      continuing. <a href="#">Learn more</a></div>
    <div class="checkbox-wrapper">
      <input type="checkbox" id="check1" class="checkbox">
      <label for="check1">Import previous settings and preferences</label>
    </div>
    <div class="checkbox-wrapper">
      <input type="checkbox" id="check2" class="checkbox">
      <label for="check2">Remove old versions</label>
    </div>
    <div class="content-button-wrapper">
      <button class="content-button status-button open close" @click="flag = false">Cancel</button>
      <button class="content-button status-button">Continue</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import VideoBg from '../../components/VideoBg/index.vue'
import DarkLight from '../../components/DarkLight/index.vue'
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router';

const route = useRoute()
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
const flag = ref<boolean>(false)

const loginCloudMusci = () => {
  flag.value = true
}

onMounted(() => {
  let tab = route.path.split('/')
  console.log(tab[1]);
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

<style lang="less">
img {
  max-width: 100%;
}

.app {
  background-color: var(--theme-bg-color);
  max-width: 1400px;
  max-height: 880px;
  height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  border-radius: 14px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  font-size: 15px;
  font-weight: 500;

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
      width: 59px;
      height: 100%;
      padding: 10px 30px 10px 0;
      // background-color: #f96057;
      // border-radius: 50%;
      // box-shadow: 24px 0 0 0 #f8ce52, 48px 0 0 0 #5fcf65;
      margin-right: 151px;
      flex-shrink: 0;

      img {
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
        display: none;
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

  &.is-active {
    visibility: visible;
    opacity: 1;
  }
}

.pop-up {
  position: absolute;
  padding: 30px 40px;
  top: 50%;
  left: 50%;
  transform: (translate(-50%, -50%));
  overflow-y: auto;
  box-shadow: 0px 6px 30px rgba(0, 0, 0, 0.4);
  transition: all 0.3s;
  z-index: 10;
  background-color: var(--popup-bg);
  width: 500px;
  visibility: hidden;
  opacity: 0;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  white-space: normal;

  @media screen and (max-width: 570px) {
    width: 100%;
  }

  &.visible {
    visibility: visible;
    opacity: 1;
  }

  &__title {
    padding-bottom: 20px;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--theme-color);
  }

  &__subtitle {
    white-space: normal;
    margin: 20px 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.8em;
    color: var(--theme-color);
    a {
      color: var(--theme-color);
    }
  }
}

.content-button-wrapper .content-button.status-button.open.close {
  width: auto;
}

.content-section .close {
  margin-right: 0;
  width: 24px;
}

.checkbox-wrapper {
  color: var(--theme-color);
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 400;

  &+.checkbox-wrapper {
    margin: 20px 0 40px;
  }
}

.checkbox {
  display: none;
}

.checkbox+label {
  display: flex;
  align-items: center;

  &:before {
    content: "";
    margin-right: 10px;
    width: 15px;
    height: 15px;
    border: 1px solid var(--theme-color);
    border-radius: 4px;
    cursor: pointer;
    flex-shrink: 0;
  }
}

.checkbox:checked+label:before {
  background-color: #3a6df0;
  border-color: #3a6df0;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23fff' stroke-width='3' stroke-linecap='round' stroke-linejoin='round' class='feather feather-check'%3e%3cpath d='M20 6L9 17l-5-5'/%3e%3c/svg%3e");
  background-position: 50%;
  background-size: 12px;
  background-repeat: no-repeat;
}

.content-button-wrapper {
  margin-top: auto;
  margin-left: auto;

  .open {
    margin-right: 8px;
  }
}


</style>