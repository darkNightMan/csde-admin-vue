<template>
  <div  v-loading="!menu">
      <template v-for="(item, parentIndex) in menu"  >
          <el-menu :key="parentIndex"  :default-active="menuIndex" >
            <!-- 如果一级菜单还有子集使用下面这个模板 -->
            <el-submenu  :index="String(parentIndex)" v-if="!item.hiddenMenu">
                <template slot="title" > <!--一级-->
                    <i :class="item.res_icon ? item.res_icon: 'el-icon-eleme'"></i>
                    {{item.res_name}}
                </template>
                <template  v-for="(child, childrenIndex) in item.children">
                    <template  v-if="!child.children">
                      <el-menu-item style="cursor: pointer" :key="childrenIndex" @click="addView({view: child, menuIndex:`${parentIndex}-${childrenIndex}`})" :index="`${parentIndex}-${childrenIndex}`">
                        <span class="menuName">{{child.res_name}}</span> <!--二级-->
                      </el-menu-item>
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
    this.userInfoMenu()
  },
  computed: {
    ...mapGetters('user', ['userInfo', 'menu']),
    ...mapState('tabs', ['menuIndex'])
  },
  methods: {
    ...mapActions('tabs', ['addView']),
    ...mapActions('user', ['userInfoMenu'])
  }
}
</script>

<style>
  .el-aside {
    color: #333;
  }
  .menuName{
    padding-left:20px;
    cursor: pointer;
  }
</style>
