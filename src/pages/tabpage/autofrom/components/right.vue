<template>
<div class="right">
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="属性" name="1">
      <el-form ref="form"  label-width="80px">
        <div  v-if="currentCom.type === 'button'">
            <el-form-item label="按钮类型">
                <el-input v-model="currentCom.comAttr.type"></el-input>
            </el-form-item>
            <el-form-item label="标签">
                <el-input v-model="currentCom.comAttr.btnText"></el-input>
            </el-form-item>
         </div>
      </el-form>
    </el-tab-pane>
    <!-- <el-tab-pane label="样式" name="2">
      <pre v-if="ComList[indexCurrent]">
        {{ ComList[indexCurrent].comStyle}}
      </pre>
    </el-tab-pane>
    <el-tab-pane label="事件" name="3">
      <pre v-if="ComList[indexCurrent]">
        {{ ComList[indexCurrent].events}}
      </pre>
    </el-tab-pane> -->
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
    // currentCom: {
    //   get () {
    //     debugger
    //     return this.$getterscurrentCom()
    //   }
    // },
    indexCurrent: {
      get () {
        return this.$indexCurrent()
      }
    },
    currentCom: {
      get () {
        return this.$currentCom()
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
