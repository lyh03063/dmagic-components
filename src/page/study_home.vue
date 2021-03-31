<template>
  <div>
    <div class="float-tips" v-if="$sys.env=='dev'">非生产</div>
    <div class="DPF head">
      <div class="MT13 C_fff MR10" v-if="logoUrl">
        <img class="W200 H36" src="http://www.dmagic.cn/images/IconS/IconS_2578.png" alt />
      </div>

      <div class="MT17 FS24 C_fff MR50">{{systemName}}</div>
      <el-menu
        :default-active="activeMenuIndex"
        class="el-menu-demo FX1"
        mode="horizontal"
        :router="true"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="study_user" route="study_user">我的</el-menu-item>

        <el-menu-item index="note" route="detail_group_g_card?groupId=5e19d9fff3c94a3971f45595">知识点</el-menu-item>
        <el-menu-item
          index="vedio"
          route="detail_group_g_card?groupId=5e5f5b85a56e720593572a90"
        >视频教程</el-menu-item>
        <el-menu-item
          index="demo"
          route="detail_group_g_card?groupId=5e5f49b5a56e720593572973"
        >演示demo</el-menu-item>

        <el-submenu index="frontAPI">
          <template slot="title">前端API</template>
          <el-menu-item index="html_api" route="list_common?type=html_api">Html-API</el-menu-item>
          <el-menu-item index="css_api" route="list_common?type=css_api">Css-API</el-menu-item>
          <el-menu-item index="js_api" route="list_common?type=js_api">Javascript-API</el-menu-item>
        </el-submenu>
        <el-menu-item
          index="thirdPart"
          route="detail_g_card_link?groupId=5e18821555a1e947e7bec88d"
        >第三方资源</el-menu-item>
      </el-menu>
      <div class="PT10 MR20">
        <el-input
          style="width:160px"
          @keypress.enter.native="searchData"
          placeholder="请输入内容"
          v-model.trim="keyword"
        >
          <i slot="suffix" class="Cur1 el-input__icon el-icon-search" @click="searchData"></i>
        </el-input>
      </div>

      <div class="FR MT20 C_fff">
        <dm_user_role></dm_user_role>
      </div>
    </div>

    <dm_debug_list>
      <dm_debug_item v-model="activeMenuIndex" text="activeMenuIndex" />
    </dm_debug_list>
    <keep-alive>
      <router-view :key="groupId" style="padding:10px"></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  mixins: [MIX.base],
  components: {

  },
  props: {},
  data() {
    return {
      keyword: "",
      logoUrl: PUB.logoUrl,
      systemName: PUB.systemName,
      groupId: null,
      activeMenuIndex: "html_api",
      //用于菜单聚焦的数据字典
      mapActiveMenu: {
        "5e19d9fff3c94a3971f45595": "note",
        "5e5f49b5a56e720593572973": "demo",
        "5e5f5b85a56e720593572a90": "vedio",
        "5e18821555a1e947e7bec88d": "thirdPart",
        "/study_home/list_common?type=css_api": "css_api",
        "/study_home/list_common?type=html_api": "html_api",
        "/study_home/list_common?type=js_api": "js_api",
        "/study_home/study_user": "study_user"
      }
    };
  },
  watch: {
    $route: function (newUrl, oldUrl) {
      if (newUrl != oldUrl) {
        this.setActiveMenu(); //调用：{设置聚焦菜单函数}
      }
    },
    immediate: true,
    deep: true
  },

  methods: {
    //函数：{关键词查询函数}
    searchData() {
    
       this.$router.push({ name: "study_search_result",query:{keyword:this.keyword} });
    },
    //函数：{设置聚焦菜单函数}
    setActiveMenu() {
      this.groupId = this.$route.query.groupId;
      //如果{groupId}存在
      if (this.groupId) {
        // this.activeMenuIndex = this.mapActiveMenu[this.groupId];
        this.activeMenuIndex = this.mapActiveMenu[this.groupId];
      } else {
        let key = this.$route.fullPath;
        this.activeMenuIndex = this.mapActiveMenu[key]
      }

    }
  },
  created() {
    this.setActiveMenu(); //调用：{设置聚焦菜单函数}
    document.title = `前端学习网`; //修改浏览器标题栏文字
    util.changeFavicon(`http://qn-dmagic.dmagic.cn/icon_study.png`)//函数：{改变网页标题图标的函数}
    PUB._paramAjaxAddon = { _systemId: "sys_api" }
    this.keyword = this.$route.query.keyword;//初始化关键词
  }
};
</script>


<style scoped>
.head {
  background-color: rgb(84, 92, 100);
  padding: 0 10px;
}


</style>
