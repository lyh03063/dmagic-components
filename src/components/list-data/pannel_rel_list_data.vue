<template>
  <div class="out">
    <dm_pannel_new class title=" " :cf="cf.cfPannel">
      <template #titleBar_boxMiddle>
        <div class="DPIB">
          <span class="MR10 FL">{{title}}</span>
          <div class="DPIB">
            <el-button class="FL MT6" plain size="mini" @click="fnAddEntity">新增</el-button>
            <el-button class="FL MT6" plain size="mini" @click="fnDelete">删除</el-button>
          </div>
        </div>
      </template>
      <!--详情关联数据列表-->
      <dm_rel_list_data :cf="cf" @inited="initedRellist"></dm_rel_list_data>
    </dm_pannel_new>
  </div>
</template>
<script>
export default {
  mixins: [MIX.base,],
  name: "pannel_rel_list_data",//
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
    initedRellist: async function ({ vm }) {
      this.vm_rel_list_data = vm;
    },

    //函数：{删除引用数据弹窗}
    fnDelete: function () {
      let vm_list_data = this.vm_rel_list_data.vm_list_data
      vm_list_data.batchBtnClick("delete", true)
    },

    //函数：{新增实体数据弹窗}
    fnAddEntity: function () {
      let vm_list_data = this.vm_rel_list_data.vm_list_data
      vm_list_data.batchBtnClick("add")
    },

    //函数：{测试函数}
    test: async function () {
      //这个链条还挺长！！！！但却反映了真实的组件结构
      this.vm_detail_g_list.vm_detail_group.vm_detail_group_common.vm_select_list.showDialog()

    },
  },
  async created() {

  },
  mounted() {
    this.$emit("inited", { vm: this }); //将当前对象抛出
  }
};
</script>
<style scoped>
</style>