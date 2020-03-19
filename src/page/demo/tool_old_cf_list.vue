<template>
  <div>
    <div class="FS18 TAC LH40 ">js转换旧列表配置为新列表配置，更简洁的形式！！！</div>
    <el-row :gutter="10" type="flex">
      <el-col>
        <el-input
          style="width:100%"
          type="textarea"
          :rows="18"
          placeholder="请输入内容"
          v-model="codeSrc"
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
util.oldCFListToNew = function(cfList) {
  let map = {
    detailItems: "D_ITEMS",
    columns: "COLUMNS",
    searchFormItems: "F_ITEMS",
    formItems: "F_ITEMS"
  };
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
      {

  columns: [COLUMNS.title_fixed],
 
}`,
      codeResult: ""
    };
  },
  methods: {
    transform() {
      if (!T.codeSrc) return;
      let obj;
      eval(` obj =${T.codeSrc}`);
      console.log("obj:", obj);
      let objRS = util.oldCFListToNew(obj);

      let str2 = "";

      let mapRemark = {
        detailItems: "//-------详情字段数组-------",
        columns: "//-------列配置数组-------",
        searchFormItems: "//-------筛选表单字段数组-------",
        formItems: "//-------新增、修改表单字段数组-------"
      };

      //for of循环遍历对象，for of不能直接处理对象，本质上是同个Object.keys拼装一个新数组进行辅助

      console.log("Object.keys结果", Object.keys(objRS));
      for (let key of Object.keys(objRS)) {
        console.log(key + ": " + objRS[key]);
        let arrIn = objRS[key];
        console.log("arrIn:", arrIn);
        arrIn = arrIn.map(item => `"${item}"`); //带上引号

        str2 += `${mapRemark[key]}\n`;

        str2 += `${key}:[${arrIn.join()}],\n`;
      }
      str2 += `\nutil.reformCFListItem(PUB.listCF.aaaaaaaaa)`;

      T.codeResult = str2;
    }
  },
  beforeCreate() {
    T = this;
  },
  created() {},
  async mounted() {}
};
</script>

<style>
</style>
