
const state = {
  comList: [], // 组件集合
  uuid: 0,
  currentCom: {}
}
const getters = {
  gettersComList: state.comList,
  currentCom: state.currentCom
}
const actions = {
  // 添加组件
  addComponents ({ commit }, data) {
    commit('addComponentM', data)
  },
  // 当前编辑组件
  setCurrenUuid ({ commit }, uuid) {
    commit('setCurrenUuidM', uuid)
  },
  // 删除组件
  delComponent ({ commit }, uuid) {
    commit('delComponentM', uuid)
  }
}
const mutations = {
  delComponentM (state, data) {
    let res = state.comList.filter(i => i.uuid !== data.uuid)
    if (res.length === 0 || state.currentCom.uuid === data.uuid) {
      state.currentCom = []
    }
    state.comList = res
  },
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
