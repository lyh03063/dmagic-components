<template>
  <div>
    <dm_list_data :cf="cfList"></dm_list_data>
  </div>
</template>

<script>
import dm_list_data from "../components/list-data/list-data.vue";
import dm_dynamic_form from "../components/list-data/dynamic-form.vue";
export default {
  components: { dm_list_data, dm_dynamic_form },

  data() {
    return {
      cfList: {
        cfSearchForm: {
          watch: {
            //传入监听器
            articleCategory(newName, oldName) {
              console.log("complete1111变动");
              this.value.articleTitle = newName;
            }
          }
        },
        cfForm: {
          col_span: 12 //控制显示一行多列
        },
        pageSize: 2,
        listIndex: "list_article111111", //vuex对应的字段~
        focusMenu: true, //进行菜单聚焦
        twoTitle: "其他数据",
        threeTitle: "文章管理",
        flag: true,
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
            label: "文章标题",
            prop: "articleTitle",
            width: 200
          },
          // {
          //   label: "文章详情",
          //   prop: "articleContent",
          //   type: "editor"
          // },
          {
            label: "文章详情",
            prop: "articleContent",
            type: "editorTM"
          },
          {
            label: "公众号文章地址",
            prop: "extend",
            path: "wxArticleUrl"
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

  methods: {},
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
