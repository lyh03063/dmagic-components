<template>
  <div v-if="readyResource" class="out" :class="{ box_fullScreen: fullScreen }">
    <dm_debug_list>
      <dm_debug_item v-model="arrHtmlHead" />
      <dm_debug_item v-model="htmlCodeHead" />
      <dm_debug_item v-model="arrHtml" />
      <dm_debug_item v-model="arrCss" />
      <dm_debug_item v-model="hasModify" />
      <dm_debug_item v-model="docDemo" />
      <!-- <dm_debug_item v-model="joinDemoDoc" /> -->
      <!-- <dm_debug_item v-model="pageHtmlCode" /> -->
    </dm_debug_list>
    <!-- <div class="">{{ docDemoNew }}</div>
    <div class="">{{ hasModify }}</div>
    <div class="">{{ countChange }}</div>
    <div class="">{{ formDataAddDemo }}</div> -->
    <div
      class="H50 DPFC BC_000 PL15 MB10"
      style="background: rgb(84, 92, 100)"
      v-if="!fullScreen"
    >
      <div class="LH50 C_fff FS24 MR20">
        码帮IDE
        <!-- <el-button plain @click="test" size="mini">test</el-button> -->
      </div>
      <div class="FX1">
        <!--END:视图宽度-->
        <div class="C_fff DPIB MR8">
          宽
          <input
            class="W50"
            type="number"
            @input="changeWidth"
            :value="cfDragBox.nWidthLeft - 10"
          />
          px
        </div>
        <el-button
          plain
          @click="updateIframe"
          size="mini"
          v-if="modeShowHtml == 'actual'"
          >更新</el-button
        >
        <el-checkbox class="C_fff" v-model="isHotUpdate">热更新</el-checkbox>
        <a
          class="ML5"
          target="_blank"
          :href="`//www.dmagic.cn/page_preview?id=${demoId}`"
          v-if="demoId"
        >
          <el-button plain size="mini" v-if="!vid">预览</el-button>
        </a>
        <el-checkbox class="ML10 C_fff" v-model="cfDragBox.isShowLeft"
          >演示区</el-checkbox
        >
        <el-checkbox class="C_fff" v-model="cfDragBox.isShowRight"
          >编辑区</el-checkbox
        >
        <span class="FS2 ML10" v-if="vid" style="color: #ccc"
          >历史版本数据，不支持保存和新页面预览</span
        >
      </div>
      <div class="PR15" v-if="demoId && docDemo">
        <span class="C_fff FS16 MR10">{{ docDemo.title }}</span>
        <!--收藏按钮-->
        <com_btn_collect
          class="MR10"
          :dataId="demoId"
          v-if="demoId && $sys.userId"
        ></com_btn_collect>
        <el-button
          type="primary"
          @click="saveDemo"
          size="mini"
          v-if="isMine && !vid"
          >保存</el-button
        >
        <el-button plain @click="showDialogSaveMyDemo" size="mini"
          >拷贝</el-button
        >
        <a class="ML10" target="_blank" href="#/open/auto_layout">
          <el-button plain size="mini">新建demo</el-button>
        </a>
      </div>
      <div class="PT8 PR15" v-else>
        <el-button plain @click="showDialogSaveMyDemo" size="mini"
          >保存为我的demo</el-button
        >
      </div>
    </div>
    <div class="PL8 PR8 box_main FM_JS">
      <dm_drag_box_width class :cf="cfDragBox">
        <template #left>
          <div class>
            <!--END:iframe视窗-->
            <!-- scrolling="no" -->
            <div class="MR10">
              <iframe
                id="id_iframe"
                class="WP100 box_iframe"
                style
                v-if="modeShowHtml == 'actual'"
              ></iframe>
            </div>
            <div
              id="id_html_box"
              class="box_html_show MR10"
              v-if="modeShowHtml != 'actual'"
            >
              <!--html元素-->
              <dm_ele
                :tag="doc.tag"
                v-bind="doc.cf"
                :diyProp="doc.diyProp"
                :text="doc.text"
                :children="doc.children"
                v-for="(doc, i) in arrHtml"
                :key="i"
              ></dm_ele>
            </div>
          </div>
        </template>
        <template #right>
          <div class="panel_config" style="min-width: 660px">
            <div class>
              <div class="PSR">
                <div class="PSA R10 T6" style="z-index: 888">
                  <el-button plain @click="dialogSelectDemo" size="mini"
                    >demo库</el-button
                  >
                </div>
              </div>
              <!-- tabs -->
              <el-tabs v-model="activeName" type="card" @tab-click="tabClick">
                <el-tab-pane :label="`Body配置(${lengthBody})`" name="tab_body">
                  <div class="DPFC H38">
                    <div class="FX1"></div>
                    <div class>
                      <el-checkbox class="C_666" v-model="allowEditHtml"
                        >强化编辑</el-checkbox
                      >
                      <el-select
                        class="MR5"
                        v-model="modeShowHProp"
                        size="mini"
                        style="width: 120px"
                      >
                        <el-option
                          v-for="item in optionsModeHProp"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </div>
                  </div>
                  <div class="box_scroll box_html_set PL20">
                    <!-- END:Html:row_html_tag组件 -->
                    <dm_row_html_tag
                      class
                      v-model="arrHtml"
                      ref="rowhtml"
                      @add_son_com="addSonCom"
                    ></dm_row_html_tag>
                  </div>
                </el-tab-pane>
                <el-tab-pane :label="`head配置(${lengthHead})`" name="tab_head">
                  <div class="DPFC H38">
                    <div class="FX1"></div>
                    <div class>
                      <el-checkbox class="C_666" v-model="allowEditHtml"
                        >强化编辑</el-checkbox
                      >
                      <el-select
                        class="MR5"
                        v-model="modeShowHProp"
                        size="mini"
                        style="width: 120px"
                      >
                        <el-option
                          v-for="item in optionsModeHProp"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </div>
                  </div>
                  <div class="box_scroll box_html_set">
                    <!-- END:Html:row_html_tag组件 -->
                    <dm_row_html_tag
                      class
                      v-model="arrHtmlHead"
                      ref="rowhtmlHead"
                      @add_son_com="addSonCom"
                    ></dm_row_html_tag>
                  </div>
                </el-tab-pane>
                <el-tab-pane
                  :label="`Css配置(${arrCss.length})`"
                  name="tab_css"
                  lazy
                >
                  <div class="PB8">
                    <el-button
                      plain
                      @click="$refs.collectionCss.addGroup()"
                      size="mini"
                      >添加Css代码块</el-button
                    >
                    <el-button plain @click="dialogPasteCss" size="mini"
                      >粘贴Css数据</el-button
                    >
                  </div>
                  <!-- {{arrCss}} -->
                  <div class="box_scroll">
                    <!--集合组件-->
                    <dm_collection
                      ref="collectionCss"
                      v-model="arrCss"
                      :show-toolbar="true"
                      :cf-form="cfFormClass"
                      :cfElBtnAdd="cfElBtnAdd"
                      :hidePart="{ 'btn-add': true }"
                      :showSortNum="false"
                      data-slot="dataSlot1"
                    >
                      <!--插槽内容-->
                      <template v-slot:dataSlot1="{ doc, docEntity }">
                        <!-- <div class="" >docEntity: {{docEntity}}</div> -->
                        <dm_pannel_new
                          :cf="cfPannel"
                          :title="`${docEntity.selector}`"
                        >
                          <template
                            #title_bar_box_middle="{ vm_title_bar, vm_pannel }"
                          >
                            <div class="DPF">
                              <span class="C_999"
                                >({{ docEntity.arrProp.length }})
                                {{
                                  docEntity.desc ? " " + docEntity.desc : ""
                                }}</span
                              >
                              <span
                                class="FS12 PL5 FX1 OFH"
                                v-if="!vm_pannel.cfIn.showContent"
                                v-html="cssCodeShort(docEntity)"
                              ></span>
                              <!-- END:Html:复制CSS到剪贴板按钮 -->
                              <el-link
                                class="ML5 MR10"
                                @click="copyCssCode(docEntity)"
                                >复制</el-link
                              >
                            </div>
                          </template>
                          <template
                            #titleBar_boxLeft="{ vm_title_bar, vm_pannel }"
                          >
                            <div
                              class="PT1 PL6 PR6 WP100 HP100 BC_999 C_fff Cur1"
                              @click="vm_pannel.toggle()"
                            >
                              <i
                                :class="
                                  vm_pannel.cfIn.showContent
                                    ? 'el-icon-arrow-down'
                                    : 'el-icon-arrow-right'
                                "
                              ></i>
                            </div>
                          </template>
                          <div class="PT10 PL15">
                            <!--单类样式编辑组件-->
                            <!-- @click="showDialog" -->
                            <!-- <el-button
                              plain
                              size="mini"
                              @click="collectionCssAdd(docEntity)"
                            >打开css集合添加弹窗</el-button>-->
                            <dm_row_css_code
                              :ref="`rowCssCode_${docEntity.__id}`"
                              v-model="docEntity.arrProp"
                            ></dm_row_css_code>
                            <!-- <dm_single_class_edit v-model="docEntity.css"></dm_single_class_edit> -->
                          </div>
                        </dm_pannel_new>
                      </template>
                    </dm_collection>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="代码生成" name="tab_build" lazy>
                  <div class="MB10">
                    html：
                    <el-button
                      plain
                      @click="buildHtmlFile"
                      size="mini"
                      v-if="docDemo && docDemo.builtFilePath"
                      >生成静态文件到{{ docDemo.builtFilePath
                      }}{{ docDemo.builtFileName }}</el-button
                    >
                  </div>
                  <!-- <el-input type="textarea" :rows="8" v-model="htmlCode"></el-input> -->
                  <dm_code
                    class="FX1"
                    v-model="htmlCode"
                    ref="codeMHtml"
                    :cf="cfCodeMHtml"
                  ></dm_code>
                  <div class>Css：</div>
                  <!-- <el-input type="textarea" :rows="8" v-model="cssCode"></el-input> -->
                  <dm_code
                    class="FX1"
                    v-model="cssCode"
                    ref="codeMCss"
                    :cf="cfCodeMCss"
                  ></dm_code>
                </el-tab-pane>
                <el-tab-pane
                  :label="`相关笔记(${noteListByKeyword.length})`"
                  name="tab4"
                  lazy
                >
                  <dm_list_flex_res
                    class="MB20"
                    :list="noteListByKeyword"
                    #default="{ item }"
                    col="1"
                  >
                    <div class="group">
                      <a
                        class="n-a"
                        target="_blank"
                        :href="`#/detail_data?dataId=${item._id}`"
                        >{{ item.title }}</a
                      >
                    </div>
                  </dm_list_flex_res>
                </el-tab-pane>
                <!--END:基础信息表单-->
                <el-tab-pane
                  label="基础信息"
                  name="tab_base"
                  lazy
                  v-if="docDemo && isMine"
                >
                  <el-select
                    class="W100 MB20"
                    v-model="modeShowHtml"
                    placeholder="请选择"
                    size="mini"
                    style="margin-left: 120px"
                  >
                    <el-option
                      v-for="item in optionsMode"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                  <dm_dynamic_form
                    :cf="cfFormBase"
                    v-model="docDemo"
                  ></dm_dynamic_form>
                  <dm_pannel_new class="MB20" title="历史版本">
                    <dm_list_data_version
                      :cf="cfLDataVersion"
                      class="PT10"
                    ></dm_list_data_version>
                  </dm_pannel_new>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </template>
      </dm_drag_box_width>
    </div>
    <!--End:Html-选择demo弹窗组件-->
    <dm_dialog_select_demo
      @inited="({ vm }) => (vm_dialog_select_demo = vm)"
      @select_demo="afterSelectDemo"
    ></dm_dialog_select_demo>
    <!--选择Css属性弹窗组件 -->
    <dm_dialog_css_prop
      @inited="({ vm }) => (vm_dialog_css_prop = vm)"
    ></dm_dialog_css_prop>
    <!--填写新建我的demo信息表单弹窗-->
    <el-dialog
      custom-class="n-el-dialog"
      width="65%"
      title="将当前demo保存为我的demo"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :append-to-body="true"
      v-bind:visible.sync="isShowDialogSaveMy"
      v-if="isShowDialogSaveMy"
    >
      <div class>
        <dm_dynamic_form
          :cf="cfFormAddDemo"
          v-model="formDataAddDemo"
          @submit="ajaxAddMyDemo"
        ></dm_dynamic_form>
      </div>
    </el-dialog>
    <!--END:粘贴html代码弹窗-->
    <el-dialog
      custom-class="n-el-dialog"
      width="65%"
      title="粘贴html"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :append-to-body="true"
      v-bind:visible.sync="isShowDialogPasteHtml"
      v-if="isShowDialogPasteHtml"
    >
      <div class>
        <dm_dynamic_form
          :cf="cfFormPasteHtml"
          v-model="formDataPasteHtml"
          @submit="submitFormPasteHtml"
        ></dm_dynamic_form>
      </div>
    </el-dialog>
    <!--END:粘贴Css代码弹窗-->
    <el-dialog
      custom-class="n-el-dialog"
      width="65%"
      title="粘贴Css"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :append-to-body="true"
      v-bind:visible.sync="isShowDialogPasteCss"
      v-if="isShowDialogPasteCss"
    >
      <div class>
        <dm_dynamic_form
          :cf="cfFormPasteCss"
          v-model="formDataPasteCss"
          @submit="submitFormPasteCss"
        ></dm_dynamic_form>
      </div>
    </el-dialog>
  </div>
