<template>
  <el-table    :data="tableData"    border    style="width: 100%">
    <el-table-column      fixed   prop="res_id"      label="res_id"    width="150"></el-table-column>
    <el-table-column      fixed   prop="parent_id"      label="父级菜单"    width="150"></el-table-column>
    <el-table-column      prop="res_name"      label="菜单名"     > </el-table-column>
    <el-table-column      prop="component"      label="菜单组件名"    > </el-table-column>
    <el-table-column      prop="res_icon"      label="菜单ICON"      width="120"></el-table-column>
    <el-table-column      prop="res_code"      label="菜单编码"      width="120"></el-table-column>
    <el-table-column      prop="sort"      label="排序"      width="300"></el-table-column>
    <el-table-column      prop="state"      label="状态"     ></el-table-column>
    <el-table-column      prop="type"      label="类型"    > </el-table-column>
    <el-table-column      prop="create_time"      label="创建时间"     ></el-table-column>
    <el-table-column      prop="dsecription"      label="描述"      width="120"></el-table-column>
    <el-table-column      fixed="right"      label="操作"      >
        <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
    </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { api } from '@/request/api.js'
export default {
  methods: {
    handleClick (row) {
      console.log(row)
    },
    async init () {
      let { data, code } = await this.Req.get(api.menuList)
      if (code === 200) {
        this.tableData = data
      }
    }
  },

  data () {
    return {
      tableData: []
    }
  },
  created () {
    this.init()
  }
}
</script>
