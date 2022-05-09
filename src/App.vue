<template>
  <div>
    <video-bg></video-bg>
    <dark-light></dark-light>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import VideoBg from './components/VideoBg/index.vue'
import DarkLight from './components/DarkLight/index.vue'
</script>

<style lang="less">
* {
  outline: none;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

a {
  text-decoration: none;
  color: var(--theme-color);
}

/* 全局变量 */
:root {
  --theme-bg-color: rgba(16 18 27 / 40%);
  --border-color: rgba(113 119 144 / 25%);
  --theme-color: #f9fafb;
  --inactive-color: rgb(113 119 144 / 78%);
  --body-font: "Poppins", sans-serif;
  --hover-menu-bg: rgba(12 15 25 / 30%);
  --content-title-color: #999ba5;
  --content-bg: rgb(146 151 179 / 13%);
  --button-inactive: rgb(249 250 251 / 55%);
  --dropdown-bg: #21242d;
  --dropdown-hover: rgb(42 46 60);
  --popup-bg: rgb(22 25 37);
  --search-bg: #14162b;
  --overlay-bg: rgba(36, 39, 59, 0.3);
  --scrollbar-bg: rgb(1 2 3 / 40%);
}

/* 亮色模式的变量 */
.light-mode {
  --theme-bg-color: rgb(255 255 255 / 31%);
  --theme-color: #3c3a3a;
  --inactive-color: #333333;
  --button-inactive: #3c3a3a;
  --search-bg: rgb(255 255 255 / 31%);
  --dropdown-bg: #f7f7f7;
  --overlay-bg: rgb(255 255 255 / 30%);
  --dropdown-hover: rgb(236 236 236);
  --border-color: rgb(255 255 255 / 35%);
  --popup-bg: rgb(255 255 255);
  --hover-menu-bg: rgba(255 255 255 / 35%);
  --scrollbar-bg: rgb(255 253 253 / 57%);
  --content-title-color: --theme-color;
}

.light-mode {
  .dark-light svg {
    fill: transparent;
    stroke: var(--theme-color);
  }

  .profile-img {
    border: 2px solid var(--theme-bg-color)
  }

  .content-section ul {
    background-color: var(--theme-bg-color);
  }

  .pop-up__title {
    border-color: var(--theme-color);
  }

  .dropdown.is-active ul {
    background-color: rgb(255 255 255 / 94%);
  }
}

/* 滚轮样式 */
::-webkit-scrollbar {
  width: 6px;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: var(--scrollbar-bg);
  border-radius: 10px;
}

html {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
}

body {
  font-family: var(--body-font);
  background-image: url(https://wallpapershome.com/images/wallpapers/macos-big-sur-1280x720-dark-wwdc-2020-22655.jpg);
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2em;
  width: 100%;
  height: 100vh;

  @media screen and (max-width: 480px) {
    padding: 0.8em;
  }
}
</style>