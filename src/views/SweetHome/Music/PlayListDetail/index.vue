<template>
  <div class="main-container">
    <main-header :menuLink="menuLink"></main-header>
    <div class="content-wrapper">
      <div class="content-wrapper-header">
        <img class="playList-img" :src="PlaylistDetail.playlist.coverImgUrl" alt="">
        <div class="playList-content">
          <div class="infor-title">{{ PlaylistDetail?.playlist.name }} </div>
          <div class="content-songInfor">
            <img class="profile-img" :src="PlaylistDetail.playlist.creator.avatarUrl" alt="">
            <span>{{ PlaylistDetail?.playlist.creator.nickname }}</span>
          </div>
          <div class="content-label">标签: {{ PlaylistDetail?.playlist.tags.join(',') }}</div>
          <div class="content-songInfor">简介: {{ PlaylistDetail?.playlist.description }}</div>
        </div>
      </div>
      <div class="content-section">
        <div class="content-section-title">歌曲列表</div>
        <ul>
          <li v-for="(item, index) in songs" :key="index">
            <div class="main-songs" @click="playSongs(item.id)">
              <div class="songs-name">{{ item.name }}</div>
              <div class="phone-singer">
                <span class="singer">{{ filtersinger(item.ar) }}</span>
              </div>
            </div>
            <span class="playTime" @click="playSongs(item.id)">
              {{ filterTime(item.dt) }}
            </span>
            <div class="song-detail" @click="playSongs(item.id)">
              <span class="singer">
                {{ filtersinger(item.ar) }}
              </span>
            </div>
            <span class="song-detail album" @click="playSongs(item.id)">
              {{ item.al.name }}
            </span>
            <svg t="1652174381921" viewBox="0 0 1024 1024" fill="currentColor">
              <path
                d="M512 42.666667C252.793333 42.666667 42.666667 252.793333 42.666667 512s210.126667 469.333333 469.333333 469.333333 469.333333-210.126667 469.333333-469.333333S771.206667 42.666667 512 42.666667z m196.546667 500.493333l-266.666667 176A37.333333 37.333333 0 0 1 384 688V336.033333a37.333333 37.333333 0 0 1 57.893333-31.16l266.666667 176a37.333333 37.333333 0 0 1 0 62.32z"
                p-id="1906"></path>
            </svg>
            <div class="button-wrapper">
              <div class="menu">

              </div>
            </div>
          </li>

        </ul>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
// 引入工具
import { useRoute } from 'vue-router';
import { ref, onMounted, computed, toRaw, watch, reactive } from 'vue';
import { playListDetail, songDetail, songUrl, lyric } from '@/api/api'
import { useStore } from '@/stores';
import { newExpression } from '@babel/types';

// 使用路由
const route = useRoute()
// 给子组件传参
const menuLink = ref<string>('Playlist Detail')
// 使用pinia
const store = useStore()
// 歌单所有歌曲
const PlaylistDetail: any = reactive({ playlist: { tags: [], creator: {} } })
// 获取歌曲详情
const songs: any = reactive([])
let id: any = computed(() => {
  return route.params.id
}).value
// 获取歌单所有歌曲
const getPlaylistDetail = async (ids: number) => {
  // console.log('传参的', ids);
  const res: any = await playListDetail(ids)
  PlaylistDetail.playlist = res.playlist
  // 根据歌曲id获得歌曲详情
  const idss = PlaylistDetail.playlist.trackIds.map((item: any) => item.id)
  const songRes: any = await songDetail(idss.join())
  // console.log(songRes.songs);
  // 过滤出需要用的数据
  const song = songRes.songs.map((item: any,) => {
    return { al: item.al, name: item.name, id: item.id, ar: item.ar, dt: item.dt }

  })
  // console.log(songsDetail);
  songs.push(...song)
  // console.log(toRaw(songs));

}
// 控制歌曲小菜单打开关闭
const flag = ref<boolean>(false)

