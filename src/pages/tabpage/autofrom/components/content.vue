<template>
  <div style="height:400px">
   <vuedraggable style="min-height:100px"   :list="componentsArr"    @end="handleMoveEnd"   @start="handleMoveStart"  :move="handleMove"  @change="log"  group="component">
      <component  :is="item.componentName " style="margin:10px" v-for="(item, index) in componentsArr" :key="index">{{item.title}}</component>
   </vuedraggable>
  </div>
</template>
<script>
export default {
  data () {
    return {
      componentsArr: [

      ]
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
      debugger
    },
    handleMoveStart () {
      // debugger
    },
    handleMove () {
      // debugger
    }
  }
}
</script>
