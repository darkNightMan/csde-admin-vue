
import dynamicCom from './dynamicCom'
import Tree from './tree-select'

const components = [
  dynamicCom,
  Tree
]
export default {
  install (Vue, option) {
    components.forEach(component => {
      Vue.component(component.name, component)
    })
  }
}
