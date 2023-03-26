import { defineConfig } from 'vite'
import { resolve, join } from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
const customPlugin = function () {
  const load = function (params) {
    console.log('load: ', params)
  }
  const transformBundle = function (code) {
    return code.replace('_lazy.js', '_lazy.js?v=123456')
  }

  return {
    name: 'rollup-plugin-add-version',
    // load,
    transformBundle,
  }
}

const inputDir = resolve(__dirname, './src/views/newAttrs')

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
      input: {},
      output: {
        manualChunks: {
          vue: ['vue', 'vue-router'],
          antdv: ['ant-design-vue'],
        },
        chunkFileNames: (chunkInfo) => {
          console.log('chunkInfo: ', chunkInfo.name)

          if (chunkInfo.facadeModuleId?.includes('/views/')) {
            const nameArr = chunkInfo.facadeModuleId.split('/')
            const name = nameArr[nameArr.length - 2]
            // console.log('name.[hash]: ', name)
            // console.log('chunkInfo.name: ', chunkInfo)
            return `assets/${name}_lazy.js`
          }
          return 'assets/[name].[hash].js'
        },
      },
      plugins: [customPlugin()],
    },
  },
  server: {
    host: true,
    port: 8010,
  },
})
