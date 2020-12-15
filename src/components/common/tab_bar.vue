<template>
  <div class="out">
    <dm_debug_list>
      <dm_debug_item v-model="arrTabs" />
    </dm_debug_list>

    <!-- {{ editableTabsValue }} -->
    <el-tabs
      v-model="editableTabsValue"
      type="card"
      closable
      @edit="handleTabsEdit"
      @tab-click="fnTabClick"
    >
      <el-tab-pane
        :key="item.name"
        v-for="item in arrTabs"
        :label="item.title"
        :name="item.fullPath"
        :fullPath="item.fullPath"
      >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  mixins: [MIX.base],
  name: "tab_bar", //
  props: {
    cf: {
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      editableTabsValue: "/system/sys_chendongxu/manage/list_common?type=goods",
      arrTabs: [
        // {
        //   title: "商品",
        //   name: "1",
        //   fullPath: "/system/sys_chendongxu/manage/list_common?type=goods",
        // },
        // {
        //   title: "商品分类",
        //   name: "2",
        //   fullPath: "/system/sys_chendongxu/manage/list_common?type=goods_category",
        // },
      ],
      tabIndex: 2,
    };
  },
  watch: {
    $route: async function (newVal, oldVal) {
      let { fullPath } = newVal;
      this.activeTab(fullPath); //调用：{聚焦tab函数}
    },
    // immediate: true,
    deep: true,
  },
  methods: {
    //函数：{聚焦tab函数}
    activeTab: async function (fullPath) {
      let target = this.arrTabs.find((d) => d.fullPath == fullPath); //当前路由匹配的tab
      if (target) {
      } else {
        //用nextTick不行
        await util.timeout(120); //延迟--为了拿到最新的activeMenuName

        let title = this.$store.state.activeMenuName;
        if (!title) return;
        this.arrTabs.push({ title, fullPath });
      }
      if (PUB.menuTabBarKey) {//如果{存储Key}存在
        util.setLocalStorageObj(PUB.menuTabBarKey, this.arrTabs); //调用：{设置一个对象到LocalStorage}
      }
      console.log(`this.$route:###`, this.$route);

      this.editableTabsValue = fullPath;
    },
    //函数：{tab点击函数}
    fnTabClick: async function (vmTab) {
      let { fullPath } = vmTab.$attrs;
      console.log(`fullPath:`, fullPath);
      this.$router.push({ path: fullPath }); //跳转
    },
    handleTabsEdit(targetPath, action) {
      console.log(`action:`, action);
      console.log(`targetPath:`, targetPath);
      //如果是删除事件
      if (action === "remove") {
        let tabs = this.arrTabs;
        let activePath = this.editableTabsValue;
        if (activePath === targetPath) {
          tabs.forEach((tab, index) => {
            if (tab.fullPath === targetPath) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activePath = nextTab.fullPath;
              }
            }
          });
        }

        this.editableTabsValue = activePath;
        this.arrTabs = tabs.filter((tab) => tab.fullPath !== targetPath);//过滤
        util.setLocalStorageObj(PUB.menuTabBarKey, this.arrTabs); //调用：{设置一个对象到LocalStorage}
      }
    },
  },
  async created() { },
  mounted() {
    this.$emit("inited", { vm: this }); //将当前对象抛出
    let { fullPath } = this.$route;

    console.log(`PUB.menuTabBarKey:`, PUB.menuTabBarKey);
    let arrMenu = util.getLocalStorageObj(PUB.menuTabBarKey); //调用：{从LocalStorage获取一个对象的函数}
    console.log(`arrMenu:`, arrMenu);
    this.arrTabs = arrMenu || [];
    this.activeTab(fullPath); //调用：{聚焦tab函数}
  },
};
</script>
<style scoped></style>
