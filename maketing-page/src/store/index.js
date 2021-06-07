import Vue from 'vue';
import autoPage from '@/store/modules/autoPage'
import test from './module/test'
import market from './module/market'
import Vuex from 'vuex';
import VuexExtend from '@/store/vuexExtend'

Vue.use(Vuex)
// 将vuex module 里面所有的方法属性挂在全局
Vue.use(VuexExtend, {
  modules: {
    autoPage,
    market
  }
})
export  function createStore() {
  return new Vuex.Store({
    modules: {
      autoPage,
      market,
      test
    }
  })
}
