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
      Vue.component(key.component.name, () => import(`@/package/${key.component.name}/src/index.vue`))
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
