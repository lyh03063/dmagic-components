<template>
  <div>
    <dm_list_data :cf="cfList"></dm_list_data>
  </div>
</template>

<script>
let _dataType = "html_api",
  _systemId = "sys_api";
let T;
import dm_list_data from "../components/list-data/list-data.vue";
import dm_dynamic_form from "../components/list-data/dynamic-form.vue";
export default {
  components: { dm_list_data, dm_dynamic_form },
  data() {
    return {
      visible: {},
      cfList: {
        idKey: "_id", //键名
        pageSize: 20,
        listIndex: "list_html_api", //vuex对应的字段~
        focusMenu: true, //进行菜单聚焦

        threeTitle: "Html-API", //面包屑2级菜单

        url: {
          list: `/info/getCommonList`, //列表接口
          add: "/info/commonAdd", //新增接口
          modify: "/info/commonModify", //修改接口
          detail: "/info/commonDetail",
          delete: "/info/commonDelete" //删除接口
        },
        //objParamAddon列表接口的附加参数
        objParamAddon: {
          _systemId,
          _dataType
        },
        //公共的附加参数，针对所有接口
        paramAddonPublic: {
          _systemId,
          _dataType
        },

        //-------列配置数组-------
        columns: [COLUMNS.title_fixed, COLUMNS.desc],
        //-------筛选表单字段数组-------
        searchFormItems: [COLUMNS.title_search],
        //-------详情字段数组-------
        detailItems: [D_ITEMS.title, D_ITEMS.desc],
        //-------新增、修改表单字段数组-------
        formItems: [
          F_ITEMS.title,
          F_ITEMS.desc,
         F_ITEMS.detail,
        ]
      }
    };
  },

  methods: {},
  created() {
    T = this;
  },
  async mounted() {}
};
</script>

<style>
</style>