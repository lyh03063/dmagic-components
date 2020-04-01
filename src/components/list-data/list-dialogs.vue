<template>
  <div class>
    <!--查看详情弹窗-->
    <el-dialog
      title="查看详情"
      :visible.sync="isShowDialogDetail"
      v-if="isShowDialogDetail"
      width="95%"
      :before-close="closeDialogDetailFun"
      :close-on-click-modal="false"
      :append-to-body="true"
    >
      <template v-if="!cf.customDetail">
        <table class="table-normal WP100">
          <tr v-for="(item,index) in cf.detailItems" :key="index">
            <td class="W100">{{item.label}}</td>
            <td style="line-height:150%">
              <!--如果是slot-->
              <!-- <slot :name="'slot_detail_item_'+item.prop" v-if="item.slot" ></slot> -->

              <slot :name="item.slot" :row="row" v-if="item.slot"></slot>
              <!--如果该字段带有formatter,使用formatter返回的代码输出-->
              <div v-else-if="item.formatter" v-html="item.formatter(row)"></div>
              <!--否则如果该字段带type是html，使用html原文输出-->
              <div v-else-if="item.type=='html'" v-html="row[item.prop]"></div>
              <div v-else-if="item.type=='htmlJson'" v-highlight>
                <pre>
                    <code v-html="row[item.prop]"></code>
                </pre>
              </div>
              <tiny_mce
                v-model="row[item.prop]"
                v-else-if="item.type=='editorTM'"
                :showToolbar="false"
              ></tiny_mce>
              <!--否则，正常输出-->
              <template v-else>{{row[item.prop]}}</template>
            </td>
          </tr>
        </table>
      </template>
      <!-- 自定义详情插槽 -->
      <template v-if="cf.customDetail">
        <slot name="customDetail" :detailData="row"></slot>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialogDetailFun">关 闭</el-button>
      </span>
    </el-dialog>

    <!--新增数据表单弹窗-->
    <el-dialog
      title="新增数据"
      :visible.sync="isShowDialogAdd"
      v-if="isShowDialogAdd"
      width="95%"
      :before-close="closeDialogAddFun"
      :close-on-click-modal="false"
      :append-to-body="true"
    >
      <div class>
        <dm_debug_list level-up="1">
          <dm_debug_item v-model="formAdd" text="新增表单的绑定数据" />
          <dm_debug_item v-model="cf.formDataAddInit" text="新增表单的初始数据" />
        </dm_debug_list>
      </div>

      <!--表单提示语-->
      <div
        class
        v-html="$lodash.get(cf, `cfDialogForm.tips.text`)"
        v-if="$lodash.get(cf, `cfDialogForm.tips`)"
        :style="getTipsStyle(cf)"
      ></div>

      <dynamicForm
        v-model="formAdd"
        :cf="cfFormAdd"
        @submit="addData"
        @cancel="closeDialogAddFun"
        :needDeleteId="true"
      >
        <template v-slot:[item.slot]="{formData}" v-for="item in cf.formItems">
          <!--根据cf.formItems循环输出插槽--新增修改表单弹窗-->
          <slot :name="item.slot" :formData="formData" v-if="item.slot"></slot>
        </template>
      </dynamicForm>
    </el-dialog>

    

<!--弹窗编辑数据组件-->
    <dm_dialog_edit ref="dialog_edit" :cf="cfEditDialog" :formModify="formModify" @after-modify="afterModify">
       <template v-slot:[item.slot]="{formData}" v-for="item in cf.formItems">
          <!--根据cf.formItems循环输出插槽--新增修改表单弹窗-->
          <slot :name="item.slot" :formData="formData" v-if="item.slot"></slot>
        </template>
    </dm_dialog_edit>
  </div>
</template>

