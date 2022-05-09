<template>
  <div class="main-container">
    <main-header :menuLink="menuLink"></main-header>
    <div class="content-wrapper">
      <div class="content-wrapper-header">
        <img class="playList-img" :src="PlaylistDetail[0]?.playlist.coverImgUrl" alt="">
        <div class="playList-content">
          <div class="infor-title content-userInfo">{{ PlaylistDetail[0]?.playlist.name }} </div>
          <div class="content-userInfo">
            <img class="profile-img" :src="PlaylistDetail[0]?.playlist.creator.avatarUrl" alt="">
            <span>{{ PlaylistDetail[0]?.playlist.creator.nickname }}</span>
          </div>
          <div class="content-userInfo">标签: {{PlaylistDetail[0]?.playlist.tags.join(',') }}</div>
          <div class="content-userInfo">简介: {{ PlaylistDetail[0]?.playlist.description}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 引入工具
import { useRoute } from 'vue-router';
import { ref, onMounted, computed, toRaw, watch, reactive } from 'vue';
import { playListDetail } from '@/api/api'

// 使用路由
const route = useRoute()
// 给子组件传参
const menuLink = ref<string>('Playlist Detail')

// 歌单所有歌曲
const PlaylistDetail: any = reactive([])
// 获取歌单所有歌曲

let id:any = computed(()=> {
  return route.params.id
}).value
// 获取歌单所有歌曲
const getPlaylistDetail = (ids: number) => {
  // console.log('传参的', ids);
  playListDetail(ids).then(
    res => {
      // console.log(res);
      PlaylistDetail.push(res)
    }
  )
}

onMounted(() => {
  // id.value = Number(route.params.id)
  getPlaylistDetail(id)
})
</script>

<style lang="less" scoped>
.main-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;

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

}

.playList-img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border: 1px solid var(--theme-color);
  border-radius: 5px;
  margin-right: 10px;

  @media screen and (max-width: 510px) {
    width: 120px;
    height: 120px;
  }
}

.playList-content {
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 10px 0;

  @media screen and (max-width: 510px) {
    padding: 5px 0;
  }

  .infor-title {
    font-weight: 600;
    font-size: 17px;
  }

  span {
    margin-left: 5px;
  }

  .content-userInfo {
    display: flex;
    align-items: center;
    padding: 10px;
  }
}

.profile-img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  box-shadow: 0px 0px 5px 0px var(--theme-color);
  border-radius: 50%;
  margin-right: 20px;

  @media screen and (max-width: 510px) {
    width: 40px;
    height: 40px;
    margin-right: 5px;
  }
}
</style>