<template>
  <div class="content-section">
    <div class="content-section-title"><a>歌曲列表</a>
      <div class="allSongs" @click="addAllPlayList">
        <svg t="1652174381921" viewBox="0 0 1024 1024" fill="currentColor">
          <path
            d="M512 42.666667C252.793333 42.666667 42.666667 252.793333 42.666667 512s210.126667 469.333333 469.333333 469.333333 469.333333-210.126667 469.333333-469.333333S771.206667 42.666667 512 42.666667z m196.546667 500.493333l-266.666667 176A37.333333 37.333333 0 0 1 384 688V336.033333a37.333333 37.333333 0 0 1 57.893333-31.16l266.666667 176a37.333333 37.333333 0 0 1 0 62.32z"
            p-id="1906"></path>
        </svg>
        <span class="allSongs-button">播放全部</span>

        <span class="allSongs-length">({{  songs.length  }})</span>
      </div>
    </div>
    <ul class="lists">
      <li class="list-item" v-for="(item, index) in songs" :key="index" @click="playSongs(item.id)">
        <div class="main-songs">
          <div class="songs-name">{{  item.name  }}</div>
          <div class="phone-singer">
            <div class="singer">
              <div class="singer-item" v-for="(iten, indey) in item.ar" :key="indey">
                <span @click.stop="goArtists(iten.id)" class="singer-item">{{  iten.name  }}</span>
                <span v-if="indey !== item.ar.length - 1" class="slash"> / </span>
              </div>
            </div>
          </div>
        </div>
        <span class="playTime">
          {{  $filters.filterSongTime(item.dt)  }}
        </span>
        <div class="song-detail">
          <div class="singer">
            <div v-for="(iten, indey) in item.ar" :key="indey">
              <span @click.stop="goArtists(iten.id)" class="singer-item">{{  iten.name  }}</span>
              <span v-if="indey !== item.ar.length - 1" class="slash"> / </span>
            </div>
          </div>
        </div>
        <span class="song-detail album" @click.stop="goAlbum(item.al.id)">
          {{  item.al?.name  }}
        </span>
        <svg @click.stop="goMV(item.mv)" t="1652174381921" viewBox="0 0 1024 1024" fill="currentColor">
          <path
            d="M512 42.666667C252.793333 42.666667 42.666667 252.793333 42.666667 512s210.126667 469.333333 469.333333 469.333333 469.333333-210.126667 469.333333-469.333333S771.206667 42.666667 512 42.666667z m196.546667 500.493333l-266.666667 176A37.333333 37.333333 0 0 1 384 688V336.033333a37.333333 37.333333 0 0 1 57.893333-31.16l266.666667 176a37.333333 37.333333 0 0 1 0 62.32z"
            p-id="1906"></path>
        </svg>
        <div class="button-wrapper">
          <div class="menu">
            <button class="dropdown" @click.stop="menuAcitve(true)">
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
// 依赖工具
import { useRouter } from 'vue-router';
import { ref, onMounted, toRaw } from 'vue';
import { useStore } from '@/stores';
import { ElMessage } from 'element-plus'

// 接口工具
import { playListDetail, songDetail, songUrl, lyric, getAlbum, getArtists } from '@/api/api'


// 使用路由
const router = useRouter()
// 使用pinia
const store = useStore()

// 获取id
const props = defineProps<{
  id: any;
  type: string;
}>()

// 获取歌曲详情
const songs = ref<any>([])

// 获取详情
const getPlaylistDetail = async (ids: string | string[]) => {
  if (props.type === 'song') {
    // console.log('传参的', ids);
    const res: any = await playListDetail(ids)
    // console.log(res);
    // 根据歌曲id获得歌曲详情
    const idss = res.playlist.trackIds.map((item: any) => item.id)
    const songRes: any = await songDetail(idss.join())
    // console.log(songRes.songs);
    if (res.code === 200) {
      songs.value = songRes.songs
    }
    // console.log(songsDetail);

    // console.log(toRaw(songs));
  } else if (props.type === 'album') {
    const res: any = await getAlbum(ids)
    // console.log(res.songs);
    if (res.code === 200) {
      songs.value = res.songs
    }
  } else {
    const res: any = await getArtists(ids)
    // console.log(res);
    if (res.code === 200) {
    songs.value = res.hotSongs
    }
  }
}

// 控制歌曲小菜单打开关闭
const flag = ref<boolean>(false)

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
  // 歌曲id
  id: string | number;
  // mv
  mv:string | number;
}

