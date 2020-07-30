<template>
  <div class="out">
    <!--demo库弹窗-->
    <el-dialog
      custom-class="n-el-dialog"
      width="95%"
      title="选择Html元素"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :append-to-body="true"
      v-bind:visible.sync="showDialog"
      v-if="showDialog"
    >
      <el-tabs v-model="activeDemoG" type="card">
        <el-tab-pane :label="g.targetDoc.title" :name="i+''" v-for="(g,i) in listDemo" :key="i">
          <dm_list_flex_res class="MB20" :list="g.sonList" #default="{item}" col="6">
            <div class="data_group">
              <div class="TAC P8">
                <span class="FWB C_3a0">{{item.targetDoc.title}}</span>
                <span class="C_999">{{item.targetDoc.label||item.targetDoc.desc}}</span>
              </div>

              <div class="DPFC">
                <a class="FX1 TAC btn_card" href="javascript:;" @click="select(item)">选择</a>

                <a
                  class="FX1 TAC btn_card"
                  target="_blank"
                  :href="item.targetDoc.link"
                  v-if="item.targetDoc.link"
                >查看手册</a>
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
  name: "dialog_html_tag",//
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
      showDialog: false,
    };
  },
  methods: {
    //函数：{关闭弹窗函数}
    hide: async function () {

      this.showDialog = false;


    },
    //函数：{打开弹窗函数}
    show: async function () {
      if (!this.listDemo) {//如果{listDemo}不存在
        this.ajaxGetDemoLib()//调用：{ajax获取demo库列表函数}
      }
      this.showDialog = true;


    },
    //函数：{选择一个demo函数}
    select: async function (doc) {

      let { arrCss = {}, arrHtml = {} } = doc.targetDoc

      this.$emit("select", { doc: doc.targetDoc }); //将当前对象抛出

    },

    //函数：{ajax获取demo库列表函数}
    ajaxGetDemoLib: async function () {
      let {
        data: { list }
      } = await axios({
        //请求接口
        method: "post", url: `${PUB.domain}/info/getCommonGroupList`,
        data: {
          _systemId: "$all", groupId: "5f126ae54876e32bc48f9e21", arrType: ["group", "html_api"],
          $projectTgAddon: { label: "$targetDoc._data.label", }
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
.btn_card:hover{
  color:#f90
}
</style>