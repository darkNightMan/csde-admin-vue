<template>
<div>
  <el-tabs v-model="activeViewName" type="card"  @tab-remove="closeTabs" @tab-click="clickTab($event)">
    <el-tab-pane  v-for="(item) in tabViewList"
      :key="item.name"
      :label="item.res_name"
      :closable="item.closeTabs"
      :name="item.index"
      :activeIndex="item.menuIndex"
     >
      <transition name="el-zoom-in-top">
        <component :is="item.component"></component>
      </transition>
    </el-tab-pane>
  </el-tabs>
</div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'tabs',
  data () {
    return {
    }
  },
  created () {
  },
  computed: {
    ...mapState('tabs', ['tabViewList']),
    activeViewName: {
      get () {
        return this.$store.state.tabs.activeViewName
      },
      set (value) {
        this.setActiveTab(value)
      }
    }
  },
  methods: {
    ...mapMutations('tabs', ['setActiveTab', 'setMenuIndex', 'closeTabs']),
    clickTab (tabs) {
      this.setMenuIndex(tabs.$attrs.activeIndex)
      this.setActiveTab(tabs.name)
    }
  }
}
</script>
