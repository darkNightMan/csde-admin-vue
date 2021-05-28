import Vue from 'vue'
import Router from 'vue-router'
import marketing from '../components/marketing'
Vue.use(Router)
export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/marketing.html',
        name: 'marketing',
        component: marketing
      }
    ]
  })
}
