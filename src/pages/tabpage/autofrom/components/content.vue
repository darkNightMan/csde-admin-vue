<template>
  <div  class='content'>
   <vuedraggable style="min-height:100px"   :list="componentsList"    @end="handleMoveEnd"   @start="handleMoveStart"  :move="handleMove"  @change="log"  group="component">
      <div class="wrap" :class="{red: index === indexItem}" v-for="(item, index) in componentsList" :key="index" @click="show(index)">
        <div class="mask"></div>
         <transition name="fade">
            <!-- <component :is="item.comTag" :style="item.comStyle"></component> -->
         </transition >
        <generComponent :com="item"></generComponent>
      </div>
   </vuedraggable>
  </div>
</template>
<script>

export default {
  data () {
    return {
      componentsList: [],
      indexItem: 0
    }
  },
  created () {
    console.log(this.t)
  },
  watch: {
    // componentsList (newVal, oldVal) {
    //   this.$setActionsCom(newVal)
    // }
  },
  methods: {
    getCom (item) {
    },
    log (i) {
    },
    handleMoveEnd (item) {
    },
    handleMoveStart (item) {
      // debugger
    },
    handleMove (item) {
      // debugger
    },
    show (index) {
      this.$setActionscurrentCom(this.componentsList[index])
      // this.$setIndexCurent(index)
      this.indexItem = index
    }
  }
}
</script>

<style scoped>
  .content{
    background: #eee;
    height: 600px;
  }
  .wrap{
    position: relative;
  }
  .wrap.red {
    border: 1px solid red;
    padding: 10px;
  }
  .mask{
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    border: 1px solid #333
  }
</style>
