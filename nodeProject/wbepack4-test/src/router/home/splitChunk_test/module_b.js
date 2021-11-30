import Vue from 'vue'
import VueRouter from 'vue-router'
export const bar = function () {
  console.log('module_b的bar')
}
new Vue()
const router = new VueRouter()
