<template>
  <div>
    <dm_pannel_new class="MB20" title="列表关联其他数据的列组件">
      <div class="PT10">
        <com_c_relData :cf="cf1"></com_c_relData>
      </div>

      <dm_list_data :cf="cfListMain"></dm_list_data>
    </dm_pannel_new>
  </div>
</template>

<script>
let cfListMain = lodash.get(PUB.listCF, `list_note_2`);
export default {
  components: {},
  data() {
    return {
      cfListMain,
      cf1: {}
    };
  },
  methods: {},
  created() {

    PUB._paramAjaxAddon = { _systemId: "sys_haolvzhu" }

    // {
    //   let prop = "countRelData", objBase = { label: "关联定时任务", prop, }
    //   D_ITEMS[prop] = { ...objBase, };
    //   COLUMNS[prop] = {
    //     ...objBase, width: 870, component: "com_c_relData",
    //     addon:{dataType:"timed_task"}
    //   };
    //   F_ITEMS[prop] = { ...objBase };
    // }
    // console.log(`F_ITEMS["countRelData"]:`, F_ITEMS["countRelData"]);
    console.log(`this.cfListMain.formItems:`, this.cfListMain.formItems);

    this.cfListMain.columns = [COLUMNS["title_w300"], COLUMNS["countTimedTask"]]
  },
  async mounted() { }
};
</script>

<style scoped>
</style>
