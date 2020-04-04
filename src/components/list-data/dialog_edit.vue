<template>
  <div>
    <!--修改数据表单弹窗-->
    <el-dialog
      title="修改数据"
      :visible.sync="cf.visible"
      v-if="cf.visible"
      width="95%"
      :close-on-click-modal="false"
      :append-to-body="true"
    >
      <dm_debug_list level-up="1">
        <dm_debug_item v-model="IN_formModify" text="修改表单的绑定数据" />
      </dm_debug_list>
      <!--表单提示语-->
      <div class v-html="$lodash.get(cf.cfTips, `text`)" v-if="cf.cfTips" :style="getTipsStyle()"></div>
      <dm_dynamic_form
        v-model="IN_formModify"
        :cf="cf.cfFormModify"
        @submit="modifyData"
        @cancel="cf.visible = false"
      >
        <template v-slot:[item.slot]="{formData}" v-for="item in cf.cfFormModify.formItems">
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
  props: ["cf", "formModify"],
  data() {
    return {
      // cf.visible: null,
      IN_formModify: this.formModify || {}
    };
  },
  watch: {
    //监听
    formModify: {
      handler(newVal, oldVal) {
        console.log("formModify changed");
        this.IN_formModify = this.formModify || {};
      },
      // immediate: true,
      deep: true
    },
    //监听
    "cf.visible": {
      handler(newVal, oldVal) {
        console.log("cf.visible changed");
        if (newVal) {
          //打开弹窗
          //***如果{数据id存在}更新一次，因为可能切换到另一条数据
          if (this.cf.dataIdModify) {
            //补充数据id**有时候需要自动响应-比如静态属性表
            this.$set(
              this.IN_formModify,
              this.cf.cfFormModify.idKey,
              this.cf.dataIdModify
            );
            // this.IN_formModify[this.cf.cfFormModify.idKey] = this.cf.dataIdModify;
          }
        }
      }
    }
  },
  methods: {
    handelItem: util.handelItem,
    //-------------修改数据的函数--------------
    async modifyData(_data) {
      //  _data参数为了兼容单元格修改
      _data = _data || this.IN_formModify; //参数如果不传，使用this.IN_formModify
      //Q1：{修改数据接口地址}存在
      if (this.cf.urlModify) {
        let ajaxParam;
        //如果{idKey}是"_id"
        if (this.cf.cfFormModify.idKey == "_id") {
          ajaxParam = {
            _id: this.cf.dataIdModify,
            _data: _data
          };
        } else {
          ajaxParam = {
            findJson: {
              //用于定位要修改的数据
              [this.cf.cfFormModify.idKey]: this.cf.dataIdModify
            },
            modifyJson: _data
          };
        }
        Object.assign(ajaxParam, this.cf.cfFormModify.paramAddonInit); //合并公共参数，之前是cf.paramAddonPublic
        let response = await axios({
          //请求接口
          method: "post",
          url: PUB.domain + this.cf.urlModify,
          data: ajaxParam //传递参数
        });
        //Q2：{修改数据接口地址}不存在
      } else {
      }
      //****修改静态列表的数据+修改动态列表的数据
      //找到对应的数据并修改成最新的
      if (this.cf.tableData) {
        this.handelItem({
          action: "merge",
          items: this.cf.tableData,
          itemNew: _data,
          key: this.cf.cfFormModify.idKey,
          prop: this.cf.dataIdModify
        });
      }
      this.$message({
        message: "修改数据成功",
        duration: 1500,
        type: "success"
      });
      this.cf.visible = false; //关闭弹窗
      //如果{增删改操作后是否自动刷新}为真
      if (this.cf.isRefreshAfterModify) {
        this.$parent.$parent.getDataList(); //更新数据列表-暂时去掉
      }
      this.$emit("after-modify", _data); //触发外部事件, this.beforeModify
    },
    //函数：{获取提示样式函数}
    getTipsStyle() {
      let styleAdd = lodash.get(this.cf.cfTips, `style`);
      let style = { padding: "10px 10px 10px 100px", color: "#f60" };
      return Object.assign(style, styleAdd); //合并对象
    }
  },
  created() {
    /****************************处理通用列表编辑的配置-START****************************/
    //这里有点乱！！！！！
    //设置主参数
    this.$set(this.cf, "visible", !!this.cf.visible); //增加到响应系统-有了这一句，visible就可以不预留配置，默认关闭
    //如果是通用列表
    this.cf.cfFormModify = this.cf.cfFormModify || {};
    if (this.cf.listType == "common") {//如果是通用型数据
      let cfFormModifyTemp = {
        idKey: "_id", watch: {},
        urlInit: "/info/commonDetail",
        btns: [
          { text: "修改", event: "submit", type: "primary", validate: true },
          { text: "取消", event: "cancel" }
        ]
      };
      let { _dataType } = this.cf.cfFormModify.paramAddonInit; //变量：{数据类型}
      let listCF = lodash.get(PUB.listCF, `list_${_dataType}`); //根据数据类型获取对应的列表配置
      let { formItems, cfForm } = listCF; //获取对应的表单项
      cfFormModifyTemp.formItems = formItems; //表单字段
      if (cfForm) {//如果额外配置存在
           Object.assign(cfFormModifyTemp,cfForm);//合并对象
        }
      //调用：{给一个对象设置默认属性函数}
      util.setObjDefault(this.cf.cfFormModify, cfFormModifyTemp);
      //设置主参数
      this.cf.urlModify = "/info/commonModify";
    }
    /****************************处理通用列表编辑的配置-END****************************/
  },
  async mounted() { }
};
</script>
<style>
</style>
