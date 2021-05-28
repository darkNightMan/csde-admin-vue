<template>
  <div class="edit-bar">
    <el-row>
      <el-button size="small" type="primary" icon="el-icon-document" @click="creteJson">生成JSON</el-button>
      <el-button size="small" type="primary" icon="el-icon-view" @click="dialogVisiblePreview = true">预览页面</el-button>
      <el-button size="small" type="primary" icon="el-icon-refresh-left" @click="$redoPage()">重做</el-button>
      <el-button size="small" type="primary" icon="el-icon-position">保存发布</el-button>
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
export default {
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
