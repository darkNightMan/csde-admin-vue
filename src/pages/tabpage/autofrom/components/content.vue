<template>
  <div  class='content'>
    {{componentsArr}}
   <vuedraggable style="min-height:100px"   :list="componentsArr"    @end="handleMoveEnd"   @start="handleMoveStart"  :move="handleMove"  @change="log"  group="component">
      <div class="wrap" :class="{red: index === indexItem}" v-for="(item, index) in componentsArr" :key="index" @click="show(index)">
        <div class="mask"></div>
        <generTemplate :com="item"></generTemplate>
      </div>
   </vuedraggable>
  </div>
</template>
<script>

export default {
  data () {
    return {
      componentsArr: [],
      indexItem: 0
    }
  },
  created () {
    console.log(this.t)
  },
  watch: {
    componentsArr (newVal, oldVal) {
      this.$setActionsCom(newVal)
    }
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
      this.$setIndexCurent(index)
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
