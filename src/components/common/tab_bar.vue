<template>
  <div class="out" style="max-width: calc(100vw - 320px)">
    <dm_debug_list>
      <dm_debug_item v-model="arrTabs" />
    </dm_debug_list>

    <!-- {{ editableTabsValue }} -->
    <!-- closable -->
    <!-- editable  -->
    <el-tabs
      v-model="editableTabsValue"
      type="card"
      @edit="handleTabsEdit"
      @tab-click="fnTabClick"
    >
      <!-- :label="item.title" -->
      <el-tab-pane
        :key="item.fullPath"
        v-for="(item, index) in arrTabs"
        :name="item.fullPath"
        :fullPath="item.fullPath"
      >
        <span slot="label" @mouseenter="indexMouseenter = index">
          <div @contextmenu.prevent="rightClick(index)">
            <!--下拉框trigger配置一个无效事件****-->
            <el-dropdown
              @command="handleCommand"
              placement="bottom"
              trigger="xxxx"
              :ref="`dropdown_${index}`"
            >
              <div class="">{{ item.title }}</div>

              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="deleteSelf">删除</el-dropdown-item>
                <el-dropdown-item command="deleteOthers"
                  >删除其他tab</el-dropdown-item
                >
                <el-dropdown-item command="deleteAll"
                  >删除所有tab</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </span>
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
      indexMouseenter: null,//鼠标进入的项
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
    };
  },
  watch: {
    $route: async function (newVal, oldVal) {
      let { fullPath, } = newVal;
      this.activeTab(fullPath); //调用：{聚焦tab函数}

    },
    // immediate: true,
    deep: true,
  },
  methods: {
    rightClick(index) {
      // alert(`rightClick`);
      let comDopdown = this.$refs[`dropdown_${index}`][0]//注意这里要加[0]
      // console.log(`com:`, com);
      comDopdown.show();     // 这步最关键，让下拉菜单显示
    },
    handleCommand(command) {

      if ((command == "deleteSelf")) {//Q1：{指令}}是删除当前tab
        this.arrTabs.splice(this.indexMouseenter, 1)

      } else if ((command == "deleteAll")) {//Q2：{指令}}是删除所有
        this.arrTabs = []

      } else if ((command == "deleteOthers")) {//Q3：{指令}}是删删除其他tab
        let arrSelf = this.arrTabs.splice(this.indexMouseenter, 1)
        this.arrTabs = []
        this.arrTabs = arrSelf

      }
      util.setLocalStorageObj(PUB.menuTabBarKey, this.arrTabs); //调用：{设置一个对象到LocalStorage}
    },
    //函数：{聚焦tab函数}
    activeTab: async function (fullPath) {
      let { name } = this.$route;

      if (name == "search_result_for_group") {//如果是搜索结果页的特殊处理--待优化，可合并到下方
        let existObj = this.arrTabs.find(d => d.name == name)
        if (existObj) {
          existObj.fullPath = fullPath//修改tab地址
        } else {
          this.arrTabs.push({ title: "搜索结果", fullPath, name });//加入新tab
        }
        this.editableTabsValue = fullPath;//聚焦
        return
      } else if (name == "group_task_panel") {
        let existObj = this.arrTabs.find(d => d.name == name)
        if (existObj) {
          existObj.fullPath = fullPath//修改tab地址
        } else {
          this.arrTabs.push({ title: "任务看板", fullPath, name });//加入新tab
        }
        this.editableTabsValue = fullPath;//聚焦
        return
      }



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

      this.editableTabsValue = fullPath;//聚焦
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
