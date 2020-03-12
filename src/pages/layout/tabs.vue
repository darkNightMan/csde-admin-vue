<template>
<div>
  <el-tabs v-model="activeViewName" type="card" closable @tab-remove="removeTab" @tab-click="clickTab($event)">
    <el-tab-pane  v-for="(item) in tabViewList" :key="item.name" :label="item.name" :name="item.index" :activeIndex="item.menuIndex" :com="item.component">
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
      editableTabs: [{
        title: 'Tab 1',
        name: '1',
        content: 'Tab 1 content'
      }, {
        title: 'Tab 2',
        name: '2',
        content: 'Tab 2 content'
      }],
      tabIndex: 2
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
        debugger
        this.setActiveTab(value)
      }
    }
  },
  methods: {
    ...mapMutations('tabs', ['setActiveTab', 'setMenuIndex']),
    addTab (targetName) {
      let newTabName = ++this.tabIndex + ''
      this.editableTabs.push({
        title: 'New Tab',
        name: newTabName,
        content: 'New Tab content'
      })
      this.editableTabsValue = newTabName
    },
    removeTab (targetName) {
      debugger
      // let tabs = this.editableTabs
      // let activeName = this.editableTabsValue
      // if (activeName === targetName) {
      //   tabs.forEach((tab, index) => {
      //     if (tab.name === targetName) {
      //       let nextTab = tabs[index + 1] || tabs[index - 1]
      //       if (nextTab) {
      //         activeName = nextTab.name
      //       }
      //     }
      //   })
      // }
      // this.editableTabsValue = activeName
      // this.editableTabs = tabs.filter(tab => tab.name !== targetName)
    },
    clickTab (tabs) {
      debugger
      this.setMenuIndex(tabs.$attrs.activeIndex)
      this.setActiveTab(tabs.$attrs.index)
    }
  }
}
</script>
