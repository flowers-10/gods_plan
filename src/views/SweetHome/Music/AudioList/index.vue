<template>
  <div class="main-container">
    <div class="content-wrapper">

      <div class="content-section">
        <div class="content-section-title"><a>当前播放</a>
          <div class="allSongs" @click="refreshSongs">
            <svg t="1661934010833" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="10482" fill="currentColor">
              <path
                d="M55.935033 264.48948c0 0 85.897017-132.548409 221.81443-203.673173 135.916406-71.121743 303.368504-50.646859 413.187968 18.319527 109.819465 68.970415 146.791894 127.160016 146.791894 127.160016l94.59499-53.879895c0 0 19.576483-9.697092 19.576483 12.932142l0 338.379961c0 0 0 30.17399-22.837719 19.395191-19.210878-9.062571-226.959086-127.198289-292.424528-164.466828-35.950145-16.035251-4.365101-29.062068-4.365101-29.062068l91.284402-52.173738c0 0-52.068992-65.209619-128.278989-99.744682-81.576231-42.501826-157.948384-47.541735-251.497925-12.224097-61.002644 23.025054-132.823368 81.988166-184.553949 169.082716L55.935033 264.48948 55.935033 264.48948 55.935033 264.48948zM904.056909 711.697844c0 0-85.897017 132.550423-221.816444 203.671159-135.917413 71.12275-303.366489 50.651895-413.186961-18.315498-109.825508-68.972429-146.790886-127.165052-146.790886-127.165052L27.662591 823.768348c0 0-19.572454 9.703135-19.572454-12.932142L8.090137 472.459267c0 0 0-30.170968 22.831676-19.397205 19.211885 9.067607 226.965129 127.198289 292.430571 164.470856 35.950145 16.035251 4.366109 29.058039 4.366109 29.058039l-91.285409 52.175753c0 0 52.071006 65.206598 128.279996 99.744682 81.57321 42.498804 157.942341 47.540728 251.496918 12.222082 60.998616-23.026061 132.820346-81.983131 184.546898-169.082716L904.056909 711.697844 904.056909 711.697844 904.056909 711.697844zM904.056909 711.697844"
                p-id="10483"></path>
            </svg>
            <span class="allSongs-button">刷新歌曲</span>
            <span class="allSongs-length">({{  songs.length  }})</span>
          </div>
        </div>
        <ul class="lists">
          <li class="list-item" v-for="(item, index) in songs" :key="index" @click="playSongs(item.id)">
            <div class="main-songs">
              <div class="songs-name">{{  item.name  }}</div>
            </div>
            <div class="song-detail">
              <div class="singer">
                {{  item.artist  }}
              </div>
            </div>
            <svg t="1661933174051" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="8433" fill="currentColor" @click.stop="deleteSongs(item.id)">
              <path
                d="M760.96 195.2L512 444.16 263.04 195.2a48 48 0 0 0-67.84 67.84L444.16 512l-248.96 248.96A48 48 0 0 0 263.04 832L512 579.84 760.96 832A48 48 0 0 0 832 760.96L579.84 512 832 263.04a48 48 0 0 0-67.84-67.84z"
                p-id="8434"></path>
            </svg>

          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
// 依赖工具
import { useRouter } from 'vue-router';
import { ref, onMounted, toRaw } from 'vue';
import { useStore } from '@/stores';
import { ElMessage } from 'element-plus'

// 接口工具
import { songDetail, songUrl, lyric } from '@/api/api'

// 使用路由
const router = useRouter()
// 使用pinia
const store = useStore()

// 获取歌曲详情
const songs = store.audioLists


// 播放歌曲
const playSongs = async (id: number) => {
  // console.log(id);
  store.setActiveSongsIndex(id)
}

// 删除歌曲
const deleteSongs = (id: number) => {
  // console.log(id);
  store.deleteSongsDetail(id)
}


// 获得歌曲最新的数据
const playSong = async (id: number) => {
  let REaudioList:any = {}
  // 获得音乐链接
  let songsRes: any = await songUrl(id)
  let url = songsRes.data[0].url
  REaudioList.url = url
  REaudioList.id = id
  store.resetAudioList(REaudioList)
}

// 刷新歌曲
const refreshSongs = () => {
  if (songs.length > 50) return ElMessage.warning('服务器资源有限，暂时不支持50首歌以上的刷新！请您谅解蟹蟹！')
  store.audioLists.map((item: any) => {
    // console.log(item.id);
    playSong(item.id)
    
  })
  // console.log(oldArray);
  
}


onMounted(() => {

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
  }

}

.content-section {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  padding-bottom: 80px;
  font-size: 16px;
  position: relative;

  svg {
    width: 20px;
    margin-left: 20px;
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

  .singer {
    display: flex;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>