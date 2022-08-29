<template>
    <div class="main-container" @click="menuAcitve(9999, false)">
        <div class="content-wrapper" :class="flag == true ? 'overlay' : ''">
            <div class="content-wrapper-header">
                <img class="artist-img" :src="artist.img1v1Url" alt="">
                <div class="artist-content">
                    <div class="infor-title"> {{ artist.name }} </div>
                    <div class="content-songInfor">
                        <span>{{ artist.albumSize }}个专辑 ·</span> <span>{{ artist.musicSize }}首歌 ·</span>
                        <span>{{ artist.mvSize }}个mv</span>
                    </div>
                    <div @click="introductionflag = true" class="content-songInfor">简介: {{ artist.briefDesc }}
                    </div>
                </div>
            </div>
            <div class="content-section">
                <div class="content-section-title"><a>热门歌曲</a>
                    <!-- <span class="allSongs" @click="addAllPlayList">添加全部歌曲</span> -->
                </div>
                <ul>
                    <li v-for="(item, index) in hotSongs" :key="index" @dblclick="playSongs(item.id)">
                        <div class="main-songs">
                            <div class="songs-name">{{ item.name }}</div>
                            <div class="phone-singer">
                                <div class="singer">
                                    <div class="singer-item" v-for="(iten, indey) in item.ar" :key="indey">
                                        <span @click="goArtists(iten.id)" class="singer-item">{{ iten.name }}</span>
                                        <span v-if="indey !== item.ar.length - 1" class="slash">/</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <span class="playTime">
                            {{ $filters.filterSongTime(item.dt) }}
                        </span>
                        <div class="song-detail">
                            <div class="singer">
                                <div v-for="(iten, indey) in item.ar" :key="indey">
                                    <span @click="goArtists(iten.id)" class="singer-item">{{ iten.name }}</span>
                                    <span v-if="indey !== item.ar.length - 1" class="slash">/</span>
                                </div>
                            </div>
                        </div>
                        <span class="song-detail album">
                            {{ item.al.name }}
                        </span>
                        <svg @click="playSongs(item.id)" t="1652174381921" viewBox="0 0 1024 1024" fill="currentColor">
                            <path
                                d="M512 42.666667C252.793333 42.666667 42.666667 252.793333 42.666667 512s210.126667 469.333333 469.333333 469.333333 469.333333-210.126667 469.333333-469.333333S771.206667 42.666667 512 42.666667z m196.546667 500.493333l-266.666667 176A37.333333 37.333333 0 0 1 384 688V336.033333a37.333333 37.333333 0 0 1 57.893333-31.16l266.666667 176a37.333333 37.333333 0 0 1 0 62.32z"
                                p-id="1906"></path>
                        </svg>
                        <div class="button-wrapper">
                            <div class="menu">
                                <button class="dropdown" :class="activeIndex === index ? 'is-active' : ''"
                                    @click.stop="menuAcitve(index, true)">
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
            <div class="content-section">
                <div class="content-section-title"><a>歌手专辑</a>
                </div>
                <div class="cards">
                    <div class="card" v-for="(item, index) in AlbumList" :key="index" @click="goAlbumList(item.id)">
                        <img class="card-img" :src="item.picUrl" alt="">
                        <div class="card-detail">
                            <span class="detail-name"> {{ item.name }} </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-section">
                <div class="content-section-title"><a>歌手MV</a>
                </div>
                <div class="cards">
                    <div class="card" v-for="(item, index) in MVList" :key="index" @click="goMvPage(item.id)">
                        <img class="card-img" :src="item.imgurl" alt="">
                        <div class="card-detail">
                            <span class="detail-name"> {{ item.name }} </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 歌手简介 -->
    <dialoge :flag="introductionflag" @on-click="closeDialog">
        <template #Title>
            <span>歌手简介</span>
        </template>
        <template #default>
            <div class="artistClass">
                {{ artist.briefDesc }}
            </div>
        </template>
    </dialoge>
</template>

<script setup lang="ts">
// 引入工具
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted, computed } from 'vue';
import { getArtists, getArtistAlbum, songDetail, songUrl, lyric, getArtistMV } from '@/api/api'
import { useStore } from '@/stores';

// 使用pinia
const store = useStore()
// 使用路由
const route = useRoute()
const router = useRouter()

// 获得歌手id
let idNumber = computed(() => {
    return route.params.id
}).value

