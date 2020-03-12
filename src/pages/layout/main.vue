<template>
<div>
   <div class="mainContent">
  </div>
</div>
</template>

<script>
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
  created () {

  },
  components: {
  }
}
</script>

<style>
.mainContent{
  height: 100%;
  overflow: auto;
}
</style>
