<template>
  <div id="app">
    <dm_debug_list>
      <dm_debug_item v-model="dataConfig" />
    </dm_debug_list>

    <el-menu
    style=""
      :default-active="activeMenuIndex"
      class="el-menu-demo"
      mode="horizontal"
      :router="true"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      v-if="arrMenu"
    >
   

      <template v-for="menuEach in arrMenu">
        <!--一级菜单带route，表示无子菜单-->
        <el-menu-item
          :index="menuEach.name"
          :route="menuEach.route"
          v-if="menuEach.route"
          :key="menuEach.name"
        >
          <i :class="menuEach.icon"></i>
          <span slot="title">{{menuEach.title}}</span>
        </el-menu-item>
        <!--一级菜单不带route，表示有子菜单-->
        <el-submenu :index="menuEach.name" :key="menuEach.name" v-else>
          <template slot="title">
            <i :class="menuEach.icon"></i>
            <span>{{menuEach.title}}</span>
          </template>

          <el-menu-item
            :index="item.name"
            :route="item.route?item.route:`/manage/demo_show?com=${item.name}`"
            v-for="item in menuEach.menuItem"
            :key="item.name"
          >{{item.title||item.name}}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
    <div class="main-box1111">
      <div class="left-box" :style="{'width':showDialog?'60%':'100%'}">
        <router-view style="padding:10px;"></router-view>
      </div>

      <div :class="{'side-bar-box':true,'show':showDialog}" v-if="true">
        <i class="el-icon-document-copy btn-copy" :data-clipboard-text="dataConfigForCopy"></i>
        <i class="el-icon-circle-close btn-close-cf" @click="showDialog=false"></i>
        <dm_dynamic_form :cf="cfForm" v-model="dataConfig" v-if="showCFForm"></dm_dynamic_form>
      </div>
      <!-- <div class="side-bar-cover" v-if="showDialog" @click="showDialog=false"></div> -->
      <div class="btn-cf" @click="showDialog=true" v-if="!showDialog">
        配
        <br />置
      </div>
    </div>
  </div>
</template>

<script>


import dm_dynamic_form from "./components/list-data/dynamic-form.vue";
export default {
  components: { dm_dynamic_form },
  name: "app",
  data() {
    return {

      dataConfigForCopy: "", //用于拷贝的配置字符串
      dataConfig: {}, //内部组件配置数据
      // activeIndex: "1",
      showDialog: false,
      showCFForm: false, //是否显示组件配置表单
      cfForm: {
        labelWidth: "110px",
        // col_span: 12,
        formItems: [],
        btns: [
          // { text: "关闭", event: "cancel" }
        ]
      }
    };
  },
  computed: {
    arrMenu() {
      return PUB.menuDemo
    },
    activeMenuIndex() {
      // //
      // return '2'
      // //当前激活的菜单index
      return this.$store.state.activeMenuIndex; //从vuex的store里面读取值
    },
    cfData: function () {
      return this.$store.state.cfData;
    }
  },
  watch: {
    cfData: {
      handler(newVal, oldVal) {
        // alert("1111");
        this.dataConfig = this.cfData;//*** */
        this.dataConfigForCopy = JSON.stringify(this.dataConfig); //Json对象转换Json字符串
      },
      immediate: true,
      deep: true
    },
    dataConfig: {
      handler(newVal, oldVal) {
        //来自vuex的当前行数据
        // this.$store.state.listState[this.cf.listIndex].row;

        this.$store.commit("setCfData", this.dataConfig);
      },

      deep: true
    }
  },
  created(){
 util.changeFavicon(`//qn-dmagic.dmagic.cn/images/icon_dm.png`)//函数：{改变网页标题图标的函数}
  },

  mounted() {
    var clipboard = new Clipboard(".btn-copy");
    clipboard.on("success", e => {
      this.$message.success("复制成功");
    });
   
  }
};
</script>

<style>
.main-box {
  transition: 0.5s;
  display: flex;
  width: 100%;
  height: calc(100vh - 70px);

  left: 0;
  top: 0;
}
.left-box {
  flex: 1;
  overflow-y: auto;
  /* position: relative; */
}
.el-menu-demo {
  /* position: fixed;
  left: 0;
  top:0;
  width:100% ;
  z-index: 10; */
}
.side-bar-cover {
  z-index: 1;
  position: fixed;
  height: 100%;
  width: 100%;
  background: #999;
  opacity: 0.5;
  left: 0;
  top: 0;
}
.side-bar-box {
  border-left: 1px solid #999;
  position: relative;
  height: 100%;
  /* width: 580px; */
  background: #fff;
  right: 0;
  top: 0;
  overflow-y: auto;
  /* height: 500px; */

  transition: 0.5s;
  opacity: 0;
  width: 0px;
  padding: 0;
}
.side-bar-box.show {
  opacity: 1;
  width: 500px;
  padding: 10px;
}

.btn-cf {
  z-index: 2;
  width: 30px;
  text-align: center;
  padding: 10px 0 10px 0;
  position: fixed;
  right: 0;
  top: 40%;
  background-color: #f0f0f0;
  border: 1px #ddd solid;
  border-radius: 5px 0 0 5px;
  cursor: pointer;
}

.btn-close-cf {
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  font-size: 30px;
  z-index: 100;
  color: #666;
  font-weight: 300;
}

.btn-copy {
  font-weight: 300;
  position: absolute;
  right: 50px;
  top: 10px;
  cursor: pointer;
  font-size: 28px;
  z-index: 100;
  color: #666;
}
</style>
