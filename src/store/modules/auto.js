
const state = {
  comList: [],
  uuid: 0,
  currentCom: {}
}
const getters = {
  gettersComList: state.comList,
  currentCom: state.currentCom
}
const actions = {
  addComponents ({ commit }, data) {
    commit('addComponentM', data)
  },
  setCurrenUuid ({ commit }, uuid) {
    commit('setCurrenUuidM', uuid)
  }
}
const mutations = {
  addComponentM (state, data) {
    state.uuid = data.uuid
    state.currentCom = data
    state.comList.push(data)
  },
  setCurrenUuidM (state, uuid) {
    state.uuid = uuid
    state.currentCom = state.comList.find((x) => {
      return x.uuid === uuid
    })
  }
}
export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
