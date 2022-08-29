<template>
  <div class="main-container">
    <div class="content-wrapper">
      <div class="content-section">
        <vue3VideoPlay v-bind="options" class="video-hw" />
        <div class="video-info">
          <div class="title">
            {{ MVDetail.artistName }} - {{ MVDetail.name }}
          </div>
          <div class="info">
            {{ $filters.keepTwoDecimalFull(MVDetail.playCount) }}Views · {{ MVDetail.publishTime }}
          </div>
        </div>
      </div>
      <div class="content-section">
        <div class="content-section-title">更多MV
        </div>
        <div class="cards">
          <div class="card" v-for="(item, index) in simiMv" :key="index">
            <img class="card-img" :src="item.cover" alt="">
            <div class="card-detail">
              <span class="detail-name"> {{ item.name }} </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, reactive } from 'vue'
import "vue3-video-play/dist/style.css";
import vue3VideoPlay from "vue3-video-play";
// 引入工具
import { useRoute } from 'vue-router';
import { getMVUrl, getMVDetail, getSimiMV } from '../../../../api/api'

// 使用路由
const route = useRoute()

// 获得歌手id
let idNumber = computed(() => {
  return route.params.id
}).value

// mv详情
const MVDetail: any = ref([])

// mv配置项
const options = reactive({
  width: '100%',
  height: '100%',
  color: "#409eff", //主题色
  title: "", //视频名称
  src: "", //视频源
  muted: false, //静音
  webFullScreen: false,
  speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
  autoPlay: false, //自动播放
  loop: false, //循环播放
  mirror: false, //镜像画面
  ligthOff: false, //关灯模式
  volume: 0, //默认音量大小
  control: true, //是否显示控制
  controlBtns: [
    "audioTrack",
    "quality",
    "speedRate",
    "volume",
    "setting",
    "pip",
    "pageFullScreen",
    "fullScreen",
  ], //显示所有按钮,
});

// 相似mv
const simiMv: any = ref([])

// 请求页面数据
const getData = () => {
  let _MVUrl: any = getMVUrl(idNumber)
  let _MVDetail: any = getMVDetail(idNumber)
  let _SimiMV: any = getSimiMV(idNumber)
  Promise.all([_MVUrl, _MVDetail, _SimiMV]).then(([res, resDetail, resSimi]) => {
    if (res.code == 200) {
      options.src = res.data.url
    }
    if (resDetail.code == 200) {
      MVDetail.value = resDetail.data
    }
    if (resSimi.code == 200) {
      // console.log(resSimi);
      simiMv.value = resSimi.mvs
    }
  })
}

onMounted(() => {
  getData()
})
</script>

<style lang="less" scoped>
/deep/ .d-player-wrap {
  border-radius: 16px;
}

.main-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
  width: 100%;

  .content-wrapper {
    display: flex;
    flex-direction: column;
    color: var(--theme-color);
    height: 100%;
    overflow: auto;
    background-color: var(--theme-bg-color);
    background-size: 100% 100%;
    background-position: center center;
  }

  .content-section {
    padding: 30px 180px 20px;
    display: flex;
    flex-direction: column;
    width: 100%;
    &:last-child {
      padding-bottom: 100px;
    }
    &-title {
      color: var(--content-title-color);
      margin-bottom: 14px;
      font-size: 20px;
      font-weight: 600;
    }

    @media screen and (max-width:1280px) {
      padding: 50px 40px 20px;

    }

    @media screen and (max-width:580px) {
      padding: 10px;
    }
  }
}

.video-info {
  margin-top: 12px;
  color: var(--theme-color);

  .title {
    font-size: 24px;
    font-weight: 600;
  }

  .info {
    font-size: 12px;
    margin-top: 12px;
    opacity: 0.68;
  }
}

.cards {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: calc(100% + 20px);

  .card {
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
</style>