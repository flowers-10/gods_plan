import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'Wel',
      component: () => import('../views/Wel/index.vue'),
      meta: {
        title: '热浪 - 欢迎您登录'
      }
    },
    {
      path: '/app',
      redirect: '/apps',
      name: 'SweetHome',
      component: () => import('../views/SweetHome/index.vue'),
      children: [
        {
          path: '/apps',
          redirect: '/apps/allapps',
          name: 'Apps',
          component: () => import('../views/SweetHome/Apps/index.vue'),
          children: [
            {
              path: '/apps/allapps',
              name: 'AllApps',
              component: () => import('../views/SweetHome/Apps/AllApps/index.vue'),
              meta: {
                title: '热浪 - 无处不在'
              },
            },
            {
              path: '/apps/setup',
              name: 'Setup',
              component: () => import('../views/SweetHome/Apps/Setup/index.vue'),
              meta: {
                title: '热浪 - 设置'
              },
            },
            {
              path: '/apps/games',
              name: 'Games',
              component: () => import('../views/SweetHome/Apps/Games/index.vue'),
              meta: {
                title: '热浪 - 小游戏集合'
              },
            },
            {
              path: '/apps/animegirl',
              name: 'AnimeGirl',
              component: () => import('../views/SweetHome/Apps/AnimeGirl/index.vue'),
              meta: {
                title: '热浪 - 二次元女孩 - 养成系统'
              },
            },
            {
              path: '/apps/echartmap',
              name: 'EchartMap',
              component: () => import('../views/SweetHome/Apps/EchartMap/index.vue'),
              meta: {
                title: '热浪 - 数据可视化大屏 - 杭州入驻体系'
              },
            },
            {
              path: '/apps/sse',
              name: 'SSE',
              component: () => import('../views/SweetHome/Apps/SSE/index.vue'),
              meta: {
                title: 'SSE'
              },
            },
            {
              path: '/apps/updates',
              name: 'Updates',
              component: () => import('../views/SweetHome/Apps/Updates/index.vue'),
              meta: {
                title: '热浪 - 文章更新'
              },
            },
            {
              path: '/apps/signcross',
              name: 'Signcross',
              component: () => import('../views/SweetHome/Apps/IframeP/index.vue'),
              meta: {
                title: '单点登录'
              },
            },
          ],
        },
        {
          path: '/music',
          redirect: '/music/myhome',
          name: 'Music',
          component: () => import('../views/SweetHome/Music/index.vue'),
          children: [
            {
              path: '/music/audiolist',
              name: 'AudioList',
              component: () => import('../views/SweetHome/Music/AudioList/index.vue'),
              meta: {
                title: '热浪 - 播放列表'
              },
            },
            {
              path: '/music/Album/:id',
              name: 'Album',
              component: () => import('../views/SweetHome/Music/Album/index.vue'),
            },
            {
              path: '/music/MV/:id',
              name: 'MV',
              component: () => import('../views/SweetHome/Music/MV/index.vue'),
            },
            {
              path: '/music/artist/:id',
              name: 'Artist',
              component: () => import('../views/SweetHome/Music/Artists/Artist/index.vue'),
            },
            {
              path: '/music/artists',
              name: 'Artists',
              component: () => import('../views/SweetHome/Music/Artists/index.vue'),
              meta: {
                title: '热浪 - 歌手排行榜'
              },
            },
            {
              path: '/music/mymusic',
              name: 'MyMusic',
              component: () => import('../views/SweetHome/Music/MyMusic/index.vue'),
            },
            {
              path: '/music/playlistsquare',
              name: 'PlaylistSquare',
              component: () => import('../views/SweetHome/Music/PlaylistSquare/index.vue'),
              meta: {
                title: '热浪 - 歌单广场'
              },
            },
            {
              path: '/music/myhome',
              name: 'MyHome',
              component: () => import('../views/SweetHome/Music/MyHome/index.vue'),
              meta: {
                title: '热浪 - 音乐就是记忆'
              },
            },
            {
              path: '/music/playlistdetail/:id',
              name: 'PlayListDetail',
              component: () => import('../views/SweetHome/Music/PlayListDetail/index.vue'),
            },
            {
              path: '/music/topcharts',
              name: 'TopCharts',
              component: () => import('../views/SweetHome/Music/TopCharts/index.vue'),
              meta: {
                title:'热浪 - 排行榜'
              },

            },
          ]
        },
        {
          path: '/discover',
          name: 'Discover',
          component: () => import('../views/SweetHome/Discover/index.vue'),
          meta: {
            title:'热浪 - 人生像攀登一座山，而找寻出路却是一种学习的过程'
          },
        },
        {
          path: '/knowledge',
          name: 'Knowledge',
          component: () => import('../views/SweetHome/Knowledge/index.vue'),
          meta: {
            title:'热浪 - 开卷有益，路漫漫其修远兮'
          },
        },
        
      ]
    },
    {
      path: '/games/draw',
      name: 'Draw',
      component: () => import('../views/Games/GoodChat/index.vue'),
      meta: {
        title: '热浪 - 你画我猜'
      },
    },
    {
      path: '/games/animalChecker',
      name: 'AnimalChecker',
      component: () => import('../views/Games/AnimalChecker/index.vue'),
      meta: {
        title: '热浪 - 斗兽棋'
      },
    },
    {
      path: '/games/turnChess',
      name: 'TurnChess',
      component: () => import('../views/Games/TurnChess/index.vue'),
      meta: {
        title: '热浪 - 斗兽棋'
      },
    },
    {
      path: '/:cathchAll(.*)',
      name: 'NotFound',
      component: () => import('../views/NotFound/index.vue'),
      meta: {
        title:'热浪 - 404 Not Found'
      },
    },
    {
      path: '/knowledge/Article/:id',
      name: 'Article',
      component: () => import('../views/SweetHome/Knowledge/Article/index.vue'),
    },
    {
      path: '/demo',
      name: 'demo',
      component: () => import('../views/Demomo/index.vue')
    }
  ]
})

export default router
