<template>
  <div class="left">
    <vuedraggable :list="componentsConfig" @start="addComponents($event, componentsConfig)" @end="handleMoveEnd" :move="handleMove"   v-bind="{group:{ name:'component', pull:'clone',put:false},sort:false, ghostClass: 'com'}">
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
      this.$setActionscurrentCom(JSON.parse(list[e.oldIndex]))
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