// 歌手
const artist = ref<any>({})
// 热门歌曲
const hotSongs = ref<any>([])
// mv
const MVList = ref<any>([])
// 专辑
const AlbumList = ref<any>([])
// 获得歌手数据
const getDate = async (id?: string | string[]) => {
    // console.log(idNumber);
    if (id) {
        let Artists: any = getArtists(id)
        let ArtistMV: any = getArtistMV(id)
        let ArtistAlbum: any = getArtistAlbum(id)
        Promise.all([Artists, ArtistMV, ArtistAlbum]).then(
            ([res, resMv, resAlbum]) => {
                // console.log(res.artist);
                if (res.code == 200) {
                    artist.value = res.artist
                    hotSongs.value = res.hotSongs
                }

                if (resMv.code == 200) {
                    MVList.value = resMv.mvs
                    // console.log(MVList.value);
                }
                if (resAlbum.code == 200) {
                    AlbumList.value = resAlbum.hotAlbums
                    console.log(AlbumList.value);
                }
            }
        )
    } else {
        let Artists: any = getArtists(idNumber)
        let ArtistMV: any = getArtistMV(idNumber)
        let ArtistAlbum: any = getArtistAlbum(idNumber)
        Promise.all([Artists, ArtistMV, ArtistAlbum]).then(
            ([res, resMv, resAlbum]) => {
                // console.log(res.artist);
                if (res.code == 200) {
                    artist.value = res.artist
                    hotSongs.value = res.hotSongs
                }

                if (resMv.code == 200) {
                    MVList.value = resMv.mvs
                    // console.log(MVList.value);
                }
                if (resAlbum.code == 200) {
                    AlbumList.value = resAlbum.hotAlbums
                    console.log(AlbumList.value);
                }
            }
        )
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
}
// 播放歌曲
let playSongs = async (id: number) => {
    let audioList: Audio = {
        artist: '',
        name: '',
        url: '',
        cover: '',
        lrc: '',
        id: ''
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
    // 歌词
    let lyricRes: any = await lyric(id)
    let lrc = lyricRes.lrc.lyric
    // console.log(lrc);
    audioList.lrc = lrc
    // id
    audioList.id = id
    // console.log('触发了单曲添加', audioList);
    store.setaudioList(audioList)
}

// 激活菜单
let activeIndex = ref<number>(9999)

// 控制歌曲按钮弹框
const menuAcitve = (index: number, _flag: boolean): void => {
    activeIndex.value = index
    flag.value = _flag
}

// 简介弹框
const introductionflag = ref<boolean>(false)

// 关闭弹框
const closeDialog = () => {
    introductionflag.value = false
}

// 去专辑详情
const goAlbumList = (id: number) => {
    console.log(id);
    // router.push({
    //     name: 'PlayListDetail',
    //     params: {
    //         id
    //     }
    // })
}

// 到mv页面
const goMvPage = (id: number) => {
    console.log(id);
    router.push({
        name: 'MV',
        params: {
            id
        }
    })
}
// 到歌手详情页面
const goArtists = (id: string) => {
    router.push({
        name: 'Artist',
        params: {
            id
        }
    })
    getDate(id)
    
}

onMounted(() => {
    getDate()
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
            position: relative;
            display: flex;
            align-items: center;
            border-radius: 14px;
            padding: 20px 40px;
            background-color: var(--content-bg);

            @media screen and (max-width: 480px) {
                padding: 15px;
                margin-top: 40px;
            }
        }

        &.overlay {
            pointer-events: none;
            transition: 0.3s;
            background-color: var(--overlay-bg);
        }
    }

}

.artist-img {
    width: 250px;
    height: 250px;
    object-fit: cover;
    //   border: 1px solid var(--theme-color);
    border-radius: 50%;
    margin-right: 10px;
    box-shadow: 0px 12px 16px -8px rgba(0 0 0 /20%);

    @media screen and (max-width: 660px) {
        width: 120px;
        height: 120px;
        margin-right: 5px;
    }

    @media screen and (max-width: 480px) {
        width: 80px;
        height: 80px;
        margin-right: 5px;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -125%);
    }
}

.artist-content {
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 10px 0;

    @media screen and (max-width: 480px) {
        padding: 50px 0 0;
        margin-left: 0;
        text-align: center;
    }

    .infor-title {
        font-weight: 600;
        font-size: 35px;
        // display: flex;
        // align-items: center;
        padding: 10px;

        @media screen and (max-width: 660px) {
            font-weight: 500;
            font-size: 24px;
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
        // padding: 10px;
        margin-left: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
        cursor: pointer;

        @media screen and (max-width: 660px) {
            padding: 0;
            margin-bottom: 8px;
            font-size: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
    }
}

.content-section {
    margin-top: 30px;
    display: flex;
    flex-direction: column;

    &:last-child {
        padding-bottom: 80px;

        @media screen and (max-width: 480px) {
            padding-bottom: 20px;
        }
    }


    &-title {
        color: var(--content-title-color);
        margin-bottom: 14px;
        font-size: 20px;
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

        svg {
            width: 20px;
            margin-left: 10px;
            flex-shrink: 0;
        }
    }
}

.main-songs {
    margin-right: auto;

    @media screen and (max-width: 1500px) {
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

.allSongs {
    margin-left: 20px;
    font-size: 16px;
    cursor: pointer;
}

.artistClass {
    color: var(--theme-color);
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

.singer {
    display: flex;

    .singer-item:hover {
        text-decoration: underline;
    }
}
</style>