// 过滤歌手名字
const filtersinger = (item: any) => {
  const singer = toRaw(item)
  // console.log(...singer);
  const newSinger = [...singer]

  if (singer.length > 1) {
    // const s.map(item=>`${item.name}/`)
    const newSingers = newSinger.map(item => `${item.name} /`)
    newSingers.slice(0, newSingers.length - 1)

    return newSingers.slice(0, newSingers.length - 1).join(' ') + ' ' + newSinger.pop().name
  } else {
    return newSinger[0].name
  }
}

// 过滤时间
const filterTime = (item: number) => {
  let m: string | number = item / 1000 / 60
  let s: string | number = (item / 1000) % 60
  if (m < 10) {
    m = '0' + parseInt(m.toString())
  } else {
    m = parseInt(m.toString())
  }
  if (s < 10) {
    s = '0' + parseInt(s.toString())
  } else {
    s = parseInt(s.toString())
  }
  return `${m}:${s}`
}

// 播放的歌曲列表
type Audio = {
  // 音频艺术家
  artist: String;
  // 音频名称
  name: String;
  // 音频链接
  url: String;
  // 音频封面
  cover: String;
  // 歌词
  lrc: String;
}
const audioList = reactive<Audio>({
  artist: '',
  name: '',
  url: '',
  cover: '',
  lrc: '',
})
const playSongs = async (id: number) => {
  // console.log(id);
  // 获得音乐链接
  const songsRes: any = await songUrl(id)
  const url = songsRes.data[0].url
  audioList.url = url
  // 获得歌曲详情
  const songsDetailRes: any = await songDetail(id)
  // 音频艺术家
  const artist = songsDetailRes.songs[0].ar[0].name
  audioList.artist = artist
  // 音频名称
  const name = songsDetailRes.songs[0].name
  audioList.name = name
  // 音频封面
  const cover = songsDetailRes.songs[0].al.picUrl
  audioList.cover = cover
  // 歌词
  const lyricRes:any =await lyric(id)

  
  const lrc = lyricRes.lrc.lyric
  console.log(lrc);
  audioList.lrc = lrc
  // var list: any = store.$state.audioLists
  // var hash: any = {}
  // var arr: any = []
  // arr = list.reduce((item: any, next: any) => {
  //   hash[next.cover] ? '' : hash[next.cover] = true && item.push(next)
  //   return item
  // }, [])
  console.log(audioList);
  store.setaudioList(audioList)
}

onMounted(() => {
  // id.value = Number(route.params.id)
  getPlaylistDetail(id)
})
</script>

<style lang="less" scoped>
.main-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  .content-wrapper {
    display: flex;
    flex-direction: column;
    color: var(--theme-color);
    padding: 20px 40px;

    height: 100%;
    overflow: auto;
    background-color: var(--theme-bg-color);
    background-size: 100% 100%;
    background-position: center center;

    @media screen and (max-width: 510px) {
      padding: 20px 20px 80px 20px;
    }

    &-header {
      display: flex;
      align-items: center;

      border-radius: 14px;
      padding: 20px 40px;
      background-color: var(--content-bg);

      @media screen and (max-width: 480px) {
        padding: 15px;
      }
    }

    &.overlay {
      pointer-events: none;
      transition: 0.3s;
      background-color: var(--overlay-bg);
    }
  }

}

.playList-img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border: 1px solid var(--theme-color);
  border-radius: 5px;
  margin-right: 10px;

  @media screen and (max-width: 480px) {
    width: 100px;
    height: 100px;
    margin-right: 5px;
  }

  @media screen and (max-width: 660px) {
    width: 120px;
    height: 120px;
    margin-right: 5px;
  }
}

