<template>
  <div>
    <el-card class="box-card">
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="文章分类">
            <el-radio-group v-model="form.class_id">
              <el-radio   v-for="(it, index) in classIdArr" :label="it.id"  :key="index">{{it.class_name}}</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="文章标签">
          <el-select v-model="form.tagsArr" multiple placeholder="请选择标签">
            <el-option v-for="(it, index) in tagsIdArr" :label="it.tags_name" :value="it.tags_id" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="封面图">
          <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="Headers"
              name="images"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
        <el-form-item label="是否置顶">
          <el-switch v-model="form.is_top"></el-switch>
        </el-form-item>
        <el-form-item label="内容">
          <mavon-editor   @save="saveDoc"  @change="updateDoc" :ishljs="true" ref="editor" v-model="form.content"></mavon-editor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" :loading="loading">提交</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { api } from '@/request/api.js'
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
      tagsIdArr: [],
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    saveDoc () {},
    updateDoc (md, html) {
      console.log(html)
    },
    async onSubmit () {
      if (this.$params.article_id === undefined) {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            await this.createArticle()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      } else {
        await this.updateArticle()
      }
      this.loading = false
    },
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
      let { data, code } = await this.Req.get(api.articleDetail, {article_id: this.$params.article_id})
      if (code === 200) {
        this.imageUrl = data.cover_url
        this.form.cover_url = data.cover_url
        this.form.title = data.title
        this.form.class_id = data.class_id
        this.form.is_top = data.is_top
        this.form.content = data.content
        data.tagsArr.map(it => this.form.tagsArr.push(it.tags_id))
      }
    }
  }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 16px;
    color: #8c939d;
    width: 240px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 240px;
    height: 100px;
    display: block;
  }
</style>
