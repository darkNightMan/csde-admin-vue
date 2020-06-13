<style>
  #activationChart {
    width: 100%;
    height: 400px;
  }
</style>

<template>
  <div id="activationChart"></div>
</template>

<script>
import 'echarts/lib/chart/bar'
import theme from '@/utils/echartThem.js'
export default {
  name: 'activationChart',
  data () {
    return {
    }
  },
  mounted () {
    let options = {
      title: {
        text: '每周活跃度'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
      },
      yAxis: {},
      series: [
        {
          name: '访问量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20, 30]
        }
      ]
    }
    let chart = this.$echarts.init(document.getElementById('activationChart'), theme)
    chart.setOption(options)
  }
}
</script>
