import Vue from 'vue'
import Router from 'vue-router'
const login = resolve => require(['@/pages/login/index'], resolve)
const test = resolve => require(['@/pages/test'], resolve)
const test2 = resolve => require(['@/pages/test2'], resolve)
const layout = resolve => require(['@/pages/layout/index'], resolve)
const home = resolve => require(['@/pages/home/index'], resolve)
Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      hiddenMenu: true,
      component: login
    },
    {
      path: '/test',
      name: 'test',
      hiddenMenu: true,
      component: test
    },
    {
      path: '/',
      name: 'home',
      redirect: '/home',
      hiddenMenu: true,
      component: layout,
      children: [
        {
          path: 'home',
          component: home,
          name: 'home'
        }
      ]
    },
    {
      path: '/article',
      name: '文章管理',
      component: layout,
      meta: { title: '文章管理' },
      children: [
        {
          path: 'list',
          component: test,
          name: '文章列表',
          url: '/article/list'
        },
        {
          path: 'test',
          url: '/article/test',
          component: test2,
          name: '测试页面'
        }
      ]
    }
  ]
})

// 拦截登录，token验证
router.beforeEach((to, from, next) => {
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
