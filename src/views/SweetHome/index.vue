<template>
  <video-bg></video-bg>
  <dark-light></dark-light>
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
        <img class="profile-img" src="../../assets/SPY×FAMILY/4.jpg" alt="" @click="loginCloudMusci">
      </div>
    </div>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <div class="left-side" v-if="sideShow"></div>
    <dialoge :flag="flag" title="Login" @on-click="getFlag">
      <template #default>
        <div class="login-form">
          <el-form ref="LoginFormRef" :model="LoginForm" status-icon :rules="rules" label-width="120px"
            label-position="top" class="demo-ruleForm">
            <el-form-item label="Phone Number" prop="PhoneNumber">
              <el-input v-model="LoginForm.phoneNumber"  />
            </el-form-item>
            <el-form-item label="SMS Verification" prop="verify" >
              <el-input v-model="LoginForm.verify"  />
              <el-button type="primary"  class="Verification-button">Get Verification</el-button>
            </el-form-item>
          </el-form>
        </div>
      </template>
    </dialoge>
  </div>
</template>

<script lang="ts" setup>
import VideoBg from '../../components/VideoBg/index.vue'
import DarkLight from '../../components/DarkLight/index.vue'
import dialoge from '../../components/Dialog/index.vue'
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
const sideShow = ref<boolean>(false)
const loginCloudMusci = () => {
  flag.value = true
}
// 获得子组件传来的值
const getFlag = (flagChild: boolean) => {
  // console.log(flagChild,'我接收到了子组件的传参')
  flag.value = flagChild
}
// 左侧边栏的显示
const leftSideShow = () => {
  sideShow.value = true
}
const LoginForm = reactive({
  phoneNumber: "",
  verify:""
})
const rules: any[] = []
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

<style lang="less" scoped>
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
  background-color: #3a6df0;
}

.login-form {
  padding: 20px 10px 10px 10px;
  color: var(--theme-color);
  position: relative;
  .Verification-button {
    position:absolute;
    right: 0px;
  }
}
</style>