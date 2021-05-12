<template>
  <div class="button">
    {{text}}
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  name: 'wxp-button',
  props: {
    text: {
      type: String,
      default: '按钮'
    }
  },
  created () {
    console.log(this)
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
