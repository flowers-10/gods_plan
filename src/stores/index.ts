import { defineStore } from 'pinia'
import { toRaw } from 'vue'
import { setSession } from '../utils/session'

export const useStore = defineStore({
  id: 'counter',
  state: () => ({
    userStore: {
      online: false,
      userinfo: [],
      userlist: [],
      useravatar: "",
    }
  }),
  actions: {
    // 用户在线状态
    userOnlineActions(online: boolean) {
      this.userStore.online = online
      // window.sessionStorage.setItem("userStore",this.userStore)
    },
    // 用户信息
    userInfoActions(userinfo: any) {
      this.userStore.userinfo = userinfo
      this.userStore.online = true
      setSession('userStore',toRaw(this.userStore))
    }

  }
})
