import { defineStore } from 'pinia'
import { toRaw } from 'vue'
// import { setLocalstorage } from '../utils/local'

export const useStore = defineStore({
  id: 'CloudMusic',
  state: () => ({
    userinfo: [],
    userlist: [],
    useravatar: "",
    count: 0
  }),
  actions: {
    // 用户信息
    userInfoActions(userinfo: any) {
      console.log('登录传参', userinfo)
      this.userinfo = userinfo
      // setLocalstorage('userStore',toRaw(this.userStore))
    },
    countUp() {
      this.count++
    }
  }
})
