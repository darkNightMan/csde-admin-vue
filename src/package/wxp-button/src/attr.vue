<template>
  <div>
     <el-form ref="form"  label-width="80px">
        <div>
            <el-form-item label="按钮类型">
                <el-select v-model="localPropsAttr.btnType" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
            </el-form-item>
            <el-form-item label="按钮文案">
                <el-input v-model="localPropsAttr.btnText"></el-input>
            </el-form-item>
         </div>
      </el-form>
  </div>
</template>

<script>
export default {
  naem: 'attr-button',
  data () {
    return {
      localPropsAttr: {
        btnType: '',
        btnText: ''
      },
      options: [
        {
          value: 'default'
        },
        {
          value: 'primary'
        },
        {
          value: 'success'
        },
        {
          value: 'danger'
        }
      ]
    }
  },
  props: {
    propsAttr: {
      btnType: String,
      btnText: String
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
