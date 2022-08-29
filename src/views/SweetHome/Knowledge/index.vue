<template>
  <div class="Konwledge">
    <main-header menuLink="Tag" :menuItemsList="menuItemsList" @on-click="getTag"></main-header>
    <div class="content-wrappers" id="scrollId">
      <div class="pattern-center no-select">
        <div class="pattern-attachment-img">
        </div>
        <header class="pattern-header">
          <h1 class="cat-title">标签：
            {{ tags.title }}
          </h1>
        </header>
      </div>
      <div class="content-section">
        <div class="article">
          <div class="article-card wow animate__fadeInUp" v-for="(item, index) in articleShow" :key="index"
            :class="index % 2 === 0 ? 'row-reverse' : ''" @click="toArticle(item.id)">
            <img v-if="item.articleIMG !==''" class="card-img" :src="item.articleIMG" alt="">
            <img v-else class="card-img" :src="imgUrl()" alt="">
            <div class="card-detail">
              <span class="detail-title">{{ item.articleTitle }}</span>
              <span class="detail-date">发布于 {{ $filters.formatTime(item.createTime) }}</span>
              <span class="detail-introduce">{{ item.articleIntroduce }}</span>
            </div>
          </div>
          <div v-if="!status" class="under-tips">没有更多文章了！</div>
          <div v-else class="under-tips">正在加载中~</div>
        </div>
      </div>
      <top-button></top-button>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import 'md-editor-v3/lib/style.css';
import { getArticle, getArticleType, _getArticleTotal } from '@/api/gsApi'
import { useRouter } from 'vue-router';
import { debounce } from '@/utils/debounce'
import TopButton from '../../../components/TopButton/index.vue'

const router = useRouter()

// 文章展示
const articleShow = ref()
// 显示分类标签
type _menuItem = {
  title: string,
  id: string | number
}
const menuItemsList = ref<_menuItem[]>([])

// 文章条数
let offset = ref<number>(10)
// 起始条数
let limit = ref<number>(0)
// 文章总条数
const total = ref<number>(0)
// 封装请求文章函数
const _getArticle = async (limit: number, offset: number, typeId: number) => {
  let res: any = await getArticle({
    limit: limit,
    offset: offset,
    typeId: typeId
  })
  let result = res.result
  // console.log(res);
  if (offset > 10) {
    articleShow.value = [...articleShow.value, ...result]
  } else {
    articleShow.value = result
  }
}


// 获得文章
const getData = async () => {
  _getArticle(0, 10, 0)
  let TypeRes: any = await getArticleType()
  // console.log(TypeRes);
  menuItemsList.value = TypeRes.message.map((item: any) => {
    return { title: item.articleType, id: item.t_id }
  })
  menuItemsList.value.unshift({ title: '全部', id: 0 })

  let a: any = await _getArticleTotal({ typeId: 0 })
  total.value = a.total
  // console.log(total.value);
}

// 当前选中的tag
// 默认全部
let tags = ref({
  title: '全部',
  id: 0
})
// 获得子组件传的tag值
const getTag = async (tag: any) => {
  // console.log(tag);
  const HTMLScroll: HTMLElement = document.querySelector("#scrollId") as HTMLElement
  if (HTMLScroll) {
    HTMLScroll.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }
  // 通过当前的tag名字获得数据
  tags.value = tag
  _getArticle(0, 10, tag.id)
  offset.value = 10
  limit.value = 0
}
// 点击文章
const toArticle = (id: string | number) => {
  // console.log(id);
  router.push({
    name: 'Article',
    params: {
      id: id
    }
  })
}

// loading 状态
let status = ref<boolean>(false)
// 如果滚轮滚动到页面底部就加载新的内容
const addNewContent = () => {
  const BarScroll: HTMLElement = document.querySelector("#scrollId") as HTMLElement
  const clientHeight = BarScroll.clientHeight
  const scrollHeight = BarScroll.scrollHeight
  let scrollTop = BarScroll.scrollTop
  if (clientHeight + scrollTop > scrollHeight - 100) {
    // console.log('你已经到底了');
    offset.value += 10
    limit.value += 10
    if (offset.value < total.value) {
      _getArticle(limit.value, offset.value, tags.value.id)
      status.value = true
    } else {
      status.value = false
    }
  }
}

// 默认图片
const imgUrl = () => {
  return new URL('../../../assets/SPY×FAMILY/1.jpg', import.meta.url).href
}


