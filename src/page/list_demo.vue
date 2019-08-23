<template>
  <div>
    <!-- <collection v-model="arr1"></collection> -->
    <dm_list_data :cf="cfList"></dm_list_data>
  </div>
</template>

<script>
import dm_list_data from "../components/list-data/list-data.vue";
import dm_dynamic_form from "../components/list-data/dynamic-form.vue";
import collection from "../components/form_item/collection.vue";
export default {
  components: { dm_list_data, dm_dynamic_form, collection },

  data() {
    return {
      arr1: [
        {
          label: "文章分类",
          prop: "articleCategory",
          type: "select",
         
        },
        {
          label: "文章标题",
          prop: "articleTitle",
          type: "input_find_vague"
        }
      ],
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

  computed: {
    cfData: function() {
      return this.$store.state.cfData;
    }
  },
  watch: {
    cfData: {
      handler(newName, oldName) {
        var t_json = JSON.stringify(this.cfData); //：{Json对象转换Json字符串函数}

        //将带function字符串的还原成真正发function
        // let json = JSON.parse(t_json, function(k, v) {
        //   if (v.indexOf && v.indexOf("function") > -1) {
        //     return eval("(function(){return " + v + " })()");
        //   }
        //   return v;
        // });

        this.cfList = util.parseJson(t_json);
      },
      // immediate: true,
      deep: true
    }
  },

  methods: {},
  async mounted() {
    this.$parent.showCFForm = true;

    //来自vuex的当前行数据
    // this.$store.state.listState[this.cf.listIndex].row;

    // var strJson = JSON.stringify(this.cfList, function(key, val) {
    //   if (typeof val === "function") {
    //     return val + ""; //将函数代码转换成字符串
    //   }
    //   return val;
    // });
    var strJson = util.stringify(this.cfList);

    let json1 = JSON.parse(strJson);

    this.$store.commit("setCfData", json1);
  }
};
</script>

<style>
</style>
