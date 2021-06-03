<template>
  <div class="edit-bar">
    <el-row>
      <el-button size="small" type="primary" icon="el-icon-document" @click="creteJson">生成JSON</el-button>
      <el-button size="small" type="primary" icon="el-icon-view" @click="dialogVisiblePreview = true">预览页面</el-button>
      <el-button size="small" type="primary" icon="el-icon-refresh-left" @click="$redoPage()">重做</el-button>
      <el-button size="small" type="primary" icon="el-icon-position" @click="createArticleClass">保存发布</el-button>
    </el-row>
    <el-dialog    title="JOSN 数据"    :visible.sync="dialogVisibleJson"    width="50%">
      <json-viewer :value="ComList" :copyable="{copiedText:'复制成功', copyText:'复制'}"  :expand-depth="5" theme="jv-light"></json-viewer>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleJson = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisibleJson = false">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog  title="预览页面"  :visible.sync="dialogVisiblePreview"    width="50%">
      <div v-for="(item, index) in ComList" :key="index">
          <component :is="item.comTag" :style="item.styleCom"  :propsAttr="item.propsAttr" :comEvents="item.comEvents"></component>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { api } from '@/request/api.js'
export default {
  props: ['params', 'init', 'tabsIndex'],
  name: 'editBar',
  data () {
    return {
      dialogVisibleJson: false,
      dialogVisiblePreview: false
    }
  },
  computed: {
    ComList: {
      get () {
        return this.$comList()
      }
    }
  },
  methods: {
    creteJson () {
      this.dialogVisibleJson = true
    },
    async createArticleClass () {
      if (!this.ComList.length) return this.$message.error('没有编辑组件')
      let { code, msg } = await this.Req[this.params.id ? 'put' : 'post'](this.params.id ? api.marketingUpdate : api.marketingCreate, {
        id: this.params.id,
        mk_name: this.params.mk_name,
        mk_config: this.ComList
      })
      if (code === 200) {
        this.params.init()
        this.$redoPage()
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
      }
      this.$closeTabs(this.tabsIndex)
    }
  }

}
</script>

<style lang="less">
.edit-bar{
  background:#fff;
  padding: 4px;
  border: 1px solid #eee
}
</style>
