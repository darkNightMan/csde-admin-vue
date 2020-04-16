
const state = {
  windowHeight: ''
}
const getters = {
  winH: state => state.windowHeight
}
const actions = {
}
const mutations = {
  setWinHeight: (state, data) => {
    state.windowHeight = data || document.documentElement.clientHeight - 300
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
