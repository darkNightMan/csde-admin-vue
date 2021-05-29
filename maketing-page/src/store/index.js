import Vue from 'vue';
import autoPage from '@/store/modules/autoPage'
import test from './module/test'
import Vuex from 'vuex';
Vue.use(Vuex);
export  function createStore() {
  return new Vuex.Store({
    modules: {
      autoPage,
      test
    }
  })
}
