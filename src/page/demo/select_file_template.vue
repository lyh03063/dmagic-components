<template>
  <div>
    <!-- <el-button plain @click="vm_select_list.showDialog()">选择文件模板</el-button> -->
    <dm_space height="10"></dm_space>
    <dm_select_list_data
      class
      v-model="arrSelect"
      :cf="cfSelectList"
      @select="afterSelect"
      @inited="initedSelectList"
    ></dm_select_list_data>
    docTemp: {{docTemp}}
    <dm_dynamic_form :cf="cfForm" v-model="formData" @submit="fnSubmit" v-if="cfForm"></dm_dynamic_form>
  </div>
</template>
<script>




export default {
  components: {},

  data() {
    return {
      cfForm: null,
      formData: {},
      docTemp: {},
      arrSelect: [],
      cfSelectList: PUB.cfSelectList.file_template,

    };
  },

  methods: {
    afterSelect(id, doc) {
      this.docTemp = doc

      let { data_form } = doc
      this.cfForm = PUB.cfForm[data_form]
    },
    //函数：{弹窗选择列表组件加载后的回调函数}
    initedSelectList: async function ({ vm }) {
      this.vm_select_list = vm;
    },
    //函数：{查询表单提交的回调函数}
    async fnSubmit() {
      await axios({
        method: "post", url: `${PUB.domain}/lawyer/exportWord`,
        data: { "data": this.formData, "idTemplate": this.docTemp._id }
      });
      this.$message.success('生成文件成功');
    },

  },
  created() {
    //这里先设置好这个参数，避免内部的分组列表出异常！！！！
    PUB._paramAjaxAddon = {
      _systemId: "sys_lawyer_case"
    }
  },

  async mounted() {

    PUB.cfForm = PUB.cfForm || {}

    PUB.cfForm.review_conclusion = {
      col_span: 12, //控制显示一行多列
      size: "mini",
      formItems: [
        { prop: "companyName", label: "公司名称", },
        { prop: "companyNameShort", label: "公司简称", },
        { prop: "caseId", label: "案号", },
      ],
      btns: [{ text: "生成文件", event: "submit", type: "primary", size: "mini" }]
    }


    PUB.cfForm.test = {
      size: "mini",
      formItems: [F_ITEMS.title],
      btns: [{ text: "生成文件2", event: "submit", type: "primary", size: "mini" }]
    }


  }
};
</script>

<style>
</style>