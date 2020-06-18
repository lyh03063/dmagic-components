<template>
  <div class="out">
    <dm_list_data class="MT20" :cf="cf.cfList" @inited="initedList"></dm_list_data>
  </div>
</template>
<script>
export default {
  mixins: [MIX.base,],
  name: "rel_list_data",//
  props: {
    cf: {
      default: function () {
        return {};
      }
    }
  },
  data() {
    let cfList = lodash.cloneDeep(PUB.listCF.list_seal_use_record);
    return { cfList };
  },
  methods: {
    //函数：{detail_g_list组件加载后的回调函数}
    initedList: async function ({ vm }) {
      this.vm_list_data = vm;
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
/* 饿了么表格出现遮挡的问题解决的补丁样式 */
.out >>> .el-table__fixed,.out >>> .el-table__fixed-right {
  height: 1100px !important;
}


</style>