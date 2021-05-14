<template>
  <div class="left">
    <vuedraggable :list="componentsConfig" @start="addComponents($event, componentsConfig)" @end="handleMoveEnd" :move="handleMove"   v-bind="{group:{ name:'', pull:'clone',put:false},sort:false, ghostClass: 'com'}">
       <el-tag style="margin:20px" v-for="(item, index) in componentsConfig" :key="index">{{item.comName}}</el-tag>
    </vuedraggable>
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

<style scoped>
.left{
  /* border: 1px solid #eee; */
  height: 550px;
}
</style>
