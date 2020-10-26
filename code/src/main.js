import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import VCharts from 'v-charts'

import '@/styles/index.scss' // global css
import '@/styles/common.scss' // global css
import '@/styles/reset.scss' // reset css

import '@/assets/icon/iconfont.css' // svg



import App from './App'
import router from './router'
import store from './store'

import Utils from '@/utils/ctUtils.js'
Vue.prototype.$utils = Utils


import '@/permission' // permission control


// 导入excel表
import XLSX from 'xlsx'
Vue.use(XLSX)

Vue.use(ElementUI, { locale })
Vue.use(VCharts)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
