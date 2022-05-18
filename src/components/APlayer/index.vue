<template>
  <div class="myAplayer">
    <div ref="playerRef"></div>
  </div>
</template>

<script lang="ts" setup>
import APlayer from 'APlayer';
import 'APlayer/dist/APlayer.min.css';
import type { PropType } from '@vue/runtime-core';
import { nextTick, onMounted, ref } from 'vue'
const playerRef:any = ref()

const props = defineProps({
  // 开启吸底模式
  fixed: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  // 开启迷你模式
  mini: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  // 音频自动播放
  autoplay: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  // 主题色
  theme: {
    type: String as PropType<string>,
    default: 'rgba(255,255,255,0.2)'
  },
  // 音频循环播放
  loop: {
    type: String as PropType<'all' | 'one' | 'none'>,
    default: 'all'
  },
  // 音频循环顺序
  order: {
    type: String as PropType<'list' | 'random'>,
    default: 'list'
  },
  // 预加载
  preload: {
    type: String as PropType<'auto' | 'metadata' | 'none'>,
    default: 'auto'
  },
  // 默认音量
  volume: {
    type: Number as PropType<number>,
    default: 0.7,
    validator: (value: Number) => {
      return value >= 0 && value <= 1;
    }
  },
  // 歌曲服务器(netease-网易云, tencent-qq音乐, kugou-酷狗, xiami-小米音乐, baidu-百度音乐)
  songServer: {
    type: String as PropType<'netease' | 'tencent' | 'kugou' | 'xiami' | 'baidu'>,
    default: 'netease'
  },
  // 播放类型(song-歌曲, playlist-播放列表, album-专辑, search-搜索, artist-艺术家)
  songType: {
    type: String as PropType<string>,
    default: 'playlist'
  },
  // // 歌的id
  // songId: {
  //   type: String as PropType<string>,
  //   default: '19723756'
  // },
  // 互斥，阻止多个播放器同时播放，当前播放器播放时暂停其他播放器
  mutex: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  // 传递歌词方式
  lrcType: {
    type: Number as PropType<number>,
    default: 1
  },
  // 列表是否默认折叠
  listFolded: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  // 列表最大高度
  listMaxHeight: {
    type: String as PropType<string>,
    default: '200px'
  },
  // 存储播放器设置的 localStorage key
  storageName: {
    type: String as PropType<string>,
    default: 'aplayer-setting'
  },
  audioList: {
    type: Array,
  }
})


// 初始化
onMounted(() => {
  nextTick(() => {
    new APlayer({
      container: playerRef.value,
      fixed: props.fixed,
      mini: props.mini,
      autoplay: props.autoplay,
      theme: props.theme,
      loop: props.loop,
      order: props.order,
      preload: props.preload,
      volume: props.volume,
      mutex: props.mutex,
      lrcType: props.lrcType,
      listFolded: props.listFolded,
      listMaxHeight: props.listMaxHeight,
      storageName: props.storageName,
      audio: props.audioList
    })
    console.log(playerRef.value);
    
  })
})

</script>

<style lang="less" scoped>
.myAplayer {
  position: absolute;
  width: 100%;
  bottom: 0;
}

/deep/ .aplayer.aplayer-fixed {
  max-width: 100%;
}

/deep/ .aplayer {
  margin: 0;
}
</style>