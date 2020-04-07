<template>
  <div>
    <!--新增数据表单弹窗-->
    <el-dialog
      title="新增数据"
      :visible.sync="cf.visible"
      v-if="cf.visible"
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
      <div class v-html="$lodash.get(cf.cfTips, `text`)" v-if="cf.cfTips" :style="getTipsStyle()"></div>
      <dm_dynamic_form
        v-model="IN_formAdd"
        :cf="cf.cfFormAdd"
        @submit="addData"
        @cancel="closeDialogAddFun"
        :needDeleteId="true"
      >
        <template v-slot:[item.slot]="{formData}" v-for="item in cf.cfFormAdd.formItems">
          <!--根据cf.formItems循环输出插槽--新增修改表单弹窗-->
          <slot :name="item.slot" :formData="formData" v-if="item.slot"></slot>
        </template>
      </dm_dynamic_form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  components: {},
  props: ["cf", "formAdd"],
  data() {
    return {
      // cf.visible: null,
      IN_formAdd: this.formAdd || {}
    };
  },
  watch: {
    "cf.formDataAddInit": {//监听新增表单的初始化数据
      immediate: true, deep: true,
      handler(newVal, oldVal) {
        this.initFormDataAdd(); //调用：{初始化新增数据表单函数}
      },
    },
    //监听
    formAdd: {
      deep: true,
      handler(newVal, oldVal) {
        console.log("formAdd changed");
        this.IN_formAdd = this.formAdd || {};
      },
      // immediate: true,
    },
    //监听
    "cf.visible": {
      handler(newVal, oldVal) {
        console.log("cf.visible changed");
        if (newVal) {
          //打开弹窗
        }
      }
    },//监听复制数据的id
    "cf.copyId": {
      handler(newVal, oldVal) {
        console.log("cf.visible changed");
        this.init()//调用：{初始化函数}
      }
    }
  },
  methods: {
    handelItem: util.handelItem,
    //-------------新增数据的函数--------------
    async addData(_data) {
      if (this.cf.urlAdd) {//Q1:如果{新增数据接口地址}存在
        let ajaxParam;
        //如果{idKey}是"_id"
        if (this.cf.cfFormAdd.idKey == "_id") {
          ajaxParam = { _data: this.IN_formAdd };
        } else {
          ajaxParam = { data: this.IN_formAdd };
        }
        console.log("ajaxParam:", ajaxParam);
        Object.assign(ajaxParam, this.cf.cfFormAdd.paramAddonInit); //合并公共参数，之前是cf.paramAddonPublic
        let response = await axios({//请求接口
          method: "post", url: `${PUB.domain}${this.cf.urlAdd}`,data: ajaxParam //传递参数
        });
        //触发外部事件-把新增前后的数据都传过去
        this.$emit("after-add", response.data.addData, this.IN_formAdd);
      } else {//Q2:{新增数据接口地址}不存在
        let idMax = 1;
        //如果列表有数据
        if (this.tableData.length) {
          let arrId = this.tableData.map(doc => doc["P1"]); //id数组
          idMax = Math.max(...arrId) + 1; //获取最大id
        }
        this.IN_formAdd["P1"] = idMax; //补充id
        this.tableData.unshift(this.IN_formAdd); //静态数据列表追加一条数据
        this.$emit("after-add", this.IN_formAdd);
      }
      if (this.cf.tipsAfterAdd) {//如果需要提示
        this.$message({ message: "新增成功", duration: 1500, type: "success" });
      }

      this.closeDialogAddFun(); //关闭弹窗
      //如果{增删改操作后是否自动刷新}为真
      if (this.cf.isRefreshAfterAdd) {
        this.$parent.$parent.getDataList(); //更新数据列表
      }
      this.initFormDataAdd(); //调用：{初始化新增数据表单函数}
      // this.formAdd = {};
    },
    initFormDataAdd() {
      //函数：{初始化新增数据表单函数}
      if (!this.cf.formDataAddInit) {
        return;
      }
      this.IN_formAdd = util.deepCopy(this.cf.formDataAddInit);
    },
    closeDialogAddFun() {//关闭新增弹窗的配置事件函数
      this.cf.visible = false;
      this.IN_formAdd = this.cf.formDataAddInit || {}; //还原formAdd
    },
    getTipsStyle() { //函数：{获取提示样式函数}
      let styleAdd = lodash.get(this.cf.cfTips, `style`);
      let style = { padding: "10px 10px 10px 100px", color: "#f60" };
      return Object.assign(style, styleAdd); //合并对象
    },
    init() { //函数：{初始化函数}

      util.setObjDefault(this.cf, { tipsAfterAdd: true });


      /****************************处理通用列表编辑的配置-START****************************/
      //这里有点乱！！！！！
      //设置主参数
      this.$set(this.cf, "visible", !!this.cf.visible); //增加到响应系统-有了这一句，visible就可以不预留配置，默认关闭
      //如果是通用列表
      this.cf.cfFormAdd = this.cf.cfFormAdd || {};
      if (this.cf.listType == "common") {//如果是通用型数据
        let cfFormAddTemp = {
          idKey: "_id", watch: {},
          btns: [
            { text: "新增", event: "submit", type: "primary", validate: true },
            { text: "取消", event: "cancel" }
          ]
        };
        let { copyId } = this.cf//复制的数据id
        if (copyId) {//如果{复制的数据id}存在
          this.cf.cfFormAdd.paramAddonInit = this.cf.cfFormAdd.paramAddonInit || {}
          this.cf.cfFormAdd.paramAddonInit._id = copyId//加入初始参数
          cfFormAddTemp.urlInit = "/info/commonDetail"
        }
        let { _dataType } = this.cf.cfFormAdd.paramAddonInit; //变量：{数据类型}
        console.log("_dataType:", _dataType);
        let listCF = lodash.get(PUB.listCF, `list_${_dataType}`); //根据数据类型获取对应的列表配置
        let { formItems, cfForm } = listCF; //获取对应的表单项
        cfFormAddTemp.formItems = formItems; //表单字段
        if (cfForm) {//如果额外配置存在
          Object.assign(cfFormAddTemp, cfForm);//合并对象
        }
        //调用：{给一个对象设置默认属性函数}
        util.setObjDefault(this.cf.cfFormAdd, cfFormAddTemp);
        //设置主参数
        this.cf.urlAdd = "/info/commonAdd";
      }
      /****************************处理通用列表编辑的配置-END****************************/
    }
  },
  created() {
    this.init()//调用：{初始化函数}
  },
  async mounted() { }
};
</script>
<style>
</style>
