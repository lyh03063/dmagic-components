<template>
  <div class="item-box TAC">
    <div class="DPFC">
      <!--图标-->
      <div class="">
        <div
          class="box_g_icon MR10 DPFC"
          v-if="dataTypeP == 'group'"
          @click="isShowChildren = !isShowChildren"
        >
          <i class="C_999 el-icon-minus FS12 Scale80" v-if="isShowChildren"></i>
          <i class="C_999 el-icon-plus FS12 Scale80" v-else></i>
          <i
            class="C_999 FS12 PS4"
            :class="iconChildren"
            v-if="doc.dataType"
            :title="doc.dataType"
          ></i>
        </div>
        <i class="C_999 FS14 MR10" :class="icon" v-else></i>
      </div>

      <!--不同数据类型的卡片组件-->
      <component :is="comCard" :doc="doc"></component>

      <a class="MR10" target="_blank" :href="getDetailLink(doc)">详情</a>
      <!-- <el-button class="MR10" plain @click="fnAdd" size="mini">+新增同级</el-button> -->

      <!-- @single-action="" -->
      <!--操作栏-->
      <com_c_operate_entity_2
        :doc="doc"
        :dataTypeP="dataTypeP"
        @single-action="(param) => $emit('single-action', param)"
        class=""
      ></com_c_operate_entity_2>

      <div class="ML10 C_999" v-if="dataTypeP == 'group'">
        （数据量:{{ doc.countData }}）
      </div>
    </div>

    <div class="ML20" v-if="dataTypeP == 'group' && isShowChildren">
      <!--递归-->
      <dm_list_group_common :groupId="doc._idRel2"></dm_list_group_common>
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
    //卡片组件名
    comCard: function () {

      let comCard = lodash.get(DYDICT.dictDataType, `${this.dataTypeP}.comCard`);
      comCard = comCard || "dm_card_data_normal"
      return comCard;
    },
    icon: function () {
      return lodash.get(DYDICT.dictDataType, `${this.dataTypeP}.icon`, "el-icon-top-right");
    },
    iconChildren: function () {
      return lodash.get(DYDICT.dictDataType, `${this.doc.dataType}.icon`, "el-icon-top-right");
    }

  },

  methods: {


    //函数：{跳转详情页函数}
    getDetailLink: function (doc) {
      let { dataType } = doc
      let { dataTypeP } = this
      let link = `#/detail_data?dataId=${doc._idRel2}`
      if (dataTypeP == "group") {//Q1:分组
        link = `#/detail_group?groupId=${doc._idRel2}`
      } else if (dataTypeP == "front_demo") { //Q2:前端demo
        link = `#/open/auto_layout?demoId=${doc._idRel2}`
      } else if (dataTypeP == "url") { //Q3:网址
        link = `${doc.link}`
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
  background: #fff;
  padding: 5px 0;
  text-align: left;
}
.item-box:not(:last-child) {
  border-bottom: 1px #ddd solid;
}

.box_g_icon {
  border: 1px #ccc solid;
  width: 28px;
  height: 16px;
  line-height: 14px;

  border-radius: 0 5px 0 0;
  cursor: pointer;
}
</style>