<template>
  <div>
    <el-dialog :title="isRoleCheck ? '回复评论' : '回复评论'"  :visible.sync="dialogVisiblerole" width="25%" >
      <el-form :model="commentsForm" ref="commentsForm" label-width="80px" class="demo-ruleForm">
          <el-form-item   label="评论内容"  prop="comment_content"  :rules="[{ required: true, message: '评论不能为空'}]">
            <el-input type="textarea"  resize="none"  style="width:300px"  :rows="3" v-model="commentsForm.comment_content"></el-input>
          </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
         <el-button type="primary" @click="submitForm('commentsForm')">提交</el-button>
          <el-button @click="resetForm('commentsForm')">重置</el-button>
      </span>
    </el-dialog>
     <div class="btn-box">
        <el-button   icon="el-icon-delete" type="danger" size="mini" @click="deleteBatchComments">批量删除</el-button>
        <!-- <el-button  :disabled="disbaledBtn" v-has="'sys:user:update'"   icon="el-icon-circle-plus-outline" type="primary" size="mini" @click="checksEdit">修改</el-button>
        <el-button  :disabled="disbaledBtn" v-has="'sys:user:delete'"   icon="el-icon-delete" type="danger" size="mini" @click="deleteUser">删除</el-button> -->
    </div>
     <el-table   @selection-change="handleSelectionChange"  v-loading="loading"   :height="$tableHeight()"  :data="tableData.list"  size="small"   border  stripe  fit  highlight-current-row style="width: 100%">
      <el-table-column  type="selection"  width="55"></el-table-column>
      <el-table-column     align="center"   prop="comment_id"   label="评论ID"    width="80"></el-table-column>
      <el-table-column     align="center"   prop="article_id"   label="文章ID"    width="100"></el-table-column>
      <el-table-column     align="center"   label="文章标题"  :show-overflow-tooltip="true"    width="240">
        <template slot-scope="scope">
          <el-link type="primary" @click="linkArticle(scope.row)">
            {{scope.row.title}}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column     align="center"  prop="user_id"      label="博客用户"></el-table-column>
      <el-table-column     align="center"   prop="comment_author"      label="匿名用户"></el-table-column>
      <el-table-column     align="center"   prop="comment_author_email"      label="匿名评论邮箱"></el-table-column>
      <el-table-column     align="center"   prop="comment_content"   :show-overflow-tooltip="true"     label="评论内容"></el-table-column>
      <el-table-column     align="center"   prop="comment_time"      label="评论时间"></el-table-column>
      <el-table-column  label="操作" width="250">
          <template slot-scope="scope">
          <el-button @click="checksEdit(scope.row, false)" type="primary"  effect="dark" icon="el-icon-chat-dot-round" size="mini">回复</el-button>
          <el-button @click="checksEdit(scope.row, true)" type="primary"  effect="dark" icon="el-icon-edit" size="mini">编辑</el-button>
          <el-button @click="deleteComments(scope.row, false)" type="danger"  effect="dark"  icon="el-icon-delete" size="mini">删除</el-button>
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
    // handleClose () {}
    async init () {
      this.loading = true
      let { data, code } = await this.Req.get(api.commentsList, this.queryParam)
      if (code === 200) {
        this.tableData = data
      }
      this.loading = false
    },
    linkArticle (row) {
      debugger
      this.$addView(
        {
          view: {
            component: 'blogArticleDetail',
            res_name: '文章详情',
            params: {article_id: row.article_id}
          }
        }
      )
    },
    checksEdit (row, flag) {
      this.isRoleCheck = flag
      this.dialogVisiblerole = true
      this.commentsForm.parent_id = row.comment_id
      this.commentsForm.user_id = this.$userInfo().nick_name
      this.commentsForm.article_id = row.article_id
      this.commentsForm.comment_content = flag ? row.comment_content : `@${row.comment_author}`
      this.commentsForm.comment_author_email = this.$userInfo().email
      this.commentsForm.comment_author = this.$userInfo().nick_name
    },
    async updateClassList () {
      let { code, msg } = await this.Req.put(api.updateCommentsList, this.commentsForm)
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
    resetForm (formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields()
      })
    },
    async createComments () {
      let { code, msg } = await this.Req.post(api.createCommentsList, this.commentsForm)
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
        this.resetForm('commentsForm')
      }
      this.init()
    },
    deleteComments (row) {
      this.$confirm('此操作将永久删除该评论吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let { code, msg } = await this.Req.delete(api.deleteCommentsList, { data: {commentId: row.comment_id} })
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
    handleSelectionChange (rows) {
      this.currRow = rows
    },
    deleteBatchComments () {
      this.$confirm('批量删除这些评论吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let commentIdArr = []
        this.currRow.map((it) => { commentIdArr.push(it.comment_id) })
        let { code, msg } = await this.Req.delete(api.deleteCommentsList, { data: {commentId: commentIdArr} })
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
    // 编辑创建
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isRoleCheck) {
            this.updateClassList()
          } else {
            this.createComments()
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
      commentsForm: {
        parent_id: '',
        user_id: '',
        article_id: '',
        comment_content: '',
        comment_author_email: '',
        comment_author: ''
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
