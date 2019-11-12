<template>
  <component
    ref="chart"
    class="va-chart"
    :is="chartComponent"
    :chartOptions="options"
    :chart-data="data"
  />
</template>

<script>
import PieChart from './chart-types/PieChart'
import BubbleChart from './chart-types/BubbleChart'
import DonutChart from './chart-types/DonutChart'
import HorizontalBarChart from './chart-types/HorizontalBarChart'
import VerticalBarChart from './chart-types/VerticalBarChart'
import LineChart from './chart-types/LineChart'
import { chartTypesMap } from './VaChartConfigs'

export default {
  name: 'VaChart',
  props: {
    data: {
      type: Object,
      default () {
        return {}
      },
    },
    options: {
      type: Object,
      default () {
        return {}
      },
    },
    type: {
      type: String,
      required: true,
      validator (type) {
        return type in chartTypesMap
      },
    },
  },
  components: {
    PieChart,
    LineChart,
    VerticalBarChart,
    HorizontalBarChart,
    DonutChart,
    BubbleChart,
  },
  computed: {
    chartComponent () {
      return chartTypesMap[this.type]
    },
  },
}
</script>

<style lang='scss'>
.va-chart {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  > * {
    height: 100%;
    width: 100%;
  }

  canvas {
    width: 100%;
    height: auto;
  }
}
</style>
