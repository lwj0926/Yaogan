<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from 'echarts'
import { parseDate } from '@/utils'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '400px'
    },
    chartData: {
      type: Array,
      default: () => []
    },
    serieName: {
      type: String,
      required: true
    },
    daterange: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },

  watch: {
    chartData: {
      deep: true,
      handler(source) {
        this.setOption(source)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons') //'macarons'
      this.setOption(this.chartData)
    },
    setOption(source) {
      const data = []
      this.chartData.forEach(item => {
        data.push([item.date, item.result])
      })
      this.chart.setOption({
        title: {
          text: this.serieName,
          subtext: `(${parseDate(this.daterange[0])}--${parseDate(this.daterange[1])})`
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        legend: {},
        grid: { left: 20, right: 10, bottom: 20, containLabel: true },
        xAxis: {
          type: 'category',
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          // name: '%',
          axisTick: {
            show: false
          },
          axisLabel: {}
        },
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 1000
          },
          {
            start: 0,
            end: 20,
            handleSize: '100%'
            // handleStyle: {
            //   color: '#fff',
            //   shadowBlur: 3,
            //   shadowColor: 'rgba(0, 0, 0, 0.6)',
            //   shadowOffsetX: 2,
            //   shadowOffsetY: 2
            // }
          }
        ],
        series: [
          {
            name: this.serieName,
            type: 'scatter',
            symbolSize: 12,
            data
          }
        ]
      })
    }
  }
}
</script>