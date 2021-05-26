
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import store from '@/store'
import Req from '@/request/http'
import router from './router'
import { installComponents } from '@/package'
Vue.config.productionTip = false
// 安装组件
installComponents(Vue)
Vue.use(ElementUI) // 引入饿了么主题
Vue.prototype.Req = new Req()
Vue.config.devtools = true
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  router: router,
  components: { App: App },
  template: '<App/>'
})
