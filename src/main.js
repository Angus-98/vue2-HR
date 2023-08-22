import Vue from 'vue'

// 样式重置 --> 解决在不同浏览器中标签样式不同的问题
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

// 图片发生错误的指令
Vue.directive('errImage', {
  inserted(el, binding) {
    // console.log('el ->', el)
    el.addEventListener('error', function() {
      // console.log('图片发生错误了')
      el.src = binding.value
    })
    // 判断el.src是否存在，如果存在不改变src的值，不存在则设置为默认图片地址
    el.src = el.src || binding.value
  }
})

// 注册全局组件
// import PageTools from '@/components/PageTools'
// Vue.component('PageTools', PageTools)

import Myplugin from '@/components/index'
Vue.use(Myplugin)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
