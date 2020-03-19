
const home = resolve => require(['@/pages/home/index'], resolve)
const state = {
  tabViewList: [
    {
      path: 'home',
      component: home,
      res_name: '首页',
      closeTabs: false // 默认首页不能关闭
    }
  ],
  activeViewName: '首页', // 当前打开的 tab名字
  menuIndex: '0' // 当前菜单打开的索引
}
const getters = {
  activeItem: state => state.activeItem
}
const actions = {
  // 打开一个页面
  addView: ({ commit }, viewAndIndex) => {
    commit('setViewTab', viewAndIndex)
  }
}
const mutations = {
  // 打开tab页面
  setViewTab: (state, viewAndIndex) => {
    debugger
    let index = `${viewAndIndex.view.res_name}_${new Date().getTime()}`
    state.activeViewName = viewAndIndex.view.res_id // 标签导航索引
    state.menuIndex = viewAndIndex.menuIndex // 左边菜单索引
    if (state.tabViewList.some(v => v.id === viewAndIndex.view.res_id)) return
    state.tabViewList.push(
      Object.assign({}, viewAndIndex.view, {
        title: viewAndIndex.view.res_name || 'new View',
        index: index,
        closeTabs: true,
        id: viewAndIndex.view.res_id,
        menuIndex: viewAndIndex.menuIndex // 存储当前的打开的menu 索引
      })
    )
  },
  // 切换菜单索引
  setMenuIndex (state, index) {
    state.menuIndex = index
  },
  // 关闭tab页面
  closeTabs (state, targetName) {
    state.tabViewList.map((its, idx) => {
      if (its.index === targetName) {
        let tabs = state.tabViewList[idx - 1]
        state.activeViewName = tabs.index // 激活tab选中状态
        state.menuIndex = tabs.menuIndex // 激活菜单选中状态
      }
    })
    state.tabViewList = state.tabViewList.filter((item) => item.index !== targetName) // 过滤关闭掉tab
  },
  // 切换标签
  setActiveTab (state, name) {
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
