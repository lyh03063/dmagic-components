<template>

  <div id="app" style>
    <div class="float-tips" v-if="$sys.env=='dev'">非生产2</div>
    <el-container>
      <el-header class="home-head-box">
        <el-row>
          <div class="FL MT13 C_fff MR10" v-if="logoUrl">
            <img class="W200 H36" src="http://www.dmagic.cn/images/IconS/IconS_2578.png" alt />
          </div>
          <div class="FR MT20 C_fff">
            <dm_user_role></dm_user_role>
          </div>
        </el-row>
      </el-header>
    </el-container>
    <el-container class="main-box">
      <dm_left_menu :cf="navMenuList"></dm_left_menu>
      <el-main>
        <dm_space height="10"></dm_space>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  mixins: [MIX.base],
  components: {
   
  }, //注册组件
  methods: {},
  computed: {
   
  },
  data() {
    //当前用户角色的权限数据

    //完整的菜单列表
    let menuListAll = PUB.menuList;

    //最终需要的菜单列表
    let menuListNeed = [];
    //*****遍历完整的菜单列表，返回有权限的菜单列表
    menuListAll.forEach(groupEach => {
      let groupKey = groupEach.index;
      //如果没有menuItem且有route，直接返回
      if (!groupEach.menuItem && groupEach.route) {
        return menuListNeed.push(groupEach);
      }

      let menuItemNeed = []; //当前菜单组最终可用的菜单项
      groupEach.menuItem.forEach(menuItemEach => {
        let menuIndex = menuItemEach.index;
        //获取权限
        let hasPower = lodash.get(
          window.rolePower,
          `${groupKey}.${menuIndex}.search`
        );
        if (hasPower) {
          //hasPower
          menuItemNeed.push(menuItemEach);
        }
      });

      //如果{当前菜单组最终可用的菜单项}存在
      if (menuItemNeed.length > 0) {
        menuListNeed.push({
          index: groupEach.index,
          icon: groupEach.icon,
          title: groupEach.title,
          menuItem: menuItemNeed
        });
      }
    });

    return {
      logoUrl: PUB.logoUrl,
      systemName: PUB.systemName,
      // 导航菜单列表
      navMenuList: menuListNeed
    };
  },
  created() {
     PUB._paramAjaxAddon = {
      _systemId: "$all",
      // _systemId: "sys_api"
    }


    

    document.title = PUB.systemName; //修改浏览器标题栏文字
     util.changeFavicon(`http://qn-dmagic.dmagic.cn/images/icon_sys_api.png`)//函数：{改变网页标题图标的函数}

    document.onkeydown = e => {
      //绑定ctrl+D事件
      var keyCode = e.keyCode || e.which || e.charCode;
      var ctrlKey = e.ctrlKey || e.metaKey;
      if (ctrlKey && keyCode == 68) {
        // this.toggleDebug();//调用：{切换调试模式函数}

        let debug = this.$store.state.debug;
        this.$store.commit("setDebug", !debug);
        e.preventDefault(); //阻止默认事件
        return false;
      }
    };
  }
};
</script>

<style scoped>

.home-head-box {
  background-color: rgb(84, 92, 100);
}
.el-header {
  background-color: rgb(84, 92, 100) !important;
}
.middle-box {
  border-left: 1px solid #ddd;
  padding-left: 5px;
}

.main-box{
  height: calc(100vh - 60px );
  transition: 0.5s;
 
}
</style>

