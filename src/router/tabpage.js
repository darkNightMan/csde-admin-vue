export default {
  home: resolve => require(['@/pages/home/index'], resolve),
  menuList: resolve => require(['@/pages/tabpage/syspage/menulist.vue'], resolve),
  userList: resolve => require(['@/pages/tabpage/syspage/sysUser.vue'], resolve),
  roleList: resolve => require(['@/pages/tabpage/syspage/roleList'], resolve),
  loginLogs: resolve => require(['@/pages/tabpage/logsPage/loginLogs'], resolve),
  test: resolve => require(['@/pages/tabpage/testPage/test'], resolve)
}
