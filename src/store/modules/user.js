import { api } from '@/request/api.js'

const state = {
  token: '',
  menu: null,
  userInfo: null
}
const getters = {
  token: state => state.token,
  userInfo: state => state.userInfo,
  menu: state => state.menu
}
const actions = {
  // 菜单
  async getMenuList ({commit, rootState}, userId) {
    // if (!rootState.user.menu) { // 如果内存中有菜单 将不发送请求
    let { data, code } = await this._vm.Req.get(api.menuList, {user_id: userId})
    // debugger
    if (code === 200) {
      commit('setMeunList', data.menuList)
    }
    // }
  }
}
const mutations = {
  setUserInfo (state, data) {
    debugger
    state.token = data.token
    state.userInfo = data.userInfo
  },
  setMeunList (state, data) {
    state.menu = data
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
