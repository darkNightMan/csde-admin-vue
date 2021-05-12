
import Vue from 'vue'
export default {
  name: 'generTemplate',
  props: {
    com: Object
  },
  render (h) {
    let that = this
    return h(Vue.extend({
      render (h) {
        // eslint-disable-next-line standard/object-curly-even-spacing
        return h(that.com.comTag, { props: this.validata()})
      },
      methods: {
        validata () {
          let props = {}
          // that.com.comAttr.map((x) => {
          //   debugger
          //   props[x] = that.com.comAttr[x]
          // })
          return props
        },
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
