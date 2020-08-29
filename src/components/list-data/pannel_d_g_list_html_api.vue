<template>
  <div class="out">
    <dm_debug_list>
      <dm_debug_item v-model="cf" />
    </dm_debug_list>

    <dm_pannel_new class="MB20" title=" " :cf="cf.cfPannel">
      <template #title_bar_box_middle>
        <div class="DPIB">
          <span class="MR10 FL">{{title}}</span>
          <div class="DPIB" v-if="doc[cf.column]">
            <el-button class="FL MT6" plain size="mini" @click="fnAddEntity">新增并引用</el-button>
            <el-button class="FL MT6" plain size="mini" @click="fnSelect">选择并引用</el-button>
            <el-button class="FL MT6" plain size="mini" @click="fnDelete">取消引用</el-button>
          </div>
        </div>
      </template>
      <!--详情关联数据列表-->
      <dm_detail_g_list
        :cf="cf"
        :doc="doc"
        @inited="initedDetailGList"
      ></dm_detail_g_list>
    </dm_pannel_new>
  </div>
</template>
<script>
export default {
  mixins: [MIX.base,],
  name: "pannel_d_g_list_html_api",//
  props: {
    title: {},
    doc: {},
    cf: {
      default: function () {
        return {};
      }
    }
  },
  data() {
    return {
    };
  },
  methods: {

    //函数：{detail_g_list组件加载后的回调函数}
    initedDetailGList: async function ({ vm }) {
      this.vm_detail_g_list = vm;

    },
    //函数：{打开选择数据弹窗}
    fnSelect: function () {
      this.vm_detail_g_list.vm_detail_group.vm_detail_group_common.vm_select_list.showDialog()
    },
    //函数：{删除引用数据弹窗}
    fnDelete: function () {
      let vm_list_data = this.vm_detail_g_list.vm_detail_group.vm_detail_group_common.vm_list_data
      vm_list_data.batchBtnClick("delete", true)
    },
    //函数：{新增实体数据弹窗}
    fnAddEntity: function () {
      let vm_detail_group_common = this.vm_detail_g_list.vm_detail_group.vm_detail_group_common
      vm_detail_group_common.bacthEvent("add_entity")
    },
    //函数：{测试函数}
    test: async function () {
      //这个链条还挺长！！！！但却反映了真实的组件结构
      this.vm_detail_g_list.vm_detail_group.vm_detail_group_common.vm_select_list.showDialog()
    },
  },
  async created() {
    let cfAAA = lodash.get(this.cf, `cfAAA`, {});
    let cfAAADefault = {}
    util.setObjDefault(cfAAA, cfAAADefault);
    util.setObjDefault(this.cf, {
      cfAAA
    });
  },
  mounted() {
    this.$emit("inited", { vm: this }); //将当前对象抛出
  }
};
</script>
<style scoped>
</style>