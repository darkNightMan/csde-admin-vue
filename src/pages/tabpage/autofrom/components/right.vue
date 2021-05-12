<template>
<div class="right">
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="属性" name="1">
      {{comAttr}}
      {{ComList}}
      <el-form ref="form"  label-width="80px">
        <div v-if="ComList[indexCurrent]">
          <el-form-item :label="item.field" v-for="(item, index) in comAttr" :key="index">
              <el-input v-model="item.text"></el-input>
          </el-form-item>
      </div>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="样式" name="2">
      <pre v-if="ComList[indexCurrent]">
        {{ ComList[indexCurrent].comStyle}}
      </pre>
    </el-tab-pane>
    <el-tab-pane label="事件" name="3">
      <pre v-if="ComList[indexCurrent]">
        {{ ComList[indexCurrent].events}}
      </pre>
    </el-tab-pane>
  </el-tabs>

</div>
</template>
<script>
export default {
  data () {
    return {
      activeName: '1'
    }
  },
  created () {
    console.log()
  },
  computed: {
    ComList: {
      get () {
        return this.$comList()
      }
    },
    comAttr: {
      get () {
        return {}
      }
    },
    indexCurrent: {
      get () {
        return this.$indexCurrent()
      }
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style  scoped>
.right{
  /* border: 1px solid #eee; */
  height: 550px;
}
</style>
