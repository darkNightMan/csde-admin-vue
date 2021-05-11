<template>
  <div class="button" :style="{background: color}">
    {{text}}
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  name: 'button',
  props: {
    text: {
      type: String,
      default: '按钮',
      field: '按钮文案'
    },
    color: {
      type: String,
      default: 'red',
      field: '背景颜色'
    }
  }
}
</script>
<style lang="" scoped>
  .button{
    padding: 4px 10px;
    display: inline-block;
    color:#fff
  }
</style>
