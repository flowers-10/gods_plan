import { defineStore } from 'pinia'

export const useStore = defineStore({
  id: 'CloudMusic',
  state: () => ({
    userinfo:
      { account: { id: '' }, profile: { avatarUrl: ''}, }
    ,
    uid: '',
    playListId:'3136952023'
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
    }
  }
})
