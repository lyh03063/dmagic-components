<template>
  <div class="out">
    <!-- pid:{{pid}} -->
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
        <el-input
          style="width: 500px"
          type="textarea"
          :rows="4"
          v-model="propValCurr"
        ></el-input>
        <div class="PT10 TAC">
          <el-button type="primary" @click="savePropVal">保存</el-button>
        </div>
      </div>
    </el-dialog>
    <!--集合-->
    <dm_collection
      skin="skin_red"
      ref="collectionTag"
      v-model="valueNeed"
      :show-toolbar="true"
      :cf-form="cf.cfForm"
      :cfElBtnAdd="cfElBtnAdd"
      :hidePart="{ 'btn-add': true }"
      data-slot="dataSlot1"
      :showToolbar="false"
      :showSortNum="false"
      @after_add="afterAdd"
      @after_modify="afterModify"
      @after_mouseenter="afterMouseenter"
      @after_mouseleave="afterMouseleave"
      titleDialogEdit="修改Html元素/属性"
      titleDialogAdd="添加Html元素/属性"
    >
      <!--插槽内容-->
      <template v-slot:dataSlot1="{ doc, docEntity, index }">
        <!-- {{index}}--- -->
        <!-- {{docEntity.__id}} -->
        <!-- v-if="doc&&(doc.tag!=='body'&&doc.tag!=='head')" -->
        <div class="DPFC PL5" style="flex-wrap: wrap">
          <!--折叠按钮-->
          <div
            class="btn_fold"
            @click="fold(docEntity)"
            v-if="doc.children.length"
          >
            <i
              class="el-icon-caret-right FS16"
              :class="{ Rotate90: docEntity.showChildren }"
            ></i>
            <!-- <span class="C_3a0 FS14">{{ doc.children.length }}</span> -->
          </div>
          <div class v-show="allowEditHtml">
            <!--复选框-->
            <input
              v-model="docEntity.checked"
              class="DPB MR4"
              type="checkbox"
            />
          </div>
          <!--TODO标签开始符 -->
          <div
            class="code_html_tag FS14"
            @click="fnTagClick(docEntity, $event, index)"
            @click.right.prevent="fnTagClick(docEntity, $event, index)"
            href="javascript:;"
          >
            &lt;{{ doc[cf.labelKey] }}
          </div>
          <!-- {{docEntity.diyProp}}--- -->
          <!-- 自定义属性 -->
          <span
            class="FS14 DPF"
            v-for="(item, index) in docEntity.diyProp"
            :key="index"
          >
            <!--这里补充id用于js中的定位dom-->
            <div
              class="code_html_prop FS14 ML10"
              @click="fnPropClick(docEntity, $event, index, item, item.prop)"
              :id="`id_${pid}_${docEntity.__id}_${index}_prop`"
            >
              {{ valueShort(item.prop) }}
            </div>

            <span v-if="!item.ignoreVal">=</span>

            <span
            v-if="!item.ignoreVal"
              class="code_html_val"
              :title="item.value"
              @click="fnPValClick(docEntity, $event, index, item, item.prop)"
              :id="`id_${pid}_${docEntity.__id}_${index}_pval`"
              >"{{valueShort(item.value)}}"</span
            >
          </span>
          <!--标签结束符-->
          <span class="code_html_tag FS14 MR5">&gt;</span>
          <!--  TODO:节点内容-->

          <!-- 节点内文本 -->
          <div
            v-if="!noInnerHtml(doc)"
            class="MR2 FS14 box_innertext PSR"
            style="max-width: 300px"
            @click="fnContentClick(docEntity, $event, index)"
          >
            {{ innerText(doc.text) }}
            <div class="PSA R0 T0 box_count_bytes" v-if="bytes(doc.text) > 60">
              {{ bytes(doc.text) }}
              <span class="ML2" style="color: #ccc">b</span>
            </div>
          </div>

          <!-- <span class="C_999 MR20 FS14" v-if="doc.desc">({{doc.desc}})</span> -->
          <!--结束标签，同一行（非自闭合元素，且不含子元素）-->
          <div v-if="!noInnerHtml(doc) && doc.children.length == 0">
            <span class="code_html_tag FS14"
              >&lt;/{{ doc[cf.labelKey] }}&gt;</span
            >
          </div>
          <div class="FX1"></div>
          <div
            class=""
            v-if="allowEditHtml && doc.tag !== 'body' && doc.tag !== 'head'"
          >
            <i
              title="删除当前节点"
              class="C_999 Cur1 P3 el-icon-delete"
              @click="deleteDomCurr(index)"
            ></i>
            <i class="ML10 sort-num">拖</i>
          </div>
        </div>
        <div class="box_remark" v-if="doc.desc">
          &lt;!-- {{ doc.desc }}--&gt;
        </div>
        <!--TODO:子节点批量操作栏-->
        <div
          class="PL10 C_999 PT8"
          v-show="docEntity.showChildren && allowEditHtml"
          v-if="doc.children && doc.children.length"
        >
          <i
            title="全选/全不选子节点"
            class="MR10 btn_mimi el-icon-s-operation"
            @click="changeCheckAll(docEntity)"
          ></i>
          <i
            title="+子节点"
            class="MR10 btn_mimi el-icon-plus"
            @click="showDialogAddChild(docEntity)"
            >子节点</i
          >
          <i
            title="+选择子组件作为子节点"
            class="MR10 btn_mimi el-icon-plus"
            @click="showDialogAddCom(docEntity)"
            >子组件</i
          >
          <i
            title="删除选中子节点"
            class="MR10 btn_mimi el-icon-delete"
            @click="batchDeleteHtml(docEntity)"
          ></i>
          <i
            title="复制选中子节点代码"
            class="MR10 btn_mimi el-icon-document-copy"
            @click="copyCheckedHtml(docEntity)"
            >代码</i
          >
          <i
            title="粘贴代码到此"
            class="MR10 btn_mimi"
            @click="pasteHtmlForChildren(docEntity)"
            >粘贴</i
          >
          <i
            title="继续展开"
            class="MR10 btn_mimi el-icon-s-unfold"
            @click="unfoldContinue(docEntity)"
          ></i>
          <i
            title="全部折叠"
            class="MR10 btn_mimi el-icon-s-fold"
            @click="foldContinue(docEntity)"
          ></i>
        </div>
        <!-- :class="{PL12:(doc.tag!=='body'&&doc.tag!=='head')}" -->
        <!-- && doc.children.length 这个还不能删掉，影响添加子节点-->
        <div
          class="BC_fff PT0 PR12 PB1 PL15"
          :class="{ MT8: doc.children.length }"
          v-if="doc.children"
          v-show="docEntity.showChildren"
        >
          <!--Html:递归-->
          <dm_row_html_tag
            :pid="`${pid}__${docEntity.__id}`"
            :ref="`children_${pid}__${docEntity.__id}`"
            @add_son_com="addSonComFromChildren"
            @popper_html_tag="popperHtmlTag"
            @popper_html_prop="popperHtmlProp"
            @popper_html_pval="popperHtmlPVal"
            @popper_html_content="popperHtmlContent"
            @html_tag_mouseenter="htmlTagMouseenterFromChildren"
            @html_tag_mouseleave="htmlTagMouseleaveFromChildren"
            class
            v-model="docEntity.children"
          ></dm_row_html_tag>
        </div>
        <!--结束标签，独占一行（非自闭合元素，且含子元素）-->
        <div class="PL2 LH14" v-if="!noInnerHtml(doc) && doc.children.length">
          <span class="code_html_tag FS14"
            >&lt;/{{ doc[cf.labelKey] }}&gt;</span
          >
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
    pid: {//父元素的__id值，用于形成绝对唯一的id链条
      default: "body"
    },
    cf: {
      default: function () {
        return {};
      }
    }
  },
  //  FIXME:data配置
  data() {
    return {

      cfOptionInput: {
        cfPopover: { width: 400, placement: "bottom" },
        cfListFlex: { widthG: "32%", spaceY: "5px", }
      },
      vm_auto_layout: null,//父组件
      popperClass: "",//popper弹窗的附加类名
      isShowPopoverIn: true,//是否显示el-popover内部盒子
      popperOptions: {
      },
      showContent: {},//显示节点内容popover弹窗配置对象
      docHtmlFocus: null,
      cfFormPropVal: {
        size: "mini",
        labelWidth: "0px",
        formItems: [
        ],
      },
      propValCurr: "xxxxx",
      isShowDialog: false,
      cfElBtnAdd: { text: "+子元素", type: "info", size: "mini", },
      children: null,
    };
  },
  computed: {


    allowEditHtml: function () {
      if (!this.vm_auto_layout) return
      return this.vm_auto_layout.allowEditHtml
    },
    //  END-bytes
    bytes: function () {
      let fn = function (str) {
        return util.countByte(str)
      }
      return fn
    },
    //是否不显示内部代码
    noInnerHtml: function () {
      let arr = ["img", "input", "br", "hr", "meta", "link"]
      let fn = function (doc) {
        let flag
        let { tag, cf } = doc
        if (tag == "script" && cf && cf.src) {//script元素分两种情况
          flag = true
        } else {
          flag = arr.includes(tag)
        }
        return flag
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
        let { modeShowHProp } = this.vm_auto_layout
        let maxLength = modeShowHProp == "whole" ? 999 : 20
        if (text.length > maxLength) { //如果字符长度超过限制
          text = text.slice(0, maxLength - 3)
          text += `...`
        }
        return text
      }
      return fn
    },
    innerText: function () {
      let fn = function (text) {
        if (!text) return ""
        let { modeShowHProp } = this.vm_auto_layout
        let maxLength = modeShowHProp == "whole" ? 999 : 20
        if (text.length > modeShowHProp) { //如果字符长度超过20
          text = text.slice(0, maxLength - 3)
          text += `...`
        }
        return text
      }
      return fn
    },
  },
  methods: {
    //函数：{html标签点击事件函数}
    fnTagClick: function (docEntity, ev, index) {
      this.$emit('popper_html_tag', { doc: docEntity, ev, vm_row: this, index })
    },
    //函数：{弹出标签编辑popper弹窗函数-内部}
    popperHtmlTag: async function (param) {
      console.log(`popperHtmlTag-in`);
      this.$emit("popper_html_tag", param);//继续向外传递
    },
    //函数：{html属性点击事件函数}
    fnPropClick: function (docEntity, ev, index, item, prop) {
      this.$emit('popper_html_prop', { doc: docEntity, ev, vm_row: this, index, item, prop })
    },

    //函数：{弹出属性编辑popper弹窗函数-内部}
    popperHtmlProp: async function (param) {
      console.log(`popperHtmlTag-in`);
      this.$emit("popper_html_prop", param);//继续向外传递
    },

    //函数：{html属性值点击事件函数}
    fnPValClick: function (docEntity, ev, index, item, prop) {
      this.$emit('popper_html_pval', { doc: docEntity, ev, vm_row: this, index, item, prop })
    },

    //函数：{弹出属性值编辑popper弹窗函数-内部}
    popperHtmlPVal: async function (param) {
      console.log(`popper_html_pval-in`);
      this.$emit("popper_html_pval", param);//继续向外传递
    },



    //函数：{html内容点击事件函数}
    fnContentClick: function (docEntity, ev, index, item, prop) {
      this.$emit('popper_html_content', { doc: docEntity, ev, vm_row: this, index, item, prop })
    },
    //函数：{弹出属性值编辑popper弹窗函数-内部递归}
    popperHtmlContent: async function (param) {
      console.log(`popper_html_content-in`);
      this.$emit("popper_html_content", param);//继续向外传递
    },



    //函数：{在html属性后方添加属性}
    addPropAfter: async function ({ docEntity, index, position = "after", prop = "new", value = "xxx", }) {
      let indexNew = index + 1;
      if (position == "before") {
        indexNew = index
      }
      let { showPopoverBody } = this.vm_auto_layout//提取父组件的数据
      docEntity.diyProp.splice(indexNew, 0, { prop, value })//插入元素
      //新属性弹窗展示
      await this.$nextTick();//延迟到视图更新
      // this.$set(showPopoverBody, `${this.pid}__${docEntity.__id}_${indexNew}_name`, true);//弹窗重新定位
      let { pid } = this
      let idNew = `id_${pid}_${docEntity.__id}_${indexNew}_prop`
      console.log(`idNew:####`, idNew);
      let elPropNew = document.querySelector(`#${idNew}`)
      $(elPropNew).trigger("click")//触发一次点击事件，重新定位弹窗-jquery方式



      //如何在这里触发一次新增的属性名节点的点击？？？


    },
    //函数：{删除当前html节点函数}-真对右侧的删除节点按钮
    deleteDomCurr: async function (index) {
      window.arr_$targetIndex = [];//**清空链条数组，否则会影响后续的聚焦
      this.$refs.collectionTag.deleteData(index)
    },
    //函数：{全选按钮值变动函数}
    changeCheckAll: function (docEntity) {
      let { isCheckAll } = docEntity;
      if (isCheckAll) {
        this.$set(docEntity, "isCheckAll", false);//set***
      } else {
        this.$set(docEntity, "isCheckAll", true);//set***
      }
      docEntity.children.forEach(itemEach => {//循环：{遍历子节点数组}
        this.$set(itemEach, "checked", !isCheckAll);//set***
      })
    },
    //函数：{批量删除子节点函数}
    batchDeleteHtml: function (docEntity) {
      let lengthOld = docEntity.children.length
      let childrenNew = docEntity.children.filter(d => d.checked != true)
      let lengthNew = childrenNew.length
      if (lengthNew >= lengthOld) return this.$message.error('未选择任何子节点');
      docEntity.children = childrenNew
      this.$set(docEntity, "isCheckAll", false);
    },
    //函数：{复制选中的子节点代码函数}
    copyCheckedHtml: function (docEntity) {
      let lengthOld = docEntity.children.length
      let childrenNew = docEntity.children.filter(d => d.checked == true)
      let lengthNew = childrenNew.length
      if (lengthNew == 0) return this.$message.error('未选择任何子节点');
      let htmlCode = util.arrToHtml({ arrHtml: [...childrenNew], needId: false })//函数：{根据arrHtml拼接Html代码函数}
      util.setClipBoardData(htmlCode)//设置剪贴板内容（兼容谷歌浏览器）
      this.$message.success('复制成功');
    },
    //函数：{粘贴代码为子节点的函数}
    pasteHtmlForChildren: function (docEntity) {
      //这个牛逼！！！！
      this.vm_auto_layout.dialogPasteHtml(docEntity.children)
      // this.$message.success('粘贴成功');
    },
    //函数：{继续展开函数}
    unfoldContinue: function (docEntity) {
      if (docEntity.showChildrenLevel) {
        docEntity.showChildrenLevel++
      } else {
        this.$set(docEntity, "showChildrenLevel", 1);
      }
      this.setShowChildrenLevel({ docEntity, children: docEntity.children, flag: true })
    },
    //函数：{设置展开层级函数}
    setShowChildrenLevel: function ({ docEntity, children, layerHandle = 0, flag = false, nMax }) {
      layerHandle++;
      if (layerHandle > 9) return;
      let { showChildrenLevel = 1 } = docEntity
      if (nMax) {//Q1：最大层级限制存在
        if (layerHandle > nMax) return;
      } else if (layerHandle > showChildrenLevel) {//Q2：最大层级限制不存在，且layerHandle超过当前设置层级
        return;
      }
      children.forEach(itemEach => {//循环：{子节点数组}
        this.$set(itemEach, "showChildren", flag);
        //递归***
        this.setShowChildrenLevel({ docEntity, children: itemEach.children, layerHandle, flag, nMax })
      })
    },
    //函数：{继续折叠函数}
    foldContinue: function (docEntity) {
      this.$set(docEntity, "showChildrenLevel", 0);
      this.setShowChildrenLevel({ docEntity, children: docEntity.children, nMax: 99, flag: false })
    },
    //函数：{将html元素代码复制到剪贴板函数}
    copyHtmlCode: function (docEntity) {
      let objNeed = { arrHtml: [docEntity] }
      let htmlCode = util.arrToHtml({ arrHtml: [docEntity], needId: false })//函数：{根据arrHtml拼接Html代码函数}
      util.setClipBoardData(htmlCode)//设置剪贴板内容（兼容谷歌浏览器）
      this.$message.success('已复制代码到剪贴板');
    },
    //函数：{pover显示时的回调函数}
    fnShowPover: async function ({ docEntity, prop }) {
      this.cfFormPropVal.formItems = await this.getFormItemsByProp({ prop })
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
  
    //TODO:函数：{showPopoverTag}
    showPopoverTag: async function ({ docEntity }) {
      let { showPopoverBody } = this.vm_auto_layout//提取父组件的数据
      let { __id } = docEntity;
      this.$set(showPopoverBody, `${this.pid}__${docEntity.__id}`, true);
    },
    
    //TODO:函数：{getPopoverKey}--这个作用不大，性能优化也不明显！！！
    getPopoverKey: async function ({ docEntity, prop, index }) {
      return this.vm_auto_layout.showPopoverBody[`${this.pid}__${docEntity.__id}_${index}_name`]
    },
    //函数：{showPopoverProp}
    showPopoverProp: async function ({ docEntity, prop, index }) {
      let { showPopoverBody } = this.vm_auto_layout//提取父组件的数据
      let { __id } = docEntity;
      this.$set(showPopoverBody, `${this.pid}__${docEntity.__id}_${index}_name`, true);
    },
    //TODO:函数：{popover弹窗完全显示的回调函数}
    afterEnter: async function () {
      // alert(`afterEnter`);
      this.$nextTickStatus("isShowPopoverIn")//解决el-popover内部组件显示异常的问题！！！
      //下面代码解决切换tabs时的隐藏问题***
      let { activeName } = this.vm_auto_layout
      this.popperClass = `${activeName}_popover`
    },
    //函数：{集合鼠标移入的回调函数}
    afterMouseenter: async function (param) {
      this.$emit("html_tag_mouseenter", param);//传递到外部组件去执行聚焦！！！
      if (this.vm_auto_layout.modeShowHtml == 'actual') return;//如果是真实模式，退出
      //以下是测试模式！！！
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
        this.$set(PUB.focusEle.cf, "focus_ele", "");//使用set方法添加一个空类,高亮处理
      }
      PUB.focusEle.cf.focus_ele = "1"
    },
    //函数：{集合鼠标移出的回调函数}
    afterMouseleave: async function (param) {
      this.$emit("html_tag_mouseleave", param);
      if (this.vm_auto_layout.modeShowHtml == 'actual') return;//如果是真实模式，退出
      if (PUB.focusEle && PUB.focusEle.cf && PUB.focusEle.cf.focus_ele) {//如果聚焦元素存在,去掉聚焦样式
        this.$set(PUB.focusEle.cf, "focus_ele", "");//使用set方法添加一个空类
        delete PUB.focusEle.cf.focus_ele
      }
    },
    //函数：{子html鼠标移入的回调函数}
    htmlTagMouseenterFromChildren: async function (param) {
      let { focusIndex, objTarget } = param
      let { __id } = objTarget//获取__id
      window.arr_$targetIndex.push(__id)
      let $target = util.getParentJQ()
      util.removeAllFocusClass()//调用：{清除所有focus元素状态的函数}
      $target.addClass("focus_ele")
    },
    //函数：{子html鼠标移出的回调函数}
    htmlTagMouseleaveFromChildren: async function () {
      let $target = util.getParentJQ()
      $target.removeClass("focus_ele")
      window.arr_$targetIndex.pop()
      let $targetP = util.getParentJQ()//继续获取父元素，如果有的话，聚焦 
      if ($targetP) {
        $targetP.addClass("focus_ele")
      }
    },
    //函数：{添加数据后的回调函数}
    afterAdd: async function (data) {
      util.clearObj(data.cf)//调用：{清除对象中的空属性（null,undefined,空格等）}
      util.clearObj(data)//调用：{清除对象中的空属性（null,undefined,空格等）}
      let { tag } = data
      util.addHtmlUseHistory({ tag })//调用：{添加html元素使用的LocalStorage历史记录}
    },
    //函数：{修改数据后的回调函数}
    afterModify: async function (data) {
      util.clearObj(data.cf)//调用：{清除对象中的空属性（null,undefined,空格等）}
      util.clearObj(data)//调用：{清除对象中的空属性（null,undefined,空格等）}
      let { tag } = data
      util.addHtmlUseHistory({ tag })//调用：{添加html元素使用的LocalStorage历史记录}
    },
    //函数：{显示添加子元素弹窗函数}
    showDialogAddChild: async function (docEntity) {
      let key = `children_${this.pid}__${docEntity.__id}`;//ref变量
      this.$refs[key].$refs.collectionTag.addGroup()//弹窗打开
      this.$set(docEntity, "showChildren", true);//强行展开
    },
    //JS:添加子组件弹窗
    //函数：{显示添加子组件弹窗函数}
    showDialogAddCom: async function (docEntity) {
      this.$emit("add_son_com", docEntity);
    },
    //JS:子元素添加子组件函数
    //函数：{当前元素的子元素添加子组件函数}-注意这里有点绕的****
    addSonComFromChildren: async function (docEntity) {
      //居然能拿到docEntity，有点困惑
      this.$emit("add_son_com", docEntity);
    },
    //函数：{展开/收起函数}
    fold: function (docEntity) {
      let { showChildren } = docEntity
      if (showChildren) {//Q1:{showChildren}为真
        this.$set(docEntity, "showChildren", false);
      } else { //Q2:否则
        this.$set(docEntity, "showChildren", true);
      }
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
            { prop: "desc", label: "描述", type: "input", default: "" },
            { prop: "text", label: "innerText(内部文本)", type: "input", },
            { prop: "children", show: false, label: "children", type: "jsonEditor", default: [] },
            { "prop": "diyProp", "label": "html属性", "col_span": 24, component: "dm_collection_html_prop", }
          ],
        },
      });
    },
  },
  async created() {
    this.vm_auto_layout = Vue.vm_auto_layout;
    this.initCF()//调用：{初始化组件配置函数}
  },
  mounted() {
    this.$emit("inited", { vm: this }); //将当前对象抛出
  },
};
</script>
<style  scoped>
/* FIXME样式 */
/* 注释节点 */
.box_remark {
  width: 100%;
  color: #3a0;
  padding-left: 4px;
  line-height: 12px;
  margin-top: -2px;
}
/* 折叠按钮 */
.btn_fold {
  cursor: pointer;
  margin-left: -22px;
  margin-right: 4px;
  display: flex;
  align-items: center;
  line-height: 18px;
}
.box_innertext {
  border: 1px #333 solid;
  height: 18px;
  line-height: 16px;
  display: block;
  border-radius: 2px;
  padding: 0 4px;
  font-size: 12px;
  overflow-y: hidden;
  overflow-x: hidden;
  word-break: break-all;
}
.box_count_bytes {
  padding: 0 3px;
  background: rgba(9, 9, 9, 0.7);
  color: #fff;
}

/* 拖拽按钮*/
.sort-num {
  text-align: center;
  line-height: 26px;
  width: 20px;
  display: inline-block;
  background: #c5c1c1;
  color: #fff;
  font-style: normal;
  cursor: move;
}
</style>
