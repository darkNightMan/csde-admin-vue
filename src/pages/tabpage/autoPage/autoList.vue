<template>
  <div>
    <el-dialog :title="isRoleCheck ? '编辑' : '新增'"  :visible.sync="dialogVisiblerole" width="25%" >
      <el-form :model="roleValidateForm" ref="roleValidateForm" label-width="100px" class="demo-ruleForm">
          <el-form-item   label="页面名称"  prop="mk_name"  :rules="[{ required: true, message: '页面名不能为空'}]">
            <el-input type="input" v-model="roleValidateForm.mk_name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
         <el-button type="primary" @click="submitForm('roleValidateForm')">继续</el-button>
          <el-button @click="resetForm('roleValidateForm')">重置</el-button>
      </span>
    </el-dialog>
     <div class="btn-box">
        <el-button   icon="el-icon-circle-plus-outline" type="primary" size="mini" @click="createDialog">创建页面</el-button>
    </div>
     <el-table  @row-click="actionEvents" v-loading="loading"   :height="$tableHeight()"   :data="tableData.list"  size="small"   border  stripe  fit  highlight-current-row style="width: 100%">
        <el-table-column     align="center"   fixed   prop="id"      label="ID"    width="100"></el-table-column>
        <el-table-column     align="center"       label="查看配置">
          <template slot-scope="scope">
              <el-button size="mini" type="success" @click="dialogVisibleJson = true, mkconfig = scope.row.mk_config">查看配置</el-button>
          </template>
        </el-table-column>
         <el-table-column     align="center"   prop="mk_name"      label="页面名称"></el-table-column>
        <el-table-column     align="center"   prop="create_time"      label="创建时间"></el-table-column>
        <el-table-column     align="center"   prop="update_time"      label="更新时间"></el-table-column>
        <el-table-column     align="center"      label="地址">
           <template slot-scope="scope">
              marketint-{{scope.row.id}}.html
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
     <el-dialog    title="JOSN 数据"    :visible.sync="dialogVisibleJson"    width="50%">
      <json-viewer :value="JSON.parse(mkconfig)" :copyable="{copiedText:'复制成功', copyText:'复制'}"  :expand-depth="5" theme="jv-light"></json-viewer>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleJson = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisibleJson = false">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
import { api } from '@/request/api.js'
import { mapGetters } from 'vuex'
export default {
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
      let { data, code } = await this.Req.get(api.marketingList, this.queryParam)
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
        mk_name: row.mk_name,
        mk_config: row.mk_config
      }
    },
    deleteClass (row) {
      this.$confirm('此操作将永久删除页面, 是否继续?', '提示', {
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
      this.dialogVisiblerole = true
      this.isRoleCheck = false
      this.roleValidateForm = {
        id: '',
        mk_name: '',
        mk_config: ''
      }
      this.resetForm('roleValidateForm')
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
          this.$addView(
            {
              view: {
                component: 'autoConfig',
                res_name: this.roleValidateForm.id ? `编辑-${this.roleValidateForm.mk_name}页面` : `新增-${this.roleValidateForm.mk_name}-页面`,
                params: {...this.roleValidateForm, init: this.init}
              }
            }
          )
        } else {
          console.log('error submit!!')
          return false
        }
      })
      this.dialogVisiblerole = false
    }
  },
  data () {
    return {
      mkconfig: null,
      tableData: [],
      dialogVisibleJson: false,
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
        mk_name: '',
        mk_config: null
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
