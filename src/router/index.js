import Vue from 'vue'
import Router from 'vue-router'
const login = resolve => require(['@/pages/login'], resolve)
const test = resolve => require(['@/pages/test'], resolve)
const layout = resolve => require(['@/pages/layout/index'], resolve)
Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/layout',
      name: 'layout',
      component: layout
    }
  ]
})

// 拦截登录，token验证
router.beforeEach((to, from, next) => {
  debugger
  if (to.meta.requireAuth === undefined) {
    next()
    // if (store.state.token) {
    //   next()
    // } else {
    //   next({
    //     path: '/login'
    //   })
    // }
  } else {
    next()
  }
})

export default router
