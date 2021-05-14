import Button from './wxp-button'
import List from './wxp-List'
const components = [
  Button,
  List
]
// 异步加载组件
const installComponents = (Vue) => {
  components.forEach(key => {
    if (key.component.name) {
      debugger
      Vue.component(key.config.comTag, () => import(`@/package/${key.component.name}/src/index.vue`)) // 功能组件
      Vue.component(key.config.comAttrTag, () => import(`@/package/${key.component.name}/src/attr.vue`)) // 组件属性
    } else {
      console.error(`无组件名称！`)
    }
  })
}
const config = () => {
  const componentsConfig = [] // 组件配置
  components.map((key) => {
    componentsConfig.push(key.config)
  })
  return componentsConfig
}
export {installComponents, config}
