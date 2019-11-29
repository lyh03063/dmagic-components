<template>
  <div>
    <el-button plain @click="setAddInit" size="mini">设置formDataAddInit</el-button>

    <dm_debug_list>
      <dm_debug_item v-model="visible" text="visible" />
    </dm_debug_list>

    <dm_list_data :cf="cfList">
      <template #slot_in_toolbar="{data:{tableData}}">插槽内容可显示tableData</template>
      <template v-slot:slot_form_expand_articleTitle="{row}">
        {{row}}
        <el-link type="primary" @click="fold(row)">收起</el-link>
      </template>
      <template #slot_column_CreateTime="{row}">
        <el-popover placement="top-start" width="200" trigger="click" v-model="visible[row.P1]">
          <!--候选值列表-->

          <el-button slot="reference" icon="el-icon-more">插槽{{row.P1}}</el-button>
        </el-popover>
      </template>
    </dm_list_data>
  </div>
</template>

<script>
let T;
import dm_list_data from "../components/list-data/list-data.vue";
import dm_dynamic_form from "../components/list-data/dynamic-form.vue";
export default {
  components: { dm_list_data, dm_dynamic_form },
  data() {
    return {
      visible: {},
      cfList: {
        cfElTable: {
          //默认排序图标显示，需要配合sortJsonDefault
          "default-sort": { prop: "CreateTime", order: "descending" }
        },
        // powerPath:"newsCenter.list_article",
        pageSize: 10,
        listIndex: "list_demo", //vuex对应的字段~
        focusMenu: true, //进行菜单聚焦
        twoTitle: "其他数据", //面包屑1级菜单
        threeTitle: "文章管理", //面包屑2级菜单
        expand: true, //是否展开行
        //操作列配置
        columnOperate: {
          "min-width": 200
        },  

        //dynamicDict动态数据字典配置
        dynamicDict: [
          {
            page: "tangball_article_category",
            populateColumn: "categoryDoc",
            idColumn: "articleCategory",
            idColumn2: "P1"
          }
        ],
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
          //  articleTitle: true
        },
        //列表接口的附加参数
        objParamAddon: {
          aaa: 1111
        },
        cfSearchForm: {
          watch: {
            //传入监听器
            articleCategory(newVal, oldVal) {
              console.log("complete1111变动");
              // this.value.articleTitle = { a: 1 };
            }
          }
        },
        //新增修改弹窗的配置
        cfDialogForm: {
          tips: {
            text: "1,表单的提示语1<br/> 2,表单的提示语2",
            style: { "padding-left": "200px" }
          }
        },
        //新增修改表单的配置
        cfForm: {
          col_span: 12, //控制显示一行多列
          watch: {
            //传入监听器
            articleCategory(newVal, oldVal) {
              console.log("watch-articleCategory变化######################123");
              this.value.articleTitle = this.value.articleTitle + "a";
            }
          },
          cfFormAdd: {
            col_span: 24 //控制显示一行多列
          }
        },
        url: {
          list: "/crossList?page=info_piece", //列表接口
          add: "/crossAdd?page=info_piece", //新增接口
          modify: "/crossModify?page=info_piece", //修改接口
          detail: "/crossDetail?page=info_piece",
          delete: "/crossDelete?page=info_piece" //删除接口
        },

        //expands展开行的显示字段配置
        expands: [
          {
            label: "",
            prop: "name",
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
          COLUMNS.name_fixed,
          {
            label: "案件状态",
            prop: "status",
            filters: [
              { text: "待立案", value: 1 },
              { text: "已结案", value: 2 }
            ],
            columnKey: "status"
          },

          {
            sortable: "custom",
            label: "创建时间",
            prop: "CreateTime",
            width: 145,
            slot: "slot_column_CreateTime"
          },
          COLUMNS.extend
        ],
        //-------筛选表单字段数组-------
        searchFormItems: [F_ITEMS.select1, F_ITEMS.name_search],
        //-------详情字段数组-------
        detailItems: [COLUMNS.name],
        //-------新增、修改表单字段数组-------
        formItems: [F_ITEMS.name]
      }
    };
  },
  computed: {
    cfData: function() {
      return this.$store.state.cfData;
    },
    flag: function() {
      return true;
    }
  },
  watch: {
    cfData: {
      handler(newVal, oldVal) {
        var t_json = JSON.stringify(this.cfData); //：{Json对象转换Json字符串函数}
        this.cfList = util.parseJson(t_json);
      },
      // immediate: true,
      deep: true
    }
  },
  methods: {
    async toggleList() {
      let result = !this.isShowList1;
      this.isShowList1 = null;
      await this.$nextTick(); //延迟到视图更新
      this.isShowList1 = result;
    },
    /**
     * @name 自定义单项操作按钮点击函数
     */
    singlebtnClick: function(eventType, row) {
      console.log("bacthBtnClick-singlebtnClick:", eventType);
      console.log("row:####", row);
    },
    /**
     * @name 自定义批量操作按钮点击函数
     */
    bacthBtnClick: function(eventType, selection) {
      console.log("bacthBtnClick-eventType:", eventType);
      console.log("selection:####", selection);
    },
    fold(row) {
      T.$refs.list1.$refs.table.toggleRowExpansion(row, false);
    },
    afterDelete(param, param1) {
      console.log("afterDelete");
      console.log("删除的数据:", param);
    },
    afterAdd(param, param1) {
      console.log("afterAdd");
      console.log("新增后的数据:", param);
      console.log("新增前的数据:", param1);
    },

    setAddInit() {
      this.cfList.formDataAddInit = { a: 1, b: 2, articleTitle: "234" };
    }
  },
  created() {
    T = this;
    T.cfList2 = Object.assign({}, T.cfList, {
      listIndex: "list_demo2", //vuex对应的字段~
      focusMenu: true, //进行菜单聚焦
      twoTitle: "aaa", //面包屑1级菜单
      threeTitle: "bbb" //面包屑2级菜单
    });
  },
  async mounted() {
    this.$parent.showCFForm = true;
    this.$parent.cfForm.formItems = [
      // {
      //   label: "普通文本框(input)",
      //   prop: "prop1",
      // },
      {
        label: "显示查询表单",
        prop: "isShowSearchForm",
        type: "radio",
        default: true,
        options: [{ value: true, label: "是" }, { value: false, label: "否" }]
      },
      {
        label: "显示操作栏",
        prop: "isShowToolBar",
        type: "radio",
        default: true,
        options: [{ value: true, label: "是" }, { value: false, label: "否" }]
      },
      {
        label: "显示面包屑",
        prop: "isShowBreadcrumb",
        type: "radio",
        default: true,
        options: [{ value: true, label: "是" }, { value: false, label: "否" }]
      },
      {
        label: "显示分页",
        prop: "isShowPageLink",
        type: "radio",
        default: true,
        options: [{ value: true, label: "是" }, { value: false, label: "否" }]
      },
      {
        label: "接口地址",
        prop: "url",
        type: "jsonEditor"
      },
      {
        label: "查询表单",
        prop: "searchFormItems",
        type: "collection"
      },
      {
        label: "列配置",
        prop: "columns",
        type: "collection"
      },
      {
        label: "动态数据字典",
        prop: "dynamicDict",
        type: "collection"
      },
      {
        label: "详情弹窗字段",
        prop: "detailItems",
        type: "collection"
      },
      {
        label: "新增、修改表单字段",
        prop: "formItems",
        type: "collection"
      }
    ];
    var strJson = util.stringify(this.cfList);
    let json1 = JSON.parse(strJson);
    this.$store.commit("setCfData", json1);
  }
};
</script>

<style>
</style>