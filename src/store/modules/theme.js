
const state = {
  theme: {
    backGround: '#fff'
  }
}
const getters = {
  theme: state => state.theme
}
const actions = {
}
const mutations = {
  setTheme (state, data) {
    state.theme = Object.assign(state.theme, data || {})
  }
}
export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
