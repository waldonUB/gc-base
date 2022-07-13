import { defineConfig } from 'vite'
import { resolve, join } from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~@': join(__dirname, './src'),
      '@': join(__dirname, './src'),
      '~': join(__dirname, './src/assets'),
      vue: 'vue/dist/vue.esm-bundler.js',
    },
  },
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  build: {
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'vue-router'],
          antdv: ['ant-design-vue'],
        },
        chunkFileNames: (chunkInfo) => {
          if (chunkInfo.facadeModuleId?.includes('/views/')) {
            const nameArr = chunkInfo.facadeModuleId.split('/')
            const name = nameArr[nameArr.length - 2]
            console.log('name.[hash]: ', name)
            console.log('chunkInfo.name: ', chunkInfo)
            // return `assets/${name}.js`
          }
          return 'assets/v1_[name].[hash].js'
        },
      },
    },
  },
})
