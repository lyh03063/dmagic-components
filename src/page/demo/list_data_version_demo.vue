<template>
  <div>
    <dm_pannel_new class="MB20" title="前端demo的历史版本">
      <dm_list_data_version :cf="cfLDataVersion" class="PT10"></dm_list_data_version>
    </dm_pannel_new>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {

      cfLDataVersion: {
        'findJsonAddon': {_idRel:"5f53457b172b7e3ceca81e40"},
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
