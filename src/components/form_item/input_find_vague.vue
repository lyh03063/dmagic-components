<template>
  <div class>
    <!--文本框+自定义处理器-->
    <el-input v-model="valueNeed" @input="change"></el-input>
  </div>
</template>

<script>
export default {//用于列表模糊查询的组件
  props: {
    value: [Object]
  },
  data() {
    return {
      valueNeed: this.value,
   
    };
  },
  methods: {
    change() {
      this.$emit("input", {
        $regex: this.valueNeed,
        $options: "i"
      }); //触发双向绑定
    }
  },
  created() {
    //如果{value}存在
    if (this.value) {
      
      this.valueNeed = this.value.$regex;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
