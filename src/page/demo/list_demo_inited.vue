<template>
  <div>

<el-button plain @click="vm_list_data.getDataList()" >外部按钮调用列表组件方法</el-button>


    <dm_pannel_new class="MB20" title="简单的分页">
      <dm_list_data class="MT20" :cf="cfList1" @inited="inited"></dm_list_data>
    </dm_pannel_new>
  </div>
</template>

<script>
import "../../components/list_demo.js";




export default {
  components: {

  },
  data() {

    let cfList1 = lodash.cloneDeep(PUB.listCF.list_url);

    Object.assign(cfList1, {//合并对象
      cfPagination: {
        small: true,
        layout: "total,  prev,  next",
      }
    });



    return {
      cfList1,
      vm_list_data:null,

    };
  },


  methods: {


    //自定义批量操作按钮点击函数
    bacthBtnClick: function (eventType, selection) {
    },

    //自定义单项操作按钮点击函数
    singlebtnClick: function (eventType, row) {
    },
    //函数：{列表组件加载后的回调函数}
    inited: async function ({ vm }) {
      this.vm_list_data=vm;
    },


  },
  created() {

    PUB._paramAjaxAddon = { _systemId: "sys_api" }
  },
  async mounted() {


  }
};
</script>

<style>
</style>