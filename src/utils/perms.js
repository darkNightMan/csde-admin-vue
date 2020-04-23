import store from '../store'
export default {
  install (Vue, options) {
    Vue.directive('has', {
      bind: function (el, binding, vnode) {
        debugger
      },
      inserted: function (el, binding) {
        debugger
        console.log(el)
        if (!permissionJudge(binding.value)) {
          el.parentNode.removeChild(el)
        }
      }
    })
  }
}
function permissionJudge (value) {
  debugger
  // 此处store.getters.getMenuBtnList代表vuex中储存的按钮菜单数据
  let list = store.getters.getMenuBtnList
  for (let item of list) {
    if (item.permission === value) {
      return true
    }
  }
  return false
}
