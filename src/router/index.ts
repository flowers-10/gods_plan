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
          redirect: '/music/mymusic',
          name: 'Music',
          component: () => import('../views/SweetHome/Music/index.vue'),
          children: [
            {
              path: '/music/mymusic',
              name: 'MyMusic',
              component: () => import('../views/SweetHome/Music/MyMusic/index.vue'),
            },
            {
              path: '/music/discovermusic',
              name: 'DiscoverMusic',
              component: () => import('../views/SweetHome/Music/DiscoverMusic/index.vue'),
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
            }
          ]
        },
        {
          path: '/discover',
          name: 'Discover',
          component: () => import('../views/SweetHome/Discover/index.vue'),
        }, {
          path: '/knowledge',
          name: 'Knowledge',
          component: () => import('../views/SweetHome/Knowledge/index.vue'),
        }
      ]
    },
  ]
})

export default router
