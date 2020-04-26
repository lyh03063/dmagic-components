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
import calendar1 from "./demo/calendar1.vue";

import goods_cart from "./demo/goods_cart.vue";

import tool_old_cf_list from "./demo/tool_old_cf_list.vue";
import tool_replace_space from "./demo/tool_replace_space.vue";
import edit_list_data from "./demo/edit_list_data.vue";
import add_list_data from "./demo/add_list_data.vue";

import switch_systemId from "./demo/switch_systemId.vue";

import test_debug_list from "./demo/test_debug_list.vue";
import tree_data_menu from "./demo/tree_data_menu.vue";
import tree_data_normal from "./demo/tree_data_normal.vue";
import title_bar_demo from "./demo/title_bar_demo.vue";
import pannel_new_demo from "./demo/pannel_new_demo.vue";
import form_demo3 from "./demo/form_demo3.vue";
export default {
  components: { pannel, list_flex_res, goods_specs,
    goods_specs_2, goods_specs_front, goods_specs_front_2, 
    goods_cart, calendar1, tree_data_menu,tree_data_normal,
    tool_old_cf_list, tool_replace_space,
    edit_list_data, add_list_data ,switch_systemId ,test_debug_list,title_bar_demo,
    pannel_new_demo,form_demo3
    },

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
  async mounted() { }
};
</script>

<style>
</style>
