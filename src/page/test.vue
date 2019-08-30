<template>
  <div>
    
<dm_debug_list>
      <dm_debug_item v-model="collectionData" text="collectionData"/>

    </dm_debug_list>

    <collection v-model="collectionData" list-type="form" :cf-form="cfForm"></collection>
    <!-- <dm_list_data :cf="cfList"></dm_list_data> -->
  </div>
</template>

<script>
import dm_list_data from "../components/list-data/list-data.vue";
import dm_dynamic_form from "../components/list-data/dynamic-form.vue";
import collection from "../components/form_item/collection.vue";
export default {
  components: { dm_list_data, dm_dynamic_form, collection },

  data() {
    return {
      collectionData: [
        { time: "2019-09-09", money: 100 },
        { time: "2019-09-11", money: 200 }
      ],
      cfForm: {
        col_span:12,
        formItems: [
          {
            label: "时间",
            prop: "time",
            type: "date"
          },
          {
            label: "金额",
            prop: "money"
          }
        ]
      }
    };
  },

  methods: {},
  async mounted() {}
};
</script>

<style>
</style>
