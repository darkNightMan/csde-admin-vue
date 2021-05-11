<template>
<div class="right">
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="字段属性" name="1">
      <el-form ref="form"  label-width="80px">
        <div v-if="ComList[indexCurrent]">
          <el-form-item :label="item.field" v-for="(item, index) in ComList[indexCurrent].props" :key="index">
              <el-input v-model="item.default"></el-input>
          </el-form-item>
      </div>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="配置" name="2">
      <pre v-if="ComList[indexCurrent]">
        {{ ComList[indexCurrent].props}}
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
