<template>
  <div>
    <el-table :data="tableData.list"  v-loading="loading"  size="small" stripe  :height="$tableHeight() + 50"  border  style="width: 100%">
      <el-table-column    align="center"    fixed   prop="id"      label="日志编号"    width="100"></el-table-column>
      <el-table-column    align="center"    fixed   prop="user_id"    label="用户ID" width="100"></el-table-column>
      <el-table-column    align="center"    fixed   prop="nick_name"    label="用户名" width="100"></el-table-column>
      <el-table-column    prop="action_method" label="请求地址" ></el-table-column>
      <el-table-column    label="参数" :show-overflow-tooltip="true">
        <template slot-scope="scope">
            <el-tooltip placement="top" effect="light">
                <div slot="content"><json-viewer :value="scope.row.action_params"></json-viewer></div>
                <span>{{scope.row.action_params}}</span>
            </el-tooltip>
        </template>
      </el-table-column>
       <el-table-column  align="center"      prop="action_ip"      label="IP地址" ></el-table-column>
      <el-table-column    align="center"    prop="action_time"      label="创建时间" ></el-table-column>
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
      this.loading = true
      let { data, code } = await this.Req.get(api.operationLos, this.queryParam)
      if (code === 200) {
        this.tableData = data
      }
      this.loading = false
    }
  },
  data () {
    return {
      queryParam: {
        page: 1,
        pageSize: 10
      },
      loading: false,
      tableData: []
    }
  },
  created () {
    this.init()
  }
}
</script>
