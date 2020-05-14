<template>
  <div>
    <el-card class="box-card">
      <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="标题">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
           <el-form-item label="文章分类">
              <el-radio-group v-model="form.class_id">
                <el-radio   v-for="(it, index) in classIdArr" :label="it.class_name" :value="it.id" :key="index"></el-radio>
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
                action="https://jsonplaceholder.typicode.com/posts/"
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
             <mavon-editor   @save="saveDoc"   @change="updateDoc"  ref="editor" v-model="form.content">
         </mavon-editor>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
    </el-card>
  </div>
</template>

<script>
import { api } from '@/request/api.js'
export default {
  props: ['linkParam'],
  data () {
    return {
      imageUrl: '',
      form: {
        title: '',
        class_id: '',
        tagsArr: [],
        is_top: '',
        content: ''
      },
      classIdArr: [],
      tagsIdArr: []
    }
  },
  created () {
    console.log(this.linkParam, 'cre')
    this.init()
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    async init () {
      let value = await Promise.all([this.Req.get(api.articleClassList), this.Req.get(api.articleTagsList)])
      this.classIdArr = value[0].data.list
      this.tagsIdArr = value[1].data.list
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
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
