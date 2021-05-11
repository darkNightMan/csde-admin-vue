// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import VueCropper from 'vue-cropper'
// import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/common.css'
import 'mavon-editor/dist/css/index.css'
import iconPicker from 'vue-fontawesome-elementui-icon-picker'
import Req from './request/http'
import JsonViewer from 'vue-json-viewer'
import myComponents from './components'
import mavonEditor from 'mavon-editor'
import perms from './utils/perms'
import hightLight from './utils/hightLight'
import echarts from 'echarts'
import vuedraggable from 'vuedraggable'
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.component('vuedraggable', vuedraggable)
Vue.use(hightLight) // 代码高亮
Vue.use(mavonEditor) // 富文本
Vue.use(ElementUI) // 引入饿了么主题
Vue.use(iconPicker) // icon
Vue.use(VueCropper) // 图片剪切
Vue.use(myComponents) // 自己的组件
Vue.use(perms) //  权限
Vue.use(JsonViewer)
Vue.prototype.Req = new Req()
Vue.config.devtools = true
// 拦截登录，token验证
router.beforeEach(function (to, from, next) {
  var token = window.localStorage.getItem('token')
  if (!token) {
    if (to.path === '/login') {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  store: store,
  components: { App: App },
  template: '<App/>',
  created: function created () {
    this.$winDomResize() // 动态获取浏览器高度
  }
})
