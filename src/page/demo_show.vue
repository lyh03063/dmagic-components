<template>
  <div>
   
    <component :is="com"></component>
  </div>
</template>

<script>


import pannel from "./demo/pannel.vue";
import list_flex_res from "./demo/list_flex_res.vue";

export default {
  components: { pannel, list_flex_res },

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
