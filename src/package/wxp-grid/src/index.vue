<template>
    <div class="grid">
      <wxpGridItem :columns="propsAttr.rows.columns"  :gutter="propsAttr.rows.gutter"  @dragStart="dragStart" @handleColAdd="handleColAdd"></wxpGridItem>
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
    }
  },
  created () {
    console.log(this.propsAttr.rows)
  },
  methods: {
    dragStart (i, d) {
      this.$emit('dragStart', i)
    },
    handleColAdd (i, d) {
    },
    end (item) {
    }
  }
}
</script>
<style lang="less" scoped>
.grid{
  padding: 6px;
   min-height: 70px;
  border: 1px #ccc dashed;
}

</style>
