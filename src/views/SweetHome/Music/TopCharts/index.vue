<template>
  <div class="main-container">
    <main-header :menuLink="menuLink" :menuItemsList="menuItemsList"></main-header>

    <div class="content-section">
      <div class="playlists-card">
        <div class="playlist-card" v-for="(item, index) in TopChartsList" @click="goPlayListDetail(item.id)">
          <img class="card-img" v-lazy="item.coverImgUrl" alt="">
          <div class="card-detail">
            <span class="detail-name">{{ item.name }}</span>
            <span class="detail-renew">{{ item.updateFrequency }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
// 引入工具
import { useRouter } from 'vue-router';
import { useStore } from '@/stores'// pinia
import { toplistDetail } from '@/api/api'
// 路由
const router = useRouter()
// pinia
const store = useStore()

// 给子组件传参
const menuLink = ref<string>('Top Charts')
const menuItemsList = ref([
  { title: '排行榜', path: '#1' },
])

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

const TopChartsList = ref()
// 获得排行榜
const getTopCharts = async () => {
  const res: any = await toplistDetail()
  // console.log(res);
  TopChartsList.value = res.list
  // console.log(TopChartsList.value);
}

onMounted(() => {
  getTopCharts()
})

</script>

<style lang="less" scoped>
.main-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}


.content-section {
  padding: 20px 40px 100px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: auto;
  overflow-x: hidden;

  &-title {
    color: var(--content-title-color);
    margin-bottom: 14px;
  }

  @media screen and (max-width: 565px) {
    padding: 10px 10px 90px;
  }

}


.playlists-card {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: calc(100% + 20px);

  .playlist-card {
    display: flex;
    flex-direction: column;
    width: calc(20% - 20px);
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
      width: calc(25% - 10px);
      font-size: 14px;
      margin-right: 10px;
      padding: 12px;

      &:last-child {
        margin-left: 0px;
      }
    }

    @media screen and (max-width: 565px) {
      font-size: 12px;
      width: calc(33.33% - 12px);
      margin-right: 5px;
      padding: 8px;

      .card-detail {
        margin-top: 5px;
      }
    }

  }
}
</style>