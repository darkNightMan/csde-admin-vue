
const state = {
  comList: [],
  comConfig: [],
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
    commit('setMutationsIndexCurent', data)
  },
  setActionsComConfig ({ commit }, data) {
    debugger
    commit('setMutationsComConfigt', data)
  }
}
const mutations = {
  setMutationsCom: (state, data) => {
    state.comList = data
  },
  setMutationsIndexCurent (state, data) {
    state.indexCurrent = data
  },
  setMutationsComConfig (state, data) {
    state.comConfig = data
  }
}
export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
