<template>
  <div>
    <com_c_sonData class :doc="doc" :cf="cf" @click.native="fnClick"></com_c_sonData>
  </div>
</template>

<script>
export default {
  name: "com_c_sonTaskGId",
  //用于列表模糊查询的组件
  props: ["doc"],
  data: function () {
    return {
      cf: {
        column: "sonTaskGId",
        columnCount: "countSonTask",
        dataType: "task",
        dataTypeName: "任务",
      }
    }

  },
  methods: {
    //函数：{点击后的回调函数}
    fnClick: async function () {
      let resp = await axios({
        method: "post", url: `${PUB.domain}/info/updateATask`, data: { _id: this.doc._idRel2 }
      });

      let { data } = resp
      console.log(`data:`, data);
      Object.assign(this.doc, data.data);//合并对象







    },

  },

  created() {

  }
};
</script>
