<template>
<div>
  <el-tabs v-model="activeViewName" type="card"  @tab-remove="closeTab" @tab-click="clickTab($event)">
    <el-tab-pane  v-for="(item) in $tabViewList()"
      :key="item.name"
      :label="item.res_name"
      :closable="item.closeTabs"
      :name="item.index"
      :activeIndex="item.menuIndex"
     >
     <keep-alive>
      <transition name="el-zoom-in-top">
        <div :style="{'height': $windowHeight() + 'px'}">
          <el-scrollbar  class='page-component__scroll'>
            <tabs-Component :com="item"></tabs-Component>
          </el-scrollbar>
        </div>
      </transition>
      </keep-alive>
    </el-tab-pane>
  </el-tabs>
</div>
</template>
<script>

// import { mapState } from 'vuex'
export default {
  name: 'tabs',
  data () {
    return {
    }
  },
  created () {
    console.log(this.$windowHeight())
  },
  computed: {
    activeViewName: {
      get () {
        return this.$activeViewName()
      },
      set (value) {
        this.$setActiveTab(value)
      }
    }
  },
  methods: {
    clickTab (tabs) {
      this.$setMenuIndex(tabs.$attrs.activeIndex)
      this.$setActiveTab(tabs.name)
    },
    closeTab (name) {
      this.$closeTabs(name)
    }
  }
}
</script>
<style>
.page-component__scroll{
  height: 100%;
}
.page-component__scroll .el-scrollbar__wrap {
 overflow-x: hidden;
}
</style>
