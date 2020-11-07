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
  name: "list_visit_often",//
  props: {
    cf: {
      default: function () {
        return {};
      }
    }
  },
  data() {
    /****************************列表配置-START****************************/
    let { dataTypeDict, tipsNoData, findJsonAddon, cfListAddon = {} } = this.cf
    let cfList = lodash.cloneDeep(PUB.listCF.list_visit_record);//深拷贝访客记录列表配置

    let ajaxParam = {}
    if (dataTypeDict) {
    
      ajaxParam._dataType = dataTypeDict
    }

    Object.assign(cfList, {//合并对象
      isShowTable: false,//隐藏表格p
      isShowBreadcrumb: false,//面包屑
      isShowSearchForm: false,//查询表单
      isShowToolBar: false,//批量操作栏
      requireProp: ["timeVisited", "dataId"],//特殊字段返回
      comCard: "dm_card_note_history",//卡片组件*
      cfListFlex: { col: 1, tipsNoData, },
      dynamicDict: [
        { "ajax": { "url": "/info/getCommonList", "param": ajaxParam }, "idColumn2": "_id", "idColumn": "dataId", "populateColumn": "dataTarget" }
      ],
      sortJsonDefault: { "visitTimes": -1 },//第二次排序
      pageSize: 10,
      cfPagination: {
        small: true,
        layout: "total,  prev,  next",
      },
      ...cfListAddon//附加的列表配置
    });
    // _userId: this.$sys.userId,
    cfList.objParamAddon.findJson = { tagPage: "detail_data",islatest: "1", ...findJsonAddon };
    /****************************列表配置-END****************************/





    return {
      cfList
    };
  },
  methods: {

    //函数：{初始化组件配置函数}
    initCF: async function () {



    },
  },
  async created() {
    this.initCF()//调用：{初始化组件配置函数}





  },
  mounted() {
    this.$emit("inited", { vm: this }); //将当前对象抛出
  }
};
</script>
<style scoped>
</style>