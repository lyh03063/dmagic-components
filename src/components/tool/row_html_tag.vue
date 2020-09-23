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
      skin="skin_red"
      ref="collectionTag"
      v-model="valueNeed"
      :show-toolbar="true"
      :cf-form="cf.cfForm"
      :cfElBtnAdd="cfElBtnAdd"
      :hidePart="{'btn-add':true}"
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
      <template v-slot:dataSlot1="{doc,docEntity,index}">
        <div class="WP100 C_3a0 PL10" v-if="doc.desc">&lt;!-- {{doc.desc}}--&gt;</div>
        <!-- {{index}}--- -->
        <!-- {{docEntity.__id}} -->

        <span
      
          class="DPFC PL5 BC_f0f0f0"
          v-if="doc&&(doc.tag!=='body'&&doc.tag!=='head')"
          style="flex-wrap:wrap"
        >
          <!--折叠按钮-->

          <div class="Cur1 MR4 DPFC LH18" @click="fold(docEntity)" v-if="doc.children.length">
            <i class="el-icon-caret-right FS16" :class="{Rotate90:docEntity.showChildren}"></i>
            <span class="C_3a0 FS14">{{doc.children.length}}</span>
          </div>
          <div class v-show="allowEditHtml">
            <!--复选框-->
            <input v-model="docEntity.checked" class="DPB MR4" type="checkbox" />
          </div>

          <!--标签开始符-->
          <span
            class="code_html_tag FS14"
            @click="$refs.collectionTag.showEditDialog(index)"
          >&lt;{{doc[cf.labelKey]}}</span>
          <!--html属性-->
          <span class="FS14" v-for="(value,prop) in docEntity.cf" :key="prop">
            <template v-if="prop!='focus_ele'">
              <span class="ML10 code_html_prop">{{prop}}</span>
              <span>=</span>
              <el-popover
                placement="bottom-start"
                :popper-class="popperClass"
                width="520"
                @after-enter="afterEnter"
                trigger="manual"
                v-model="showProp[`${docEntity.__id}_${prop}`]"
                @show="fnShowPover({docEntity,prop})"
                class="PSR"
              >
                <!-- {{docEntity}} -->
                <div class="PR22 PSR">
                  <!--关闭按钮-->
                  <i
                    class="el-icon-close btn_pop_close"
                    @click="showProp[`${docEntity.__id}_${prop}`]=false"
                  ></i>
                  <dm_dynamic_form :cf="cfFormPropVal" v-model="docEntity.cf" class="showBigIn"></dm_dynamic_form>
                </div>
                <!-- showPopover -->
                <span slot="reference" @click="showPopoverProp({docEntity,prop})">
                  <span
                    class="code_html_val"
                    :title="value"
                    slot="reference"
                  >"{{valueShort(value)}}"</span>
                </span>
              </el-popover>
            </template>
          </span>
          <!-- 自定义属性 -->
          <span class="FS14" v-for="(item,index) in docEntity.diyProp" :key="index">
            <span class="ML10 code_html_prop">{{item.prop}}</span>
            <span>=</span>
            <el-popover
              placement="bottom-start"
              :popper-class="popperClass"
              @after-enter="afterEnter"
              width="420"
              trigger="manual"
              v-model="showPropDiy[`${docEntity.__id}_${item.prop}`]"
            >
              <!-- {{docEntity}} -->
              <div class="showBigIn PSR PR22">
                <!--关闭按钮-->
                <i
                  class="el-icon-close btn_pop_close"
                  @click="showPropDiy[`${docEntity.__id}_${item.prop}`]=false"
                ></i>
                <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="item.value"></el-input>
                <!-- <dm_dynamic_form :cf="cfFormPropVal" v-model="docEntity.cf"></dm_dynamic_form> -->
              </div>
              <span slot="reference" @click="showPopoverPropDiy({docEntity,prop:item.prop})">
                <span
                  class="code_html_val"
                  :title="item.value"
                  slot="reference"
                >"{{valueShort(item.value)}}"</span>
              </span>
            </el-popover>
          </span>
          <!--标签结束符-->
          <span class="code_html_tag FS14 MR5">&gt;</span>
          <!--  TODO:节点内容-->
          <el-popover
            class="MR10"
            :popper-class="popperClass"
            placement="bottom-start"
            :width="doc[cf.labelKey]=='script'?800:500"
            @after-enter="afterEnter"
            trigger="manual"
            v-model="showContent[docEntity.__id]"
            v-if="!noInnerHtml(doc)"
          >
            <div class="showBigIn PSR" v-if="isShowPopoverIn">
              <!--关闭按钮-->
              <i class="el-icon-close btn_pop_close" @click="showContent[docEntity.__id]=false"></i>
              <!--如果是script元素-->
              <dm_js_code_curr v-model="docEntity.text" v-if="doc[cf.labelKey]=='script'"></dm_js_code_curr>
              <!--否则-->
              <el-input
                class="WP95"
                v-else
                type="textarea"
                autosize
                placeholder="请输入内部文本"
                v-model="docEntity.text"
              ></el-input>
            </div>

            <!-- END:节点内文本 -->
            <div
              class="MR8 FS14 box_innertext PSR"
              slot="reference"
              style="max-width:300px"
              @click="showContent[docEntity.__id]=true"
            >
              {{innerText(doc.text)}}
              <div class="PSA R0 T0 box_count_bytes" v-if="bytes(doc.text)>60">
                {{bytes(doc.text)}}
                <span class="ML2" style="color:#ccc">b</span>
              </div>
            </div>
          </el-popover>
          <!-- <span class="C_999 MR20 FS14" v-if="doc.desc">({{doc.desc}})</span> -->
          <el-popover placement="right-start" width="260" trigger="hover" v-show="allowEditHtml">
            <div class="DPF" style="flex-wrap:wrap">
              <i
                title="+子节点"
                class="MR10 btn_mimi el-icon-plus"
                @click="showDialogAddChild(docEntity)"
                v-if="doc.children && !isNoChildren(doc)"
              >节点</i>

              <!-- END:Html:子组件按钮 -->

              <i
                title="+子组件"
                class="MR10 btn_mimi el-icon-plus"
                @click="showDialogAddCom(docEntity)"
                v-if="doc.children && !isNoChildren(doc)"
              >组件</i>

              <i
                title="复制节点"
                class="MR10 btn_mimi el-icon-document-copy"
                @click="$refs.collectionTag.copyData(index)"
              >节点</i>

              <i
                title="修改节点"
                class="MR10 btn_mimi el-icon-edit"
                @click="$refs.collectionTag.showEditDialog(index)"
              ></i>

              <div class="H1 BC_f0f0f0 OFH MT10 MB10 WP100"></div>

              <i
                title="上移"
                class="MR10 btn_mimi el-icon-aaa"
                @click="$refs.collectionTag.move(index, 'up')"
              >上移</i>

              <i
                title="下移"
                class="MR10 btn_mimi el-icon-aaa"
                @click="$refs.collectionTag.move(index, 'down')"
              >下移</i>

              <i
                title="置顶"
                class="MR10 btn_mimi el-icon-aaa"
                @click="$refs.collectionTag.move(index, 'top')"
              >置顶</i>

              <i
                title="置底"
                class="MR10 btn_mimi el-icon-aaa"
                @click="$refs.collectionTag.move(index, 'bottom')"
              >置底</i>

              <i
                title="删除当前节点"
                class="MR10 btn_mimi el-icon-delete"
                @click="$refs.collectionTag.deleteData(index)"
              ></i>
              <div class="H1 BC_f0f0f0 OFH MT10 MB10 WP100"></div>
              <!-- END:Html:复制到剪贴板按钮 -->
              <i
                title="复制代码到剪贴板"
                class="MR10 btn_mimi el-icon-document-copy"
                @click="copyHtmlCode(docEntity)"
              >代码</i>

              <i
                title="粘贴代码到此"
                class="MR10 btn_mimi el-icon-document-copy"
                @click="pasteHtmlForChildren(docEntity)"
              >粘贴代码到此</i>
            </div>
            <span slot="reference" class="el-icon-setting DP3 FS18 MT4"></span>
            <!-- <el-button  icon="el-icon-more" size="mini">操作</el-button> -->
          </el-popover>
          <div class="FX1"></div>
          <i
                title="删除当前节点"
                class="C_999 Cur1 P3  el-icon-delete"
                @click="$refs.collectionTag.deleteData(index)"
              ></i>
          <i class="ML20 sort-num">拖</i>
        </span>
        <!--TODO:子节点批量操作栏-->
        <div
          class="PL10 C_999 PT8"
          v-show="docEntity.showChildren&&allowEditHtml"
          v-if="doc.children&&doc.children.length"
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
          >节点</i>
          <i
            title="+选择子组件作为子节点"
            class="MR10 btn_mimi el-icon-plus"
            @click="showDialogAddCom(docEntity)"
          >组件</i>
          <i
            title="删除选中子节点"
            class="MR10 btn_mimi el-icon-delete"
            @click="batchDeleteHtml(docEntity)"
          ></i>
          <i
            title="复制选中子节点代码"
            class="MR10 btn_mimi el-icon-document-copy"
            @click="copyCheckedHtml(docEntity)"
          >代码</i>
          <i title="粘贴代码到此" class="MR10 btn_mimi" @click="pasteHtmlForChildren(docEntity)">粘贴</i>
          <i title="继续展开" class="MR10 btn_mimi el-icon-s-unfold" @click="unfoldContinue(docEntity)"></i>
          <i title="全部折叠" class="MR10 btn_mimi el-icon-s-fold" @click="foldContinue(docEntity)"></i>
        </div>
        <div
          class="BC_fff PT0 PR12 PB1 MT8"
          :class="{PL12:(doc.tag!=='body'&&doc.tag!=='head')}"
          v-if="doc.children"
          v-show="docEntity.showChildren"
        >
          <!--END:Html:递归-->
          <dm_row_html_tag
            :ref="`children_${docEntity.__id}`"
            @add_son_com="addSonComFromChildren"
            @html_tag_mouseenter="htmlTagMouseenterFromChildren"
            @html_tag_mouseleave="htmlTagMouseleaveFromChildren"
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
  //  FIXME:data配置
  data() {
    return {
      showPropDiy: {},//显示html-diy属性popover弹窗配置对象
      showProp: {},//显示html-cf属性的popover弹窗配置对象
      popperClass: "",//popper弹窗的附加类名
      isShowPopoverIn: true,//是否显示el-popover内部盒子
      popperOptions: {
        // placement:"bottom-start",
        // modifiers: [
        //   {
        //     name: 'arrow',
        //     options: {
        //       padding: 5, // 5px from the edges of the popper
        //     },
        //   },
        // ],
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
    //END:函数：{全选按钮值变动函数}
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
    //END:函数：{批量删除子节点函数}
    batchDeleteHtml: function (docEntity) {
      let lengthOld = docEntity.children.length
      let childrenNew = docEntity.children.filter(d => d.checked != true)
      let lengthNew = childrenNew.length
      if (lengthNew >= lengthOld) return this.$message.error('未选择任何子节点');
      docEntity.children = childrenNew
      this.$set(docEntity, "isCheckAll", false);
    },
    //END:函数：{复制选中的子节点代码函数}
    copyCheckedHtml: function (docEntity) {
      let lengthOld = docEntity.children.length
      let childrenNew = docEntity.children.filter(d => d.checked == true)
      let lengthNew = childrenNew.length
      if (lengthNew == 0) return this.$message.error('未选择任何子节点');
      let htmlCode = util.arrToHtml({ arrHtml: [...childrenNew] })//函数：{根据arrHtml拼接Html代码函数}
      util.setClipBoardData(htmlCode)//设置剪贴板内容（兼容谷歌浏览器）
      this.$message.success('复制成功');
    },
    //END:函数：{粘贴代码为子节点的函数}
    pasteHtmlForChildren: function (docEntity) {
      //这个牛逼！！！！
      this.vm_auto_layout.dialogPasteHtml(docEntity.children)
      // this.$message.success('粘贴成功');
    },
    //END:函数：{继续展开函数}
    unfoldContinue: function (docEntity) {
      if (docEntity.showChildrenLevel) {
        docEntity.showChildrenLevel++
      } else {
        this.$set(docEntity, "showChildrenLevel", 1);
      }
      this.setShowChildrenLevel({ docEntity, children: docEntity.children, flag: true })
    },
    //END:函数：{设置展开层级函数}
    setShowChildrenLevel: function ({ docEntity, children, layerHandle = 0, flag = false, nMax }) {
      layerHandle++;
      if (layerHandle > 9) return;
      let { showChildrenLevel = 1 } = docEntity
      if (nMax) {//Q1：最大曾经限制存在
        if (layerHandle > nMax) return;
      } else if (layerHandle > showChildrenLevel) {//Q2：最大曾经限制不存在，且layerHandle超过当前设置层级
        return;
      }
      children.forEach(itemEach => {//循环：{子节点数组}
        this.$set(itemEach, "showChildren", flag);
        //递归***
        this.setShowChildrenLevel({ docEntity, children: itemEach.children, layerHandle, flag, nMax })
      })
    },
    //END:函数：{继续折叠函数}
    foldContinue: function (docEntity) {
      this.$set(docEntity, "showChildrenLevel", 0);
      this.setShowChildrenLevel({ docEntity, children: docEntity.children, nMax: 99, flag: false })
    },
    //函数：{将html元素代码复制到剪贴板函数}
    copyHtmlCode: function (docEntity) {
      let objNeed = { arrHtml: [docEntity] }
      let htmlCode = util.arrToHtml({ arrHtml: [docEntity] })//函数：{根据arrHtml拼接Html代码函数}
      util.setClipBoardData(htmlCode)//设置剪贴板内容（兼容谷歌浏览器）
      this.$message.success('复制成功');
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
    //TODO:函数：{showPopoverProp}
    showPopoverProp: async function ({ docEntity, prop }) {
      let { __id } = docEntity;
      let { showProp } = this
      for (let prop in showProp) {//遍历showProp,全部设置为false
        showProp[prop] = false
      }
      // showProp[`${docEntity.__id}_${prop}`] = true
      this.$set(showProp, `${docEntity.__id}_${prop}`, true);
    },
    //TODO:函数：{showPopoverPropDiy}
    showPopoverPropDiy: async function ({ docEntity, prop }) {
      let { __id } = docEntity;
      let { showPropDiy } = this
      for (let prop in showPropDiy) {//遍历showProp,全部设置为false
        showPropDiy[prop] = false
      }
      this.$set(showPropDiy, `${docEntity.__id}_${prop}`, true);
    },
    //TODO:函数：{popover弹窗完全显示的回调函数}
    afterEnter: async function () {
      // alert(`afterEnter`);
      this.$nextTickStatus("isShowPopoverIn")//解决el-popover内部组件显示异常的问题！！！
      //下面代码解决切换tabs时的隐藏问题***
      let { activeName } = this.vm_auto_layout
      this.popperClass = `${activeName}_popover`
    },
    //END:函数：{集合鼠标移入的回调函数}
    afterMouseenter: async function (param) {
      console.log(`afterMouseenter_in_1`);
      console.log(`param:`, param);
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
    //END:函数：{集合鼠标移出的回调函数}
    afterMouseleave: async function (param) {
      this.$emit("html_tag_mouseleave", param);
      if (this.vm_auto_layout.modeShowHtml == 'actual') return;//如果是真实模式，退出
      if (PUB.focusEle && PUB.focusEle.cf && PUB.focusEle.cf.focus_ele) {//如果聚焦元素存在,去掉聚焦样式
        this.$set(PUB.focusEle.cf, "focus_ele", "");//使用set方法添加一个空类
        delete PUB.focusEle.cf.focus_ele
      }
    },
    //END:函数：{子html鼠标移入的回调函数}
    htmlTagMouseenterFromChildren: async function (param) {
      console.log(`htmlTagMouseenterFromChildren_in`);
      let { focusIndex } = param
      window.arr_$targetIndex.push(focusIndex)
      let $target = util.getParentJQ()
      util.removeAllFocusClass()//调用：{清除所有focus元素状态的函数}
      $target.addClass("focus_ele")
    },
    //END:函数：{子html鼠标移出的回调函数}
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
      let key = `children_${docEntity.__id}`;//ref变量
      this.$refs[key].$refs.collectionTag.addGroup()//弹窗打开
      this.$set(docEntity, "showChildren", true);//强行展开
    },
    //END:JS:添加子组件弹窗
    //函数：{显示添加子组件弹窗函数}
    showDialogAddCom: async function (docEntity) {
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
                  { prop: "onmouseleave", label: "onmouseleave（鼠标离开）", type: "onmouseleave", },
                ]
              }
            },
            { prop: "children", show: false, label: "children", type: "jsonEditor", default: [] },
            { "prop": "diyProp", "label": "自定义属性", "col_span": 24, "type": "collection", "cfElBtnAdd": { text: "+添加一组", type: "primary", size: "mini", plain: false }, "collectionCfForm": { col_span: 12, formItems: [{ label: "属性名", prop: "prop", }, { label: "属性值", prop: "value", type: "textarea" },] } }
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
.showBigIn >>> .el-textarea__inner {
  color: #fff;
  font-size: 15px;
  font-family: Consolas, "Courier New", monospace;
  background-color: #333;
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
