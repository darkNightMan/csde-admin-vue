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
  async userInfoMenu ({commit, dispatch, state, rootState}) {
    // if (!rootState.user.menu) { // 如果内存中有菜单 将不发送请求
    let { data, code } = await this._vm.Req.get(api.userInfoMenu)
    let viewAndIndex = window.localStorage.getItem('viewAndIndex')
    if (code === 200) {
      commit('setMeunList', data.menuList)
      commit('setUserInfo', data.userInfo)
      viewAndIndex && commit('tabs/setViewTab', JSON.parse(viewAndIndex), {root: true})
    }
    // }
  }
}
const mutations = {
  setUserInfo (state, data) {
    state.userInfo = data
  },
  setToken (state, data) {
    state.token = data
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
