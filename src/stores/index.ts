import { defineStore } from 'pinia'
import { userPlaylist } from '@/api/api'

export const useStore = defineStore({
  id: 'CloudMusic',
  state: () => ({
    userinfo:
      { account: { id: '' }, profile: { avatarUrl: '', backgroundUrl: '' }, }
    ,
    userlist: {

    },
    uid: '',
    playListId:''
  }),
  actions: {
    // 用户信息
    userInfoActions(userinfo: any) {
      this.userinfo = userinfo
      // setLocalstorage('userStore',toRaw(this.userStore))
    },
    // 用户歌单列表
    async getUserPlaylist(uid: string) {
      const res: any = await userPlaylist(uid)
      this.userlist = res.playlist
    },
    // 用户歌单id
    getplayListId(id: string) {
      this.playListId = id
    }
  }
})
