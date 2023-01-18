<template>
  <div class="main-container">
    <main-header :menuLink="menuLink" :menuItemsList="menuItemsList" @on-click="getTag"></main-header>
    <div class="goTop" @click="goTop">
      <svg viewBox="0 0 1025 1024" fill="currentColor">
        <path
          d="M533.204945 247.840277c-11.435995-13.314876-30.184888-13.314876-41.620883 0l-342.378861 399.573165c-11.435995 13.319992-6.434858 24.25659 11.19346 24.25659l128.001279 0c17.621155 0 31.995203 14.379165 31.995203 32.007483l0 256.048609c0 17.626271 14.378142 32.00339 32.001343 32.00339l320.002175 0c17.628318 0 31.996226-14.378142 31.996226-32.00339L704.394887 703.678539c0-17.629342 14.376095-32.007483 32.005437-32.007483l127.999232 0c17.621155 0 22.624339-10.937621 11.185273-24.25659L533.204945 247.840277z"
          p-id="3191"></path>
        <path
          d="M192.395911 159.573836l640.002303 0c35.375346 0 64.00064-28.633481 64.00064-64.011897 0-35.382509-28.625294-64.011897-64.00064-64.011897l-640.002303 0c-35.371252 0-63.99757 28.629387-63.99757 64.011897C128.398341 130.940356 157.023635 159.573836 192.395911 159.573836z"
          p-id="3192"></path>
      </svg>
    </div>
    <div class="content-section" id="playListsScrollTop">
      <Waterfall v-if="flag" :lazyload="true" class="playlists-card" :list="palyLists" :breakpoints="{
        1900: { //当屏幕宽度小于等于1200
          rowPerView: 5,
        },
        1100: { //当屏幕宽度小于等于800
          rowPerView: 4,
        },
        500: { //当屏幕宽度小于等于500
          rowPerView: 3,
        }
      }">
        <template #item="{ item }">
          <div class="playlist-card" @click="goPlayListDetail(item.id)">
            <LazyImg class="card-img" :url="item.coverImgUrl" alt="" />
            <div class="card-detail">
              <span class="detail-name">{{ item.name }}</span>
              <span class="detail-playCount">
              <svg viewBox="0 0 1024 1024">
                <path
                  d="M870.2 466.333333l-618.666667-373.28a53.333333 53.333333 0 0 0-80.866666 45.666667v746.56a53.206667 53.206667 0 0 0 80.886666 45.666667l618.666667-373.28a53.333333 53.333333 0 0 0 0-91.333334z"
                  fill="currentColor"></path>
              </svg>
              {{ item.playCount }}</span>
            </div>
          </div>
        </template>
      </Waterfall>

      <div v-if="status === false" class="loading">
        已经在玩命加载了。。。</div>
      <div v-if="status === true" class="loading">一点都没有咯!!!</div>
    </div>

  </div>

</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
// 引入工具
import { useRouter } from 'vue-router';
import { catlist, topPlaylist } from '../../../../api/api'
import { debounce } from '../../../../utils/debounce'


// 给子组件传参
const menuLink = ref<string>('Playlist Square')
const menuItemsList = ref<object[]>([])
// 路由
const router = useRouter()

// 歌单分类
const catlists = ref()

// 默认从第一条开始请求
let offset = ref<number>(0)

