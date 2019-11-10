<template>
  <div>
    <dm_debug_list>
      <dm_debug_item v-model="test" text="test" />
    </dm_debug_list>

    <dm_dynamic_form :cf="cfForm" v-model="formData">
       <!--自定义集合数据插槽组件-->
      <template v-slot:slot_collection1="{doc}">
        doc:{{doc}}
      </template>
      <!--自定义复选框插槽组件-->
      <template v-slot:slot_form_item_diycheckbox="{formData}">
        <checkbox_diy v-model="formData.diycheckbox" :options="options"></checkbox_diy>
      </template>
    </dm_dynamic_form>
  </div>
</template>

<script>
import checkbox_diy from "../components/form_item/checkbox_diy.vue";
let T;

//函数定义：{获取菜单权限表单配置(标准版)函数}
function getFormMenuGPower({ menuName = "XXX" }) {
  return {
    col_span: 4,
    labelWidth: "10px",
    formItems: [
      {
        label: "",
        prop: "menuName",
        default: menuName,
        col_span: 4,
        type: "text"
      },
      {
        label: "",
        prop: "add",
        col_span: 3,
        type: "checkbox",
        default: false,
        options: [{ value: "1", label: "添加" }]
      },
      {
        label: "",
        prop: "modify",
        col_span: 3,
        type: "checkbox",
        default: false,
        options: [{ value: "1", label: "修改" }]
      },
      {
        label: "",
        prop: "search",
        col_span: 3,
        type: "checkbox",
        default: false,
        options: [{ value: "1", label: "查询" }]
      },
      {
        label: "",
        prop: "delete",
        col_span: 3,
        type: "checkbox",
        default: false,
        options: [{ value: "1", label: "删除" }]
      }
    ]
  };
}

//函数定义：{获取菜单权限表单配置(简单版)函数}
function getFormMenuGPowerSimple({ menuName = "XXX" }) {
  return {
    col_span: 4,
    labelWidth: "10px",
    formItems: [
      {
        label: "",
        prop: "menuName",
        default: menuName,
        col_span: 4,
        type: "text"
      },
      {
        label: "",
        prop: "search",
        col_span: 3,
        type: "checkbox",
        default: false,
        options: [{ value: "1", label: "查看" }]
      }
    ]
  };
}

let styleMenuPowerItem = `margin-bottom:10px;padding:0 5px`;
let styleMenuGPowerItem = `margin-bottom:0;border:none;padding:0`;

