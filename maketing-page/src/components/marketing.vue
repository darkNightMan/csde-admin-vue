<template>
  <div class="market-page">
    <div v-for="(item, index) in $mkConfig()" :key="index">
      <component :is="item.comTag" :style="item.styleCom"  :propsAttr="item.propsAttr" :comEvents="item.comEvents"></component>
    </div>
  </div>
</template>

<script>
export default {
  // 服务端都执行
  asyncData ({store, app}) {
    return store.dispatch('market/getConfig', app.$route.params.id) // 返回promise 
  },
  // 客户端和服务端都执行
  // async created () {
  //   this.$getConfig(this.$route.params.id)
  // },
  data () {
    return {
      ComList: []
    }
  },
  mounted () {
    console.log(this.$store)
  }
}
</script>

<style lang="less" scoped>
.market-page{
  max-width: 1200px;
  margin: 0 auto
}
</style>
