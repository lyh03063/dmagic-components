<template>
  <div class="out">
    <dm_collection
      ref="collection"
      v-model="valueNeed"
      :show-toolbar="true"
      :cf-form="cf.cfForm"
      :cfElBtnAdd="cfElBtnAdd"
      :hidePart="{'btn-add111':true}"
      data-slot="dataSlot1"
      @after_add="afterAdd"
      titleDialogEdit="修改Css属性/属性值"
      titleDialogAdd="添加Css属性/属性值"
    >
      <!--插槽内容-->
      <template v-slot:dataSlot1="{doc,docEntity}">
        <!-- {{docEntity.__id}} -->
        <span class="DPF PL5" v-if="doc">
          <span class=" FS14" v-html="cssCodeText(doc)"></span>
        </span>
      </template>
    </dm_collection>
  </div>
</template>
<script>
export default {
  mixins: [MIX.base, MIX.form_item_new],
  name: "row_css_code",//
  props: {
    cf: {
      default: function () {
        return {};
      }
    }
  },
  data() {
    return {
      showChildren: {},//显示子元素，必须是一个对象
      cfElBtnAdd: { text: "+Css属性", type: "info", size: "mini", },
      children: null,
    };
  },
  computed: {


  },
  methods: {
    //函数：{添加数据后的回调函数}
    afterAdd: async function (data) {
      /****************************保存历史记录到LocalStorage-START****************************/
      let { prop } = data
      let listHsCssProp = util.getLocalStorageObj("listHsCssProp") || []//调用：{从LocalStorage获取一个对象的函数}
      listHsCssProp = listHsCssProp.filter(d => d.prop != prop)//将同名属性过滤掉

      listHsCssProp.unshift({ prop })//前面添加属性
      if (listHsCssProp.length > 10) listHsCssProp.length = 10;//限制长度
      util.setLocalStorageObj("listHsCssProp", listHsCssProp)//调用：{设置一个对象到LocalStorage}
      /****************************保存历史记录到LocalStorage-END****************************/
    },
    //函数：{根据css对象返回css代码函数}
    cssCodeText: function (doc) {
      return `<span class="code_css_prop">${doc.prop}</span>:<span class="code_css_val">${doc.value}</span>;`
    },





    //函数：{初始化组件配置函数}
    initCF: async function () {

      let valItem = { prop: "value", label: "value(属性值)", type: "input", }
      let T = this;
      let formItems = [
        {
          prop: "prop", label: "prop(属性名)", type: "input", component: "dm_input_css_prop",
        },
        { prop: "value", label: "value(属性值)", type: "input", }
      ]


      util.setObjDefault(this.cf, {
        labelKey: "prop",
        cfForm: {
          size: "mini",
          labelWidth: "150px",
          watch: { //传入监听器
            async prop(newVal, oldVal) {
              console.log("prop变动###");
              //要改造value字段，如果有值项，变成下拉框，否则是文本框
              let valItemCurr = util.getValItemByCssProp(newVal)//调用：{根据Css属性获取到的value字段配置}
              console.log(`valItemCurr:`, valItemCurr);
              if (!valItemCurr) return
              let index = formItems.findIndex(d => d.prop == newVal);//value字段的索引
              formItems.splice(index, 1);//删除一个字段
              await this.$forceUpdate()//强制视图更新*****
              // await this.$nextTick();//延迟到视图更新
              formItems.push(valItemCurr);//加入一个字段
              console.log(`formItems:`, formItems);
              this.$forceUpdate()//强制视图更新*****第二次
            },
          },
          formItems,

        },
      });

    },
  },
  async created() {
    this.initCF()//调用：{初始化组件配置函数}

  },
  mounted() {
    this.$emit("inited", { vm: this }); //将当前对象抛出
  }
};
</script>
<style scoped>
</style>