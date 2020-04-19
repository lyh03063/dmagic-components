<template>
  <div>
    <dm_debug_list>
      <dm_debug_item v-model="formData" text="formData" />
    </dm_debug_list>

    <!-- <el-input v-model="formData1['obj.num2']"></el-input> -->

    <dm_dynamic_form :cf="cfForm" v-model="formData">
      <!--自定义集合数据插槽组件-->
      <template v-slot:slot_collection1="{doc}">doc:{{doc}}</template>
      <!--自定义复选框插槽组件-->
      <template v-slot:slot_form_item_diycheckbox="{formData}">
        123
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


export default {
  name: "form_demo",
  components: { checkbox_diy },

  data() {
    return {
      formData1: { obj: { num: 123 } },
      formData: {
        uploadAvatar:"http://qn-dmagic.dmagic.cn/202004141713623737_3796_1.png",
        prop_time_period2: { "start": "2020-04-01 00:00:01", "end": "2021-01-01 23:59:59" },
        prop_time_period3: "2020-04-01 00:00:01",
        // tagList:["2222","3333"],
        aaaa: 123,
        power_paicheng: {},
        prop_editor_new: `<div class="" >456</div>`,
        prop_editorTM: `<div class="" >123</div>`,
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
        num1: 0,
        percent: 0.12,
        select1: null,
        collection2: [
          { time: "2019-09-09", money: 0 },
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
          F_ITEMS.treeDataMenu,//单文件上传
          F_ITEMS.treeData1,//单文件上传
          F_ITEMS.upload_single1,//单文件上传
          F_ITEMS.uploadAvatar,//单文件上传
          F_ITEMS.prop_time_period1,//日范围
          F_ITEMS.prop_time_period2,//月范围
          F_ITEMS.prop_time_period3,//年范围
          // F_ITEMS.prop_upload,
          // F_ITEMS.personCharge,
          // F_ITEMS.prop_editorTMNew,
          // F_ITEMS.prop_editorTM,

          // F_ITEMS.projectName_select_lazy,
          // F_ITEMS.predictTime,
          // F_ITEMS.complete,
          // F_ITEMS.title,
          // F_ITEMS.select_list_common_url,

          // F_ITEMS.prop_select_list_data,
          // F_ITEMS.diycheckbox,
          // F_ITEMS.num2,
          // F_ITEMS.num1,
          // F_ITEMS.collection1,
          // F_ITEMS.collection2,
          // F_ITEMS.prop_numberRange,
          // F_ITEMS.prop1,
          // F_ITEMS.prop_input_find_vague,
          // F_ITEMS.memberId,

          // F_ITEMS.num1_text,
          // F_ITEMS.groupMember,
          // F_ITEMS.prop4,
          // F_ITEMS.num1_component,
          // F_ITEMS.complete1,
          // F_ITEMS.select1,

          // F_ITEMS.extend,
          // F_ITEMS.prop_upload2,
          // F_ITEMS.prop_upload,
          // F_ITEMS.prop_vueJsonEditor
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
