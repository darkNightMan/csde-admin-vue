export default {
  home: resolve => require(['@/pages/home/index'], resolve),
  menuList: resolve => require(['@/pages/tabpage/syspage/menulist.vue'], resolve),
  userList: resolve => require(['@/pages/tabpage/syspage/sysUser.vue'], resolve),
  roleList: resolve => require(['@/pages/tabpage/syspage/roleList'], resolve)
}
