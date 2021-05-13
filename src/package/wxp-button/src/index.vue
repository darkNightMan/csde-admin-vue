<template>
  <div class="button" :class="type">
    {{btnText}}
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  name: 'wxp-button',
  props: {
    type: {
      type: String,
      default: 'default'
    },
    btnText: {
      type: {
        type: String,
        default: '按钮'
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
