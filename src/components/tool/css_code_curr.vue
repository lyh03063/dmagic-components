<template>
  <div class>
    <div class="MB8">
      <el-button plain @click="formatCss" size="mini">格式化Css</el-button>
      <!-- <el-button plain @click="checkSyntax" size="mini">Css语法检测</el-button> -->
      <slot name="toobar_addon"></slot>
      <!--语法错误提示-->
      <div
        class="error_box"
        v-if="HtmlErrMessage"
        v-html="HtmlErrMessage"
      ></div>
    </div>

    <dm_code
      class="FX1"
      v-model="valueNeed"
      ref="codeMCurr"
      :cf="cfCM"
    ></dm_code>
  </div>
</template>


   
  </div>
</template>
<script>
export default {
  mixins: [MIX.base, MIX.form_item_new],
  name: "css_code_curr",//
  props: {

    cf: {
      default: function () {
        return {};
      }
    }
  },
  data() {
    return {
      cfCM: {
        cfCodeMirror: {
          mode: "text/css",
        }
      },
      ready: true,
      HtmlErrMessage: null,//语法错误提示代码

    


    };
  },


  methods: {
    //函数：{代码语法检测函数}
    checkSyntax: async function () {
      this.HtmlErrMessage = "";
      let CM = this.$refs.codeMCurr.$refs.codeM.codemirror//获取到codemirror对象
      let code = CM.getValue()

      let { data } = await axios({//请求接口
        method: "post", url: `${PUB.domain}/i83_jshint`,
        data: { P4: this.valueNeed }
      });

      let { HtmlErrMessage } = data
      if (HtmlErrMessage) {//Q1:{000}
        this.HtmlErrMessage = HtmlErrMessage
        return false;

      } else { //Q2:{000}

        this.$message.success('代码正确');
        return true;
      }



    },
    //函数：{格式化JS函数}
    formatCss: async function () {
     
      let CM = this.$refs.codeMCurr.$refs.codeM.codemirror//获取到codemirror对象
      let codeS = CM.getValue()

      let { data } = await axios({//请求接口
        method: "post", url: `${PUB.domain}/formatCode`,
        data: { code: this.valueNeed,type:"css" }
      });

      let { code } = data
      CM.setValue(code)

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

  },
  created() {
    this.initCF()//调用：{初始化组件配置函数}


  },

  mounted() {
    this.$emit("inited", { vm: this }); //将当前对象抛出

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

.error_box {
  margin: 6px 0;
  padding: 5px 6px;
  color: #f56c6c;
  border: 1px #f56c6c solid;
}
</style>