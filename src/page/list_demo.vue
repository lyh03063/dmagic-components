<template>
  <div>
    <el-button plain @click="setAddInit" size="mini">设置formDataAddInit</el-button>

    <dm_list_data :cf="cfList" @after-modify="afterModify"
     @after-show-Dialog-Add="showAdd" 
     @after-show-Dialog-Modify='showModify'
     @after-show-Dialog-Detail='showDetail'>
      <template v-slot:slot_form_expand_articleTitle="{row}">
        {{row}}
      </template>
    </dm_list_data>
    
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
        cfForm: {
          col_span: 12, //控制显示一行多列
          watch: {
            //传入监听器
            extend(newName, oldName) {
              console.log("watch-extend变化");

              this.value.articleTitle = this.value.articleTitle + "a";
            }
          }
        },
        pageSize: 2,
        listIndex: "list_article111111", //vuex对应的字段~
        focusMenu: true, //进行菜单聚焦
        twoTitle: "其他数据",
        threeTitle: "文章管理",
        flag: true,
        expand:true,
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
        expands:[
          {
            label: "文章标题",
            prop: "articleTitle",
            width: 260,
            slot:'slot_form_expand_articleTitle'
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
            type: "editorTM"
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
            label: "文章标题11",
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
    afterModify(param, param1) {
      console.log("afterModify");
      console.log("修改后的数据:", param);
      console.log("修改前的数据:", param1);
    },
    setAddInit() {
      this.cfList.formDataAddInit = { a: 1, b: 2, articleTitle: "234" };
    },
    showAdd(){
      this.cfList.formItems = [
        {
            label: "文章标题11",
            prop: "articleTitle",
            width: 200
          }
      ]
    },
    showModify(){
      this.cfList.formItems = [
        {
            label: "文章标题11",
            prop: "articleTitle",
            width: 200
          }
      ]
    },
    showDetail(){
      this.cfList.detailItems = [
        {
            label: "文章标题11",
            prop: "articleTitle",
            width: 200
          }
      ]
    }
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
