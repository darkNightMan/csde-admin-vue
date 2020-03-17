
const state = {
  token: '',
  menu: null,
  userInfo: null
}
const getters = {
  token: state => state.token
}
const actions = {
  // 打开一个页面

}
const mutations = {
  setToken (state, token) {
    debugger
    state.token = token
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
