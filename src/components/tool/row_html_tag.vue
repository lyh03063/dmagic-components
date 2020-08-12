<template>
  <div class="out">
    <!--修改属性弹窗-->
    <el-dialog
      custom-class="n-el-dialog"
      width="550px"
      title="修改属性"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :append-to-body="true"
      v-bind:visible.sync="isShowDialog"
      v-if="isShowDialog"
    >
      <div class>
        <el-input style="width:500px;" type="textarea" :rows="4" v-model="propValCurr"></el-input>
        <div class="PT10 TAC">
          <el-button type="primary" @click="savePropVal">保存</el-button>
        </div>
      </div>
    </el-dialog>
    <!--集合-->
    <dm_collection
      ref="collectionTag"
      v-model="valueNeed"
      :show-toolbar="true"
      :cf-form="cf.cfForm"
      :cfElBtnAdd="cfElBtnAdd"
      :hidePart="{'btn-add':true}"
      data-slot="dataSlot1"
      @after_add="afterAdd"
      @after_modify="afterModify"
      @after_mouseenter="afterMouseenter"
      @after_mouseleave="afterMouseleave"
      titleDialogEdit="修改Html元素/属性"
      titleDialogAdd="添加Html元素/属性"
    >
      <!--插槽内容-->
      <template v-slot:dataSlot1="{doc,docEntity}">
        <!-- {{docEntity.__id}} -->
        <span class="DPF PL5" v-if="doc" style="flex-wrap:wrap">
          <div class="Cur1 MR4" @click="fold(docEntity)" v-if="doc.children.length">
            <i class="el-icon-caret-right FS16" :class="{Rotate90:showChildren[docEntity.__id]}"></i>
            <span class="C_3a0 FS14">[{{doc.children.length}}]</span>
          </div>
          <!--标签开始符-->
          <span class="code_html_tag FS14">&lt;{{doc[cf.labelKey]}}</span>

          <!--html属性v-model="docEntity.showPover"-->
          <span class="FS14" v-for="(value,prop) in docEntity.cf" :key="prop">
            <template v-if="prop!='focus_ele'">
              <span class="ML10 code_html_prop">{{prop}}</span>
              <span>=</span>
              <el-popover
                placement="bottom-start"
                width="420"
                trigger="click"
                @show="fnShowPover({docEntity,prop})"
              >
                <!-- {{docEntity}} -->
                <div class="TAR">
                  <!-- <i class="el-icon-close FS16 Cur1 P5" @click="docEntity.showPover=false"></i> -->
                </div>
                <div v-if="docEntity.showPover">
                  <!-- <dm_object class="" v-model="docEntity.cf" ></dm_object> -->
                  <dm_dynamic_form :cf="cfFormPropVal" v-model="docEntity.cf"></dm_dynamic_form>
                </div>

                <span slot="reference" @click="$set(docEntity,'showPover',true)">
                  <span>"</span>
                  <span class="code_html_val" :title="value" slot="reference">{{valueShort(value)}}</span>
                  <span>"</span>
                </span>
              </el-popover>
            </template>
          </span>

          <!--标签结束符-->
          <span class="code_html_tag FS14">&gt;</span>

          <!--  -->

          <el-popover placement="bottom-start" width="520" trigger="click" v-if="!isCloseSelf(doc)">
            <div class>
              <dm_js_code_curr v-model="docEntity.text" v-if="doc[cf.labelKey]=='script'"></dm_js_code_curr>
              <el-input
                v-else
                style="width:500px;"
                type="textarea"
                autosize
                placeholder="请输入内部文本"
                v-model="docEntity.text"
              ></el-input>
            </div>

            <span class="C_999 MR20 FS14 box_innertext" slot="reference">{{innerText(doc.text)}}</span>
          </el-popover>

          <!-- <span class="C_999 MR20 FS14" v-if="doc.desc">({{doc.desc}})</span> -->
          <el-link
            class="ML20 MR10"
            v-if="doc.children && !isNoChildren(doc)"
            @click="showDialogAddChild(docEntity)"
          >+子元素</el-link>

          <!-- END:Html:子组件按钮 -->
          <el-link
            class="MR10"
            v-if="doc.children && !isNoChildren(doc)"
            @click="showDialogAddCom(docEntity)"
          >+子组件</el-link>
          <!-- {{showChildren[docEntity.__id]}} -->
        </span>
        <div
          class="BC_fff PT8 PL8 PR8 PB1"
          v-if="doc.children"
          v-show="showChildren[docEntity.__id]"
        >
          <!--END:Html:递归-->
          <dm_row_html_tag
            :ref="`children_${docEntity.__id}`"
            @add_son_com="addSonComFromChildren"
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

      docHtmlFocus: null,
      cfFormPropVal: {
        size: "mini",
        labelWidth: "0px",
        formItems: [

        ],

      },
      propValCurr: "xxxxx",
      isShowDialog: false,
      showChildren: {},//显示子元素，必须是一个对象
      cfElBtnAdd: { text: "+子元素", type: "info", size: "mini", },
      children: null,
    };
  },
  computed: {
    //是否为自闭合元素
    isCloseSelf: function () {
      let arr = ["img", "input", "br", "hr", "meta",]

      let fn = function (doc) {
        let { tag } = doc
        return arr.includes(tag)

      }
      return fn

    },
    //没有子元素
    isNoChildren: function () {
      let arr = ["img", "input", "br", "hr", "meta", "script", "link", "title",]

      let fn = function (doc) {
        let { tag } = doc
        return arr.includes(tag)

      }
      return fn

    },
    valueShort: function () {
      let fn = function (text) {
        if (!text) return ""
        if (text.length > 20) { //如果字符长度超过20
          text = text.slice(0, 17)
          text += `...`
        }
        return text

      }
      return fn
    },
    innerText: function () {
      let fn = function (text) {
        if (!text) return ""
        if (text.length > 20) { //如果字符长度超过20
          text = text.slice(0, 17)
          text += `...`
        }
        return text

      }
      return fn
    },



  },
  methods: {
    //函数：{pover显示时的回调函数}
    fnShowPover: async function ({ docEntity, prop }) {
      console.log(`prop:#############`, prop);

      this.cfFormPropVal.formItems = await this.getFormItemsByProp({ prop })
      console.log(`this.cfFormPropVal.formItems:`, this.cfFormPropVal.formItems);


    },
    //函数：{根据html属性获取对应的表单字段配置}
    getFormItemsByProp: async function ({ prop }) {
      let formItems = [{ prop, type: "textarea" }]
      if (prop == "style") {//如果是style属性
        formItems = [{ prop: prop, component: "dm_input_style_prop", }]
      }
      return formItems
    },


    //函数：{保存属性值函数}
    savePropVal: async function () {

      this.isShowDialog = false;
      let { cf, tag } = this.docTagCurr;
      cf[this.propCurr] = this.propValCurr;





    },
    //函数：{点击html属性值函数}
    fnClickHtmlTag: async function (ev, doc) {
      this.docTagCurr = doc;
      let $target = $(ev.target);
      if ($target.hasClass("code_html_val")) {
        let eleProp = ev.target.previousElementSibling;//节点：前一个元素（属性名）
        let prop = eleProp.innerText
        this.propCurr = prop.trim();
        this.isShowDialog = true;
        let { cf, tag } = doc;
        await util.timeout(100); //延迟
        this.propValCurr = cf[this.propCurr];
      }
    },

    //函数：{集合鼠标移出的回调函数}
    afterMouseleave: async function (param) {
      if (this.vm_auto_layout.modeShowHtml == 'actual') return;//如果是真实模式，退出
      if (PUB.focusEle && PUB.focusEle.cf && PUB.focusEle.cf.focus_ele) {//如果聚焦元素存在,去掉聚焦样式
        this.$set(PUB.focusEle.cf, "focus_ele", "");//使用set方法添加一个空类
        delete PUB.focusEle.cf.focus_ele
      }
    },
    //函数：{集合鼠标移入的回调函数}
    afterMouseenter: async function (param) {
      if (this.vm_auto_layout.modeShowHtml == 'actual') return;//如果是真实模式，退出
      if (!this.vm_auto_layout.isHighLightLayout) return;//如果未启用高亮区块模式，退出
      let { list, focusIndex } = param

      if (PUB.focusEle && PUB.focusEle.cf && PUB.focusEle.cf.focus_ele) {//如果聚焦元素已存在,去掉聚焦样式
        delete PUB.focusEle.cf.focus_ele

      }


      PUB.focusEle = list[focusIndex]//当前元素变成聚焦元素

      if (!PUB.focusEle.cf) {//如果cf不存在-创建
        this.$set(PUB.focusEle, "cf", {});//
      }
      if (!PUB.focusEle.cf.focus_ele) {//如果class不存在
        this.$set(PUB.focusEle.cf, "focus_ele", "");//使用set方法添加一个空类
      }

      PUB.focusEle.cf.focus_ele = "1"

    },
    //函数：{添加数据后的回调函数}
    afterAdd: async function (data) {
      let { tag } = data
      util.addHtmlUseHistory({ tag })//调用：{添加html元素使用的LocalStorage历史记录}



    },
    //函数：{修改数据后的回调函数}
    afterModify: async function (data) {
      let { tag } = data
      util.addHtmlUseHistory({ tag })//调用：{添加html元素使用的LocalStorage历史记录}


    },
    //函数：{显示添加子元素弹窗函数}
    showDialogAddChild: async function (docEntity) {
      let key = `children_${docEntity.__id}`;//ref变量
      this.$refs[key].$refs.collectionTag.addGroup()//弹窗打开
      this.$set(this.showChildren, docEntity.__id, true);//强行展开

    },
    //END:JS:添加子组件弹窗
    //函数：{显示添加子组件弹窗函数}
    showDialogAddCom: async function (docEntity) {
      console.log(`showDialogAddCom####`, docEntity);
      this.$emit("add_son_com", docEntity);

    },
    //END:JS:子元素添加子组件函数
    //函数：{当前元素的子元素添加子组件函数}-注意这里有点绕的****
    addSonComFromChildren: async function (docEntity) {
      //居然能拿到docEntity，有点困惑
      this.$emit("add_son_com", docEntity);


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
        let formItems = util.getFormItemsBytag(newVal)//调用：{根据html标签获取对应的属性表单项函数}
        formItemsAddon.splice(0, formItemsAddon.length);//清空数组元素*** 
        if (formItems) {
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

              fnMatchPropDebounce(newVal, this)//执行防抖函数，避免频繁调用



            },
          },

          formItems: [

            {
              prop: "tag", label: "tag(标签)", component: "dm_input_html_tag",
            },
            // { prop: "desc", label: "描述", type: "input", default: "" },
            { prop: "text", label: "innerText(内部文本)", type: "input", },

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
            {
              prop: "cf", label: "事件属性", default: {}, cfForm: {
                size: "mini",
                labelWidth: "190px",
                col_span: 12,
                formItems: [
                  { prop: "onclick", label: "onclick（鼠标点击）", type: "onclick", },
                  { prop: "ondblclick", label: "ondblclick（鼠标双击）", type: "ondblclick", },
                  { prop: "onmouseenter", label: "onmouseenter（鼠标进入）", type: "onmouseenter", },
                ]
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

<style  scoped>
.box_innertext {
  margin: 5px 0 0 0;
  border: 1px #999 solid;
  height: 18px;
  line-height: 16px;
  display: block;
  border-radius: 2px;
  padding: 0 4px;
  font-size: 12px;
}
</style>
