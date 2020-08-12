<template>
  <div class="out">
    <!--demo库弹窗-->
    <el-dialog
      custom-class="n-el-dialog"
      width="95%"
      title="demo仓库"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :append-to-body="true"
      v-bind:visible.sync="showDialogDemolib"
      v-if="showDialogDemolib"
    >
      <el-tabs v-model="activeDemoG" type="card">
        <el-tab-pane :label="g.targetDoc.title" :name="i+''" v-for="(g,i) in listDemo" :key="i">
          <dm_list_flex_res class="MB20" :list="g.sonList" #default="{item}" col="8">
            <div class="data_group">
              <a
                class="link_img"
                target="_blank"
                :href="`#/open/auto_layout?demoId=${item.targetDoc._id}`"
              >
                <img class="WP100 HP100" :src="$lodash.get(item.targetDoc,'album[0]url')" alt />
              </a>
              <div class=" H40  PL5 PR5 OFH">{{item.targetDoc.title}}</div>
              <div class="DPFC">
                <a class="FX1 TAC btn_card " href="javascript:;" @click="selectDemo(item)" style="color:#06c">选择使用</a>

                <a
                  class="FX1 TAC btn_card"
                  target="_blank"
                  :href="`#/open/auto_layout?demoId=${item.targetDoc._id}`"
                >编辑</a>
              </div>
            </div>
          </dm_list_flex_res>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>
<script>
export default {
  mixins: [MIX.base,],
  name: "dialog_select_demo",//
  props: {
    cf: {
      default: function () {
        return {};
      }
    }
  },
  data() {
    return {
      activeDemoG: "0",
      listDemo: null,//demo列表
      showDialogDemolib: false,
    };
  },
  methods: {
    //函数：{关闭弹窗函数}
    hide: async function () {

      this.showDialogDemolib = false;


    },
    //函数：{打开弹窗函数}
    show: async function () {
      if (!this.listDemo) {//如果{listDemo}不存在
        this.ajaxGetDemoLib()//调用：{ajax获取demo库列表函数}
      }
      this.showDialogDemolib = true;


    },
    //函数：{选择一个demo函数}
    selectDemo: async function (doc) {

      let { arrCss = {}, arrHtml = {} } = doc.targetDoc
      let type = util.type(arrCss);//变量：{类型}
      let type2 = util.type(arrHtml);//变量：{类型}
      if (type !== "array") {//如果不是对象
        return this.$message.error('arrCss格式错误');
      }
      if (type2 !== "array") {//如果不是对象
        return this.$message.error('arrHtml格式错误');
      }
      this.$emit("select_demo", { doc: doc.targetDoc }); //将当前对象抛出

    },

    //函数：{ajax获取demo库列表函数}
    ajaxGetDemoLib: async function () {
      let {
        data: { list }
      } = await axios({
        //请求接口
        method: "post", url: `${PUB.domain}/info/getCommonGroupList`,
        data: {
          _systemId: "$all", groupId: "5eeae46a8ef1562cfc29ecc3", arrType: ["group", "front_demo"],
          $projectTgAddon: { arrCss: "$targetDoc._data.arrCss", arrHtml: "$targetDoc._data.arrHtml", }
        }
      });
      this.listDemo = list
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
  async created() {
    this.initCF()//调用：{初始化组件配置函数}

  },
  mounted() {
    this.$emit("inited", { vm: this }); //将当前对象抛出
  }
};
</script>
<style scoped>
.data_group {
  border: 1px #ddd solid;
  border-radius: 5px;
}
.btn_card {
  height: 30px;
  line-height: 30px;
  border-top: 1px solid #f0f0f0;
  color: #666;
}
.btn_card:nth-child(2) {
  border-left: 1px solid #f0f0f0;
}
.btn_card:hover {
  color: #f90;
}

.link_img {
  display: block;
  width: 150px;
  height: 120px;
  margin: 0 auto;
}

.link_img img {
  object-fit: scale-down;
}
</style>