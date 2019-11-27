<template>
  <div>
    <dm_list_data
      :cf="cfList"
      v-model="tableData"
      @after-modify="saveData"
      @after-add="saveData"
      @after-delete="saveData"
    >
      <template #slot_in_toolbar="{data:{tableData}}">插槽内容可显示tableData</template>
    </dm_list_data>
  </div>
</template>

<script>
let T;

//预处理列表数据（静态）
let arr_F_ITEMS = [];
for (var prop in window.F_ITEMS) {
  arr_F_ITEMS.push(window.F_ITEMS[prop]);
}

export default {
  components: {},

  data() {
    return {
      tableData: arr_F_ITEMS,

      cfList: {
        idKey: "prop", //数据Id键名
        cfElTable: {
          // "header-row-class-name": "n-table-head11111"
        },
        isShowBreadcrumb: false, //面包屑
        isShowPageLink: false, //分页链接
        pageSize: 2,
        listIndex: "list_static_demo", //vuex对应的字段~
        focusMenu: true, //进行菜单聚焦

        expand: true, //是否展开行
        //操作列配置
        columnOperate: {
          "min-width": 200
        },

        url: {},

        //-------列配置数组-------
        columns: [COLUMNS.item_prop, COLUMNS.item_label, COLUMNS.item_type],
        //-------筛选表单字段数组-------
        searchFormItems: [F_ITEMS.label_search, F_ITEMS.item_prop, F_ITEMS.item_type],
        //-------详情字段数组-------
        detailItems: [D_ITEMS.item_prop, D_ITEMS.item_label, D_ITEMS.item_type],
        //-------新增、修改表单字段数组-------
        formItems: [F_ITEMS.item_label, F_ITEMS.item_prop, F_ITEMS.item_type]
      }
    };
  },

  methods: {
    saveData() {
      console.log("this.tableData:##", this.tableData);

      this.$message.success("回调saveData");
    }
  },
  created() {
    T = this;
  },
  async mounted() {
    //菜单聚焦
    this.$store.commit("changeActiveMenu", "list_static_demo");
  }
};
</script>

<style>
</style>
