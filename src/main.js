// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import './assets/css/common.css'
// import { Tree } from 'view-design'
import 'element-ui/lib/theme-chalk/index.css'
import iconPicker from 'vue-fontawesome-elementui-icon-picker'
import Req from './request/http'
import { mapMutations } from 'vuex'
import perms from './utils/perms'

Vue.config.productionTip = false
// console.log(Tree)
// Vue.component('Tree', Tree)
Vue.use(ElementUI) // 引入饿了么主题
Vue.use(iconPicker)
Vue.use(perms)
Vue.prototype.Req = new Req()
Vue.directive('test', {
  inserted (el) {
    debugger
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    this.setWinHeight()
  },
  methods: {
    ...mapMutations('app', ['setWinHeight'])
  }
  // directives: {
  //   c: {
  //     inserted (el, bindings, vnode) {
  //       debugger
  //       let value = bindings.value
  //       // 在vuex中查看是否有按钮权限
  //       let flag = vnode.context.$store.state.perms[value]
  //       // 如果没有全选则将按钮删除即可
  //       !flag && el.parentNode.removeChild(el)
  //     }
  //   }
  // }
})
