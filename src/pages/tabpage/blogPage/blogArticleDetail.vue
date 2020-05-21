<template>
  <div >
    <el-card v-loading="loading" class="box-card">
      <div slot="header" class="clearfix">
        <div class="title-box">
          <el-tag  v-if="form.is_top"  type='danger'>置顶</el-tag>
          <h2>{{form.title}}</h2>
        </div>
        <div class="attr-list">
          <p>
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
      tagsIdArr: []
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
    saveDoc () {},
    updateDoc () {},
    async init () {
      let value = await Promise.all([this.Req.get(api.articleClassList), this.Req.get(api.articleTagsList)])
      this.classIdArr = value[0].data.list
      this.tagsIdArr = value[1].data.list
      if (this.$params.article_id !== undefined) {
        this.getDetail()
      }
    },
    async createArticle () {
      this.loading = true
      let { code, msg } = await this.Req.post(api.createArticle, this.form)
      if (code === 200) {
        this.$message({
          type: 'success',
          message: msg
        })
        this.$params.init()
        this.$closeTabs(this.$tabsIndex)
      }
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
    handleAvatarSuccess (res, file) {
      this.form.cover_url = res.data.path
      this.imageUrl = URL.createObjectURL(file.raw)
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
