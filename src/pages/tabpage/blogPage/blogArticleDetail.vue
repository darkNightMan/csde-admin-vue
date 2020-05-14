<template>
  <dir>
    11111111111111111111{{msg}}
  </dir>
</template>

<script>
export default {
  props: ['linkParam'],
  data () {
    return {
      msg: 1
    }
  },
  created () {
    console.log(this.linkParam, 'cre')
  }
}
</script>

<style>

</style>
