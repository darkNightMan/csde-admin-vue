import axios from 'axios'
import baseURL from '../../../api/index'
const state = {
  comConfig: [],
  mkTitle: ''
}
const getters = {
  mkConfig: state => state.comConfig,
  mkTitleName: state => state.mkTitle
}
const actions = {
  async getConfig({commit}, id) {
    try {
      console.log(baseURL, 'baseURLbaseURLbaseURLbaseURLbaseURLbaseURLbaseURLbaseURLbaseURLbaseURL')
      const { data } = await axios.get(`${baseURL}api/marketing/getMarketPage?id=${id}`)
      commit('setConfig', data)
    } catch (ex) {
      console.log(ex)
    }
  }
}
const mutations = {
  setConfig(state, data) {
    state.comConfig = JSON.parse(data.data.mk_config) 
    state.mkTitle = data.data.mk_name
  }
}
export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
