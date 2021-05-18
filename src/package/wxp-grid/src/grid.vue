<template>
<div >
  <!-- <vuedraggable :group="{ name: 'g1' }"   @start="$emit('dragStart', $event, item.list)"  > -->
    <el-row :gutter="10">
      <el-col class="grid-item 2" v-for="(item, index) in columns" :span="item.span" :key="index" >
        <!-- @add="$emit('handleColAdd', $event, item.list)" -->
        <!-- <vuedraggable :group="{ name: 'g1' }"   @start="$emit('dragStart', $event, item.list)"   @add="add($event, item.list)">
            <component v-for="(item, index) in item.list" :is="item.comTag"  :propsAttr="item.propsAttr" :key="index"    @add="add"></component>
        </vuedraggable> -->
        <contentItem :list="item.list"  @click="$emit('click')"></contentItem>
        </el-col>
    </el-row>
  <!-- </vuedraggable> -->
  </div>
</template>
<script>
import contentItem from '@/pages/tabpage/autofrom/components/contentItem'
export default {
  components: {
    contentItem
  },
  data () {
    return {
      a: []
    }
  },
  name: 'wxp-grid-item',
  props: {
    columns: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  created () {
  },
  methods: {
    end (item) {
    },
    add (a, c) {
      debugger
      console.log(a, c)
    }
  }
}
</script>
<style lang="less" scoped>
.grid-item{
  min-height: 45px;
  border: 1px #ccc dashed;
  padding: 4px;
}
  .button{
    padding: 4px 10px;
    display: inline-block;
    color:#fff;
    border: 1px solid #eee;
  &.default{
    background-color:#fff;
     color:#333;
  }
  &.primary{
    background-color: hsl(210deg 100% 63%);
  };
  &.success{
    background-color: hsl(100deg 54% 49%);
  };
  &.danger{
    background-color: hsl(0deg 87% 69%);
  }
};

</style>
