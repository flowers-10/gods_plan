<template>
  <div class="main-container">
    <main-header :menuLink="menuLink"></main-header>
    <div class="content-wrapper">
      <div class="content-wrapper-header">
        <img class="playList-img" :src="PlaylistDetail[0]?.playlist.coverImgUrl" alt="">
        <div class="playList-content">
          <div class="infor-title">{{ PlaylistDetail[0]?.playlist.name }} </div>
          <div class="content-songInfor">
            <img class="profile-img" :src="PlaylistDetail[0]?.playlist.creator.avatarUrl" alt="">
            <span>{{ PlaylistDetail[0]?.playlist.creator.nickname }}</span>
          </div>
          <div class="content-label">标签: {{ PlaylistDetail[0]?.playlist.tags.join(',') }}</div>
          <div class="content-songInfor">简介: {{ PlaylistDetail[0]?.playlist.description }}</div>
        </div>
      </div>
      <div class="content-section">
        <div class="content-section-title">歌曲列表</div>
        <ul>
          <li class="adobe-product">
            <div class="products">
              <svg t="1652174381921" viewBox="0 0 1024 1024" fill="currentColor">
                <path
                  d="M512 42.666667C252.793333 42.666667 42.666667 252.793333 42.666667 512s210.126667 469.333333 469.333333 469.333333 469.333333-210.126667 469.333333-469.333333S771.206667 42.666667 512 42.666667z m196.546667 500.493333l-266.666667 176A37.333333 37.333333 0 0 1 384 688V336.033333a37.333333 37.333333 0 0 1 57.893333-31.16l266.666667 176a37.333333 37.333333 0 0 1 0 62.32z"
                  p-id="1906"></path>
              </svg>
              歌名
            </div>
            <span class="song-time">
              时间
            </span>
            <span class="song-time">
              歌手
            </span>
            <span class="song-time">
              专辑
            </span>
            <div class="button-wrapper">
              <div class="menu">
                <button class="dropdown">
                  <ul>
                    <li><a href="#">Go to Discover</a></li>
                    <li><a href="#">Learn more</a></li>
                    <li><a href="#">Uninstall</a></li>
                  </ul>
                </button>
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
import { playListDetail } from '@/api/api'

// 使用路由
const route = useRoute()
// 给子组件传参
const menuLink = ref<string>('Playlist Detail')

// 歌单所有歌曲
const PlaylistDetail: any = reactive([])
// 获取歌单所有歌曲

let id: any = computed(() => {
  return route.params.id
}).value
// 获取歌单所有歌曲
const getPlaylistDetail = (ids: number) => {
  // console.log('传参的', ids);
  playListDetail(ids).then(
    res => {
      console.log(res);
      PlaylistDetail.push(res)
    }
  )
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
  width: 100%;

  .content-wrapper {
    display: flex;
    flex-direction: column;
    color: var(--theme-color);
    padding: 20px 40px;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: var(--theme-bg-color);
    background-size: 100% 100%;
    background-position: center center;

    @media screen and (max-width: 510px) {
      padding: 20px;
    }

    &-header {
      display: flex;
      align-items: center;
      width: 100%;
      border-radius: 14px;
      padding: 20px 40px;
      background-color: var(--content-bg);

      @media screen and (max-width: 415px) {
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

  @media screen and (max-width: 510px) {
    width: 100px;
    height: 100px;
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

  @media screen and (max-width: 510px) {
    padding: 5px 0;
  }

  .infor-title {
    font-weight: 600;
    font-size: 17px;
    display: flex;
    align-items: center;
    padding: 10px;

    @media screen and (max-width: 510px) {
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

    @media screen and (max-width: 510px) {
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

    @media screen and (max-width: 510px) {
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
}

.content-section {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  width: 100%;

  &-title {
    color: var(--content-title-color);
    margin-bottom: 14px;
  }

  ul {
    display: flex;
    flex-direction: column;
    width: 100%;
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
      height: 100%;
      white-space: nowrap;
      transition: 0.3s;

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
      margin-right: 10px;
      flex-shrink: 0;
    }
  }
}

.products {
  display: flex;
  align-items: center;
  width: 200px;

  @media screen and (max-width: 480px) {
    width: 120px;
  }
}

.song-time {
  margin-left: auto;
  width: 140px;
  font-size: 15px;
  position: relative;

  @media screen and (max-width: 700px) {
    display: none;
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
  width: 187px;
  margin-left: auto;

  @media screen and (max-width: 480px) {
    width: auto;
  }
}



.content-section .close {
  margin-right: 0;
  width: 24px;
}
</style>