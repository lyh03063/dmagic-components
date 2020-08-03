<template>
  <div>
    <el-popover
      placement="left"
      width="190"
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
    <!-- {{groupDoc}} -->
    <!-- Q1:如果存在dataType是group-->
    <a
      class="MR8"
      target="_blank"
      :href="`#/detail_group?groupId=${doc._idRel2}`"
      v-if="groupDoc.dataType=='group'"
    >
      <el-button size="mini">查看分组</el-button>
    </a>
    <!--Q2: 如果不存在dataType是link或front_demo-->
    <template v-else-if="groupDoc.dataType=='front_demo'||groupDoc.dataType=='url'">
      <a class="ML8 MR8" target="_blank" :href="linkDemo(doc)">
        <el-button size="mini">打开链接</el-button>
      </a>
    </template>
    <!-- Q3:其他情况-->
    <template v-else>
      <el-button icon="el-icon-notebook-2 " circle @click="emit('detail')" size="mini"></el-button>
      <a class="ML8 MR8" target="_blank" :href="`#/detail_data?dataId=${doc._idRel2}`">
        <el-button size="mini">新窗口</el-button>
      </a>
    </template>

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
      groupDoc: {},
    };
  },
  computed: {
    linkDemo: function () {
      let fn = function (row) {
        let { link, _idRel2, _id } = row
        if (!link) {//如果没有链接，则认为是新型的演示demo
          link = `#/open/auto_layout?demoId=${_idRel2 || _id}`
        }
        return link;
      }
      return fn
    }
  },
  methods: {
    emit: async function (evType) {
      this.vm_list = this.$closest({ vmT: this, name: "dm_list_data" })
      this.vm_list.$emit("single-btn-click", evType, this.doc);
      this.visible = false;
    },

  },
  created() {
    let vm_group = this.$closest({ vmT: this, name: "detail_group" })
    if (vm_group) {//如果{分组详情}组件存在
      this.groupDoc = vm_group.groupDoc
    }





  }
};
</script>
