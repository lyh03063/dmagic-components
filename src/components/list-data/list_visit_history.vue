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
  name: "list_visit_history",//
  props: {
    cf: {
      default: function () {
        return {};
      }
    }
  },
  data() {

    let { dataTypeDict, tipsNoData, findJsonAddon, cfListAddon = {} } = this.cf

    let cfList = lodash.cloneDeep(PUB.listCF.list_visit_record);

    let ajaxParam = {}
    if (dataTypeDict) {
      ajaxParam._dataType = dataTypeDict
    }

    Object.assign(cfList, {//合并对象
      isShowTable: false,//隐藏表格p
      isShowBreadcrumb: false,//面包屑
      isShowSearchForm: false,//查询表单
      isShowToolBar: false,//批量操作栏
      requireProp: ["timeVisited", "dataId"],//特殊数据对象返回
      comCard: "dm_card_note_history",//卡片组件
      //卡片组件附加配置
      
      cfListFlex: { col: 1, tipsNoData, },
      dynamicDict: [
        { "ajax": { "url": "/info/getCommonList", "param": ajaxParam }, "idColumn2": "_id", "idColumn": "dataId", "populateColumn": "dataTarget" }
      ],
      sortJsonDefault: { "timeVisited": 1 },//第二次排序
      pageSize: 10,
      cfPagination: {
        small: true,
        layout: "total,  prev,  next",
      },
      ...cfListAddon//附加的列表配置
    });
    // _userId: this.$sys.userId,
    cfList.objParamAddon.findJson = { tagPage: "detail_data", ...findJsonAddon };


    cfList.objParamAddon.forbidSelectJson = true;//** */
    cfList.objParamAddon.arrLookup = [
      {
        "$group": {
          "_id": {
            "dataId": "$_data.dataId"
          },
          "timeVisited": {
            "$last": "$_data.timeVisited"//取最后一个
          },
          "arrTimeVisited": {//时间数组。用于测试
            "$push": "$_data.timeVisited"
          },
          "dataId": {
            "$last": "$_data.dataId"//取最后一个
          },
          "tagPage": {
            "$last": "$_data.tagPage"//取最后一个
          }
        }
      },

      {//第二次排序
        $sort: {
          timeVisited: -1
        }
      }
    ]
    return {
      cfList
    };
  },
  methods: {

    //函数：{初始化组件配置函数}
    initCF: async function () {

      let cfAAA = lodash.get(this.cf, `cfAAA`, {});
      let cfAAADefault = {
        aaaa: "11111"
      }
      util.setObjDefault(cfAAA, cfAAADefault);
      util.setObjDefault(this.cf, {
        // isShowSearchForm: false,
        cfAAA
      });

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