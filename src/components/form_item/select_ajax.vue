<template>
  <el-select
    :multiple="multiple"
    collapse-tags
    v-model="valueNeed"
    placeholder="请选择"
    @change="change"
    clearable
    filterable
  >
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
  </el-select>
</template>

<script>
export default {
  props: {
    multiple: {
      default: false,
      type: Boolean
    },
    value: [String, Number, Array],
    ajaxUrl: {
      default: "/crossList?page=mabang-category"
    },
    keyValue: {
      default: "P1"
    },
    keyLabel: {
      default: "name"
    },
    param: [Object]
  },
  watch: {
    param: {
      handler(newVal, oldVal) {
        this.ajaxGetOptions(); //调用：{ajax获取选项函数}
      },

      deep: true
    }
  },
  data() {
    return {
      valueNeed: this.value,
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        }
      ]
    };
  },
  methods: {
    change() {
      this.$emit("input", this.valueNeed); //触发双向绑定
    },
    //函数：{ajax获取选项函数}
    async ajaxGetOptions() {



      if (PUB._paramAjaxAddon) {//如果需要合并公共变量的基础ajax参数--注意顺序
        util.setObjDefault(this.param, PUB._paramAjaxAddon);//合并公共变量的基础参数-优先级低于个性化配置
      }



      let { data } = await axios({
        //请求接口
        method: "post",
        url: PUB.domain + this.ajaxUrl,
        data: this.param //传递参数
      }).catch(function (error) {
        alert("异常:" + error);
      });
      let list = data.list;
      if (!list) return console.warn("select_ajax的没有请求获取到数据")

      this.options = list.map(item => {
        //将list数组转换成options的结构
        return {
          value: item[this.keyValue],
          label: item[this.keyLabel]
        };
      });
    }
  },
  async created() {
    this.ajaxGetOptions(); //调用：{ajax获取选项函数}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
