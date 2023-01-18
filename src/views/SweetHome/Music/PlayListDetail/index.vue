<template>
  <div class="main-container">
    <main-header :menuLink="menuLink" :menuItemsList="menuItemsList"></main-header>
    <div class="content-wrapper">
      <div class="content-wrapper-header">
        <img class="playList-img" :src="PlaylistDetails.playlist.coverImgUrl" alt="">
        <div class="playList-content">
          <div class="infor-title">{{  PlaylistDetails?.playlist.name  }} </div>
          <div class="content-songInfor">
            <img class="profile-img" :src="PlaylistDetails.playlist.creator.avatarUrl" alt="">
            <span>{{  PlaylistDetails?.playlist.creator.nickname  }}</span>
          </div>
          <div class="content-label">标签: {{  PlaylistDetails?.playlist.tags.join(',')  }}</div>
          <div class="content-songInfor">简介: {{  PlaylistDetails?.playlist.description  }}</div>
        </div>
      </div>
      <song-lists type="song" :id="id"></song-lists>
    </div>
  </div>
</template>

<script setup lang="ts">
// 引入工具
import { useRoute } from 'vue-router';
import { ref, onMounted, computed, reactive } from 'vue';
import { useStore } from '../../../../stores';// pinia
import { playListDetail } from '@/api/api'
import SongLists from '@/components/SongLists/index.vue'
// pinia
const store = useStore()
// 使用路由
const route = useRoute()
// 给子组件传参
const menuLink = ref<string>('Playlist Detail')
const menuItemsList = ref([
  { title: '歌曲列表' },
])
// 歌单所有歌曲
const PlaylistDetails: any = reactive({ playlist: { tags: [], creator: {} } })
// 获取id
let id: string | string[] = computed(() => {
  return route.params.id
}).value
// 获取歌单详情
const getPlaylistDetail = async (ids: string | string[]) => {
  const res: any = await playListDetail(ids)
  PlaylistDetails.playlist = res.playlist
  document.title=`热浪 - ${PlaylistDetails.playlist.name}`
  // 存入pinia中保存,下次进入后还是当前点击的歌单
  store.getplayListId(ids)
}

onMounted(() => {
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
      padding: 20px 20px 80px 20px;
    }

    &-header {
      display: flex;
      align-items: center;
      border-radius: 14px;
      padding: 20px 40px;
      background-color: var(--content-bg);

      @media screen and (max-width: 480px) {
        padding: 15px;
      }
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

  @media screen and (max-width: 480px) {
    width: 100px;
    height: 100px;
    margin-right: 5px;
  }

  @media screen and (max-width: 660px) {
    width: 120px;
    height: 120px;
    margin-right: 5px;
  }
}

.playList-content {
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 10px 0;

  @media screen and (max-width: 480px) {
    padding: 5px 0;
  }

  .infor-title {
    font-weight: 600;
    font-size: 17px;
    display: flex;
    align-items: center;
    padding: 10px;

    @media screen and (max-width: 660px) {
      font-weight: 500;
      font-size: 16px;
      padding: 0;
      margin-bottom: 15px;
    }
  }

  span {
    margin-left: 5px;
  }

  .content-songInfor {
    display: flex;
    align-items: center;
    // padding: 10px;
    margin-left: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;

    @media screen and (max-width: 660px) {
      padding: 0;
      margin-bottom: 8px;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }

  .content-label {
    display: flex;
    align-items: center;
    padding: 10px;

    @media screen and (max-width: 660px) {
      display: none;
    }
  }
}

.profile-img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 20px;

  @media screen and (max-width: 510px) {
    width: 25px;
    height: 25px;
    margin-right: 5px;
  }

  @media screen and (max-width:660px) {
    width: 40px;
    height: 40px;
    margin-right: 5px;
  }
}
</style>