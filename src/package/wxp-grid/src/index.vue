<template>
  <el-row>
    <el-col v-for="(item, index) in propsAttr.columns" :span="item.span" :key="index" >
      <vuedraggable :group="{ name: 'g1' }" >
        {{item}}
           <wxp-grid :propsAttr="item.list"></wxp-grid>
      </vuedraggable>
      </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {}
  },
  name: 'wxp-grid',
  props: {
    propsAttr: {
      type: Object,
      default: () => {
        return {
          columns: [
            {
              span: 12,
              list: []
            },
            {
              span: 12,
              list: []
            }
          ]
        }
      }
    }
  },
  created () {
    console.log(this)
  }
}
</script>
<style lang="less" scoped>
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
