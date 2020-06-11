import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  install (Vue, options) {
    let moduleVuex = Object.keys(options.modules)
    moduleVuex.map((module) => {
      let keysMutationsName = Object.keys(options.modules[module].mutations) // 获取每个module mutation方法名 集合 Array
      let keysActionsName = Object.keys(options.modules[module].actions) // 获取每个module mutation方法名  集合 Array
      let keysStateGettersName = Object.keys(options.modules[module].getters) // 获取每个module getters方法名 集合 Array
      let stateName = Object.keys(options.modules[module].state) // 获取每个module state 集合 Array
      let state = mapState(module, stateName)
      let stateGetters = mapGetters(module, keysStateGettersName)
      let actionsFun = mapActions(module, keysActionsName)
      let mutationsFun = mapMutations(module, keysMutationsName)
      let vuexFun = Object.assign(actionsFun, mutationsFun, stateGetters, state)
      Object.keys(vuexFun).map(it => {
        Vue.prototype[`$${it}`] = vuexFun[it]
      })
    })
  }
}
