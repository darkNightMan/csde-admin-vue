<template>
  <div class="main">
   <el-row>
      <el-col :span="3"><left @createComKey="createComKey" @handPushList="handPushList"></left></el-col>
      <el-col :span="16"><contentCenter> </contentCenter></el-col>
      <el-col :span="5"><right></right></el-col>
    </el-row>
  </div>
</template>

<script>
import left from './components/left'
import contentCenter from './components/content'
import right from './components/right'
export default {
  components: {
    left,
    contentCenter,
    right
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
      if (!currentCom.uuid) {
        currentCom['uuid'] = currentCom.comAttrTag + '_' + new Date().getTime()
      } else {
        currentCom['uuid'] = currentCom.comAttrTag + '_' + new Date().getTime()
      }
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
