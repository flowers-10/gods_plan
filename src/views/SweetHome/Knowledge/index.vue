<template>
  <div class="Konwledge">
    <div class="konwledege-Tab">
      <div @click="ClickTab(0)">全部</div>
      <div v-for="(item, index) in _articleType" :key="index" @click="ClickTab(item.t_id)">{{
          item.articleType
      }}</div>
    </div>
    <div class="content-section">
      <div class="article">
        <div class="article-card" v-for="(item, index) in articleShow" :class="index % 2 === 0 ? 'row-reverse' : ''">
          <img class="card-img" :src="item.articleIMG !== '' ? item.articleIMG : ''"
            alt="">
          <div class="card-detail">
            <span class="detail-title">{{ item.articleTitle }}</span>
            <span class="detail-date">发布于 {{ $filters.formatTime(item.creatTime) }}</span>
            <span class="detail-introduce">{{ item.articleIntroduce }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import 'md-editor-v3/lib/style.css';
import { getArticle, getArticleType } from '@/api/gsApi'


// 文章展示
const articleShow = ref()
// 分类标签
const _articleType = ref()
// 获得文章
const getData = async () => {
  let res: any = await getArticle({
    limit: 0,
    offset: 30,
  })
  let result = res.result
  console.log(result);
  articleShow.value = result

  let TypeRes: any = await getArticleType()
  console.log(TypeRes);
  _articleType.value = TypeRes.message
}
// 点击tab栏
const ClickTab = async (id: string | number) => {
  console.log(id);
  if (id == 0) {
    let res: any = await getArticle({
      limit: 0,
      offset: 30,
    })
    let result = res.result
    console.log(result);
    articleShow.value = result
  } else {
    let res: any = await getArticle({
      limit: 0,
      offset: 30,
      typeId: id
    })
    let result = res.result
    console.log(result);
    articleShow.value = result
  }
}
onMounted(() => {
  getData()
})
</script>

<style lang="less" scoped>
.Konwledge {
  width: 100%;
  // height: 80vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  .konwledege-Tab {
    display: flex;
    align-items: center;
    justify-content: center;

    div {
      margin: 10px;
      padding: 0 20px;
      border: 1px solid black;
    }
  }
}

.content-section {
  padding: 20px 40px 0;
  margin-top: 30px;
  display: flex;
  width: 100%;


  .row-reverse {
    flex-direction: row-reverse;
  }

  .article {
    width: 100%;

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
        }

        .card-detail {
          width: 100%;
          padding: 20px 10px;
          text-align: justify;
        }
      }
    }


  }


}
</style>
