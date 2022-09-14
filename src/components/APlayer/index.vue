<template>
  <div class="myAplayer">
    <div ref="playerRef"></div>
  </div>
</template>

<script lang="ts" setup>
// 使用工具
import APlayer from 'APlayer';
import 'APlayer/dist/APlayer.min.css';
import type { PropType } from '@vue/runtime-core';
import { useStore } from '@/stores';
import { onMounted, ref, onBeforeUnmount, watch, nextTick, computed } from 'vue'
import { debounce } from '@/utils/debounce';

// 使用pinia
const store = useStore()

// 获得歌曲列表 
let audioLists = computed(() => {
  return store.$state.audioLists
}).value
let activeSongsIndex = computed(() => {
  return store.$state.activeSongsIndex
})

// 获得dom节点
const playerRef: any = ref()
// 存放dom容器
let ap: any = null

// 父子传参
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
})

watch([audioLists, activeSongsIndex], function ([newVal, newVal2], oldVal) {
  ap = new APlayer({
    container: playerRef.value, //dom挂载
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
    audio: store.$state.audioLists
    //获得总歌单
  })
  // 选择播放的歌曲
  ap.list.switch(newVal2)
  setTimeout(() => {
    ap.play()
  }, 20)
}, { deep: true })
onMounted(() => {
  nextTick(() => {
  // 创建一个aplayer实例对象
  if (!ap) {
    ap = new APlayer({
      container: playerRef.value, //dom挂载
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
      audio: store.$state.audioLists
      //获得总歌单
    })
  }
  // console.log(ap);

  // 监听 aplayer的事件，启用后会根据事件触发响应内容
  // ap.on('play', function () {
  //   console.log('player paly');
  // });
  // ap.on('listadd', function () {
  // console.log('player 添加了新歌曲');
  // });
  // ap.on('listswitch', function () {
  //   console.log('player 切换了歌曲');
  // });
  })
})

// 销毁
onBeforeUnmount(() => {
  // 离开后销毁aplayer
  ap.destroy()
})

</script>

<style lang="less" scoped>
.myAplayer {
  position: absolute;
  width: calc(100% - 240px);
  bottom: 0;
  z-index: 999;
  margin-left: 240px;

  @media screen and (max-width: 945px) {
    width: 100% !important;
    margin-left: 0;
  }
}

/deep/ .aplayer.aplayer-fixed {
  max-width: 100%;
}

/deep/ .aplayer {
  margin: 0;
}
</style>