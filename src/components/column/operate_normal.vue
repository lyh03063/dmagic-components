<template>
  <div>
    <!--修改实体，取消关联，复制-->
    <el-popover class placement="right" width="auto" trigger="hover">
      <div class>
        <el-button icon="el-icon-notebook-2" circle @click="emit('detail')" size="mini"></el-button>
        <el-button icon="el-icon-edit" circle @click="emit('modify')" size="mini"></el-button>
        <el-button icon="el-icon-document-copy" circle @click="emit('copy')" size="mini"></el-button>
        <el-button title="删除" icon="el-icon-delete" @click="emit('delete')" circle size="mini"></el-button>
      </div>
      <span class="DP3 W50 H22 TAC LH22" slot="reference">
        操作
        <i class="el-icon-caret-bottom"></i>
      </span>
    </el-popover>
  </div>
</template>

<script>
export default {
  mixins: [MIX.base],
  name: "dm_c_operate_normal",//分组文件列表的操作列
  props: ["doc"],
  data() {
    return {};
  },
  methods: {
    emit: async function (evType) {
      this.vm_list = this.$closest({ vmT: this, name: "dm_list_data" })
      this.vm_list.$emit("single-btn-click", evType, this.doc);
      this.visible = false;
    },


  },
  created() {



  }
};
</script>
