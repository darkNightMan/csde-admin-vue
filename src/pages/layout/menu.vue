<template>
  <el-container :style="`height:100%;background:${theme.backGround};border-right:solid 1px #e6e6e6;`"  v-loading="!$menu()">
      <el-main style="padding:0px;">
        <el-scrollbar class="page-component__nav" style="height:100%">
          <template v-for="(item, parentIndex) in $menu()"  >
            <el-menu style="border-right:none;" :key="parentIndex"  :default-active="$menuIndex()" >
              <!-- 如果一级菜单还有子集使用下面这个模板 -->
              <el-submenu  :index="String(parentIndex)" v-if="!item.hiddenMenu">
                <template slot="title" > <!--一级-->
                    <i :class="item.res_icon ? item.res_icon: 'el-icon-eleme'"></i>
                    {{item.res_name}}
                </template>
                <template  v-for="(child, childrenIndex) in item.children">
                    <template  v-if="!child.children">
                      <el-menu-item style="cursor: pointer" :key="childrenIndex" @click="$addView({view: child, menuIndex:`${parentIndex}-${childrenIndex}`})" :index="`${parentIndex}-${childrenIndex}`">
                        <i :class="child.res_icon == null || child.res_icon == '' ? 'el-icon-eleme': child.res_icon"></i><span class="menuName">{{child.res_name}}</span> <!--二级-->
                      </el-menu-item>
                    </template>
                    <menu-item v-else  :key="childrenIndex" :routers="[child]"></menu-item>
                  </template>
              </el-submenu>
            </el-menu>
          </template>
        </el-scrollbar>
      </el-main>
  </el-container>
</template>
<script>
import { mapGetters } from 'vuex'
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
  },
  computed: {
    ...mapGetters('theme', ['theme'])
  }
}
</script>

<style>
  .el-aside {
    color: #333;
  }
  .menuName{
    /* padding-left:20px; */
    cursor: pointer;
  }
  .page-component__nav>.el-scrollbar__wrap {
    height: 100%;
    overflow-x: hidden;
}
</style>
