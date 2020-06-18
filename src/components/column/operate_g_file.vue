<template>
  <div>
    <a class="MR6" target="_blank" :href="fileUrl">
      <el-button class size="mini">直接打开</el-button>
    </a>
    <a class="MR6" target="_blank" :href="fileUrlDownload">
      <el-button class size="mini">下载</el-button>
    </a>
    <!--排序-->
    <el-popover
      placement="left"
      width="190"
      trigger="hover"
      v-if="$power('groupDataList.all.modify')"
    >
      <div class="TAR">
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

    <!--修改实体，取消关联，复制-->
    <el-popover class placement="right" width="auto" trigger="hover">
      <div class v-if="$power('groupDataList.all.modify')">
        <el-button title="重新生成" @click="emit('rebuilt')" size="mini" v-if="doc.originType==2">重新生成</el-button>
        <el-button icon="el-icon-edit" circle @click="emit('edit_entity')" size="mini"></el-button>

        <el-button icon="el-icon-document-copy" circle @click="emit('copy_entity')" size="mini"></el-button>
        <el-button title="取消关联" icon="el-icon-delete" @click="emit('delete')" circle size="mini"></el-button>

        
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
  name: "dm_c_operate_g_file",//分组文件列表的操作列
  props: ["doc"],
  data() {
    return {};
  },
  computed: {
    //文件地址
    fileUrl: function () {
      return util.cfList.sBtns.openFile.urlFormatter(this.doc)
    },
    //下载文件地址
    fileUrlDownload: function () {
      return util.cfList.sBtns.download.urlFormatter(this.doc)
    },
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
