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
util.oldCFListToNew = function (cfList) {
  let map = { detailItems: "D_ITEMS", columns: "COLUMNS", searchFormItems: "F_ITEMS", formItems: "F_ITEMS" };
  let objResult = {};
  let arrNeed = Object.keys(map);
  arrNeed.forEach(prop => {
    //循环：{需要处理的字段名数组}
    let keyPub = map[prop];
    if (!keyPub) return;

    let objTarget = window[map[prop]];
    let arrOld = cfList[prop];
    if (!arrOld) return;

    let arr2 = arrOld.map(item => {
      let keyMatch = "xxxxxxxxxxxxxxxxxxxxxxx";

      for (let key in objTarget) {
        if (objTarget[key] === item) {
          //如果{000}000
          keyMatch = key;
        }
      }

      return keyMatch;
    });
    objResult[prop] = arr2;
  });
  return objResult;
};

let T;
export default {
  components: {},
  data() {
    return {
      codeSrc: ` 
  columns: [COLUMNS.title_fixed],
`,
      codeResult: ""
    };
  },
  methods: {
    transform() {
      try {
        if (!T.codeSrc) return;
        T.codeResult = "";
        T.codeResult = T.codeSrc.replace(/\n|\r/g, "")

        let reg1 = /\s{2,}/g;
        T.codeResult = T.codeResult.replace(reg1, " ")//将多个空格替换成一个空格

        this.$message.success('转换成功');
      } catch (err) {
        this.$message.error(`${err.toString}`);
      }


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
