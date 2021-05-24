<template>
    <div class="grid" :class="{dashed:isEdit}">
      <wxpGridItem :columns="propsAttr.rows.columns"  :gutter="propsAttr.rows.gutter"  :isEdit="isEdit"></wxpGridItem>
  </div>
</template>

<script>
import wxpGridItem from './grid'
export default {
  data () {
    return {}
  },
  components: {
    wxpGridItem
  },
  name: 'wxp-grid',
  props: {
    propsAttr: {
      type: Object,
      default: () => {
        return {}
      }
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  created () {
    console.log(this.propsAttr.rows)
  },
  methods: {
  }
}
</script>
<style lang="less" scoped>
.grid{
  padding: 6px;
   min-height: 70px;

}
.dashed{
   border: 1px #ccc dashed;
}

</style>
