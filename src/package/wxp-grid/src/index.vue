<template>
    <div class="grid">
      <wxpGridItem :columns="propsAttr.rows.columns" @dragStart="dragStart" @handleColAdd="handleColAdd"></wxpGridItem>
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
      debugger
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
  padding: 4px;
}
  .button{
    padding: 4px 10px;
    display: inline-block;
    color:#fff;
    border: 1px solid #eee;
  &.default{
    background-color:#fff;
     color:#333;
  }
  &.primary{
    background-color: hsl(210deg 100% 63%);
  };
  &.success{
    background-color: hsl(100deg 54% 49%);
  };
  &.danger{
    background-color: hsl(0deg 87% 69%);
  }
};

</style>
