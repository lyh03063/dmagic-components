<template>
  <div id="app">
    <div class="    main-box">
      <div class="left-box"  :style="{'width':showDialog?'60%':'100%'}">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          :router="true"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1" route="/form_demo">表单</el-menu-item>
          <el-menu-item index="2" route="/list_demo">列表</el-menu-item>
          <el-menu-item index="3" route="/test">测试</el-menu-item>
        </el-menu>
        <router-view style="padding:10px" ></router-view>
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
  computed: {
    cfData: function() {
      return this.$store.state.cfData;
    }
  },
  watch: {
    cfData: {
      handler(newName, oldName) {
        // alert("1111");
        this.dataConfig = this.cfData;
        this.dataConfigForCopy = JSON.stringify(this.dataConfig); //Json对象转换Json字符串
      },
      immediate: true,
      deep: true
    },
    dataConfig: {
      handler(newName, oldName) {
        //来自vuex的当前行数据
        // this.$store.state.listState[this.cf.listIndex].row;

        this.$store.commit("setCfData", this.dataConfig);
      },

      deep: true
    }
  },
  data() {
    return {
      dataConfigForCopy: "", //用于拷贝的配置字符串
      dataConfig: {}, //内部组件配置数据
      activeIndex: "1",
      showDialog: false,
      showCFForm: false, //是否显示组件配置表单
      cfForm: {
        labelWidth: "110px",
        // col_span: 12,
        formItems: [
          // {
          //   label: "普通文本框(input)",
          //   prop: "prop1",

          // },

          {
            label: "显示查询表单",
            prop: "isShowSearchForm",
            type: "radio",
            default: true,
            options: [
              { value: true, label: "是" },
              { value: false, label: "否" }
            ]
          },
          {
            label: "显示操作栏",
            prop: "isShowToolBar",
            type: "radio",
            default: true,
            options: [
              { value: true, label: "是" },
              { value: false, label: "否" }
            ]
          },
          {
            label: "显示面包屑",
            prop: "isShowBreadcrumb",
            type: "radio",
            default: true,
            options: [
              { value: true, label: "是" },
              { value: false, label: "否" }
            ]
          },
          {
            label: "显示分页",
            prop: "isShowPageLink",
            type: "radio",
            default: true,
            options: [
              { value: true, label: "是" },
              { value: false, label: "否" }
            ]
          },
          {
            label: "动态数据字典",
            prop: "dynamicDict",
            type: "collection"
          },

          {
            label: "接口地址",
            prop: "url",
            type: "jsonEditor"
          },

          {
            label: "列配置",
            prop: "columns",
            type: "collection"
          },

          {
            label: "详情弹窗字段",
            prop: "detailItems",
            type: "collection"
          },

          {
            label: "新增、修改表单字段",
            prop: "formItems",
            type: "collection"
          }
        ],
        btns: [
          // { text: "关闭", event: "cancel" }
        ]
      }
    };
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
  height: 100%;
  position: fixed;
  left: 0;
  top:0;
}
.left-box {
  flex: 1;
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
  padding: 10px;

  transition: 0.5s;
  opacity: 0;
  width: 30px;
}
.side-bar-box.show {
  opacity: 1;
  width: 500px;
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
