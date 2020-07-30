
<template>
  <div class="main-box2 P10">
    <dm_debug_list>
      <dm_debug_item v-model="docCase" />
    </dm_debug_list>
    <div class="TAC LH32 FWB FS18 MB10">
      {{docCase.title}}
      <el-link class="el-icon-edit" @click="cfEditDialog.visible = true;">编辑基础信息</el-link>

      <dm_dialog_edit :cf="cfEditDialog" @after-modify="afterModify"></dm_dialog_edit>
    </div>
    <el-tabs v-model="activeName" type="card" v-if="ready">
      <el-tab-pane label="案件/管理团队" name="tab1" lazy>
        <dm_pannel_new class="MB20" title="基本信息" :cf="cfPannel1">
          <table class="n-table n-table-form MT10">
            <tr>
              <td class="WP15">案号：</td>
              <td class="WP35">{{docCase.caseId}}</td>
              <td class="WP15">案件状态：</td>
              <td class="WP35">{{$dictLable('caseStatus',docCase.caseStatus)}}</td>
            </tr>
            <tr>
              <td class="WP15">管理人：</td>
              <td class="WP35">
                <!--简单列表组件-->
                <dm_list_simple :cf="cfListPerson" v-model="docCase.personCharge"></dm_list_simple>
              </td>
              <td class="WP15"></td>
              <td class="WP35"></td>
            </tr>
          </table>
        </dm_pannel_new>

        <dm_pannel_d_g_list :cf="cfG1" class :doc="docCase" title="团队资料"></dm_pannel_d_g_list>

        <dm_pannel_d_g_list :cf="cfG2" class :doc="docCase" title="三书及工作制度"></dm_pannel_d_g_list>

        <dm_pannel_d_g_list :cf="cfG4" class :doc="docCase" title="阅卷申请"></dm_pannel_d_g_list>
      </el-tab-pane>
      <el-tab-pane label="债务人信息" name="tab2" lazy>
        <dm_pannel_d_g_list :cf="cfG3" class :doc="docCase" title="工商信息"></dm_pannel_d_g_list>

        <!--这个要有标准列表-->
        <dm_pannel_rel_list_data class="MB20" title="涉诉信息" :doc="docCase" :cf="cfRel_involvedCase"></dm_pannel_rel_list_data>

        <!-- <dm_pannel_d_g_list :cf="cfG5" class :doc="docCase" title="涉诉信息222"></dm_pannel_d_g_list> -->

        <dm_pannel_d_g_list :cf="cfG6" class :doc="docCase" title="调取人口信息"></dm_pannel_d_g_list>

        <dm_pannel_d_g_list :cf="cfG7" class :doc="docCase" title="通知债务人"></dm_pannel_d_g_list>

        <dm_pannel_d_g_list :cf="cfG8" class :doc="docCase" title="五查申请"></dm_pannel_d_g_list>

        <dm_pannel_d_g_list :cf="cfG9" class :doc="docCase" title="现场照片"></dm_pannel_d_g_list>
      </el-tab-pane>
      <el-tab-pane label="债权人信息" name="tab3" lazy>
        <dm_pannel_rel_list_data class="MB20" title="债权表" :doc="docCase" :cf="cfRel_creditorRights"></dm_pannel_rel_list_data>
        <dm_pannel_d_g_list :cf="cfG10" class :doc="docCase" title="债权申报文书"></dm_pannel_d_g_list>

        <dm_pannel_d_g_list :cf="cfG11" class :doc="docCase" title="国家机关"></dm_pannel_d_g_list>

        <dm_pannel_d_g_list :cf="cfG12" class :doc="docCase" title="自然人及法人"></dm_pannel_d_g_list>

        <dm_pannel_d_g_list :cf="cfG13" class :doc="docCase" title="阅卷图片"></dm_pannel_d_g_list>
      </el-tab-pane>
      <el-tab-pane label="公章相关" name="tab4" lazy>
        <dm_pannel_rel_list_data class="MB20" title="公章使用记录" :doc="docCase" :cf="cfRel_sealRecord"></dm_pannel_rel_list_data>
        <dm_pannel_d_g_list :cf="cfG33" class :doc="docCase" title="公章相关文件"></dm_pannel_d_g_list>

        <!-- <dm_pannel_d_g_list :cf="cfRel_sealRecord" class :doc="docCase" title="公章使用记录"></dm_pannel_d_g_list> -->
      </el-tab-pane>
      <el-tab-pane label="财产调查" name="tab5" lazy>
        <dm_pannel_d_g_list :cf="cfG14" class :doc="docCase" title="有形-不动产"></dm_pannel_d_g_list>

        <dm_pannel_d_g_list :cf="cfG15" class :doc="docCase" title="有形-车辆"></dm_pannel_d_g_list>

        <dm_pannel_d_g_list :cf="cfG16" class :doc="docCase" title="有形-股权"></dm_pannel_d_g_list>

        <dm_pannel_d_g_list :cf="cfG17" class :doc="docCase" title="有形-银行"></dm_pannel_d_g_list>

        <dm_pannel_d_g_list :cf="cfG18" class :doc="docCase" title="有形-证券"></dm_pannel_d_g_list>

        <dm_pannel_d_g_list :cf="cfG19" class :doc="docCase" title="无形-商标"></dm_pannel_d_g_list>

        <dm_pannel_d_g_list :cf="cfG20" class :doc="docCase" title="无形-著作"></dm_pannel_d_g_list>

        <dm_pannel_d_g_list :cf="cfG21" class :doc="docCase" title="无形-专利"></dm_pannel_d_g_list>
      </el-tab-pane>
      <el-tab-pane label="债权人会议" name="tab6" lazy>
        <dm_pannel_d_g_list :cf="cfG22" class :doc="docCase" title="第一次债会初稿"></dm_pannel_d_g_list>

        <dm_pannel_d_g_list :cf="cfG23" class :doc="docCase" title="邮寄页"></dm_pannel_d_g_list>

        <dm_pannel_d_g_list :cf="cfG24" class :doc="docCase" title="债权审核结论通知"></dm_pannel_d_g_list>

        <dm_pannel_d_g_list :cf="cfG25" class :doc="docCase" title="债权审核更正说明"></dm_pannel_d_g_list>

        <dm_pannel_d_g_list :cf="cfG26" class :doc="docCase" title="其他资料"></dm_pannel_d_g_list>
      </el-tab-pane>
      <el-tab-pane label="确定无异议债权" name="tab7" lazy>
        <dm_pannel_d_g_list :cf="cfG27" class :doc="docCase" title="职工债权公示说明"></dm_pannel_d_g_list>

        <dm_pannel_d_g_list :cf="cfG29" class :doc="docCase" title="确认债权"></dm_pannel_d_g_list>

        <dm_pannel_d_g_list :cf="cfG30" class :doc="docCase" title="无异议债权裁定及邮寄"></dm_pannel_d_g_list>

        <dm_pannel_d_g_list :cf="cfG31" class :doc="docCase" title="其他"></dm_pannel_d_g_list>
      </el-tab-pane>
      <el-tab-pane label="终结破产" name="tab8">
        <dm_pannel_d_g_list :cf="cfG32" class :doc="docCase" title="破产终结"></dm_pannel_d_g_list>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>




