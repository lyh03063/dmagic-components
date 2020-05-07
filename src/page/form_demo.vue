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

F_ITEMS.checkbox1 = {
  label: "复选框",
  prop: "checkbox1",
  default: false,
  type: "checkbox",
  options: DYDICT.arr_importance
}

//#region 简历-工作经历
{
  let _dataType = "resume_work_experience";
  let listCFAddon = {
    breadcrumb: [{ value: "首页", path: "listHome" }, { value: "简历-工作经历" }],
    ...PUB.listCFCommon2,//展开公共配置
    detailItems: ["companyName", "positionName", "onJobPeriod", "descJob"],
    columns: ["companyName", "positionName", "onJobPeriod", "descJob"],
    searchFormItems: ["companyName"],
    formItems: ["companyName", "positionName", "onJobPeriod", "descJob"],
  }
  util.handleCommonListCF({ _dataType, listCFAddon })//调用：{处理通用列表配置数据函数}
}
//#endregion

//#region 字段-我的工作经历
{
  let prop = "relWorkExperience", objBase = { label: "我的工作经历", prop, }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = { ...objBase, width: 70, };
  F_ITEMS[prop] = { ...objBase, type: "input" };
  F_ITEMS[prop] = {
    ...objBase, type: "select_list_data",
    cfSelectList: {//选择列表配置
      dataName: "工作经历", valueKey: "_id", labelKey: "companyName", multiple: true, //多选
      selectJson: { _id: 1, companyName: 1, }, //需要保留的集合字段
      cfList: util.deepCopy(PUB.listCF.list_resume_work_experience),
       //编辑实体数据弹窗配置
      cfEditDialogEntity1111: {
        listType: "common", //通用型列表-影响urlModify
        cfFormModify: {
          paramAddonInit: {
            _id: "xxx",
            _systemId: "$all",
            _dataType: "url"
          }
        }
      }
    }
  };
}
//#endregion


export default {
  name: "form_demo",
  components: { checkbox_diy },

  data() {
    return {
      formData1: { obj: { num: 123 } },
      formData: {
        relWorkExperience:[{"_id":"5e9523985d347653d40cd985","companyName":"深圳软通动力1"},{"_id":"5eb3ab6c1178991cb84c4a4f","companyName":"公司333"}],
        uploadAvatar: "http://qn-dmagic.dmagic.cn/202004141713623737_3796_1.png",
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
          F_ITEMS.relWorkExperience,
          F_ITEMS.treeData1,//树
          F_ITEMS.object_1,
          F_ITEMS.checkbox1,

          // F_ITEMS.addressObj,
          // F_ITEMS.prop_upload,
          // F_ITEMS.treeDataMenu,//树

          // F_ITEMS.upload_single1,//单文件上传
          // F_ITEMS.uploadAvatar,//单文件上传
          // F_ITEMS.prop_time_period1,//日范围
          // F_ITEMS.prop_time_period2,//月范围
          // F_ITEMS.prop_time_period3,//年范围
          // F_ITEMS.prop_upload,
          // F_ITEMS.personCharge,
          // F_ITEMS.prop_editorTMNew,
          F_ITEMS.prop_editorTM,

          // F_ITEMS.projectName_select_lazy,
          // F_ITEMS.predictTime,
          // F_ITEMS.complete,
          // F_ITEMS.title,
          // F_ITEMS.select_list_common_url,

          // F_ITEMS.prop_select_list_data,
          // F_ITEMS.diycheckbox,
          // F_ITEMS.num2,
          // F_ITEMS.num1,

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
  computed: {

    cfData: function () {//配置数据
      return this.$store.state.cfData;
    }
  },
  watch: {
    cfData: {//配置数据
      handler(newVal, oldVal) {
        console.log(`cfData##############变动`);
        console.log(`this.cfData:`, this.cfData);
        var t_json = JSON.stringify(this.cfData); //：{Json对象转换Json字符串函数}
        console.log(`t_json:`, t_json);
        this.cfForm = util.parseJson(t_json);
      },
      // immediate: true,
      deep: true
    }
  },
  created() {
    T = this;
    PUB._paramAjaxAddon = {
      _systemId: "$all"
    }
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
              col_span: 12,
              label: "字段标签",
              prop: "label"
            },
            {
              col_span: 12,
              label: "字段属性",
              prop: "prop"
            },
            {
              label: "字段类型",
              prop: "type",
              type: "radio",
              default: "input",
              options: DYDICT.arr_type,
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
    this.$store.commit("setCfData", json1);//同步配置界面的配置信息
  }
};
</script>

<style>
</style>
