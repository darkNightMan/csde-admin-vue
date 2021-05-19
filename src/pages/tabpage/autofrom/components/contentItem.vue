<template>
  <div >
    <vuedraggable :list="list"  :group="{ name: 'g1' }"    :animation="300"  @end="handleMoveEnd"   @start="handleMoveStart($event, ComList)" @add="add($event, ComList)"  :move="handleMove"  @change="log" >
      <div class="wrap" :class="{red: uuid === item.uuid}" v-for="(item, index) in list" :key="index"  @click.stop="active(item)">
          <component :is="item.comTag"  :propsAttr="item.propsAttr" @dragStart="dragStart" @handleColAdd="handleColAdd"></component>
          <el-button v-show="uuid === item.uuid"  class="btn del" type="danger" size="mini"  plain @click.stop="delCom(item)">删除</el-button>
        </div>
    </vuedraggable>
  </div>
</template>
<script>

export default {
  name: 'content-item',
  data () {
    return {
      componentsList: []
    }
  },
  created () {
  },
  props: {
    list: Object
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
    add (d, c) {
      console.log(d, c)
    },
    dragStart (i, d) {
    },
    handleColAdd (i, d) {
    },
    getCom (item) {
    },
    log (i) {
    },
    handleMoveEnd (item) {
    },
    handleMoveStart (e, item) {
    },
    handleMove (item) {
    },
    delCom (item) {
      this.$delComponent(item)
    },
    active (item) {
      this.$setCurrenUuid(item.uuid)
    }
  }
}
</script>

<style lang="less" scoped>
  .content{
    background: #eee;
    height: 600px;
  }
  .wrap{
    position: relative;
    .btn{
      position: absolute;
      bottom: 0;
      right: 0;
      z-index: 11111;
    }
  }
  .wrap.red {
      border: 4px solid rgb(45, 140, 240);
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
