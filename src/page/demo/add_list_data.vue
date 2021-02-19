<template>
  <div>
    列表组件抽离弹窗编辑数据，传入数据id，数据类型，定位到对应的列表配置
    <dm_debug_list>
      <dm_debug_item v-model="cfAddDialog2" text="cfAddDialog2" />
    </dm_debug_list>

    <div class>
      <el-button type="primary" @click="add">复制新增数据(自定义各种配置)</el-button>

      <dm_pannel_new class="MB20" title="复制和新增共用同一组配置">
        <dm_space height="10"></dm_space>
        <el-button type="primary" @click="add2">复制新增数据(通用列表-url)</el-button>

        <el-button type="primary" @click="add2_1">新增数据(通用列表-url)</el-button>
      </dm_pannel_new>

      <dm_pannel_new class="MB20" title="其他">
        <dm_space height="10"></dm_space>
        <el-button type="primary" @click="add3">新增数据(通用列表-vedio)</el-button>

        <el-button type="primary" @click="add4">新增数据(通用列表-vedio-不提示)</el-button>
      </dm_pannel_new>
    </div>

    <dm_dialog_add :cf="cfAddDialog">
      <template v-slot:slot_test="{formData}">{{formData.name}}</template>
    </dm_dialog_add>
    <dm_dialog_add :cf="cfAddDialog2"></dm_dialog_add>
    <dm_dialog_add :cf="cfAddDialog3"></dm_dialog_add>
    <dm_dialog_add :cf="cfAddDialog4"></dm_dialog_add>
  </div>
</template>

<script>
export default {
  components: {},
  props: ["aaa"],

  data() {
    return {
      //第1组配置
      cfAddDialog: {
        visible: false,
        cfTips: {
          text: "1,表单的提示语1<br/> 2,表单的提示语2",
          style: {
            "padding-left": "200px"
          }
        },
        urlAdd: "/crossAdd?page=info_piece",
        tableData: null,
        isRefreshAfterAdd: false,
        formDataAddInit: { name: "abc" },
        cfFormAdd: {
          idKey: "P1",
          paramAddonInit: { id: 536 },
          watch: {},
          col_span: 12,
          urlInit: "/crossDetail?page=info_piece",
          formItems: [
            { label: "标题", prop: "name" },
            { label: "说明", prop: "desc", type: "textarea" },
            { label: "带插槽", prop: "test", slot: "slot_test" }
          ],
          btns: [
            { text: "修改", event: "submit", type: "primary", validate: true },
            { text: "关闭", event: "cancel" }
          ]
        }
      },
      //第2组配置
      cfAddDialog2: {
        copyId: "5e78bb5444ba565370025aa5",
        listType: "common", //通用型列表-影响urlAdd
        cfFormAdd: {
          paramAddonInit: { _systemId: "sys_api", _dataType: "url" },
          btns: [
            { text: "新增12", event: "submit", type: "primary", validate: true },
            // { text: "取消", event: "cancel" }
          ]
        }
      },
      //第3组配置
      cfAddDialog3: {

        listType: "common", //通用型列表-影响urlAdd
        cfFormAdd: { paramAddonInit: { _systemId: "sys_api", _dataType: "vedio" } }
      },
      //第4组配置
      cfAddDialog4: {
        tipsAfterAdd: false,
        listType: "common", //通用型列表-影响urlAdd
        cfFormAdd: { paramAddonInit: { _systemId: "sys_api", _dataType: "vedio" } }
      }
    };
  },
  methods: {
    add: function () {
      this.cfAddDialog.visible = true;
    },
    add2: async function () {
      this.cfAddDialog2.copyId = "5e78bb5444ba565370025aa5"
      this.cfAddDialog2.visible = true;
    },
    add2_1: async function () {
      this.cfAddDialog2.copyId = null
      this.cfAddDialog2.visible = true;
    },
    add3: async function () {
      this.cfAddDialog3.visible = true;
    },
    add4: async function () {
      this.cfAddDialog4.visible = true;
    },
    aaaaaa: async function () { },
    aaaaaa: async function () { },
    aaaaaa: async function () { }
  },
  created() { },
  async mounted() { }
};
</script>

<style>
</style>
