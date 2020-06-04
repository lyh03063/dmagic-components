<template>
  <div>
    列表组件抽离弹窗编辑数据，传入数据id，数据类型，定位到对应的列表配置
    echarts_demo
    <dm_echart class="W300 H200" :cf="cfEcharts"></dm_echart>

    <dm_echart class="W400 H300" :cf="cfEcharts"></dm_echart>
  </div>
</template>

<script>
export default {
  components: {},
  props: ["aaa"],

  data() {
    return {
      cfEcharts: {
        // box:{
        //   class:"W300 H200"
        // },
        option: {
          title: {
            text: '设备状态',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            bottom: 'bottom',
            data: ['正常', '低风险', '高风险']
          },
          color: ['red', 'green', 'yellow',],//颜色配置
          series: [
            {

              name: '数据',
              type: 'pie',
              radius: '55%',
              center: ['50%', '46%'],//位置设置
              data: [
                { value: 335, name: '正常' },
                { value: 310, name: '低风险' },
                { value: 234, name: '高风险' },
              ],

            }
          ]
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
