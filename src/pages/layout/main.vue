<template>
<div>
  <tabs></tabs>
   <div class="mainContent">
    <el-table :data="tableData">
      <el-table-column prop="date" label="日期" width="140">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="address" label="地址">
      </el-table-column>
    </el-table>
  </div>
</div>
</template>

<script>
import tabs from './tabs'

export default {
  name: 'Main',
  data () {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }
    return {
      tableData: Array(20).fill(item)
    }
  },
  components: {
    tabs
  }
}
</script>

<style>
.mainContent{
  height: 100%;
  overflow: auto;
}
</style>
