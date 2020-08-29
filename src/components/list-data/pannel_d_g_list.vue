<template>
  <div class="out">
    <dm_pannel_new class="MB20" title=" " :cf="cf.cfPannel">
      <template #title_bar_box_middle>
        <div class="DPIB">
          <span class="MR10 FL">{{title}}</span>
          <div class="DPIB" v-if="doc[cf.column]">
            <el-button class="FL MT6" plain size="mini" @click="fnAddEntity">本地上传</el-button>
            <el-button class="FL MT6" plain size="mini" @click="fnSelect">从文件库选择</el-button>
            <el-button class="FL MT6" plain size="mini" @click="dialogFileTemp">从文件模板创建</el-button>
             <el-button class="FL MT6" plain size="mini" @click="fnDelete">移出选中文件</el-button>
          </div>
        </div>
      </template>
      <!--详情关联数据列表-->
      <dm_detail_g_list
        :cf="cf"
        :doc="doc"
        @inited="initedDetailGList"
        @single-btn-click="singleBtnClick"
      ></dm_detail_g_list>
      <!--从文件模板创建文件的操作弹窗-->
      <el-dialog
        custom-class="n-el-dialog"
        width="95%"
        title="从文件模板创建文件"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
        :append-to-body="true"
        v-bind:visible.sync="showDialogFileTemp"
        v-if="showDialogFileTemp"
      >
        <dm_built_file_from_temp class :idFileModify="idFileModify" @after_built="afterBuilt"></dm_built_file_from_temp>
      </el-dialog>
    </dm_pannel_new>
  </div>
</template>
<script>
export default {
  mixins: [MIX.base,],
  name: "pannel_d_g_list",//
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
      idFileModify: null,//修改的生成文件id
      showDialogFileTemp: false,
    };
  },
  methods: {
    //函数：{单条数据操作事件}
    singleBtnClick: async function (actionType, row) {
      if (actionType == "rebuilt") {//如果{000}000
        this.vm_list_data = this.vm_detail_g_list.vm_detail_group.vm_detail_group_common.vm_list_data
        this.idFileModify = row._idRel2//变量赋值：{修改的生成文件id}
        this.showDialogFileTemp = true;
      }
      this.$emit("single-btn-click", actionType, row);
    },
    //函数：{detail_g_list组件加载后的回调函数}
    initedDetailGList: async function ({ vm }) {
      this.vm_detail_g_list = vm;

    },
    //函数：{打开从模板创建文件的弹窗}
    dialogFileTemp: function () {
      this.idFileModify = null//变量赋值：{修改的生成文件id}
      this.showDialogFileTemp = true;
    },
    //函数：{打开从模板创建文件的弹窗}
    afterBuilt: function (data) {
      if (this.idFileModify) {//如果是重新生成
        this.vm_list_data.getDataList()//刷新列表

      } else {//否则
        let { doc } = data
        // alert(`afterBuilt${data.fileNameBuilt}`);
        this.showDialogFileTemp = false;
        let vm_detail_group_common = this.vm_detail_g_list.vm_detail_group.vm_detail_group_common
        //主列表添加函数关系数据
        vm_detail_group_common.ajaxGroupAddData([doc])
      }
      this.showDialogFileTemp = false;

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