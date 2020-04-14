<template>
  <div class>
    <dm_debug_list>
      <dm_debug_item v-model="cf" text="cf" />
      <dm_debug_item v-model="value" text="value" />
    </dm_debug_list>

    <el-date-picker v-model="valueNeed" v-bind="cf.cfDataPicker"></el-date-picker>
  </div>
</template>

<script>
export default {
  props: {
    value: [Object, Array, String],
    cf: {
      default: function () {
        return {}
      },
      type: [Object]
    }
  },
  watch: {
    value: {
      handler(newVal, oldVal) {

      },
      // immediate:true,
      deep: true,
    },
    valueNeed: {
      handler(newVal, oldVal) {
        //变动后的回调
        if (this.valueNeed) {//Q1:{valueNeed}存在

          console.log("this.valueNeed:", this.valueNeed);
          let dataType = util.type(this.valueNeed)//变量：{数据类型}
          console.log("dataType:", dataType);
          let valueTrue;
          if (dataType == "array") {//Q1:{数据类型}是数组
            valueTrue = { [this.cf.keyStart]: this.valueNeed[0], [this.cf.keyEnd]: this.valueNeed[1] };
          } else { //Q2:否则
            valueTrue = this.valueNeed;
          }
          console.log("valueTrue:", valueTrue);
          this.$emit("input", valueTrue); //同步valueNeed值到value
        } else {//Q2:{valueNeed}不存在
          this.$emit("input", null); //同步valueNeed值到value
        }
      },
      // immediate: true,//组件初始化时立即执行一次变动
      deep: true //深度监听
    }
  },
  data() {
    return {
      valueNeed: this.value,
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  methods: {
    //函数：{初始化组件函数}
    init() {
      let cfDataPicker = this.cf.cfDataPicker || {}
      //日期选择器默认配置
      let cfDataPickerDefault = {
        "type": "daterange",
        "align": "right",
        "unlink-panels": true,
        "range-separator": "至",
        "start-placeholder": "开始时间",
        "end-placeholder": "结束时间",
        "value-format": "yyyy-MM-dd HH:mm:ss",
        "default-time": ['00:00:01', '23:59:59'],
        "picker-options": this.pickerOptions,
      }
      util.setObjDefault(cfDataPicker, cfDataPickerDefault);

      util.setObjDefault(this.cf, {
        keyStart: "$gte",//开始时间key
        keyEnd: "$lte",//结束时间key
        cfDataPicker,
      });
    },
    //函数：{初始化数据函数}
    initData() {
      let dataType = util.type(this.value)//变量：{数据类型}
      if (dataType == "object") {//Q1:{数据类型}是对象
        let time1 = this.value[this.cf.keyStart]
        let time2 = this.value[this.cf.keyEnd]
        this.valueNeed = [time1, time2]
      } else { //Q2:否则
        this.valueNeed = this.value;
      }
    }

  },
  created() {
    this.init();//调用：{初始化组件函数}
    this.initData();//调用：{初始化数据函数}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
