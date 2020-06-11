
import Vuex from 'vuex'
import Vue from 'vue'
import tabs from './modules/tabs'
import user from './modules/user'
import app from './modules/app'
import theme from './modules/theme'
import VuexExtend from './vuexExtend'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
// 将vuex module 里面所有的方法属性挂在全局
Vue.use(VuexExtend, {
  modules: {
    app,
    tabs,
    user,
    theme
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
