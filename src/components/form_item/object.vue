<template>
  <div class="item-box">
    <dm_debug_list>
      <dm_debug_item v-model="cf" />
      <dm_debug_item v-model="valueNeedEdit" />
    </dm_debug_list>

    <div class="DPF">
      <div class="show-json-box FX1 C_999 LH22 ">{{valueNeed}}</div>
      <i class="el-icon-edit W20 Cur1" @click="showBaseDialogForm" v-if="!isShowBaseDialogForm"></i>
    </div>

    <!--对象编辑表单-->
    <div class="edit-form-box MT5" v-if="isShowBaseDialogForm">
      <dm_dynamic_form
        :cf="cf.cfForm"
        v-model="valueNeedEdit"
        @submit="submitBaseForm"
        @cancel="closeBaseDialogForm"
      ></dm_dynamic_form>
    </div>
  </div>
</template>

<script>
export default {
  name: "object_item",
  mixins: [MIX.form_item_new],
  //用于列表模糊查询的组件
  props: {
    cf: {
      default: function () {
        return {}
      }
    }
  },
  data() {
    return {
      valueNeedEdit: {},

      isShowBaseDialogForm: false,

      ready: true,



    };
  },

  watch: { //监听器，双向同步

    valueNeed: {
      handler(newVal, oldVal) {
        console.log(`valueNeed变动##############`);
        // this.$emit("input", this.valueNeed); //同步valueNeed值到value
        this.initValueNeedEdit()//调用：{初始化编辑状态下的对象数据函数}
      },
      // immediate: true,//组件初始化时立即执行一次变动
      deep: true //深度监听
    }
  },

  methods: {
    //函数：{初始化编辑状态下的对象数据函数}
    initValueNeedEdit() {
      if (!this.cf.cfForm) return
      let { formItems } = this.cf.cfForm
      formItems = formItems || this.cf.formItems

      let arrPropInForm = formItems.map(doc => doc.prop)
      arrPropInForm = arrPropInForm.filter(prop => prop != "__extend")
      console.log(`arrPropInForm:`, arrPropInForm);
      let objMian = { __extend: {} };

      for (var prop in this.valueNeed) {
        if (arrPropInForm.includes(prop)) {//Q1:有对应的表单配置项
          objMian[prop] = this.valueNeed[prop]
        } else { //Q2:无对应的表单配置项
          objMian["__extend"][prop] = this.valueNeed[prop]
        }
      }

      this.valueNeedEdit = objMian
    },


    //函数：{提交表单表单函数}
    submitBaseForm() {
      let { __extend, ...other } = this.valueNeedEdit
      this.valueNeed = { ...other, ...__extend }
      this.isShowBaseDialogForm = false;//关闭弹窗



    },
    //函数：{关闭基础表单弹窗函数}
    closeBaseDialogForm() {
      this.isShowBaseDialogForm = false;//关闭弹窗
    },
    //函数：{显示基础表单弹窗函数}
    showBaseDialogForm() {
      this.isShowBaseDialogForm = !this.isShowBaseDialogForm;//打开弹窗
    },





  },
  created() {
    if (!this.value) {
      this.valueNeed = {}
      this.valueNeedEdit = {}
    }



    let cfForm = this.cf.cfForm || {}
    //表单默认配置
    let cfFormDefault = {
      labelWidth: "150px",
      // col_span: 12,
      formItems: [...this.cf.formItems, { "prop": "__extend", "label": "其他属性", "type": "jsonEditor" }],
      btns: [
        { text: "保存", event: "submit", type: "warning", validate: true },
        { text: "关闭", event: "cancel" }
      ]
    }
    util.setObjDefault(cfForm, cfFormDefault);


   




    //两层配置结构，为了更好拓展


    util.setObjDefault(this.cf, {cfForm, });


    this.initValueNeedEdit()//调用：{初始化编辑状态下的对象数据函数}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.item-box {
  border: 1px #ddd dashed;
  border-radius: 5px;
  padding: 5px 10px;
}

.show-json-box {
  word-break: break-all;
  max-height: 22px;
  overflow-y: auto;
}

.edit-form-box {
  border: 1px red dashed;
  border-radius: 5px;
  padding: 5px 10px;
  word-break: break-all;
}
</style>
