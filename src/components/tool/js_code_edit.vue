<template>
  <div class="out" v-if="docJsCode&&ready">
    <dm_debug_list>
      <dm_debug_item v-model="docJsCode" />
    </dm_debug_list>
    <div class="H46 DPF BC_333 PL15 MB5" style="background:rgb(84, 92, 100);">
      <div class="LH40 C_fff FS20 MR20 FX1">{{docJsCode.title}}</div>
      <div class="PT8 PR15">
        <el-button plain @click="save" size="mini">保存</el-button>
        <el-popover placement="top-start" width="400" trigger="hover">
          <div class style="min-height:400px">
            <dm_list_visit_history :cf="cfListHistory" class="PT10"></dm_list_visit_history>
          </div>
          <el-button slot="reference" icon="el-icon-more" size="mini">历史记录</el-button>
        </el-popover>
        <el-popover placement="top-start" width="460" trigger="hover">
          <div class style="min-height:100px">
            <!-- listJSFile:{{listJSFile}} -->
            <dm_list_flex_res class="MB20" :list="listJSFile" #default="{item}" col="1">
              <div class="DPF">
                <span class="C_f30 FX1">{{item.fileName}}</span>
                
                <el-button plain @click="buildDebugJs(item)" size="mini">生成测试文件</el-button>
                <el-button plain @click="buildProductionJs(item)" size="mini">生成生产文件</el-button>
              </div>
            </dm_list_flex_res>
          </div>
          <el-button slot="reference" icon="el-icon-more" size="mini">生成JS</el-button>
        </el-popover>
        <!-- <el-button plain @click="buildDebugJs" size="mini">生成测试文件</el-button>
        <el-button plain @click="buildProductionJs" size="mini">生成生产文件</el-button>-->
      </div>
    </div>

    <div class="PL10 PR10 PT10">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="当前代码" name="first">
          <!-- <div class="" >docJsCode:{{docJsCode}}</div> -->

          <dm_js_code_curr class v-model="docJsCode.jsCode"></dm_js_code_curr>
        </el-tab-pane>
        <el-tab-pane :label="titleRelJs" name="second">
          <div class="PB8">
            <el-button plain @click="$refs.codeSelectList.showDialog()" size="mini">选择子代码</el-button>
          </div>
          <div class="PL10 PR10 box_scroll">
            <dm_select_list_data
              ref="codeSelectList"
              class
              v-model="docJsCode.relJsCode"
              :cf="cfSelectList"
              @select="afterSelect"
            ></dm_select_list_data>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>


   
  </div>
</template>
<script>
export default {
  mixins: [MIX.base,],
  name: "js_code_edit",//
  props: {
    cf: {
      default: function () {
        return {};
      }
    }
  },
  data() {
    return {
      listJSFile: null,//关联js文件列表
      ready: true,
      HtmlErrMessage: null,//语法错误提示代码
      cfListHistory: {
        dataTypeDict: "js_code",
        findJsonAddon: { tagPage: "js_code_edit" },
        cfListAddon: {
          comCard: "dm_card_js_code_hs",//卡片组件
        }

      },
      activeName: 'first',
      jsCodeId: null,
      docJsCode: null,
      cfSelectList: {//选择列表配置
        showToolbar: false,//工具栏隐藏
        dataName: "js代码块", valueKey: "_id", labelKey: "title", multiple: true, //多选
        selectJson: { _id: 1, title: 1, }, //需要保留的集合字段
        cfList: util.deepCopy(PUB.listCF.list_js_code),
        componentRow: "dm_com_row_js_code"
      }
    };
  },
  computed: {
    titleRelJs() {
      let count = lodash.get(this.docJsCode, `relJsCode.length`, 0);
      return `子代码(${count})`
    }
  },
  watch: {
    //监听jsCodeId变化（切换历史代码）
    "$route.query.jsCodeId": function (newUrl, oldUrl) {
      window.location.reload();//函数调用：{重载页面}
    },
    deep: true
  },
  methods: {



    //函数：{生成生产js文件函数}
    buildProductionJs: async function (doc) {

      let clickStatus = await this.$confirm("将生成新版本Js文件并上传七牛云，确定操作？").catch(() => { });
      if (clickStatus != "confirm") return
      let { _id, fileName } = doc
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
    buildDebugJs: async function (doc) {

      let { _id, fileName } = doc
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
      let { relJsCode, jsCode } = this.docJsCode
      await axios({//修改接口
        method: "post", url: `${PUB.domain}/info/commonModify`,
        data: {
          _id: this.jsCodeId, _systemId: "$all", _dataType: "js_code",
          _data: { relJsCode, jsCode }
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
    //函数：{获取js代码块详情函数}
    getDoc: async function () {

      this.jsCodeId = this.$route.query.jsCodeId;//
      if (!this.jsCodeId) return

      let { data } = await axios({  //请求接口
        method: "post", url: `${PUB.domain}/info/commonDetail`,
        data: { _id: this.jsCodeId, _systemId: "$all" } //传递参数
      });
      this.docJsCode = data.doc;

      //变量：{ajax添加访客记录函数}***
      util.ajaxAddVisitRecord({ tagPage: "js_code_edit", dataId: this.jsCodeId, })
      this.ready = true;

    },
    //函数：{获取关联js文件列表}
    getCodeForJsFile: async function () {

      this.jsCodeId = this.$route.query.jsCodeId;//
      if (!this.jsCodeId) return

      let { data } = await axios({  //请求接口
        method: "post", url: `${PUB.domain}/info/getCodeForJsFile`,
        data: { jsCodeId: this.jsCodeId, } //传递参数
      });
      this.listJSFile = data.listFile;


    },
  },
  created() {
    this.initCF()//调用：{初始化组件配置函数}
    this.getDoc(); //调用：{获取demo详情函数}
    this.getCodeForJsFile(); //调用：{获取关联js文件列表}
  },

  mounted() {
    PUB._paramAjaxAddon = { _systemId: "sys_api" }
    this.$emit("inited", { vm: this }); //将当前对象抛出
    util.changeFavicon(`//qn-dmagic.dmagic.cn/202007171036123030_68484_js_code.png`)//函数：{改变网页标题图标的函数}
  }
};
</script>
<style scoped>
.box_scroll {
  height: calc(100vh - 55px);
  overflow-y: auto;
}

.out >>> .CodeMirror {
  font-size: 15px;
  height: calc(100vh - 160px);
}

.box_scroll >>> .CodeMirror {
  height: 200px;
}

.error_box {
  margin: 6px 0;
  padding: 5px 6px;
  color: #f56c6c;
  border: 1px #f56c6c solid;
}
</style>