<template>
  <div class="main-container">
    <main-header :menuLink="menuLink" :menuItemsList="menuItemsList"></main-header>
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
        <div class="content-section-title"><a name="1">我喜欢的音乐</a></div>
        <div class="my-likeList">

          <div class="likeList-coverImg">
            <router-link to="/">
              <img class="coverImg" :src="likeLists[0]?.coverImgUrl" alt="">
            </router-link>
            <div class="likeList-detail">
              <span>
                {{ likeLists[0]?.name }}
              </span>
              <span>
                {{ likeLists[0]?.trackCount }}首
              </span>
            </div>
          </div>
          <ul>
            <li v-for="(item, index) in songs" :key="index">
              <img :src="item.al.picUrl" alt="">
              <span class="songs-name">{{ item.name }}</span>
              <span class="singer">
                {{ filtersinger(item.ar) }}

              </span>
            </li>
          </ul>



        </div>
      </div>

      <div class="content-section">
        <div class="content-section-title"><a name="2">全部歌单</a></div>
        <div class="playlists-card">
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
import { userDetail, userPlaylist, likeList, songDetail } from '@/api/api'

// 使用pinia
const store = useStore()
// 使用路由
const router = useRouter()
// 给子组件传参
const menuLink = ref<string>('My Music')
const menuItemsList = ref([
  { title: '我喜欢的音乐', path: '#1' },
  { title: '全部歌单', path: '#2' },
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
// 我喜欢的音乐前十首歌单详情
const ids: any = reactive([])
// 获取歌曲详情
const songs: any = reactive([])
// 获得用户信息和歌单列表
const getMyMusicData = async () => {
  const res: any = await userDetail(uid)
  userDetails.push(res)
  const result: any = await userPlaylist(uid)
  userPlaylists.push(result)
  // console.log(result);

  likeLists.push(
    userPlaylists[0].playlist.shift()
  )
  let likeRes: any = await likeList(uid)
  likeRes = likeRes.ids
  // console.log(likeRes);

  likeRes = likeRes.slice(0, 10)
  // console.log(likeRes);

  ids.push([...likeRes])
  // console.log(ids);
  const songRes: any = await songDetail(ids.join())
  // console.log(songRes.songs);
  // 过滤出需要用的数据
  const song = songRes.songs.map((item: any,) => {
    return { al: item.al, name: item.name, id: item.id, ar: item.ar, dt: item.dt }

  })
  // console.log(song);
  songs.push(...song)
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

// 过滤歌手名字
const filtersinger = (item: any) => {
  const singer = toRaw(item)
  // console.log(...singer);
  const newSinger = [...singer]

  if (singer.length > 1) {
    // const s.map(item=>`${item.name}/`)
    const newSingers = newSinger.map(item => `${item.name} /`)
    newSingers.slice(0, newSingers.length - 1)

    return newSingers.slice(0, newSingers.length - 1).join(' ') + ' ' + newSinger.pop().name
  } else {
    return newSinger[0].name
  }
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
    // flex-direction: column;
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
  display: flex;

  .likeList-coverImg {
    width: 50%;
    padding: 10px;
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 480px) {
      width: 100% !important;
    }

    .coverImg {
      display: block;
      width: 100%;
      border-radius: 14px;
      cursor: pointer;


    }
  }

  .likeList-detail {
    padding: 20px 20px 0 20px;
    display: flex;
    flex-direction: column;

    span {
      font-size: 25px;
      margin-bottom: 20px;
    }
  }

  ul {
    width: 50%;
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