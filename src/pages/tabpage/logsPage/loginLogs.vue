<template>
  <div>
    <el-table :data="tableData.list"  :height="winH"  border  style="width: 100%">
      <el-table-column      fixed   prop="id"      label="日志编号"    width="150"></el-table-column>
      <el-table-column      fixed   prop="user_id"    label="用户ID"></el-table-column>
      <el-table-column      fixed   prop="user_name"    label="用户名"></el-table-column>
      <el-table-column     label="角色名"  >
          <template slot-scope="scope">
            <el-tag style="margin:5px" type="primary" effect="dark" v-for="(it, index) in scope.row.roleList" :key="index" size="small">
              {{it.role_name}}
            </el-tag>
          </template>
      </el-table-column>
      <el-table-column      prop="login_ip"      label="IP地址" ></el-table-column>
      <el-table-column      prop="login_address" label="地点" ></el-table-column>
      <el-table-column      prop="login_time"      label="登录时间" ></el-table-column>
      <el-table-column      prop="login_description"      label="登录描述" ></el-table-column>
       <el-table-column     prop="login_agent"     label="登录设备" ></el-table-column>
      <!-- <el-table-column      label="操作"     width="00">
          <template slot-scope="scope">
            {{scope.row.user_id}}
            <el-button @click="checksEdit(scope.row, true)" type="primary" size="mini">查看权限</el-button>
            <el-button @click="checksEdit(scope.row, false)" type="warning" size="mini">编辑权限</el-button>
            <el-button @click="changeRoleName(scope.row, false),isRoleCheck = true" type="success" size="small">修改角色名</el-button>
            <el-button @click="deleteRole(scope.row, false)" type="danger" size="mini">删除角色</el-button>
         </template>
      </el-table-column> -->
    </el-table>
    <div class="page-bottom">
       <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="tableData.currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="tableData.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.totalCount">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { api } from '@/request/api.js'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('user', ['userInfo']),
    ...mapGetters('app', ['winH'])
  },
  methods: {
    handleClose () {},
    handleSizeChange (pageSize) {
      this.queryParam.pageSize = pageSize
      this.init()
    },
    handleCurrentChange (page) {
      this.queryParam.page = page
      this.init()
    },
    async init () {
      let { data, code } = await this.Req.get(api.loginLogs, this.queryParam)
      if (code === 200) {
        this.tableData = data
      }
    }
  },
  data () {
    return {
      queryParam: {
        page: 1,
        pageSize: 10
      },
      tableData: []
    }
  },
  created () {
    this.init()
  }
}
</script>
