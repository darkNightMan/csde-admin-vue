<template>
  <div>
    <div class="list-box">
        <img  :src="propsAttr.imgUrl"/>
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
        default: 'http://localhost:8080/public/uploads/84ae30c406481c699e9e0294838d6852.jpg'
      },
      title: {
        type: String,
        default: '有专家预计中国人口会在2027年达到14.5亿的峰值。国务院第七次全国人口普查领导小组副组长'
      }
    }
  }

}
</script>

<style scoped>
.list-box{
  border: 1px solid #eee;
}
 img{
    padding: 4px;
  }
  h2 {
    font-size: 16px;
  }
</style>
