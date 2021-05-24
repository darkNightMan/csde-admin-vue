<template>
  <div>
    <el-form-item label="宽度" >
         <el-input v-model="localPropsAttr.width"></el-input>
     </el-form-item>
        <el-form-item label="高度" >
         <el-input v-model="localPropsAttr.height"></el-input>
     </el-form-item>
        <el-form-item label="背景颜色">
         <el-input v-model="localPropsAttr.background"></el-input>
     </el-form-item>
        <el-form-item label="字体大小" >
         <el-input v-model="localPropsAttr.fontSize"></el-input>
     </el-form-item>
        <el-form-item label="字体颜色" >
         <el-input v-model="localPropsAttr.color"></el-input>
     </el-form-item>
  </div>
</template>

<script>
export default {
  data () {
    return {
      localPropsAttr: {}
    }
  },
  props: {
    styleCom: {
      type: Object,
      default: () => {
        return {
          width: '',
          height: '',
          background: '',
          fontSize: '',
          color: ''
        }
      }
    }
  },
  watch: {
    propsAttr: {
      deep: true,
      handler () {
        this.localPropsAttr = this.styleCom
      }
    },
    localPropsAttr: {
      deep: true,
      handler () {
        this.$emit('update:styleCom', this.localPropsAttr)
      }
    }
  },
  mounted () {
    debugger
    this.localPropsAttr = this.styleCom
  }
}
</script>
