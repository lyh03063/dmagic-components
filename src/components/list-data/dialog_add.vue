<template>
  <div>
    <!--新增数据表单弹窗-->
    <el-dialog
      class="n-el-dialog"
      title="新增数据"
      :visible.sync="cf.visible"
      v-if="cf.visible"
      width="95%"
      :before-close="closeDialogAddFun"
      :close-on-click-modal="false"
      :append-to-body="true"
    >
      <div class>
        <dm_debug_list level-up="2">
          <dm_debug_item v-model="cf" text="配置" />
          <dm_debug_item v-model="formAdd" text="新增表单的绑定数据" />
          <dm_debug_item
            v-model="cf.formDataAddInit"
            text="新增表单的初始数据"
          />
        </dm_debug_list>
      </div>

      <div class="PS4 W100" style="left: 87px; top: -36px">
        <el-popover
          placement="top-start"
          width="200"
          trigger="hover"
          :open-delay="300"
        >
          <!--候选值列表-->
          <a class="MR6" @click="setTempData(0)" href="javascript:;"
            >0.3h-已完成
          </a>
          <br />
          <a class="MR6" href="javascript:;" @click="setTempData(1)"
            >0.5h-已完成
          </a>
          <br />
          <a class="MR6" href="javascript:;" @click="setTempData(2)"
            >1h-已完成 </a
          ><br />
          <a class="MR6" href="javascript:;" @click="setTempData(3)"
            >1h-未完成 </a
          ><br />
          <a class="MR6" href="javascript:;" @click="setTempData(4)"
            >无时间-未完成
          </a>
          <el-button slot="reference" icon="el-icon-more" size="mini"
            >数据模板</el-button
          >
        </el-popover>
      </div>

      <!--表单提示语-->
      <div
        class
        v-html="$lodash.get(cf.cfTips, `text`)"
        v-if="cf.cfTips"
        :style="getTipsStyle()"
      ></div>
      <dm_dynamic_form
        v-model="IN_formAdd"
        :cf="cf.cfFormAdd"
        @submit="addData"
        @cancel="closeDialogAddFun"
        :needDeleteId="true"
      >
        <template
          v-slot:[item.slot]="{ formData }"
          v-for="item in cf.cfFormAdd.formItems"
        >
          <!--根据cf.formItems循环输出插槽--新增修改表单弹窗-->
          <slot :name="item.slot" :formData="formData" v-if="item.slot"></slot>
        </template>
      </dm_dynamic_form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "dialog_add",
  components: {},
  props: {
    cf: {
      type: Object,
      default: function () {
        return {}
      }

    },
    formAdd: {

    },
    //静态列表的新增数据需要tableData传入
    tableData: {

    },
  },
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
        this.IN_formAdd = this.formAdd || {};
      },
      // immediate: true,
    },
    //监听
    "cf.visible": {
      handler(newVal, oldVal) {
        if (newVal) {
          //打开弹窗
        }
      }
    },//监听复制数据的id
    "cf.copyId": {
      deep: true,
      handler(newVal, oldVal) {
        this.init()//调用：{初始化函数}
      }
    }
  },
  methods: {
    //函数：{设置表单模板数据函数}
    setTempData: function (i) {

      let arrTemp = [{
        "actualTime": 0.3,
        "predictTime": 0.3,
        "personCharge": ["13691916429"],
        "complete": 1,
        "prior": 3,
        "taskType": 1,
        "title": "xxxx",
      },

      {
        "actualTime": 0.5,
        "predictTime": 0.5,
        "personCharge": ["13691916429"],
        "complete": 1,
        "prior": 3,
        "taskType": 1,
        "title": "xxxx",
      }, {
        "actualTime": 1,
        "predictTime": 1,
        "personCharge": ["13691916429"],
        "complete": 1,
        "prior": 3,
        "taskType": 1,
        "title": "xxxx",
      }, {
        "actualTime": 1,
        "predictTime": 1,
        "personCharge": ["13691916429"],
        "prior": 2,
        "taskType": 1,
        "title": "xxxx",
      }, {
       
        "personCharge": ["13691916429"],
        "prior": 3,
        "taskType": 1,
        "title": "xxxx",
      }
      ]
      this.IN_formAdd = { ...this.IN_formAdd, ...arrTemp[i] }

    },
    handelItem: util.handelItem,
    //TODO:ajax新增数据的函数
    async addData(_data) {
      if (this.cf.urlAdd) {//Q1:如果{新增数据接口地址}存在
        let ajaxParam;
        //如果{idKey}是"_id"
        if (this.cf.cfFormAdd.idKey == "_id") {
          ajaxParam = { _data: this.IN_formAdd };
        } else {
          ajaxParam = { data: this.IN_formAdd };
        }

        if (PUB._paramAjaxAddon) {//如果需要合并公共变量的基础ajax参数--注意顺序
          Object.assign(ajaxParam, PUB._paramAjaxAddon)//合并公共变量的基础参数
        }

        Object.assign(ajaxParam, this.cf.cfFormAdd.paramAddonInit); //合并公共参数，之前是cf.paramAddonPublic

        const loading = this.$loading({
          lock: true, text: "执行中", spinner: "el-icon-loading", background: "rgba(0, 0, 0, 0.7)"
        });




        let flagAjaxOk = true;//ajax是否正常
        let response = await axios({//请求接口
          method: "post", url: `${PUB.domain}${this.cf.urlAdd}`, data: ajaxParam //传递参数
        }).catch((err) => {
          this.$message.error(`网络异常:${err}`);
          flagAjaxOk = false;

        });
        loading.close(); //关闭loding
        if (!flagAjaxOk) return //ajax异常退出
        //触发外部事件-把新增前后的数据都传过去
        this.$emit("after-add", response.data.addData, this.IN_formAdd);
      } else {//Q2:{新增数据接口地址}不存在-静态列表
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
        this.vm_list.getDataList(); //更新数据列表
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
            { text: "关闭", event: "cancel" }
          ]
        };
        let { copyId } = this.cf//复制的数据id
        if (copyId) {//Q1：{复制的数据id}存在
          this.cf.cfFormAdd.paramAddonInit = this.cf.cfFormAdd.paramAddonInit || {}
          this.cf.cfFormAdd.paramAddonInit._id = copyId//加入初始参数
          cfFormAddTemp.urlInit = "/info/commonDetail"
        } else {//Q2：{复制的数据id}不存在
          delete this.cf.cfFormAdd.urlInit//清除urlInit，避免出现残留上次复制的数据的问题
        }
        let { _dataType } = this.cf.cfFormAdd.paramAddonInit; //变量：{数据类型}
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
    this.vm_list = this.$closest({ vmT: this, name: "dm_list_data" })
    this.init()//调用：{初始化函数}
  },
  async mounted() { }
};
</script>
<style>
</style>
