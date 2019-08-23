<template>
  <div>
    <dm_list_data :cf="cfList"></dm_list_data>
  </div>
</template>

<script>
import dm_list_data from "../components/list-data/list-data.vue";
import dm_dynamic_form from "../components/list-data/dynamic-form.vue";
import collection from "../components/form_item/collection.vue";
export default {
  components: { dm_list_data, dm_dynamic_form, collection },

  data() {
    return {
     
      cfList: {"listIndex":"list_article111111","focusMenu":true,"twoTitle":"其他数据","threeTitle":"文章管理","flag":true,"url":{"list":"/crossList?page=tangball_article","add":"/crossAdd?page=tangball_article","modify":"/crossModify?page=tangball_article","detail":"/crossDetail?page=tangball_article","delete":"/crossDelete?page=tangball_article"},"dynamicDict":[{"page":"tangball_article_category","populateColumn":"categoryDoc","idColumn":"articleCategory","idColumn2":"P1"}],"columns":[{"label":"文章标题","prop":"articleTitle","width":260},{"label":"分类名称","prop":"articleCategory","width":150,"formatter11111":"function formatter11111(rowData) {\n            var name = lodash.get(rowData, \"categoryDoc.name\");\n            return name;\n          }"}],"searchFormItems":[{"label":"文章分类","prop":"articleCategory","type":"select","ajax":{"url":"/crossList?page=tangball_article_category","keyLabel":"name","keyValue":"P1"}},{"label":"文章标题","prop":"articleTitle","type":"input_find_vague"}],"detailItems":[{"label":"标题","prop":"articleTitle","width":200},{"label":"文章详情","prop":"articleContent","type":"html"}],"formItems":[{"label":"文章分类","prop":"articleCategory","type":"select","ajax":{"url":"/crossList?page=tangball_article_category","keyLabel":"name","keyValue":"P1"}},{"label":"文章标题","prop":"articleTitle","width":200},{"label":"文章详情","prop":"articleContent","type":"editor"},{"label":"公众号文章地址","prop":"extend","path":"wxArticleUrl"}],"isShowSearchForm":false,"isShowBreadcrumb":false,"isShowPageLink":false,"isShowOperateColumn":true,"isShowToolBar":false,"isRefreshAfterCUD":true}
    };
  },



  methods: {},
  async mounted() {
    
  }
};
</script>

<style>


</style>
