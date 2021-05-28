<template>
  <div class="left" :style="{height: $windowHeight() + 'px'}">
    <h2>组件库</h2>
    <ul class="component-content">
        <vuedraggable :list="componentsConfig"
        v-bind="{group:{ name:'wxp',},
                sort:false,
                animation: 180,
                ghostClass: 'comList'}">
            <li v-for="(item, index) in componentsConfig" :key="index" @click="$emit('handPushList', index, componentsConfig)"  @dragstart="$emit('handPushList', index, componentsConfig)">
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
    cursor: pointer;
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
