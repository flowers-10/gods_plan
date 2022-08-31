import { defineStore } from 'pinia'

export const useStore = defineStore({
  id: 'CloudMusic',
  state: () => ({
    userinfo: { account: { id: '' }, profile: { avatarUrl: '' }, }
    ,
    uid: '',
    playListId: '3136952023',
    audioLists: [{
      artist: "Glass Animals",
      cover: "https://p1.music.126.net/7QQmLDI1wgOapW1AzkPMEw==/109951165099694316.jpg",
      lrc: "[00:00.000] 作词 : Dave Bayley\n[00:01.000] 作曲 : Dave Bayley\n[00:03.06]Last night all I think about is you\n[00:06.18]Don't stop, baby, you can walk through\n[00:08.91]Don't wanna but I think about you\n[00:11.79]You know that I'm never gonna do\n[00:29.71]Road shimmer wigglin' the vision\n[00:32.52]Heat, heat waves, I’m swimmin' in a mirror\n[00:35.34]Road shimmer wigglin' the vision\n[00:38.23]Heat, heat waves, I’m swimmin' in a—\n[00:41.44]Sometimes all I think about is you\n[00:44.55]Late nights in the middle of June\n[00:47.22]Heat waves been freakin' me out\n[00:50.37]Can’t make you happier now\n[00:53.51]Sometimes all I think about is you\n[00:56.45]Late nights in the middle of June\n[00:59.40]Heat waves been fakin' me out\n[01:02.33]Can’t make you happier now\n[01:05.40]Usually I put somethin' on TV\n[01:08.55]So we never think about you and me\n[01:11.44]But today I see our reflections clearly\n[01:14.51]In Hollywood, layin' on the screen\n[01:17.24]You just need a better life than this\n[01:20.14]You need somethin' I can never give\n[01:23.03]Fake water all across the road\n[01:26.12]It's gone now, the night has come, but\n[01:29.12]Sometimes all I think about is you\n[01:32.06]Late nights in the middle of June\n[01:34.96]Heat waves been fakin' me out\n[01:38.07]Can’t make you happier now\n[01:40.20]You can't fight it, you can't breathe\n[01:43.76]You say somethin' so lovin', but\n[01:47.04]Now I gotta let you go\n[01:49.93]You'll be better off in someone new\n[01:52.87]I don't wanna be alone\n[01:55.49]You know it hurts me too\n[01:58.78]You look so broken when you cry\n[02:01.98]One more and then I say goodbye\n[02:04.74]Sometimes all I think about is you\n[02:07.77]Late nights in the middle of June\n[02:10.73]Heat waves been fakin' me out\n[02:13.67]Can’t make you happier now\n[02:16.52]Sometimes all I think about is you\n[02:19.68]Late nights in the middle of June\n[02:22.78]Heat waves been fakin' me out\n[02:25.57]Can’t make you happier now\n[02:28.64]I just wanna know what you're dreamin' of\n[02:31.55]When you sleep and smile so comfortable\n[02:34.57]I just wish that I could give you that\n[02:37.59]That look that's perfectly un-sad\n[02:40.56]Sometimes all I think about is you\n[02:43.40]Late nights in the middle of June\n[02:46.31]Heat waves been fakin' me out\n[02:49.43]Heat waves been fakin' me out\n[02:55.17]Sometimes all I think about is you\n[02:58.22]Late nights in the middle of June\n[03:01.28]Heat waves been fakin' me out\n[03:04.17]Can’t make you happier now\n[03:07.10]Sometimes all I think about is you\n[03:10.08]Late nights in the middle of June\n[03:13.03]Heat waves been fakin' me out\n[03:16.05]Can’t make you happier now\n[03:19.08]Road shimmer wigglin' the vision\n[03:21.89]Heat, heat waves, I’m swimmin' in a mirror\n[03:24.80]Road shimmer wigglin' the vision\n[03:27.70]Heat, heat waves, I’m swimmin' in a mirror\n",
      name: "Heat Waves",
      url: "http://m8.music.126.net/20220516220845/40ed96529bec9199f042b826f9cb0bc6/ymusic/obj/w5zDlMODwrDDiGjCn8Ky/3055153974/856a/a46a/b9b2/c4ae9b782e5313fa0627c652dae8abad.mp3",
      id: 1459128908,
      mv:0
    }],
    activeSongsIndex: 0,
    lastAudio: {}
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
    // 添加总歌曲列表
    setaudioList(audioList: any) {
      this.audioLists.push(audioList)
    },
    // 重复的歌曲就立即播放
    setActiveSongsIndex(id:number) {
      for (let i = 0, iLen = this.audioLists.length; i < iLen; i++) {
        if (this.audioLists[i].id == id) {
          this.activeSongsIndex = i
        }
      }
      // console.log(this.activeSongsIndex);
    },
    // 删除歌曲
    deleteSongsDetail(id:number) {
      for (let i = 0, iLen = this.audioLists.length; i < iLen; i++) {
        if (this.audioLists[i].id === id) {
          this.audioLists.splice(i,1)
        }
      }
    },
    // 防止歌曲过期，针对防盗链
    resetAudioList(audioLists: any) {
      // console.log(audioLists)
      this.audioLists.map((item) => {
        item.id === audioLists.id ? item.url=audioLists.url : item.url
      })
      
    }
  }
})
