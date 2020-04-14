<template>
  <div>
    <el-button plain @click="setAddInit" size="mini" ref="aaa">设置formDataAddInit</el-button>
    <label class="n-button plain DPIB" for="id_btn_list_demo_add">替身按钮-新增</label>

    <el-button plain @click="setChildComponent" size="mini">触发列表内的子组件的方法</el-button>

    <dm_debug_list>
      <dm_debug_item v-model="visible" text="visible" />
    </dm_debug_list>

    <dm_list_data
      :cf="cfList"
      ref="listMain"
      @bacth-btn-click="bacthBtnClick"
      @list-event-in="handleListEventIn"
    >
      <template #slot_in_toolbar="{data:{tableData}}">插槽内容可显示tableData</template>

      <template v-slot:slot_form_expand_articleTitle="{row}">
        {{row}}
        <el-link type="primary" @click="fold(row)">收起</el-link>
      </template>
      <template #slot_column_CreateTime="{row}">
        <el-popover placement="top-start" width="200" trigger="click" v-model="visible[row.P1]">
          <!--候选值列表-->

          <el-button slot="reference" icon="el-icon-more">插槽{{row.P1}}</el-button>
        </el-popover>
      </template>
    </dm_list_data>

    <com1 class></com1>
  </div>
</template>

<script>
import "../components/list_demo.js";
let T;
import dm_list_data from "../components/list-data/list-data.vue";
import dm_dynamic_form from "../components/list-data/dynamic-form.vue";


// 注册一个全局组件-针对某个列
Vue.component('com_test1', {
  template: `<span class="C_f30 B" @click="fnClick">{{doc.name}}</span>`,
  props: ["doc"],//接收属性
  methods: {
    async fnClick() {
      console.log(`fnClick`);
      //往列表内部传递事件
      this.$emit("list-event-in", {
        eventType: "test1-----1",
        callbackInList: (T) => {
          T.showAdd()//打开列表弹窗
          console.log("this.doc:", this.doc);
        }
      });

      await util.timeout(1500); //延迟

      this.$emit("list-event-in", {
        eventType: "test2222", doc: this.doc      });


    }
  }
})

// 注册一个全局组件
Vue.component('com_toolbar1', {
  template: `<span class="C_f30 B MR8" @click="fnClick">设置组件</span>`,
  props: ["data"],//接收属性
  data: function () {
    return {
      xxx: 123
    }

  },
  methods: {
    fnTest() {
      alert("工具栏子组件的fnTest方法被触发");
    },
    async fnClick() {
      console.log(`fnClick`);
      //往列表内部传递事件
      this.$emit("list-event-in", {
        eventType: "test1-----1",
        callbackInList: (T) => {
          T.showAdd()//打开列表弹窗
          console.log("this.doc:", this.doc);
        }
      });

      await util.timeout(1500); //延迟

      this.$emit("list-event-in", {
        eventType: "test2222",
        doc: this.doc

      });


    }
  }
})



export default {
  components: {    dm_list_data, dm_dynamic_form,

    com1: { template: `<div class="" >5555</div>` }
  },
  data() {
    return {

      visible: {},
      cfList: PUB.listCF.list_demo
    };
  },
  computed: {
    cfData: function () {
      return this.$store.state.cfData;
    },
    flag: function () {
      return true;
    }
  },
  watch: {
    cfData: {
      handler(newVal, oldVal) {
        var t_json = JSON.stringify(this.cfData); //：{Json对象转换Json字符串函数}
        this.cfList = util.parseJson(t_json);
      },
      // immediate: true,
      deep: true
    }
  },
  methods: {
    setChildComponent() {
      console.log("$refs.listMain.$refs.toolbar_com1", this.$refs.listMain.$refs.toolbar_com1);
      let comTarget = this.$refs.listMain.$refs.toolbar_com1[0];//目标子组件，注意定位后是一个数组，取第一个元素
      comTarget.fnTest()

    },
    handleListEventIn: function (param) {
      alert(`list-event-in被列表外部监听到,eventType为${param.eventType}`);
      console.log("param.doc:", param.doc);
    },
    //自定义批量操作按钮点击函数
    bacthBtnClick: function (eventType, selection) {
      console.log(`eventType:${eventType}`);
    },
    exportExcel() {
      alert("exportExcel");
      this.tableExportExcel({ el: ".n-table", fileName: "表" });
    },
    tableExportExcel: util.tableExportExcel,
    async toggleList() {
      let result = !this.isShowList1;
      this.isShowList1 = null;
      await this.$nextTick(); //延迟到视图更新
      this.isShowList1 = result;
    },
    //自定义单项操作按钮点击函数
    singlebtnClick: function (eventType, row) {
    },

    fold(row) {
      T.$refs.list1.$refs.table.toggleRowExpansion(row, false);
    },
    afterDelete(param, param1) {
    },
    afterAdd(param, param1) {
    },

    setAddInit() {
      this.cfList.formDataAddInit = { a: 1, b: 2, articleTitle: "234" };
    }
  },
  created() {
    T = this;
    T.cfList2 = Object.assign({}, T.cfList, {
      listIndex: "list_demo2", //vuex对应的字段~
      focusMenu: true, //进行菜单聚焦
      twoTitle: "aaa", //面包屑1级菜单
      threeTitle: "bbb" //面包屑2级菜单
    });





  },
  async mounted() {
    this.$parent.showCFForm = true;
    this.$parent.cfForm.formItems = [
      // {
      //   label: "普通文本框(input)",
      //   prop: "prop1",
      // },
      {
        label: "显示查询表单",
        prop: "isShowSearchForm",
        type: "radio",
        default: true,
        options: [{ value: true, label: "是" }, { value: false, label: "否" }]
      },
      {
        label: "显示操作栏",
        prop: "isShowToolBar",
        type: "radio",
        default: true,
        options: [{ value: true, label: "是" }, { value: false, label: "否" }]
      },
      {
        label: "显示面包屑",
        prop: "isShowBreadcrumb",
        type: "radio",
        default: true,
        options: [{ value: true, label: "是" }, { value: false, label: "否" }]
      },
      {
        label: "显示分页",
        prop: "isShowPageLink",
        type: "radio",
        default: true,
        options: [{ value: true, label: "是" }, { value: false, label: "否" }]
      },
      {
        label: "接口地址",
        prop: "url",
        type: "jsonEditor"
      },
      {
        label: "查询表单",
        prop: "searchFormItems",
        type: "collection"
      },
      {
        label: "列配置",
        prop: "columns",
        type: "collection"
      },
      {
        label: "动态数据字典",
        prop: "dynamicDict",
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
    ];
    var strJson = util.stringify(this.cfList);
    let json1 = JSON.parse(strJson);
    this.$store.commit("setCfData", json1);
  }
};
</script>

<style>
</style>