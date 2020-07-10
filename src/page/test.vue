<template>
  <div>
    <dm_test class :obj="objTest"></dm_test>

    <dm_select_ajax_lazy class :cf="cfSelectAjaxLazy"></dm_select_ajax_lazy>######
    <dm_ajax_populate :id="2" populateKey="name" page="tangball_franchisee"></dm_ajax_populate>

    <dm_codemirror v-model="code" :options="cmOptions" ref="myCm"></dm_codemirror>
    {{selectData}}
    <el-button plain @click="formatCode" size="mini" class="MT10">格式化(不成功)</el-button>

    <el-button plain @click="isShowDialog=true" size="mini">选择数据</el-button>

    <!--选择数据弹窗-->
    <el-dialog
      custom-class="n-el-dialog"
      width="95%"
      title="选择数据"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :append-to-body="true"
      v-bind:visible.sync="isShowDialog"
      v-if="isShowDialog"
    >
      <div class>
        <dm_list_data :cf="cfList" ref="listSelectData">
          <template v-slot:slot_form_expand_articleTitle="{row}">
            {{row}}
            <el-link type="primary" @click="fold(row)">收起</el-link>
          </template>
        </dm_list_data>
        <div class="TAC PT10 PB10">
          <el-button type="primary" @click="confirmSelect">确认选择</el-button>
          <el-button plain @click="isShowDialog=false">关闭</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>



export default {
  components: { },

  data() {
    return {
      objTest: { name: "张三", age: 17, sex: "男", family: { father: { name: "张三丰" } } },
      cfSelectAjaxLazy: {
        url: "/crossList?page=paicheng_project",
        keyLabel: "projectName",
        keyValue: "P1"
      },

      cmOptions: {
        // codemirror options
        tabSize: 4,
        mode: "text/javascript",
        theme: "lucario",
        styleActiveLine: true, //当前行高亮
        lineNumbers: true,
        lineWrapping: true, //代码折叠
        matchBrackets: true,
        // line: true,
        // autoCloseBrackets: true,
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
        // more codemirror options, 更多 codemirror 的高级配置...
      },
      code: `
        var name="张三";
        function fun0000(_json) {//函数定义：{000函数}
            _json = _json|| {}; //变量定义：{传参json}
            var aaa = _json.aaa; //变量定义：{000}
        }
        // 自定义列组件
    Vue.component('swipe-img', {
        props: {
            index: {
                type: Number
            }
        },
        data() {
            return {
                test:99,
            };
        },
        methods: {
            handle(method) { //函数：{处理单条数据函数}
            }
        },
        created() {
            alert("2222");
        }
    })
    new Vue({ el: '#app' })
         
      
      `,

      selectData: [],

      isShowDialog: false, //是否显示弹窗
      cfList: {
        pageSize: 10,
        listIndex: "list_demo", //vuex对应的字段~
        focusMenu: true, //进行菜单聚焦
        twoTitle: "其他数据", //面包屑1级菜单
        threeTitle: "文章管理", //面包屑2级菜单
        isShowBreadcrumb: false, //面包屑
        isShowToolBar: false, //批量操作栏
        isShowOperateColumn: false, //单项操作列
        isRefreshAfterCUD: false, //是否在增删改操作后自动更新列表
        isMultipleSelect: false, //不支持多选

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
            articleCategory(newVal, oldVal) {
              this.value.articleTitle = { a: 1 };
            }
          }
        },

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
            formatter11111: function (rowData) {
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
            width: "auto",
            formatter11111: function (rowData) {
              let name = lodash.get(rowData, "categoryDoc.name");
              return name;
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
            options: [
              { value: 1, label: "男" },
              { value: 2, label: "女" }
            ]
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
        ]
      }
    };
  },
  computed: {
    cm() {
      return this.$refs.myCm.codemirror;
    }
  },
  methods: {

    formatCode() {
      let T = this;
      //T.cm.setValue("aaaaa")编辑器设置代码
      // this.cm.commands["selectAll"]();
      function getSelectedRange() {
        return { from: T.cm.getCursor(true), to: T.cm.getCursor(false) };
      }

      let code = T.cm.getValue();

      T.cm.setValue(code + "aaaa");

      // var range = getSelectedRange();
      // T.cm.autoFormatRange(range.from, range.to);
    },
    //函数：{确认选择数据函数}
    confirmSelect() {
      //获取选中的数据，此处可优化，使用selection-change事件
      let selection = this.$refs.listSelectData.$refs.table.selection;
      if (!selection.length) return this.$message.error("未选择任何数据");
      this.selectData = util.deepCopy(selection);
      this.isShowDialog = false;
    }
  },
  created() { },
  async mounted() { }
};
</script>

<style>
.CodeMirror {
  font-size: 16px;
  font-family: Arial;
}
</style>
