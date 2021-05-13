
import dynamicCom from './dynamicCom'
import Tree from './tree-select'
import generComponent from './generComponent'
const components = [
  dynamicCom,
  Tree,
  generComponent
]
export default {
  install (Vue, option) {
    components.forEach(component => {
      Vue.component(component.name, component)
    })
  }
}
