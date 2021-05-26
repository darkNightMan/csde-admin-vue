import Vue from 'vue'
import Router from 'vue-router'
import marketing from '../components/marketing'
Vue.use(Router)
let router = new Router({
  routes: [
    {
      path: '/',
      name: 'market',
      hiddenMenu: true,
      component: marketing
    }
  ]
})
export default router
