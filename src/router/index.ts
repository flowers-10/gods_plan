import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Wel',
      component: () => import('../views/Wel/index.vue'),
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
            },
            {
              path: '/apps/updates',
              name: 'Updates',
              component: () => import('../views/SweetHome/Apps/Updates/index.vue')
            }
          ],
        },
        {
          path: '/music',
          redirect: '/music/myhome',
          name: 'Music',
          component: () => import('../views/SweetHome/Music/index.vue'),
          children: [
            {
              path: '/music/mymusic',
              name: 'MyMusic',
              component: () => import('../views/SweetHome/Music/MyMusic/index.vue'),
            },
            {
              path: '/music/playlistsquare',
              name: 'PlaylistSquare',
              component: () => import('../views/SweetHome/Music/PlaylistSquare/index.vue'),
            },
            {
              path: '/music/myhome',
              name: 'MyHome',
              component: () => import('../views/SweetHome/Music/MyHome/index.vue'),
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
            },
          ]
        },
        {
          path: '/discover',
          name: 'Discover',
          component: () => import('../views/SweetHome/Discover/index.vue'),
        }, 
        {
          path: '/knowledge',
          name: 'Knowledge',
          component: () => import('../views/SweetHome/Knowledge/index.vue'),
        },
        {
          path:'/knowledge/Article/:id',
          name: 'Article',
          component: () => import('../views/SweetHome/Knowledge/Article/index.vue'),
        }
      ]
    },
    {
      path: '/:cathchAll(.*)',
      name: 'NotFound',
      component: () => import('../views/NotFound/index.vue')
    },
    {
      path: '/demo',
      name: 'demo',
      component: () => import('../views/Demomo/index.vue')
    }
  ]
})

export default router
