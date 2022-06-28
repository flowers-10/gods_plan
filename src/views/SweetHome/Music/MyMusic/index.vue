<template>
  <div class="main-container">
    <main-header :menuLink="menuLink" :menuItemsList="menuItemsList"></main-header>
    <div class="content-wrapper">
      <content-section v-for="(item, index) in menuItemsList" :key="index" :title="item.title"
        :slotName="item.slotName">
        <template #[item.slotName]>

          <div class="content-wrapper-header" v-if="index === 0">
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

          <div class="my-likeList" v-if="index === 1">
            <div class="likeList-coverImg">
              <img class="coverImg" :src="likeLists[0]?.coverImgUrl" alt="">

              <div class="likeList-detail">
                <span>
                  {{ likeLists[0]?.name }}
                </span>
                <span>
                  歌曲：{{ likeLists[0]?.trackCount }} 首
                </span>
                <span>
                  播放：{{ likeLists[0]?.playCount }} 次
                </span>
                <span>
                  创建：{{ $filters.formatTime(likeLists[0]?.createTime) }}
                </span>
              </div>
            </div>
          </div>

          <div class="playlists-card" v-if="index === 2">
            <div class="playlist-card" v-for="(item, index) in userPlaylists[0]?.playlist"
              @click="goPlayListDetail(item.id)">
              <img class="card-img" :src="item.coverImgUrl" alt="">
              <div class="card-detail">
                <span class="detail-name">{{ item.name }}</span>
                <span class="detail-trackCount">{{ item.trackCount }}首</span>
                <span class="detail-trackCount">by {{ item.creator.nickname }}</span>
              </div>
            </div>
          </div>
          
        </template>
      </content-section>
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
const menuItemsList = ref([
  { title: '关于我', slotName: 'me' },
  { title: '我喜欢的音乐', slotName: 'music' },
  { title: '全部歌单', slotName: 'playlist' },
])



// 控制弹窗和遮罩的显示隐藏
const flag = ref<boolean>(false)

// 获得用户id
const uid: string = store.$state.userinfo.account.id
// 用户详情
const userDetails: any = reactive([])
// 用户的歌单列表
const userPlaylists: any = reactive([])

// 我喜欢的音乐
const likeLists: any = reactive([])

// 获得用户信息和歌单列表
const getMyMusicData = async () => {
  // 用户信息
  const res: any = await userDetail(uid)
  // console.log(res);
  userDetails.push(res)
  const result: any = await userPlaylist(uid)
  userPlaylists.push(result)
  // console.log(result);

  // 用户喜欢的音乐
  likeLists.push(
    userPlaylists[0].playlist.shift()
  )
  // console.log(likeLists);

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
  padding: 20px 40px 100px;
  height: 100%;
  overflow: auto;
  background-color: var(--theme-bg-color);
  background-size: 100% 100%;
  background-position: center center;

  @media screen and (max-width: 510px) {
    padding: 20px 20px 100px 20px;
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
      margin-top: 5px;
      display: flex;
      flex-direction: column;

      .detail-name {
        margin-bottom: 10px;

      }

      .detail-trackCount {
        color: var(--content-title-color);
        font-size: 12px;
        margin-top: 5px;
      }
    }

    .card-img {
      width: 100px;
      height: 100%;
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
        // margin-top: 20px;
        margin-left: 0px;
      }
    }

    @media screen and (max-width: 565px) {
      width: calc(100% - 20px);
    }

  }
}

.my-likeList {
  background-color: var(--content-bg);
  border-radius: 14px;
  border: 1px solid var(--theme-bg-color);
  padding: 20px;
  width: 100%;

  .likeList-coverImg {

    width: 100%;
    padding: 10px;
    display: flex;
    // justify-content: space-between;

    @media screen and (max-width: 480px) {
      flex-direction: column;

    }

    .coverImg {
      display: block;
      width: 300px;
      border-radius: 50%;
      cursor: pointer;

      @media screen and (max-width: 480px) {
        width: 100%;

      }
    }
  }

  .likeList-detail {
    padding: 20px 20px 0 70px;
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 480px) {
      padding: 30px 10px 0 10px;

    }

    span {
      font-size: 22px;
      margin-bottom: 20px;

      @media screen and (max-width: 480px) {
        font-size: 14px;
      }
    }
  }

  ul {
    width: 100%;
    padding: 10px;

    @media screen and (max-width: 480px) {
      display: none;
    }

    li {
      padding: 10px;
      display: flex;
      align-items: center;
      cursor: pointer;
      border-radius: 14px;


      &:hover {
        background-color: var(--theme-bg-color);

        &:first-child {
          border-radius: 13px 13px 0 0;
        }

        &:last-child {
          border-radius: 0 0 13px 13px;
        }
      }

      img {
        width: 45px;
        border-radius: 4px;
      }

      span {
        margin-left: 10px;
      }
    }
  }
}
</style>