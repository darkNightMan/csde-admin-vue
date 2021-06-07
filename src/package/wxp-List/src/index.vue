<template>
  <div>
    <div class="list-box">
        <img :src="propsAttr.imgUrl"/>
        <h2>{{propsAttr.title}}</h2>
        <p></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'wxp-List',
  props: {
    propsAttr: {
      imgUrl: {
        type: String,
        default: '/public/uploads/5ba338b158474650.jpg'
      },
      title: {
        type: String,
        default: '有专家预计中国人口会在2027年达到14.5亿的峰值。国务院第七次全国人口普查领导小组副组长'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.list-box{
  border: 1px solid #333;
  padding: 4px;
  width: 100%;
  img{
    width: 100%;
  }
  h2 {
    font-size: 16px;
    padding: 6px;
  }
}
</style>
