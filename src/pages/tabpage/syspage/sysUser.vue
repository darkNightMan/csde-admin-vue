<template>
  <div>
    <el-dialog :title="isRoleCheck ? '编辑用户' : '新增用户'"  :visible.sync="dialogVisiblerole" width="20%" >
      <el-form :model="roleValidateForm" ref="roleValidateForm" label-width="100px" class="demo-ruleForm">
          <el-form-item   label="角色"  prop="role_id"  :rules="[ { required: true, message: '角色名不能为空'}]">
            <el-select multiple v-model="roleValidateForm.role_id" placeholder="请选择角色" style="width:100%">
              <el-option  v-for="item in roleList"  :key="item.role_id"  :label="item.role_name" :value="item.role_id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item   label="用户名"  prop="nick_name"  :rules="[
              { required: true, message: '用户名不能为空'}]">
            <el-input type="input" v-model="roleValidateForm.nick_name" autocomplete="off"></el-input>
          </el-form-item>
         <el-form-item   label="电话"  prop="phone"  :rules="[
              { required: true, message: '电话名不能为空'}]">
            <el-input type="input" v-model="roleValidateForm.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item   label="密码"  prop="password"  :rules="[
              { required: true, message: '密码名不能为空'}]">
            <el-input type="input" v-model="roleValidateForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item   label="email"  prop="email">
            <el-input type="input" v-model="roleValidateForm.email" autocomplete="off"></el-input>
          </el-form-item>
           <el-form-item   label="avatar"  prop="avatar">
            <el-input type="input" v-model="roleValidateForm.avatar" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
         <el-button type="primary" @click="submitForm('roleValidateForm')">提交</el-button>
          <el-button @click="resetForm('roleValidateForm')">重置</el-button>
      </span>
    </el-dialog>
     <div class="btn-box">
        <el-button v-has="'sys:user:create'"   icon="el-icon-circle-plus-outline" type="primary" size="mini" @click="createDialog">新建</el-button>
        <!-- <el-button  :disabled="disbaledBtn" v-has="'sys:user:update'"   icon="el-icon-circle-plus-outline" type="primary" size="mini" @click="checksEdit">修改</el-button>
        <el-button  :disabled="disbaledBtn" v-has="'sys:user:delete'"   icon="el-icon-delete" type="danger" size="mini" @click="deleteUser">删除</el-button> -->
    </div>
     <el-table  @row-click="actionEvents" v-loading="loading"   :data="tableData.list"  size="small"     :height="winH"  border  stripe  fit  highlight-current-row style="width: 100%">
      <el-table-column      fixed   prop="user_id"      label="ID"    width="50"></el-table-column>
      <el-table-column      fixed  prop="nick_name"      label="用户名"    width="120"></el-table-column>
      <el-table-column      prop="password"      label="密码"      width="120"> </el-table-column>
      <el-table-column      prop="email"      label="邮箱"   width="120"> </el-table-column>
      <el-table-column      prop="phone"      label="电话"      width="120"></el-table-column>
      <el-table-column      prop="state"      label="状态"  width="80"   ></el-table-column>
      <el-table-column     label="角色"   >
            <template slot-scope="scope">
              <el-tag style="margin:0px 5px" type="primary" effect="dark" v-for="(it, index) in scope.row.roleList" :key="index" size="small">
                {{it.role_name}}
              </el-tag>
            </template>
      </el-table-column>
      <el-table-column      prop="avatar"      label="头像"     > </el-table-column>
      <el-table-column      prop="create_time"      label="创建时间"      ></el-table-column>
      <el-table-column      prop="update_id"      label="更新人"      width="120"></el-table-column>
      <el-table-column  label="操作">
          <template slot-scope="scope">
          <!-- <el-button @click="checksEdit(scope.row, true)" type="primary" size="small">查看</el-button> -->
          <el-button @click="checksEdit(scope.row, false)" type="primary" v-has="'sys:user:update'"  effect="dark" icon="el-icon-edit" size="mini">编辑</el-button>
          <el-button @click="deleteUser(scope.row, false)" type="danger"  v-has="'sys:user:delete'" effect="dark"  icon="el-icon-delete" size="mini">删除</el-button>
      </template>
      </el-table-column>
    </el-table>
     <div class="page-bottom">
       <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryParam.currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="queryParam.pageSize"
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
  props: [],
  methods: {
    handleSizeChange (pageSize) {
      this.queryParam.pageSize = pageSize
      this.init()
    },
    handleCurrentChange (page) {
      this.queryParam.page = page
      this.init()
    },
    // handleClose () {}
    async init () {
      this.loading = true
      let { data, code } = await this.Req.get(api.userAllList, this.queryParam)
      if (code === 200) {
        this.tableData = data
      }
      this.loading = false
    },
    actionEvents (row) {
      this.currRow = row
    },
    checksEdit (row) {
      this.isRoleCheck = true
      this.dialogVisiblerole = true
      this.roleValidateForm = {
        user_id: row.user_id,
        nick_name: row.nick_name,
        password: row.password,
        email: row.email,
        phone: row.phone,
        avatar: row.avatar,
        role_id: row.roleList ? getRole(row.roleList) : []
      }
      function getRole (roleList) {
        let roleid = []
        roleList.map((it) => {
          roleid.push(it.role_id)
        })
        return roleid
      }
    },
    deleteUser (row) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let { code, msg } = await this.Req.delete(api.deleteUser, { data: {user_id: row.user_id} })
        if (code === 200) {
          this.init()
          this.$message({
            type: 'success',
            message: msg
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async getroleList () {
      let { data, code } = await this.Req.get(api.getAllRole)
      if (code === 200) {
        this.roleList = data.roleList
      }
    },
    async updateuUser () {
      let { code, msg } = await this.Req.put(api.updateUser, this.roleValidateForm)
      if (code === 200) {
        this.init()
        this.$message({
          message: msg,
          type: 'success'
        })
        this.dialogVisiblerole = false
      } else {
        this.dialogVisiblerole = false
        this.$message({
          message: msg,
          type: 'success'
        })
        this.resetForm('roleValidateForm')
      }
    },
    createDialog () {
      this.dialogVisiblerole = true
      this.isRoleCheck = false
      this.resetForm('roleValidateForm')
    },
    resetForm (formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields()
      })
    },
    async createUser () {
      let { code, msg } = await this.Req.post(api.createUser, this.roleValidateForm)
      if (code === 200) {
        this.init()
        this.$message({
          message: msg,
          type: 'success'
        })
        this.dialogVisiblerole = false
      } else {
        this.dialogVisiblerole = false
        this.$message({
          message: msg,
          type: 'success'
        })
        this.resetForm('roleValidateForm')
      }
    },
    // 编辑创建
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isRoleCheck) {
            this.updateuUser()
          } else {
            this.createUser()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  data () {
    return {
      tableData: [],
      roleList: [],
      isRoleCheck: false,
      dialogVisiblerole: false,
      defaultProps: {
        children: 'children',
        label: 'res_name'
      },
      queryParam: {
        page: 1,
        pageSize: 10,
        currentPage: 1
      },
      // 当前选择行
      currRow: null,
      roleValidateForm: {
        nick_name: '',
        password: '',
        email: '',
        phone: '',
        avatar: '',
        role_id: []
      }
    }
  },
  filters: {
  },
  computed: {
    ...mapGetters('app', ['winH']),
    disbaledBtn () {
      return this.currRow === null
    }
  },
  created () {
    this.init()
    this.getroleList()
  }
}
</script>
