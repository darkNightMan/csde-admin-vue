
const state = {
  tableHeight: '',
  windowHeight: ''
}
const getters = {
  tableHeight: state => state.tableHeight,
  windowHeight: state => state.windowHeight
}
const actions = {
  winDomResize: ({ commit }, data) => {
    let resizeTimer = null
    let setHeight = () => {
      let tableHeight = document.documentElement.clientHeight - 260
      let screenHeight = document.documentElement.clientHeight - 160
      commit('setTableHeight', tableHeight)
      commit('setWinHeight', screenHeight)
    }
    commit('setTableHeight') // 初始化table高度
    commit('setWinHeight') // 初始化浏览器设备高度
    const onresize = () => {
      if (resizeTimer) clearTimeout(resizeTimer) // 防止事件多次调用问题
      resizeTimer = setTimeout(() => {
        console.log('onresize')
        setHeight()
      }, 300)
    }
    window.addEventListener('resize', onresize)
  }
}
const mutations = {
  setTableHeight: (state, data) => {
    state.tableHeight = data || document.documentElement.clientHeight - 260
  },
  setWinHeight: (state, data) => {
    state.windowHeight = data || document.documentElement.clientHeight - 160
  }
}
export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
