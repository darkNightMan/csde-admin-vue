
const state = {
  tableHeight: '',
  windowHeight: ''
}
const getters = {
  tableHeight: state => state.tableHeight,
  windowHeight: state => state.windowHeight
}
const actions = {
  winDonresize: ({ commit }, data) => {
    window.onresize = () => {
      let tableHeight = document.documentElement.clientHeight - 260
      let screenHeight = document.documentElement.clientHeight - 160
      commit('setTableHeight', tableHeight)
      commit('setWinHeight', screenHeight)
    }
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
