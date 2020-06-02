<template>
  <div>
    <el-dialog :title="isRoleCheck ? '编辑标签' : '新增标签'"  :visible.sync="dialogVisiblerole" width="20%" >
      <el-form :model="roleValidateForm" ref="roleValidateForm" label-width="100px" class="demo-ruleForm">
          <el-form-item   label="标签名"  prop="tags_name"  :rules="[
              { required: true, message: '标签名不能为空'}]">
            <el-input type="input" v-model="roleValidateForm.tags_name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
         <el-button type="primary" @click="submitForm('roleValidateForm')">提交</el-button>
          <el-button @click="resetForm('roleValidateForm')">重置</el-button>
      </span>
    </el-dialog>
     <div class="btn-box">
        <el-button  icon="el-icon-circle-plus-outline" type="primary" size="mini" @click="createDialog">新建</el-button>
        <!-- <el-button  :disabled="disbaledBtn" v-has="'sys:user:update'"   icon="el-icon-circle-plus-outline" type="primary" size="mini" @click="checksEdit">修改</el-button>
        <el-button  :disabled="disbaledBtn" v-has="'sys:user:delete'"   icon="el-icon-delete" type="danger" size="mini" @click="deleteUser">删除</el-button> -->
    </div>
     <el-table  @row-click="actionEvents" v-loading="loading"   :height="$tableHeight()"   :data="tableData.list"  size="small"   border  stripe  fit  highlight-current-row style="width: 100%">
      <el-table-column     align="center"   fixed   prop="tags_id"      label="ID"    width="100"></el-table-column>
      <el-table-column     align="center"   prop="tags_name"      label="标签名"></el-table-column>
      <el-table-column  label="操作">
          <template slot-scope="scope">
          <el-button @click="checksEdit(scope.row, false)" type="primary"  effect="dark" icon="el-icon-edit" size="mini">编辑</el-button>
          <el-button @click="deleteTags(scope.row, false)" type="danger"   effect="dark"  icon="el-icon-delete" size="mini">删除</el-button>
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
      let { data, code } = await this.Req.get(api.articleTagsList, this.queryParam)
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
        tags_id: row.tags_id,
        tags_name: row.tags_name
      }
    },
    deleteTags (row) {
      this.$confirm('此操作将永久删除该标签吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let { code, msg } = await this.Req.delete(api.deleteTagsList, { data: {tags_id: row.tags_id} })
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
    async updateTags () {
      let { code, msg } = await this.Req.put(api.updateTagsList, this.roleValidateForm)
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
      this.dialogVisiblerole = true
      this.isRoleCheck = false
      this.resetForm('roleValidateForm')
    },
    resetForm (formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields()
      })
    },
    async createTags () {
      let { code, msg } = await this.Req.post(api.createTagsList, this.roleValidateForm)
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
            this.updateTags()
          } else {
            this.createTags()
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
      queryParam: {
        page: 1,
        pageSize: 10,
        currentPage: 1
      },
      roleValidateForm: {
        tags_name: '',
        tags_id: ''
      }
    }
  },
  created () {
    this.init()
  }
}
</script>
