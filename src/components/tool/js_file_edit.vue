<template>
  <div class="out" v-if="docJs">
    <dm_debug_list>
      <dm_debug_item v-model="docJs" />
    </dm_debug_list>
    <div class="H46 DPF BC_333 PL15 MB5" style="background:rgb(84, 92, 100);">
      <div class="LH40 C_fff FS20 MR20 FX1">{{docJs.title}}</div>
      <div class="PT8 PR15">
        <el-button plain @click="save" size="mini">保存</el-button>
        <el-button plain @click="buildDebugJs" size="mini">生成测试文件</el-button>
        <el-button plain @click="buildProductionJs" size="mini">生成生产文件</el-button>
      </div>
    </div>

    <div class="PL10 PR10 box_scroll">
      <dm_select_list_data class v-model="docJs.relJsCode" :cf="cfSelectList" @select="afterSelect"></dm_select_list_data>
    </div>
  </div>
</template>
<script>
export default {
  mixins: [MIX.base,],
  name: "js_file_edit",//
  props: {
    cf: {
      default: function () {
        return {};
      }
    }
  },
  data() {
    return {
      jsFileId: null,
      docJs: null,
      cfSelectList: {//选择列表配置
        showToolbar: false,//工具栏隐藏
        dataName: "js代码块", valueKey: "_id", labelKey: "title", multiple: true, //多选
        selectJson: { _id: 1, title: 1, }, //需要保留的集合字段
        cfList: util.deepCopy(PUB.listCF.list_js_code),
        componentRow: "dm_com_row_js_code"
      }
    };
  },
  methods: {

    //函数：{生成生产js文件函数}
    buildProductionJs: async function() {

         let clickStatus = await this.$confirm("将生成新版本Js文件并上传七牛云，确定操作？").catch(() => { });
        if (clickStatus != "confirm") return
        let { _id, fileName } = this.docJs
        const loading = this.$loading({
          lock: true, text: "执行中，请勿关闭", spinner: "el-icon-loading", background: "rgba(0, 0, 0, 0.7)"
        });

        let { data } = await axios({//请求接口
          method: "post", url: `${PUB.domain}/info/builtJSFile`,
          data: { _id, "uplloadQiNiu": true, "transES5": true }
        });
        loading.close(); //关闭loding
        if (data.code == 0) {//如果ok
          let { result } = data
          this.$alert(`生成文件成功:${result.downloadDomain}/${result.fileName}`, {
            confirmButtonText: '确定',
          });
        } else {
          this.$message.error(data.error);
        }
      
    },
    //函数：{生成测试js文件函数}
    buildDebugJs: async function () {
      let { _id, fileName } = this.docJs
      const loading = this.$loading({
        lock: true, text: "执行中，请勿关闭", spinner: "el-icon-loading", background: "rgba(0, 0, 0, 0.7)"
      });
      let { data } = await axios({//请求接口
        method: "post", url: `${PUB.domain}/info/builtJSFile`,
        data: { _id, "uplloadQiNiu": false }
      });
      loading.close(); //关闭loding
      if (data.code == 0) {//如果ok
        this.$message.success(`生成文件成功:${PUB.domain}/built_js/${fileName}`, {
          confirmButtonText: '确定',
        });
      } else {
        this.$message.error(data.error);
      }
    },
    //函数：{保存数据函数}
    save: async function () {
      let { relJsCode } = this.docJs
      await axios({//修改接口-当前父任务
        method: "post", url: `${PUB.domain}/info/commonModify`,
        data: {
          _id: this.jsFileId, _systemId: "$all", _dataType: "js_file",
          _data: { relJsCode }
        }
      });
      this.$message.success('修改成功');

    },
    //函数：{000函数}
    afterSelect: async function () {


    },

    //函数：{初始化组件配置函数}
    initCF: async function () {

      let cfAAA = lodash.get(this.cf, `cfAAA`, {});
      let cfAAADefault = {
        aaaa: "11111"
      }
      util.setObjDefault(cfAAA, cfAAADefault);
      util.setObjDefault(this.cf, {
        // isShowSearchForm: false,
        cfAAA
      });

    },
    //函数：{获取js文件详情函数}
    getDoc: async function () {

      let { data } = await axios({  //请求接口
        method: "post", url: `${PUB.domain}/info/commonDetail`,
        data: { _id: this.jsFileId, _systemId: "$all" } //传递参数
      });
      this.docJs = data.doc;

    },
  },
  created() {
    this.initCF()//调用：{初始化组件配置函数}
    this.jsFileId = this.$route.query.jsFileId;//
    if (this.jsFileId) {//
      this.getDoc(); //调用：{获取demo详情函数}
    }

  },

  mounted() {
    PUB._paramAjaxAddon={ _systemId: "sys_api" }
    this.$emit("inited", { vm: this }); //将当前对象抛出
    util.changeFavicon(`//qn-dmagic.dmagic.cn/202007171036012222_9387_js_file.png`)//函数：{改变网页标题图标的函数}

  }
};
</script>
<style scoped>
.box_scroll {
  height: calc(100vh - 55px);
  overflow-y: auto;
  
}
</style>