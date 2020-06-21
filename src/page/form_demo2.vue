<template>
  <div>
    <dm_debug_list>
      <dm_debug_item v-model="formData" text="formData" />
    </dm_debug_list>

    <!-- <el-input v-model="formData1['obj.num2']"></el-input> -->

  <dm_dynamic_form :cf="cfFormSearch" v-model="formData" @submit="searchList"></dm_dynamic_form>
    
  </div>
</template>

<script>
import checkbox_diy from "../components/form_item/checkbox_diy.vue";
let T;




export default {
  name: "form_demo2",
  components: { 
      checkbox_diy },

  data() {
    return {
      formData: {},
      //查询表单配置
      cfFormSearch: {
        inline: true,
        size: "mini",
        formItems: [F_ITEMS.importance,    F_ITEMS.objAddonItem,],
        btns: [{ text: "查询", event: "submit", type: "primary", size: "mini" }]
      },
    };
  },
  methods:{
      //函数：{查询表单提交的回调函数}
    async searchList() {
      alert("searchList");
    },
  },
  created() {
    T = this;
  },
  async mounted() {
    this.$store.commit("changeActiveMenu", "form_demo2");
    
  }
};
</script>

<style>
</style>
