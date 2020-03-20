<template>
  <el-container class="container-box">
    <el-header>
      <headerTop></headerTop>
    </el-header>
    <el-container>
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <menuList></menuList>
     </el-aside>
      <el-main>
         <tabs></tabs>
      </el-main>
    </el-container>
  </el-container>
</template>
<style>

</style>

<script>
import menuList from './menu'
import tabs from './tabs'
import headerTop from './header'
import router from '../../router/index'

export default {
  data () {
    return {
      data: router
    }
  },
  components: {
    menuList,
    headerTop,
    // Main,
    tabs
  }
}
</script>

<style scoped>
.container-box{
  background-color: #fff;
}
html,body,#app{
  background-color: #fff;
}
</style>
