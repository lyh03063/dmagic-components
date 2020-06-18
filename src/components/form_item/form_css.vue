<template>
  <div class="out">
    <dm_pannel_new
      :cf="item.cfPannel"
      class="MB20"
      :title="item.title"
      v-for="(item,i) in arrCf"
      :key="i"
    >
      <template #titleBar_boxLeft="{vm_title_bar,vm_pannel}">
        <div
          class="PT10 PL6 PR6 WP100 HP100 BC_ddd Cur1"
          @click="vm_pannel.showContent=!vm_pannel.showContent"
        >
          <i :class="vm_pannel.showContent?'el-icon-arrow-down':'el-icon-arrow-right'"></i>
        </div>
      </template>

      <template #titleBar_boxMiddle>
        <div class="DPIB ML10 FS12 FM4 C_3a0 code_pannel_show FX1">{{getPannelCssCode(item)}}</div>
      </template>
      <dm_dynamic_form class="MT10" :cf="item.cfForm" v-model="valueNeed"></dm_dynamic_form>
    </dm_pannel_new>
  </div>
</template>
<script>

let cfPannel = lodash.cloneDeep(PUB.cfPannel.gray_bar)
// cfPannel.toggleByClickTitle = true;//开启“点击标题栏折叠效果”


export default {
  mixins: [MIX.base, MIX.form_item_new],
  name: "form_css",//
  props: {
    cf: {
      default: function () {
        return {};
      }
    }
  },
  data() {
    return {


      arrCf: [
        {
          title: "盒子宽高/边距/展示类型",
          cfPannel: lodash.cloneDeep(cfPannel),
          cfForm: {
            col_span: 8,
            size: "mini",
            labelWidth: "200px",
            formItems: [
              F_ITEMS["width"], F_ITEMS["height"],
              F_ITEMS["margin"], F_ITEMS["padding"],
              F_ITEMS["box-sizing"], F_ITEMS["display"],

            ],
          },
        },
        {
          title: "边框/轮廓/圆角/阴影",
          cfPannel: lodash.cloneDeep(cfPannel),
          cfForm: {
            col_span: 8,
            size: "mini",
            labelWidth: "200px",
            formItems: [
              F_ITEMS["border-color"], F_ITEMS["border-width"], F_ITEMS["border-style"],
              // F_ITEMS["border"],
              F_ITEMS["border-radius"],
              F_ITEMS["outline"],
              F_ITEMS["box-shadow"],
            ],
          },
        },
        {
          title: "背景颜色/背景图",
          cfPannel: lodash.cloneDeep(cfPannel),
          cfForm: {
            col_span: 12,
            size: "mini",
            labelWidth: "240px",
            formItems: [
              F_ITEMS["background-color"],
              F_ITEMS["background-image"],
              F_ITEMS["background-repeat"],
              F_ITEMS["background-position"],
              F_ITEMS["background-size"]
            ],
          },
        },
        {
          title: "文本和字体",
          cfPannel: lodash.cloneDeep(cfPannel),
          cfForm: {
            col_span: 8,
            size: "mini",
            labelWidth: "200px",
            formItems: [
              F_ITEMS["color"],
              F_ITEMS["font-size"],
              F_ITEMS["font-weight"],
              F_ITEMS["line-height"],
              F_ITEMS["text-align"],
              F_ITEMS["text-decoration"],
              F_ITEMS["font-family"],
              F_ITEMS["font-style"],
              F_ITEMS["letter-spacing"],
              F_ITEMS["word-spacing"],
            ],
          },
        },
        {
          title: "浮动/定位",
          cfPannel: lodash.cloneDeep(cfPannel),
          cfForm: {
            col_span: 8,
            size: "mini",
            labelWidth: "180px",
            formItems: [
              F_ITEMS["float"],
              F_ITEMS["position"],
              F_ITEMS["z-index"],
              F_ITEMS["top"],
              F_ITEMS["right"],
              F_ITEMS["bottom"],
              F_ITEMS["left"],
            ],
          },
        },
      ],


    };
  },
  methods: {
    //函数：{获取当前面板的css代码函数}
    getPannelCssCode: function (item) {
      let formItems = lodash.get(item, `cfForm.formItems`);
      console.log(`formItems:#####`, formItems);
      let objCss = {}
      formItems.forEach(itemEach => {//循环：{000数组}
        let { prop } = itemEach
        if (this.valueNeed[prop]) {
          objCss[prop] = this.valueNeed[prop]
        }
      })

      let cssCode = util.objToCss(objCss)//函数：{将Css对象转成css代码函数}


      return cssCode
    },
    //函数：{初始化组件配置函数}
    initCF: async function () {
      let cfAAA = lodash.get(this.cf, `cfAAA`, {});
      let cfAAADefault = {
        aaaa: "11111"
      }
      util.setObjDefault(cfAAA, cfAAADefault);
      util.setObjDefault(this.cf, {
        // isShowSearchForm: false,
        cfAAA
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
.code_pannel_show {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>