<template>
  <div class="left">
   <el-tag @click="getCom(item)" style="margin:20px" v-for="(item, index) in componentsArr" :key="index">{{item.title}}</el-tag>
    <vuedraggable  v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}">
      <component  :is="item.componentName " @click="getCom(item)" style="margin:10px" v-for="(item, index) in componentsArr" :key="index">{{item.title}}</component>
    </vuedraggable>
  </div>
</template>
<script>

import packages from '@/package'

export default {
  data () {
    return {
      componentsArr: packages
    }
  },
  methods: {
    getCom (item) {
      debugger
    }
  }
}
</script>

<style scoped>
.left{
  border: 1px solid #eee;
  height: 1000px;
}
</style>
