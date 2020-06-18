<template>
  <div>
    <el-button plain @click="vm_select_list.showDialog()">外部按钮调用组件方法</el-button>
    <dm_space height="10" ></dm_space>
    <dm_select_list_data
      class
      v-model="arrSelect"
      :cf="cfSelectList"
      @select="afterSelect"
      @inited="initedSelectList"
    ></dm_select_list_data>
  
  </div>
</template>
<script>
export default {
  components: {},

  data() {
    return {
      arrSelect: [],
      cfSelectList: F_ITEMS.select_list_common_url.cfSelectList,
      selectData: [],
      isShowDialog: false, //是否显示弹窗
    };
  },

  methods: {
    afterSelect(arr) {
      alert("afterSelect");
    },
    //函数：{确认选择数据函数}
    confirmSelect() {
      //获取选中的数据，此处可优化，使用selection-change事件
      let selection = this.$refs.listSelectData.$refs.table.selection;
      if (!selection.length) return this.$message.error("未选择任何数据");
      this.selectData = util.deepCopy(selection);
      this.isShowDialog = false;
    },
    //函数：{弹窗选择列表组件加载后的回调函数}
    initedSelectList: async function ({ vm }) {
      this.vm_select_list = vm;
    },

  },
  created() { },
  async mounted() { }
};
</script>

<style>
</style>