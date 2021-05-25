
<template>
  <div id="app">
    <marketing />
  </div>
</template>
<script>
import marketing from './components/marketing'
export default {
  name: 'app',
  data () {
    return {
      marketing: false
    }
  },
  components: {
    marketing
  }
}

</script>
