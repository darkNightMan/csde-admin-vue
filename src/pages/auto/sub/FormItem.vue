<template>
  <el-form-item v-bind="$attrs" :prop="config.key" :rules="config" :label="config.label || ''">
    <el-select
      v-if="config.type === 'select' && !config.multiple"
      v-model="localValue"
      :clearable="config.clearable !== undefined ? config.clearable : !config.default"
      filterable
      :placeholder="config.placeholder || ''"
      :style="`width:${config.width || 200}px`"
      :size="config.size||''"
    >
      <el-option
        v-for="(item, index) in config.option || []"
        :key="index"
        :label="item.value"
        :value="item.key"
      ></el-option>
    </el-select>
    <el-checkbox
      v-if="config.type === 'checkbox'"
      v-model="localValue"
    >{{ config.checkLabel || '' }}</el-checkbox>
    <el-radio-group :size="config.size||''" v-if="config.type === 'radio'" v-model="localValue">
      <el-radio
        v-for="(item, index) in config.option || []"
        :key="index"
        :label="item.key"
      >{{item.value}}</el-radio>
    </el-radio-group>
    <el-radio-group :size="config.size||''" v-if="config.type=='radioButton'" v-model="localValue">
      <template>
        <el-radio-button
          :label="it.key"
          :key="ind"
          v-for="(it,ind) in config.option || []"
        >{{it.value}}</el-radio-button>
      </template>
    </el-radio-group>
    <el-input
      :size="config.size||''"
      v-if="config.type === 'input'"
      clearable
      :disabled="!!config.disabled"
      v-model="localValue"
      :placeholder="config.placeholder || ''"
      :style="`width:${config.width || 200}px`"
    ></el-input>
    <el-input-number
     :style="`width:${config.width || 200}px`"
      :size="config.size||''"
      v-if="config.type === 'inputNumber'"
      v-model="localValue"
      :min="config.min"
      :max="config.max"
      clearable
      :controls="config.controls?true:false"
      :placeholder="config.placeholder || ''"
      v-bind="config.moreAttr || {}"
      :precision="config.precision"
    />
    <el-date-picker
      :size="config.size||''"
      :clearable="config.clearable===false? false:true"
      v-if="config.type === 'date'"
      value-format="yyyy-MM-dd"
      v-model="localValue"
      type="date"
      :placeholder="config.placeholder || ''"
    ></el-date-picker>
    <el-date-picker
      :size="config.size||''"
      :clearable="config.clearable===false? false:true"
      v-if="config.type === 'daterange'"
      :picker-options="pickerOptions"
      value-format="yyyy-MM-dd"
      :start-placeholder="config.startPlaceholder||'开始时间'"
      :end-placeholder="config.endPlaceholder||'结束时间'"
      v-model="localValue"
      type="daterange"
      style="width:240px"
    />
    <el-date-picker
      :size="config.size||''"
      :clearable="config.clearable===false? false:true"
      v-if="config.type === 'datetimerange'"
      :picker-options="pickerOptions"
      value-format="yyyy-MM-dd HH:mm:ss"
      :start-placeholder="config.startPlaceholder||'开始时间'"
      :end-placeholder="config.endPlaceholder||'结束时间'"
      v-model="localValue"
      type="datetimerange"
      style="width:240px"
    />
    <employees
      :size="config.size||''"
      v-if="config.type === 'employees'"
      v-model="localValue"
      :placeholder="config.placeholder || ''"
      :multiple="!!config.multiple"
      :option="config.option || []"
    />
    <remote
      :size="config.size||''"
      v-if="config.type === 'remote'"
      v-model="localValue"
      :placeholder="config.placeholder || ''"
      :multiple="!!config.multiple"
      :option="config.option || []"
      :url="config.url||''"
    />
    <SelectCheckBox
      :size="config.size||''"
      v-model="localValue"
      :clearable="config.clearable !== undefined ? config.clearable : !config.default"
      :placeholder="config.placeholder"
      :data="config.option || []"
      v-if="config.type === 'select' && config.multiple"
    ></SelectCheckBox>
  </el-form-item>
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
      pickerOptions
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
    // 数据类型转化 -> 如,连接的 转 数组
    propToLocal (val) {
      // 拼接值 -> 数组化
      if (this.config.isJoinValue) {
        return val ? val.split(',') : []
      }
      return val
    },
    // 本地数据回传
    localToEmit (val) {
      // 数组值 -> 拼接化
      if (this.config.isJoinValue) {
        return val.join(',')
      }
      return val
    }
  }
}
</script>
