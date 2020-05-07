// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import VueCropper from 'vue-cropper'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/common.css'
import iconPicker from 'vue-fontawesome-elementui-icon-picker'
import Req from './request/http'
import JsonViewer from 'vue-json-viewer'
import { mapActions, mapMutations } from 'vuex'
import myComponents from './components'
import perms from './utils/perms'
Vue.config.productionTip = false
Vue.use(ElementUI) // 引入饿了么主题
Vue.use(iconPicker) // icon
Vue.use(VueCropper) // 图片剪切
Vue.use(myComponents) // 自己的组件
Vue.use(perms)
Vue.use(JsonViewer)
Vue.prototype.Req = new Req()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    this.winDonresize()
    this.setWinHeight()
  },
  methods: {
    ...mapActions('app', ['winDonresize']),
    ...mapMutations('app', ['setWinHeight'])
  }
})
