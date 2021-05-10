
const state = {
  comList: []

}
const getters = {
  getters: state.comList
}
const actions = {
  setCom: ({ commit }, data) => {
    commit('setMutationsCom', data)
  }
}
const mutations = {
  setMutationsCom: (state, data) => {
    state.comList = data
  }
}
export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
