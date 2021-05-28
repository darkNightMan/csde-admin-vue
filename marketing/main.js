
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import {createStore} from '@/store'
import Req from '@/request/http'
import {createRouter} from './router'
import { installComponents } from '@/package'
import vuedraggable from 'vuedraggable'
Vue.component('vuedraggable', vuedraggable)
Vue.config.productionTip = false
// 安装组件
installComponents(Vue)
Vue.use(ElementUI) // 引入饿了么主题
Vue.prototype.Req = new Req()
Vue.config.devtools = true
/* eslint-disable no-new */

export function createApp () {
  const store = createStore()
  const router = createRouter()
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  return {app, store, router}
}
