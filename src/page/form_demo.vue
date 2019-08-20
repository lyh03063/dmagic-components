<template>
  <div >
    <dm_dynamic_form :cf="cfForm" v-model="formData">
      <!--自定义复选框插槽组件-->
      <template v-slot:slot_form_item_diycheckbox="{formData}">
        <checkbox_diy v-model="formData.diycheckbox" :options="options"></checkbox_diy>
      </template>
    </dm_dynamic_form>

  
  </div>
</template>

<script>

import dm_dynamic_form from "../components/list-data/dynamic-form.vue";
import checkbox_diy from "../components/form_item/checkbox_diy.vue";
export default {
  components: { dm_dynamic_form, checkbox_diy},

  data() {
    return {
      options: [
        { label: "label1", value: "1" },
        { label: "label2", value: "2" }
      ],
      formData: {
        extend: { aaa: 1, name: "lucy" },
        prop_checkbox: [], //复选框字段的默认数组
        prop1: "abcd",
        prop_dateTime: "2019-7-24 14:09",
        diycheckbox: [1]
      },
      cfForm: {
        labelWidth: "150px",
        formItems: [
          //   {
          //   label: "extend",
          //   prop: "extend",
          //   type: "jsonEditor",

          // },
          {
            label: "联系人信息",
            prop: "extend",
            default: {},
            cfForm: {
              formItems: [
                {
                  label: "姓名",
                  prop: "name",
                  type: "input"
                },
                {
                  label: "下拉框(select)",
                  prop: "sex",
                  type: "select",
                  default: 2,
                  options: [
                    { value: 1, label: "男" },
                    { value: 2, label: "女" }
                  ]
                },
                {
                  label: "联系人信息2",
                  prop: "extend1",
                  default: {},

                  cfForm: {
                    col_span: 12,
                    formItems: [
                      {
                        label: "姓名",
                        prop: "name",
                        type: "input",
                        col_span: 12
                      },
                      {
                        label: "下拉框(select)",
                        prop: "sex",
                        type: "select",
                        default: 2,
                        options: [
                          { value: 1, label: "男" },
                          { value: 2, label: "女" }
                        ],
                        col_span: 12
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            label: "负责人信息",
            // prop: "extend",
            cfForm: {
              formItems: [
                {
                  label: "姓名",
                  prop: "name",
                  type: "input"
                },
                {
                  label: "下拉框(select)",
                  prop: "sex",
                  type: "select",
                  default: 2,
                  options: [
                    { value: 1, label: "男" },
                    { value: 2, label: "女" }
                  ]
                }
              ]
            }
          },
          {
            label: "纬度",
            prop: "extend",
            path: "latitude"
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
            label: "密码框2(password)",
            prop: "prop_password",
            type: "password"
          },
          {
            label: "用于模糊查询文本框(input_find_vague)",
            prop: "prop_input_find_vague",
            type: "input_find_vague"
          },
          {
            label: "文本域(textarea)",
            prop: "prop_textarea",
            type: "textarea"
          },
          {
            label: "下拉框(select)",
            prop: "sex",
            type: "select",
            default: 2,
            options: [{ value: 1, label: "男" }, { value: 2, label: "女" }]
          },
          {
            label: "sex【联动】",
            prop: "sex_relative",
            type: "input",
            //显示条件
            term: { $or: [{ sex: 2 }, { prop_textarea: 2 }] }
          },
          {
            label: "下拉框(select+ajax)",
            prop: "prop4",
            type: "select",
            ajax: {
              url: "/crossList?page=mabang-member",
              param: { a: 1 },
              keyLabel: "nickName",
              keyValue: "userName"
            }
          },

          {
            label: "单选框(radio)",
            prop: "prop_radio",
            type: "radio",
            default: 2,
            options: [{ value: 1, label: "男" }, { value: 2, label: "女" }]
          },
          {
            label: "复选框(checkbox)",
            prop: "prop_checkbox",
            type: "checkbox",
            default: [2],
            options: [{ value: 1, label: "男" }, { value: 2, label: "女" }]
          },
          {
            label: "日期时间(dateTime)",
            prop: "prop_dateTime",
            type: "dateTime"
          },
          {
            label: "日期选择器(date)",
            prop: "prop_date",
            type: "date"
          },
          {
            label: "图片上传",
            prop: "prop_upload",
            type: "upload",
            uploadConfig: {
              limit: 3,
              preview:true,
              // listType: "text",
             
            }
          },
          {
            label: "图片上传2",
            prop: "prop_upload2",
            type: "upload",
            uploadConfig: {
              limit: 1,
              listType: "text",
             
            }
          },
          {
            label: "json编辑器(jsonEditor)",
            prop: "prop_jsonEditor",
            type: "jsonEditor"
          },
          {
            label: "json编辑器(vueJsonEditor)",
            prop: "prop_vueJsonEditor",
            type: "vueJsonEditor"
          },
          {
            label: "富文本编辑器(editor)",
            prop: "prop_editor",
            type: "editor"
          },
          {
            label: "自定义组件(slot实现)",
            prop: "description",
            slot: "slot_form_item_description",
            rules: [{ required: true, message: "不能为空" }]
          },
          {
            label: "diycheckbox(slot实现)",
            prop: "diycheckbox",
            slot: "slot_form_item_diycheckbox",
            rules: [{ required: true, message: "不能为空" }]
          }
        ],
        btns: [
          { text: "提交111", event: "submit", type: "primary", validate: true },
          { text: "取消222", event: "cancel" }
        ]
      }
    };
  }
};
</script>

<style>
</style>
