<template>
  <div>
      <template v-for="(item, parentIndex) in menu">
          <el-menu :key="parentIndex"  :default-active="menuIndex">
            <!-- 如果一级菜单还有子集使用下面这个模板 -->
            <el-submenu  :index="String(parentIndex)" v-if="!item.hiddenMenu">
                <template slot="title" >
                    <i class="el-icon-message"></i>{{item.res_name}}
                </template>
                <template  v-for="(child, childrenIndex) in item.children">
                  <template  v-if="!child.children">
                      <!-- <router-link  :key="childrenIndex" :to="`${item.path}/${child.path}`" > -->
                        <el-menu-item :key="childrenIndex" @click="addView({view: child, menuIndex:`${parentIndex}-${childrenIndex}`})" :index="`${parentIndex}-${childrenIndex}`">{{child.res_name}}</el-menu-item>
                      <!-- </router-link> -->
                    </template>
                    <menu-item v-else  :key="childrenIndex" :routers="[child]"></menu-item>
                  </template>
              </el-submenu>
            </el-menu>
      </template>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  name: 'menuItem',
  props: {
    routers: Array
  },
  data () {
    return {
      data: ''
    }
  },
  mounted () {
    debugger
    console.log(this.menu, '123123')
    this.getMenuList(this.userInfo.user_id)
  },
  computed: {
    ...mapGetters('user', ['userInfo', 'menu']),
    ...mapState('tabs', ['menuIndex'])
  },
  methods: {
    ...mapActions('tabs', ['addView']),
    ...mapActions('user', ['getMenuList'])
  }
}
</script>

<style>
  .el-aside {
    color: #333;
  }
</style>
