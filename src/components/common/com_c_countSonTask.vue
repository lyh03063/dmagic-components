<template>
  <div>
    <a href="javascript:;" @click="showSonTask">{{doc.countSonTask}}</a>

    <!--子任务弹窗列表-->
    <el-dialog
      custom-class="n-el-dialog"
      width="75%"
      title="子任务列表"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :append-to-body="true"
      v-bind:visible.sync="isShowDialog"
      v-if="isShowDialog"
    >
      <dm_list_data :cf="cfList" v-model="listSonTask" v-if="ready"></dm_list_data>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "com_c_countSonTask",
  //用于列表模糊查询的组件
  props: ["doc"],
  data() {
    return {
      ready: false,
      isShowDialog: false,
      listSonTask: [
        {
          spec1: "风管机",
          spec2: "1~3匹",
        },
        {
          spec1: "风管机",
          spec2: "3匹以上",
        },
      ],

      cfList: {
        isShowBreadcrumb: false, //面包屑
        isShowSearchForm: false, //查询表单
        isShowToolBar: false, //批量操作栏
        isShowOperateColumn: false, //单项操作列
        isShowPageLink: false, //分页链接
        isShowCheckedBox: false, //选择框
        listIndex: "list_static_demo", //vuex对应的字段~
        focusMenu: true, //进行菜单聚焦
        //操作列配置
        //-------列配置数组-------
        columns: PUB.listCF.list_task.columns
      },


    };
  },
  methods: {
    //函数：{显示子任务弹窗列表函数}
    showSonTask: async function () {
      this.isShowDialog = true;
      this.ajaxGetSonTask()//调用：{ajax获取子任务列表函数}

    },
    //函数：{ajax获取子任务列表函数}
    ajaxGetSonTask: async function () {

      let { data: { doc } } = await axios({
        //请求接口
        method: "post",
        url: `${PUB.domain}/info/commonDetail`,
        data: { _id: this.doc._id, _systemId: "$all" } //传递参数
      });

      let { sonTask } = doc

     


      //变量：{已选数据的id数组}
      let arrId = sonTask.map(d => d._id);
      let ajaxListUrl = lodash.get(PUB.listCF.list_task, `url.list`);
      let _dataType = lodash.get(PUB.listCF.list_task, `objParamAddon._dataType`);

      let { data: { list } } = await axios({
        method: "post",
        url: `${PUB.domain}${ajaxListUrl}`,
        data: {
          pageSize: 999, _dataType, _systemId: "$all",
          findJson: {
            _id: { $in: arrId }
          }
        }
      });
      var dict = lodash.keyBy(list, '_id')//变量：{临时数据字典}
      this.listComplete = list;
      sonTask.forEach(doc => {//循环：{已选数据数组}
        let docDict = dict[doc._id]//在字典中的文档
        if (!docDict) {//如果{000}000
          docDict = { title: "null！！！！" }
        }
        for (var prop in doc) {
          doc[prop] = docDict[prop]//更新
        }
      })


 this.listSonTask = list



      this.ready = true;

    },
  },
  created() {

  }
};
</script>
