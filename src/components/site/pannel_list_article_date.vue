
<template>
  <div>
    <dm_debug_list>
      <dm_debug_item v-model="cf" />
    </dm_debug_list>
    <!--新闻列表-->
    <dm_pannel class="" type="plain" :link_more="cf.linkMore">
      <template v-slot:title>
        <i class="el-icon-s-grid icon-title-bar"></i>
        <b class="C_333">{{cf.title}}</b>
      </template>
      <list_article_date :cf="cf"></list_article_date>
    </dm_pannel>
  </div>
</template>

<script>
export default {
  name: "pannel_list_article_date",
  components: {

    list_article_date: () => import("@/components/site/list_article_date.vue"),
  },
  props: {
    cf: {},

  },

  data() {
    return {

    };
  },
  methods: {},

  created() {
    this.cf.slot = true;//启用插槽
  },

};
</script>

<style scoped>
</style>
