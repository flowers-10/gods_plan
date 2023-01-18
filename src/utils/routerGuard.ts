import router from '../router'
import { ElMessage } from 'element-plus'
import { close, start } from '@/utils/nporgress'
import { useStore } from '@/stores'
import type { NewUserinfo } from '@/stores'


// 黑名单
const blacklist: string[] = ['/music/mymusic']
// 音乐菜单
const musicList:string[] = ['/music/mymusic','/music/myhome']
// 路由前置守卫导航
export const routerBeforeEach = router.beforeEach((to, from, next) => {
  const store = useStore()
  start()
  console.log(to.path);
  
  // 如果用户在首页并且已经存入登录信息则自动进入app
  if (to.path == '/' && store.userinfo.account.id) {
    next({
      path: '/app'
    })
  }
  else if (to.path == '/apps/updates') {
    if (store.userinfo.account.id == '350085381') {
      next()
    } else {
      next('/notfound')
    }
  }
  // 如果不在黑名单可以任意访问
  else if (!blacklist.includes(to.path)) {
    next()
  }
  else if ((<NewUserinfo>store.userinfo).token) {
    next()
  }
  // 没有登录信息则返回登录页面
  else {
    ElMessage.error('请登录后访问')
    next({
      path: '/'
    })
  }
  if (musicList.includes(to.path)) {
    store.AplayFlag = true
  }

  if (to.meta.title) {
    (document as any).title = to.meta.title
  } else {
    document.title = '热浪'
  }
})


// 路由全局后置守卫
export const routerAfterEach = router.afterEach(() => {
  close()
})