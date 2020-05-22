<template>
  <div >
    <el-card v-loading="loading" class="box-card">
      <div slot="header" class="clearfix">
        <div class="title-box">
          <el-tag  v-if="form.is_top"  type='danger'>置顶</el-tag>
          <h2>{{form.title}}</h2>
        </div>
        <div class="attr-list">
          <p style="padding:10px 0">
             标签：<el-tag style="margin:0 10px"
                v-for="item in form.tagsArr"
                :key="item.tags_name"
                effect="plain">
                {{ item.tags_name }}
              </el-tag>
          </p>
          <el-row :gutter="18">
            <el-col :span="3">
                作者：<el-link type="primary">{{ form.authorName }}</el-link>
            </el-col>
             <el-col :span="3">
                分类：<el-link type="primary">{{ form.class_name }}</el-link>
            </el-col>
            <el-col :span="4">
                发表时间： <el-link type="primary">{{ form.create_time }}</el-link>
            </el-col>
             <el-col :span="4">
                更新时间：<el-link type="primary">{{ form.update_time }}</el-link>
            </el-col>
            <el-col :span="3">
                阅读数 <el-link type="primary">{{ form.read_count }}</el-link>
            </el-col>
            <el-col :span="3">
                点赞数：<el-link type="primary">{{ form.poll_count }}</el-link>
            </el-col>
          </el-row>
        </div>
      </div>
      <article  v-loading="loading"  v-highlight v-html="compiledMD"></article>
      <div class="comment-boxs" v-loading="loadingComment">
        <h1 class="comments-title">评论 ({{commentsList.count}})</h1>
        <div class="comment-input-top">
          <div class="user-box">
            <el-avatar :src="$userInfo().avatar">{{$userInfo().nick_name}}</el-avatar>
          </div>
          <el-form :model="commetForm" ref="commetForm" label-width="60px" class="demo-ruleForm">
            <el-form-item  prop="comment_content"  :rules="[{ required: true, message: '评论内容不能为空'}]">
              <el-input  v-model="commetForm.comment_content" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="primary" @click="submitComment('commetForm')">评论</el-button>
            </el-form-item>
          </el-form>
        </div>
        <ul class="comment-list">
          <li v-for="(item) in commentsList.comments" :key="item.comment_id">
            <div class="comments-root">
              <el-avatar :src="item.avatar">{{item.comment_author}} </el-avatar>
              <div class="comments-right">
                  <p>
                    <span>{{item.comment_author}}</span>
                    <span class="comment_time">{{item.comment_time}}</span>
                  </p>
                  <p>{{item.comment_content}}</p>
                  <p class="reply-box">
                    <el-link  class="reply-btn" type="primary" @click="commentIndex=item.comment_id,commetForms.comment_content =`@${item.comment_author} `">回复</el-link>
                    <el-link  class="delete-btn" type="danger" @click="deleteComments(item.comment_id)">删除</el-link>
                  </p>
                  <div class="comment-textarea" v-if="commentIndex === item.comment_id">
                    <el-form :model="commetForm" ref="commetForm"  class="demo-ruleForm">
                      <el-form-item  prop="comment_content" >
                        <el-input type="textarea"  resize="none"  style="width:400px"  :rows="3" v-model="commetForms.comment_content" autocomplete="off"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button size="mini" type="primary" @click="submitComments(item.comment_id)">发送</el-button>
                        <el-button size="mini"  @click="commentIndex= null">取消</el-button>
                      </el-form-item>
                    </el-form>
                  </div>
              </div>
            </div>
            <ul class="sub-comment-content-row">
              <li v-for="child in item.childComments" :key="child.comment_id">
                  <el-avatar :src="item.avatar"> {{child.comment_content}}</el-avatar>
                  <div  class="comments-right">
                    <p>
                      <span>{{child.comment_author}}</span>
                      <span  class="comment_time">{{child.comment_time}}</span>
                    </p>
                    <p>{{child.comment_content}}</p>
                    <p class="reply-box">
                      <el-link class="reply-btn" type="primary" @click="commentIndex=child.comment_id, commetForms.comment_content =`@${child.comment_author} `">回复</el-link>
                      <el-link class="delete-btn" type="danger" @click="deleteComments(child.comment_id)">删除</el-link>
                    </p>
                      <div class="comment-textarea" v-if="commentIndex === child.comment_id">
                      <el-form :model="commetForm" ref="commetForm"  class="demo-ruleForm">
                        <el-form-item    prop="comment_content" >
                          <el-input type="textarea"  resize="none"  style="width:400px"  :rows="3" v-model="commetForms.comment_content" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item>
                          <el-button size="mini" type="primary" @click="submitComments(child.comment_id)">发送</el-button>
                          <el-button size="mini" @click="commentIndex= null">取消</el-button>
                        </el-form-item>
                      </el-form>
                    </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </el-card>
  </div>
</template>

