<template>
  <div>
     <div class="btn-box">
        <el-button   icon="el-icon-circle-plus-outline"  v-hasAuth="'blog:article:add'" type="primary" size="mini" @click="addArticle">新建</el-button>
    </div>
     <el-table  @row-click="actionEvents" v-loading="loading"   :height="$tableHeight()"  :data="tableData.list"  size="small"   border  stripe  fit  highlight-current-row style="width: 100%">
      <el-table-column     align="center"   fixed   prop="article_id"      label="文章ID"    width="100"></el-table-column>
      <el-table-column     align="center"     prop="title"  :show-overflow-tooltip="true"    label="标题"   ></el-table-column>
        <el-table-column   align="center"   label="封面">
           <template slot-scope="scope">
             <img :src="scope.row.cover_url" width="120"/>
           </template>
        </el-table-column>
      <el-table-column     align="center"     prop="article_class.class_name"      label="分类"></el-table-column>
      <el-table-column     align="center"  prop="read_count"    label="阅读数"      width="120">    </el-table-column>
      <el-table-column     align="center"  prop="poll_count"    label="点赞数"      width="120">    </el-table-column>
      <el-table-column     align="center"  prop="update_time"      label="创建时间"> </el-table-column>
      <el-table-column     align="center"  prop="create_time"      label="更新时间"></el-table-column>
      <el-table-column  label="操作">
          <template slot-scope="scope">
          <el-button @click="addArticle(scope.row, false)" type="primary"   v-hasAuth="'blog:article:edit'"  effect="dark" icon="el-icon-edit" size="mini">编辑</el-button>
          <el-button @click="deleteArticle(scope.row, false)" type="danger" v-hasAuth="'blog:article:delete'" effect="dark"  icon="el-icon-delete" size="mini">删除</el-button>
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
  props: ['$params', '$tabsIndex'],
  methods: {
    handleSizeChange (pageSize) {
      this.queryParam.pageSize = pageSize
      this.init()
    },
    addArticle (row) {
      this.$addView(
        {
          view: {
            component: 'blogArticleEdit',
            res_name: row.article_id ? '编辑文章' : '添加文章',
            params: {article_id: row.article_id, init: this.init}
          }
        }
      )
    },
    handleCurrentChange (page) {
      this.queryParam.page = page
      this.init()
    },
    // handleClose () {}
    async init () {
      this.loading = true
      let { data, code } = await this.Req.get(api.articleList, this.queryParam)
      if (code === 200) {
        this.tableData = data
      }
      this.loading = false
    },
    actionEvents (row) {
      this.currRow = row
    },
    deleteArticle (row) {
      this.$confirm('此操作将永久删除该文章吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let { code, msg } = await this.Req.delete(api.deleteArticle, { data: {article_id: row.article_id} })
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
    }
  },
  data () {
    return {
      tableData: [],
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
        nick_name: '',
        password: '',
        email: '',
        phone: '',
        avatar: '',
        role_id: []
      }
    }
  },
  filters: {
  },
  created () {
    this.init()
  }
}
</script>
