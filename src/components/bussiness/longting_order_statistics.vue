<template>
  <div class="item-box DPIB">
    <!-- {{data}} -->

    <dm_debug_list>
      <dm_debug_item v-model="data" />
    </dm_debug_list>

    <div class="DPIB MR20 stat-box">
      <b class="MR20">订单数：{{dataStat.count_order_all}}</b>
      <span class="MR20">
        已支付：
        <span class="C_3a0">{{dataStat.count_order_payed}}</span>
      </span>
      <span class="MR20">未支付：{{dataStat.count_order_unpayed}}</span>
      <span class>已退款：{{dataStat.count_order_refund}}</span>
    </div>
    <div class="DPIB stat-box">
      <b class="MR20">总金额：{{dataStat.money_order_all}}</b>
      <span class="MR20">
        已支付：
        <span class="C_3a0">{{dataStat.money_order_payed}}</span>
      </span>
      <span class="MR20">
        未支付：
        {{dataStat.money_order_unpayed}}
      </span>
      <span class>已退款：{{dataStat.money_order_refund}}</span>
    </div>
    <!-- <el-button plain @click="ajaxGetData" size="mini">ajaxGetData</el-button> -->
  </div>
</template>

<script>
export default {
  name: "longting_order_statistics",
  mixins: [MIX.base],
  props: ["data"],
  data() {
    return {
      dataStat: {
        count_order_all: 100, count_order_payed: 40, count_order_unpayed: 50, count_order_refund: 10,
        money_order_all: 10000, money_order_payed: 4000, money_order_unpayed: 5000, money_order_refund: 1000,
      }

    };
  },
  computed: {

  },
  methods: {

    //函数：{ajax获取统计数据函数}
    ajaxGetData: async function () {

      //****聚合查询参数//_id代表你想聚合的数据的主键；$sum是一个聚合的操作符
      let agParamAddon = [{
        "$group": {
          "_id": null, "count_order_all": { "$sum": 1 }, "money_order_all": { "$sum": "$_data.priceOrder" },
          "count_order_unpayed": { "$sum": { "$cond": [{ "$eq": ["$_data.payStatus", 1] }, 1, 0] } },
          "count_order_payed": { "$sum": { "$cond": [{ "$eq": ["$_data.payStatus", 2] }, 1, 0] } },
          "count_order_refund": { "$sum": { "$cond": [{ "$eq": ["$_data.payStatus", 4] }, 1, 0] } },
          "money_order_unpayed": { "$sum": { "$cond": [{ "$eq": ["$_data.payStatus", 1] }, "$_data.priceOrder", 0] } },
          "money_order_payed": { "$sum": { "$cond": [{ "$eq": ["$_data.payStatus", 2] }, "$_data.priceOrder", 0] } },
          "money_order_refund": { "$sum": { "$cond": [{ "$eq": ["$_data.payStatus", 4] }, "$_data.priceOrder", 0] } }        }      }
      ]


      let findJson = lodash.get(this.data, `objParam.findJson`);
      let { data: { data } } = await axios({
        method: "post", url: `${PUB.domain}/info/getListStatistics`,
        data: { _dataType: "order", _systemId: PUB._paramAjaxAddon._systemId, findJson, agParamAddon }
      });

      this.dataStat = data

    },

  },
  created() { }
};
</script>

<style scoped>
.item-box {
  background: #fff;
}

.stat-box {
  border-radius: 5px;
  padding: 5px 10px;
  background: #f8f8f8;
}
</style>