<template>
  <div>
    <dm_debug_list>
      <dm_debug_item v-model="formData" text="formData" />
    </dm_debug_list>

    <goods_specs :formData="formData"></goods_specs>
  </div>
</template>

<script>
import goods_specs from "./goods_specs.vue";

//变量：{规格列表}
let listSpecs = [
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
      },
      {
        __id: "jixing_3",
        name: "柜机",
        imgSrc:
          "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3038639374,564763994&fm=26&gp=0.jpg"
      }
    ]
  },
  {
    __id: "pishu",
    name: "匹数",
    "objSpecTerm":{"机型":"风管机"},
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
];
export default {
  // mixins: [MIX.goods_specs],

  components: { goods_specs },
  data() {
    return {
      formData: {
        listSpecs: listSpecs,
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
        ],
        dictSpecPrice: {}
      }
    };
  },

  created() {},
  mounted() {}
};
</script>

<style>
</style>
