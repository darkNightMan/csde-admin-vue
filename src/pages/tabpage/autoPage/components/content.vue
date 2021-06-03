<template>
  <div  class='content' :style="{height: $windowHeight() + 'px'}">
     <el-scrollbar class="page-component__nav" style="height:100%" >
        <editBar :params="params" :init="init" :tabsIndex="tabsIndex"></editBar>
        <contentItem :list="ComList"  :isEdit="true"></contentItem>
     </el-scrollbar>
  </div>
</template>
<script>
import contentItem from './contentItem'
import editBar from './editBar'
export default {
  props: ['params', 'init', 'tabsIndex'],
  components: {
    contentItem,
    editBar
  },
  data () {
    return {
      activeName: '1'
    }
  },
  created () {
    let comConfig = this.params.mk_config
    if (comConfig) {
      let config = JSON.parse(comConfig)
      config.map((item) => {
        this.$addComponents(item)
      })
    }
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
    }
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
