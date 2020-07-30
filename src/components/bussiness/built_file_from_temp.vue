<template>
  <div>
    <!-- <el-button plain @click="vm_select_list.showDialog()">选择文件模板</el-button> -->
    <div class="PL30">
      <!-- <div class>idFileModify:{{idFileModify}}</div> -->

      <div class v-if="idFileModify">
        <el-alert
          :title="`正在修改【${docFileModify.title}】文件`"
          type="warning"
          show-icon
          v-if="docFileModify"
        ></el-alert>
      </div>
      <div class v-else>
        <el-alert :title="`请选择合适的文件模板，并填写对应的表单信息来生成文件`" type="warning" show-icon></el-alert>
      </div>

      <!-- <div class>docFileModify:{{docFileModify}}</div> -->
      <dm_space height="10"></dm_space>
      <div class="DPF" v-if="ready">
        <div class="W120">当前所选模板：</div>
        <div class="FX1">
          <dm_select_list_data
            class
            v-model="docTemp._id"
            :cf="cfSelectList"
            @select="afterSelect"
            @inited="initedSelectList"
          ></dm_select_list_data>
        </div>
      </div>

      <div class v-if="docTemp._id == '5ef7446ecd60c84ff07d37b0'">
        <el-alert
          class="MT8"
          :title="`请先在债权表录入对应的债权人信息，选择债权人后文档会自动提取债权人相关信息进行文档生成。 `"
          type="warning"
          show-icon
        ></el-alert>

        <!--债权人选择，只有在模板为“债权审查结论通知书”时显示-->
        <div class="DPF MT8">
          <div class="W120">当前选择债权人：</div>
          <div class="FX1">
            <dm_select_list_data
              class
              v-model="formDataBuilt.creditor_id"
              :cf="cfSelectListCreditor"
              @select="afterSelectCreditor"
            ></dm_select_list_data>
          </div>
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
      ready: false,
      cfForm: null,
      formDataBuilt: {},
      docCase: null,//案件文档
      docTemp: {},//文件模板文档
      cfSelectList: PUB.cfSelectList.file_template,
      cfSelectListCreditor: PUB.cfSelectList.creditor_rights,
      docFileModify: null,
    };
  },
  methods: {
    //函数：{选择债权人后的回调函数函数}
    async afterSelectCreditor(id, doc) {
      let { _id } = doc;


      let { data } = await axios({//请求接口
        method: "post", url: `${PUB.domain}/info/commonDetail`,
        data: {//传递参数
          _id, _systemId: "$all"
        }
      });



      this.formDataBuilt.SC = data.doc

      this.formDataBuilt.creditor_id = _id
    },
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
    //函数：{额外处理债权审核报告模板的数据的函数}
    handleTemp3: async function () {
      let {
        data: { list: listCreditor }
      } = await axios({
        method: "post",
        url: `${PUB.domain}/info/getCommonList`,
        data: {
          pageSize: 999, _dataType: "creditor_rights", _systemId: "sys_lawyer_case",
          findJson: { _idRel: this.docCase._id, creditorCofirmStatus: 2 }, sortJson: { sort: -1 },//排序
        }
      });
      listCreditor.forEach((itemEach, i) => {//循环：{债权数组}
        itemEach.index = i + 1//补充序号
      })
      this.formDataBuilt.listCreditor = listCreditor//补充数据到formDataBuilt
      let creditorCount = listCreditor.length;
      let declaredFeeSum = listCreditor.reduce((n, doc) => n + (doc["objDeclaredFee"].sum || 0), 0);
      let cofirmFeeSum = listCreditor.reduce((n, doc) => n + (doc["objConfirmFee"].sum || 0), 0);
      this.formDataBuilt.objStat = { creditorCount, declaredFeeSum, cofirmFeeSum }
      Object.assign(this.formDataBuilt, { creditorCount, declaredFeeSum, cofirmFeeSum });//合并对象

    },

    //函数：{额外处理管理人阶段性工作报告模板的数据的函数}
    handleTemp6: async function () {
      let {
        data: { list: listInvolvedCase }
      } = await axios({
        method: "post", url: `${PUB.domain}/info/getCommonList`,
        data: {
          pageSize: 999, _dataType: "involved_case", _systemId: "sys_lawyer_case",
          findJson: { _idRel: this.docCase._id, }, sortJson: { sort: -1 },//排序
        }
      });

      if (!(listInvolvedCase && listInvolvedCase.length)) return;

      this.formDataBuilt.listInvolvedCase_1 = listInvolvedCase.filter(d => d.relCaseType == 1)//变量：{案件数组-普通民事程序}
      this.formDataBuilt.listInvolvedCase_2 = listInvolvedCase.filter(d => d.relCaseType == 2)//变量：{案件数组-执行程序}
      this.formDataBuilt.listInvolvedCase_3 = listInvolvedCase.filter(d => d.relCaseType == 3)//变量：{案件数组-财产保全程序}

      this.formDataBuilt.listInvolvedCase_1.forEach((itemEach, i) => {//循环：{案件数组-普通民事程序}
        itemEach.index = i + 1//补充序号
      })

      this.formDataBuilt.listInvolvedCase_2.forEach((itemEach, i) => {//循环：{案件数组-执行程序}
        itemEach.index = i + 1//补充序号
      })

      this.formDataBuilt.listInvolvedCase_3.forEach((itemEach, i) => {//循环：{案件数组-财产保全程序}
        itemEach.index = i + 1//补充序号
      })
      this.formDataBuilt.countCase = listInvolvedCase.length;
      //审理中数量--所有案件
      this.formDataBuilt.countCase_hear = listInvolvedCase.filter(d => d.caseStatus == 1).length;
      //已结案数量--所有案件
      this.formDataBuilt.countCase_end = listInvolvedCase.filter(d => d.caseStatus == 2).length;

      this.formDataBuilt.countCase_1 = this.formDataBuilt.listInvolvedCase_1.length;
      //已结案数量--普通民事程序
      this.formDataBuilt.countCase_1_end = this.formDataBuilt.listInvolvedCase_1.filter(d => d.caseStatus == 2).length;


      this.formDataBuilt.countCase_2 = this.formDataBuilt.listInvolvedCase_2.length;
      //已结案数量--执行程序
      this.formDataBuilt.countCase_2_end = this.formDataBuilt.listInvolvedCase_2.filter(d => d.caseStatus == 2).length;
      this.formDataBuilt.countCase_3 = this.formDataBuilt.listInvolvedCase_3.length;
      //已结案数量--财产保全程序
      this.formDataBuilt.countCase_3_end = this.formDataBuilt.listInvolvedCase_3.filter(d => d.caseStatus == 2).length;


      if (this.formDataBuilt.listInvolvedCase_1.length) {//如果{案件数组-普通民事程序}有值
        this.formDataBuilt.hasCase_1 = true;


      }
      if (this.formDataBuilt.listInvolvedCase_2.length) {//如果{案件数组-执行程序}有值
        this.formDataBuilt.hasCase_2 = true;
      }
      if (this.formDataBuilt.listInvolvedCase_3.length) {//如果{案件数组-财产保全程序}有值
        this.formDataBuilt.hasCase_3 = true;
      }


      this.formDataBuilt.listInvolvedCase = listInvolvedCase//补充数据到formDataBuilt



    },

    //函数：{查询表单提交的回调函数}
    async fnSubmit() {



      if (this.docTemp._id == "5ef211172dce5d5ac056ae5d") {//如果是“债权审核报告”，需先ajax获取债权表
        this.handleTemp3()//调用：{额外处理债权审核报告模板的数据的函数}
      } else if (this.docTemp._id == "5ef4a043783fb23ae854b29b") {//如果是“管理人阶段性工作报告”，需先ajax获取债权表
        this.handleTemp6()//调用：{额外处理管理人阶段性工作报告模板的数据的函数}
      } else if (this.docTemp._id == "5ef7446ecd60c84ff07d37b0") {//如果是“债权审查结论通知书”，将显示“选择债权人”功能
        alert(`如果是“债权审查结论通知书”，将显示“选择债权人”功能`);
      }

      // return

      let { data } = await axios({//ajax导出word
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
              file: [{ "url": `${downloadDomain}/${key}` }], dataBuilt: this.formDataBuilt

            }
          }
        });
        this.$message.success('修改并重新生成文件成功');
        this.$emit("after_built", { doc: this.docFileModify });
      } else {//Q2：{修改的文件id}不存在
        let dataAdd = {
          title: fileNameBuilt, dataBuilt: this.formDataBuilt||{},
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
      let { dataBuilt = {}, _idRel } = data.doc;
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
      this.ready = true;

      this.handelCfForm(PUB.cfForm[data_form])//调用：{处理表单配置的函数}
    },

    //函数：{处理表单配置的函数}
    handelCfForm: async function (cfForm) {
      this.cfForm = cfForm//变量赋值：{表单配置}

      let { formItems } = cfForm;



      let cfFormDefault = {
        col_span: 12, //控制显示一行多列
        size: "mini",
        btns: [{ text: "生成文件", event: "submit", type: "primary", size: "mini" }]
      };
      //调用：{给一个对象设置默认属性函数}
      util.setObjDefault(this.cfForm, cfFormDefault);

      if (!this.idFileModify && this.docCase) {//如果{修改的生成文件id}不存在-20200627新增
        //表单初始赋值
        Object.assign(this.formDataBuilt, this.docCase);//合并对象

      }


    },

  },
  created() {
    //这里先设置好这个参数，避免内部的分组列表出异常！！！！
    PUB._paramAjaxAddon = {
      _systemId: "sys_lawyer_case"
    }
    //向外寻找前辈组件，找到案件详情组件！！！
    let vm_detail_bankruptcy_case = this.$closest({ vmT: this, name: "detail_bankruptcy_case" })
    if (vm_detail_bankruptcy_case) {//如果{外层的案件详情组件}存在
      this.docCase = lodash.cloneDeep(vm_detail_bankruptcy_case.docCase)
      lodash.set(this.cfSelectListCreditor, `cfList.objParamAddon.findJson`, { _idRel: this.docCase._id });
    }


    if (this.idFileModify) {//如果{修改的生成文件id}存在
      this.getDocFileModify()//调用：{ajax获取修改的文件详情函数}
    } else {
      this.ready = true;
    }


  },
  async mounted() {



  }
};
</script>
<style>
</style>