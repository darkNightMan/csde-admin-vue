
import Vue from 'vue'
export default {
  name: 'generComponent',
  props: {
    com: Object
  },
  render (h) {
    let that = this
    return h(Vue.extend({
      render (h) {
        debugger
        // eslint-disable-next-line standard/object-curly-even-spacing
        return h(that.com.comTag, { props: that.com.propsAttr})
      },
      methods: {
        Fnclick (uuid, id) {
          this.current = uuid
          // this.$store.commit('EditPanel/changeId', uuid)
        }
      }
    }))
  },
  created () {
    debugger
    console.log(this.com)
  }
}
