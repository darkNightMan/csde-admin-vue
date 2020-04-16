
import tabpages from '../../router/tabpage.js'
const state = {
  tabViewList: [
    {
      path: 'home',
      component: tabpages.home,
      res_name: '首页',
      closeTabs: false, // 默认首页不能关闭
      index: '首页'
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
    window.localStorage.setItem('viewAndIndex', JSON.stringify(viewAndIndex)) // 存储当前打开的页面
    state.activeViewName = viewAndIndex.view.res_id.toString() // 标签导航索引
    state.menuIndex = viewAndIndex.menuIndex // 左边菜单索引
    if (state.tabViewList.some(v => v.id === viewAndIndex.view.res_id)) return false // 如果已经打开过的标签不做就不在push
    state.tabViewList.push(
      Object.assign({}, viewAndIndex.view, {
        title: viewAndIndex.view.res_name || 'new View',
        index: viewAndIndex.view.res_id.toString(),
        closeTabs: true, // 是否显示关闭标签
        component: tabpages[viewAndIndex.view.component], // 当前打开的页面
        id: viewAndIndex.view.res_id, // 菜单id
        menuIndex: viewAndIndex.menuIndex // 存储当前的打开的menu 索引
      })
    )
  },
  // 切换菜单索引
  setMenuIndex (state, index) {
    // window.localStorage.setItem('menuIndex', index)
    state.menuIndex = index
  },
  // 关闭tab页面
  closeTabs (state, targetName) {
    state.tabViewList.map((its, idx) => {
      if (its.index === targetName) {
        const tabs = state.tabViewList[idx - 1]
        state.activeViewName = tabs.index // 激活tab选中状态
        state.menuIndex = tabs.menuIndex // 激活菜单选中状态
      }
    })
    state.tabViewList = state.tabViewList.filter((item) => item.index !== targetName) // 过滤关闭掉tab
  },
  // 切换标签
  setActiveTab (state, name) {
    // window.localStorage.setItem('activeViewName', name)
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
