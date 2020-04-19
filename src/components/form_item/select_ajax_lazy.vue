<template>
  <div class="DPIB">
    <el-select
      v-model="valueNeed"
      :multiple="cf.multiple"
      filterable
      remote
      clearable
      reserve-keyword
      placeholder="请输入"
      @change="change"
      :remote-method="remoteMethod"
      :loading="loading"
    >
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  props: {
    cf: {
      type: Object
    },
    value: [String, Number, Array],

  },

  data() {
    return {
      param: { findJson: {} },//查询参数
      valueNeed: this.value,
      options: [],
      loading: false,
    };
  },
  methods: {
    change() {
      this.$emit("input", this.valueNeed); //触发双向绑定
    },
    //函数：{ajax获取选项函数}
    async ajaxGetOptions() {
      this.loading = true;

      if (PUB._paramAjaxAddon) {//如果需要合并公共变量的基础ajax参数--注意顺序
        util.setObjDefault(this.param, PUB._paramAjaxAddon);//合并公共变量的基础参数-优先级低于个性化配置
      }
      let { data } = await axios({//请求接口//传递参数
        method: "post", url: `${PUB.domain}${this.cf.url} `, data: this.param
      })
      let list = data.list;
      this.options = list.map(item => {  //将list数组转换成options的结构
        return { value: item[this.cf.keyValue], label: item[this.cf.keyLabel] };
      });
      this.loading = false;
    },
    remoteMethod(query) {
      if (query !== '') {
        this.param.findJson = { "projectName": { "$regex": query, "$options": "i" } }
        this.ajaxGetOptions(); //调用：{ajax获取选项函数}
      } else {
        this.options = [];
      }
    }
  },
  async created() {
  },
  mounted() {

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
