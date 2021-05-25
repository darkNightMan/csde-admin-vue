import Button from './src'
export default {
  component: Button,
  config: {
    comName: '按钮',
    comTag: 'wxp-button',
    comEventTag: 'event-button',
    comAttrTag: 'attr-button',
    comIcon: 'fa fa-hand-o-down',
    // props
    propsAttr: {
      btnType: 'default',
      btnText: '按钮'
    },
    // 事件
    comEvents: {
      link: 'https://www.yoins.com'
    },
    // 样式
    styleCom: {
      width: '',
      height: '',
      background: '',
      fontSize: '',
      color: ''
    }
  }
}
