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
      @after_add="afterAdd"
      @after_mouseenter="afterMouseenter"
      @after_mouseleave="afterMouseleave"
      titleDialogEdit="修改Html元素/属性"
      titleDialogAdd="添加Html元素/属性"
    >
      <!--插槽内容-->
      <template v-slot:dataSlot1="{doc,docEntity}">
        <!-- {{docEntity.__id}} -->
        <span class="DPF PL5" v-if="doc">
          <div class="Cur1 MR4" @click="fold(docEntity)" v-if="doc.children.length">
            <i class="el-icon-caret-right FS16" :class="{Rotate90:showChildren[docEntity.__id]}"></i>
            <span class="C_3a0 FS14">[{{doc.children.length}}]</span>
          </div>
          <span class="FS14" v-html="htmlTag(doc)"></span>
          <span class="C_999 MR20 FS14" v-if="doc.text">{{innerText(doc.text)}}</span>
          <!-- <span class="C_999 MR20 FS14" v-if="doc.desc">({{doc.desc}})</span> -->
          <el-link class="ML20 MR10" v-if="doc.children" @click="addChild(docEntity)">+子元素</el-link>
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

    innerText: function () {
      let fn = function (text) {
        if (text.length > 20) { //如果字符长度超过20
          text = text.slice(0, 17)
          text += `...`
        }
        return text

      }
      return fn
    },

    htmlTag: function () {
      let fn = function (doc) {
        let { cf = {} } = doc;
        // if (!cf) return "";
        let { labelKey, class: className, style } = cf

        let str = `<span class="code_html_tag">&lt;${doc[this.cf.labelKey]}</span>`


        for (var prop in cf) {
          //调用：{处理一组html属性显示字符的函数}
          str += util.handleAHtmlPropStr({ prop: prop, value: cf[prop] })
        }
        str += `<span class="code_html_tag">&gt;</span>`
        return str

      }
      return fn
    },


  },
  methods: {
    //函数：{集合鼠标移出的回调函数}
    afterMouseleave: async function (param) {
      if (PUB.focusEle && PUB.focusEle.cf && PUB.focusEle.cf.class) {//如果聚焦元素存在,去掉聚焦样式
        PUB.focusEle.cf.class = PUB.focusEle.cf.class.replace(" focus_ele", "")
      }


    },
    //函数：{集合鼠标移入的回调函数}
    afterMouseenter: async function (param) {
      if (!this.vm_auto_layout.isHighLightLayout) return;//如果未启用高亮区块模式，退出
      console.log(`afterMouseenter-param:#####`, param);
      let { list, focusIndex } = param

      if (PUB.focusEle && PUB.focusEle.cf && PUB.focusEle.cf.class) {//如果聚焦元素已存在,去掉聚焦样式
        PUB.focusEle.cf.class = PUB.focusEle.cf.class.replace("focus_ele", "")
        if (PUB.focusEle.cf.class.trim() === "") {//如果处理后的class为空字符，删除属性
          delete PUB.focusEle.cf.class
        }
        console.log(`PUB.focusEle.cf.class:###`, PUB.focusEle.cf.class);

      }


      PUB.focusEle = list[focusIndex]//当前元素变成聚焦元素

      if (!PUB.focusEle.cf) {//如果cf不存在-创建
        this.$set(PUB.focusEle, "cf", {});//
      }
      if (!PUB.focusEle.cf.class) {//如果class不存在
        this.$set(PUB.focusEle.cf, "class", "");//使用set方法添加一个空类
      }

      PUB.focusEle.cf.class += " focus_ele"

    },
    //函数：{添加数据后的回调函数}
    afterAdd: async function (data) {
      console.log(`data:`, data);
      /****************************保存历史记录到LocalStorage-START****************************/
      let { tag } = data
      let listHsHtmlTag = util.getLocalStorageObj("listHsHtmlTag") || []//调用：{从LocalStorage获取一个对象的函数}
      listHsHtmlTag = listHsHtmlTag.filter(d => d.tag != tag)//将同名属性过滤掉

      listHsHtmlTag.unshift({ tag })//前面添加属性
      if (listHsHtmlTag.length > 10) listHsHtmlTag.length = 10;//限制长度
      util.setLocalStorageObj("listHsHtmlTag", listHsHtmlTag)//调用：{设置一个对象到LocalStorage}
      /****************************保存历史记录到LocalStorage-END****************************/
    },
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


      let fnMatchProp = (newVal, T) => {
        console.log(`fnMatchProp`);
        let formItems = util.getFormItemsBytag(newVal)//调用：{根据html标签获取对应的属性表单项函数}
        formItemsAddon.splice(0, formItemsAddon.length);//清空数组元素*** 
        if (formItems) {
          console.log(`formItems:`, formItems);
          formItemsAddon.push(...formItems)//追加表单字段
        }
        T.$forceUpdate()//强制视图更新*****

      }


      let fnMatchPropDebounce = lodash.debounce(fnMatchProp, 500)



      util.setObjDefault(this.cf, {
        labelKey: "tag",
        cfForm: {
          size: "mini",
          labelWidth: "150px",
          watch: { //传入监听器
            tag(newVal, oldVal) {
              console.log("tag变动###1111");

              fnMatchPropDebounce(newVal, this)//执行防抖函数，避免频繁调用



            },
          },

          formItems: [

            {
              prop: "tag", label: "tag(标签)", component: "dm_input_html_tag",
            },
            // { prop: "desc", label: "描述", type: "input", default: "" },
            { prop: "text", label: "innerText(内部文本)", type: "input",},

            {
              prop: "cf", label: "公共属性", default: {}, cfForm: {
                size: "mini",
                labelWidth: "190px",
                col_span: 12,
                formItems: [
                  { prop: "class", label: "class(类名)", type: "input", },
                  { prop: "id", label: "id", type: "input" },
                  // { prop: "style", label: "style(样式)", type: "input" },
                  { prop: "style", label: "style", component: "dm_input_style_prop", },
                  { prop: "title", label: "title(悬停提示)", type: "input" },
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
    this.vm_auto_layout = this.$closest({ vmT: this, name: "auto_layout" })
  }
};
</script>
