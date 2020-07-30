<template>
  <div>
    <div class="FS18 TAC LH40">js转换旧列表配置为新列表配置，更简洁的形式！！！</div>
    <el-row :gutter="10" type="flex">
      <el-col>
        <el-input
          style="width:100%"
          type="textarea"
          :rows="18"
          placeholder="请输入内容"
          v-model="codeSrc"
          @input="transform"
        ></el-input>
      </el-col>
      <el-col style="width:100px">
        <el-button type="primary" @click="transform">转换</el-button>
      </el-col>
      <el-col>
        <el-input
          style="width:100%"
          type="textarea"
          :rows="18"
          placeholder="输出结果"
          v-model="codeResult"
        ></el-input>
      </el-col>
    </el-row>
  </div>
</template>

<script>

let T;
export default {
  components: {},
  data() {
    return {
      codeSrc: `[{ value: "10px 20px 30px 40px" }, { value: "10px 20px 30px" }]`,
      codeResult: ""
    };
  },
  methods: {
    transform() {


      if (!T.codeSrc) return;
      T.codeResult = "";
      let str = ""
      try {
        T.codeSrc = T.codeSrc.trim()
        let obj = eval(T.codeSrc);//转换Json对象
        str = JSON.stringify(obj);//Json对象转换Json字符串
      } catch (err) {
        return this.$message.error('格式错误');
      }
      T.codeResult = str;
      this.$message.success('转换成功');



    }
  },
  beforeCreate() {
    T = this;
  },
  created() { },
  async mounted() { }
};
</script>

<style>
</style>
