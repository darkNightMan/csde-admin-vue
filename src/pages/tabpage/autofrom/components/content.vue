<template>
  <div  class='content' :style="{height: $windowHeight() + 'px'}">
     <el-scrollbar class="page-component__nav" style="height:100%" >
         <el-tabs v-model="activeName" @tab-click="handleClick" >
            <el-tab-pane label="布局" name="1">
              <contentItem :list="ComList" :isEdit="true"></contentItem>
            </el-tab-pane>
            <el-tab-pane label="数据" name="2">
              <pre>
                {{ComList}}
              </pre>
            </el-tab-pane>
             <el-tab-pane label="预览" name="3">
               <div v-for="(item, index) in ComList" :key="index">
                 <component :is="item.comTag" :style="item.styleCom"  :propsAttr="item.propsAttr"></component>
               </div>
            </el-tab-pane>
        </el-tabs>
     </el-scrollbar>
  </div>
</template>
<script>
import contentItem from './contentItem'
export default {
  components: {
    contentItem
  },
  data () {
    return {
      activeName: '1'
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
    handleMoveEnd (item) {
    },
    handleMoveStart (e, item) {
      console.log(item)
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
