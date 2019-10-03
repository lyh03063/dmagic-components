<template>
  <div>
    <dm_debug_list>
      <dm_debug_item v-model="test" text="test" />
    </dm_debug_list>

    <dm_dynamic_form :cf="cfForm" v-model="formData">
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
      dictEnroolTeam: {
        "16": {
          _id: "5d8dd92899aefd5e14b3ece8",
          P1: 16,
          createMemberId: 57,
          matchId: 86,
          member: [
            { phone: "1341502", sex: 1, name: "lfhh" },
            { phone: "13415028975", sex: 1, name: "lxc" }
          ],
          CreateUser: "匿名",
          name: "唐球",
          orderId: "20190927174056365"
        },
        "18": {
          _id: "5d8f0c783eaaa91a1dbea4b7",
          P1: 18,
          matchId: 86,
          name: "aa",
          member: [{ name: "sss", sex: 1, phone: "13415028976" }],
          orderId: "EO1569655913515",
          CreateUser: "匿名"
        },
        "19": {
          _id: "5d8f631b3eaaa91a1dbea4c6",
          P1: 19,
          name: "西游队",
          createMemberId: 91,
          matchId: 86,
          member: [
            { _exit: true, name: "孙悟空", sex: "1", phone: "13100000001" },
            { _exit: true, name: "猪八戒", phone: "13100000004", sex: "1" },
            { _exit: true, name: "唐僧", phone: "13100000003", sex: "1" },
            { _exit: true, name: "白骨精", sex: "2", phone: "13100000002" }
          ],
          CreateUser: "匿名",
          orderId: "t2"
        },
        "20": {
          _id: "5d8f652e3eaaa91a1dbea4c9",
          P1: 20,
          name: "海贼队",
          createMemberId: 92,
          matchId: 86,
          member: [
            { phone: "13100001004", sex: "1", name: "乌索普", _exit: true },
            { phone: "13100001003", sex: "2", name: "娜美", _exit: true },
            { phone: "13100001002", sex: "2", name: "乔巴", _exit: true },
            { phone: "13100001001", sex: "1", name: "路飞", _exit: true }
          ],
          CreateUser: "匿名",
          orderId: "t1"
        },
        "23": {
          _id: "5d91b42030d3ca2327ff8358",
          P1: 23,
          matchId: 86,
          name: "1311",
          member: [
            { phone: "", sex: 1, name: "222" },
            { phone: "", sex: 1, name: "11111" }
          ],
          orderId: "EO1569829896020",
          CreateUser: "匿名"
        }
      },
      test: null,
      options: [
        { label: "label1", value: "1" },
        { label: "label2", value: "2" }
      ],
      formData: {
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
        watch: {
          //传入监听器
          complete1(newVal, oldVal) {
            console.log("complete1111变动");
            this.value.complete = 123;
            let influence = {
              1: { $ne: 0 },
              2: { $gt: 0, $lt: 1 },
              3: { $ne: 1 }
            };

            console.log("T:", T);
            let item_prop4 = T.cfForm.formItems.find(
              item => item.prop == "prop4"
            );
            console.log("item_prop4:", item_prop4);
            item_prop4.ajax.param.a += 1;
          },
          teamId(newVal, oldVal) {
            console.log("teamId变动####");
            //***修改participantsId下拉框字段的ajax配置
            let itemParticipantsId = T.cfForm.formItems.find(
              item => item.prop == "participantsId"
            );

            let { member } = T.dictEnroolTeam[newVal];

            let arrPhone = member.map(doc => doc.phone);
            console.log("arrPhone:", arrPhone);
            // delete itemParticipantsId.ajax;
            // itemParticipantsId.options = [];

            itemParticipantsId.ajax.param = {
              findJson: { phone: { $in: arrPhone } }
            };
          }
        },
        formItems: [
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
                },{
                  label: "姓名",
                  prop: "name",
                  
                }
              ]
            }
          },
          {
            label: "所属球队",
            prop: "teamId",
            type: "select",
            ajax: {
              param: { aaa: 123 },
              url: "/crossList?page=tangball_team",
              keyLabel: "name",
              keyValue: "P1"
            }
          },
          {
            label: "参赛人Id",
            prop: "participantsId",
            type: "select",
            ajax: {
              url: "/crossList?page=tangball_member",
              keyLabel: "name",
              keyValue: "P1",
              param: { aaa: 111 }
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
            label: "数字",
            prop: "num1",
            type: "number"
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
            label: "集合（带工具栏）1",
            style: { "margin-top": "50px" }, //自定义样式
            prop: "collection1",
            type: "collection",
            collectionlistType: "form",
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
            label: "图片上传2",
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
          // //   {
          // //   label: "extend",
          // //   prop: "extend",
          // //   type: "jsonEditor",

          // // },
          // {
          //   label: "联系人信息",
          //   prop: "extend",
          //   default: {},
          //   cfForm: {
          //     formItems: [
          //       {
          //         label: "姓名",
          //         prop: "name",
          //         type: "input"
          //       },
          //       {
          //         label: "下拉框(select)",
          //         prop: "sex",
          //         type: "select",
          //         default: 2,
          //         options: [
          //           { value: 1, label: "男" },
          //           { value: 2, label: "女" }
          //         ]
          //       },
          //       {
          //         label: "联系人信息2",
          //         prop: "extend1",
          //         default: {},

          //         cfForm: {
          //           col_span: 12,
          //           formItems: [
          //             {
          //               label: "姓名",
          //               prop: "name",
          //               type: "input",
          //               col_span: 12
          //             },
          //             {
          //               label: "下拉框(select)",
          //               prop: "sex",
          //               type: "select",
          //               default: 2,
          //               options: [
          //                 { value: 1, label: "男" },
          //                 { value: 2, label: "女" }
          //               ],
          //               col_span: 12
          //             }
          //           ]
          //         }
          //       }
          //     ]
          //   }
          // },

          // {
          //   label: "纬度",
          //   prop: "extend",
          //   path: "latitude"
          // },
          // {
          //   label: "普通文本框(input)",
          //   prop: "prop1",
          //   type: "input",
          //   default: "默认文本",
          //   rules: [
          //     { required: true, message: "不能为空" },

          //     {
          //       pattern: /^[\u4E00-\u9FA5]+$/,
          //       message: "用户名只能为中文"
          //     }
          //   ]
          // },
          // {
          //   label: "密码框2(password)",
          //   prop: "prop_password",
          //   type: "password"
          // },
          // {
          //   label: "用于模糊查询文本框(input_find_vague)",
          //   prop: "prop_input_find_vague",
          //   type: "input_find_vague"
          // },
          // {
          //   label: "文本域(textarea)",
          //   prop: "prop_textarea",
          //   type: "textarea"
          // },
          // {
          //   label: "下拉框(select)",
          //   prop: "sex",
          //   type: "select",
          //   default: 2,
          //   options: [{ value: 1, label: "男" }, { value: 2, label: "女" }]
          // },
          // {
          //   label: "sex【联动】",
          //   prop: "sex_relative",
          //   type: "input",
          //   //显示条件
          //   term: { $or: [{ sex: 2 }, { prop_textarea: 2 }] }
          // },

          // {
          //   label: "单选框(radio)",
          //   prop: "prop_radio",
          //   type: "radio",
          //   default: 2,
          //   options: [{ value: 1, label: "男" }, { value: 2, label: "女" }]
          // },
          // {
          //   label: "复选框(checkbox)",
          //   prop: "prop_checkbox",
          //   type: "checkbox",
          //   default: [2],
          //   options: [{ value: 1, label: "男" }, { value: 2, label: "女" }]
          // },
          // {
          //   label: "日期时间(dateTime)",
          //   prop: "prop_dateTime",
          //   type: "dateTime"
          // },
          // {
          //   label: "日期选择器(date)",
          //   prop: "prop_date",
          //   type: "date"
          // },

          // {
          //   label: "json编辑器(jsonEditor)",
          //   prop: "prop_jsonEditor",
          //   type: "jsonEditor"
          // },
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
      }
    };
  },
  created() {
    T = this;
  },
  async mounted() {
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
