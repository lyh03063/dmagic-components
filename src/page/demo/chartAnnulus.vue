<template>
  <div style="width: 100%;height:100%;">
    <div id="workOrderStatistics"></div>
  </div>
</template>

<script>
// import echarts from 'echarts'
export default {
  props: {
    BoxBoardDatachart2: {
      type: [Array, Object],
      default: () => {
        return {
          series: [{
            id: 1,
            name: "工单总数1",
            v: 0
          },
          {
            id: 2,
            name: "工单总数2",
            v: 0
          },
          {
            id: 3,
            name: "工单总数3",
            v: 0
          }]


        }
      }
    },
  },
  data() {
    return {
      boxBoardDatachart2: this.BoxBoardDatachart2.series,
      myChartPie: '',
    }
  },
  watch: {
    BoxBoardDatachart2: function (val, oldVal) {
      this.drawChartPie(val.series, 'workOrderStatistics')
    },
  },
  mounted() {
    console.log("数据00", this.boxBoardDatachart2)
    this.drawChartPie(this.boxBoardDatachart2, 'workOrderStatistics')
    this.$emit('chart', this.myChartPie)
  },
  methods: {
    drawChartPie(boxBoardDatachart2, id) {
      this.myChartPie = echarts.init(document.getElementById(id));
      this.myChartPie.clear();
      // let boxBoardDatachart =[
      //     {id: 1, name: "工单总数", v: 12},
      //     {id: 2, name: "正在进行工单", v: 1},
      //     {id: 3, name: "已完成工单", v: 11}]
      // 使用刚指定的配置项和数据显示图表。
      var color = ['#0286ff', '#ffd302', '#fb5274', '#ff9f7e', '#426eeb', '#f36f8a', '#0bbcb7', '#1a9bfc', '#7049f0'];
      var dataStyle = {
        normal: {
          label: {
            show: false,
            position: 'outside',
          },
          shadowBlur: 40,
          borderWidth: 10,
          shadowColor: 'rgba(0, 0, 0, 0)' //边框阴影
        }
      };
      var placeHolderStyle = {
        normal: {
          color: '#393d50',
          label: {
            show: false,
          },
          labelLine: {
            show: false,
            smooth: false,
          }
        },
        emphasis: {
          color: '#393d50'
        }
      };
      // 指定图表的配置项和数据
      this.myChartPie.setOption({
        background: 'rgba(184, 243, 73, 0.3)',//背景颜色

        tooltip: {
          trigger: 'item',
          formatter: "{b} : {c} ({d}%)"
        },
        // legend :{
        //     // type:'scroll',
        //     orient: 'vertical',
        // },
        calculable: true,
        series: [
          //刻度尺
          {
            name: "",
            type: "gauge",
            radius: "70%",
            center: ['30%', '50%'],
            startAngle: 225,
            endAngle: -134.8,
            splitNumber: 150,
            axisTick: {
              show: false
            },
            splitLine: {
              length: 1,
              lineStyle: {
                width: 1,
                color: "rgba(131,146,180,1)"
              }
            },
            axisLabel: {
              show: false
            },
            pointer: {
              show: false
            },
            axisLine: {
              lineStyle: {
                opacity: 0
              }
            },
            detail: {
              show: false
            },
          },
          {
            name: 'Line 1',
            type: 'pie',
            radius: [70, 80],
            center: ['30%', '50%'],
            itemStyle: dataStyle,
            hoverAnimation: false,
            startAngle: 90,
            // markLine:{
            //     silent:true,
            //     lineStyle:{ normal:{ type:'solid',color:color[0]} },
            //     label:{ normal:{ show:true,//设置name,color:'#FFFFFF',// formatter:'{c}{b}{d}'},},
            //      data: [[ { name: boxBoardDatachart2.series[0].name+boxBoardDatachart2.series[0].v, x: 198, y: 80, symbol:'none',},
            // {x: 300,y: 80, symbol:'none',} ] ]},
            data: [{
              value: boxBoardDatachart2[0].v,
              name: boxBoardDatachart2[0].name,
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: color[0]
                  }])
                }
              },
              label: {
                normal: {
                  show: true,//设置name
                  // color:'#FFFFFF',
                  position: 'outside',
                  // formatter: "{b}  {c}",
                  formatter: ['{b|{b}}', '{c|{c}}'].join('  '),
                  rich: {
                    b: {
                      color: '#FFFFFF',
                    },
                    c: {
                      color: color[0],
                    },
                  }
                },
              },
              labelLine: {    //引导线设置
                normal: {
                  show: true,   //引导线显示
                  width: 10,
                  length: 0,
                  length2: 150,
                }
              },
            },
            {
              value: 0,
              name: '',
              tooltip: {
                show: false
              },
              itemStyle: placeHolderStyle
            },
            ]
          },
          {
            name: 'Line 2',
            type: 'pie',
            radius: [50, 60],
            center: ['30%', '50%'],
            itemStyle: dataStyle,
            hoverAnimation: false,
            startAngle: 90,
            data: [{
              value: boxBoardDatachart2[1].v,
              name: boxBoardDatachart2[1].name,
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: color[2]
                  }])
                }
              },
              label: {
                normal: {
                  show: true,//设置name
                  color: '#FFFFFF',
                  position: 'outside',
                  formatter: ['{b|{b}}', '{c|{c}}'].join('  '),
                  rich: {
                    b: {
                      color: '#FFFFFF',
                    },
                    c: {
                      color: color[2],
                    },
                  }
                },
              },
              labelLine: {    //引导线设置
                normal: {
                  show: true,   //引导线显示
                  width: 10,
                  length: 0,
                  length2: 100
                }
              },
            },
            {
              value: boxBoardDatachart2[2].v,
              name: '',
              tooltip: {
                show: false
              },
              itemStyle: placeHolderStyle
            },
            ]
          },
          {
            name: 'Line 3',
            type: 'pie',
            radius: [30, 40],
            center: ['30%', '50%'],
            itemStyle: dataStyle,
            hoverAnimation: false,
            startAngle: 90,
            data: [{
              value: boxBoardDatachart2[2].v,
              name: boxBoardDatachart2[2].name,
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: color[3],
                  }
                  ]),
                }
              },
              label: {
                normal: {
                  show: true,//设置name
                  color: '#FFFFFF',
                  position: 'outside',
                  formatter: ['{b|{b}}', '{c|{c}}'].join('  '),
                  rich: {
                    b: {
                      color: '#FFFFFF',
                    },
                    c: {
                      color: color[3],
                    },
                  }
                },
              },
              labelLine: {    //引导线设置
                normal: {
                  show: true,   //引导线显示
                  width: 10,
                  length: 0,
                  length2: 120
                }
              },
            },
            {
              value: boxBoardDatachart2[1].v,
              name: '',
              tooltip: {
                show: false
              },
              itemStyle: placeHolderStyle
            },
            ]
          }
        ],
      });
      this.myChartPie.resize();
    }
  },
}
</script>

<style scoped>
#workOrderStatistics {
  width: 300px;
  height: 300px;
  display: flex;
}
</style>
