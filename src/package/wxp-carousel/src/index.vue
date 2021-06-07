<template>
  <div class="swiper">
    <el-carousel  :autoplay="propsAttr.autoplay" :direction="propsAttr.direction" :interval="propsAttr.interval">
        <el-carousel-item v-for="(item, index) in propsAttr.imgUrlArr" :key="index">
        <img :src="item.bannerUrl" @click="clickFn(item.url)"/>
        </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'wxp-carousel',
  data () {
    return {

    }
  },
  created () {
  },
  props: {
    propsAttr: {
      type: Object,
      default: () => {
        return {
          imgUrlArr: [
            {
              name: 'u=4180093578,3682525324&fm=193.jpg',
              bannerUrl: 'http://localhost:8080/public/uploads/u=4180093578,3682525324&fm=193.jpg'
            },
            {
              name: 'u=337418265,3258441697&fm=193.jpg',
              bannerUrl: 'http://localhost:8080/public/uploads/5ba338b158474650.jpg'
            }
          ],
          autoplay: true,
          interval: 1000,
          direction: 'horizontal'
        }
      }
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    clickFn (url) {
      if (!this.isEdit) {
        window.open(url, '_blank')
      }
    }
  }
}
</script>

<style lang="less">
.swiper{
  img{
    width: 100%;
  }
}
</style>
