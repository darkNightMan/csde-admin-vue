import Grid from './src'
export default {
  component: Grid,
  config: {
    comName: '栅格',
    comTag: 'wxp-grid',
    comAttrTag: 'attr-grid',
    comIcon: 'el-icon-setting',
    comStyle: {
      background: '#333'
    },
    // props
    propsAttr: {
      rows: {
        columns: [
          {
            span: 12,
            list: [
            ]
          },
          {
            span: 12,
            list: []
          }
        ],
        gutter: 10
      }
    },
    // 事件
    comAttrEvents: {

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
