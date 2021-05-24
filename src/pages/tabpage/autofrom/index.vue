<template>
  <div class="main">
   <el-row>
      <el-col :span="3">
        <leftCom @createComKey="createComKey" @handPushList="handPushList"></leftCom>
      </el-col>
      <el-col :span="16">
        <div class="bar">
           <el-row>

              <el-button size="small" type="primary">生成JSON</el-button>
              <el-button size="small" type="primary">预览页面</el-button>
              <el-button size="small" type="primary">保存发布</el-button>
              <el-button size="small" type="primary">重做</el-button>
          </el-row>
        </div>
        <contentCenter> </contentCenter>
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
  components: {
    leftCom,
    contentCenter,
    rightAttr
  },
  data () {
    return {
    }
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
  .bar{
    background:#fff;
    padding: 4px;
    border: 1px solid #eee
  }
</style>
