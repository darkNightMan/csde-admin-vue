
import Vuex from 'vuex'
import Vue from 'vue'
import tabs from './modules/tabs'
import user from './modules/user'
import app from './modules/app'
import theme from './theme/index'
import VuexExtend from './vuexExtend'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
Vue.use(VuexExtend, {
  modules: {
    app,
    tabs,
    user
  }
})
const store = new Vuex.Store({
  modules: {
    app,
    tabs,
    user,
    theme
  },
  plugins: [createPersistedState({
    storage: window.localStorage,
    reducer (val) {
      return {
      // 只储存state中的user
        // user: val.user
      }
    }
  })]
})

export default store
