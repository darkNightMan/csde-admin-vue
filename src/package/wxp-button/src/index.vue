<template>
  <div class="button" :class="propsAttr.btnType" @click="clickFn">
    {{propsAttr.btnText}}
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  name: 'wxp-button',
  props: {
    propsAttr: {
      type: Object,
      default: () => {
        return {
        }
      }
    }
  },
  created () {
    console.log(this)
  },
  methods: {
    clickFn () {

    }
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
