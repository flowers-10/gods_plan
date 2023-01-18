<template>
    <div class="main-container">
        <div class="content-wrapper">
            <div class="content-wrapper-header">
                <img class="artist-img" :src="artist.img1v1Url" :alt="artist.name">
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
            <song-lists type="hotMusic" :id="idNumber"></song-lists>
            <div class="content-section">
                <div class="content-section-title"><a>歌手专辑</a>
                </div>
                <div class="cards">
                    <div class="card" v-for="(item, index) in AlbumList" :key="index" @click="goAlbumList(item.id)">
                        <img class="card-img" v-lazy="item.picUrl" alt="">
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
                        <img class="card-img" v-lazy="item.imgurl" alt="">
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
import { ref, onMounted, computed, watch } from 'vue';
import { getArtists, getArtistAlbum, songDetail, songUrl, lyric, getArtistMV } from '@/api/api'
import { useStore } from '@/stores';
import SongLists from '@/components/SongLists/index.vue'

// 使用pinia
const store = useStore()
// 使用路由
const route = useRoute()
const router = useRouter()

// 获得歌手id
let idNumber = computed(() => {
    return route.params.id
}).value

watch(() =>
    router.currentRoute.value.params.id, (newval, oldval) => {
        // console.log(newval);
        getData(newval)
    }
)
// 歌手
const artist = ref<any>({})
// mv
const MVList = ref<any>([])
// 专辑
const AlbumList = ref<any>([])
// 获得歌手数据
const getData = async (id?: string | string[]) => {
    if (id) {
        let Artists: any = getArtists(id)
        let ArtistMV: any = getArtistMV(id)
        let ArtistAlbum: any = getArtistAlbum(id)
        Promise.all([Artists, ArtistMV, ArtistAlbum]).then(
            ([res, resMv, resAlbum]) => {
                // console.log(res.artist);
                if (res.code == 200) {
                    artist.value = res.artist
                }

                if (resMv.code == 200) {
                    MVList.value = resMv.mvs
                    // console.log(MVList.value);
                }
                if (resAlbum.code == 200) {
                    AlbumList.value = resAlbum.hotAlbums
                    console.log(AlbumList.value);
                }
                document.title = `热浪 - ${res.artist.name} ${res.artist.alias}`
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
                }

                if (resMv.code == 200) {
                    MVList.value = resMv.mvs
                    // console.log(MVList.value);
                }
                if (resAlbum.code == 200) {
                    AlbumList.value = resAlbum.hotAlbums
                }
                document.title = `热浪 - ${res.artist.name} ${res.artist.alias}`
            }
        )
    }
}

// 控制歌曲小菜单打开关闭
const flag = ref<boolean>(false)

// 简介弹框
const introductionflag = ref<boolean>(false)

// 关闭弹框
const closeDialog = () => {
    introductionflag.value = false
}

// 去专辑详情
const goAlbumList = (id: number) => {
    console.log(id);
    router.push({
        name: 'Album',
        params: {
            id
        }
    })
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

onMounted(() => {
    getData()
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

.content-section .close {
    margin-right: 0;
    width: 24px;
}

.artistClass {
    padding: 20px 0;
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
</style>