<template>
  <div>
    <el-button plain @click="setAddInit" size="mini">设置formDataAddInit</el-button>

    <dm_list_data
      :cf="cfList"
      @after-modify="afterModify"
      @after-show-Dialog-Add="showAdd"
      @after-show-Dialog-Modify="showModify"
      @after-show-Dialog-Detail="showDetail"
    >
      <template #slot_in_toolbar>插槽内容</template>
      <template v-slot:slot_form_expand_articleTitle="{row}">
        {{row}}
        <el-link type="primary" @click="fold(row)">收起</el-link>
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
      cfList: {
        //列表单项操作按钮的配置
        singleBtns: {
          // detail:false,
          // modify:false,
          delete: false, //配置基础按钮隐藏（默认显示）
          addon: [
            {
              title: "单项操作（圆形按钮）",
              circle: true,
              icon: "el-icon-user-solid",
              eventType: "singleOP1"
            },
            {
              title: "单项操作（普通按钮）",
              text: "操作",
              eventType: "singleOP2"
            }
          ]
        },
        //批量操作按钮的配置
        bactchBtns: {
          // add: false, //配置基础按钮隐藏（默认显示）
          delete: false, //配置基础按钮隐藏（默认显示）
          addon: [
            {
              text: "批量操作（需选中数据）",
              eventType: "bacthOP1",
              needSelect: true
            },
            { text: "其他操作（不需选中数据）", eventType: "bacthOP2" },

            {
              type: "primary",
              uiType: "link",
              text: "新窗口打开页面",
              target: "_blank",
              url: "http://www.baidu.com"
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
        //列表接口的附加参数
        objParamAddon: {
          aaa: 1111
        },
        cfSearchForm: {
          watch: {
            //传入监听器
            articleCategory(newName, oldName) {
              console.log("complete1111变动");
              this.value.articleTitle = { a: 1 };
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
            articleCategory(newName, oldName) {
              console.log("watch-articleCategory变化######################123");

              this.value.articleTitle = this.value.articleTitle + "a";
            }
          },
          cfFormAdd: {
            col_span: 24 //控制显示一行多列
          }
        },
        pageSize: 2,
        listIndex: "list_demo", //vuex对应的字段~
        focusMenu: true, //进行菜单聚焦
        twoTitle: "其他数据", //面包屑1级菜单
        threeTitle: "文章管理", //面包屑2级菜单
        expand: true, //是否展开行
        url: {
          list: "/crossList?page=tangball_article", //列表接口
          add: "/crossAdd?page=tangball_article", //新增接口
          modify: "/crossModify?page=tangball_article", //修改接口
          detail: "/crossDetail?page=tangball_article",
          delete: "/crossDelete?page=tangball_article" //删除接口
        },
        dynamicDict: [
          {
            page: "tangball_article_category",
            populateColumn: "categoryDoc",
            idColumn: "articleCategory",
            idColumn2: "P1"
          }
        ],
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
            label: "文章标题",
            prop: "articleTitle",
            width: 260
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
            width: 145
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
          // {
          //   label: "文章标题",
          //   prop: "articleTitle",
          //   type: "input"
          // },
        ],
        //-------详情字段数组-------
        detailItems: [
          {
            label: "标题",
            prop: "articleTitle",
            width: 200
          },
          {
            label: "文章详情",
            prop: "articleContent",
            type: "htmlJson"
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
          },
          // {
          //   label: "文章详情",
          //   prop: "articleContent",
          //   type: "editor"
          // },
          {
            term: { articleTitle: "123" },
            label: "文章详情",
            prop: "articleContent",
            type: "editorTM"
          },
          {
            label: "文章详情",
            prop: "articleContent",
            type: "editorTM",
            col_span: 24
          },
          {
            label: "公众号文章地址",
            prop: "extend",
            path: "wxArticleUrl"
          },

          {
            label: "extend",
            prop: "extend",
            type: "jsonEditor"
          }
        ]
      }
    };
  },

  computed: {
    cfData: function() {
      return this.$store.state.cfData;
    }
  },
  watch: {
    cfData: {
      handler(newName, oldName) {
        var t_json = JSON.stringify(this.cfData); //：{Json对象转换Json字符串函数}
        this.cfList = util.parseJson(t_json);
      },
      // immediate: true,
      deep: true
    }
  },

  methods: {
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
    afterModify(param, param1) {
      console.log("afterModify");
      console.log("修改后的数据:", param);
      console.log("修改前的数据:", param1);
    },
    setAddInit() {
      this.cfList.formDataAddInit = { a: 1, b: 2, articleTitle: "234" };
    },
    showAdd() {
      this.cfList.formItems = [
        {
          label: "文章标题11",
          prop: "articleTitle",
          width: 200
        }
      ];
    },
    showModify() {
      // this.cfList.formItems = [
      //   {
      //       label: "文章标题11",
      //       prop: "articleTitle",
      //       width: 200
      //     }
      // ]
    },
    showDetail() {
      this.cfList.detailItems = [
        {
          label: "文章标题11",
          prop: "articleTitle",
          width: 200
        }
      ];
    }
  },
  created() {
    T = this;
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
