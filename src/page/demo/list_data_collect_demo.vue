<template>
  <div>
    <dm_pannel_new class="MB20" title="我收藏的demo">
      <dm_list_data_collect userId="13691916429" dataType="front_demo" class="PT10"></dm_list_data_collect>
    </dm_pannel_new>
    <dm_pannel_new class="MB20" title="我收藏的笔记">
      <dm_list_data_collect :cf="cfL" class="PT10"></dm_list_data_collect>
    </dm_pannel_new>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {

      cfL: {
        'findJsonAddon': {_userId:"13691916429",dataType:"note"},
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
