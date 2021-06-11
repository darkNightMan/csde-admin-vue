
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
        // eslint-disable-next-line standard/object-curly-even-spacing
        return h(that.com.comTag, { props: that.com.propsAttr})
      },
      methods: {
      }
    }))
  },
  created () {
    console.log(this.com)
  }
}
