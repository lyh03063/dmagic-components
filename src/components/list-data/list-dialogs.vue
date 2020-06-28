<template>
  <div class>
    <dm_debug_list>
      <dm_debug_item v-model="cf" text="tttt" />
    </dm_debug_list>

    <!--查看详情弹窗-->
    <el-dialog
    class="n-el-dialog"
      title="查看详情"
      :visible.sync="isShowDialogDetail"
      v-if="isShowDialogDetail"
      width="95%"
      :before-close="closeDialogDetailFun"
      :close-on-click-modal="false"
      :append-to-body="true"
    >
    <div class="" v-if="readyDetail">

 <template v-if="cf.comDetail">
        <!-- 动态组件 -->
        <component :is="cf.comDetail" :docDetail="row"></component>
      </template>
      <!-- 自定义详情插槽 -->
      <template v-else-if="cf.customDetail">
        <slot name="customDetail" :detailData="row"></slot>
      </template>
      <template v-else>
        <table class="table-normal WP100">
          <tr v-for="(item,index) in cf.detailItems" :key="index">
            <td class="W100">{{item.label}}</td>
            <td style="line-height:150%">
              <!--如果是slot-->
              <!-- <slot :name="'slot_detail_item_'+item.prop" v-if="item.slot" ></slot> -->

              <slot :name="item.slot" :row="row" v-if="item.slot"></slot>
              <!--如果该字段带有formatter,使用formatter返回的代码输出-->
              <div v-else-if="item.formatter" v-html="item.formatter(row)"></div>
              <!--有组件名-->
              <component v-else-if="item.component" :is="item.component" :doc="row"></component>
              <!--否则如果该字段带type是html，使用html原文输出-->
              <div v-else-if="item.type=='html'" v-html="row[item.prop]"></div>
              <div v-else-if="item.type=='htmlJson'" v-highlight>
                <pre>
                    <code v-html="row[item.prop]"></code>
                </pre>
              </div>
              <tiny_mce_new
                v-model="row[item.prop]"
                v-else-if="item.type=='editorTM'"
                :showToolbar="false"
              ></tiny_mce_new>
              <!--否则，正常输出-->
              <template v-else>{{row[item.prop]}}</template>
            </td>
          </tr>
        </table>
      </template>
      <!--查看上一条-->
      <div class="L10 btn-switch el-icon-arrow-left" @click="showPre"></div>
      <!--查看下一条-->
      <div class="R10 btn-switch el-icon-arrow-right" @click="showNext"></div>

      <div slot="footer" class="dialog-footer TAR MT10">
        <el-button @click="closeDialogDetailFun">关 闭</el-button>
      </div>

    </div>
     
    </el-dialog>

    <div class></div>

    <!--弹窗新增数据组件-->
    <dm_dialog_add
      ref="dialog_add"
      :cf="cfAddDialog"
      :formAdd="formAdd"
      :tableData="tableData"
      @after-add="afterAdd"
    >
      <template v-slot:[item.slot]="{formData}" v-for="item in cf.formItems">
        <!--根据cf.formItems循环输出插槽--新增修改表单弹窗-->
        <slot :name="item.slot" :formData="formData" v-if="item.slot"></slot>
      </template>
    </dm_dialog_add>
    <!--弹窗编辑数据组件-->
    <dm_dialog_edit
      ref="dialog_edit"
      :cf="cfEditDialog"
      :formModify="formModify"
      @after-modify="afterModify"
    >
      <template v-slot:[item.slot]="{formData}" v-for="item in cf.formItems">
        <!--根据cf.formItems循环输出插槽--新增修改表单弹窗-->
        <slot :name="item.slot" :formData="formData" v-if="item.slot"></slot>
      </template>
    </dm_dialog_edit>
  </div>
</template>

<script>

