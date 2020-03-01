<template>
  <div>
   
    <component :is="com"></component>
  </div>
</template>

<script>


import pannel from "./demo/pannel.vue";
import list_flex_res from "./demo/list_flex_res.vue";
import goods_specs from "./demo/goods_specs.vue";
import goods_specs_2 from "./demo/goods_specs_2.vue";
import goods_specs_front from "./demo/goods_specs_front.vue";
import goods_specs_front_2 from "./demo/goods_specs_front_2.vue";

import goods_cart from "./demo/goods_cart.vue";

export default {
  components: { pannel, list_flex_res,goods_specs,goods_specs_2,goods_specs_front,goods_specs_front_2,goods_cart },

  data() {
    return {
      com: "pannel"
    };
  },
  watch: {
    //监听路由参数
    $route: {
      handler() {
        this.com = this.$route.query.com;
      },
      deep: true
    }
  },
  methods: {},
  created() {
    this.com = this.$route.query.com;
  },
  async mounted() {}
};
</script>

<style>
</style>
