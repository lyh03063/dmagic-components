<template>
  <div class>
    <!--查看详情弹窗-->
    <el-dialog
      title="查看详情"
      :visible.sync="isShowDialogDetail"
      v-if="isShowDialogDetail"
      width="80%"
      :before-close="closeDialogDetailFun"
      :append-to-body="true"
    >
    <template v-if="!cf.customDetail">
      <table class="table-normal WP100" >
        <tr v-for="item in cf.detailItems" :key="item.prop">
          <td class="W100">{{item.label}}</td>
          <td>
            <!--如果是slot-->
            <!-- <slot :name="'slot_detail_item_'+item.prop" v-if="item.slot" ></slot> -->

            <slot :name="item.slot" :row="row" v-if="item.slot"></slot>
            <!--如果该字段带有formatter,使用formatter返回的代码输出-->
            <div v-else-if="item.formatter" v-html="item.formatter(row)"></div>
            <!--否则如果该字段带type是html，使用html原文输出-->
            <div v-else-if="item.type=='html'" v-html="row[item.prop]"></div>
            <!--否则，正常输出-->
            <template v-else>{{row[item.prop]}}</template>
          </td>
        </tr>
      </table>
      </template>
    <!-- 自定义详情插槽 -->
    <template v-if="cf.customDetail" >

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
      width="80%"
      :before-close="closeDialogAddFun"
      :append-to-body="true"
    >
      <div class>
        <dm_debug_list level-up="1">
          <dm_debug_item v-model="formAdd" text="新增表单的绑定数据"/>
          <dm_debug_item v-model="cf.formDataAddInit" text="新增表单的初始数据"/>
        </dm_debug_list>
      </div>

      <br>

      <dynamicForm v-model="formAdd" :cf="cfFormAdd" @submit="addData" @cancel="closeDialogAddFun">
        <template v-slot:[item.slot]="{formData}" v-for="item in cf.formItems">
          <!--根据cf.formItems循环输出插槽--新增修改表单弹窗-->
          <slot :name="item.slot" :formData="formData" v-if="item.slot"></slot>
        </template>
      </dynamicForm>
    </el-dialog>

    <!--修改数据表单弹窗-->
    <el-dialog
      title="修改数据"
      :visible.sync="isShowDialogModify"
      v-if="isShowDialogModify"
      width="80%"
      :append-to-body="true"
    >
      <dm_debug_list level-up="1">
        <dm_debug_item v-model="formModify" text="修改表单的绑定数据"/>
      </dm_debug_list>
      <dynamicForm
        v-model="formModify"
        :cf="cfFormModify"
        @submit="modifyData"
        @cancel="isShowDialogModify = false"
      >
        <template v-slot:[item.slot]="{formData}" v-for="item in cf.formItems">
          <!--根据cf.formItems循环输出插槽--新增修改表单弹窗-->
          <slot :name="item.slot" :formData="formData" v-if="item.slot"></slot>
        </template>
      </dynamicForm>
    </el-dialog>
  </div>
</template>

<script>
import dynamicForm from "./dynamic-form";
export default {
  components: {
    //注册组件
    dynamicForm
  },
  props: ["cf"],

  data: function() {
    return {
      //------------------新增表单组件配置--------------
      cfFormAdd: {
        col_span: lodash.get(this.cf, `cfForm.col_span`,24),//控制显示一行多列
        formItems: this.cf.formItems,
        btns: [
          { text: "新增", event: "submit", type: "primary", validate: true },
          { text: "取消", event: "cancel" }
        ]
      },
      //------------------修改表单组件配置--------------
      cfFormModify: {
        urlInit: this.cf.url.detail,
        formItems: this.cf.formItems,
        btns: [
          { text: "修改", event: "submit", type: "primary", validate: true },
          { text: "取消", event: "cancel" }
        ]
      },
      formAdd: {}, //新增数据的表单数据
      formModify: {}, //修改数据的表单数据
      isShowDialogModify: false, //是否显示修改弹窗
      beforeModify:{},//修改前数据
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
      handler(newName, oldName) {
        this.initFormDataAdd(); //调用：{初始化新增数据表单函数}
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
    },

    //-------------修改数据的函数--------------
    modifyData() {
      axios({
        //请求接口
        method: "post",
        url: PUB.domain + this.cf.url.modify,
        data: {
          findJson: {
            //用于定位要修改的数据
            P1: this.dataIdModify
          },
          modifyJson: this.formModify
        } //传递参数
      })
        .then(response => {
          this.$message({
            message: "修改数据成功",
            duration: 1500,
            type: "success"
          });
          this.isShowDialogModify = false; //关闭弹窗
          //如果{增删改操作后是否自动刷新}为真
          if (this.cf.isRefreshAfterCUD) {
            this.$parent.getDataList(); //更新数据列表
          }

          this.$emit("after-modify",this.formModify,this.beforeModify); //触发外部事件
        })
        .catch(function(error) {
          alert("异常:" + error);
        });
    },
    //-------------新增数据的函数--------------
    addData() {
      axios({
        //请求接口
        method: "post",
        url: PUB.domain + this.cf.url.add,
        data: { data: this.formAdd } //传递参数
      })
        .then(response => {
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
          this.$emit("after-add",response.data.addData); //触发外部事件
        })
        .catch(function(error) {
          alert("异常:" + error);
        });
        this.formAdd={}
    },
    //-------------显示修改弹窗的函数--------------
    showModify(row) {
      this.beforeModify = row
      let str = JSON.stringify(row); //转换成字符串
      let rowNew = JSON.parse(str); //转换成对象

      this.isShowDialogModify = true; //打开弹窗
      this.formModify = rowNew; //表单赋值

      this.dataIdModify = rowNew.P1;
    }
  },
  mounted() {}
};
</script>

