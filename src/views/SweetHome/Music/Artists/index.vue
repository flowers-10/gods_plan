<template>
  <div class="main-container">
    <main-header :menuLink="menuLink" :menuItemsList="menuItemsList" @on-click="getTag"></main-header>
    <div class="goTop">
      <svg viewBox="0 0 1025 1024" fill="currentColor">
        <path
          d="M533.204945 247.840277c-11.435995-13.314876-30.184888-13.314876-41.620883 0l-342.378861 399.573165c-11.435995 13.319992-6.434858 24.25659 11.19346 24.25659l128.001279 0c17.621155 0 31.995203 14.379165 31.995203 32.007483l0 256.048609c0 17.626271 14.378142 32.00339 32.001343 32.00339l320.002175 0c17.628318 0 31.996226-14.378142 31.996226-32.00339L704.394887 703.678539c0-17.629342 14.376095-32.007483 32.005437-32.007483l127.999232 0c17.621155 0 22.624339-10.937621 11.185273-24.25659L533.204945 247.840277z"
          p-id="3191"></path>
        <path
          d="M192.395911 159.573836l640.002303 0c35.375346 0 64.00064-28.633481 64.00064-64.011897 0-35.382509-28.625294-64.011897-64.00064-64.011897l-640.002303 0c-35.371252 0-63.99757 28.629387-63.99757 64.011897C128.398341 130.940356 157.023635 159.573836 192.395911 159.573836z"
          p-id="3192"></path>
      </svg>
    </div>
    <div class="content-section" id="artistWrap">
      <div class="artists-card">
        <div class="artist-card" v-for="(item, index) in artistList" @click="goArtistPage(item.id)">
          <img class="card-img" :src="item.picUrl" alt="">
          <div class="card-detail">
            <span class="detail-name"> {{ item.name }} </span>
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
import { topListArtist } from '../../../../api/api'

const router = useRouter()


// 给子组件传参
const menuLink = ref<string>('Artist')
const menuItemsList = ref<object[]>([
  { title: '华语', id: 1 },
  { title: '欧美', id: 2 },
  { title: '韩国', id: 3 },
  { title: '日本', id: 4 },
])

// 渲染歌手数据
const artistList = ref<any>([])

// 默认获取歌手数据
const getDefaultArtistList = async () => {
  let res: any = await topListArtist()
  artistList.value = res.list.artists
}

// 获得子组件传递的值
const getTag = async (tag: any) => {
  // console.log(tag);
  const HTMLScroll: HTMLElement = document.querySelector("#artistWrap") as HTMLElement
  if (HTMLScroll) {
    HTMLScroll.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }
  // 通过当前的tag名字获得数据
  let res: any = await topListArtist(tag.id)
  artistList.value = res.list.artists
  // console.log(artistList.value);
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


onMounted(() => {
  getDefaultArtistList()
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


}


.artists-card {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: calc(100% + 20px);

  .artist-card {
    display: flex;
    flex-direction: column;
    width: calc(33.3% - 20px);
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
      width: calc(50% - 20px);

      &:last-child {
        margin-left: 0px;
      }
    }

    @media screen and (max-width: 565px) {
      width: calc(100% - 20px);
    }

  }
}


.goTop {
  position: fixed;
  bottom: 90px;
  right: 20px;
  // right: 10px;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
    color: var(--theme-color);
  }
}

svg {
  width: 12px;
  margin-right: 4px;
}
</style>