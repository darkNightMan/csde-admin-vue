<template>
  <div>
     <el-form ref="form"  label-width="80px">
        <div>
            <el-form-item label="图片地址">
                 <el-input v-model="localPropsAttr.imgUrl"></el-input>
            </el-form-item>
            <el-form-item label="标题">
                <el-input v-model="localPropsAttr.title"></el-input>
            </el-form-item>
         </div>
      </el-form>
  </div>
</template>
<script>
export default {
  naem: 'attr-list',
  data () {
    return {
      localPropsAttr: {
        imgUrl: '',
        title: ''
      }
    }
  },
  props: {
    propsAttr: {
      imgUrl: String,
      title: String
    }
  },
  watch: {
    propsAttr: {
      deep: true,
      handler () {
        this.localPropsAttr = this.propsAttr
      }
    },
    localPropsAttr: {
      deep: true,
      handler () {
        this.$emit('update:propsAttr', this.localPropsAttr)
      }
    }
  },
  mounted () {
    this.localPropsAttr = this.propsAttr
  }
}
</script>
