export default {
  home: resolve => require(['@/pages/home/index'], resolve),
  userCenter: resolve => require(['@/pages/tabpage/user/index'], resolve),
  menuList: resolve => require(['@/pages/tabpage/syspage/menulist.vue'], resolve),
  userList: resolve => require(['@/pages/tabpage/syspage/sysUser.vue'], resolve),
  roleList: resolve => require(['@/pages/tabpage/syspage/roleList'], resolve),
  loginLogs: resolve => require(['@/pages/tabpage/logsPage/loginLogs'], resolve),
  operationLogs: resolve => require(['@/pages/tabpage/logsPage/operationLogs'], resolve),
  blogArticleList: resolve => require(['@/pages/tabpage/blogPage/blogArticleList'], resolve),
  blogArticleDetail: resolve => require(['@/pages/tabpage/blogPage/blogArticleDetail'], resolve),
  blogClassList: resolve => require(['@/pages/tabpage/blogPage/blogClassList'], resolve),
  blogTagsList: resolve => require(['@/pages/tabpage/blogPage/blogTagsList'], resolve),
  test: resolve => require(['@/pages/tabpage/testPage/test'], resolve)
}
