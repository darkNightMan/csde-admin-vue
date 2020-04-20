<template>
  <div>
     <el-dialog :title="isRoleCheck ? '编辑菜单' : '新增菜单'"  :visible.sync="dialogVisiblerole" width="30%" >
       {{roleValidateForm}}
      <el-form :model="roleValidateForm" ref="roleValidateForm" label-width="100px" class="demo-ruleForm">
         <el-form-item   label="类型"   prop="type"  :rules="[{ required: true, message: '菜单名不能为空'}]" >
             <el-radio-group v-model="roleValidateForm.type">
                <el-radio :label="1">目录</el-radio>
                <el-radio :label="2">菜单</el-radio>
                <el-radio :label="3">按钮</el-radio>
              </el-radio-group>
          </el-form-item>
         <el-form-item  prop="parent_id"   label="上级菜单">
               <el-select  v-model="roleValidateForm.parent_id" clearable placeholder="请选择" style="width:100%">
                <el-option
                  v-for="item in  selectMenuList.data"
                  :key="item.res_id"
                  :label="item.res_name"
                  :value="item.res_id">
                </el-option>
              </el-select>
          </el-form-item>
          <el-form-item   label="菜单名称"   prop="res_name"  :rules="[{ required: true, message: '菜单名不能为空'}]" >
            <el-input type="input" v-model="roleValidateForm.res_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item  prop="res_code"   label="菜单编码">
              <el-input type="input" v-model="roleValidateForm.res_code" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item  prop="component"   label="菜单组件">
              <el-input type="input" v-model="roleValidateForm.component" autocomplete="off"></el-input>
          </el-form-item>
           <el-form-item  prop="res_icon"   label="ICON图标">
              <el-input type="input" v-model="roleValidateForm.res_icon" autocomplete="off"></el-input>
          </el-form-item>
           <el-form-item  prop="description"   label="菜单描述">
              <el-input type="input" v-model="roleValidateForm.description" autocomplete="off"></el-input>
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
    <el-table  v-loading="loading"  :data="tableData.list" :height="winH"    border    style="width: 100%">
      <el-table-column      prop="res_id"      label="res_id"   ></el-table-column>
      <el-table-column      prop="parent_id"      label="parent_id"    ></el-table-column>
      <el-table-column      prop="res_name"      label="菜单名"     > </el-table-column>
      <el-table-column      prop="component"      label="菜单组件名"    > </el-table-column>
      <el-table-column      prop="res_icon"      label="菜单ICON"      width="120"></el-table-column>
      <el-table-column      prop="res_code"      label="菜单编码"      width="120"></el-table-column>
      <el-table-column      prop="sort"      label="排序"   ></el-table-column>
      <el-table-column      prop="state"      label="状态"     ></el-table-column>
      <el-table-column      prop="type"      label="类型"    > </el-table-column>
      <el-table-column      prop="create_time"      label="创建时间"     ></el-table-column>
      <el-table-column      prop="description"      label="描述"      width="120"></el-table-column>
      <el-table-column      label="操作"  >
          <template slot-scope="scope" v-if="scope.row.res_id">
          <el-tag @click="checksEdit(scope.row, false)" type="primary"  effect="dark" size="mini">编辑</el-tag>
          <el-tag @click="deleteUser(scope.row, false)" type="danger" effect="dark" size="mini">删除</el-tag>
      </template>
      </el-table-column>
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
  methods: {
    handleClick (row) {
      console.log(row)
    },
    async init () {
      try {
        this.loading = true
        let { data, code } = await this.Req.get(api.menuList, this.queryParam)
        this.selectMenuList = await this.Req.get(api.selectMenuList)
        if (code === 200) {
          this.tableData = data
        }
        this.loading = false
      } catch (ex) {
        console.log(ex)
      }
    },
    handleSizeChange (pageSize) {
      this.queryParam.pageSize = pageSize
      this.init()
    },
    handleCurrentChange (page) {
      this.queryParam.page = page
      this.init()
    },
    async createDialog () {
      this.dialogVisiblerole = true
      this.isRoleCheck = false
      this.roleValidateForm.res_id = ''
      this.resetForm('roleValidateForm')
    },
    checksEdit (row) {
      this.isRoleCheck = true
      this.dialogVisiblerole = true
      this.roleValidateForm = {
        res_id: row.res_id,
        res_name: row.res_name,
        parent_id: row.parent_id,
        component: row.component,
        description: row.description,
        res_code: row.res_code,
        res_icon: row.res_icon
      }
    },
    async createMenu () {
      let { code, msg } = await this.Req.post(api.createMenu, this.roleValidateForm)
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
      this.$confirm('此操作将永久删除该菜单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let { code, msg } = await this.Req.delete(api.deleteMenu, {data: {res_id: row.res_id}})
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
    async updateuMenu () {
      let { code, msg } = await this.Req.put(api.updateMenu, this.roleValidateForm)
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
    resetForm (formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields()
      })
    },
    // 编辑创建
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isRoleCheck) {
            this.updateuMenu()
          } else {
            this.createMenu()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  computed: {
    ...mapGetters('app', ['winH'])
  },
  data () {
    return {
      loading: false,
      tableData: [],
      selectMenuList: [],
      queryParam: {
        page: 1,
        pageSize: 10
      },
      isRoleCheck: false,
      dialogVisiblerole: false,
      roleValidateForm: {
        type: '',
        res_id: '',
        res_name: '',
        parent_id: '',
        component: '',
        description: '',
        res_code: '',
        res_icon: ''
      }
    }
  },
  created () {
    this.init()
  }
}
</script>
