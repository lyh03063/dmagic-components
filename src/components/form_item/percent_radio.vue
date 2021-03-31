<template>
  <!--v-on="$listeners"继承所有事件-->
  <dm_grid_radio
    class="H20"
    :options="options"
    mode="progress"
    :show_value_label_right="true"
    :show_item_label="false"
    v-model="valueNeed"
    v-on="$listeners"
  ></dm_grid_radio>
</template>

<script>
export default {
  name: "percent_radio", //百分比进度条组件
  mixins: [MIX.form_item_new], //混入
  props: [],
  data() {
    return {
      valueNeed: this.value,
      options: [
        { label: "10%", value: 0.1 },
        { label: "20%", value: 0.2 },
        { label: "30%", value: 0.3 },
        { label: "40%", value: 0.4 },
        { label: "50%", value: 0.5 },
        { label: "60%", value: 0.6 },
        { label: "70%", value: 0.7 },
        { label: "80%", value: 0.8 },
        { label: "90%", value: 0.9 },
        { label: "100%", value: 1 },
      ]
    };
  },

  methods: {


  },
  created() {



  }
};
</script>
<style scoped>
</style>
