<template>
  <div class="wrapper">

    <div class="left-sides">
      <div class="side-wrapper">
        <div class="side-title">Apps</div>
        <div class="side-menu">
          <router-link to="/apps">
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
            Works
          </router-link>
          <router-link to="/apps/updates">
            <svg viewBox="0 0 488.932 488.932" fill="currentColor">
              <path
                d="M243.158 61.361v-57.6c0-3.2 4-4.9 6.7-2.9l118.4 87c2 1.5 2 4.4 0 5.9l-118.4 87c-2.7 2-6.7.2-6.7-2.9v-57.5c-87.8 1.4-158.1 76-152.1 165.4 5.1 76.8 67.7 139.1 144.5 144 81.4 5.2 150.6-53 163-129.9 2.3-14.3 14.7-24.7 29.2-24.7 17.9 0 31.8 15.9 29 33.5-17.4 109.7-118.5 192-235.7 178.9-98-11-176.7-89.4-187.8-187.4-14.7-128.2 84.9-237.4 209.9-238.8z" />
            </svg>
            Updates
          </router-link>
          <!-- <router-link to="/apps/games">
            <svg t="1669266744050" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="3287" fill="currentColor">
              <path
                d="M307.2 184.32h409.6c135.72096 0 245.76 110.03904 245.76 245.76v327.68a81.92 81.92 0 0 1-81.92 81.92h-136.704a122.88 122.88 0 0 1-104.20224-57.7536l-33.73056-53.98528a110.85824 110.85824 0 0 0-188.0064 0l-33.73056 53.98528A122.88 122.88 0 0 1 280.064 839.68H143.36a81.92 81.92 0 0 1-81.92-81.92V430.08C61.44 294.35904 171.47904 184.32 307.2 184.32z m-13.23008 187.392a50.42176 50.42176 0 0 1-45.13792 45.13792l-59.904 6.00064a27.8528 27.8528 0 0 0 0 55.41888l59.904 6.00064a50.42176 50.42176 0 0 1 45.13792 45.13792l6.00064 59.904a27.8528 27.8528 0 0 0 55.41888 0l6.00064-59.904a50.42176 50.42176 0 0 1 45.13792-45.13792l59.904-6.00064a27.8528 27.8528 0 0 0 0-55.41888l-59.904-6.00064a50.42176 50.42176 0 0 1-45.13792-45.13792l-6.00064-59.904a27.8528 27.8528 0 0 0-55.41888 0l-6.00064 59.904zM716.8 389.12a40.96 40.96 0 1 0 0-81.92 40.96 40.96 0 0 0 0 81.92z m0 204.8a40.96 40.96 0 1 0 0-81.92 40.96 40.96 0 0 0 0 81.92z m61.44-143.36a40.96 40.96 0 1 0 81.92 0 40.96 40.96 0 0 0-81.92 0z m-204.8 0a40.96 40.96 0 1 0 81.92 0 40.96 40.96 0 0 0-81.92 0z"
                p-id="3288"></path>
            </svg>
            Games
          </router-link> -->
          <a href="http://www.godsplan.top:3002/" target="_blank">
            <svg t="1662019099686" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="16242" fill="currentColor">
              <path
                d="M725.507 669.185l-4.797 36.784h-25.587v-33.585l-52.775-7.997 4.799-20.788c22.39-15.992 115.145 17.589 182.313-78.367 67.168-95.954 12.993-157.595 0-167.905-16.793-13.326-105.551 1.597-105.551 1.597s51.178-44.592 63.968-92.757 0-123.138 0-123.138C740 102 648.742 96.668 648.742 96.668 552 160.667 519.205 326.959 519.205 326.959l-22.389-1.598c-17.591-70.366-73.566-148.729-174.319-175.918-100.752-27.189-139.134 89.559-139.134 89.559-3.2 150.33 126.341 239.885 126.341 239.885C61.822 515.68 68.217 632.404 68.217 632.404c79.961 134.337 319.852 87.959 319.852 87.959l4.797 73.563c148.729 9.597 217.496-39.98 217.496-39.98l6.398 68.766c-47.979 54.374-38.382 123.145-38.382 123.145 91.157-20.789 118.344-118.345 118.344-118.345l39.98-15.992 105.55-14.393c111.949-113.549 113.547-190.313 113.547-190.313-150.331-9.595-230.292 62.371-230.292 62.371zM519.205 530.051c-15.898 0-28.788-12.889-28.788-28.788 0-15.897 12.89-28.786 28.788-28.786 15.896 0 28.786 12.888 28.786 28.786 0 15.899-12.889 28.788-28.786 28.788z m187.11 239.887v-7.993s68.77-57.573 87.96-52.776c19.192 4.798-38.384 68.762-87.96 60.769z"
                p-id="16243"></path>
            </svg>
            Anime Girl
          </a>
          <router-link to="/apps/echartmap">
            <svg t="1665393207399" fill="currentColor" class="icon" viewBox="0 0 1024 1024" version="1.1"
              xmlns="http://www.w3.org/2000/svg" p-id="8699">
              <path d="M87.45984 588.91264 827.262976 186.5728 491.702272 958.961664 416.700416 638.511104Z" p-id="8700">
              </path>
            </svg>
            Echart Map
          </router-link>
        </div>
      </div>
      <div class="side-wrapper">
        <div class="side-title">Tools</div>
        <div class="side-menu">
          <router-link to="/apps/setup">
            <svg t="1662014382031" fill="currentColor" viewBox="0 0 1024 1024" version="1.1"
              xmlns="http://www.w3.org/2000/svg" p-id="3214">
              <path
                d="M940 596l-76-57.6c0.8-8 1.6-16.8 1.6-26.4s-0.8-18.4-1.6-26.4l76-57.6c20.8-16 26.4-44 12.8-68l-84.8-143.2c-9.6-16.8-28-27.2-47.2-27.2-6.4 0-12 0.8-18.4 3.2L712 228c-15.2-10.4-31.2-19.2-47.2-26.4l-13.6-92c-4-26.4-26.4-45.6-53.6-45.6H426.4c-27.2 0-49.6 19.2-53.6 44.8L360 201.6c-16 7.2-31.2 16-47.2 26.4l-90.4-35.2c-6.4-2.4-12.8-3.2-19.2-3.2-19.2 0-37.6 9.6-46.4 26.4L71.2 360c-13.6 22.4-8 52 12.8 68l76 57.6c-0.8 9.6-1.6 18.4-1.6 26.4s0 16.8 1.6 26.4l-76 57.6c-20.8 16-26.4 44-12.8 68l84.8 143.2c9.6 16.8 28 27.2 47.2 27.2 6.4 0 12-0.8 18.4-3.2L312 796c15.2 10.4 31.2 19.2 47.2 26.4l13.6 92c3.2 25.6 26.4 45.6 53.6 45.6h171.2c27.2 0 49.6-19.2 53.6-44.8l13.6-92.8c16-7.2 31.2-16 47.2-26.4l90.4 35.2c6.4 2.4 12.8 3.2 19.2 3.2 19.2 0 37.6-9.6 46.4-26.4l85.6-144.8c12.8-23.2 7.2-51.2-13.6-67.2zM704 512c0 105.6-86.4 192-192 192S320 617.6 320 512s86.4-192 192-192 192 86.4 192 192z"
                p-id="3215"></path>
            </svg>
            Setup
          </router-link>

          <!-- <router-link to="/apps/signcross">
            <svg t="1662014382031" fill="currentColor" viewBox="0 0 1024 1024" version="1.1"
              xmlns="http://www.w3.org/2000/svg" p-id="3214">
              <path
                d="M940 596l-76-57.6c0.8-8 1.6-16.8 1.6-26.4s-0.8-18.4-1.6-26.4l76-57.6c20.8-16 26.4-44 12.8-68l-84.8-143.2c-9.6-16.8-28-27.2-47.2-27.2-6.4 0-12 0.8-18.4 3.2L712 228c-15.2-10.4-31.2-19.2-47.2-26.4l-13.6-92c-4-26.4-26.4-45.6-53.6-45.6H426.4c-27.2 0-49.6 19.2-53.6 44.8L360 201.6c-16 7.2-31.2 16-47.2 26.4l-90.4-35.2c-6.4-2.4-12.8-3.2-19.2-3.2-19.2 0-37.6 9.6-46.4 26.4L71.2 360c-13.6 22.4-8 52 12.8 68l76 57.6c-0.8 9.6-1.6 18.4-1.6 26.4s0 16.8 1.6 26.4l-76 57.6c-20.8 16-26.4 44-12.8 68l84.8 143.2c9.6 16.8 28 27.2 47.2 27.2 6.4 0 12-0.8 18.4-3.2L312 796c15.2 10.4 31.2 19.2 47.2 26.4l13.6 92c3.2 25.6 26.4 45.6 53.6 45.6h171.2c27.2 0 49.6-19.2 53.6-44.8l13.6-92.8c16-7.2 31.2-16 47.2-26.4l90.4 35.2c6.4 2.4 12.8 3.2 19.2 3.2 19.2 0 37.6-9.6 46.4-26.4l85.6-144.8c12.8-23.2 7.2-51.2-13.6-67.2zM704 512c0 105.6-86.4 192-192 192S320 617.6 320 512s86.4-192 192-192 192 86.4 192 192z"
                p-id="3215"></path>
            </svg>
            CrossSign
          </router-link>
          <router-link to="/apps/sse">
            <svg t="1662014382031" fill="currentColor" viewBox="0 0 1024 1024" version="1.1"
              xmlns="http://www.w3.org/2000/svg" p-id="3214">
              <path
                d="M940 596l-76-57.6c0.8-8 1.6-16.8 1.6-26.4s-0.8-18.4-1.6-26.4l76-57.6c20.8-16 26.4-44 12.8-68l-84.8-143.2c-9.6-16.8-28-27.2-47.2-27.2-6.4 0-12 0.8-18.4 3.2L712 228c-15.2-10.4-31.2-19.2-47.2-26.4l-13.6-92c-4-26.4-26.4-45.6-53.6-45.6H426.4c-27.2 0-49.6 19.2-53.6 44.8L360 201.6c-16 7.2-31.2 16-47.2 26.4l-90.4-35.2c-6.4-2.4-12.8-3.2-19.2-3.2-19.2 0-37.6 9.6-46.4 26.4L71.2 360c-13.6 22.4-8 52 12.8 68l76 57.6c-0.8 9.6-1.6 18.4-1.6 26.4s0 16.8 1.6 26.4l-76 57.6c-20.8 16-26.4 44-12.8 68l84.8 143.2c9.6 16.8 28 27.2 47.2 27.2 6.4 0 12-0.8 18.4-3.2L312 796c15.2 10.4 31.2 19.2 47.2 26.4l13.6 92c3.2 25.6 26.4 45.6 53.6 45.6h171.2c27.2 0 49.6-19.2 53.6-44.8l13.6-92.8c16-7.2 31.2-16 47.2-26.4l90.4 35.2c6.4 2.4 12.8 3.2 19.2 3.2 19.2 0 37.6-9.6 46.4-26.4l85.6-144.8c12.8-23.2 7.2-51.2-13.6-67.2zM704 512c0 105.6-86.4 192-192 192S320 617.6 320 512s86.4-192 192-192 192 86.4 192 192z"
                p-id="3215"></path>
            </svg>
            SSE
          </router-link> -->
        </div>
      </div>
    </div>

    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from "vue"
console.log("进入App setup生命周期");
onBeforeMount(() => {
  console.log("进入App onBeforeMount");

})
onMounted(() => {
  console.log("进入App onMounted");
})

onBeforeUpdate(() => {
  console.log("进入App onBeforeUpdate");

})
onUpdated(() => {
  console.log("进入App onUpdated");
})

onBeforeUnmount(() => {
  console.log("进入App onBeforeUnmount");
})

onUnmounted(() => {
  console.log("进入App onUnmounted");
})
</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  flex-grow: 1;
  overflow: hidden;
}


.left-sides {
  flex-basis: 240px;
  border-right: 1px solid var(--border-color);
  padding: 26px;
  overflow: auto;
  flex-shrink: 0;
  user-select: none;

  @media screen and (max-width: 945px) {
    display: none;
  }
}

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

.updates {
  position: relative;
  top: 0;
  right: 0;
  margin-left: auto;
  width: 18px;
  height: 18px;
  font-size: 11px;
}


.notification-number {
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
  right: 10px;
  top: 11px;
}
</style>