.playList-content {
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 10px 0;

  @media screen and (max-width: 480px) {
    padding: 5px 0;
  }

  .infor-title {
    font-weight: 600;
    font-size: 17px;
    display: flex;
    align-items: center;
    padding: 10px;

    @media screen and (max-width: 660px) {
      font-weight: 500;
      font-size: 16px;
      padding: 0;
      margin-bottom: 15px;
    }
  }

  span {
    margin-left: 5px;
  }

  .content-songInfor {
    display: flex;
    align-items: center;
    padding: 10px;

    @media screen and (max-width: 660px) {
      padding: 0;
      margin-bottom: 8px;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }

  .content-label {
    display: flex;
    align-items: center;
    padding: 10px;

    @media screen and (max-width: 660px) {
      display: none;
    }
  }
}

.profile-img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  box-shadow: 0px 0px 5px 0px var(--theme-color);
  border-radius: 50%;
  margin-right: 20px;

  @media screen and (max-width: 510px) {
    width: 25px;
    height: 25px;
    margin-right: 5px;
  }

  @media screen and (max-width:660px) {
    width: 40px;
    height: 40px;
    margin-right: 5px;
  }
}

.content-section {
  margin-top: 30px;
  display: flex;
  flex-direction: column;

  &-title {
    color: var(--content-title-color);
    margin-bottom: 14px;
  }

  ul {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-around;
    background-color: var(--content-bg);
    padding-left: 0;
    margin: 0;
    border-radius: 14px;
    border: 1px solid var(--theme-bg-color);
    cursor: pointer;

    li {
      list-style: none;
      padding: 0px 18px;
      display: flex;
      align-items: center;
      font-size: 16px;
      width: 100%;
      height: 41px;
      white-space: nowrap;
      transition: 0.3s;

      @media screen and (max-width: 480px) {
        height: 57px;
      }

      &:hover {
        background-color: var(--theme-bg-color);

        &:first-child {
          border-radius: 13px 13px 0 0;
        }

        &:last-child {
          border-radius: 0 0 13px 13px;
        }
      }

      &+li {
        border-top: 1px solid var(--border-color);
      }
    }

    svg {
      width: 20px;
      margin-left: 10px;
      flex-shrink: 0;
    }
  }
}

.main-songs {
  width: 320px;
  display: flex;
  height: 100%;
  align-items: center;
  margin-right: auto;

  @media screen and (max-width: 1120px) {
    width: 250px;
    font-size: 14px;
  }

  @media screen and (max-width: 480px) {
    width: 290px;
    font-size: 14px;
  }

  .songs-name {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
  }

  .phone-singer {
    font-size: 12px;
    margin: 2px 0 0 10px;
    display: none;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;

    @media screen and (max-width: 480px) {
      display: block;
    }
  }
}

.song-detail {
  width: 250px;
  margin-right: 20px;
  font-size: 15px;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  display: flex;
  height: 100%;
  align-items: center;

  @media screen and (max-width: 1120px) {
    width: 180px;
    font-size: 14px;
  }

  @media screen and (max-width: 700px) {
    display: none;
  }
}

.album {
  @media screen and (max-width: 1380px) {
    display: none !important;
  }
}

.playTime {
  display: flex;
  height: 100%;
  align-items: center;
  width: 75px;
  margin-left: 8px;

  @media screen and (max-width: 1000px) {
    display: none !important;
  }
}

.menu {
  width: 5px;
  height: 5px;
  background-color: var(--button-inactive);
  border-radius: 50%;
  box-shadow: 7px 0 0 0 var(--button-inactive), 14px 0 0 0 var(--button-inactive);
  margin: 0 12px;
}

.dropdown {
  position: relative;
  height: 53px;
  width: 40px;
  top: -24px;
  display: flex;
  left: -5px;
  background: transparent;
  border: none;
  cursor: pointer;

  ul {
    position: absolute;
    background: var(--dropdown-bg);
    height: 110px;
    width: 120px;
    right: 0;
    top: 20px;
    pointer-events: none;
    opacity: 0;
    transform: translatey(10px);
    transition: all 0.4s ease;

    li a {
      text-decoration: none;
      color: var(--theme-color);
      font-size: 12px;
    }
  }
}

.dropdown.is-active {
  ul {
    opacity: 1;
    pointer-events: all;
    transform: translatey(25px);

    li:hover {
      background-color: var(--dropdown-hover);
    }
  }
}

.button-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 50px;
  // margin-left: auto;

  @media screen and (max-width: 480px) {
    width: auto;
  }
}

.content-section .close {
  margin-right: 0;
  width: 24px;
}
</style>