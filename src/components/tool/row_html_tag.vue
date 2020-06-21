<template>
  <div class="out">
    <dm_collection
      v-model="valueNeed"
      :show-toolbar="true"
      :cf-form="cf.cfForm"
      :hidePart="{}"
      data-slot="dataSlot1"
    >
      <!--插槽内容-->
      <template v-slot:dataSlot1="{doc,docEntity}">
        <span class>
          {{doc[cf.labelKey]}}
          <span class="C_999">{{getSelector(doc)}}</span>
        </span>
        <!-- ---{{doc.children}}--{{arr}} -->
        <div class v-if="doc.children">
          <dm_row_html_tag class v-model="docEntity.children" v-if="docEntity.children"></dm_row_html_tag>
        </div>
      </template>
    </dm_collection>
  </div>
</template>
<script>
export default {
  mixins: [MIX.base, MIX.form_item_new],
  name: "dm_row_html_tag",//
  props: {
    cf: {
      default: function () {
        return {};
      }
    }
  },
  data() {
    return {
      children: null,
    };
  },
  computed: {
    //函数：{获取选择器字符串的函数}
    getSelector: function () {
      let fn = function (doc) {
        let { cf } = doc;
        let className = cf["class"]
        if (className) {//如果{className}存在
          var reg1 = /\s{2,}/g;
          className = className.replace(reg1, " ")//将多个空格替换成一个空格

          className = className.split(" ").join(".")
          className = `.${className}`
        }
        return className

      }
      return fn

    },

  },
  methods: {
   

    //函数：{初始化组件配置函数}
    initCF: async function () {

      let cfAAA = lodash.get(this.cf, `cfAAA`, {});
      let cfAAADefault = {
        aaaa: "11111"
      }
      util.setObjDefault(cfAAA, cfAAADefault);
      util.setObjDefault(this.cf, {
        labelKey: "tag",
        cfForm: {
          size: "mini",
          formItems: [
            { prop: "tag", label: "标签", type: "input", default: "div" },
            { prop: "text", label: "内部文本", type: "input", default: "新的盒子" },
            {
              prop: "cf", label: "节点配置", default: {}, cfForm: {
                col_span: 12,
                formItems: [
                  { prop: "id", label: "id", type: "input" },
                  { prop: "class", label: "class", type: "input" },
                ]
              }
            },
            // { prop: "children", label: "children", type: "jsonEditor", default: [] },

          ],

        },
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
</style>