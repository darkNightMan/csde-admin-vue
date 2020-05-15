
// import { mapMutations, mapActions } from 'vuex'
export default {
  name: 'tabsComponent',
  props: {
    com: {
      type: Object,
      require: true
    },
    moduleVuex: {
      type: Object
    }
  },
  data () {
    return {
      component: null // 组件模块
    }
  },
  async created () {
    let com = await new Promise(this.com.component)
    this.component = com.default
    // console.log('component')
  },
  methods: {
  },
  // 渲染函数 h [Function] 渲染函数
  render (createElement) {
    let { param, id } = this.com
    let { tabs } = this.moduleVuex
    return createElement(this.component, {
      ref: 'component',
      props: {
        $params: param || {},
        $tabsIndex: id,
        $tabs: tabs
      }
    })
  }
}
