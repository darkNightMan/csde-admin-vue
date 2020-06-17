<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#app{
  height: 100%;
  padding: 0;
  margin: 0;
  background-image:url('./assets/images/background-blog.svg');
  background-size: cover;
  overflow: hidden;
}
</style>