export default {
  name: "detail_bankruptcy_case",
  mixins: [MIX.base],
  components: {
  },
  props: {
    docDetail: {},//***属性过来的caseId
    cf: {
      default: function () {
        return {};
      }
    }
  },
  data() {



    //变量：{破产案件关联分组列表配置}
    let cfRelGL_BCase = {
      ...PUB.cfRelGList.normal,
      dataTypeParent: "bankruptcy_case",//父级数据类型，缺省的话等于dataType
      dataTypeNameParent: "破产案件",//父级数据类型名称，缺省的话等于dataTypeName

    }

    //变量：{破产案件关联分组文件列表配置}
    let cfGFile = {
      dataType: "file", ...cfRelGL_BCase
    }


    return {
      //第2组配置
      cfEditDialog: {
        listType: "common", //通用型列表-影响urlModify
        cfFormModify: {
          paramAddonInit: {
            _id: null,
            _systemId: "sys_lawyer_case",
            _dataType: "bankruptcy_case"
          }
        }
      },
      cfListPerson: {//管理人-简单列表组件配置
        idKey: "userName", labelKey: "nickName",
        ajax: {
          url: `${PUB.domain}/info/getCommonList`, data: { _systemId: "$all", _dataType: "admin" }
        }
      },


      ready: false,
      styleListFile: {
        padding: "10px 0  0 0"
      },
      activeName: 'tab3',
      docCase: {},

      cfPannel1: lodash.cloneDeep(PUB.cfPannel.gray_bar),
      cfRel_sealRecord: util.creatCfRelList({ cfList: PUB.listCF.list_seal_use_record, }),//公章使用记录
      cfRel_involvedCase: util.creatCfRelList({ cfList: PUB.listCF.list_involved_case, }),//涉案信息

      cfRel_creditorRights: util.creatCfRelList({ cfList: PUB.listCF.list_creditor_rights_case, }),//债权表
      cfG1: {
        ...cfGFile, dataTypeName: "管理团队资料",
        column: "g_bankruptcy_file_1", columnCount: "count_bankruptcy_file_1",
      },
      cfG2: {
        ...cfGFile, dataTypeName: "三书及工作制度",
        column: "g_bankruptcy_file_2", columnCount: "count_bankruptcy_file_2",
      },
      cfG3: {
        ...cfGFile, dataTypeName: "工商信息",
        column: "g_bankruptcy_file_3", columnCount: "count_bankruptcy_file_3",
      },
      cfG4: {
        ...cfGFile, dataTypeName: "阅卷申请",
        column: "g_bankruptcy_file_4", columnCount: "count_bankruptcy_file_4",
      },
      cfG5: {
        ...cfGFile, dataTypeName: "涉诉信息",
        column: "g_bankruptcy_file_5", columnCount: "count_bankruptcy_file_5",
      },
      cfG6: {
        ...cfGFile, dataTypeName: "调取人口信息",
        column: "g_bankruptcy_file_6", columnCount: "count_bankruptcy_file_6",
      },
      cfG7: {
        ...cfGFile, dataTypeName: "通知债务人",
        column: "g_bankruptcy_file_7", columnCount: "count_bankruptcy_file_7",
      },
      cfG8: {
        ...cfGFile, dataTypeName: "五查申请",
        column: "g_bankruptcy_file_8", columnCount: "count_bankruptcy_file_8",
      },
      cfG9: {
        ...cfGFile, dataTypeName: "现场照片",
        column: "g_bankruptcy_file_9", columnCount: "count_bankruptcy_file_9",
      },
      cfG10: {
        ...cfGFile, dataTypeName: "债权申报文书",
        column: "g_bankruptcy_file_10", columnCount: "count_bankruptcy_file_10",
      },
      cfG11: {
        ...cfGFile, dataTypeName: "国家机关",
        column: "g_bankruptcy_file_11", columnCount: "count_bankruptcy_file_11",
      },
      cfG12: {
        ...cfGFile, dataTypeName: "自然人及法人",
        column: "g_bankruptcy_file_12", columnCount: "count_bankruptcy_file_12",
      },
      cfG13: {
        ...cfGFile, dataTypeName: "阅卷图片",
        column: "g_bankruptcy_file_13", columnCount: "count_bankruptcy_file_13",
      },
      cfG14: {
        ...cfGFile, dataTypeName: "有形-不动产",
        column: "g_bankruptcy_file_14", columnCount: "count_bankruptcy_file_14",
      },
      cfG15: {
        ...cfGFile, dataTypeName: "有形-车辆",
        column: "g_bankruptcy_file_15", columnCount: "count_bankruptcy_file_15",
      },
      cfG16: {
        ...cfGFile, dataTypeName: "有形-股权",
        column: "g_bankruptcy_file_16", columnCount: "count_bankruptcy_file_16",
      },
      cfG17: {
        ...cfGFile, dataTypeName: "有形-银行",
        column: "g_bankruptcy_file_17", columnCount: "count_bankruptcy_file_17",
      },
      cfG18: {
        ...cfGFile, dataTypeName: "有形-证券",
        column: "g_bankruptcy_file_18", columnCount: "count_bankruptcy_file_18",
      },
      cfG19: {
        ...cfGFile, dataTypeName: "无形-商标",
        column: "g_bankruptcy_file_19", columnCount: "count_bankruptcy_file_19",
      },
      cfG20: {
        ...cfGFile, dataTypeName: "无形-著作",
        column: "g_bankruptcy_file_20", columnCount: "count_bankruptcy_file_20",
      },
      cfG21: {
        ...cfGFile, dataTypeName: "无形-专利",
        column: "g_bankruptcy_file_21", columnCount: "count_bankruptcy_file_21",
      },
      cfG22: {
        ...cfGFile, dataTypeName: "第一次债会初稿",
        column: "g_bankruptcy_file_22", columnCount: "count_bankruptcy_file_22",
      },
      cfG23: {
        ...cfGFile, dataTypeName: "邮寄页",
        column: "g_bankruptcy_file_23", columnCount: "count_bankruptcy_file_23",
      },
      cfG24: {
        ...cfGFile, dataTypeName: "债权审核结论通知",
        column: "g_bankruptcy_file_24", columnCount: "count_bankruptcy_file_24",
      },
      cfG25: {
        ...cfGFile, dataTypeName: "债权审核更正说明",
        column: "g_bankruptcy_file_25", columnCount: "count_bankruptcy_file_25",
      },
      cfG26: {
        ...cfGFile, dataTypeName: "其他资料",
        column: "g_bankruptcy_file_26", columnCount: "count_bankruptcy_file_26",
      },
      cfG27: {
        ...cfGFile, dataTypeName: "职工债权公示说明",
        column: "g_bankruptcy_file_27", columnCount: "count_bankruptcy_file_27",
      },

      cfG29: {
        ...cfGFile, dataTypeName: "确认债权",
        column: "g_bankruptcy_file_29", columnCount: "count_bankruptcy_file_29",
      },
      cfG30: {
        ...cfGFile, dataTypeName: "无异议债权裁定及邮寄",
        column: "g_bankruptcy_file_30", columnCount: "count_bankruptcy_file_30",
      },
      cfG31: {
        ...cfGFile, dataTypeName: "其他",
        column: "g_bankruptcy_file_31", columnCount: "count_bankruptcy_file_31",
      },
      cfG32: {
        ...cfGFile, dataTypeName: "破产终结",
        column: "g_bankruptcy_file_32", columnCount: "count_bankruptcy_file_32",
      },
      cfG33: {
        ...cfGFile, dataTypeName: "公章相关",
        column: "g_bankruptcy_file_33", columnCount: "count_bankruptcy_file_33",
      },

    };
  },
  methods: {
    //函数：{修改基础信息后的回调函数}
    afterModify: async function (docModify) {
      this.docCase = docModify;

    },
    //函数：{获取案件详情函数}
    async getCaseDoc() {
      let { data } = await axios({  //请求接口
        method: "post", url: `${PUB.domain}/info/commonDetail`,
        data: { _id: this.caseId, _systemId: "$all" } //传递参数
      });
      this.docCase = data.doc;




      let params = { _idRel: this.docCase._id }
      {//处理公章使用记录列表配置
        util.extendObj({ obj: this.cfRel_sealRecord, path: "cfList.formDataAddInit", objAdd: params })
        util.extendObj({ obj: this.cfRel_sealRecord, path: "cfList.objParamAddon.findJson", objAdd: params })
      }

      {//处理涉案信息列表配置
        util.extendObj({ obj: this.cfRel_involvedCase, path: "cfList.formDataAddInit", objAdd: params })
        util.extendObj({ obj: this.cfRel_involvedCase, path: "cfList.objParamAddon.findJson", objAdd: params })
      }


      {//处理债权列表配置
        util.extendObj({ obj: this.cfRel_creditorRights, path: "cfList.formDataAddInit", objAdd: params })
        util.extendObj({ obj: this.cfRel_creditorRights, path: "cfList.objParamAddon.findJson", objAdd: params })
      }

      this.ready = true;

    },

  },
  async created() {
    //这里先设置好这个参数，避免内部的分组列表出异常！！！！
    PUB._paramAjaxAddon = {
      _systemId: "sys_lawyer_case"
    }
    this.caseId = this.$route.query.caseId;//
    if (this.docDetail) {//
      this.caseId = this.docDetail._id
    }
    this.cfEditDialog.cfFormModify.paramAddonInit._id = this.caseId

    this.getCaseDoc(); //调用：{获取案件详情函数}
  }


};
</script>

<style lang="scss" >
</style>