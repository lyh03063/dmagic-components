<template>
  <div>
    <goods_specs_front v-bind="cfGoodsSpecs"></goods_specs_front>
  </div>
</template>

<script>
import goods_specs_front from "./goods_specs_front.vue";

export default {
  components: { goods_specs_front },
  data() {
    return {
      cfGoodsSpecs: {
        docGoods: {
          _id: 1234,
          title: "XXXXX龙庭空调上门清洗服务",
          priceSell: 999,
          imgSrc:
            "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=194427100,3240340114&fm=26&gp=0.jpg"
        },
        listSpecs: [
          {
            __id: "jixing",
            name: "机型",
            options: [
              {
                __id: "jixing_1",
                name: "风管机",
                imgSrc:
                  "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=938396482,3800816148&fm=26&gp=0.jpg"
              },
              {
                __id: "jixing_2",
                name: "挂机",
                imgSrc:
                  "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3038639374,564763994&fm=26&gp=0.jpg"
              }
            ]
          },
          {
            __id: "pishu",
            name: "匹数",
            options: [
              {
                __id: "pishu_1",
                name: "1~3匹",
                imgSrc: ""
              },
              {
                __id: "pishu_2",
                name: "3匹以上",
                imgSrc: ""
              }
            ]
          }
        ],
        listSpecPrice: [
          {
            spec0: "风管机",
            spec1: "1~3匹",
            id: "jixing_1__pishu_1",
            price1: 0,
            stock: 1
          },
          {
            spec0: "风管机",
            spec1: "3匹以上",
            id: "jixing_1__pishu_2",
            price: 2,
            stock: 2
          },
          {
            spec0: "挂机",
            spec1: "1~3匹",
            id: "jixing_2__pishu_1",
            price: 3,
            stock: 3
          },
          {
            spec0: "挂机",
            spec1: "3匹以上",
            id: "jixing_2__pishu_2",
            price: 4,
            stock: 4
          }
        ]
      }
    };
  },

  created() {},
  mounted() {}
};
</script>

<style>
</style>
