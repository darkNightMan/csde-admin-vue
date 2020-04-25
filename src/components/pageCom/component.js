// 自定义加载组件
export default {
  name: 'tabsComponent',
  // 数据
  data: _ => ({
    loaded: false, // 是否加载完成
    success: false, // 是否加载成功
    component: null // 组件对象
  }),
  // 父子通信
  props: {
    // 组件引入后的对象
    com: {
      type: Object,
      required: true
    }
  },
  // 参数渗透
  provide () {
    return {
      com: this.com
    }
  },
  // 创建实例后的钩子函数
  created () {
    try {
      new Promise(this.com.component).then(async res => {
        res.default.inject = ['com']
        this.component = res.default
        // 如果存在beforeOpen钩子，则渲染前执行
        if (typeof this.component.beforeOpen === 'function') {
          let cb = await new Promise(this.component.beforeOpen.bind(this.$root))
          if (typeof cb === 'function') {
            if (this.component.mixins) {
              this.component.mixins.unshift({
                created () {
                  // eslint-disable-next-line standard/no-callback-literal
                  cb(this)
                }
              })
            } else {
              this.component.mixins = [{
                created () {
                  // cb (this)
                }
              }]
            }
          }
        }
        this.success = true
        this.loaded = true
      })
    } catch (e) {
      this.success = false
      this.loaded = true
      throw (e)
    }
  },
  // 渲染函数 h [Function] 渲染函数
  render (createElement) {
    let { param, name } = this.com
    // 加载中显示loading组件，加载成功后显示相应组件，加载失败时，显示error组件
    return createElement(this.component, {
      ref: 'component',
      props: {
        linkParam: param || {},
        tabIndex: name
      }
    })
  },
  // 参数监听
  watch: {
    // 加载完毕后将组件实例绑定到instance属性上
    loaded (val) {
      if (val) {
        // eslint-disable-next-line no-return-assign
        this.$nextTick(_ => this.com.instance = this.$refs.component)
      }
    }
  }
}
