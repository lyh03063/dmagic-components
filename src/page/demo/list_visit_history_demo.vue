<template>
  <div>
    <!-- <dm_pannel_new class="MB20" title="自定义无数据提示（插槽）">
      <dm_list_visit_history :cf="cf4" class="PT10">
        <template #noData>无数据(slot)</template>
      </dm_list_visit_history>
    </dm_pannel_new>
    <dm_pannel_new class="MB20" title="自定义无数据提示">
      <dm_list_visit_history :cf="cf3" class="PT10"></dm_list_visit_history>
    </dm_pannel_new> -->

     <dm_pannel_new class="MB20" title="笔记访问历史(findJson指定用户13691916429)">
      <dm_list_visit_history :cf="cf5" class="PT10"></dm_list_visit_history>
    </dm_pannel_new> 
    <!-- <dm_pannel_new class="MB20" title="笔记访问历史">
      <dm_list_visit_history :cf="cf1" class="PT10"></dm_list_visit_history>
    </dm_pannel_new>

    <dm_pannel_new class="MB20" title="视频访问历史">
      <dm_list_visit_history :cf="cf2" class="PT10"></dm_list_visit_history>
    </dm_pannel_new>

   -->
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      cf4: {
        dataTypeDict: "note1",
        findJsonAddon: { dataType: "note1" }
      },
      cf3: {
        tipsNoData: "暂无笔记！！！！！！！！！！",
        dataType: "note1",
        findJsonAddon: { dataType: "note1" }
      },
      cf1: {
        dataTypeDict: "note",
        findJsonAddon: { dataType: "note" },
        // cfListAddon: {
        //   dynamicDict: [
        //     { "ajax": { "url": "/info/getCommonList", "param": { _dataType: "note" } }, "idColumn2": "_id", "idColumn": "dataId", "populateColumn": "dataTarget" }
        //   ],
        // }
      },
      cf2: {
        dataTypeDict: "vedio",
        findJsonAddon: { dataType: "vedio" }
      },
      cf5: {
        'findJsonAddon': { _userId: "13691916429", dataType: "note" },
        dataTypeDict: "note",
      }

    };
  },
  methods: {},
  created() { },
  async mounted() { }
};
</script>

<style scoped>
</style>
