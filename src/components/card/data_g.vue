<template>
  <div class="item-box TAC">
    <div class="DPFC">
      <span class="C_999" v-if="dataTypeP"
        >[{{ dataTypeP }}<span v-if="doc.dataType"> - {{ doc.dataType }}</span
        >]</span
      >
      <span class="MR10">{{ doc.title }}</span>

      <a class="MR10" target="_blank" :href="getDetailLink(doc)">详情</a>
      <!--气泡弹窗-->
      <el-popover
        placement="right"
        width="200"
        trigger="hover"
        :open-delay="300"
      >
        <div class="">
          <i class="MR10 btn_mimi el-icon-edit">修改111</i>
          <i class="MR10 btn_mimi el-icon-delete">删除引用</i>
          <i class="MR10 btn_mimi el-icon-delete">删除实体</i>
        </div>

        <i class="DPIB FS20 C_999 el-icon-setting" slot="reference"></i>
      </el-popover>

      <div class="ML10">
        <a href="javascript:;" @click="isShowChildren = !isShowChildren"
          >(数据量:{{ doc.countData }})</a
        >
      </div>
    </div>

    <div class="ML20" v-if="dataTypeP == 'group' && isShowChildren">
      <!--递归-->
      <dm_list_group_common :gid="doc._idRel2"></dm_list_group_common>
    </div>
  </div>
</template>

<script>
export default {
  name: "data_g",
  mixins: [MIX.base,],
  props: {
    dataTypeP: {},
    doc: {
      default: function () {
        return {
          title: "标题"
        }
      }
    }
  },
  data() {
    return {
      isShowChildren: false,
    };
  },
  computed: {


  },

  methods: {
    //函数：{000函数}
    getDetailLink: function (doc) {
      let { dataType } = doc
      let link = "xxxx"
      if (this.dataTypeP == "group") {//Q1:分组
        link = `#/detail_group?groupId=${doc._idRel2}`
      } else if (this.dataTypeP == "front_demo") { //Q2:前端demo
        link = `#/open/auto_layout?demoId=${doc._idRel2}`
      }
      return link

    },
    //函数：{显示下级数据列表函数}
    showChildren: async function (doc) {
      // let {_idRel2}=doc
      this.$emit("single-action", { action: "show_children", doc });

    },



  },
  created() {

  }
};
</script>

<style scoped>
.item-box {
  border-bottom: 1px #ddd solid;
  background: #fff;
  padding: 5px 0;
  text-align: left;
}

/* 小操作按钮 */
.btn_mimi {
  font-style: normal;
  border: 1px #ddd solid;
  color: #777;
  border-radius: 5px;
  padding: 3px 6px;
  font-size: 12px;
  text-decoration: none;
  margin: 0 5px 0 0;
  background-color: #fff;
  cursor: pointer;
}
</style>