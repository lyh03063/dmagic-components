<template>
  <div>
    <div class="float-tips" v-if="$sys.env=='dev'">非生产XXX</div>
    <div class v-if="ready">
      <div class v-if="systemDoc._id">
        <el-container>
          <el-header class="home-head-box">
            <el-row>
              <div class="FL MT13 C_fff MR10" v-if="systemDoc.logoSrc">
                <img class="W60" :src="systemDoc.logoSrc" alt />
              </div>
              <div class="FL MT13 C_fff MR10 FS24">{{systemDoc.title}}</div>
              <div class="FR MT20 C_fff">
                <dm_user_role></dm_user_role>
              </div>
            </el-row>
          </el-header>
        </el-container>

        <dm_debug_list>
          <dm_debug_item v-model="systemDoc" />
        </dm_debug_list>

        <div class="DPF">
          <div class="g-left-box">
            <dm_left_menu :cf="listMenu"></dm_left_menu>
          </div>
          <div class="g-right-box">
            <keep-alive>
              <router-view :key="routerKey" style="padding:10px"></router-view>
            </keep-alive>
          </div>
        </div>
        <div class="PSF B0 L0 BC_fff W200 H20 LH_20 C_999 FS12 PL10">{{sysId}}</div>
      </div>
      <div class="LH50 TAC" v-else>没有对应的系统</div>
    </div>
    <dm_loading height="200" v-else></dm_loading>
  </div>
</template>

<script>
export default {
  mixins: [MIX.base],
  components: {

  },
  props: {
    ttt: {},
    // systemDoc: {}//从router-view传过来！！！
  },
  data() {
    return {
      ready: false,
      sysId: null,//系统Id
      routerKey: "key1",
      listMenu: [],
      systemDoc: {}//从router-view传过来！！！

    };
  },
  watch: {
    $route: function (newUrl, oldUrl) {
      this.setActiveMenu(); //调用：{设置聚焦菜单函数}
    },
    // immediate: true,
    deep: true
  },

  methods: {
    //函数：{设置聚焦菜单函数}
    async setActiveMenu() {
      this.routerKey = document.URL; //路由key，确保路由能响应
      await util.timeout(500); //延迟

    },

    //函数：{ajax获取系统doc函数}
    async getDocSystem() {
      let { data: { doc } } = await axios({
        //请求接口
        method: "post",
        url: `${PUB.domain}/info/commonDetail`,
        data: {
          findJson: { systemId: this.sysId },

          _dataType: "system",
          _systemId: "$all"
        } //传递参数
      });
      this.systemDoc = doc
      this.ready = true;
      if (this.systemDoc.iconSrc) {//如果{icon地址}存在
        util.changeFavicon(this.systemDoc.iconSrc)//函数：{改变网页标题图标的函数}
      }
      this.listMenu = this.systemDoc.treeDataMenu || []

      PUB.homeGroupId = this.systemDoc.homeGroupId
      PUB.systemName = this.systemDoc.title
      document.title = this.systemDoc.title

    },

  },
  async created() {

    this.sysId = this.$route.params.sysId;
    PUB._paramAjaxAddon = {
      _systemId: this.sysId
    }
    await this.getDocSystem()//调用：{ajax获取系统doc函数}
    this.ready = true;

  }
};
</script>


<style scoped>
.g-left-box {
  min-width: 201px;
}

.g-right-box {
  /* border: 1px #f00 solid; */
  flex: 1;
}

.home-head-box {
  background-color: rgb(84, 92, 100);
}
.el-header {
  background-color: rgb(84, 92, 100) !important;
}

</style>
