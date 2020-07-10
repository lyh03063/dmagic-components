



<template>
  <div class="DPIB">
    <dm_debug_list>
      <dm_debug_item v-model="data" />
    </dm_debug_list>

    <!-- <div class="" >data:{{data}}</div> -->
    <!-- <div class="" >arrLookupScore:{{arrLookupScore}}</div> -->
    <dm_score_panel
      ref="scorePanel"
      v-if="data"
      :param="data.objParam"
      :idKey="idKey"
      :listIndex="listIndex"
      :arrLookup="arrLookupScore"
      @switch="filterData"
    >
      <!-- 计分板组件 -->
    </dm_score_panel>
  </div>
</template>

<script>
export default {
  name: "dm_com_score_panel",
  components: {
    // score_panel: () => import("@/components/common/score_panel.vue"),

  },
  //用于列表模糊查询的组件
  props: ["data"],
  data() {
    return {
      listIndex: "",
      idKey: "_id",
      arrLookupScore: null //计分板需要联合查询配置数组-

    };
  },

  methods: {
    //函数：{设置ArrLookupScore函数}-供外部调用
    setArrLookupScore(arrLookupScore) {
      this.arrLookupScore = arrLookupScore
    },
    //函数：{过滤数据函数}
    async filterData() {
      // this.$emit("searchList");
      this.$emit("list-event-in", { eventType: "filterDataByFamiliarity" });




    },
  },
  created() {
    let _dataType = lodash.get(this.data, `objParam._dataType`);
    this.listIndex = `list_${_dataType}`
    if (_dataType == "relation") {//如果是关系表！！！
      this.idKey = "_idRel2"
      this.listIndex = `detail_group_note`
    }
  }
};
</script>