<script>
// import dynamicForm from "./dynamic-form";
import tiny_mce from "../../components/form_item/tiny_mce";
export default {
  name: "list_dialogs", //组件名，用于递归
  components: {
    //注册组件
    // dynamicForm
    dynamicForm: resolve => {
      require(["./dynamic-form"], resolve);
    },
    tiny_mce
  },
  props: ["cf", "tableData"],

  data: function() {
    return {
    
      //**------------------修改表单组件配置-新--------------

      cfEditDialog: {
        // visible: true,
        cfTips: lodash.get(this.cf, `cfDialogForm.tips`),
        urlModify: this.cf.url.modify,
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
    "cf.formDataAddInit": {
      //监听新增表单的初始化数据
      handler(newVal, oldVal) {
        this.initFormDataAdd(); //调用：{初始化新增数据表单函数}
      },
      immediate: true,
      deep: true
    },
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
    isShowDialogAdd() {
      //是否显示添加弹窗
      return this.$store.state.listState[this.cf.listIndex].isShowDialogAdd; //从vuex的store里面读取值
    },
    isShowDialogDetail() {
      //是否显示详情弹窗
      return this.$store.state.listState[this.cf.listIndex].isShowDialogDetail; //从vuex的store里面读取值
    }
  },
  methods: {
    handelItem: util.handelItem,
    //获取提示样式的函数
    getTipsStyle() {
      let styleAdd = lodash.get(this.cf, `cfDialogForm.tips.style`);
      let style = { padding: "10px 10px 10px 100px", color: "#f60" };
      return Object.assign(style, styleAdd); //合并对象
    },
    initFormDataAdd() {
      //函数：{初始化新增数据表单函数}
      if (!this.cf.formDataAddInit) {
        return;
      }

      this.formAdd = util.deepCopy(this.cf.formDataAddInit);
    },
    closeDialogDetailFun(done) {
      //关闭详情弹窗的配置事件函数
      this.$store.commit("closeDialogDetail", this.cf.listIndex); //执行store的closeDialogAdd事件
    },
    closeDialogAddFun(done) {
      //关闭新增弹窗的配置事件函数
      this.$store.commit("closeDialogAdd", this.cf.listIndex); //执行store的closeDialogAdd事件
      this.formAdd = this.cf.formDataAddInit || {}; //还原formAdd
    },

    //-------------新增数据的函数--------------
    async addData() {
      //如果{新增数据接口地址}存在
      if (this.cf.url.add) {
        let ajaxParam;
        //如果{idKey}是"_id"
        if (this.cf.idKey == "_id") {
          ajaxParam = { _data: this.formAdd };
        } else {
          ajaxParam = { data: this.formAdd };
        }
        Object.assign(ajaxParam, this.cf.paramAddonPublic); //合并公共参数
        let response = await axios({
          //请求接口
          method: "post",
          url: PUB.domain + this.cf.url.add,
          data: ajaxParam //传递参数
        });

        //触发外部事件-把新增前后的数据都传过去
        this.$emit("after-add", response.data.addData, this.formAdd);
        //Q2:{新增数据接口地址}不存在
      } else {
        let idMax = 1;
        //如果列表有数据
        if (this.tableData.length) {
          let arrId = this.tableData.map(doc => doc["P1"]); //id数组
          idMax = Math.max(...arrId) + 1; //获取最大id
        }
        this.formAdd["P1"] = idMax; //补充id
        this.tableData.unshift(this.formAdd); //静态数据列表追加一条数据
        this.$emit("after-add", this.formAdd);
      }

      this.$message({
        message: "新增成功",
        duration: 1500,
        type: "success"
      });

      this.closeDialogAddFun(); //关闭弹窗
      //如果{增删改操作后是否自动刷新}为真
      if (this.cf.isRefreshAfterCUD) {
        this.$parent.getDataList(); //更新数据列表
      }

      this.initFormDataAdd(); //调用：{初始化新增数据表单函数}
      // this.formAdd = {};
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
    afterModify(_data){
      
      this.$emit("after-modify", _data, this.beforeModify); //触发外部事件
    }

  },
  created() {
    //如果{新增表单默认新增数据}不存在，进行注册
    if (!this.cf.formDataAddInit) {
      this.$set(this.cf, "formDataAddInit", {});
    }
  },
  mounted() {}
};
</script>

