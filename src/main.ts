// 引入工具
import { createApp } from 'vue'
import { filterformat } from './utils/filterformat'
import { createPinia } from 'pinia'
import { piniaPlugin } from './utils/piniaPlugin'

import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { ElMessage } from 'element-plus'

// 引入全局组件
import MainHeader from '@/components/MainHeader/index.vue'
import ContentSection from '@/components/ContentSection/index.vue'

// 使用pinia持久化插件
const store = createPinia()
store.use(piniaPlugin({
  key: 'pinia'
}))

let app = createApp(App)


type Filter = {
  formatTime: <T extends any>(str: T) => T
}
// 声明要扩充@vue/runtime-core包的声明.
// 这里扩充"ComponentCustomProperties"接口, 因为他是vue3中实例的属性的类型.
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $filters: Filter
  }
}

// 全局的过滤器
app.config.globalProperties.$filters = filterformat


app.use(ElementPlus)
app.use(store)
app.use(router)

// 白名单
const whileList = ['/', '/apps/allapps', '/apps/updates', '/music/myhome', '/music/playlistdetail/3136952023']
// 路由导航
router.beforeEach((to, from, next) => {
  let loginStatus = localStorage.getItem
    ('token')
  // console.log(to.path);

  // 如果用户在首页并且已经存入登录信息则自动进入music
  if (to.path == '/' && loginStatus) {
    // console.log(112);
    next({
      path: '/music'
    })

  }
  // 如果访问在白名单可以任意通行
  if (whileList.includes(to.path)) {
    next()
    // 或者已经登录可以任意通行
  } else if (loginStatus) {
    next()
  }
  // 没有登录信息则返回登录页面
  else {
    ElMessage.error('请登录后访问')
    next({
      path: '/'
    })
  }

})

// 链式调用
app.component('main-header', MainHeader).component('content-section', ContentSection).mount('#app')
