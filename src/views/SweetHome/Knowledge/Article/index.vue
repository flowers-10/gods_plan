<template>
  <div class="Article">
    <div class="Article-back">
      <svg @click="back" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5586"
        fill="currentColor">
        <path
          d="M671.968 912c-12.288 0-24.576-4.672-33.952-14.048L286.048 545.984c-18.752-18.72-18.752-49.12 0-67.872l351.968-352c18.752-18.752 49.12-18.752 67.872 0 18.752 18.72 18.752 49.12 0 67.872l-318.016 318.048 318.016 318.016c18.752 18.752 18.752 49.12 0 67.872C696.544 907.328 684.256 912 671.968 912z"
          p-id="5587"></path>
      </svg>
    </div>
    <div class="Article-container">
      <div class="Article-header">
        <div class="pattern-center no-select">
          <div class="pattern-attachment-img">
            <header class="pattern-header single-header">
              <h1> {{ articleShow.articleTitle }}</h1>
              <p class="entry-census">
                <span>发布于 {{ $filters.formatTime(articleShow.createTime) }} </span>
                <span>最后编辑于{{ $filters.formatTime(articleShow.updateTime) }} </span>
                <span>{{ articleShow.views }} 次阅读</span>
              </p>
            </header>
          </div>
        </div>
      </div>
      <md-editor previewOnly v-model="articleShow.articleContent" class="mdEditor" preview-theme="default"
        :toolbars-exclude="['github', 'pageFullscreen',
        'fullscreen',]" />
      <top-button></top-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted, ref } from "vue"
import { useRoute, useRouter } from 'vue-router'
import { getArticle, _incrementViews } from '@/api/gsApi'
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import TopButton from '@/components/TopButton/index.vue'

const route = useRoute()
const router = useRouter()

// article内容
const articleShow = reactive({
  articleContent: '',
  articleIMG: '',
  articleIntroduce: '',
  articleTitle: '',
  createTime: '',
  id: '',
  typeId: '',
  views: '',
  updateTime: ''
})
// 获得文章
const getData = async () => {
  let res: any = await getArticle({
    id: route.params.id
  })
  let result: any = res.result
  // console.log(result);
  let a: any = result[0]
  // console.log(a);

  articleShow.articleContent = a.articleContent
  articleShow.articleTitle = a.articleTitle
  articleShow.createTime = a.createTime
  articleShow.updateTime = a.updateTime
  articleShow.views = a.views
  articleShow.articleIMG = a.articleIMG

}

// 返回上一页
const back = () => {
  router.go(-1)
}

// 用户浏览次数
_incrementViews(route.params.id).then(res=>{
  // console.log(res);
})

onMounted(() => {
  getData()
})
</script>

<style lang="less" scoped>
.Article {
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  .Article-back {
    color: var(--theme-color);
    padding: 8px 0;
    width: 50%;

    @media screen and (max-width:580px) {
      width: 100%;
      padding: 8px 20px;
    }

    svg {
      cursor: pointer;
      width: 25px;
      height: 25px;
    }
  }

  .Article-container {
    width: 100%;
    overflow: auto;
    padding-bottom: 120px;

    @media screen and (max-width:580px) {
      padding-bottom: 60px;

    }
  }
}

.mdEditor {
  width: 100%;

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
  width: 100%;

  .pattern-attachment-img {
    background-image: url('../../../../assets/images/bg1.png');
    background-attachment: fixed;
    background-size: cover;
    background-position: center center;
    width: 100%;
    height: 400px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--theme-color);
    position: relative;

    @media screen and (max-width:580px) {
      height: 200px;

    }
  }

  h1 {
    @media screen and (max-width:580px) {
      font-size: 20px;
    }
  }


  img {
    height: auto;
    max-width: 100%;
  }

  .pattern-header {
    text-align: center;
    color: var(--theme-color);
    text-shadow: 2px 2px 10px var(--theme-bg-color);
    z-index: 1;
  }

  .entry-census {
    font-size: 14px;
    padding: 18px 0 0;
    line-height: 24px;
    display: flex;
    flex-direction: column;
  }
}

:deep(.md-preview) {
  width: 50%;
  margin: auto;

  @media screen and (max-width:1200px) {
    width: 80%;
    padding: 25px;
    font-size: 14px;
  }

  @media screen and (max-width:580px) {
    width: 100%;
    padding: 20px;
    font-size: 14px;
  }
}

:deep(.md-preview-wrapper) {
  overflow: hidden;
}

</style>