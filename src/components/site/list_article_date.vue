
<template>
  <div>
    <dm_debug_list>
      <dm_debug_item v-model="cf" />
    </dm_debug_list>
    <list_article :cf="cf">
      <!--开启插槽-->
      <template v-slot="{doc}">
        <el-row :gutter="2" type="flex">
          <el-col class="LH38">
            <i class="el-icon-caret-right C_999 MR5"></i>
            <a class="FS16 C_666" target="_blank" href="javascript:;">{{doc.title}}</a>
          </el-col>
          <el-col class="LH38 32  TAR FS14" >
            <span class="C_999 ">{{doc.date}}</span>
          </el-col>
        </el-row>
      </template>
    </list_article>
  </div>
</template>

<script>
export default {
  name: "list_article_date",
  components: {

    list_article: () => import("@/components/site/list_article.vue"),
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
    this.cf.slot=true;//启用插槽
  },

};
</script>

<style scoped>
</style>
