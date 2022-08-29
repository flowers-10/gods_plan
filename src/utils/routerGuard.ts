import router from '../router'
import { ElMessage } from 'element-plus'
import { close, start } from '@/utils/nporgress'

// 黑名单
const blacklist:string[] = ['/music/mymusic']
// 路由前置守卫导航
export const routerBeforeEach = router.beforeEach((to, from, next) => {
  start()
  let loginStatus = localStorage.getItem
    ('token')
  let phone = localStorage.getItem('phone')
  // 如果用户在首页并且已经存入登录信息则自动进入app
  if (to.path == '/' && loginStatus) {
    next({
      path: '/app'
    })
  }
  else if (to.path == '/apps/updates' ) {
    if(phone == '18367146505') {
      next()
    }else {
      next('/notfound')
    }
  }
  // 如果不在黑名单可以任意访问
  else if (!blacklist.includes(to.path)) {  
    next()
  } 
  else if (loginStatus) {
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


// 路由全局后置守卫
export const routerAfterEach =  router.afterEach(() =>{
  close()
})