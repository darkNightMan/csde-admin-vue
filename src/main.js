// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import './assets/css/common.css'
import 'element-ui/lib/theme-chalk/index.css'
import iconPicker from 'vue-fontawesome-elementui-icon-picker'
import Req from './request/http'
import { mapMutations } from 'vuex'
import tabsComponent from './components/common/tabsCom'
import perms from './utils/perms'

Vue.config.productionTip = false

Vue.use(ElementUI) // 引入饿了么主题
Vue.use(iconPicker)
Vue.use(tabsComponent)
Vue.use(perms)
Vue.prototype.Req = new Req()
/* eslint-disable no-new */
let vue = new Vue({
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
})
console.log(vue)
