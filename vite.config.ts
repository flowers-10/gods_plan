import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// 插件
import { fileURLToPath, URL } from 'url'
// import { visualizer } from 'rollup-plugin-visualizer';
// import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    // visualizer({ open: false }),
    // VitePWA({
    //   workbox: {
    //     // ignoreURLParametersMatching: [/.*/],
    //     cacheId: 'wisbayar-cache',
    //     globPatterns: [],
    //     // globIgnores: ['static/js/**'],
    //     navigateFallback: null,
    //     runtimeCaching: [
    //       {
    //         urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
    //         handler: 'CacheFirst',
    //         options: {
    //           cacheName: 'wisbayar-images',
    //           expiration: {
    //             // 最多30个图
    //             maxEntries: 50
    //           }
    //         }
    //       },
    //       {
    //         urlPattern: /.*\.js.*/,
    //         handler: 'StaleWhileRevalidate',
    //         options: {
    //           cacheName: 'wisbayar-js',
    //           expiration: {
    //             maxEntries: 50, // 最多缓存30个，超过的按照LRU原则删除
    //             maxAgeSeconds: 30 * 24 * 60 * 60
    //           },
    //           cacheableResponse: {
    //             statuses: [200]
    //           }
    //         }
    //       },
    //       {
    //         urlPattern: /.*\.css.*/,
    //         handler: 'StaleWhileRevalidate',
    //         options: {
    //           cacheName: 'wisbayar-css',
    //           expiration: {
    //             maxEntries: 50,
    //             maxAgeSeconds: 30 * 24 * 60 * 60
    //           },
    //           cacheableResponse: {
    //             statuses: [200]
    //           }
    //         }
    //       },
    //       {
    //         urlPattern: /.*\.html.*/,
    //         handler: 'StaleWhileRevalidate',
    //         options: {
    //           cacheName: 'wisbayar-html',
    //           expiration: {
    //             maxEntries: 50,
    //             maxAgeSeconds: 30 * 24 * 60 * 60
    //           },
    //           cacheableResponse: {
    //             statuses: [200]
    //           }
    //         }
    //       }
    //     ]
    //   },
    //   // 取消注册
    //   selfDestroying: false
    // })
  ],
  build: {
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  define: {
    'process.env': {}
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0',
    port: 8080,
    proxy: {
      // '/api': {
      //   changeOrigin: true,
      //   target: 'http://124.223.168.27:8889',
      //   rewrite: path => path.replace(/^\/api/, '')
      // },
      '/backstage': {
        changeOrigin: true,
        target: 'http://124.223.168.27:8887',
        rewrite: path => path.replace(/^\/backstage/, '')
      },
      '/cloudmusic': {
        changeOrigin: true,
        target: 'http://localhost:3000',
        rewrite: path => path.replace(/^\/cloudmusic/, '')
      }
    },
  },
  // css: {
  //   // css预处理器
  //   preprocessorOptions: {
  //     less: {
  //       charset: false,
  //       additionalData: '@import "./src/assets/style/global.less";',
  //     },
  //    },
  // },
})