let cfListSelectActicle = {
  //选择列表配置
  dataName: "文章",
  valueKey: "P1",
  labelKey: "articleTitle",
  pageName: "tangball_article",
  cfList: {
    pageSize: 10,
    focusMenu: false, //进行菜单聚焦
    isShowBreadcrumb: false, //面包屑
    isShowToolBar: false, //批量操作栏
    isShowOperateColumn: false, //单项操作列
    isRefreshAfterCUD: false, //是否在增删改操作后自动更新列表
    isMultipleSelect: false, //不支持多选
    url: {
      list: "/crossList?page=tangball_article" //列表接口
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
        label: "文章标题aaa",
        prop: "articleTitle",
        width: 260
      },
      {
        label: "分类名称",
        prop: "articleCategory",
        requireProp: ["articleContent"], //依赖文章详情，列表需返回该字段
        width: "auto",
        formatter: function(rowData) {
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
    ]
  }
};

export default {
  name: "form_demo",
  components: { checkbox_diy },
  computed: {
    cfData: function() {
      return this.$store.state.cfData;
    }
  },
  watch: {
    cfData: {
      handler(newName, oldName) {
        var t_json = JSON.stringify(this.cfData); //：{Json对象转换Json字符串函数}
        this.cfForm = util.parseJson(t_json);
      },
      // immediate: true,
      deep: true
    }
  },
  data() {
    return {
      formData: {
        power_paicheng: {
          
        },

        power: {
          matchCenter: {
            list_match: { add: true, delete: true },
            list_achievement: { add: true, delete: true },
            list_enroll: { add: true, delete: true },
            list_rule: { add: true, delete: true },
            list_team: { add: true, delete: true }
          },
          memberCenter: {
            list_member: { add: true, delete: true }
          },
          newsCenter: {
            list_article: { add: true, delete: true },
            list_article_category: {
              add: true,
              delete: true
            },
            list_recommend: { add: true, delete: true },
            list_recommend: { add: true, delete: true }
          },
          venue: {
            list_venue: { add: true, delete: true },
            list_area: { add: true, delete: true }
          }
        },
        memberId: 221,
        // prop_select_list_data: 122,
        num1: "55",
        percent: 0.12,
        select1: null,
        collection2: [
          { time: "2019-09-09", money: 100 },
          { time: "2019-09-11", money: 200 }
        ],
        extend: { aaa: 1, name: "lucy" },
        prop_checkbox: [], //复选框字段的默认数组
        prop1: "abcd",
        prop_dateTime: "2019-7-24 14:09",
        diycheckbox: ["1"],
        prop_upload2: [
          {
            name: "1323.jpg",
            url: "http://pwdost5t7.bkt.clouddn.com/201908271817895151_1323.jpg"
          }
        ]
      },
      cfForm: {
        labelWidth: "150px",

        formItems: [
           {
            label: "集合（带工具栏和插槽）1",
            style: { "margin-top": "50px" }, //自定义样式
            prop: "collection1",
            type: "collection",
            // collectionlistType: "form",
            dataSlot:"slot_collection1",//自定义数据插槽
            cfElBtnAdd:{//自定义“新增”按钮
              text:"+添加一组",
              type:"primary",
              size:"large",plain:false
            },
            collectionCfForm: {
              col_span: 12,
              formItems: [
                {
                  label: "时间",
                  prop: "time",
                  type: "date"
                },
                {
                  label: "金额",
                  prop: "money"
                }
              ]
            }
          },
          {
            label: "集合（无工具栏）",
            prop: "collection2",
            type: "collection",
            collectionlistType: "form",
            showToolbar: false, //不显示集合的工具栏
            collectionCfForm: {
              col_span: 12,
              formItems: [
                {
                  label: "时间",
                  prop: "time",
                  type: "date"
                },
                {
                  label: "金额",
                  prop: "money"
                }
              ]
            }
          },
          {
            label: "数字范围",
            prop111: "prop_numberRange",
            type: "numberRange",
            default: {"maxN":4,"minN":1},
            keyMax:"maxN",
            keyMin:"minN"
           
          },
          {
            label: "普通文本框(input)",
            prop: "prop1",
            type: "input",
            default: "默认文本",
            rules: [
              { required: true, message: "不能为空" },
              {
                pattern: /^[\u4E00-\u9FA5]+$/,
                message: "用户名只能为中文"
              }
            ]
          },
      

          {
            label: "用于模糊查询文本框(input_find_vague)",
            prop: "prop_input_find_vague",
            type: "input_find_vague"
          },

          {
            label: "会员ajax_populate",
            prop: "memberId",
            type: "ajax_populate",
            cfAjaxPopulate: { populateKey: "name", page: "tangball_member" }
          },
          {
            label: "选择列表",
            prop: "prop_select_list_data",
            type: "select_list_data",
            cfSelectList: cfListSelectActicle,
            rules: [{ required: true, message: "能为空" }]
          },
          {
            label: "文本字段",
            prop: "num1",
            type: "text",
            style: { color: "#f00" },
            tips: "跟下方数字相同"
          },
          {
            label: "数字(隐藏操作按钮)",
            prop: "num1",
            type: "number",
            min: 0,
            max: 100,
            hideBtn: true,
            frequency: {
              sytle: { width: "48px" },
              options: [{ value: 1 }, { value: 2 }, { value: 3 }]
            }
          },
          {
            label: "数字22",
            prop: "num2",
            type: "number",
            min: 0,
            max: 3
          },
          
          {
            label: "小组成员",
            prop: "groupMember",
            type: "collection",
            collectionlistType: "form",
            collectionCfForm: {
              col_span: 12,
              formItems: [
                {
                  label: "球队id",
                  prop: "id",
                  type: "select",
                  // default:19,
                  ajax: {
                    url: "/crossList?page=tangball_team",
                    keyLabel: "name",
                    keyValue: "P1"
                  }
                },
                {
                  label: "姓名",
                  prop: "name"
                }
              ]
            }
          },

          {
            label: "下拉框(select+ajax)",
            prop: "prop4",
            type: "select",
            multiple: true, //多选
            ajax: {
              url: "/crossList?page=mabang-member",
              param: { a: 1 },
              keyLabel: "nickName",
              keyValue: "userName"
            }
          },
          {
            label: "设置component",
            prop: "num1",
            type: "text",

            component: "el-input"
          },

          {
            label: "完成情况[被监听]",
            prop: "complete1",
            type: "select",
            notSubmit: true, //不提交
            toObj: true, //提交（查询）时转成对象，值项应该是json字符串
            // multiple:true,//多选

            options: [
              { value: 1, label: "未开始" }, //complete==0
              { value: 2, label: "进行中" }, //complete>0&&complete>1
              { value: 3, label: "已完成" } //complete>0&&complete>1
            ]
          },
          {
            label: "下拉框(多选)",
            prop: "select1",
            type: "select",
            // default: [2],
            multiple: true, //多选
            options: [{ value: 1, label: "男" }, { value: 2, label: "女" }]
          },

          {
            label: "富文本编辑器(TinyMCE)",
            prop: "prop_editorTM",
            type: "editorTM"
          },
          {
            label: "负责人信息",
            label: "拓展",
            prop: "extend",
            default: { diycheckbox: [] },
            cfForm: {
              col_span: 8,
              labelWidth: "150px",
              formItems: [
                {
                  col_span: 24,
                  label: "百分比",
                  prop: "percent",
                  type: "slider"
                },
                {
                  label: "diycheckbox(slot实现)",
                  prop: "diycheckbox",
                  slot: "slot_form_item_diycheckbox",
                  rules: [{ required: true, message: "不能为空" }]
                },
                {
                  col_span: 24,
                  label: "姓名",
                  prop: "name",
                  type: "input"
                },
                {
                  label: "下拉框(select)",
                  prop: "sex",
                  type: "select",
                  default: 2,
                  // multiple:true,//多选
                  options: [
                    { value: 1, label: "男" },
                    { value: 2, label: "女" }
                  ]
                }
              ]
            }
          },
         
          {
            label: "文件上传2",
            prop: "prop_upload2",
            type: "upload",
            uploadConfig: {
              limit: 2,
              listType: "text"
            }
          },
          {
            label: "图片上传",
            prop: "prop_upload",
            type: "upload",
            uploadConfig: {
              limit: 3,
              preview: true
            }
          },

          {
            label: "json编辑器(vueJsonEditor)",
            prop: "prop_vueJsonEditor",
            type: "vueJsonEditor"
          }
        ],
        btns: [
          { text: "提交111", event: "submit", type: "primary", validate: true },
          { text: "取消222", event: "cancel" }
        ]
      },
     
      test: null,
      options: [
        { label: "label1", value: "1" },
        { label: "label2", value: "2" }
      ]
    };
  },
  created() {
    T = this;
  },
  async mounted() {
    this.$store.commit("changeActiveMenu", "form_demo");
    this.$parent.showCFForm = true;
    this.$parent.cfForm.formItems = [
      {
        label: "标签宽度",
        prop: "labelWidth"
      },

      {
        label: "表单字段",
        prop: "formItems",
        type: "collection",
        collectionCfForm: {
          formItems: [
            {
              label: "字段标签",
              prop: "label"
            },
            {
              label: "字段属性",
              prop: "prop"
            },
            {
              label: "字段类型",
              prop: "type",
              type: "radio",
              default: "input",
              options: [
                { value: "input", label: "文本框" },
                {
                  value: "input_find_vague",
                  label: "文本框(用于列表的模糊查询)"
                },
                { value: "textarea", label: "文本域" },
                { value: "select", label: "下拉框" },
                { value: "radio", label: "单选框" },
                { value: "checkbox", label: "复选框" },
                { value: "date", label: "日期选择器" },
                { value: "dateTime", label: "日期时间选择器" },
                { value: "upload", label: "图片/文件上传" },
                { value: "jsonEditor", label: "json编辑器" },
                { value: "vueJsonEditor", label: "json编辑器（加强版）" },
                { value: "editor", label: "富文本编辑器" },
                { value: "time_period", label: "时间段查询框" },
                { value: "password", label: "密码框" },
                { value: "form", label: "子表单" },
                { value: "collection", label: "集合" }
              ]
            },
            {
              term: { type: "upload" },
              label: "上传图片配置",
              prop: "uploadConfig",
              type: "jsonEditor",
              cfForm: {
                col_span: 12,
                formItems: [
                  {
                    label: "限制数量",
                    prop: "limit",
                    type: "input"
                  },
                  {
                    label: "列表类型",
                    prop: "listType",
                    type: "radio",
                    // default: 2,
                    options: [
                      { value: "text", label: "text" },
                      { value: "picture-card", label: "picture-card" }
                    ]
                  },
                  {
                    label: "是否预览",
                    prop: "preview",
                    type: "radio",
                    // default: false,
                    options: [
                      { value: true, label: "是" },
                      { value: false, label: "否" }
                    ]
                  }
                ]
              }
            },
            {
              term: { type: "collection" },
              label: "集合列表类型",
              prop: "collectionlistType",
              type: "radio",
              default: "bar",
              options: [
                { value: "bar", label: "bar" },
                { value: "form", label: "form" }
              ]
            },
            {
              term: { type: "collection" },
              label: "集合表单配置",
              prop: "collectionCfForm",
              type: "form",
              cfForm: {
                formItems: [
                  {
                    label: "col_span",
                    prop: "col_span",
                    type: "input"
                  },
                  {
                    label: "表单字段",
                    prop: "formItems",
                    type: "collection"
                  }
                ]
              }
            },
            {
              term: { type: "form" },
              label: "子表单",
              prop: "cfForm",
              type: "jsonEditor"
            }
          ]
        }
      },
      {
        label: "按钮",
        prop: "btns",
        type: "collection"
      }
    ];

    var strJson = util.stringify(this.cfForm);
    let json1 = JSON.parse(strJson);
    this.$store.commit("setCfData", json1);
  }
};
</script>

<style>
</style>
