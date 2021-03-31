<template>
  <!--v-on="$listeners"继承所有事件-->
  
  <dm_grid_radio  :options="options" v-model="valueNeed"  v-on="$listeners"></dm_grid_radio>
</template>

<script>
export default {
  name: "priority", //百分比进度条组件
  mixins: [MIX.form_item_new], //混入
  props: [],
  data() {
    return {
      valueNeed: this.value,
      options: [

        { label: "低", value: 4 },
        { label: "中", value: 3 },
        { label: "高", value: 2 },
        { label: "很高", value: 1 },

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
