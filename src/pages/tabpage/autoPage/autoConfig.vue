<template>
  <div class="main">
   <el-row>
      <el-col :span="3">
        <leftCom @createComKey="createComKey" @handPushList="handPushList"></leftCom>
      </el-col>
      <el-col :span="16">
        <contentCenter :params="$params" :init="$init" :tabsIndex="$tabsIndex"></contentCenter>
      </el-col>
      <el-col :span="5">
        <rightAttr></rightAttr>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import leftCom from './components/leftCom'
import contentCenter from './components/content'
import rightAttr from './components/rightAttr'
export default {
  props: ['$params', '$init', '$tabsIndex'],
  components: {
    leftCom,
    contentCenter,
    rightAttr
  },
  data () {
    return {
    }
  },
  created () {
    this.$redoPage()
  },
  methods: {
    createComKey (index, list) {
    },
    handPushList (index, list) {
      let currentCom = list[index]
      currentCom['uuid'] = currentCom.comAttrTag + '_' + new Date().getTime()
      const listString = JSON.stringify(currentCom)
      this.$addComponents(JSON.parse(listString))
    }
  }
}
</script>

<style lang="less">
  .main{
    background: #eee;
  }
</style>
