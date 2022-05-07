import { createApp, toRaw } from 'vue'
import { createPinia } from 'pinia'
import type { PiniaPluginContext } from 'pinia'

import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'

import 'element-plus/dist/index.css'

// pinia全局持久化
type Options = {
  key?: string
}

const __pinaiaKey__: string = 'unknown'

const setStorage = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value))
}
const getStorage = (key: string) => {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) as string) : {}
}

const piniaPlugin = (options: Options) => {
  // console.log(options)

  return (context: PiniaPluginContext) => {
    const { store } = context
    const data = getStorage(`${options?.key ?? __pinaiaKey__}-${store.$id}`)
    console.log(data);
    
    // 当store发生改变时，触发subscribe
    store.$subscribe(() => {
      // 把用户需要的key和内容存入到localStorage
      setStorage(`${options?.key ?? __pinaiaKey__}-${store.$id}`, toRaw(store.$state))
    })
    // console.log(context, 'context')
    return {
      ...data
    }
  }

}

const store = createPinia()
store.use(piniaPlugin({
  key: 'pinia'
}))

let app = createApp(App)

app.use(ElementPlus)
app.use(store)
app.use(router)

const whileList = ['/']
// 路由导航
router.beforeEach((to,from,next) => {
  let loginStatus = localStorage.getItem('pinia-CloudMusic')
  if(whileList.includes(to.path) || loginStatus) {
    next()
  }else {
    alert('请登录后访问~')
    next({
      path:'/'
    })
  }
})

app.mount('#app')
