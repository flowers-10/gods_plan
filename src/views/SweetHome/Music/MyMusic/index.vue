<template>
  <div class="main-container">
    <main-header :menuLink="menuLink"></main-header>
    <div class="content-wrapper">
      <div class="content-wrapper-header">
        <img class="profile-img" :src="userDetails[0]?.profile.avatarUrl" alt="">
        <div class="user-infor">
          <h3 class="infor-title"> {{ userDetails[0]?.profile.nickname }} </h3>
          <div>
            <span>{{ userDetails[0]?.profile.follows }} 关注</span>
            <span>{{ userDetails[0]?.profile.followeds }} 粉丝</span>
            <span> Lv. {{ userDetails[0]?.level }}</span>
          </div>
          <span>听歌排行 累计听歌{{ userDetails[0]?.listenSongs }}首</span>
        </div>
      </div>

      <div class="content-section">
        <div class="content-section-title">全部歌单</div>
        <div class="playlists-card">
          <div class="playlist-card" v-for="(item, index) in userPlaylists[0]?.playlist" @click="goPlayListDetail(item.id)">
            <img class="card-img" :src="item.coverImgUrl" alt="">
            <div class="card-detail">
              <span class="detail-name">{{ item.name }}</span>
              <span class="detail-trackCount">{{ item.trackCount }}首</span>
            </div>

          </div>
        </div>
      </div>

    </div>
  </div>
  <div class="overlay-app" :class="flag ? 'is-active' : ''"></div>
</template>

<script setup lang="ts">
// 引入工具
import { reactive, ref, toRaw, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from '@/stores'// pinia

// 引入接口
import { userDetail, userPlaylist } from '@/api/api'

// 使用pinia
const store = useStore()
// 使用路由
const router = useRouter()
// 给子组件传参
const menuLink = ref<string>('My Music')

// 控制弹窗和遮罩的显示隐藏
const flag = ref<boolean>(false)

// 获得用户id
const uid: string = store.$state.userinfo.account.id
// 用户详情
const userDetails: any = reactive([])
// 用户的歌单列表
const userPlaylists: any = reactive([])
// 获得用户信息和歌单列表
const getMyMusicData = async () => {
  const res: any = await userDetail(uid)
  userDetails.push(res)
  const result: any = await userPlaylist(uid)
  userPlaylists.push(result)
  // userPlaylists[0].playlist.shift()
}

// 路由传参跳到歌单详情
const goPlayListDetail = (id: string) => {
  store.getplayListId(id)
  router.push({
    name: 'PlayListDetail',
    params: {
      id
    }
  })
}


onMounted(() => {
  getMyMusicData()
})
</script>

<style lang="less" scoped>
.main-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

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

.profile-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border: 1px solid var(--theme-color);
  border-radius: 5px;
}

.user-infor {
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

}

.content-section {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  width: 100%;

  &-title {
    color: var(--content-title-color);
    margin-bottom: 14px;
  }


}


.playlists-card {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: calc(100% + 20px);

  .playlist-card {
    display: flex;
    width: calc(33.3% - 20px);
    font-size: 16px;
    background-color: var(--content-bg);
    border-radius: 14px;
    border: 1px solid var(--theme-bg-color);
    padding: 20px;
    cursor: pointer;
    transition: 0.3s ease;
    margin: 0 20px 10px 0;

    .card-detail {
      display: flex;
      flex-direction: column;

      .detail-name {
        margin-bottom: 5px;

      }

      .detail-trackCount {
        color: var(--content-title-color);
        font-size: 12px;
      }
    }

    .card-img {
      width: 50px;
      height: 50px;
      border-radius: 5px;
      margin-right: 15px;
    }

    &:hover {
      transform: scale(1.02);
      background-color: var(--theme-bg-color);
    }

    @media screen and (max-width: 1110px) {
      width: calc(50% - 20px);

      &:last-child {
        margin-top: 20px;
        margin-left: 0px;
      }
    }

    @media screen and (max-width: 565px) {
      width: calc(100% - 20px);
    }

  }
}
</style>