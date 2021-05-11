
const state = {
  comList: [],
  indexCurrent: 0

}
const getters = {
  gettersComList: state.comList
}
const actions = {
  setActionsCom: ({ commit }, data) => {
    commit('setMutationsCom', data)
  },
  setIndexCurent ({ commit }, data) {
    debugger
    commit('setMutationsIndexCurent', data)
  }
}
const mutations = {
  setMutationsCom: (state, data) => {
    state.comList = data
  },
  setMutationsIndexCurent (state, data) {
    state.indexCurrent = data
  }
}
export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
