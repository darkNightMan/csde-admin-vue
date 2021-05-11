
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
        return h(that.com, { props: this.validata()})
      },
      methods: {
        validata () {
          let props = {}
          for (let item in that.com.props) {
            props[item] = that.com.props[item].default
          }
          return props
        }
      }
    }))
  },
  created () {
    console.log(1)
  }
}
