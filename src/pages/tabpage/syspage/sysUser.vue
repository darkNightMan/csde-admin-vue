<template>
  <div>
     <el-table    :data="tableData"    border    style="width: 100%">
      <el-table-column      fixed   prop="user_id"      label="用户ID"    width="150"></el-table-column>
      <el-table-column      fixed   prop="nick_name"      label="用户名"    width="150"></el-table-column>
      <el-table-column      prop="password"      label="密码"      width="120"> </el-table-column>
      <el-table-column      prop="email"      label="邮箱"      width="220"> </el-table-column>
      <el-table-column      prop="phone"      label="电话"      width="120"></el-table-column>
      <el-table-column      prop="login_time" label="登录时间" ></el-table-column>
      <el-table-column      prop="state"      label="状态"     ></el-table-column>
      <el-table-column      prop="login_ip"      label="登入IP"      width="120"></el-table-column>
      <el-table-column      prop="avatar"      label="头像"     > </el-table-column>
      <el-table-column      prop="create_time"      label="创建时间"      width="120"></el-table-column>
      <el-table-column      prop="update_id"      label="更新人"      width="120"></el-table-column>
      <el-table-column          label="操作"     >
          <template slot-scope="scope">
          <el-button @click="checksEdit(scope.row, true)" type="text" size="small">查看</el-button>
          <el-button @click="checksEdit(scope.row, false)" type="text" size="small">编辑</el-button>
      </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { api } from '@/request/api.js'
export default {
  methods: {
    // handleClose () {}
    async init () {
      let { data, code } = await this.Req.get(api.userAllList)
      if (code === 200) {
        this.tableData = data.userList
      }
    }
  },
  data () {
    return {
      tableData: [],
      dialogVisible: false,
      defaultProps: {
        children: 'children',
        label: 'res_name'
      }
    }
  },
  created () {
    this.init()
  }
}
</script>
