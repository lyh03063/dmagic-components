<template>
  <div>
    <el-button plain @click="dialogCongig" size="mini">列表配置</el-button>
    <!--xxx弹窗-->
    <el-dialog
      custom-class="n-el-dialog"
      width="65%"
      title="列表配置"
      :close-on-press-escape="true"
      :close-on-click-modal="true"
      :append-to-body="true"
      v-bind:visible.sync="showDialog"
     
    >
      <div class>
        <dm_dynamic_form :cf="cfForm" v-model="cfList" @cancel="showDialog=false"></dm_dynamic_form>
      </div>
    </el-dialog>

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
      showDialog: false,

      cfForm: {
        labelWidth: "150px",
        col_span:12,
        formItems: [
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
            label: "动态数据字典",
            prop: "dynamicDict",
            type: "jsonEditor",

          },
         
          {
            label: "接口地址",
            prop: "url",
            type: "jsonEditor",

          },
         
          {
            label: "列配置",
            prop: "columns",
            type: "jsonEditor",

          },
         
          {
            label: "详情弹窗字段",
            prop: "detailItems",
            type: "jsonEditor",

          },
         
          {
            label: "新增、修改表单字段",
            prop: "formItems",
            type: "jsonEditor",

          }
        ],
        btns: [
         
          // { text: "关闭", event: "cancel" }
        ]
      },
      cfList: {
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
            formatter: function(rowData) {
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
            formatter: function(extend) {
              return JSON.stringify(extend.extend);
            }
          }
        ],
        //-------筛选表单字段数组-------
        searchFormItems: [
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
          {
            label: "文章详情",
            prop: "articleContent",
            type: "editor"
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
  methods:{
    dialogCongig(){
      this.showDialog=true;
    }
  }
};
</script>

<style>
</style>
