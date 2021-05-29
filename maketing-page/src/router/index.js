import Router from 'vue-router'
import Vue from 'vue'
import Test from '../components/test.vue'
import marketing from '../components/marketing.vue'
Vue.use(Router)
export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/marketing.html',
        name: 'marketing',
        component: marketing
      },
      {
        path: '/test.html',
        name: 'test',     
        component: Test
      },
    ]
  })
}
 

