<template>
  <div class="Article">
    <div class="Article-back">
      <svg @click="back" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5586" fill="currentColor"><path d="M671.968 912c-12.288 0-24.576-4.672-33.952-14.048L286.048 545.984c-18.752-18.72-18.752-49.12 0-67.872l351.968-352c18.752-18.752 49.12-18.752 67.872 0 18.752 18.72 18.752 49.12 0 67.872l-318.016 318.048 318.016 318.016c18.752 18.752 18.752 49.12 0 67.872C696.544 907.328 684.256 912 671.968 912z" p-id="5587"></path></svg>
    </div>
    <div class="Article-container">
      <div class="Article-header">
        <span>
          articleTitle：{{ articleShow.articleTitle }}
        </span>
        <br>
       createTime：{{ articleShow.createTime }}
        <br>
       updateTime：{{ articleShow.updateTime }}
        <br>
       views：{{ articleShow.views }}

      </div>
      <md-editor previewOnly v-model="articleShow.articleContent" class="mdEditor" preview-theme="default"
        :toolbars-exclude="['github', 'pageFullscreen',
        'fullscreen',]" />
      <top-button></top-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from "vue"
import { useRoute, useRouter } from 'vue-router'
import { getArticle } from '@/api/gsApi'
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
  console.log(result);
  let a: any = result[0]
  console.log(a);

  articleShow.articleContent = a.articleContent
  articleShow.articleTitle = a.articleTitle
  articleShow.createTime = a.createTime
  articleShow.updateTime = a.updateTime
  articleShow.views = a.views
}

const back = () =>{
  router.go(-1)
}

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
    padding: 15px 0;
    width: 50%;
    @media screen and (max-width:580px) {
    width: 100%;
    padding: 20px;
  }
    svg {
      cursor: pointer;
      width: 25px;
      height: 25px;
    }
  }
  .Article-header {
    color: var(--theme-color);
    height: 200px;
    width: 100%;
    text-align: center;
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


/deep/ .md-preview {
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

/deep/ .md-preview-wrapper {
  overflow: hidden;
}
</style>