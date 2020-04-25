<template>
  <div>
    {{name}}
    <el-select v-model="select_"  clearable placeholder="请选择" style="width:100%" ref="select">
      <el-tree  ref="tree" highlight-current default-expand-all :expand-on-click-node="false" :node-key="value" :props="defaultProps"  :data="data.tree" @node-click="nodeClick"></el-tree>
      <el-option  v-show="isShow"  v-for="item in data.list" :key="item.res_id"  :label="item.res_name"  :value="item.res_id"> </el-option>
    </el-select>
  </div>
</template>
<script>
export default {
  name: 'tree-select',
  model: {
    prop: 'select', // 要存在于props
    event: 'change' // 当组件的值发生改变时要emit的事件名
  },
  props: {
    name: '',
    select: '',
    // 选择框默认文字
    placeholder: {
      type: String,
      default: '请选择'
    },
    label: {
      type: String,
      default: 'label'
    },
    value: {
      type: String,
      default: 'value'
    },
    children: {
      type: String,
      default: 'children'
    },
    // select和tree数据
    data: {
      type: Object,
      default: function () {
        return {
          list: [],
          tree: []
        }
      }
    }
  },
  created () {
  },
  data () {
    return {
      selectModel: null,
      select_: this.select,
      isShow: false,
      defaultProps: {
        children: this.children,
        label: this.label
      }
    }
  },
  methods: {
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    changeShow (e) {
      this.isShow = true
    },
    nodeClick (value) {
      this.$refs.select.toggleMenu()
      this.select_ = value[this.parent_id]
      this.$emit('change', value[this.value]) // v-mode
      this.$emit('update:name', value[this.label]) // bind:name
      this.$emit('update:select', value[this.value]) // bind:value
      this.$emit('selectChange', value)
    }
  },
  watch: {
    select_ (value) {
      this.$refs.tree.setCurrentKey(value)
    },
    select (value) {
      this.select_ = value
    }
  },
  mounted () {
    this.$nextTick(() => {
      // 保证完全挂载
      debugger
      this.$refs.tree.setCurrentKey(this.select)
    })
  }
}
</script>
