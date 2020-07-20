<template>
  <div :class="{C_3a0:doc.payStatus==2}" >

    {{$util.getDictLabel("payStatus",doc.payStatus)}}
    <!-- <el-button plain @click="refund(doc)" size="mini" v-if="doc.payStatus==2">退款</el-button> -->
  </div>
</template>

<script>
export default {
  name: "com_complete",
  //用于列表模糊查询的组件
  props: ["doc"],
  data() {
    return {};
  },


  methods: {
    //函数：{退款函数}
    async refund(doc) {

      let clickStatus = await this.$confirm("确定申请退款？").catch(() => { });
      if (clickStatus != "confirm") return;

      let { orderId } = doc;
      let { data } = await axios({
        //请求接口
        method: "post",
        url: `${PUB.domain}/api_third_part/refundddddddddddddddddddddddddddddd_wx_longting`,
        data: {
          orderId
        }
      });

      if (data.code == 1) {
        //如果{000}000
        return this.$message.error(data.result.err_code_des);
      }
      // this.$set(doc, "payStatus", 3);
      doc.payStatus = 3;
      this.$message.success("申请退款成功！！！");
    }
  },
  created() { }
};
</script>
