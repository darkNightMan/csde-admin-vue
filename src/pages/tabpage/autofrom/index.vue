<template>
  <div class="main">
   <el-row>
      <el-col :span="4"><left></left></el-col>
      <el-col :span="14"><contentCenter> </contentCenter></el-col>
      <el-col :span="6"><right></right></el-col>
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
  }
}
</script>

<style lang="less">
  .main{
    background: #eee;
  }
</style>