import tiny_mce_new from "../../components/form_item/tiny_mce_new";
export default {
  name: "list_dialogs", //组件名，用于递归
  components: {
    tiny_mce_new
  },
  props: ["cf", "tableData"],

  data: function () {

    return {
      readyDetail:true,
      cfAddDialog: {
        // visible: true,
        cfTips: lodash.get(this.cf, `cfDialogForm.tips`),
        urlAdd: lodash.get(this.cf, `url.add`),
        tableData: null,
        isRefreshAfterAdd: this.cf.isRefreshAfterCUD,
        formDataAddInit: {},
        cfFormAdd: {
          idKey: this.cf.idKey,
          paramAddonInit: this.cf.paramAddonPublic,
          watch: lodash.get(this.cf, `cfForm.watch`),
          col_span: lodash.get(this.cf, `cfForm.col_span`, 24), //控制显示一行多列
          urlInit: "",
          formItems: this.cf.formItems,
          btns: [
            { text: "新增", event: "submit", type: "primary", validate: true },
            { text: "取消", event: "cancel" }
          ]
        }
      },

      //**------------------修改表单组件配置-新--------------

      cfEditDialog: {
        // visible: true,
        cfTips: lodash.get(this.cf, `cfDialogForm.tips`),
        urlModify: lodash.get(this.cf, `url.modify`),
        tableData: null,
        isRefreshAfterModify: this.cf.isRefreshAfterCUD,
        dataIdModify: null,
        cfFormModify: {
          idKey: this.cf.idKey, //键名
          paramAddonInit: this.cf.paramAddonPublic, //初始化的附加参数
          watch: lodash.get(this.cf, `cfForm.watch`), //监听器配置
          col_span: lodash.get(this.cf, `cfForm.col_span`, 24), //控制显示一行多列
          urlInit: lodash.get(this.cf, `url.detail`),
          formItems: this.cf.formItems,
          btns: [
            { text: "修改", event: "submit", type: "primary", validate: true },
            { text: "取消", event: "cancel" }
          ]
        }
      },
      //------------------新增表单组件配置--------------
      cfFormAdd: {
        watch: lodash.get(this.cf, `cfForm.watch`), //监听器配置
        col_span: lodash.get(this.cf, `cfForm.col_span`, 24), //控制显示一行多列
        formItems: this.cf.formItems,
        btns: [
          { text: "新增", event: "submit", type: "primary", validate: true },
          { text: "取消", event: "cancel" }
        ]
      },

      formAdd: {}, //新增数据的表单数据
      formModify: {}, //修改数据的表单数据
      beforeModify: {}, //修改前数据
      editorOption: {
        //编辑器的配置
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["link", "image", "video"]
          ]
        }
      }
    };
  },
  watch: {

    // 当父组件的配置改变时里面的配置随之改变
    "cf.formItems": {
      //监听新增表单的初始化数据
      handler(newVal, oldVal) {
        this.cfFormAdd.formItems = newVal;
        this.cfEditDialog.cfFormModify.formItems = newVal; //调用：{初始化新增数据表单函数}-已修改
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    row() {
      //来自vuex的当前行数据

      return this.$store.state.listState[this.cf.listIndex].row;
    },

    isShowDialogDetail() {
      //是否显示详情弹窗
      return this.$store.state.listState[this.cf.listIndex].isShowDialogDetail; //从vuex的store里面读取值
    }
  },
  methods: {
//函数：{显示索引对应的详情}
    showDetailByIndex: async function (index) {
      let docNext = this.tableData[index]
      this.$parent.showDetail(docNext);
      await this.$nextTickStatus("readyDetail")
    },

    //函数：{显示上一个详情函数}
    showPre: async function () {
      let indexCurr = this.tableData.findIndex((d => d[this.cf.idKey] == this.row[this.cf.idKey]))//当前数据的索引
      indexCurr = indexCurr || 0;
      let indexPre = indexCurr - 1;//变量：{下一条数据的索引}
      if (indexPre < 0) {//
        indexPre = this.tableData.length - 1
      }
      this.showDetailByIndex(indexPre)//调用：{显示索引对应的详情}

    },
    //函数：{显示下一个详情函数}
    showNext: async function () {
      let indexCurr = this.tableData.findIndex((d => d[this.cf.idKey] == this.row[this.cf.idKey]))//当前数据的索引
      indexCurr = indexCurr || 0;
      let indexNext = indexCurr + 1;//变量：{下一条数据的索引}
      if (indexNext + 1 > this.tableData.length) {//
        indexNext = 0
      }
      this.showDetailByIndex(indexNext)//调用：{显示索引对应的详情}

    },
    handelItem: util.handelItem,
    //获取提示样式的函数
    getTipsStyle() {
      let styleAdd = lodash.get(this.cf, `cfDialogForm.tips.style`);
      let style = { padding: "10px 10px 10px 100px", color: "#f60" };
      return Object.assign(style, styleAdd); //合并对象
    },

    closeDialogDetailFun(done) {
      //关闭详情弹窗的配置事件函数
      this.$store.commit("closeDialogDetail", this.cf.listIndex); //执行store的closeDialogAdd事件
    },



    //-------------显示修改弹窗的函数--------------
    async showModify(row) {
      this.$emit("after-show-Dialog-Modify", row);//触发外部事件
      this.beforeModify = row;
      let rowNew = lodash.cloneDeep(row); //深拷贝
      this.formModify = rowNew; //表单赋值
      this.dataIdModify = rowNew[this.cf.idKey];

      this.cfEditDialog.dataIdModify = this.dataIdModify; //
      this.cfEditDialog.visible = true;
      this.$set(this.cfEditDialog, "tableData", this.tableData);
    },
    afterAdd(_data) {
      this.$emit("after-add", _data); //触发外部事件
    },
    afterModify(_data) {
      this.$emit("after-modify", _data, this.beforeModify); //触发外部事件
    }

  },
  created() {

  },
  mounted() { }
};
</script>
<style  scoped>
.btn-switch {
  position: fixed;
  width: 24px;
  height: 60px;
  padding: 22px 5px;
  cursor: pointer;
  top: 30%;
  background-color: rgba(255, 255, 255, 0.6);
}
.btn-switch:hover {
  background-color: rgba(255, 255, 255, 0.9);
}
</style>

