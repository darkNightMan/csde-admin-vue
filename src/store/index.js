
import Vuex from 'vuex'
import Vue from 'vue'
import tabs from './modules/tabs'
import user from './modules/user'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    tabs,
    user
  },
  plugins: [createPersistedState({
    storage: window.sessionStorage,
    reducer (val) {
      return {
      // 只储存state中的user
        user: val.user
      }
    }
  })]
})

export default store
