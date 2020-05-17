import { mapActions } from 'vuex'
export default {
  install (Vue) {
    // debugger
    let actionsvuex = mapActions('tabs', ['addView'])
    Object.keys(actionsvuex).map(it => {
      debugger
      let fun = mapActions('tabs', ['addView'])[it]
      Vue.prototype[it] = fun
    })
  }
}
