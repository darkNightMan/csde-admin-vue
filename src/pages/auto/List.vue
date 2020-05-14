<style lang="less">
  .text-right{
    text-align: right
  }
</style>
<template>
  <el-container>
    <!-- 头部 -->
    <el-header height="auto">

    </el-header>
    <el-main>

    </el-main>
    <!-- 尾部 页码区域 -->
    <el-footer height="42px" class="text-right">
      <el-pagination
       @size-change="handleSizeChange"
       @current-change="handleCurrentChange"
       :current-page="page.currentPage"
       :page-sizes="[10, 30, 50]"
       :page-size="page.pageSize"
       layout="total, sizes, prev, pager, next, jumper" 
       :total="total">
    </el-footer>
  </el-container>
</template>
<script>
import employees from '@/components/common/remoteSearch/employees.vue'
import remote from '@/components/common/remoteSearch/common.vue'
import SelectCheckBox from '@/components/common/checkBox/SelectCheckBox.vue'

export default {
  name: '',
  components: {
    employees,
    remote,
    SelectCheckBox
  },
  props: ['config', 'value'],
  data () {
    const pickerOptions = {
      shortcuts: [
        {
          text: this.$t('message.time.today'),
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setHours(0)
            start.setSeconds(0)
            start.setMinutes(0)
            picker.$emit('pick', [start, end])
          }
        },
        {
          text: this.$t('message.time.yesterday'),
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setHours(0)
            start.setSeconds(0)
            start.setMinutes(0)
            end.setHours(0)
            end.setSeconds(0)
            end.setMinutes(0)
            end.setTime(end.getTime() - 1000)
            start.setTime(start.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', [start, end])
          }
        },
        {
          text: this.$t('message.time.in_seven'),
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        },
        {
          text: this.$t('message.time.in_fifteen'),
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 15)
            picker.$emit('pick', [start, end])
          }
        },
        {
          text: this.$t('message.time.in_month'),
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        },
        {
          text: this.$t('message.time.now_month'),
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setDate(1)
            start.setHours(0)
            start.setSeconds(0)
            start.setMinutes(0)
            picker.$emit('pick', [start, end])
          }
        },
        {
          text: this.$t('message.time.last_month'),
          onClick (picker) {
            const end = new Date()
            end.setDate(1)
            end.setHours(0)
            end.setSeconds(0)
            end.setMinutes(0)
            end.setTime(end.getTime() - 1000)
            const start = new Date()
            start.setMonth(start.getMonth() - 1,1)
            // start.setDate(1)
            start.setHours(0)
            start.setSeconds(0)
            start.setMinutes(0)
            picker.$emit('pick', [start, end])
          }
        }
      ]
    }
    const defaultVal = this.config.default
    let localValue = this.propToLocal(this.value)
    if (defaultVal) {
      localValue = defaultVal
      this.$emit('input', defaultVal)
    }
    return {
      localValue,
      pickerOptions,
      page: {
        page: 1,
        pageSize: 20
      },
      total: 0
    }
  },
  watch: {
    value (val) {
      this.localValue = this.propToLocal(val)
    },
    localValue (val) {
      this.$emit('input', this.localToEmit(val))
    }
  },
  methods: {
    /**
     * @desc 切换每页显示条目数方法
     * @param val [Number] 每页条目数
     */
    handleSizeChange (val) {
      this.page.currentPage = 1
      this.page.pageSize = val
      this.search()
    },
    /**
     * @desc 切换当前页数方法
     * @param val [Number] 当前页码
     */
    handleCurrentChange (val) {
      this.page.currentPage = val
      this.search()
    },
    /**
     * @desc 查询函数
     * @param isRefreshPage [Boolean] 是否刷新页面
     */
    search (isRefreshPage = true) {

    }
  }
}
</script>
