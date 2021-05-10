<template>
  <div>
   <el-row>
      <el-col :span="6"><left></left></el-col>
      <el-col :span="12"><content> </content></el-col>
      <el-col :span="6"><right></right></el-col>
    </el-row>
  </div>
</template>

<script>
import left from './components/left'
import content from './components/content'
import right from './components/right'
export default {
  components: {
    left,
    content,
    right
  },
  data () {
    return {
      a: 1
    }
  }
}
</script>
