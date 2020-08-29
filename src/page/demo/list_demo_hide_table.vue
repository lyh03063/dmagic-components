<template>
  <div>
    <dm_pannel_new class="MB20" title="使用卡片插槽">
      <dm_list_data class="MT20" :cf="cfList1">
        <template v-slot:card="{item,index}">
          <a target="_blank" href="javascript:;">{{index}}---{{item.name}}</a>
        </template>
      </dm_list_data>
    </dm_pannel_new>

    <dm_pannel_new class="MB20" title="使用卡片组件comListcard，笔记历史记录">
      <dm_list_data class="MT20" :cf="cfList3"></dm_list_data>
    </dm_pannel_new>

    <dm_pannel_new class="MB20" title="使用卡片组件comListcard">
      <dm_list_data class="MT20" :cf="cfList2"></dm_list_data>
    </dm_pannel_new>
  </div>
</template>

<script>

export default {
  components: {

  },
  data() {
    let cfList1 = lodash.cloneDeep(PUB.listCF.list_demo);

    Object.assign(cfList1, {//合并对象
      isShowTable: false,//隐藏表格
      cfListFlex: { col: 1 ,tipsNoData:"YYYY"},
    });

    let cfList2 = lodash.cloneDeep(PUB.listCF.list_note);

    Object.assign(cfList2, {//合并对象
      isShowTable: false,//隐藏表格
      comCard: "dm_card_note_normal",//卡片组件
      cfListFlex: { col: 1 },
      pageSize: 3,
    });


    let cfList3 = lodash.cloneDeep(PUB.listCF.list_visit_record);

    Object.assign(cfList3, {//合并对象
      isShowTable: false,//隐藏表格
      isShowBreadcrumb: false,//面包屑
      isShowSearchForm: false,//查询表单
      isShowToolBar: false,//批量操作栏
      requireProp: ["timeVisited", "dataId"],//特殊数据对象返回
      comCard: "dm_card_note_history",//卡片组件
      cfListFlex: { col: 1 },
      dynamicDict: [
        { "ajax": { "url": "/info/getCommonList", "param": { "_dataType": "note" } }, "idColumn2": "_id", "idColumn": "dataId", "populateColumn": "dataTarget" }
      ],
      sortJsonDefault: { "timeVisited": 1 },//第二次排序
      pageSize: 10,
      cfPagination: {
        small: true,
        layout: "total,  prev,  next",
      }
    });
    // _userId: this.$sys.userId,
    cfList3.objParamAddon.findJson = { dataType: "note", tagPage: "detail_data" };
    cfList3.objParamAddon.forbidSelectJson = true;//** */
    cfList3.objParamAddon.arrLookup = [
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
      cfList1, cfList2, cfList3
    };
  },


  methods: {


    //自定义批量操作按钮点击函数
    bacthBtnClick: function (eventType, selection) {
    },

    //自定义单项操作按钮点击函数
    singlebtnClick: function (eventType, row) {
    },



  },
  created() {


  },
  async mounted() {


  }
};
</script>

<style>
</style>