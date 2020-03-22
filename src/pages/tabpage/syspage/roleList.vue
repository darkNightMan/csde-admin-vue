<template>
  <div>
     <el-dialog  title="菜单权限"  :visible.sync="dialogVisible"   width="30%"  >
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
    <el-table :data="tableData"    border    style="width: 100%">
      <el-table-column      fixed   prop="role_id"      label="角色ID"    width="150"></el-table-column>
      <el-table-column      fixed   prop="role_code"    label="角色编码"></el-table-column>
      <el-table-column      prop="role_name"      label="角色名称" ></el-table-column>
      <el-table-column      label="操作"     width="00">
          <template slot-scope="scope">
            <el-button @click="checksEdit(scope.row, true)" type="text" size="small">查看</el-button>
            <el-button @click="checksEdit(scope.row, false)" type="text" size="small">编辑</el-button>
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
      // debugger
      if (code === 200) {
        this.tableData = data.roleList
      }
    },
    // 查看编辑
    checksEdit (row, flag) {
      this.dialogVisible = true
      let roleid = row.role_id
      this.getUserPer(roleid)
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
    async getUserPer (roleid) {
      let { data, code } = await this.Req.get(api.getUserPer, { role_id: roleid })
      if (code === 200) {
        console.log(data)
        // this.$refs.tree.setCheckedKeys([1, 5, 2, 7, 9, 10, 3, 4, 8])
      }
      this.$refs.tree.setCheckedKeys([1, 5, 2, 7, 9, 10, 3, 4, 8])
    },
    async setUserPer () {
      console.log(1)
    },
    submit () {
      console.log(this.$refs.tree.getCheckedKeys())
    }
  },
  data () {
    return {
      dialogVisible: false,
      tableData: [],
      dataTree: [],
      resIdarr: [],
      defaultProps: {
        children: 'children',
        label: 'res_name'
      }
    }
  },
  created () {
    this.init()
    this.treeMenu()
  }
}
</script>