<script>
import { api } from '@/request/api.js'
import marked from 'marked'
export default {
  props: ['$params', '$tabsIndex'],
  data () {
    return {
      commentIndex: '',
      loadingComment: false,
      commetForm: {
        comment_content: ''
      },
      commetForms: {
        comment_content: ''
      },
      imageUrl: '',
      loading: false,
      Headers: {
        token: localStorage.getItem('token')
      },
      uploadUrl: api.uploadImage,
      form: {
        title: '',
        class_id: '',
        tagsArr: [],
        cover_url: '',
        is_top: false,
        content: '',
        article_id: ''
      },
      classIdArr: [],
      tagsIdArr: [],
      commentsList: []
    }
  },
  created () {
    this.init()
  },
  computed: {
    compiledMD () {
      return marked(this.form.content, { sanitize: true })
    }
  },
  methods: {
    submitComment (formName) {
      let commetForm = {
        user_id: this.$userInfo().nick_name,
        article_id: this.$params.article_id,
        comment_content: this.commetForm.comment_content,
        comment_author_email: this.$userInfo().email,
        comment_author: this.$userInfo().nick_name
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.createComments(commetForm)
          this.commetForm.comment_content = ''
        } else {
          return false
        }
      })
    },
    submitComments (parentId) {
      let commetForm = {
        parent_id: parentId,
        user_id: this.$userInfo().nick_name,
        article_id: this.$params.article_id,
        comment_content: this.commetForms.comment_content,
        comment_author_email: this.$userInfo().email,
        comment_author: this.$userInfo().nick_name
      }
      this.createComments(commetForm)
    },
    async init () {
      let { data, code } = await this.Req.get(api.articleCommentsList, {article_id: this.$params.article_id})
      if (code === 200) {
        this.commentsList = data
      }
      if (this.$params.article_id !== undefined) {
        this.getDetail()
      }
    },
    async createComments (from) {
      this.loadingComment = true
      let { code, msg } = await this.Req.post(api.createCommentsList, from)
      if (code === 200) {
        this.$message({
          type: 'success',
          message: msg
        })
      }
      this.loadingComment = false
      this.commentIndex = null
      this.init()
    },
    async updateArticle () {
      let { msg, code } = await this.Req.put(api.updateArticle, Object.assign(this.form, { article_id: this.$params.article_id }))
      if (code === 200) {
        this.$message({
          type: 'success',
          message: msg
        })
        this.$params.init()
        this.$closeTabs(this.$tabsIndex)
      }
    },
    deleteComments (commentId) {
      this.$confirm('此操作将永久删除该评论吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let { code, msg } = await this.Req.delete(api.deleteCommentsList, { data: {commentId: commentId} })
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
    async getDetail () {
      this.loading = true
      let { data, code } = await this.Req.get(api.articleDetail, {article_id: this.$params.article_id})
      if (code === 200) {
        this.imageUrl = data.cover_url
        this.form.cover_url = data.cover_url
        this.form.title = data.title
        this.form.class_id = data.class_id
        this.form.is_top = data.is_top
        this.form.content = data.content
        this.form.authorName = data.authorName
        this.form.read_count = data.read_count
        this.form.read_count = data.read_count
        this.form.poll_count = data.poll_count
        this.form.create_time = data.create_time
        this.form.update_time = data.update_time
        this.form.class_name = data.class_name
        this.form.tagsArr = data.tagsArr
      }
      this.loading = false
    }
  }
}
</script>

<style>
.comments-title{
  font-size: 24px;
  padding: 20px;
  text-align: center;
  font-weight: normal;
}
.comment-input-top{
  background: #fafbfc;
  padding: 20px;
  position: relative;
}
.comment-input-top .user-box {
  position: absolute;
  top: 20px;
  left: 20px;
}
.comment-list{
  padding: 20px;
}
.comment-list .comments-right {
  padding-left: 10px;
}
.comment-list .comment_time{
  font-size: 12px;
  color: #999;
  padding: 0 10px;
}
.comment-list .comments-right p {
  padding: 4px;
}
.comment-list{
  padding: 40px;
}
.comment-list li{
   border-top: 1px solid #f1f1f1;
   padding-bottom: 5px;
}
.sub-comment-content-row li{
  background: #fafbfc;
  padding: 20px 35px;
  border-bottom: 1px solid #f1f1f1;
  display: flex;
}
.reply-box .reply-btn {
  font-size: 12px;
  margin: 5px;
}
.reply-box .delete-btn {
  font-size: 12px;
  margin: 5px;
}
.comment-list .comments-root{
  padding: 15px 0px;
  display: flex;
  position: relative;
}
.box-card {
  min-height: 500px;
}
.attr-list{
  font-size: 12px;
}
.title-box{
  display: flex;
  padding: 20px 0px;
}
.title-box h2 {
  margin: 0;
  padding-left:20px;
}
</style>
