<template>
  <div class>
    <el-date-picker
      v-model="valueNeed"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      value-format="yyyy-MM-dd HH:mm:ss"
      :picker-options="pickerOptions"
      :default-time="['00:00:01', '23:59:59']"
    ></el-date-picker>
  </div>
</template>

<script>
export default {
  props: {
    value: [Object, Array]
  },
  watch: {
    valueNeed: {
      handler(newVal, oldVal) {
        //变动后的回调
        //Q1:{valueNeed}存在
        if (this.valueNeed) {
          let objTime = { $gte: this.valueNeed[0], $lte: this.valueNeed[1] };

          this.$emit("input", objTime); //同步valueNeed值到value
        } //Q2:{valueNeed}不存在
        else {
          
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
    
  },
  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
