<template>
  <div>
    <vuedraggable class="draggable-box" :list="list"  :group="{ name: 'com' }"
      :animation="300"
      @end="handleMoveEnd"
      ghostClass="ghost"
      @start="handleMoveStart($event, ComList)"
      :move="handleMove"
     >
      <div class="wrap" :class="{active: uuid === item.uuid && isEdit}" v-for="(item, index) in list" :key="index"  @click.stop="active(item)">
          <component :is="item.comTag"  :isEdit="isEdit" :style="item.styleCom" :propsAttr="item.propsAttr" :comEvents="item.comEvents" @dragStart="dragStart"   @handleColAdd="handleColAdd"></component>
          <el-button v-show="uuid === item.uuid && isEdit"  class="btn del" type="danger" size="mini"  plain @click.stop="delCom(item)">删除</el-button>
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
    list: Object,
    isEdit: false
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
  watch: {
    list: {
      deep: true,
      handler () {
      }
    }
  },
  methods: {
    dragStart (i, d) {
    },
    handleColAdd (i, d) {
    },
    handleMoveEnd (item) {
    },
    handleMoveStart (e, item) {
    },
    handleMove (item) {
    },
    delCom (item) {
      if (this.isEdit) {
        this.$delComponent(item)
      }
    },
    active (item) {
      if (this.isEdit) {
        this.$setCurrenUuid(item.uuid)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.draggable-box{
  min-height: 70px;
  .ghost{
    background: red;
    height:0;
    overflow: hidden;
  }
}
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
  .wrap.active {
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
