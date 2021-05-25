<template>
  <div>
     <el-form ref="form"  label-width="80px">
        <div>
            <el-form-item label="跳转地址">
                <el-input v-model="localEvents.link"></el-input>
            </el-form-item>
         </div>
      </el-form>
  </div>
</template>

<script>
export default {
  name: 'event-button',
  data () {
    return {
      localEvents: {
        link: ''
      }
    }
  },
  props: {
    comEvents: {
      link: String
    }
  },
  watch: {
    comEvents: {
      deep: true,
      handler () {
        this.localEvents = this.comEvents
      }
    },
    localEvents: {
      deep: true,
      handler () {
        this.$emit('update:comEvents', this.localEvents)
      }
    }
  },
  mounted () {
    this.localEvents = this.comEvents
  }
}
</script>
