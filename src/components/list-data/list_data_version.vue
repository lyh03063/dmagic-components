<template>
  <div class="out">
    <dm_list_data :cf="cfList">
      <!--无数据提示插槽传递-->
      <template #noData>
        <slot class name="noData"></slot>
      </template>
    </dm_list_data>
  </div>
</template>
<script>
export default {
  mixins: [MIX.base,],
  name: "list_data_version",//
  props: {
    cf: {
      default: function () {
        return {};
      }
    }
  },
  data() {
    let { dataTypeDict, tipsNoData, findJsonAddon, cfListAddon = {} } = this.cf
    let cfList = lodash.cloneDeep(PUB.listCF.list_data_version);
    Object.assign(cfList, {//合并对象
      isShowTable: false,//隐藏表格p
      isShowBreadcrumb: false,//面包屑
      isShowSearchForm: false,//查询表单
      isShowToolBar: false,//批量操作栏
      requireProp: ["timeVisited", "dataId"],//特殊数据对象返回
      comCard: "dm_card_data_version",//卡片组件
      //卡片组件附加配置
      cfListFlex: { col: 1, tipsNoData, },
      pageSize: 10,
      cfPagination: {
        small: true,
        layout: "total,  prev,  next",
      },
      ...cfListAddon//附加的列表配置
    });
    // _userId: this.$sys.userId,
    cfList.objParamAddon.findJson = {  ...findJsonAddon };
    cfList.objParamAddon.forbidSelectJson = true;//** */
    return {
      cfList
    };
  },
  methods: { },
  async created() {
  },
  mounted() {
    this.$emit("inited", { vm: this }); //将当前对象抛出
  }
};
</script>
<style scoped>
</style>