
import dynamicCom from './dynamicCom'
import Tree from './tree-select'
import autoTemplate from './generTemplate'
const components = [
  dynamicCom,
  Tree,
  autoTemplate
]
export default {
  install (Vue, option) {
    components.forEach(component => {
      Vue.component(component.name, component)
    })
  }
}
