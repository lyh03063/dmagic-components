<template>
  <div>
    <div class="float-tips" v-if="$sys.env == 'dev'">非生产</div>
    <el-container>
      <el-header class="home-head-box">
        <el-row>
          <div class="FL MT13 C_fff MR10 FS24">{{ groupDoc.title }}</div>

          <div class="FR MT20 C_fff"></div>
          <div class="FR DPFC">
            <div class="PT10 MR20">
              <el-input
                style="width: 160px"
                @keypress.enter.native="searchData"
                placeholder="专题内搜索"
                v-model="keyword"
              >
                <i
                  slot="suffix"
                  class="Cur1 el-input__icon el-icon-search"
                  @click="searchData"
                ></i>
              </el-input>
            </div>
            <a
              class="MR10"
              target="_blank"
              style="color: #fff"
              :href="`#/detail_group?groupId=${$route.params.gid}`"
              >编辑导航</a
            >

            <a
              class="MR10"
              target="_blank"
              style="color: #fff"
              :href="`#/list_group_common?gid=${$route.params.gid}`"
              >树状专题</a
            >

            <a
              class="MR10"
              style="color: #999"
              href="javascript:;"
              @click="updateSearchCache"
              >更新搜索缓存</a
            >

            <dm_user_role></dm_user_role>
          </div>
        </el-row>
      </el-header>
    </el-container>

    <dm_debug_list>
      <dm_debug_item v-model="listMenu" text="listMenu" />
    </dm_debug_list>

    <div class="DPF">
      <div class="g-left-box">
        <dm_left_menu :cf="listMenu"></dm_left_menu>
      </div>
      <div class="g-right-box" v-if="readyGroup">
        <!--横切导航-->
        <dm_tab_bar class="MT10 ML10"></dm_tab_bar>

        <!-- <div class="">$route.meta.keepAlive-{{ $route.meta.keepAlive }}</div> -->
        <!-- 注意这里的keep-alive是有条件的，要在路由里设置meta.keepAlive为true，另外之前的key也必须保留，否则只有参数变化时不更新 -->
        <keep-alive v-if="$route.meta.keepAlive">
          <router-view style="padding: 10px" :key="routerKey"></router-view>
        </keep-alive>
        <router-view
          v-else
          style="padding: 10px"
          :key="routerKey"
        ></router-view>
      </div>
    </div>

    <div class="PSF B0 L0 BC_fff W200 H20 LH_20 C_999 FS12 PL10">
      系统编号：{{ systemId }}
    </div>
  </div>
</template>

<script>
export default {
  mixins: [MIX.base],
  components: {},
  props: {},
  data() {
    return {
      keyword: "",
      readyGroup: false,
      systemId: null, //系统Id
      routerKey: "key1",
      listMenu: null,
      groupDoc: {},
      groupId: null,
    };
  },
  watch: {
    $route: function (newUrl, oldUrl) {
      this.setActiveMenu(); //调用：{设置聚焦菜单函数}
    },
    // immediate: true,
    deep: true,
  },

  methods: {
    //函数：{更新搜索缓存函数}
    async updateSearchCache() {
      const loading = this.$loading({//打开全局锁屏loading
        lock: true,
        text: "执行中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });

      let { data } = await axios({
        //请求接口
        method: "post",
        url: `${PUB.domain}/info/updateArrAncestors`,
        data: {
          _systemId: "sys_api",
          gid: this.groupId,
        },
      });
      loading.close(); //关闭loding
      this.$message.success('更新搜索缓存成功');



    },
    //函数：{关键词查询函数}
    searchData() {
      this.$router.push({ name: "search_result_for_group", query: { keyword: this.keyword } });
      // location.href = `#/study_home/search_result?keyword=${this.keyword}`;
    },
    //函数：{设置聚焦菜单函数}
    async setActiveMenu() {
      this.routerKey = document.URL; //路由key，确保路由能响应
      await util.timeout(500); //延迟
      this.$store.commit("changeActiveMenu", this.$route.query.groupId);
    },
    //函数：{分组数据转换菜单数据函数}
    convertMenuData(list) {











      return list.map((doc) => {
        let { targetDoc, sonList } = doc;

        let { _id, title, dataType } = targetDoc;

        let icon = lodash.get(DYDICT.dictDataType, `${dataType}.icon`, "el-icon-top-right");

        let jsonBack = { index: _id, title, icon }; //返回的数据对象-菜单配置项

        //Q1：{sonList}存在
        if (util.isNotEmptyArr(sonList)) {
          jsonBack.menuItem = this.convertMenuData(sonList); //调用：{分组数据转换菜单数据函数}-递归
          //Q2：否则-加上路由地址
        } else {
          jsonBack.route = `/group_home/${this.groupId}/detail_group?groupId=${_id}`;
        }

        return jsonBack;
      });
    },
    //函数：{ajax获取列表函数}
    async getDataList() {
      let {
        data: { list },
      } = await axios({
        //请求接口
        method: "post",
        url: `${PUB.domain}/info/getCommonGroupList`,
        data: {
          _systemId: "$all",
          groupId: this.groupId,
          arrType: ["group"],
        },
      });
      this.listMenu = this.convertMenuData(list); //调用：{分组数据转换菜单数据函数}-递归
    },
    async getGroupDoc() {
      let { data } = await axios({
        //请求接口
        method: "post",
        url: `${PUB.domain}/info/commonDetail`,
        data: {
          _id: this.groupId,
          _systemId: "$all",
        }, //传递参数
      });
      this.groupDoc = data.doc;
      document.title = this.groupDoc.title; //修改浏览器标题栏文字
      this.systemId = this.groupDoc._systemId;

      //修改PUB._paramAjaxAddon***
      PUB._paramAjaxAddon = { _systemId: this.systemId || "sys_apiaaaa" };



      if (this.groupDoc.iconSrc) {
        //如果{icon地址}存在
        util.changeFavicon(this.groupDoc.iconSrc); //函数：{改变网页标题图标的函数}
      }
    },
  },
  async created() {
    this.keyword = this.$route.query.keyword;//初始化关键词
    this.groupId = this.$route.params.gid;
    await this.getGroupDoc(); //调用：{获取分组详情函数}
    await this.getDataList(); //调用：{ajax获取列表函数}
    this.setActiveMenu(); //调用：{设置聚焦菜单函数}-要等菜单加载完

    PUB.menuTabBarKey = `group_${this.groupId}`//横切导航的key
    this.readyGroup = true
  },
};
</script>

<style scoped>
.head {
  background-color: rgb(84, 92, 100);
  padding: 0 10px;
}
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
