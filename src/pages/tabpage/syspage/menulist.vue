<template>
  <div>
     <el-dialog :title="isRoleCheck ? '编辑菜单' : '新增菜单'"  :visible.sync="dialogVisiblerole" width="30%" :fullscreen="false">
      <el-form :model="roleValidateForm" ref="roleValidateForm" label-width="100px" class="demo-ruleForm">
         <el-form-item  v-show="!isRoleCheck"  prop="type" label="类型" size="mini">
             <el-radio-group v-model="roleValidateForm.type">
                <el-radio :label="1">目录</el-radio>
                <el-radio :label="2">菜单</el-radio>
                <el-radio :label="3">按钮</el-radio>
              </el-radio-group>
          </el-form-item>
         <el-form-item  prop="parent_id"   label="上级菜单" :rules="[{ required: true, message: '上级菜单名不能为空'}]">
            <tree-select  :data="treeMenuList" v-model="roleValidateForm.parent_id"  label="res_name" value="res_id"></tree-select>
          </el-form-item>
          <el-form-item   label="菜单名称"   prop="res_name"  :rules="[{ required: true, message: '菜单名不能为空'}]" >
            <el-input  type="input" v-model="roleValidateForm.res_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item  prop="res_code"   label="菜单编码">
              <el-input type="input" v-model="roleValidateForm.res_code" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item  prop="component"   label="菜单组件" v-show="roleValidateForm.type === 2 || roleValidateForm.type === 3">
              <el-input type="input" v-model="roleValidateForm.component" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item  prop="perms"   label="授权标识">
              <el-input type="input" v-model="roleValidateForm.perms" autocomplete="off"></el-input>
          </el-form-item>
           <el-form-item  prop="res_icon"  v-show="roleValidateForm.type === 2 || roleValidateForm.type === 1"  label="菜单图标">
             <icon-picker v-model="roleValidateForm.res_icon"></icon-picker>
          </el-form-item>
           <el-form-item  prop="sort"   label="排序">
              <el-input type="input" v-model="roleValidateForm.sort" autocomplete="off"></el-input>
          </el-form-item>
           <el-form-item  prop="description"   label="菜单描述">
              <el-input type="input" v-model="roleValidateForm.description" autocomplete="off"></el-input>
          </el-form-item>
            <el-form-item  prop="state"   label="状态">
              <el-switch v-model="roleValidateForm.state" active-text="启用" :active-value="1" :inactive-value="0"></el-switch>
          </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
         <el-button type="primary" @click="submitForm('roleValidateForm')">提交</el-button>
          <el-button @click="resetForm('roleValidateForm')">重置</el-button>
      </span>
    </el-dialog>
    <el-row :gutter="20" >
      <el-col :span="3" style="margin-top:10px">
          <el-input
          placeholder="输入关键字进行过滤"
          size="mini"
          v-model="filterText">
        </el-input>
        <el-tree v-loading="loading"
          class="filter-tree"
          :data="treeMenuList.tree"
          node-key="res_id"
          :props="defaultProps"
          default-expand-all
          :filter-node-method="filterNode"
          @node-click="nodeClick"
          ref="tree">
        </el-tree>
      </el-col>
      <el-col :span="21">
        <div class="btn-box">
          <el-button type="primary"  v-has="'sys:menu:create'"   icon="el-icon-circle-plus-outline"  size="mini" @click="createDialog">新建</el-button>
        </div>
        <el-table   v-loading="loading"  :data="tableData.list"  :height="winH"     size="small"  border  stripe   style="width:100%">
          <el-table-column   align="center"   prop="res_id"      label="菜单ID"    width="80" ></el-table-column>
          <el-table-column   align="center"    prop="parent_name"      label="上级菜单"    width="100" ></el-table-column>
          <el-table-column   align="center"    prop="res_name"      label="菜单名"     width="100" > </el-table-column>
          <el-table-column   align="center"    prop="component"      label="菜单组件名"   width="120" > </el-table-column>
          <el-table-column   align="center"    prop="res_icon"      label="图标"      width="50">
              <template slot-scope="scope">
                <i :class="scope.row.res_icon == null || scope.row.res_icon == '' ? 'el-icon-eleme': scope.row.res_icon"></i>
              </template>
          </el-table-column>
          <el-table-column   align="center"    prop="res_code"      label="菜单编码"      width="80"></el-table-column>
          <el-table-column   align="center"  prop="type"  label="类型" width="80">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.type === 1"  type="primary" size="small" effect="dark"> 目录 </el-tag>
              <el-tag v-if="scope.row.type === 2"  type="warning" size="small" effect="dark" >菜单</el-tag>
              <el-tag v-if="scope.row.type === 3"  type="success" size="small" effect="dark"> 按钮</el-tag>
            </template>
          </el-table-column>
          <el-table-column       label="授权标识"   width="150">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.perms"  type="primary" size="mini" effect="dark"> {{scope.row.perms}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column    align="center"  prop="sort"      label="排序"  width="80" ></el-table-column>
          <el-table-column   align="center"   label="状态"  width="80">
            <template slot-scope="scope">
              <el-tag :type="scope.row.state === 1? 'success': 'danger' " size="small" effect="dark"> {{scope.row.state == 1 ? '正常': '禁用' }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column  align="center"  prop="create_time"      label="创建时间" width="200"  ></el-table-column>
          <el-table-column  align="center"  prop="description"      label="描述"    :show-overflow-tooltip="true" ></el-table-column>
          <el-table-column  align="center"  label="操作" width="200"  fixed="right">
              <template slot-scope="scope" v-if="scope.row.res_id">
              <el-button @click="checksEdit(scope.row, false)" type="primary"  effect="dark" icon="el-icon-edit" v-has="'sys:menu:update'" size="mini">编辑</el-button>
              <el-button @click="deleteUser(scope.row, false)" type="danger" effect="dark" icon="el-icon-delete" v-has="'sys:menu:delete'" size="mini">删除</el-button>
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
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { api } from '@/request/api.js'
import { mapGetters } from 'vuex'
export default {
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    nodeClick (value) {
      this.queryParam.treeId = value.res_id
      this.$refs.tree.setCurrentKey(value.res_id)
      this.init()
    },
    filterNode (value, data) {
      if (!value) return true
      return data.res_name.indexOf(value) !== -1
    },
    handleClick (row) {
      console.log(row)
    },
    async init () {
      try {
        this.loading = true
        let { data, code } = await this.Req.get(api.menuList, this.queryParam)
        let treeList = await this.Req.get(api.selectMenuList)
        this.treeMenuList = {
          tree: treeList.data.tree,
          list: treeList.data.list
        }
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
      this.roleValidateForm.res_icon = ''
      this.resetForm('roleValidateForm')
    },
    checksEdit (row) {
      this.isRoleCheck = true
      this.dialogVisiblerole = true
      this.$nextTick(() => {
        this.roleValidateForm = {
          type: row.type,
          res_id: row.res_id,
          res_name: row.res_name,
          parent_id: row.parent_id,
          component: row.component,
          description: row.description,
          res_code: row.res_code,
          res_icon: row.res_icon,
          sort: row.sort,
          state: row.state,
          perms: row.perms
        }
      })
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
      filterText: '',
      loading: false,
      tableData: [],
      treeMenuList: {},
      queryParam: {
        page: 1,
        pageSize: 10
      },
      isRoleCheck: false,
      dialogVisiblerole: false,
      roleValidateForm: {
        type: 1,
        res_id: '',
        res_name: '',
        parent_id: '',
        component: '',
        description: '',
        res_code: '',
        res_icon: '',
        sort: '',
        state: 1,
        perms: ''
      },
      defaultProps: {
        children: 'children',
        label: 'res_name'
      }
    }
  },
  created () {
    this.init()
  }
}
</script>
