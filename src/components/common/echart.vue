<template>
  <div v-bind="cf.box" :id="id">echart</div>
</template>
<script>
export default {
  name: "dm_echart",
  props: {
    cf: {
      default: function () {
        return {};
      }
    }
  },
  components: {},
  data() {
    return {
      id: `id_${util.getTimeRandom()}`//调用：{返回带时间戳的随机数函数}
    };
  },
  methods: {
    //函数：{初始化组件配置函数}
    initCf() {


    },
    //函数：{初始化图表函数}
    initCharts: async function () {
      if (!window.echarts) return console.error("echarts图表插件缺失！")
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById(this.id));
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(this.cf.option);
    },
  },
  created() {
    this.initCf()//调用：{初始化组件配置函数}






  }, mounted() {
    this.initCharts()//调用：{初始化图表函数}
  }
};
</script>

<style scoped>
</style>
