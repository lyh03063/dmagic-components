
let MIX = {};



//表单字段组件配置
MIX.form_item = {
  props: ["value"],
  data() {
    return {
      valueNeed: this.value
    };
  },

  watch: {//监听器，双向同步
    value: {
      handler(newVal, oldVal) {
        this.valueNeed = this.value
      },
      deep: true
    },
    valueNeed: {
      handler(newVal, oldVal) {
        this.$emit("input", this.valueNeed); //同步valueNeed值到value
      },
      // immediate: true,//组件初始化时立即执行一次变动
      deep: true //深度监听
    }
  },


}




window.MIX = MIX;
export default MIX