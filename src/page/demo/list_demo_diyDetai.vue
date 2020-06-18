<template>
  <div>
    <dm_pannel_new class="MB20" title="自定义详情弹窗的component">
      <dm_list_data class="MT20" :cf="cfList1" @inited="inited"></dm_list_data>
    </dm_pannel_new>
  </div>
</template>

<script>


// 注册一个全局组件-针对某个列
Vue.component('detail_1', {
  template: `<span class="C_f30 B" >{{doc}}</span>`,
  props: ["doc", ],//接收属性
  methods: {
   
  }
})

export default {
  components: {

  },
  data() {

    let cfList1 = lodash.cloneDeep(PUB.listCF.list_url);

    Object.assign(cfList1, {//合并对象
     comDetail:"detail_1",
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