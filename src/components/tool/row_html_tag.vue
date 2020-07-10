<template>
  <div class="out">
    <dm_collection
      ref="collectionTag"
      v-model="valueNeed"
      :show-toolbar="true"
      :cf-form="cf.cfForm"
      :cfElBtnAdd="cfElBtnAdd"
      :hidePart="{'btn-add':true}"
      data-slot="dataSlot1"
    >
      <!--插槽内容-->
      <template v-slot:dataSlot1="{doc,docEntity}">
        <!-- {{docEntity.__id}} -->
        <span class="DPF PL5" v-if="doc">
          <div class="Cur1 MR4" @click="fold(docEntity)" v-if="doc.children.length">
            <i class="el-icon-caret-right" :class="{Rotate90:showChildren[docEntity.__id]}"></i>
            <span class="C_999">[{{doc.children.length}}]</span>
          </div>
          <span class="C_3a0 FS14">&lt;{{doc[cf.labelKey]}}&gt;</span>
          <span class="C_999 MR10 FS14">{{getSelector(doc)}}</span>
          <span class="C_999 MR20 FS14" v-if="doc.desc">({{doc.desc}})</span>
          <el-link class="MR10" v-if="doc.children" @click="addChild(docEntity)">+子元素</el-link>
          <!-- {{showChildren[docEntity.__id]}} -->
        </span>
        <div
          class="BC_fff PT8 PL8 PR8 PB1"
          v-if="doc.children"
          v-show="showChildren[docEntity.__id]"
        >
          <dm_row_html_tag
            :ref="`children_${docEntity.__id}`"
            class
            v-model="docEntity.children"
            v-if="docEntity.children"
          ></dm_row_html_tag>
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
      showChildren: {},//显示子元素，必须是一个对象
      cfElBtnAdd: { text: "+子元素", type: "info", size: "mini", },
      children: null,
    };
  },
  computed: {
    //函数：{获取选择器字符串的函数}
    getSelector: function () {
      let fn = function (doc) {
        let { cf } = doc;
        if(!cf)return "";
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

    //函数：{添加子元素函数}
    addChild: async function (docEntity) {
      let key = `children_${docEntity.__id}`;//ref变量
      this.$refs[key].$refs.collectionTag.addGroup()

    },


    //函数：{展开/收起函数}
    fold: function (docEntity) {

      let flag = !this.showChildren[docEntity.__id]
      this.$set(this.showChildren, docEntity.__id, flag);

    },


    //函数：{初始化组件配置函数}
    initCF: async function () {

      let formItemsAddon = []
      let T = this;



      util.setObjDefault(this.cf, {
        labelKey: "tag",
        cfForm: {
          size: "mini",
          labelWidth: "150px",
          watch: { //传入监听器
            tag(newVal, oldVal) {
              console.log("tag变动###");
              let formItems = util.getFormItemsBytag(newVal)//调用：{根据html标签获取对应的属性表单项函数}

              if (!formItems) return
              console.log(`formItems:`, formItems);
              formItemsAddon.splice(0, formItemsAddon.length);//清空数组元素*** 
              formItemsAddon.push(...formItems)//追加表单字段
              this.$forceUpdate()//强制视图更新*****
            },
          },

          formItems: [
            {
              prop: "tag", label: "tag(标签)", type: "input", default: "div",
              "frequency": { sytle: { width: "68px" }, options: [{ value: "div" }, { value: "img" }, { value: "a" }, { value: "input" }, { value: "video" },{ value: "audio" },  { value: "link" },] }
            },
            { prop: "desc", label: "描述", type: "input", default: "" },
            { prop: "text", label: "innerText", type: "input", default: "新的盒子" },

            {
              prop: "cf", label: "公共属性", default: {}, cfForm: {
                size: "mini",
                labelWidth: "190px",
                col_span: 12,
                formItems: [
                  { prop: "class", label: "class", type: "input", default: "box_layout" },
                  { prop: "id", label: "id", type: "input" },

                ]
              }
            },
            {
              prop: "cf", label: "私有属性", default: {}, cfForm: {
                size: "mini",
                labelWidth: "190px",
                col_span: 12,
                formItems: formItemsAddon
              }
            },
            { prop: "children", show: false, label: "children", type: "jsonEditor", default: [] },

          ],

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