import Carousel from './src'
export default {
  component: Carousel,
  config: {
    comName: '轮播',
    comTag: 'wxp-carousel',
    comAttrTag: 'attr-carousel',
    comIcon: 'el-icon-setting',
    comStyle: {
      background: '#333'
    },
    // props
    propsAttr: {
      imgUrlArr: [
        {
          name: 'u=4180093578,3682525324&fm=193.jpg',
          bannerUrl: 'http://localhost:8080/public/uploads/u=4180093578,3682525324&fm=193.jpg',
          url: 'https://www.yoins.com'
        },
        {
          name: 'u=337418265,3258441697&fm=193.jpg',
          bannerUrl: 'http://localhost:8080/public/uploads/5ba338b158474650.jpg',
          url: 'https://www.yoins.com'
        }
      ],
      autoplay: true,
      interval: 1000,
      direction: 'horizontal'
    },
    // 事件
    comAttrEvents: {

    },
    // 样式
    style: {

    }
  }
}
