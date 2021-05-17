<template>
  <div class="left" :style="{height: $windowHeight() + 'px'}">
    <h2>组件库</h2>
    <ul class="component-content">
        <vuedraggable :list="componentsConfig" @start="addComponents($event, componentsConfig)" @end="handleMoveEnd" :move="handleMove"   v-bind="{group:{ name:'', pull:'clone',put:false},sort:false, ghostClass: 'com'}">
            <li v-for="(item, index) in componentsConfig" :key="index">
                <i :class="item.comIcon ? item.comIcon: 'el-icon-eleme'"></i>
              {{item.comName}}
            </li>
        </vuedraggable>
      </ul>
  </div>
</template>
<script>
import { config } from '@/package'
export default {
  data () {
    return {
      componentsConfig: config()
    }
  },
  created () {

  },
  methods: {
    handleMoveEnd (item) {
    },
    addComponents (e, list) {
      let currentCom = list[e.oldIndex]
      if (!currentCom.uuid) {
        currentCom.uuid = currentCom.comAttrTag + '_' + new Date().getTime()
      } else {
        currentCom.uuid = currentCom.comAttrTag + '_' + new Date().getTime()
      }
      const listString = JSON.stringify(currentCom)
      this.$addComponents(JSON.parse(listString))
      // this.$addComponents(currentCom)
    },
    handleMove () {
      return true
    }
  }
}
</script>

<style lang="less" scoped>
.component-content{
  padding: 0 10px;
  li{
    width: 100%;
    height: 40px;
    text-align: center;
    background:#fff;
    margin-bottom:10px;
    font-size: 16px;
    line-height: 40px;
    border-radius: 4px;
    i{
      margin-right: 10px;
    }
  }
}
.left{
  border-right: 4px solid #fff;
   background: rgb(236, 234, 234);
  h2{
    padding: 10px;
  }
}
</style>
