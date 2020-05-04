
const state = {
  windowHeight: ''
}
const getters = {
  winH: state => state.windowHeight
}
const actions = {
  winDonresize: ({ commit }, data) => {
    window.onresize = () => {
      let screenHeight = document.documentElement.clientHeight - 260
      commit('setWinHeight', screenHeight)
    }
  }
}
const mutations = {
  setWinHeight: (state, data) => {
    state.windowHeight = data || document.documentElement.clientHeight - 260
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
