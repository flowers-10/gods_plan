<template>
  <main-container :menuLink="menuLink" :menuItemsList="menuItemsList">
    <template #default>
      <content-section v-for="(item, index) in menuItemsList" :key="index" :title="item.title"
        :slotName="item.slotName">
        <template #[item.slotName]>
          <div v-if="index === 0" class="ArtistsList">
            <div class="ArtistsList-card" v-for="(item, index) in topArtistsList" :key="index" @click="goArtistPage(item.id)">
              <img class="card-img" :src="item.picUrl" alt="">
              <div class="card-detail">
                <span class="detail-name">{{ item.name }}</span>
              </div>
            </div>
          </div>
          <div v-if="index === 1" class="recommendList">
            <div class="recommendList-card" v-for="(item, index) in albumNewestList" :key="index">
              <img class="card-img" :src="item.picUrl" alt="">
              <div class="card-detail">
                <span class="detail-name">{{ item.name }}</span>
              </div>
            </div>
          </div>

          <div v-if="index === 2" class="recommendList">
            <div class="recommendList-card" v-for="(item, index) in djRecommendList" :key="index">
              <img class="card-img" :src="item.picUrl" alt="">
              <div class="card-detail">
                <span class="detail-name">{{ item.name }}</span>
              </div>
            </div>
          </div>

          <div v-if="index === 3" class="mvList">
            <div class="mvList-card" v-for="(item, index) in personalizedMvList" :key="index" @click="goMvPage(item.id)">
              <img class="card-img" :src="item.picUrl" alt="">
              <div class="card-detail">
                <span class="detail-name">{{ item.name }}</span>
              </div>
            </div>
          </div>
        </template>
      </content-section>
    </template>
  </main-container>
</template>

<script setup lang="ts">
import { albumNewest, djRecommend, personalizedMv, topArtists } from '@/api/api'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from '@/stores'// pinia
import MainContainer from '@/components/MainContainer/index.vue'

// 路由
const router = useRouter()
// pinia
const store = useStore()

// 给子组件传参
const menuLink = ref<string>('My Home')
type menu = {
  title: string, path: string, slotName: string
}
const menuItemsList: menu[] = [
  // { title: '推荐歌单', slotName: 'playlist', path: '' },
  // { title: 'For You', slotName: 'ForYou', path: '' },
  { title: '推荐艺人', slotName: 'artist', path: '' },
  { title: '新专速递', slotName: 'newAlbum', path: '' },
  { title: '推荐电台', slotName: 'dj', path: '' },
  { title: '推荐mv', slotName: 'mv', path: '' },

]

// 推荐歌单
// const recommendList = ref()
// 新专速递
const albumNewestList = ref()
// 推荐电台
const djRecommendList = ref()
// 推荐mv
const personalizedMvList = ref()
// 推荐艺人
const topArtistsList = ref()
// 获得首页数据
const getHomePage = async () => {
  // 获得推荐歌单
  // let res: any = await recommendResource()
  // if (res) { recommendList.value = res.recommend }
  // 获得新专速递
  let albumRes: any = await albumNewest()
  albumNewestList.value = albumRes.albums.slice(0, 8)
  // console.log(albumRes.albums);
  // 推荐电台
  let djRes: any = await djRecommend()
  djRecommendList.value = djRes.djRadios.slice(0, 8)
  // console.log(djRes.djRadios);
  // 推荐mv
  let mvRes: any = await personalizedMv()
  personalizedMvList.value = mvRes.result
  // console.log(mvRes.result);
  // 推荐艺人
  let artistsRes: any = await topArtists()
  topArtistsList.value = artistsRes.artists.slice(0, 6)
  // console.log(artistsRes.artistsRes);

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

// 点击前往歌手详情
const goArtistPage = (id:number) => {
  console.log(id);
  router.push({
    name:'Artist',
    params:{
      id
    }
  })
}

// 前往mv
const goMvPage = (id:number) => {
    console.log(id);
    router.push({
        name: 'MV',
        params: {
            id
        }
    })
}


onMounted(() => {
  getHomePage()
})
</script>

<sytle lang="less" scoepd>
.recommendList {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: calc(100% + 20px);

  .recommendList-card {
    display: flex;
    flex-direction: column;
    width: calc(25% - 20px);
    font-size: 16px;
    background-color: var(--content-bg);
    border-radius: 14px;
    border: 1px solid var(--theme-bg-color);
    padding: 20px;
    cursor: pointer;
    transition: 0.3s ease;
    margin: 0 20px 20px 0;

    .card-detail {
      margin-top: 15px;
      display: flex;
      flex-direction: column;

      .detail-name {
        color: var(--theme-color);
      }

      .detail-renew {
        color: var(--content-title-color);
        font-size: 12px;
        margin-top: 5px;
      }
    }

    .card-img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
      margin-right: 15px;
    }

    &:hover {
      transform: scale(1.02);
      background-color: var(--theme-bg-color);
    }

    @media screen and (max-width: 1110px) {
      width: calc(33.333% - 20px);
      font-size: 12px;

      &:last-child {
        margin-left: 0px;
      }
    }

    @media screen and (max-width: 565px) {
      width: calc(50% - 20px);
      font-size: 10px;
    }

  }
}

