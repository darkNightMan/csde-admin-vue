
const state = {
  comList: [],
  comConfig: [],
  indexCurrent: 0,
  currentCom: {}
}
const getters = {
  gettersComList: state.comList,
  currentCom: state.currentCom
}
const actions = {
  setActionsCom: ({ commit }, data) => {
    commit('setMutationsCom', data)
  },
  setIndexCurent ({ commit }, data) {
    commit('setMutationsIndexCurent', data)
  },
  setActionsComConfig ({ commit }, data) {
    commit('setMutationsComConfigt', data)
  },
  setActionscurrentCom ({ commit }, data) {
    commit('setsetMutationsComcurrentCom', data)
  }
}
const mutations = {
  setsetMutationsComcurrentCom (state, data) {
    debugger
    state.currentCom = data
  },
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
