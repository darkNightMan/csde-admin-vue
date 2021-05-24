<template>
  <div>
     <el-form ref="form"  label-width="80px">
        <div>
            <el-form-item label="配置">
                 <el-input  size="mini" v-model="item.span" v-for="(item, index) in localPropsAttr.rows.columns" :key="index"></el-input>
                <el-button type="primary" size="mini"  @click="addGrid">添加</el-button>
            </el-form-item>
            <el-form-item label="间距">
                <el-input v-model="localPropsAttr.rows.gutter"></el-input>
            </el-form-item>
         </div>
      </el-form>
  </div>
</template>
<script>
export default {
  naem: 'attr-gird',
  data () {
    return {
      localPropsAttr: {
        rows: {
          columns: [
            {
              span: 12,
              list: [
              ]
            },
            {
              span: 12,
              list: []
            }
          ],
          gutter: 0
        }
      }
    }
  },
  props: {
    propsAttr: {
      rows: Object,
      default: () => {
        return {
          columns: [
            {
              span: 12,
              list: [
              ]
            },
            {
              span: 12,
              list: []
            }
          ],
          gutter: 0
        }
      }
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
  },
  methods: {
    addGrid () {
      this.localPropsAttr.rows.columns.push(
        {
          span: 12,
          list: []
        }
      )
    }
  }
}
</script>
