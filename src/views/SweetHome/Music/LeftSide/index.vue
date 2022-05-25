<template>
  <div class="left-side">
    <div class="side-wrapper">
      <div class="side-title">Musics</div>
      <div class="side-menu">
        <router-link to="/music/mymusic">
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
      </div>
    </div>
    <div class="side-wrapper">
      <div class="side-title">Discover</div>
      <div class="side-menu">
        <router-link to="/music/discovermusic">
          <svg viewBox="0 0 1117 1024" fill="currentColor">
            <path
              d="M875.056498 1023.999379c-9.650418 0-19.300837-2.885816-27.554893-8.564358L558.547598 811.907387l-159.49566 137.246947c-13.09478 9.526297-20.479988 15.577203-32.892102 11.636356s-20.6972-18.276837-24.824227-34.071252L273.068984 581.135163 31.560281 519.446958A49.679485 49.679485 0 0 1 0.002482 473.398016a49.710515 49.710515 0 0 1 30.968224-46.514396L1048.764029 1.023999c5.151027-2.23418 29.106407-0.124121 31.092344 0 11.450175 0.682666 24.296713 9.77454 25.07247 10.736479 7.292117 8.409207 11.263993 18.618171 12.03975 29.106406a98.366001 98.366001 0 0 1-0.868848 13.560235L923.33962 983.66001c-3.103028 16.446051-14.118779 30.192467-29.41671 36.584705a48.314153 48.314153 0 0 1-18.835382 3.785695zM369.79038 533.720889c-21.410896 13.280962-29.168467 37.701795-22.217684 62.060568l40.33937 211.005933c4.31321 15.111748 19.64217 3.22715 21.721198-12.412114l8.874662-130.327194c2.978907-24.824227 13.436113-28.268589 29.633921-43.442398L943.323123 198.593819c8.626419-8.067874-2.358302-18.618171-12.412114-12.412114L369.759349 533.720889z"
              p-id="5140"></path>
          </svg>
          DiscoverMusic
          <span class="notification-number updates">3</span>
        </router-link>
        <router-link to="/music/topcharts">
          <svg viewBox="0 0 1024 1024" fill="currentColor"><path d="M432 112l160 0 0 800-160 0 0-800Z" p-id="4679"></path><path d="M165.34 432.03l160 0 0 479.97-160 0 0-479.97Z" p-id="4680"></path><path d="M698.66 538.71l160 0 0 373.29-160 0 0-373.29Z" p-id="4681"></path></svg>
          TopCharts
        </router-link>
      </div>
    </div>
    <div class="side-wrapper">
      <div class="side-title">Home</div>
      <div class="side-menu">
        <router-link to="/music/myhome">
          <svg viewBox="0 0 1024 1024" fill="currentColor">
            <path
              d="M947.2 422.4L572.8 115.2c-32-25.6-86.4-25.6-118.4 0L76.8 425.6c-12.8 6.4-16 22.4-9.6 35.2 3.2 12.8 16 19.2 28.8 19.2h32v364.8C128 892.8 163.2 928 211.2 928H416c19.2 0 32-12.8 32-32v-147.2c0-22.4 35.2-44.8 64-44.8 28.8 0 67.2 22.4 67.2 44.8V896c0 19.2 12.8 32 32 32h208c48 0 80-32 80-83.2V480h32c12.8 0 25.6-9.6 28.8-22.4 3.2-12.8 0-25.6-12.8-35.2z"
              p-id="4314"></path>
          </svg>
          My Home
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 引入工具
import { useStore } from '@/stores';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

// 使用路由
const router = useRouter()
// 使用pinia
const store = useStore()

// 获得用户的歌单列表
const getPlayListId = () => {
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

})
</script>

<style lang="less" scoped>
.left-side {
  flex-basis: 240px;
  border-right: 1px solid var(--border-color);
  padding: 26px;
  overflow: auto;
  flex-shrink: 0;

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
    cursor: pointer;
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