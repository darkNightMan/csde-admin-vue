
export default {
  install (Vue, options) {
    Vue.directive('hasAuth', {
      bind: function (el, binding, vnode) {
      },
      inserted: function (el, binding, vnode) {
        // vuex中储存的按钮菜单数据
        let perms = vnode.context.$store.getters['user/perms']
        if (!permissionJudge(binding.value, perms)) {
          el.parentNode.removeChild(el)
        }
      }
    })
  }
}
function permissionJudge (value, perms) {
  for (let item of perms) {
    if (item === value) {
      return true
    }
  }
  return false
}
