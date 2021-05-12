import List from './src'
export default {
  component: List,
  config: {
    comName: '列表',
    comTag: 'wxp-List',
    comIcon: 'icon',
    comStyle: {
      width: '100'
    },
    comAttr: [

      {
        field: '图片地址',
        imgUrl: ''
      },
      {
        field: '标题',
        title: '自动化列表'
      }

    ]
  }
}
