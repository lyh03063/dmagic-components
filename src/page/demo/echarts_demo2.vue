<template>
  <div>
    列表组件抽离弹窗编辑数据，传入数据id，数据类型，定位到对应的列表配置
    echarts_demo
    <dm_echart class="W500 H200" :cf="cfEcharts"></dm_echart>
  </div>
</template>

<script>
export default {
  components: {},
  props: ["aaa"],

  data() {
    return {
      cfEcharts: {
        option: {
          tooltip: {
            trigger: 'axis',
            formatter: '时间：{b} \n {a}：{c}'
          },
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',//图表类型
            smooth: true,//平滑曲线
            lineStyle: {//线条样式
              color: 'rgb(15,205,110)',
              // width: 5
            },
            itemStyle: {//节点样式
              borderWidth: 3,
              borderColor: 'rgb(15,205,110)',
              color: 'rgb(15,205,110)'
            },
          }]
        }

      }

    };
  },
  methods: {

    aaaaaa: async function () { },
    aaaaaa: async function () { },
    aaaaaa: async function () { }
  },
  created() { },
  async mounted() { }
};
</script>

<style>
</style>
