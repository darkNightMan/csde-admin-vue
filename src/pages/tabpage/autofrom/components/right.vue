<template>
<div class="right">
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="属性" name="1">
      <pre>   {{currentCom}}</pre>
      <el-form ref="form"  label-width="80px">
        <component :is="currentCom.comAttrTag"  :propsAttr="currentCom.propsAttr" v-bind.sync="currentCom.propsAttr"></component>
      </el-form>
    </el-tab-pane>
    <!-- <el-tab-pane label="样式" name="2">
      <pre v-if="ComList[indexCurrent]">
        {{ ComList[indexCurrent].comStyle}}
      </pre>
    </el-tab-pane>
    <el-tab-pane label="事件" name="3">
      <pre v-if="ComList[indexCurrent]">
        {{ ComList[indexCurrent].events}}
      </pre>
    </el-tab-pane> -->
  </el-tabs>

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

<style  scoped>
.right{
  /* border: 1px solid #eee; */
  height: 550px;
  padding: 20px;
}
</style>
