<template>
  <div>
    开发中。。。
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted } from "vue"
onMounted(() => {
  window.L2Dwidget.init({
    pluginRootPath: '../../assets/live2dw/',
    pluginJsPath: 'lib/',
    pluginModelPath: 'live2d-widget-model-haru_2/assets/', //中间这个haru_2就是你的老婆,想换个老婆,换这个就可以了
    tagMode: false,
    debug: false,
    model: { jsonPath: '../src/assets/live2dw/live2d-widget-model-haru_1/assets/haru01.model.json' },
    display: { position: 'right', width: 500, height: 800 },  //调整大小,和位置
    mobile: { show: true },   //要不要盯着你的鼠标看
    log: false,
  })
})
onUnmounted(() => {
  // console.log('组件销毁');
  
  let DomLiv2d = document.querySelector('#live2d-widget')
  if (DomLiv2d) {
    DomLiv2d.remove();
  }
})


</script>

<style lang="less" scoped>

</style>