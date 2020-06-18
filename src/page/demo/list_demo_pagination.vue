<template>
  <div>
    <dm_pannel_new class="MB20" title="简单的分页">
      <dm_list_data class="MT20" :cf="cfList1"></dm_list_data>
    </dm_pannel_new>

    <dm_pannel_new class="MB20" title="默认的分页">
      <dm_list_data class="MT20"  :cf="cfList2"></dm_list_data>
    </dm_pannel_new>
  </div>
</template>

<script>





export default {
  components: {

  },
  data() {

    let cfList1 = lodash.cloneDeep(PUB.listCF.list_demo);

    Object.assign(cfList1, {//合并对象
      cfPagination: {
        small: true,
        layout: "total,  prev,  next",
      }
    });


    let cfList2 = lodash.cloneDeep(PUB.listCF.list_demo);

    return {
      cfList1,
      cfList2,
    };
  },


  methods: {


    //自定义批量操作按钮点击函数
    bacthBtnClick: function (eventType, selection) {
    },

    //自定义单项操作按钮点击函数
    singlebtnClick: function (eventType, row) {
    },



  },
  created() {


  },
  async mounted() {


  }
};
</script>

<style>
</style>