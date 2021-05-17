<template>
  <div  class='content' :style="{height: $windowHeight() + 'px'}">
    <el-scrollbar class="page-component__nav" style="height:100%">
      <vuedraggable :style="{height: $windowHeight() + 'px'}"   :list="ComList"    @end="handleMoveEnd"   @start="handleMoveStart"  :move="handleMove"  @change="log" >
          <div class="wrap" :class="{red: uuid === item.uuid}" v-for="(item, index) in ComList" :key="index"  @click="active(item)"  >
            <transition name="fade">
                <component :is="item.comTag"  :propsAttr="item.propsAttr"></component>
            </transition >
            <!-- <generComponent :com="item"></generComponent> -->
          </div>
      </vuedraggable>
     </el-scrollbar>
  </div>
</template>
<script>

export default {
  data () {
    return {
      componentsList: []
    }
  },
  created () {
  },
  computed: {
    ComList: {
      get () {
        return this.$comList()
      }
    },
    uuid () {
      return this.$uuid()
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
    },
    handleMove (item) {
    },
    active (item) {
      this.$setCurrenUuid(item.uuid)
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
    border: 1px solid #eee
  }
</style>
