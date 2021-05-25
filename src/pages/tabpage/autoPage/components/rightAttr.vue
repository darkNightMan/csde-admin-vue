<template>
<div class="right" :style="{height: $windowHeight() + 'px'}">
   <el-scrollbar class="page-component__nav" style="height:100%" >
      <div class="right-attr">
        <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="属性" name="1">
          <el-form ref="form"  label-width="80px">
            <component :is="currentCom.comAttrTag"  :propsAttr="currentCom.propsAttr"  v-bind.sync="currentCom.propsAttr" ></component>
            <comAttr v-if="currentCom.styleCom" :styleCom="currentCom.styleCom"  v-bind.sync="currentCom.styleCom"></comAttr>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="数据" name="2">
          <json-viewer :value="currentCom" :copyable="{copiedText:'复制成功', copyText:'复制'}"  expand-depth="10" theme="jv-light"></json-viewer>
        </el-tab-pane>
        <el-tab-pane label="事件" name="3">
            <component :is="currentCom.comEventTag"  :comEvents="currentCom.comEvents"  v-bind.sync="currentCom.comEvents" ></component>
        </el-tab-pane>
      </el-tabs>
      </div>
  </el-scrollbar>
</div>
</template>
<script>
import comAttr from './comAttr'
export default {
  data () {
    return {
      activeName: '1'
    }
  },
  created () {
    console.log()
  },
  components: {
    comAttr
  },
  computed: {
    propsAttr () {
      return this.$currentCom().propsAttr
    },
    currentCom: {
      get () {
        return this.$currentCom()
      }
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style lang="less"  scoped>
.right{
  background:#fff;
    border-left: 4px solid rgb(215, 229, 231);
  .right-attr{
    padding: 20px;
  }
}
</style>