onMounted(() => {
  getData()
  const BarScroll: HTMLElement = document.querySelector("#scrollId") as HTMLElement
  BarScroll.addEventListener('scroll', debounce(addNewContent, 1000))
})
</script>

<style lang="less" scoped>
.Konwledge {
  width: 100vw;
  position: relative;
  overflow: hidden;

  &-Tab {
    position: relative;
    overflow-x: auto;

    span {
      margin: 20px 10px;
      padding: 0 20px;
      border: 1px solid black;
      color: var(--theme-color);
    }
  }
}

.content-wrappers {
  overflow: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  color: var(--theme-color);
  height: 100%;
  min-height: 100vh;
  // min-height: 100vh;
  background-color: var(--theme-bg-color);

  .content-section {
    display: flex;
    width: 100%;
    padding: 20px 40px;

    .row-reverse {
      flex-direction: row-reverse;
    }

    .article {
      width: 100%;
      height: 100%;

      &:last-child {
        margin-bottom: 100px;
      }

      .article-card {
        display: flex;
        max-width: 800px;
        max-height: 300px;
        margin: 40px auto;
        font-size: 16px;
        background-color: var(--content-bg);
        border-radius: 14px;
        border: 1px solid var(--theme-bg-color);
        cursor: pointer;
        transition: 0.3s ease;
        overflow: hidden;
        box-shadow: 0 1px 20px -6px rgb(0 0 0 / 50%);

        .card-img {
          width: 55%;
          object-fit: cover;
          overflow: hidden;

        }

        .card-detail {
          width: 45%;
          padding: 20px 30px;
          display: flex;
          flex-direction: column;

          .detail-title {
            margin-top: 10px;
            color: var(--theme-color);
            font-size: 18px;
            overflow: hidden; //溢出内容隐藏
            text-overflow: ellipsis; //文本溢出部分用省略号表示
            display: -webkit-box; //特别显示模式
            -webkit-line-clamp: 2; //行数
            line-clamp: 2;
            -webkit-box-orient: vertical; //盒子中内容竖直排列
          }

          .detail-date {
            color: var(--content-title-color);
            font-size: 12px;
            margin: 10px 0 16px;
          }

          .detail-introduce {
            color: var(--theme-color);
            font-size: 14px;
            text-align: justify;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden; //溢出内容隐藏
            text-overflow: ellipsis; //文本溢出部分用省略号表示
            display: -webkit-box; //特别显示模式
            -webkit-line-clamp: 7; //行数
            -webkit-box-orient: vertical; //盒子中内容竖直排列
          }
        }

        &:hover {
          transform: scale(1.02);
          background-color: var(--theme-bg-color);
          box-shadow: 0 1px 20px -6px rgb(0 0 0 / 80%);
        }

        @media screen and (max-width:580px) {
          flex-direction: column;
          max-height: 500px;
          box-shadow: none;
          border: none;
          background-color: transparent;
          margin: 20px auto;

          .card-img {
            width: 100%;
            border-radius: 10px;
            max-height: 205px;
          }

          .card-detail {
            width: 100%;
            padding: 20px 10px;
            text-align: justify;
          }
        }
      }

      .under-tips {
        margin: 40px;
        text-align: center;
        font-size: 20px;
        color: var(--theme-color);
        user-select: none;
      }
    }
  }
}


.no-select {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.pattern-center {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;


  .pattern-attachment-img {
    background-image: url('../../../assets/images/bg1.png');
    background-attachment: fixed;
    // background-repeat: no-repeat;
    background-size: cover;
    background-position: center bottom;
    // background-origin: border-box;
    width: 100%;
    height: 300px;

    @media screen and (max-width:580px) {
      height: 200px;

    }
  }

  img {
    height: auto;
    max-width: 100%;
  }
}

.pattern-center header.pattern-header {
  position: absolute;
  top: 45%;
  left: 0;
  right: 0;
  text-align: center;
  color: var(--theme-color);
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
  z-index: 1;

  @media screen and (max-width:580px) {
    top: 35%;

  }
}

.pattern-center h1.cat-title,
.pattern-center h1.entry-title {
  color: var(--theme-color);
  font-size: 40px;
  font-weight: 500;
  width: 80%;
  margin: auto;
  padding: 0;
  border: 0;
}

/deep/ .main-header .header-menu {
  margin: auto;
  position: relative;
  width: auto;
}
</style>
