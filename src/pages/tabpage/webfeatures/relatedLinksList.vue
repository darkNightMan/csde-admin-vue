<template>
  <div>
    <el-dialog :title="isRoleCheck ? '编辑' : '新增'"  :visible.sync="dialogVisiblerole" width="25%" >
      <el-form :model="roleValidateForm" ref="roleValidateForm" label-width="100px" class="demo-ruleForm">
          <el-form-item   label="用户名"  prop="nick_name"  :rules="[
              { required: true, message: '用户名不能为空'}]">
            <el-input type="input" v-model="roleValidateForm.nick_name" autocomplete="off"></el-input>
          </el-form-item>
           <el-form-item   label="网站地址"  prop="url"  :rules="[
              { required: true, message: '网站地址不能为空'}]">
            <el-input type="input" v-model="roleValidateForm.url" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item   label="图标"  prop="icon" >
            <el-input type="input" v-model="roleValidateForm.icon" autocomplete="off"></el-input>
          </el-form-item>
           <el-form-item   label="描述"  prop="description" >
            <el-input type="input" v-model="roleValidateForm.description" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
         <el-button type="primary" @click="submitForm('roleValidateForm')">提交</el-button>
          <el-button @click="resetForm('roleValidateForm')">重置</el-button>
      </span>
    </el-dialog>
     <div class="btn-box">
        <el-button  icon="el-icon-circle-plus-outline" type="primary" size="mini" @click="createDialog">新建</el-button>
    </div>
     <el-table  @row-click="actionEvents" v-loading="loading"   :height="$tableHeight()"   :data="tableData.list"  size="small"   border  stripe  fit  highlight-current-row style="width: 100%">
      <el-table-column     align="center"   fixed   prop="id"      label="ID"    width="100"></el-table-column>
      <el-table-column     align="center"   prop="nick_name"      label="用户名"></el-table-column>
      <el-table-column     align="center"   prop="url"      label="网站地址"></el-table-column>
        <el-table-column     align="center"       label="图标">
             <template slot-scope="scope">
               <el-avatar :src="scope.row.icon"></el-avatar>
             </template>
        </el-table-column>
          <el-table-column     align="center"   prop="description"      label="描述"></el-table-column>
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
      let { data, code } = await this.Req.get(api.relatedLinksList, this.queryParam)
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
        id: row.id,
        nick_name: row.nick_name,
        url: row.url,
        icon: row.icon,
        description: row.description
      }
    },
    deleteTags (row) {
      this.$confirm('此操作将永久删除该标签吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let { code, msg } = await this.Req.delete(api.deleteRelatedLinksList, { data: {id: row.id} })
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
      let { code, msg } = await this.Req.put(api.updateRelatedLinksList, this.roleValidateForm)
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
      let { code, msg } = await this.Req.post(api.createRelatedLinksList, this.roleValidateForm)
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
        id: '',
        nick_name: '',
        url: '',
        icon: '',
        description: ''
      }
    }
  },
  created () {
    this.init()
  }
}
</script>
