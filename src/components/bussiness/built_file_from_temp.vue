<template>
  <div>
    <!-- <el-button plain @click="vm_select_list.showDialog()">选择文件模板</el-button> -->
    <div class="PL30">
      <!-- <div class>idFileModify:{{idFileModify}}</div> -->

      <div class v-if="idFileModify">
        <el-alert :title="`正在修改【${docFileModify.title}】文件`" type="warning" show-icon v-if="docFileModify"></el-alert>
      </div>
      <div class v-else>
        <el-alert :title="`请选择合适的文件模板，并填写对应的表单信息来生成文件`" type="warning" show-icon></el-alert>
      </div>

      <!-- <div class>docFileModify:{{docFileModify}}</div> -->
      <dm_space height="10"></dm_space>
      <div class="DPF">
        <div class="W120">当前所选模板：</div>
        <div class="FX1">
          <dm_select_list_data
            class
            v-model="titleTemplate"
            :cf="cfSelectList"
            @select="afterSelect"
            @inited="initedSelectList"
          ></dm_select_list_data>
        </div>
      </div>
    </div>
    <dm_space height="30"></dm_space>
    <!-- docTemp: {{docTemp}} -->
    <dm_dynamic_form :cf="cfForm" v-model="formDataBuilt" @submit="fnSubmit" v-if="cfForm"></dm_dynamic_form>
  </div>
</template>
<script>




export default {
  components: {},
  props: {
    idFileModify: {}//变量赋值：{修改的生成文件id}
  },
  data() {
    return {
      cfForm: null,
      formDataBuilt: {},
      docTemp: {},
      titleTemplate: null,
      cfSelectList: PUB.cfSelectList.file_template,
      docFileModify: null,
    };
  },
  methods: {
    afterSelect(id, doc) {
      this.docTemp = doc
      let { data_form } = doc

      this.handelCfForm(PUB.cfForm[data_form])//调用：{处理表单配置的函数}
    },
    //函数：{弹窗选择列表组件加载后的回调函数}
    initedSelectList: async function ({ vm }) {
      this.vm_select_list = vm;
      // this.vm_select_list.showDialog()//自动弹出选择列表
    },
    //函数：{查询表单提交的回调函数}
    async fnSubmit() {
      let { data } = await axios({
        method: "post", url: `${PUB.domain}/lawyer/exportWord`,
        data: { "data": this.formDataBuilt, "idTemplate": this.docTemp._id }
      });
      let pathFixed = `http://www.dmagic.cn/exportWord/bankruptcy_case/`
      // this.$message.success('生成文件成功');
      let { fileNameBuilt, rsUploadQN } = data;
      let { key, downloadDomain } = rsUploadQN

      if (this.idFileModify) {//Q1：{修改的文件id}存在
        await axios({//修改接口-修改生成的文件的路径和源数据
          method: "post", url: `${PUB.domain}/info/commonModify`,
          data: {
            _id: this.idFileModify, _systemId: "sys_lawyer_case",
            _data: {
              file: [{ "url": `${downloadDomain}/${key}` }],
              dataBuilt: this.formDataBuilt

            }
          }
        });
        this.$message.success('修改并重新生成文件成功');
        this.$emit("after_built", { doc: this.docFileModify });
      } else {//Q2：{修改的文件id}不存在
        let dataAdd = {
          title: fileNameBuilt, dataBuilt: this.formDataBuilt,
          file: [{ "url": `${downloadDomain}/${key}` }],
          originType: 2,//来源类型
          _idRel: this.docTemp._id//文件模板id
        }
        let { data: { addData } } = await axios({
          method: "post", url: `${PUB.domain}/info/commonAdd`,
          data: { "_data": dataAdd, "_systemId": "sys_lawyer_case", "_dataType": "file" }
        });
        // this.$message.success('生成文件并引用成功');
        this.$emit("after_built", { doc: addData });
      }

    },
    //函数：{ajax获取修改的文件详情函数}
    getDocFileModify: async function () {
      let { data } = await axios({//请求接口
        method: "post", url: `${PUB.domain}/info/commonDetail`,
        data: {//传递参数
          _id: this.idFileModify, _systemId: "$all"
        }
      });
      this.docFileModify = data.doc;
      let { dataBuilt, _idRel } = data.doc;
      this.formDataBuilt = dataBuilt
      this.getDocFileTemplate(_idRel)//调用：{ajax获取已选的文件模板详情}
    },
    //函数：{ajax获取已选的文件模板详情}
    getDocFileTemplate: async function (_id) {
      let { data } = await axios({//请求接口
        method: "post", url: `${PUB.domain}/info/commonDetail`,
        data: {//传递参数
          _id: _id, _systemId: "$all"
        }
      });
      let { title, data_form } = data.doc;
      this.docTemp = data.doc
      this.titleTemplate = title
      this.handelCfForm(PUB.cfForm[data_form])//调用：{处理表单配置的函数}
    },

    //函数：{处理表单配置的函数}
    handelCfForm: async function (cfForm) {
      this.cfForm = cfForm//变量赋值：{表单配置}
      let cfFormDefault = {
        col_span: 12, //控制显示一行多列
        size: "mini",
        btns: [{ text: "生成文件", event: "submit", type: "primary", size: "mini" }]
      };
      //调用：{给一个对象设置默认属性函数}
      util.setObjDefault(this.cfForm, cfFormDefault);
    },
  },
  created() {
    //这里先设置好这个参数，避免内部的分组列表出异常！！！！
    PUB._paramAjaxAddon = {
      _systemId: "sys_lawyer_case"
    }
    if (this.idFileModify) {//如果{修改的生成文件id}存在
      this.getDocFileModify()//调用：{ajax获取修改的文件详情函数}
    }
  },
  async mounted() {
  }
};
</script>
<style>
</style>