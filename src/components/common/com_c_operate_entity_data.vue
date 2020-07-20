<template>
  <div>
    <el-popover
      placement="left"
      width="180"
      trigger="hover"
      v-model="visible"
      v-if="$power('groupDataList.all.modify')"
    >
      <!--候选值列表-->
      <div class="TAR">
        <!-- <el-button icon="el-icon-edit" circle @click="emit('modify')" size="mini"></el-button> -->

        <el-button
          title="置顶"
          class="sort-top-bottom"
          icon="el-icon-top"
          circle
          @click="emit('top')"
          size="mini"
        ></el-button>
        <el-button title="上移" icon="el-icon-top" circle @click="emit('up')" size="mini"></el-button>
        <el-button title="下移" icon="el-icon-bottom" circle @click="emit('down')" size="mini"></el-button>
        <el-button
          title="置底"
          class="sort-top-bottom"
          icon="el-icon-bottom"
          circle
          @click="emit('bottom')"
          size="mini"
        ></el-button>
      </div>

      <span class="DP3 W50 H22 TAC LH22" slot="reference">
        排序
        <i class="el-icon-caret-bottom"></i>
      </span>
    </el-popover>

    <el-button icon="el-icon-notebook-2 " circle @click="emit('detail')" size="mini"></el-button>
    <a class="ML8 MR8" target="_blank" :href="`#/detail_data?dataId=${doc._idRel2}`">
      <el-button size="mini">新窗口</el-button>
    </a>

    <el-popover class placement="right" width="auto" trigger="hover">
      <div class v-if="$power('groupDataList.all.modify')">
        <el-button icon="el-icon-edit" circle @click="emit('edit_entity')" size="mini"></el-button>

        <el-button icon="el-icon-document-copy" circle @click="emit('copy_entity')" size="mini"></el-button>
        <el-button title="取消关联" icon="el-icon-delete" circle @click="emit('delete')" size="mini"></el-button>
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
  name: "com_c_operate_entity_data",
  props: ["doc"],
  data() {
    return {
      visible: false,
    };
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
