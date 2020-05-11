<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>个人信息</span>
      </div>
      <el-form style="width:40%" :model="roleValidateForm" ref="roleValidateForm" label-width="100px" class="demo-ruleForm">
          <el-form-item   label="头像"   prop="avatar">
            <div @click="dialogVisible = true">
              <el-avatar :size="60"  icon="el-icon-user-solid" :src="roleValidateForm.avatar"> </el-avatar>
            </div>
          </el-form-item>
          <el-form-item   label="角色"  prop="role_id"  :rules="[ { required: true, message: '角色名不能为空'}]">
            <el-select multiple v-model="roleValidateForm.role_id" placeholder="请选择角色" style="width:100%">
              <el-option  v-for="item in roleList"  :key="item.role_id"  :label="item.role_name" :value="item.role_id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item   label="用户名"  prop="nick_name"  :rules="[
              { required: true, message: '用户名不能为空'}]">
            <el-input type="input" v-model="roleValidateForm.nick_name" autocomplete="off"></el-input>
          </el-form-item>
         <el-form-item   label="电话"  prop="phone"  :rules="[
              { required: true, message: '电话名不能为空'}]">
            <el-input type="input" v-model="roleValidateForm.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item   label="密码"  prop="password"  :rules="[
              { required: true, message: '密码名不能为空'}]">
            <el-input type="input" v-model="roleValidateForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item   label="email"  prop="email">
            <el-input type="input" v-model="roleValidateForm.email" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <el-button style="margin-left:100px" type="primary" @click="submitForm('roleValidateForm')" size="small" :loading="loading">保存</el-button>
    </el-card>
    <el-dialog
        title="头像设置"
        :visible.sync="dialogVisible"
        width="30%"
        >
        <!--   @imgLoad="imgLoad"   @realTime="realTime"-->
        <el-row :gutter="24">
            <el-col :span="13">
              <div class="cropper">
                  <vueCropper
                    ref="cropper"
                    :img="option.img"
                    :outputSize="option.size"
                    :outputType="option.outputType"
                    :info="option.info"
                    :full="option.full"
                    :canScale="option.canScale"
                    :canMove="option.canMove"
                    :canMoveBox="option.canMoveBox"
                    :original="option.original"
                    :autoCrop="option.autoCrop"
                    :autoCropWidth="option.autoCropWidth"
                    :autoCropHeight="option.autoCropHeight"
                    :fixedBox="option.fixedBox"
                    :fixed="option.fixed"
                    @realTime="realTime"
                ></vueCropper>
                <!--  :fixedNumber="option.fixedNumber" -->
              </div>
            </el-col>
            <el-col :span="11">
              <div class="croper-right">
                <div class="preview-box" >
                  <div :style="previews.div" class="preview">
                     <img v-if="corpperImag" :src="corpperImag" width="100%">
                  </div>
                </div>
                <input type="file" id="uploads" :value="imgFile"
                  style="position:absolute; clip:rect(0 0 0 0);width: 1px;"
                  accept="image/png, image/jpeg, image/gif, image/jpg"
                  @change="uploadImg($event, 1)">
                 <label class="btn" for="uploads">选择图片</label>
              </div>
            </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitUpload" :loading="loading">确 定</el-button>
        </span>
  </el-dialog>
  </div>
</template>

<script>
import { api } from '@/request/api.js'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      crap: false,
      previews: {},
      loading: false,
      option: {
        fixed: true, // 是否开启截图框宽高固定比例
        img: '', // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 1, // 剪切后的图片质量（0.1-1）
        // full: true, // 输出原图比例截图 props名full
        outputType: 'png', // 裁剪生成额图片的格式
        // canMove: true, // 能否拖动图片
        // original: false, // 上传图片是否显示原始宽高
        canMoveBox: true, // 能否拖动截图框
        autoCrop: true, // 是否默认生成截图框
        // autoCropWidth: 200, // 默认生成截图框宽度
        // autoCropHeight: 200, // 默认生成截图框高度
        canScale: true, // 图片是否允许滚轮缩放
        centerBox: true, // 截图框是否被限制在图片里面
        fixedBox: false, // 截图框固定大小
        fixedNumber: [4, 4] // 截图框的宽高比例
      },
      fileName: '', // 本机文件地址
      downImg: '#',
      imgFile: '',
      uploadImgRelaPath: '', // 上传后的图片的地址（不带服务器域名）

      roleList: [],
      dialogVisible: false,
      corpperImag: '',
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
  computed: {
    ...mapGetters('user', ['userInfo'])
  },
  created () {
    this.getroleList()
    this.roleValidateForm = this.userInfo
  },
  methods: {
    async updateuUser () {
      this.loading = true
      let { code, msg } = await this.Req.put(api.updateUser, this.roleValidateForm)
      if (code === 200) {
        this.$message({
          message: msg,
          type: 'success'
        })
        this.dialogVisiblerole = false
      } else {
        this.dialogVisiblerole = false
        this.resetForm('roleValidateForm')
      }
      this.loading = false
    },
    // 编辑
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updateuUser()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async getroleList () {
      let { data, code } = await this.Req.get(api.getAllRole)
      if (code === 200) {
        this.roleList = data.roleList
      }
    },
    // 实时预览函数
    realTime (data) {
      this.previews = data
      let self = this
      this.$refs['cropper'].getCropData((data) => {
        self.corpperImag = data
      })
    },
    // 选择本地图片
    uploadImg (e, num) {
      var _this = this
      // 上传图片
      var file = e.target.files[0]
      _this.fileName = file.name
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
        return false
      }
      var reader = new FileReader()
      reader.onload = (e) => {
        let data
        if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          data = e.target.result
        }
        if (num === 1) {
          _this.option.img = data
        } else if (num === 2) {
          _this.example2.img = data
        }
      }
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(file)
    },
    async submitUpload () {
      let fd = new FormData()
      let baseToblob = this.base64URLtoFile(this.corpperImag)
      fd.append('userAvatar', baseToblob, `csde_${Date.parse(new Date())}.jpeg`)
      this.loading = true
      let { data, code } = await this.Req.upload(api.uploadAvatar, fd, { headers: { 'Content-Type': 'multipart/form-data' } })
      if (code === 200) {
        this.roleValidateForm.avatar = data.path
      }
      this.dialogVisible = false
      this.loading = false
    },
    // base64转为Blob
    base64UrlToBlob (base64Data) {
      let arr = base64Data.split(',')
      let mime = arr[0].match(/:(.*?);/)[1]
      let bstr = atob(arr[1])
      let n = bstr.length
      let u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new Blob([u8arr], { type: mime })
    },
    // base64转换为file
    base64URLtoFile (base64Data, filename) { // 将base64转换为文件
      let arr = base64Data.split(',')
      let mime = arr[0].match(/:(.*?);/)[1]
      let bstr = atob(arr[1])
      let n = bstr.length
      let u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], filename, { type: mime })
    }
  }
}
</script>

<style>
.cropper {
  width: 250px;
  height: 250px;
}
.btn{
  margin: 10px 0;
  padding: 6px 20px;
  width: 160px;
  text-align: center;
  border-radius: 4px;
  margin-left: 10px;
  background-color: #409EFF;
  color: #fff;
  cursor: pointer;
  display: inline-block;
}
.btn:hover{
  background-color: #387EF6;
}
.preview {
  min-width: 200px;
  min-height: 200px;
  overflow: hidden;
  border-radius: 50%;
  border:4px solid #cccccc;
  background: #cccccc;
}

</style>
