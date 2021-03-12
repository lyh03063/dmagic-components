<template>
  <div class>
    <div class="DPF ML5">
      <div class="Cur1 MR4" @click="unfold" v-if="countRelJs">
        <i class="el-icon-caret-right" :class="{ Rotate90: isShowSon }"></i>
        <span class="C_999">[{{ countRelJs }}]</span>
      </div>
      <div class>
        <span class="C_3a0 FS14">{{ docComplete.title }}</span>

        <span v-if="docComplete.jsCode" class="C_999 FS12"
          >：[{{ bytes(docComplete.jsCode) }}b]</span
        >
        <span v-if="docComplete.desc" class="C_333 FS14"
          >：{{ docComplete.desc }}</span
        >

        <el-link
          type="primary"
          @click="isShowEditJs = true"
          v-if="!isShowEditJs"
          class="ML10"
          >编辑</el-link
        >

        <el-link
          type="primary"
          target="_blank"
          :href="`#/js_code_edit?jsCodeId=${docComplete._id}`"
          class="ML10"
          >新窗口编辑</el-link
        >

        <el-link @click="fnSelect" class="ML10 FS13">选择子代码</el-link>
      </div>
    </div>
    <div class="PL8 PR8 PB8" v-if="isShowEditJs">
      <div class="" v-if="docComplete.jsCodeType == 1">
        <el-button plain @click="isShowEditJs = false" size="mini"
          >关闭</el-button
        >
        <el-button plain @click="ajaxSaveACode" size="mini">保存</el-button>
        <!--vue组件表单组件-->
        <dm_form_vue_sfc class="" :docComplete="docComplete"></dm_form_vue_sfc>
      </div>
      <dm_js_code_curr
        class
        v-model="docComplete.jsCode"
        ref="jsCodeCurr"
        v-else
      >
        <template #toobar_addon>
          <el-button plain @click="isShowEditJs = false" size="mini"
            >关闭</el-button
          >
          <el-button plain @click="saveACode" size="mini" :class="{not_save:notSave}">保存</el-button>
        </template>
      </dm_js_code_curr>
    </div>
    <!-- v-if="isShowSon&&docComplete.relJsCode" -->
    <div class="BC_fff PT1 PL8 PR8 PB1" v-show="isShowSon">
      <!--递归-->
      <dm_select_list_data
        v-model="docComplete.relJsCode"
        :cf="cf"
        @son_change="son_change"
        @inited="({ vm }) => (vm_select_list_data = vm)"
      ></dm_select_list_data>
    </div>
  </div>
</template>

<script>
export default {
  name: "com_row_js_code",
  props: {

    doc: {},
    docComplete: {
      default: function () {
        return {};
      }
    },
    cf: {
      default: function () {
        return {};
      }
    }
  },
  components: {},

  data() {

    return {
      vm_select_list_data: null,
      isShowEditJs: false,//是否显示js代码块编辑表单
      isShowSon: false,
      cfCode: {
        cfCodeMirror: {}

      },
      notSave:false//未保存
    };
  },
  computed: {
    //  TODO：computed-bytes
    bytes: function () {
      let fn = function (str) {
        return util.countByte(str)
      }
      return fn

    },
    countRelJs: function () {
      return lodash.get(this.docComplete, `relJsCode.length`);
    },



  },
  watch: {
    "docComplete.jsCode": {
      handler(newVal, oldVal) {
        console.log('docComplete.jsCode');
        this.notSave=true;//“未保存”状态
      },
    
    }
  },
  methods: {

    //函数：{选择函数}
    fnSelect: async function () {
      this.vm_select_list_data.showDialog()//打开选择列表弹窗

    },
    //函数：{显示js代码块编辑表单函数}
    saveACode: async function () {

      let flag = await this.$refs.jsCodeCurr.checkSyntax();
      if (!flag) {
        let clickStatus = await this.$confirm("代码语法校验错误，确定保存？").catch(() => { });
        if (clickStatus != "confirm") return

      }
      this.ajaxSaveACode()//调用：{ajax保存一块代码函数}
      this.notSave=false;//清除“未保存”状态


    },
    //函数：{ajax保存一块代码函数}
    ajaxSaveACode: async function () {
      let { jsCode, objVCom } = this.docComplete
      await axios({//修改接口-当前父任务
        method: "post", url: `${PUB.domain}/info/commonModify`,
        data: {
          _id: this.docComplete._id, _systemId: "$all",
          _data: { jsCode, objVCom }
        }
      });
      this.$message.success('保存成功!');

    },

    //函数：{展开函数}
    unfold: async function () {
      this.isShowSon = !this.isShowSon;

    },
    //函数：{子级数据变动函数}
    son_change: async function (dataSon) {
      this.saveDataFromSon(dataSon)//调用：{保存当前数据函数}

    },

    //函数：{保存当前数据函数}
    saveDataFromSon: async function (dataSon) {
      await axios({//修改接口-当前父任务
        method: "post", url: `${PUB.domain}/info/commonModify`,
        data: {
          _id: this.docComplete._id, _systemId: "$all",
          _data: { relJsCode: dataSon }
        }
      });

    },
  },
  created() {






  }
};
</script>

<style scoped>
.not_save{
  outline: 2px #f60 solid;
}
</style>
