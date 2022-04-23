import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0',
    port: 8081,
    proxy: {
      '/api': {
        changeOrigin: true,
        target: 'http://124.223.168.27:8889',
        rewrite: path => path.replace(/^\/api/, '')
      },
      '/backstage': {
        changeOrigin: true,
        target: 'http://124.223.168.27:8887',
        rewrite: path => path.replace(/^\/backstage/, '')
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