// 获得歌单分类
const getCatlist = async () => {
  // 获得歌单分类的数据
  const res: any = await catlist()
  // console.log(res);
  let tags: object[] = res.sub
  catlists.value = tags.map((item: any) => item.name)
  // console.log(catlists.value);
  // 渲染tag栏给子组件传参
  menuItemsList.value = catlists.value.map((item: any) => {
    return { title: item }
  })
  // 数组第一行加入'全部'这个tag
  menuItemsList.value.unshift({ title: '全部' })
  // console.log(menuItemsList.value);
}
// 歌单 ( 网友精选碟 )
const palyLists: any = ref(null)
// 此歌单的总歌单数
const total = ref<number>(0)
// 获得歌单
const getTopPlaylist = async (cat: string, offset: string | number) => {
  // 通过接口返回数据
  const res: any = await topPlaylist(cat, offset)
  // console.log(res);
  // 该歌单的条数赋值
  total.value = res.total
  // console.log(res.total);
  // 如果当前条数是0就渲染一页的数据，否则累加当前的数据渲染到页面上
  if (offset === 0) {
    palyLists.value = res.playlists
  } else {
    palyLists.value = [...palyLists.value, ...res.playlists]
  }
}
// 当前选中的tag
// 默认全部
let tags = ref('全部')
// 获得子组件传的tag值
const getTag = (tag: any) => {
  // console.log(tag);
  const playListsScrollTop: HTMLElement = document.querySelector("#playListsScrollTop") as HTMLElement
  // 每次切换tag栏都让页面回到顶部
  if (playListsScrollTop) {
    playListsScrollTop.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }
  // 通过当前的tag名字获得数据
  // 例： getTopPlaylist('流行', 0) 页面就会渲染出'流行'的数据内容
  tags.value = tag.title
  getTopPlaylist(tag.title, 0)
  // 当前开始请求的条数也归零
  offset.value = 0
}

// 路由传参跳到歌单详情
const goPlayListDetail = (id: string) => {
  // 点击后跳转到相应的歌单
  router.push({
    name: 'PlayListDetail',
    params: {
      id
    }
  })
}

// loading 状态
let status = ref<boolean>(false)
// 如果滚轮滚动到页面底部就加载新的歌单
const addPlayLists = () => {
  const playListsScroll: HTMLElement = document.querySelector("#playListsScrollTop") as HTMLElement
  // 内容可视区域的高度
  const clientHeight = playListsScroll.clientHeight
  // 内容可视区域的高度加上溢出（滚动）的距离
  const scrollHeight = playListsScroll.scrollHeight
  // console.log(clientHeight+scrollTop);
  // console.log(scrollHeight);
  // 内容可视区域的高度+内容可视区域的高度加上溢出（滚动）的距离=滚轮高度时说明到了底部
  // 滚轮的高度
  let scrollTop = playListsScroll.scrollTop
  // 当滚轮滚动到了底部就加载下一页的内容，如果加载的条数已经超过总条数了，就显示'一点都没有咯'
  if (clientHeight + scrollTop > scrollHeight - 100) {
    // console.log('你已经到底了');
    offset.value += 60
    // console.log(offset.value);
    if (offset.value < total.value) {
      getTopPlaylist(tags.value, offset.value)
      status.value = false
    } else {
      status.value = true
    }
  }
}
// 回到顶部
const goTop = () => {
  const playListsScrollTop: HTMLElement = document.querySelector("#playListsScrollTop") as HTMLElement
  if (playListsScrollTop) {
    playListsScrollTop.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }
}
// 控制瀑布流组件渲染
const flag = ref<boolean>(true)

onMounted(() => {
  // 获取歌单分类
  getCatlist()
  // 获取歌单
  getTopPlaylist('全部', 0)
  const playListsScroll: HTMLElement = document.querySelector("#playListsScrollTop") as HTMLElement
  // 滚动到底部时防抖
  playListsScroll.addEventListener('scroll',
    debounce(addPlayLists, 1000)
  )
  nextTick(() => {
    window.addEventListener('resize', () => {
      flag.value = false
      setTimeout(() => {
        flag.value = true
      }, 100);
    })
  })
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
  width: 100%;
  overflow-y: auto;

  &-title {
    color: var(--content-title-color);
    margin-bottom: 14px;
  }

  @media screen and (max-width: 565px) {
    padding: 10px 10px 90px;
  }
}


.playlists-card {
  overflow-y: auto;
  width: calc(100% + 20px);
  background-color: transparent;

  .playlist-card {
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
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .detail-playCount {
        color: var(--content-title-color);
        font-size: 12px;
        margin-top: 5px;
        display: flex;
        align-items: center;
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
      font-size: 14px;
    }

    @media screen and (max-width: 565px) {
      font-size: 12px;
    }

  }
}


.loading {
  color: var(--theme-color);
  font-size: 20px;
  margin: 20px auto;
  text-align: center;
}

.goTop {
  position: fixed;
  bottom: 90px;
  right: 8px;
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