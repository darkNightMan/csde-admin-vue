<template>
<div class="right" :style="{height: $windowHeight() + 'px'}">
  <div class="right-attr">
    <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="属性" name="1">
      <el-form ref="form"  label-width="80px">
        <component :is="currentCom.comAttrTag"  :propsAttr="currentCom.propsAttr" v-bind.sync="currentCom.propsAttr"></component>
      </el-form>
    </el-tab-pane>
     <el-tab-pane label="数据" name="2">
      <pre>
        {{currentCom.propsAttr}}
      </pre>
    </el-tab-pane>
  </el-tabs>
  </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      activeName: '1'
    }
  },
  created () {
    console.log()
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