.mvList {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: calc(100% + 20px);

  .mvList-card {
    display: flex;
    flex-direction: column;
    width: calc(50% - 20px);
    font-size: 16px;
    background-color: var(--content-bg);
    border-radius: 14px;
    border: 1px solid var(--theme-bg-color);
    padding: 20px;
    cursor: pointer;
    transition: 0.3s ease;
    margin: 0 20px 20px 0;

    .card-detail {
      margin-top: 15px;
      display: flex;
      flex-direction: column;

      .detail-name {
        color: var(--theme-color);
      }

      .detail-renew {
        color: var(--content-title-color);
        font-size: 12px;
        margin-top: 5px;
      }
    }

    .card-img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
      margin-right: 15px;
    }

    &:hover {
      transform: scale(1.02);
      background-color: var(--theme-bg-color);
    }

    @media screen and (max-width: 1110px) {
      width: calc(33.333% - 20px);
      font-size: 12px;

      &:last-child {
        margin-left: 0px;
      }
    }

    @media screen and (max-width: 565px) {
      width: calc(50% - 20px);
      font-size: 10px;
    }

  }
}

.ArtistsList {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: calc(100% + 20px);

  .ArtistsList-card {
    display: flex;
    flex-direction: column;
    width: calc(16.66667% - 20px);
    aspect-ratio: 1/1;
    font-size: 16px;
    border-radius: 14px;
    padding: 20px;
    cursor: pointer;
    transition: 0.3s ease;
    margin: 0 20px 20px 0;
    text-align: center;

    .card-detail {
      margin-top: 15px;
      display: flex;
      flex-direction: column;

      .detail-name {
        color: var(--theme-color);
      }

      .detail-renew {
        color: var(--content-title-color);
        font-size: 12px;
        margin-top: 5px;
      }
    }

    .card-img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      margin-right: 15px;
    }

    &:hover {
      transform: scale(1.02);
      background-color: var(--theme-bg-color);
    }

    @media screen and (max-width: 1110px) {
      width: calc(33.333% - 20px);
      font-size: 12px;

      &:last-child {
        margin-left: 0px;
      }
    }

    @media screen and (max-width: 565px) {
      width: calc(50% - 20px);
      font-size: 10px;
    }

  }
}

.ForYou {
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;

  .topImg {
    position: absolute;
    bottom: 0;
    animation: imgScroll linear 15s infinite;
  }

  .botImg {
    position: absolute;
    bottom: 0;
    animation: imgScroll2 linear 15s infinite;

  }

  @keyframes imgScroll {
    0% {
      transform: translateY(0);
    }

    100% {
      transform: translateY(100%);
    }
  }

  @keyframes imgScroll2 {
    0% {
      transform: translateY(-100%);
    }

    100% {
      transform: translateY(0);
    }
  }
}
</sytle>