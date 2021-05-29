
import Vuex from 'vuex'
import Vue from 'vue'
import tabs from '@/store/modules/tabs'
import user from '@/store/modules/user'
import app from '@/store/modules/app'
import theme from '@/store/modules/theme'
import autoPage from '@/store/modules/autoPage'
import VuexExtend from '@/store/vuexExtend'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
// 将vuex module 里面所有的方法属性挂在全局
Vue.use(VuexExtend, {
  modules: {
    app,
    tabs,
    user,
    theme,
    autoPage
  }
})
const store = new Vuex.Store({
  modules: {
    app,
    tabs,
    user,
    theme,
    autoPage
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
export {store}
