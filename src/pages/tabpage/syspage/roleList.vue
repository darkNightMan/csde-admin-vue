<template>
  <div>
    <el-dialog  title="菜单权限" :visible.sync="dialogVisible"  width="20%"  >
      <el-tree
        :data="dataTree"
        show-checkbox
        :expand-on-click-node="true"
        accordion highlight-current
        check-strictly
        node-key="res_id"
        ref="tree"
        :props="defaultProps">
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button size="small"  type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog :title="isRoleCheck ? '编辑角色' : '新增角色'"  :visible.sync="dialogVisiblerole" width="25%" >
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
      <el-button size="small" type="primary" @click="createDialog">创建角色</el-button>
    </div>
    <el-table :data="tableData" v-loading="loading"   border    style="width: 100%">
      <el-table-column      fixed   prop="role_id"      label="角色ID"    width="150"></el-table-column>
      <el-table-column      fixed   prop="role_code"    label="角色编码"></el-table-column>
      <el-table-column      prop="role_name"      label="角色名称" ></el-table-column>
      <el-table-column      label="操作"     width="00">
          <template slot-scope="scope">
            <el-tag @click="checksEdit(scope.row, true)" type="primary" size="mini" effect="dark">查看</el-tag>
            <el-tag @click="checksEdit(scope.row, false)" type="warning" size="mini" effect="dark">编辑</el-tag>
            <el-tag @click="changeRoleName(scope.row, false),isRoleCheck = true" type="success" effect="dark" size="small">修改</el-tag>
            <el-tag @click="deleteRole(scope.row, false)" type="danger" effect="dark" size="mini">删除</el-tag>
         </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { api } from '@/request/api.js'
export default {
  methods: {
    handleClose () {},
    async init () {
      this.loading = true
      let { data, code } = await this.Req.get(api.getAllRole)
      if (code === 200) {
        this.tableData = data.roleList
      }
      this.loading = false
    },
    changeRoleName (row) {
      this.dialogVisiblerole = true
      this.$nextTick(() => { // 确保dom渲染玩再做赋值处理不然当重置表单会有问题
        this.roleValidateForm = row
      })
    },
    // 查看编辑权限
    checksEdit (row, flag) {
      this.dialogVisible = true
      this.roleid = row.role_id
      this.getRoleTreePer(this.roleid)
      function setDisabled (trees, flag) {
        trees.map((it1) => {
          it1.disabled = flag
          if (it1.children) {
            setDisabled(it1.children, flag)
          }
        })
      }
      this.treeMenu(() => { // 当树加载完毕再修改disabled属性
        setDisabled(this.dataTree, flag)
      })
    },
    // 获取菜单树
    async treeMenu (callback) {
      let { data, code } = await this.Req.get(api.sysMenutree)
      if (code === 200) {
        this.dataTree = data
        callback()
      }
    },
    async getRoleTreePer (roleid) {
      let { data, code } = await this.Req.get(api.getRoleTreePer, { role_id: roleid })
      if (code === 200) {
        this.$refs.tree.setCheckedKeys(data.res_id)
      }
    },
    // 修改权限
    async submit () {
      let resIdArr = this.$refs.tree.getCheckedKeys()
      let { code, msg } = await this.Req.post(api.setRoleTreePer, {res_idArr: resIdArr, role_id: this.roleid})
      if (code === 200) {
        this.$message({
          message: msg,
          type: 'success'
        })
        this.dialogVisible = false
      } else {
        this.dialogVisible = false
        this.$message({
          message: msg,
          type: 'success'
        })
      }
    },
    // 编辑创建
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isRoleCheck) {
            this.updateRole()
          } else {
            this.createRole()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async createRole () {
      let { code, msg } = await this.Req.post(api.createRole, {
        role_name: this.roleValidateForm.role_name,
        role_code: this.roleValidateForm.role_code })
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
      }
    },
    async updateRole () {
      let { code, msg } = await this.Req.put(api.updateRole, {
        role_id: this.roleValidateForm.role_id,
        role_name: this.roleValidateForm.role_name,
        role_code: this.roleValidateForm.role_code })
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
      }
    },
    async deleteRole (row) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let param = { role_id: row.role_id }
        let { code, msg } = await this.Req.delete(api.deleteRole, {data: param})
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
    createDialog () {
      this.dialogVisiblerole = true
      this.isRoleCheck = false
      this.resetForm('roleValidateForm')
    },
    resetForm (formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields()
      })
    }
  },
  data () {
    return {
      dialogVisible: false,
      dialogVisiblerole: false,
      isRoleCheck: false,
      tableData: [],
      dataTree: [],
      resIdarr: [],
      roleid: '',
      loading: false,
      defaultProps: {
        children: 'children',
        label: 'res_name'
      },
      roleValidateForm: {
        role_name: '',
        role_code: '',
        role_id: ''
      }
    }
  },
  created () {
    this.init()
  }
}
</script>
