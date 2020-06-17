import { api } from '@/request/api.js'

const state = {
  token: '',
  menu: null,
  userInfo: null
}
const getters = {
  token: state => state.token,
  userInfo: state => state.userInfo,
  menu: state => state.menu,
  perms: state => state.perms
}
const actions = {
  // 用户信息
  async getUserInfo ({commit, dispatch = {}, state = {}, rootState = {}}) {
    debugger
    // if (!rootState.user.menu) { // 如果内存中有菜单 将不发送请求
    const { data, code } = await this._vm.Req.get(api.userInfoMenu)
    const viewAndIndex = window.localStorage.getItem('viewAndIndex')
    if (code === 200) {
      commit('setMeunTree', data.menuList)
      commit('setUserInfo', data.userInfo)
      commit('setMeunPerms', data.perms)
      viewAndIndex && commit('tabs/setViewTab', JSON.parse(viewAndIndex), { root: true })
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
  setMeunTree (state, data) {
    state.menu = data
  },
  setMeunPerms (state, data) {
    state.perms = data
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
