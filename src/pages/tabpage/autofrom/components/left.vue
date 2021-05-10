<template>
  <div class="left">
   <!-- <el-tag @click="getCom(item)" style="margin:20px" v-for="(item, index) in componentsArr" :key="index">{{item.title}}</el-tag> -->

    <vuedraggable :list="componentsArr"  :move="handleMove"   v-bind="{group:{ name:'component', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}">
      <component  :is="item.componentName "  style="margin:10px" v-for="(item, index) in componentsArr" :key="index">{{item.title}}</component>
    </vuedraggable>
  </div>
</template>
<script>

import packages from '@/package'

export default {
  data () {
    return {
      componentsArr: packages,
      right: []
    }
  },
  methods: {
    getCom (item) {
      debugger
    },
    log (i) {
      debugger
    },
    handleMoveEnd (item) {
      // debugger
    },
    handleMoveStart () {
      // debugger
    },
    handleMove () {
      // debugger
      return true
    }
  }
}
</script>

<style scoped>
.left{
  border: 1px solid #eee;
  height: 1000px;
}
</style>
