
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import marketing from './components/marketing'
export default {
  name: 'app',
  components: {
    marketing
  },
  data () {
    return {
      marketing: false
    }
  }
}

</script>
