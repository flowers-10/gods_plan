<template>
  <div class="Konwledge">
    <md-editor v-model="articleContent" theme="light" class="mdEditor" preview-only />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { getArticle } from '@/api/gsApi'
// 文章内容
const articleContent = ref<string>('')
// 
const getarticleContent = async() => {
  let res:any = await getArticle()
  
  let result = res.result
  console.log(result);
  
  articleContent.value = result[0].articleContent
}
onMounted(()=>{
  getarticleContent()
})
</script>

<style lang="less" scoped>
.Konwledge {
  width: 100%;
  // height: 80vh;
  overflow: auto;
}

.mdEditor {
  width: 50%;
  // height: 100%;
}
</style>
