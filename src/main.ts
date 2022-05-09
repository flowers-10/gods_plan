// 引入工具
import { createApp, toRaw } from 'vue'

import { createPinia } from 'pinia'
import type { PiniaPluginContext } from 'pinia'

import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 引入全局组件
import MainHeader from '@/components/MainHeader/index.vue'

// pinia全局持久化
type Options = {
  key?: string
}

const __pinaiaKey__: string = 'unknown'
// 存键值对
const setStorage = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value))
}
// 取键值对
const getStorage = (key: string) => {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) as string) : {}
}

// 持久化插件
const piniaPlugin = (options: Options) => {
  // console.log(options)

  return (context: PiniaPluginContext) => {
    const { store } = context
    const data = getStorage(`${options?.key ?? __pinaiaKey__}-${store.$id}`)
    // console.log(data);

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

// 白名单
const whileList = ['/']
// 路由导航
router.beforeEach((to, from, next) => {
  let loginStatus = localStorage.getItem
    ('pinia-CloudMusic')
  // 如果用户在首页并且已经存入登录信息则自动进入music
  if (to.path == '/' && loginStatus) {
    console.log(112);
    next({
      path: '/music'
    })

  }
  // 如果用户在白名单并且已经存入登录信息则可以任意通行
  else if (whileList.includes(to.path) || loginStatus) {
    next()
  }
  // 如果没有登录信息则返回登录页面
  else {
    alert('请登录后访问~')
    next({
      path: '/'
    })
  }

})

// 链式调用
app.component('main-header', MainHeader).mount('#app')
