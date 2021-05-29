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
              "comName": "轮播",
              "comTag": "wxp-carousel",
              "comAttrTag": "attr-carousel",
              "comIcon": "el-icon-setting",
              "comStyle": {
                "background": "#333"
              },
              "propsAttr": {
                "imgUrlArr": [
                  {
                    "name": "u=4180093578,3682525324&fm=193.jpg",
                    "url": "http://localhost:8080/public/uploads/u=4180093578,3682525324&fm=193.jpg",
                    "uid": 1622267164233,
                    "status": "success"
                  },
                  {
                    "name": "u=337418265,3258441697&fm=193.jpg",
                    "url": "http://localhost:8080/public/uploads/u=337418265,3258441697&fm=193.jpg",
                    "uid": 1622267164234,
                    "status": "success"
                  }
                ],
                "autoplay": true,
                "interval": "",
                "direction": "horizontal"
              },
              "comAttrEvents": {},
              "style": {},
              "uuid": "attr-carousel_1622267164150"
            },
            {
              "comName": "栅格",
              "comTag": "wxp-grid",
              "comAttrTag": "attr-grid",
              "comIcon": "el-icon-setting",
              "comStyle": {
                "background": "#333"
              },
              "propsAttr": {
                "rows": {
                  "columns": [
                    {
                      "span": 12,
                      "list": [
                        {
                          "comName": "列表",
                          "comTag": "wxp-List",
                          "comAttrTag": "attr-list",
                          "comIcon": "fa fa-file-image-o",
                          "propsAttr": {
                            "imgUrl": "http://localhost:8080/public/uploads/84ae30c406481c699e9e0294838d6852.jpg",
                            "title": "自动化列表"
                          },
                          "comAttrEvents": {},
                          "styleCom": {
                            "width": "300px",
                            "height": "",
                            "background": "",
                            "fontSize": "",
                            "color": ""
                          },
                          "uuid": "attr-list_1622267234101"
                        }
                      ]
                    },
                    {
                      "span": 12,
                      "list": [
                        {
                          "comName": "列表",
                          "comTag": "wxp-List",
                          "comAttrTag": "attr-list",
                          "comIcon": "fa fa-file-image-o",
                          "propsAttr": {
                            "imgUrl": "http://localhost:8080/public/uploads/84ae30c406481c699e9e0294838d6852.jpg",
                            "title": "自动化列表"
                          },
                          "comAttrEvents": {},
                          "styleCom": {
                            "width": "300px",
                            "height": "",
                            "background": "",
                            "fontSize": "",
                            "color": ""
                          },
                          "uuid": "attr-list_1622267238092"
                        }
                      ]
                    }
                  ],
                  "gutter": 10
                }
              },
              "comAttrEvents": {},
              "styleCom": {
                "width": "",
                "height": "",
                "background": "",
                "fontSize": "",
                "color": ""
              },
              "uuid": "attr-grid_1622267231423"
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
