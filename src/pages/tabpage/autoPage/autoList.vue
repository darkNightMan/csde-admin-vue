<template>
  <div>
    <el-dialog :title="isRoleCheck ? '编辑' : '新增'"  :visible.sync="dialogVisiblerole" width="25%" >
      <el-form :model="roleValidateForm" ref="roleValidateForm" label-width="100px" class="demo-ruleForm">
          <el-form-item   label="分类名"  prop="class_name"  :rules="[{ required: true, message: '名不能为空'}]">
            <el-input type="input" v-model="roleValidateForm.class_name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
         <el-button type="primary" @click="submitForm('roleValidateForm')">提交</el-button>
          <el-button @click="resetForm('roleValidateForm')">重置</el-button>
      </span>
    </el-dialog>
     <div class="btn-box">
        <el-button   icon="el-icon-circle-plus-outline" type="primary" size="mini" @click="createDialog">新建</el-button>
    </div>
     <el-table  @row-click="actionEvents" v-loading="loading"   :height="$tableHeight()"   :data="tableData.list"  size="small"   border  stripe  fit  highlight-current-row style="width: 100%">
        <el-table-column     align="center"   fixed   prop="id"      label="ID"    width="100"></el-table-column>
        <el-table-column     align="center"   prop="mk_name"      label="页面名称"></el-table-column>
        <el-table-column     align="center"   prop="create_time"      label="创建时间"></el-table-column>
        <el-table-column     align="center"   prop="update_time"      label="更新时间"></el-table-column>
        <el-table-column     align="center"      label="地址">
           <template slot-scope="scope">
              maketint-{{scope.row.id}}.html
            </template>
        </el-table-column>
      <el-table-column  label="操作">
        <template slot-scope="scope">
          <el-button @click="checksEdit(scope.row, false)" type="primary"  effect="dark" icon="el-icon-edit" size="mini">编辑</el-button>
          <el-button @click="deleteClass(scope.row, false)" type="danger"  effect="dark"  icon="el-icon-delete" size="mini">删除</el-button>
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
    async init () {
      this.loading = true
      let { data, code } = await this.Req.get(api.maketingList, this.queryParam)
      if (code === 200) {
        this.tableData = data
      }
      this.loading = false
    },
    actionEvents (row) {
      this.currRow = row
    },
    checksEdit (row) {
      // this.isRoleCheck = true
      // this.dialogVisiblerole = true
      // this.roleValidateForm = {
      //   class_name: row.class_name,
      //   id: row.id
      // }
      this.$addView(
        {
          view: {
            component: 'autoConfig',
            res_name: row.id ? `编辑-${row.mk_name}` : '新增页面',
            params: {id: row.id, init: this.init}
          }
        }
      )
    },
    deleteClass (row) {
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let { code, msg } = await this.Req.delete(api.maketingDelete, { data: { id: row.id } })
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
    async updateClassList () {
      let { code, msg } = await this.Req.put(api.maketingUpdate, this.roleValidateForm)
      if (code === 200) {
        this.init()
        this.$message({
          message: msg,
          type: 'success'
        })
        this.dialogVisiblerole = false
      } else {
        this.dialogVisiblerole = false
        this.resetForm('roleValidateForm')
      }
    },
    createDialog () {
      this.$addView(
        {
          view: {
            component: 'autoConfig',
            res_name: '新增页面',
            params: {init: this.init}
          }
        }
      )
    },
    resetForm (formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields()
      })
    },
    async createArticleClass () {
      let { code, msg } = await this.Req.post(api.maketingCreate, this.roleValidateForm)
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
            this.updateClassList()
          } else {
            this.createArticleClass()
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
        id: '',
        class_name: ''
      }
    }
  },
  filters: {
  },
  computed: {
    ...mapGetters('app', ['winH'])
  },
  created () {
    this.init()
  }
}
</script>
