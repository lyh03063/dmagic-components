<template>
  <div>
    <dm_debug_list>
      <dm_debug_item v-model="formData" text="formData" />
    </dm_debug_list>

    <!-- <el-input v-model="formData1['obj.num2']"></el-input> -->

    <dm_dynamic_form :cf="cfForm" v-model="formData" @submit="submit"></dm_dynamic_form>
  </div>
</template>

<script>
let T;




export default {
  name: "form_demo2",
  components: {
  },

  data() {
    return {
      formData: {},
      //查询表单配置
      cfForm: {
        size: "mini",
        formItems: [
          F_ITEMS.DYDICT
        ],
        btns: [{ text: "查询", event: "submit", type: "primary", size: "mini" }]
      },
    };
  },
  methods: {
    //函数：{查询表单提交的回调函数}
    async submit() {
      alert("submit");
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
