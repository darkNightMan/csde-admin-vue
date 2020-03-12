
import Vuex from 'vuex'
import Vue from 'vue'
import tabs from './modules/tabs'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    tabs
  }
})

export default store
