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
})
