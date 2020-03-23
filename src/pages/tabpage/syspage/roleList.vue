<template>
  <div>
    <el-dialog  title="菜单权限"  :visible.sync="dialogVisible"   width="20%"  >
      <el-tree
        :data="dataTree"
        show-checkbox
        node-key="res_id"
        default-expand-all
        ref="tree"
        :props="defaultProps">
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog  title="新增角色"  :visible.sync="dialogVisiblerole"   width="25%"  >
      <el-form :model="roleValidateForm" ref="roleValidateForm" label-width="100px" class="demo-ruleForm">
          <el-form-item
            label="角色名"
            prop="role_name"
            :rules="[
              { required: true, message: '角色名不能为空'}
            ]"
          >
            <el-input type="input" v-model.number="roleValidateForm.role_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item    label="角色编码">
              <el-input type="input" v-model.number="roleValidateForm.role_code" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
         <el-button type="primary" @click="submitForm('roleValidateForm')">提交</el-button>
          <el-button @click="resetForm('roleValidateForm')">重置</el-button>
      </span>
    </el-dialog>
    <div class="btn-box">
      <el-button type="primary" @click="dialogVisiblerole= true">创建角色</el-button>
    </div>
    <el-table :data="tableData"    border    style="width: 100%">
      <el-table-column      fixed   prop="role_id"      label="角色ID"    width="150"></el-table-column>
      <el-table-column      fixed   prop="role_code"    label="角色编码"></el-table-column>
      <el-table-column      prop="role_name"      label="角色名称" ></el-table-column>
      <el-table-column      label="操作"     width="00">
          <template slot-scope="scope">
            <el-button @click="checksEdit(scope.row, true)" type="text" size="small">查看权限</el-button>
            <el-button @click="checksEdit(scope.row, false)" type="text" size="small">编辑权限</el-button>
            <el-button @click="changeRoleName(scope.row, false)" type="text" size="small">修改角色名</el-button>
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
      let { data, code } = await this.Req.get(api.getAllRole)
      if (code === 200) {
        this.tableData = data.roleList
      }
    },
    changeRoleName (row) {
      this.isRoleCheck = false
      this.dialogVisiblerole = true
      this.roleValidateForm = row
    },
    // 查看编辑
    checksEdit (row, flag) {
      this.dialogVisible = true
      this.isRoleCheck = true
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
      setDisabled(this.dataTree, flag)
    },
    // 获取菜单树
    async treeMenu () {
      let { data, code } = await this.Req.get(api.sysMenutree)
      if (code === 200) {
        this.dataTree = data.treeMenu
      }
    },
    async getRoleTreePer (roleid) {
      let { data, code } = await this.Req.get(api.getRoleTreePer, { role_id: roleid })
      if (code === 200) {
        this.$refs.tree.setCheckedKeys(data.res_id)
      }
    },
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
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isRoleCheck) {
            this.createRole()
          } else {
            this.updateRole()
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
      let { code, msg } = await this.Req.post(api.updateRole, {
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
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  data () {
    return {
      dialogVisible: false,
      dialogVisiblerole: false,
      tableData: [],
      dataTree: [],
      resIdarr: [],
      roleid: '',
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
    this.treeMenu()
  }
}
</script>

<style lang="">
  .btn-box{
    padding: 10px;
  }
</style>
