<template>
  <div>
    <dm_debug_list>
      <dm_debug_item v-model="visible" text="visible" />
    </dm_debug_list>

    <dm_list_data :cf="cfList" @bacth-btn-click="bacthBtnClick" @sort_by_drag="sort_by_drag"></dm_list_data>

    <dm_list_data :cf="cfList2" @sort_by_drag="sort_by_drag"></dm_list_data>
  </div>
</template>

<script>
import "../../components/list_demo.js";




export default {
  components: {

  },
  data() {
    return {

      visible: {},
      cfList: lodash.cloneDeep(PUB.listCF.list_demo),
      cfList2: lodash.cloneDeep(PUB.listCF.list_demo),
    };
  },


  methods: {
    //函数：{sort_by_drag事件函数}
    sort_by_drag: async function (param) {


    },

    //自定义批量操作按钮点击函数
    bacthBtnClick: function (eventType, selection) {
    },

    async toggleList() {
      let result = !this.isShowList1;
      this.isShowList1 = null;
      await this.$nextTick(); //延迟到视图更新
      this.isShowList1 = result;
    },
    //自定义单项操作按钮点击函数
    singlebtnClick: function (eventType, row) {
    },



  },
  created() {
    this.cfList.dragSort = true;//允许拖拽排序
 this.cfList2.dragSort = true;//允许拖拽排序

  },
  async mounted() {


  }
};
</script>

<style>
</style>