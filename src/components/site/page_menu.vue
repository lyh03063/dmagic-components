<template>
  <div class="" style="background:#0091e0" >
      <div class="M_0 " style="width:1200px" >

          <button
      type="button"
      class="link-switch-mobile-menu navbar-toggle pull-left"
      v-bind:class="[(!isShowMenu)?'collapsed':'']"
      @click="swithMobileMenu"
    >
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
    </button>
    <div class="menu-box" v-if="isShowMenu" :style="styleMenuBox">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        :mode="menuMode"
        v-bind="cf.cfElMenu"
      >
        <template v-for="item in cf.listMenu">
          <el-submenu
            :index="item.name+''"
            :key="item.name"
            v-if="item.sonMenu&&item.sonMenu.length"
          >
            <template slot="title">
              <span class>{{item.name}}</span>
            </template>
            <el-menu-item
              :index="sonItem.name+''"
              v-for="sonItem in item.sonMenu"
              :key="sonItem.name"
            >
              <a :href="sonItem.url" class="link-son">{{sonItem.name}}</a>
            </el-menu-item>
          </el-submenu>
          <el-menu-item :index="item.name+''" :key="item.name" v-else>
            <a :href="item.url" class="link-son">{{item.name}}</a>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
      </div>
      
    
  </div>
</template>



  

<script>
let T;
export default {
  props: ["cf"],
  data() {
    let T = this;
    return {
      menuMode: "horizontal", //菜单模式
      activeIndex: "1",
      styleMenuBox: { display: "none" },
      isShowMenu: true, //是否显示移动端菜单
     
    };
  },

  watch: {
    menuMode: {
      async handler(newVal, oldVal) {
        let flagShowMobileMenuOld = T.isShowMenu;
        T.isShowMenu = false;
        await T.$nextTick(); //延迟到视图更新
        T.isShowMenu = flagShowMobileMenuOld;
      }
    }
  },

  methods: {
    swithMobileMenu: function () {
      //函数：{移动端菜单开关函数}
      T.isShowMenu = !T.isShowMenu;
    },

    //函数：{响应界面函数}
    responseUI() {
      let { clientWidth } = document.body;
      if (clientWidth >= 640) {
        //Q1:{页面宽度}大于640
        T.menuMode = "horizontal";
        T.isShowMenu = true;
      } else {
        //Q2:{页面宽度}小于640
        T.menuMode = "vertical";
        T.isShowMenu = false;
      }
    }
  },
  beforeCreate() {
    T = this;
  },
  created() { },
  mounted() {
    //事件绑定：窗口变化
    window.addEventListener("resize", () => {
      T.responseUI(); //调用：{响应界面函数}
    });
    T.responseUI(); //调用：{响应界面函数}
    T.styleMenuBox = { display: "block" }; //移除菜单隐藏样式
  }
};
</script>

<style scoped>


@media screen and (max-width: 640px) {
  /* 增大移动端下的超链接出发点 */
  .menu-box >>> .el-menu-item a {
    display: inline-block;
    width: 80%;
  }
  .menu-box {
    clear: both;
    width: 100%;
  }
}

.menu-box >>> .el-menu {
  border: none;
}

.link-son {
  color: #fff;
}



/****************************盛联页头样式-START****************************/

.link-switch-mobile-menu {
  display: none;
}

@media screen and (max-width: 640px) {
  /*屏幕宽度小于640px*/
  .menu-hide {
    /*移动端菜单隐藏样式*/
    display: none;
  }
 
  
}



/****************************盛联页头样式-END****************************/

/*css开关按钮样式-Start*/

.navbar-toggle {
  position: relative;
  float: right;
  padding: 9px 10px;
  background-color: transparent;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 4px;
}

.navbar-toggle .icon-bar {
  display: block;
  width: 22px;
  height: 2px;
  border-radius: 1px;
}

.navbar-toggle .icon-bar {
  -webkit-transform-origin: 21px;
  -ms-transform-origin: 21px;
  transform-origin: 21px;
  -webkit-transition: -webkit-transform 0.2s, opacity 0.1s;
  transition: transform 0.2s, opacity 0.1s;
  height: 3px;
  width: 22px;
}

.navbar-toggle .icon-bar {
  background-color: #666;
}

.navbar-toggle .icon-bar + .icon-bar {
  margin-top: 4px;
}

.navbar-toggle:not(.collapsed) .icon-bar:nth-child(1) {
  -webkit-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

.navbar-toggle:not(.collapsed) .icon-bar:nth-child(2) {
  opacity: 0;
}

.navbar-toggle:not(.collapsed) .icon-bar:nth-child(3) {
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

/*css开关按钮样式-End*/

.menu-box >>> .el-submenu__title i {
  color: aliceblue;
}



.menu-box >>> .el-menu-item{
    padding: 0 40px;
}
</style>
