<template>
  <div>
     <el-form ref="form"  label-width="120px">
        <div>
            <el-form-item label="图片地址" >
                <el-upload
                    class="upload-demo"
                    :action="uploadUrl"
                     name="images"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :headers="Headers"
                    :file-list="localPropsAttr.imgUrlArr"
                    :on-success="handleSuccess"
                    list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="是否自动轮播">
               <el-switch  v-model="localPropsAttr.autoplay"  active-color="#13ce66"  inactive-color="#ff4949"></el-switch>
            </el-form-item>
            <el-form-item label="切换时间">
                <el-input  placeholder="请输入内容"  v-model.number="localPropsAttr.interval"  clearable></el-input>
            </el-form-item>
            <el-form-item label="展示方向">
                <el-select v-model="localPropsAttr.direction" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                </el-select>
             </el-form-item>
         </div>
      </el-form>
  </div>
</template>
<script>
import { api } from '@/request/api.js'
export default {
  naem: 'attr-carousel',
  data () {
    return {
      uploadUrl: api.uploadImage,
      Headers: {
        token: localStorage.getItem('token')
      },
      localPropsAttr: {
        imgUrlArr: [],
        autoplay: true,
        interval: '',
        direction: ''
      },
      options: [
        {
          value: 'horizontal'
        },
        {
          value: 'vertical'
        }
      ]
    }
  },
  props: {
    propsAttr: {
      imgUrlArr: Object,
      autoplay: Boolean,
      interval: Number,
      direction: String
    }
  },
  watch: {
    propsAttr: {
      deep: true,
      handler () {
        this.localPropsAttr = this.propsAttr
      }
    },
    localPropsAttr: {
      deep: true,
      handler () {
        this.$emit('update:propsAttr', this.localPropsAttr)
      }
    }
  },
  methods: {
    handleRemove (file, fileList) {
      this.localPropsAttr.imgUrlArr = fileList.slice(-3)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleSuccess (res, file) {
      this.localPropsAttr.imgUrlArr.push({
        name: file.name,
        url: res.data.path
      })
    }
  },
  mounted () {
    this.localPropsAttr = this.propsAttr
  }
}
</script>
