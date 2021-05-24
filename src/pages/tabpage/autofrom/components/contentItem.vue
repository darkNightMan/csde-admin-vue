<template>
  <div>
    <vuedraggable class="draggable-box" :list="list"  :group="{ name: 'g1' }"
      :animation="300"
      @end="handleMoveEnd"
      @start="handleMoveStart($event, ComList)"
      :move="handleMove"
     >
      <div class="wrap" :class="{red: uuid === item.uuid}" v-for="(item, index) in list" :key="index"  @click.stop="active(item)">
          <component :is="item.comTag"  :isEdit="isEdit" :propsAttr="item.propsAttr" @dragStart="dragStart" :style="item.styleCom"  @handleColAdd="handleColAdd"></component>
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
