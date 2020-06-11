import Vue from 'vue'
import Router from 'vue-router'
// import store from '../store'
const login = resolve => require(['@/pages/login/index'], resolve)
const layout = resolve => require(['@/pages/layout/index'], resolve)
const home = resolve => require(['@/pages/home/index'], resolve)
Vue.use(Router)

let router = new Router({
  base: '/csde_admin/',
  routes: [
    {
      path: '/login',
      name: 'login',
      hiddenMenu: true,
      component: login
    },
    {
      path: '/',
      name: '',
      redirect: '/home',
      hiddenMenu: true,
      component: layout,
      children: [
        {
          path: '/home',
          component: home
        }
      ]
    }
  ]
})

// 拦截登录，token验证
router.beforeEach((to, from, next) => {
  let token = window.localStorage.getItem('token')
  if (token) {
    next()
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  }
})

export default router