</template>
<script>









PUB.cfPannel.gray_bar3 = {//浅灰色栏
  showContent: false,//内容块折叠
  cfTitleBar: {
    boxMiddle: {
      style: { "font-size": "15px", "padding": "0 0 0 10px", "height": "34px", "line-height": "34px", },
    },
    boxMain: {
      style: { "border-bottom": "none", "background": "#f0f0f0", "height": "34px", "line-height": "34px", },
    },
  },
}

let cfPannel = lodash.cloneDeep(PUB.cfPannel.gray_bar3)
//防抖函数
let clearHtmlPropDebounce = lodash.debounce(util.clearInvalidHtmlProp, 500)

export default {
  name: "auto_layout",
  mixins: [MIX.base],
  components: {},
  //FIXME:data配置
  data() {
    return {
      hasModify: false,//数据是否被修改
      cfLDataVersion: {
        'findJsonAddon': { _idRel: "" },
      },
      showPopoverBody: {},//html元素的pover弹窗显示对象-给子组件用的
      allowEditHtml: false,//允许编辑html
      isCheckAllHtml: false,
      /****************************Css粘贴-START****************************/
      formDataPasteCss: {},
      isShowDialogPasteCss: false,
      //查询表单配置
      cfFormPasteCss: {
        size: "mini",
        formItems: [
          {
            label: "Css代码",
            prop: "cssCode",
            type: "textarea",
            cfTextarea: { rows: 10 }
          }
        ],
        btns: [{ text: "确定粘贴", event: "submit", type: "primary", size: "mini" }]
      },
      /****************************Css粘贴-END****************************/
      /****************************Html粘贴-START****************************/
      formDataPasteHtml: {},
      isShowDialogPasteHtml: false,
      //查询表单配置
      cfFormPasteHtml: {
        size: "mini",
        formItems: [
          {
            label: "html代码",
            prop: "htmlCode",
            type: "textarea",
            cfTextarea: { rows: 10 }
          }
        ],
        btns: [{ text: "确定粘贴", event: "submit", type: "primary", size: "mini" }]
      },
      /****************************Html粘贴-END****************************/
      isHotUpdate: true,
      formData: {},
      //查询表单配置
      cfFormBase: {
        size: "mini",
        formItems: [F_ITEMS.title,
        F_ITEMS.album, F_ITEMS.keyword,
        ],
        // btns: [{ text: "查询", event: "submit", type: "primary", size: "mini" }]
      },
      fullScreen: !!this.$route.query.fullScreen,
      objEleParent: null,//当前父元素对象
      modeShowHtml: "actual",
      optionsMode: [{ value: "test", label: "测试模式" }, { value: "actual", label: "真实模式" },],
      modeShowHProp: "part",
      optionsModeHProp: [{ value: "whole", label: "显示完整属性" }, { value: "part", label: "显示缩略属性" },],
      jsCodeTop: `
      `,
      noteListByKeyword: [],//关联笔记列表
      cfCodeMHtml: {
        cfCodeMirror: {
          mode: "text/html",
        }
      },
      cfCodeMCss: {
        cfCodeMirror: {
          mode: "text/css",
        }
      },
      readyResource: false,
      readyDemo: false,//是否准备好初始demo数据
      startWatch: false,//开始监听变动
      isHighLightLayout: true,//悬停代码时高亮区块
      isShowDialogSaveMy: false,//显示填写新建我的demo信息表单弹窗
      formDataAddDemo: { title: "新建demo" },
      //查询表单配置
      cfFormAddDemo: {
        size: "mini",
        formItems: [F_ITEMS.title,],
        btns: [{ text: "保存", event: "submit", type: "primary", size: "mini" }]
      },
      cfDragBox: {
        nWidthLeft: 320,
        isShowLeft: true,
        isShowRight: !this.$route.query.fullScreen,
        // cfBoxLeft: { class: " ", style: { 'background-image': "url('http://tool.alixixi.com/csseditor/images/grid.gif')" } },
      },
      demoId: null,
      vid: null,//版本id
      docDemo: null,
      cfElBtnAdd: { text: "+添加样式代码块", type: "info", size: "mini", },
      cfPannel: lodash.cloneDeep(cfPannel),
      formDataAddCss: {},
      cfFormClass: {//集合-样式新增，修改的表单
        size: "mini",
        formItems: [
          {
            prop: "selector", label: "选择器", type: "input", default: ".xxxx",
            frequency: {
              sytle: { width: '148px' },
              dataType: "array",
              options: [{ value: ".box_1", label: ".box_1类" }, { value: ".box_1:hover", label: ".box_1:hover鼠标悬停" },]
            }
          },
          { prop: "desc", label: "描述", type: "input", },
          {
            show: false,//字段隐藏，主要是为了设置默认值！！！
            prop: "css", label: "描述", default: { "transition": "0.5s", }, type: "jsonEditor",
          },
        ],
      },
      arrHtml: [{
        "tag": "body",
        "children": [],
        "cf": {},
        "__id": "222",
        showChildren: true,
      }],
      arrHtmlHead: [{
        "tag": "head",
        "children": [{ "cf": {}, "children": [], "tag": "link", "diyProp": [{ "prop": "href", "value": "https://qn-static.dmagic.cn/public.1.2.5.css" }, { "prop": "rel", "value": "stylesheet" }], "__id": "202009051152631717_37571" }],
        "cf": {},
        "__id": "111",
        showChildren: true,
      }],
      arrCss: [],
      vm_dialog_select_demo: null,//选择demo组件对象
      vm_form_css1: null,
      vm_form_css2: null,
      activeName: "tab_body",
      htmlCode: "",
      htmlCodeHead: "",
      cssCode: "",
      pageHtmlCode: "",//页面完整的html代码
      countChange: 0,//代码变动次数，用于测试
    };
  },
  computed: {
    //TODO:函数：{拼接初始的DemoDoc函数}
    joinDemoDoc: function () {
      let { arrCss, arrHtml, arrHtmlHead, modeShowHtml, allowEditHtml, modeShowHProp, cfDragBox, pageHtmlCode, docDemo } = this
      let { nWidthLeft } = cfDragBox
      arrHtml = arrHtml[0].children;//提取children
      arrHtmlHead = arrHtmlHead[0].children;//提取children
      let objAddon = this.formDataAddDemo
      if (this.demoId && this.readyDemo) {//如果demoId存在，获取标题，相册，关键词
        let { title, album, keyword } = docDemo
        objAddon = { title, album, keyword }
      }
      this.countChange++
      return { ...objAddon, arrCss, arrHtml, arrHtmlHead, modeShowHtml, allowEditHtml, modeShowHProp, nWidthLeft, pageHtmlCode }
    },
    docDemoNew() {//将docDemo转成字符串，用于监听变化
      return JSON.stringify(this.joinDemoDoc)
    },
    lengthBody() {
      return lodash.get(this.arrHtml, `[0]children.length`)
    },
    lengthHead() {
      return lodash.get(this.arrHtmlHead, `[0]children.length`)
    },
    linkFullScreen() {
      return `#/open/auto_layout?demoId=${this.demoId}&fullScreen=1`
    },
    //是否是我自己的demo
    isMine() {
      return this.$sys.userId == this.docDemo._userId
    },
    cssCodeShort() {//样式代码概要
      return function (doc) {
        let { arrProp } = doc;
        let css = util.arrToCssHtml(arrProp)//函数：{将Css对象转成一整行css代码函数}
        // if (css.length > 80) { //如果字符长度超过20
        //   css = css.slice(0, 77)
        //   css += `...`
        // }
        return css
      }
    },
  },
  watch: {
    "hasModify": {
      handler(newVal, oldVal) {
        this.setBeforeunload()
      },
    },
    "$route.query.demoId": {//监听demoId变化（切换demo）
      handler(newVal, oldVal) {
        window.location.reload();//函数调用：{重载页面}
      },
      deep: true
    },
    docDemoNew: {//监听到docDemoNew变化
      handler(newVal, oldVal) {

        if (this.startWatch) {//如果{开始监听变动}为真
          this.hasModify = true;
        }
      },
    },
    arrCss: {//监听到arrClass变化，立马更新样式
      handler(newVal, oldVal) {
        this.updatePageCss()//调用：{更新页面样式函数}
      },
      immediate: true,
      deep: true
    },
    modeShowHtml: {//监听到arrClass变化，立马更新样式
      async handler(newVal, oldVal) {
        if (this.modeShowHtml == 'actual' && this.isHotUpdate) {
          await this.$nextTick();//延迟到视图更新
          this.updateIframe()//调用：{更新iframe函数}
        }
      },
      immediate: true,
    },

    arrHtml: {//监听到arrHtml变化，更新Html
      async handler() {
        this.debouncedAfterArrHtmlChange()//调用：{防抖版arrHtml变动后的后续处理函数}
      },
      // immediate: true,
      deep: true
    },
    arrHtmlHead: {//监听到arrHtml变化，更新Html
      async handler() {
        this.debouncedAfterArrHtmlHeadChange()//调用：{防抖版arrHtmlHead变动后的后续处理函数}

      },
      // immediate: true,
      deep: true
    },
  },
  methods: {
    //函数：{arrHtmlHead变动后的后续处理函数}
    afterArrHtmlHeadChange: function () {
      let arrHtml = lodash.get(this, `arrHtmlHead[0].children`);
      this.htmlCodeHead = util.arrToHtml({ arrHtml })//函数：{根据arrHtml拼接Html代码函数}
      this.htmlCodeHeadHasId = util.arrToHtml({ arrHtml, needId: true })//函数：{根据arrHtml拼接Html代码函数}
      if (this.modeShowHtml == 'actual' && this.isHotUpdate) {
        this.updateIframe()//调用：{更新iframe函数}
      }

    },
    //函数：{arrHtml变动后的后续处理函数}
    afterArrHtmlChange: function () {
      let arrHtml = lodash.get(this, `arrHtml[0].children`);
      if (!arrHtml) return
      this.htmlCode = util.arrToHtml({ arrHtml })//函数：{根据arrHtml拼接Html代码函数}
      this.htmlCodeHasId = util.arrToHtml({ arrHtml, needId: true })
      if (this.modeShowHtml == 'actual' && this.isHotUpdate) {
        this.updateIframe()//调用：{更新iframe函数}
      }

    },
    //END:函数：{设置标签页关闭时的事件}
    setBeforeunload: function () {

      if (!this.$window) return
      if (this.hasModify) {//Q1：内容有改动
        this.$window.off("beforeunload").on("beforeunload", function () {
          var e = window.event || e;
          e.returnValue = ("确定离开当前页面吗？");
        })
      } else {//Q1：内容无改动
        this.$window.off("beforeunload")
      }
    },
    //END:函数：{选项卡点击的函数}
    tabClick: function ({ name }) {
      $("body").attr("tab", this.activeName)
    },
    //END:函数：{显示粘贴html代码弹窗函数}
    dialogPasteHtml: async function (arrTarget) {
      this.isShowDialogPasteHtml = true;
      this.arrTarget = arrTarget
    },
    //END:函数：{提交粘贴html代码表单函数}
    submitFormPasteHtml: async function (arrTarget) {
      let { formDataPasteHtml } = this
      let { htmlCode } = formDataPasteHtml
      if (!htmlCode) return this.$message.error(`请输入Html代码`);
      htmlCode = htmlCode.trim()
      if (!htmlCode.startsWith("<")) return this.$message.error(`${name}不规范`);
      let arrHtml = util.htmlToArr({ htmlCode })
      if (!arrHtml) return this.$message.error(`Html代码异常`);
      util.randomCollectionId(arrHtml);//调用：{修改数组元素对象的__id属性的函数}
      // arrTarget = arrTarget || this.arrHtml;//可以指定arrTarget，默认是this.arrHtml
      this.arrTarget.unshift(...arrHtml)//html代码更新
      // this.arrTarget[0].children.unshift(...arrHtml)//html代码更新
      this.$message.success('粘贴Html成功');
      this.isShowDialogPasteHtml = false;
    },
    //END:函数：{显示粘贴Css代码弹窗函数}
    dialogPasteCss: async function (arrTarget) {
      this.isShowDialogPasteCss = true;
    },
    //END:函数：{提交粘贴Css代码弹窗函数}
    submitFormPasteCss: async function (arrTarget) {
      let { formDataPasteCss } = this
      let { cssCode } = formDataPasteCss
      if (!cssCode) return this.$message.error(`请输入Css代码`);
      let arrCss = util.cssToArr({ cssCode })//调用：{Css代码转换成数据对象的函数【难】}
      if (!arrCss) return this.$message.error(`Css代码异常`);
      this.arrCss.push(...arrCss)//html代码更新
      this.$message.success('粘贴Css成功');
      this.isShowDialogPasteCss = false;
    },
    //END:函数：{将一组Css代码复制到剪贴板函数}
    copyCssCode: function (docEntity) {
      // let objNeed = { arrCss: [docEntity] }
      // var strObjNeed = JSON.stringify(objNeed);//Json对象转换Json字符串
      // let cpTxt = strObjNeed;
      let cssCode = util.joinPageCss({ arrCss: [docEntity] })
      util.setClipBoardData(cssCode)//设置剪贴板内容（兼容谷歌浏览器）
      this.$message.success('复制成功');
    },
    //函数：{生成html文件函数}
    buildHtmlFile: async function () {
      let fnBuild = PUB.listCFAddon.front_demo.methods.singleBtnClick;
      fnBuild.call(this, "buildHtmlFile", this.docDemo)
    },
    //END:JS：宽度文本框变化后的回调函数
    //函数：{宽度文本框变化后的回调函数}
    changeWidth: function (e) {
      let n = Number(e.target.value)
      this.cfDragBox.nWidthLeft = n + 10
    },
    //函数：{测试函数}
    test: async function () {
    },
    //END:函数：{更新iframe函数}
    updateIframe: async function () {
      if (this.modeShowHtml == 'actual') {//如果是真实模式
        let { cssCode, htmlCode, htmlCodeHasId, htmlCodeHead, htmlCodeHeadHasId, jsCodeTop } = this
        let title = ""
        if (this.docDemo) {//如果是修改demo
          title = this.docDemo.title
        }
        this.pageHtmlCode = util.joinPageHtml({
          cssCode, htmlCode, htmlCodeHead, jsCodeTop, title
        })
        let pageHtmlCodeIframe = util.joinPageHtml({
          cssCode, htmlCode: htmlCodeHasId, htmlCodeHead: htmlCodeHeadHasId, jsCodeTop, title, inIframe: true
        })
        $("#id_iframe").attr("srcdoc", pageHtmlCodeIframe)
      }
    },
    //函数：{更新页面样式函数}
    updatePageCss: async function () {
      this.cssCode = util.joinPageCss({ arrCss: this.arrCss })
      if (this.modeShowHtml == 'test') {
        util.addCssToPage({ css: this.cssCode })//调用：{输出css代码到当前页面的函数}
      }
      await util.timeout(500); //延迟
      if (this.modeShowHtml == 'actual' && this.isHotUpdate) {
        this.updateIframe()//调用：{更新iframe函数}
      }
    },
    //函数：{打开css集合添加数据弹窗函数}
    collectionCssAdd: async function (formData = {}) {
      // let ref = `rowCssCode_${docEntity.__id}`//ref定位标记，因为是集合组件，所以内部要进行定位
      this.$refs[this.refRowCssCode].$refs.collection.addGroup(formData)//打开添加数据弹窗
    },
    //函数：{选择demo后的回调函数}
    afterSelectDemo: async function ({ doc }) {
      doc = lodash.cloneDeep(doc);//深拷贝，避免影响数据源
      let { arrCss, arrHtml, } = doc
      let { vm_dialog_select_demo } = this;
      vm_dialog_select_demo.hide()
      let arrCssNeed = [];//变量：{不重复的Css定义数组}
      let arrCssRepeat = [];//变量：{重复的Css定义数组}
      arrCss.forEach(d1 => {
        let { selector } = d1;
        let docRepeat = this.arrCss.find(d2 => d2.selector == selector)
        if (docRepeat) {
          arrCssRepeat.push(d1)
        } else {
          arrCssNeed.push(d1)
        }
      })
      let countRepeat = arrCss.length - arrCssNeed.length//变量：{重复的css定义数量}
      if (countRepeat) {
        let arrSelectorR = arrCssRepeat.map(d => d.selector)
        let strSelectorR = arrSelectorR.join("/")
        let clickStatus = await this.$confirm(`${strSelectorR}出现样式定义重复，这部分样式将不引用，如果是样式冲突问题，请取消操作并先处理好！`).catch(() => { });
        if (clickStatus != "confirm") return
      }
      //END:JS-适应子组件插入位置
      if (this.objEleParent) {//Q1:{当前父元素对象}存在
        this.objEleParent.children.unshift(...arrHtml)
        this.objEleParent = null;//将{当前父元素对象}设置为null
      } else { //Q2:{否则}
        // arrHtml = arrHtml[0].children;//提取children
        console.log(`arrHtml:`, arrHtml);
        this.arrHtml[0].children.unshift(...arrHtml)//html代码更新
      }
      this.arrCss.push(...arrCssNeed)//Css代码更新
      this.$message.success('切换demo成功');
    },
    //END:JS:添加子组件回调
    //函数：{添加子组件按钮点击后的回调函数}
    addSonCom: async function (docEntity) {
      this.objEleParent = docEntity//当前父元素对象赋值
      this.dialogSelectDemo()//调用：{打开选择demo弹窗函数}
    },
    //函数：{打开选择demo弹窗函数}
    dialogSelectDemo: async function () {
      let { vm_dialog_select_demo } = this;
      if (!vm_dialog_select_demo) return;
      vm_dialog_select_demo.show()
    },
    //函数：{保存demo函数}
    saveDemo: async function () {
      let clickStatus = await this.$confirm("确定修改？").catch(() => { });
      if (clickStatus != "confirm") return
      await axios({//修改接口-当前父任务
        method: "post", url: `${PUB.domain}/info/commonModify`,
        data: {
          _id: this.demoId, _systemId: "$all", _dataType: "front_demo",
          _data: this.joinDemoDoc
        }
      });
      this.$message.success('修改成功');
      this.hasModify = false;
      {//保存一个历史版本数据
        let _userId = this.$sys.userId
        let rsp = await axios({
          method: "post", url: `${PUB.domain}/info/addDataVersion`,
          data: {
            "_id": this.demoId, _userId
          }
        });
      }
    },
    //函数：{保存为我的demo函数}
    showDialogSaveMyDemo: async function () {
      this.isShowDialogSaveMy = true;
      let { docDemo } = this
      if (docDemo) {
        this.formDataAddDemo.title = docDemo.title
      }
      //弹出窗口（填写demo名称），自动创建一个demo数据并跳转页面
    },
    //函数：{ajax保存我的函数}
    ajaxAddMyDemo: async function () {
      let _userId = this.$sys.userId
      if (!_userId) {
        return this.$message.error('未登录，无法保存demo');
      }
      let _data = lodash.cloneDeep(this.joinDemoDoc);
      if (this.demoId) {//如果demoId存在，即拷贝demo
        _data.title = this.formDataAddDemo.title
        delete _data.keyword
      }
      let rsp = await axios({
        method: "post", url: `${PUB.domain}/info/commonAdd`,
        data: { "_data": _data, "_systemId": "sys_api", "_dataType": "front_demo", _userId }
      });
      this.$message.success('操作成功');
      let demoId = lodash.get(rsp, `data.addData._id`);
      this.isShowDialogSaveMy = false;
      this.$router.push({ path: 'auto_layout', query: { demoId: demoId } });//跳转登录页-不产生历史记录
    },
    //函数：{获取demo详情函数}
    getDemoDoc: async function () {
      if (!this.demoId) {//
        this.readyDemo = true;//{是否准备好初始demo数据}设为真
        await util.timeout(100); //延迟
        this.startWatch = true;//{开始监听变动}设为真
        return
      }
      let { data } = await axios({  //请求接口
        method: "post", url: `${PUB.domain}/info/commonDetail`,
        data: { _id: this.vid || this.demoId, _systemId: "$all" } //传递参数,优先使用版本id
      });
      if (this.vid) {//如果{版本id}存在
        //  data.doc.dataBackup;
        //合并，这里感觉有点混乱
        this.docDemo = Object.assign(data.doc, data.doc.dataBackup);//合并对象
      } else {
        this.docDemo = data.doc;
      }
      let { arrCss = [], arrHtml = [], arrHtmlHead = [], modeShowHtml, allowEditHtml, modeShowHProp, jsCodeTop, nWidthLeft = 320, pageHtmlCode } = this.docDemo
      this.pageHtmlCode = pageHtmlCode//完整html代码更新
      this.arrHtml = [{
        "tag": "body",
        showChildren: true,
        "children": arrHtml,
        "cf": {},
        "__id": "222"
      }]
      // arrHtml//body代码更新
      this.arrHtmlHead = arrHtmlHead//头部代码更新
      this.arrHtmlHead = [{
        showChildren: true,
        "tag": "head",
        "children": arrHtmlHead,
        "cf": {},
        "__id": "111"
      }]
      this.arrCss = arrCss//Css代码更新
      this.modeShowHtml = modeShowHtml || "test"
      this.allowEditHtml = allowEditHtml || false
      this.modeShowHProp = modeShowHProp || "whole"
      this.jsCodeTop = jsCodeTop//Js代码更新
      this.cfDragBox.nWidthLeft = nWidthLeft;//演示区域宽度
      //根据关键词请求关联数据的ajax固定参数
      this.paramByKeyword = {
        _systemId,
        _id: this.demoId,
        selectJson: {
          _id: 1,
          title: 1,
          desc: 1,
          keyword: 1,
          link: 1,
          vedio: 1
        }
      };
      // this.hasModify=false;//{内容是否变更}设为假
      if (this.docDemo.keyword) {//如果有关键词
        this.ajaxGetNoteList(); //调用：{ajax获取关联笔记列表}
      }
      this.readyDemo = true;//{是否准备好初始demo数据}设为真


      util.ajaxAddVisitRecord({ tagPage: "auto_layout", dataId: this.demoId, })//变量：{ajax添加访客记录函数}

      await util.timeout(500); //延迟
      this.startWatch = true;//{开始监听变动}设为真
    },
    //函数：{获取关联笔记列表函数}
    ajaxGetNoteList: async function () {
      let param = { ...this.paramByKeyword, _dataType: "note" };
      this.noteListByKeyword = await FN.ajaxlistBykeyword({ param }); //ajax获取关联列表
    },
  },
  async created() {

    //函数：{防抖版arrHtml变动后的后续处理函数}
    this.debouncedAfterArrHtmlChange = lodash.debounce(this.afterArrHtmlChange, 1000)
    //函数：{防抖版arrHtmlHead变动后的后续处理函数}
    this.debouncedAfterArrHtmlHeadChange = lodash.debounce(this.afterArrHtmlHeadChange, 1000)

    $("body").attr("tab", this.activeName)//body设置tab属性
    await util.loadJs({ url: PUB.urlJS.html_tag })//加载html相关JS
    await util.loadJs({ url: PUB.urlJS.css_prop })//加载css相关JS
    this.readyResource = true
    let { demoId, vid } = this.$route.query
    this.demoId = demoId;//
    this.vid = vid;//版本id
    this.cfLDataVersion.findJsonAddon._idRel = demoId;//历史版本列表配置关联id
    await this.getDemoDoc(); //调用：{获取demo详情函数}
    if (this.modeShowHtml == 'actual') {//如果是真实模式
      await util.timeout(500); //延迟
      this.updateIframe()//调用：{更新iframe函数}
    }
  },
  async mounted() {

    util.changeFavicon(`//qn-dmagic.dmagic.cn/202007171024372424_67675_layout.png`)//函数：{改变网页标题图标的函数}
    window.arr_$targetIndex = []//聚焦的元素链索引数组
    //绑定关闭页面事件，弹窗提醒
    // window.onbeforeunload = function (e) {
    // }
    this.$window = $(window)//缓存$Window对象
  }
};
</script>
<style scoped>
/* FIXME样式 */
.box_html_show,
.box_iframe {
  background-image: url("http://tool.alixixi.com/csseditor/images/grid.gif");
  border: 0px #000 solid;
  outline: 3px #000 solid;
  height: calc(100vh - 70px);
}
.box_fullScreen .box_iframe {
  background-image: none;
  border: none;
  outline: none;
  height: 100vh;
}
.box_fullScreen .box_main {
  padding: 0;
  height: auto;
}
.box_html_show {
  padding-top: 1px;
}
.panel_config {
  padding: 0 0 0 10px;
}
.box_scroll {
  height: calc(100vh - 155px);
  overflow-y: auto;
  padding: 0 5px 0 20px;
}
.out >>> .el-input__inner {
  color: #000;
  /* font-weight: 700; */
  font-family: Arial, Helvetica, sans-serif;
}
.btn_class {
  border: 1px #ddd solid;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
}
.btn_class.focus {
  border: 1px #f60 solid;
}
/* 饿了么复选框的边距补丁 */
.out >>> .el-checkbox {
  margin-right: 6px;
}
.out >>> .el-checkbox__label {
  padding-left: 4px;
}
/* html配置集合条目背景色去除 */
.box_html_set >>> .data-group {
  background-color: #fff;
  outline: 1px dashed #ccc;
  padding-bottom: 3px;
}
/* html配置集合根元素特殊处理 */
.box_html_set >>> .data-group.root_collection {
  outline: none;
}
/* html配置集合根元素特殊处理 */
.box_html_set >>> .data-group.root_collection.active {
  outline: none;
}
</style>
<!--全局样式-->
<style >
/* html {
  overflow-y: overlay;
} */
.code_html_tag {
  color: #800303;
}
.code_html_prop {
  color: #f00;
}
.code_css_prop {
  color: #666;
}
.code_html_val {
  color: #1313f5;
}
.code_css_val {
  color: #1313f5;
}
[focus_ele="1"] {
  outline: 5px #f00 solid;
}
/* 小操作按钮 */
.btn_small_op {
  border: 1px #ddd solid;
  color: #777;
  border-radius: 5px;
  padding: 3px 6px;
  font-size: 12px;
  text-decoration: none;
  margin: 0 5px 0 0;
  background-color: #fff;
  cursor: pointer;
}
/* 小操作按钮 */
.btn_mimi {
  font-style: normal;
  border: 1px #ddd solid;
  color: #777;
  border-radius: 5px;
  padding: 3px 6px;
  font-size: 12px;
  text-decoration: none;
  margin: 0 5px 0 0;
  background-color: #fff;
  cursor: pointer;
}
.btn_pop_close {
  position: absolute;
  top: -5px;
  right: -5px;
  padding: 2px;
  cursor: pointer;
  font-size: 18px;
  color: #666;
  border: 1px #999 solid;
  border-radius: 50%;
  background-color: #fff;
}
/****************************处理切换tabs时内部popover的显示和隐藏-START****************************/
.tab_body_popover,
.tab_head_popover {
  display: none;
}

body[tab="tab_body"] .tab_body_popover {
  display: block;
}

body[tab="tab_head"] .tab_head_popover {
  display: block;
}
/****************************处理切换tabs时内部popover的显示和隐藏-END****************************/
/****************************处理切换popover弹窗样式-START****************************/
.el-popover {
  border: 1px solid #999;
}
.el-popper[x-placement^="bottom"] .popper__arrow {
  border-bottom-color: #999;
}
.el-popper[x-placement^="right"] .popper__arrow {
  border-right-color: #999;
}
/****************************处理切换popover弹窗样式-END****************************/
</style>