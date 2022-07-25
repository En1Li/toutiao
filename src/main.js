import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/fonts/iconfont.css'

import Vant from 'vant'
import 'vant/lib/index.css'

import 'amfe-flexible/index.min.js'
import mavonEditor from 'mavon-editor' // 引入mavon-editor 就是上面所安装的
import 'github-markdown-css/github-markdown.css'

import moment from 'moment'
Vue.use(mavonEditor) // 让Vue使用mavonEditor
Vue.config.productionTip = false
Vue.prototype.$moment = moment

Vue.use(Vant)
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
