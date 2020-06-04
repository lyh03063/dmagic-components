<template>
  <div>
    <!-- <dm_debug_list>
      <dm_debug_item v-model="visible" text="visible" />
    </dm_debug_list>-->

    <dm_list_data :cf="cfList"></dm_list_data>
  </div>
</template>

<script>
import "../../components/list_demo.js";

PUB._systemId = "sys_api"


export default {
  name: "list_tree_data",
  components: {

  },
  data() {
    return {

      visible: {},
      cfList: {
        idKey: "P1",
        cfElTable: {
          lazy: true,
          "tree-props": { children: 'children', hasChildren: 'name' },
          load: function (tree, treeNode, resolve) {
            setTimeout(() => {
              resolve([
                {
                  P1: 31,
                  date: '2016-05-01',
                  name: '王小虎11',
                  address: '上海市普陀区金沙江路 1519 弄'
                }, {
                  P1: 32,
                  date: '2016-05-01',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1519 弄'
                }
              ])
            }, 200)

          },
        },
        listIndex: "list_franchisee", //vuex对应的字段
        twoTitle: "赛事",
        threeTitle: "加盟商",
        flag: true,
        url: {
          list: "/crossList?page=tangball_franchisee", //列表接口
          add: "/crossAdd?page=tangball_franchisee", //新增接口
          modify: "/crossModify?page=tangball_franchisee", //修改接口
          detail: "/crossDetail?page=tangball_franchisee", //查看单条数据详情接口
          delete: "/crossDelete?page=tangball_franchisee" //删除接口
        },
        //-------列配置数组-------
        columns: [
          {
            label: "Id", prop: "P1", width: 60
          },
          {
            label: "企业名称",
            prop: "name",
            width: 200
          },

        ],
        //-------筛选表单字段数组-------
        searchFormItems: [
          {
            label: "Id",
            prop: "P1",
            type: "input"
          }, {
            label: "加盟时间",
            prop: "joinTime",
            type: "time_period"
          }
        ],
        //-------详情字段数组-------
        detailItems: [
          {
            label: "Id",
            prop: "P1"
          },
          {
            label: "企业名称",
            prop: "name"
          },
          {
            label: "备注",
            prop: "remark"
          }
        ],
        //-------新增、修改表单字段数组-------
        formItems: [
          {
            label: "企业名称",
            prop: "name",
            type: "input"
          },

          {
            label: "加盟时间",
            prop: "joinTime",
            type: "date"
          }
        ]
      }
      ,
    };
  },


  methods: {




  },
  created() {


  },
  async mounted() {


  }
};
</script>

<style>
</style>