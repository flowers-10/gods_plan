<template>
  <div class="GodsGames">
    <!-- 手机端适配未做 -->
    <div class="cards">
      <div class="card" v-for="(item, index) in gamesList" :key="index" @click="router.push(item.path)">
        <img class="card-img" v-lazy='item.imgUrl' />
        <div class="card-detail">
          <span class="detail-name">{{ item.name }}</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter()
type gamesListType = {
  imgUrl: string
  name: string
  path: string
}
const gamesList = ref<gamesListType[]>([
  { imgUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F8513c9023e97ccd2b21d9983fc110927859671fd54d5-JZ4Uvb_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671934105&t=08e84e1ed91acb48556f7a68187d0225', name: '你画我猜', path: '/games/draw' },
  { imgUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.danji6.com%2Fuploadfile%2F2017%2F50%2Fnddarm03qaf.jpg&refer=http%3A%2F%2Fwww.danji6.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671953172&t=fb3a69a5c08ba6f501572f7db8980211', name: '斗兽棋', path: '/games/animalChecker' },
  { imgUrl: '', name: '翻翻棋', path: '/games/turnChess' }
])

</script>

<style lang="less" scoped>
.GodsGames {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 30px;

  .cards {
    background-color: transparent;
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    .card {
      display: flex;
      flex-direction: column;
      text-align: center;
      margin: 10px;
      width: 20%;
      font-size: 16px;
      background-color: var(--content-bg);
      border-radius: 14px;
      border: 1px solid var(--theme-bg-color);
      padding: 20px;
      cursor: pointer;
      transition: 0.3s ease;

      .card-detail {
        margin-top: 15px;
        display: flex;
        flex-direction: column;

        .detail-name {
          color: var(--theme-color);
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

    }
  }

}

@media (max-width:480px) {
  .card {
    width: 100% !important;
  }
}
</style>
