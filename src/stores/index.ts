import { defineStore } from 'pinia'

export const useStore = defineStore({
  id: 'CloudMusic',
  state: () => ({
    userinfo:
      { account: { id: '' }, profile: { avatarUrl: '' }, }
    ,
    uid: '',
    playListId: '3136952023',
    audioLists: [{
      artist: "Glass Animals",
      cover: "https://p1.music.126.net/7QQmLDI1wgOapW1AzkPMEw==/109951165099694316.jpg",
      lrc: "",
      name: "Heat Waves",
      url: "http://m8.music.126.net/20220516220845/40ed96529bec9199f042b826f9cb0bc6/ymusic/obj/w5zDlMODwrDDiGjCn8Ky/3055153974/856a/a46a/b9b2/c4ae9b782e5313fa0627c652dae8abad.mp3"

    }]
  }),
  actions: {
    // 用户信息
    userInfoActions(userinfo: any) {
      this.userinfo = userinfo
      // setLocalstorage('userStore',toRaw(this.userStore))
    },
    // 用户歌单id
    getplayListId(id: string) {
      this.playListId = id
    },
    // 歌曲列表
    setaudioList(audioLists: any) {
      this.audioLists.push(audioLists)
    }
  }
})
