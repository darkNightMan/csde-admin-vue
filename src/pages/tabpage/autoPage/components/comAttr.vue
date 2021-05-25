<template>
  <div>
    <el-form-item label="宽度" >
         <el-input v-model="localstyleCom.width"></el-input>
     </el-form-item>
        <el-form-item label="高度" >
         <el-input v-model="localstyleCom.height"></el-input>
     </el-form-item>
        <el-form-item label="背景颜色">
         <el-input v-model="localstyleCom.background"></el-input>
     </el-form-item>
        <el-form-item label="字体大小" >
         <el-input v-model="localstyleCom.fontSize"></el-input>
     </el-form-item>
        <el-form-item label="字体颜色" >
         <el-input v-model="localstyleCom.color"></el-input>
     </el-form-item>
  </div>
</template>
<script>
export default {
  name: 'comAttr',
  data () {
    return {
      localstyleCom: {
        width: '',
        height: '',
        background: '',
        fontSize: '',
        color: ''
      }
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
    localstyleCom: {
      deep: true,
      handler () {
        for (let item in this.localstyleCom) {
          this.$set(this.styleCom, item, this.localstyleCom[item])
        }
      }
    },
    styleCom: {
      deep: true,
      handler () {
        this.localstyleCom = this.styleCom
      }
    }
  }
}
</script>
