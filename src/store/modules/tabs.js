// import home from '@/pages/home/index'
const home = resolve => require(['@/pages/home/index'], resolve)
console.log(home)
const state = {
  tabViewList: [
    {
      path: 'home',
      name: '首页',
      component: home
    }
  ],
  activeViewName: '首页',
  menuIndex: '0'
}
const getters = {
  activeItem: state => state.activeItem
}
const actions = {
  addView: ({ commit }, viewAndIndex) => {
    commit('setViewTab', viewAndIndex)
  }
}
const mutations = {
  setViewTab: (state, viewAndIndex) => {
    let index = `${viewAndIndex.view.name}_${new Date().getTime()}`
    state.activeViewName = index
    state.menuIndex = viewAndIndex.menuIndex
    if (state.tabViewList.some(v => v.path === viewAndIndex.view.path)) return
    state.tabViewList.push(
      Object.assign({}, viewAndIndex.view, {
        title: viewAndIndex.view.meta.title || 'new View',
        index: index,
        menuIndex: viewAndIndex.menuIndex // 存储当前的打开的menu 索引
      })
    )
  },
  // 切换菜单索引
  setMenuIndex (state, index) {
    state.menuIndex = index
  },
  // 切换标签
  setActiveTab (state, name) {
    debugger
    state.activeViewName = name
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
