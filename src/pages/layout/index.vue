<template>
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <headerTop></headerTop>
    </el-header>
    <el-container>
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <menuList></menuList>
     </el-aside>
      <el-main>
         <Main></Main>
      </el-main>
    </el-container>
  </el-container>
</template>
<style>

</style>

<script>
import menuList from './menu'
import headerTop from './header'
import Main from './main'
export default {
  data () {
    return {
    }
  },
  components: {
    menuList,
    headerTop,
    Main
  }
}
</script>
