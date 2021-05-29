<template>
  <div class="market-page">
    <div v-for="(item, index) in ComList" :key="index">
        <component :is="item.comTag" :style="item.styleCom"  :propsAttr="item.propsAttr" :comEvents="item.comEvents"></component>
    </div>
  </div>
</template>

<script>
export default {
  asyncData ({store, app}) {
  },
  data () {
    return {
      ComList: [
        {
          'comName': '按钮',
          'comTag': 'wxp-button',
          'comEventTag': 'event-button',
          'comAttrTag': 'attr-button',
          'comIcon': 'fa fa-hand-o-down',
          'propsAttr': {
            'btnType': 'danger',
            'btnText': '按钮'
          },
          'comEvents': {
            'link': 'https://www.yoins.com'
          },
          'styleCom': {
            'width': '100px',
            'height': '50px',
            'background': '',
            'fontSize': '32px',
            'color': ''
          },
          'uuid': 'attr-button_1622107821421'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.market-page{
  max-width: 1200px;
  margin: 0 auto
}
</style>
