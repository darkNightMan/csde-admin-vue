
import Vuex from 'vuex'
import Vue from 'vue'
import tabs from './modules/tabs'
import user from './modules/user'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    tabs,
    user
  }
})

export default store
