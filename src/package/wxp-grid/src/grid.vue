<template>
  <div class="wxp-grid-item">
    <el-row :gutter="gutter">
      <el-col class="grid-item" :class="{dashed: isEdit }" v-for="(item, index) in columns" :span="item.span" :key="index" >
        <contentItem :list="item.list"></contentItem>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import contentItem from '@/pages/tabpage/autofrom/components/contentItem'
export default {
  components: {
    contentItem
  },
  data () {
    return {
      a: []
    }
  },
  name: 'wxp-grid-item',
  props: {
    columns: {
      type: Object,
      default: () => {
        return {}
      }
    },
    gutter: {
      type: Number,
      default: 0
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  created () {
  },
  methods: {
  }
}
</script>
<style lang="less" scoped>
.grid-item{
  padding: 4px;
  min-height: 70px;

}
 .dashed{
     border: 1px #ccc dashed;
  }

</style>
