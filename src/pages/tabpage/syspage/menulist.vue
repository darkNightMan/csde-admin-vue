<template>
  <div>
     <el-dialog :title="isRoleCheck ? '编辑菜单' : '新增菜单'"  :visible.sync="dialogVisiblerole" width="25%" >
      <el-form :model="roleValidateForm" ref="roleValidateForm" label-width="100px" class="demo-ruleForm">
          <el-form-item
            label="角色名"
            prop="role_name"
            :rules="[
              { required: true, message: '角色名不能为空'}
            ]"
          >
            <el-input type="input" v-model="roleValidateForm.role_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item  prop="role_code"   label="角色编码">
              <el-input type="input" v-model="roleValidateForm.role_code" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
         <el-button type="primary" @click="submitForm('roleValidateForm')">提交</el-button>
          <el-button @click="resetForm('roleValidateForm')">重置</el-button>
      </span>
    </el-dialog>
    <div class="btn-box">
      <el-button type="primary" size="small" @click="createDialog">新建菜单</el-button>
    </div>
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
  </div>
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
    },
    createDialog () {
      this.dialogVisiblerole = true
      this.isRoleCheck = false
      this.resetForm('roleValidateForm')
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
    deleteUser (row) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let { code, msg } = await this.Req.post(api.deleteUser, {user_id: row.user_id})
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
      isRoleCheck: false,
      dialogVisiblerole: false,
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
  created () {
    this.init()
  }
}
</script>
<style lang="">
  .btn-box{
    padding: 10px 0;
  }
</style>