// 播放歌曲
const playSongs = async (id: number) => {
  if (store.$state.audioLists.map(e => e.id).includes(id)) {
    store.setActiveSongsIndex(id)
  } else {
    let audioList: Audio = {
      artist: '',
      name: '',
      url: '',
      cover: '',
      lrc: '',
      id: '',
      mv:''
    }
    // 获得音乐链接
    let songsRes: any = await songUrl(id)
    let url = songsRes.data[0].url
    audioList.url = url
    // 获得歌曲详情
    let songsDetailRes: any = await songDetail(id)
    // console.log(songsDetailRes);
    // 音频艺术家
    let artist = songsDetailRes.songs[0].ar[0].name
    audioList.artist = artist
    // 音频名称
    let name = songsDetailRes.songs[0].name
    audioList.name = name
    // 音频封面
    let cover = songsDetailRes.songs[0].al.picUrl
    audioList.cover = cover
    let mv = songsDetailRes.songs[0].mv
    // console.log(mv);
    audioList.mv = mv
    // 歌词
    let lyricRes: any = await lyric(id)
    let lrc = lyricRes.lrc.lyric
    // console.log(lrc);
    audioList.lrc = lrc
    // id
    audioList.id = id
    // console.log('触发了单曲添加', audioList);
    store.setaudioList(audioList)
    store.setActiveSongsIndex(id)
  }
}

// 激活下拉框
const menuAcitve = (_flag: boolean): void => {
  flag.value = _flag
}

// 到歌手详情页面
const goArtists = (id: string) => {
  // console.log(id);
  router.push({
    name: 'Artist',
    params: {
      id
    }
  })
  getPlaylistDetail(id)
}

// 到专辑页面
const goAlbum = (id: number) => {
  // console.log(id);
  router.push({
    name: 'Album',
    params: {
      id
    }
  })
}

// 到MV页面
const goMV= (mvID:number) => {
  console.log(mvID);
  if(mvID===0) {
    ElMessage.warning('这首歌暂时没有MV')
  }else {
    router.push({
    name: 'MV',
    params: {
      id:mvID
    }
  })
  }
}

//添加所有歌曲
const addAllPlayList = () => {
  if (songs.value.length > 50) return ElMessage.warning('服务器资源有限，暂时不支持50首歌以上的添加！请您谅解蟹蟹！')
  let oldArray = store.audioLists.map((item: any) => {
    return item.id
  })
  let res = toRaw(songs.value).filter((item: any) => !oldArray.includes(item.id)
  ).map((item: any) => {
    return item.id
  })

  if (res.length === 0) { ElMessage.warning('您已经成功把全部歌曲添加到播放列表！') } else {
    res.map(async (id: any) => {
      playSongs(id)
    })
  }

}

onMounted(() => {
  // id.value = Number(route.params.id)
  getPlaylistDetail(props.id)
})

</script>

<style lang="less" scoped>
.content-section {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  padding-bottom: 80px;
  font-size: 16px;
  position: relative;

  svg {
    width: 20px;
    margin-left: 10px;
    flex-shrink: 0;
  }

  @media screen and (max-width: 480px) {
    padding-bottom: 20px;
  }

  &-title {
    margin-bottom: 14px;
    font-size: 20px;
    display: flex;
    align-items: center;

    .allSongs {
      display: flex;
      align-items: center;
      cursor: pointer;
      font-size: 16px;
      margin-left: 20px;

      &-button {
        margin-left: 10px;
      }

      &-length {
        margin-left: 5px;
        font-size: 14px;
        color: var(--content-title-color);
      }
    }
  }


}

.content-section .close {
  margin-right: 0;
  width: 24px;
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
    padding: 10px 18px;
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

  .main-songs {
    width: 500px;
    margin-right: auto;

    @media screen and (max-width: 1580px) {
      width: 300px;
      font-size: 14px;
    }

    @media screen and (max-width: 1120px) {
      width: 250px;
      font-size: 14px;
    }

    @media screen and (max-width: 480px) {
      width: 200px;
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
    &:hover {
      text-decoration: underline;
    }

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

  .singer {
    display: flex;

    .singer-item:hover {
      text-decoration: underline;
    }
  }
}

.dropdown {
  position: relative;
  height: 41px;
  width: 40px;
  top: -19px;
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

.button-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 50px;

  @media screen and (max-width: 480px) {
    width: auto;
  }
}
</style>