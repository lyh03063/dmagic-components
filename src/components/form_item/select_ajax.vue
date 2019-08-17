<template>
  <el-select v-model="valueNeed" placeholder="请选择" @change="change" clearable filterable>
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
  </el-select>
</template>

<script>
export default {
  props: {
    value: [String, Number],
    ajaxUrl: {
      default: "/crossList?page=mabang-category"
    },
    keyValue: {
      default: "P1"
    },
    keyLabel: {
      default: "name"
    },
    param: [Object],
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
    }
  },
  async created() {
    let { data } = await axios({
      //请求接口
      method: "post",
      url: PUB.domain+this.ajaxUrl,
      data: this.param //传递参数
    }).catch(function(error) {
      alert("异常:" + error);
    });
    let list = data.list;

    this.options = list.map(item => {
      //将list数组转换成options的结构
      return {
        value: item[this.keyValue],
        label: item[this.keyLabel]
      };
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
