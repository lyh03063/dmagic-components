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

export default {
  components: {},

  data() {
    return {
      tableData: [ { "articleTitle": "2222", "P1": 2 }, { "articleTitle": "1111", "P1": 1 } ],

      cfList: {
        cfElTable: {
          "header-row-class-name": "n-table-head11111"
        },
        isShowBreadcrumb: false, //面包屑

        isShowPageLink: false, //分页链接

        pageSize: 2,
        listIndex: "list_demo", //vuex对应的字段~
        focusMenu: true, //进行菜单聚焦

        expand: true, //是否展开行
        //操作列配置
        columnOperate: {
          "min-width": 200
        },
        //列表单项操作按钮的配置
        singleBtns: {
          // detail:false,
          // modify:false,
          //delete: false, //配置基础按钮隐藏（默认显示）
          addon: [
            util.cfList.sBtns.detail,
            util.cfList.sBtns.modify,
            util.cfList.sBtns.delete,
            {
              title: "单项操作（圆形按钮）",
              eventType: "singleOP1",
              cfElBtn: {
                circle: true,
                icon: "el-icon-user-solid"
              }
            },
            {
              title: "单项操作（普通按钮）",
              text: "操作",
              eventType: "singleOP2"
            },
            {
              uiType: "link",
              text: "新窗口打开页面",
              target: "_blank",
              url: "http://www.baidu.com?id=" //这里要配置好参数名，内部会把参数加进来
            }
          ]
        },
        //批量操作按钮的配置
        batchBtns: {
          // add: false, //配置基础按钮隐藏（默认显示）
          // delete: false, //配置基础按钮隐藏（默认显示）
          addon: [
            util.cfList.bBtns.add,
            util.cfList.bBtns.delete,
            {
              text: "批量操作（需选数据）",
              eventType: "bacthOP1",
              needSelect: true,
              cfElBtn: {
                icon: "el-icon-user-solid"
              }
            },
            { text: "其他操作（不需选中数据）", eventType: "bacthOP2" },

            {
              uiType: "link",
              text: "新窗口打开页面",
              target: "_blank",
              url: "http://www.baidu.com",
              cfElBtn: {
                type: "primary",
                icon: "el-icon-user-solid"
              }
            },
            { uiType: "slot", slot: "slot_in_toolbar" }
          ],
          tips: {
            text: "提示语123"
            // style:{"color":"#3a0"}
          }
        },
        deleteFindJson: {
          //ajax查询参数中需要删除的参数
          articleTitle: true
        },

        url: {
          //add: "/crossAdd?page=tangball_article", //新增接口
          // modify: "/crossModify?page=tangball_article", //修改接口
          // detail: "/crossDetail?page=tangball_article",
          //delete: "/crossDelete?page=tangball_article" //删除接口
        },

        //expands展开行的显示字段配置
        expands: [
          {
            label: "",
            prop: "articleTitle",

            slot: "slot_form_expand_articleTitle"
          },
          {
            label: "分类名称",
            prop: "articleCategory",
            requireProp: ["articleContent"], //依赖文章详情，列表需返回该字段
            width: 150,
            formatter11111: function(rowData) {
              let name = lodash.get(rowData, "categoryDoc.name");
              return name;
            }
          }
        ],

        //-------列配置数组-------
        columns: [
          {
            label: "Id",
            prop: "P1",
            width: 120,
            fixed: true
          },
          {
            label: "文章标题2",
            prop: "articleTitle",
            width: 260,
            fixed: true
          },
          {
            label: "分类名称",
            prop: "articleCategory",
            requireProp: ["articleContent"], //依赖文章详情，列表需返回该字段
            width: 150,
            formatter11111: function(rowData) {
              let name = lodash.get(rowData, "categoryDoc.name");
              return name;
            }
          },

          {
            label: "创建时间",
            prop: "CreateTime",
            width: 145,
            slot: "slot_column_CreateTime"
          },
          {
            label: "其他",
            prop: "extend",
            width: 135,
            formatter11111: function(extend) {
              return JSON.stringify(extend.extend);
            }
          }
        ],
        //-------筛选表单字段数组-------
        searchFormItems: [
          {
            label: "下拉框(多选)",
            prop: "select1",
            type: "select",
            // default: [2],
            multiple: true, //多选
            options: [{ value: 1, label: "男" }, { value: 2, label: "女" }]
          },
          {
            label: "文章分类",
            prop: "articleCategory",
            type: "select",
            ajax: {
              url: "/crossList?page=tangball_article_category",
              keyLabel: "name",
              keyValue: "P1"
            }
          },
          {
            label: "文章标题",
            prop: "articleTitle",
            type: "input_find_vague"
          }
        ],
        //-------详情字段数组-------
        detailItems: [
          {
            label: "标题",
            prop: "articleTitle",
            width: 200
          },

          {
            label: "文章详情2",
            prop: "articleContent",
            type: "html"
          }
        ],
        //-------新增、修改表单字段数组-------
        formItems: [
          {
            label: "文章分类",
            prop: "articleCategory",
            type: "select",
            ajax: {
              url: "/crossList?page=tangball_article_category",
              keyLabel: "name",
              keyValue: "P1"
            }
          },
          {
            label: "文章标题22",
            prop: "articleTitle",
            width: 200
          }
        ]
      }
    };
  },

  methods: {
    saveData() {
      console.log("this.tableData:##", this.tableData);
      alert("saveData");
    }
  },
  created() {
    T = this;
  },
  async mounted() {}
};
</script>

<style>

</style>
