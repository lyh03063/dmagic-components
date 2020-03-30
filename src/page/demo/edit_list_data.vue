<template>
  <div>
    列表组件抽离弹窗编辑数据，传入数据id，数据类型，定位到对应的列表配置
    <dm_debug_list>
      <dm_debug_item v-model="cfEditDialog" text="cfEditDialog" />
    </dm_debug_list>

    <div class>
      <el-button type="primary" @click="edit">编辑数据(自定义各种配置)</el-button>
      <el-button type="primary" @click="edit2">编辑数据(通用列表)</el-button>
    </div>

    <dm_dialog_edit :cf="cfEditDialog"></dm_dialog_edit>
    <dm_dialog_edit :cf="cfEditDialog2"></dm_dialog_edit>
  </div>
</template>

<script>
export default {
  components: {},
  props: ["aaa"],

  data() {
    return {
      //第1组配置
      cfEditDialog: {
        visible: false,
        cfTips: {
          text: "1,表单的提示语1<br/> 2,表单的提示语2",
          style: {
            "padding-left": "200px"
          }
        },

        urlModify: "/crossModify?page=info_piece",
        tableData: null,
        isRefreshAfterModify: false,
        dataIdModify: 536,
        cfFormModify: {
          idKey: "P1",
          paramAddonInit: {},
          watch: {},
          col_span: 12,
          urlInit: "/crossDetail?page=info_piece",
          formItems: [
            { label: "标题111", prop: "name" },
            { label: "说明", prop: "desc", type: "textarea" }
          ],
          btns: [
            { text: "修改", event: "submit", type: "primary", validate: true },
            { text: "取消", event: "cancel" }
          ]
        }
      },
      //第2组配置
      cfEditDialog2: {
        listType: "common", //通用型列表-影响urlModify
        cfFormModify: {
          paramAddonInit: {
            _id: "5e78bb5444ba565370025aa5",
            _systemId: "sys_api",
            _dataType: "url"
          }
        }
      }
    };
  },
  methods: {
    edit: function() {
      this.cfEditDialog.visible = true;
    },
    edit2: async function() {
      this.cfEditDialog2.visible = true;
    },
    aaaaaa: async function() {},
    aaaaaa: async function() {},
    aaaaaa: async function() {}
  },
  created() {},
  async mounted() {}
};
</script>

<style>
</style>
