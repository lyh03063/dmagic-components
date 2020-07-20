<template>
  <div v-if="readyResource">
    <dm_debug_list>
      <dm_debug_item v-model="arrHtml" />
      <dm_debug_item v-model="arrCss" />
      <dm_debug_item v-model="docDemo" />
    </dm_debug_list>
    <div class="H50 DPF BC_000 PL15 MB5" style="background:rgb(84, 92, 100);">
      <div class="LH50 C_fff FS24 MR20 FX1">
        码邦科技-网页在线布局工具
        <!-- <el-button plain @click="test" size="mini">test</el-button> -->
      </div>
      <div class="PT8 PR15" v-if="demoId&&docDemo">
        <span class="C_fff FS16 MR10">{{docDemo.title}}</span>
        <el-button
          plain
          @click="saveDemo"
          size="mini"
          v-if="$power('groupDataList.all.modify')"
        >保存当前demo</el-button>

        <el-button
          plain
          @click="showDialogSaveMyDemo"
          size="mini"
          v-if="$power('groupDataList.all.modify')"
        >拷贝demo</el-button>

        <a class="ML10" target="_blank" href="#/auto_layout">
          <el-button plain size="mini">新建demo</el-button>
        </a>
      </div>
      <div class="PT8 PR15" v-else>
        <el-button
          plain
          @click="showDialogSaveMyDemo"
          size="mini"
          v-if="$power('groupDataList.all.modify')"
        >保存为我的demo</el-button>
      </div>
    </div>
    <div class="PL8 PR8" style="height: calc(100vh - 55px);">
      <dm_drag_box_width class :cf="cfDragBox">
        <template #left>
          <div id="id_html_box" class="MR5" style>
            <!--html元素-->
            <dm_ele
              :tag="doc.tag"
              v-bind="doc.cf"
              :text="doc.text"
              :children="doc.children"
              v-for="(doc,i) in arrHtml"
              :key="i"
            ></dm_ele>
          </div>
        </template>
        <template #right>
          <div class="panel_config">
            <div class>
              <div class="PSR">
                <div class="PSA R10 T6" style="z-index:888;">
                  <el-button plain @click="dialogSelectDemo" size="mini">demo库</el-button>
                </div>
              </div>
              <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="Html配置" name="tab1">
                  <div class="PB8">
                    <el-button
                      plain
                      @click="$refs.rowhtml.$refs.collectionTag.addGroup()"
                      size="mini"
                    >+ 一级元素</el-button>

                    <el-checkbox class="ML20" v-model="isHighLightLayout">悬停代码时高亮区块</el-checkbox>
                  </div>
                  <div class="box_scroll">
                    <dm_row_html_tag class v-model="arrHtml" ref="rowhtml"></dm_row_html_tag>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="Css配置" name="tab2">
                  <div class="PB8">
                    <el-button plain @click="$refs.collectionCss.addGroup()" size="mini">添加Css代码块</el-button>
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
                      :hidePart="{'btn-add':true}"
                      :showSortNum="false"
                      data-slot="dataSlot1"
                    >
                      <!--插槽内容-->
                      <template v-slot:dataSlot1="{doc,docEntity}">
                        <!-- <div class="" >docEntity: {{docEntity}}</div> -->
                        <dm_pannel_new :cf="cfPannel" :title="`${docEntity.selector}`">
                          <template #titleBar_boxMiddle>
                            <span class="C_999 ML10">{{docEntity.desc?' '+docEntity.desc:''}}</span>
                          </template>
                          <template #titleBar_boxLeft="{vm_title_bar,vm_pannel}">
                            <div
                              class="PT1 PL6 PR6 WP100 HP100 BC_999 C_fff Cur1"
                              @click="vm_pannel.toggle()"
                            >
                              <i
                                :class="vm_pannel.cfIn.showContent?'el-icon-arrow-down':'el-icon-arrow-right'"
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
                <el-tab-pane label="代码生成" name="tab3">
                  <div class>html：</div>
                  <el-input type="textarea" :rows="8" v-model="htmlCode"></el-input>
                  <div class>Css：</div>
                  <el-input type="textarea" :rows="8" v-model="cssCode"></el-input>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </template>
      </dm_drag_box_width>
    </div>
    <!--选择demo弹窗组件-->
    <dm_dialog_select_demo
      @inited="({vm})=>vm_dialog_select_demo=vm"
      @select_demo="afterSelectDemo"
    ></dm_dialog_select_demo>

    <!--选择Css属性弹窗组件 -->
    <dm_dialog_css_prop @inited="({vm})=>vm_dialog_css_prop=vm"></dm_dialog_css_prop>

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
        <dm_dynamic_form :cf="cfFormAddDemo" v-model="formDataAddDemo" @submit="ajaxAddMyDemo"></dm_dynamic_form>
      </div>
    </el-dialog>
  </div>
</template>
<script>

//函数：{处理一组html属性显示字符的函数}
util.handleAHtmlPropStr = function ({ prop, value }) {
  if (!value) return ""
  if (prop == "class") { //对于特殊类名的处理
    value = value.replace(" focus_ele", "")
  }
  if (!value) return ""
  let strShow = value;
  if (value.length > 21) { //如果字符长度超过20
    strShow = value.slice(0, 17)
    strShow += `...`
  }
  return ` <span class="code_html_prop">${prop}</span>="<span class="code_html_val" title="${value}">${strShow}</span>"`
}



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
  data() {
    return {
      readyResource: false,
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
        cfBoxLeft: { class: " ", style: { 'background-image': "url('http://tool.alixixi.com/csseditor/images/grid.gif')" } },

      },
      demoId: null,
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
      arrHtml: [
        {
          "tag": "div",
          "children": [
            {
              "tag": "span",
              "children": [
              ],
              "cf": {},
              "text": "性别",
              "desc": "",
              "__id": "202007191719693131_64518"
            },
            {
              "tag": "label",
              "children": [
                {
                  "tag": "input",
                  "children": [
                  ],
                  "cf": {
                    "value": "1",
                    "name": "sex",
                    "type": "radio"
                  },
                  "text": "新的盒子",
                  "desc": "",
                  "__id": "202007191720683434_19247"
                }],
              "cf": {},

              "text": "男",
              "desc": "",
              "__id": "202007191721411010_30309"
            },
          ],
          "cf": {
            "style": "background-color:#FFFFFF;padding:10px;"
          },
          "text": "",
          "desc": "",
          "__id": "202007191718455252_59142"
        }]
      ,
      arrCss: [
        { "selector": ".box_out", "desc": "外盒子样式", "css": { "transition": "0.5s", "width": "100%", "height": "", "border-width": "3px", "border-style": "solid", "border-color": "#666" }, "__id": "202007142210242424_37706", "arrProp": [{ "prop": "transition", "value": "0.5s" }, { "prop": "width", "value": "100%" }, { "prop": "height", "value": "" }, { "prop": "border-width", "value": "3px" }, { "prop": "border-style", "value": "solid" }, { "prop": "border-color", "value": "#666" }] },
        { "selector": ".box_in", "desc": "内盒子样式", "css": { "transition": "0.5s", "border-width": "3px", "border-style": "solid", "border-color": "#f60" }, "__id": "202007142210242424_85553", "arrProp": [{ "prop": "transition", "value": "0.5s" }, { "prop": "border-width", "value": "3px" }, { "prop": "border-style", "value": "solid" }, { "prop": "border-color", "value": "#f60" }] }
      ],
      vm_dialog_select_demo: null,//选择demo组件对象
      vm_form_css1: null,
      vm_form_css2: null,
      activeName: "tab1",
      htmlCode: "",
      cssCode: "",
    };
  },

  watch: {
    "$route.query.demoId": {//监听demoId变化（切换demo）
      handler(newVal, oldVal) {
        window.location.reload();//函数调用：{重载页面}
      },
      deep: true
    },
    arrCss: {//监听到arrClass变化，立马更新样式
      handler(newVal, oldVal) {
        this.updatePageCss()//调用：{更新页面样式函数}
      },
      immediate: true,
      deep: true
    },
    arrHtml: {//监听到arrHtml变化，更新Html
      async handler(newVal, oldVal) {
        console.log(`arrHtml-change############`);



        clearHtmlPropDebounce(this.arrHtml)






        await util.timeout(500); //延迟
        this.htmlCode = $("#id_html_box").html()//调用：{返回某节点的html代码的函数}
      },
      immediate: true,
      deep: true
    },
  },
  methods: {



    //函数：{000函数}
    test: async function () {
      this.$router.push({ path: 'auto_layout', query: { demoId: 1111 } });//跳转登录页-不产生历史记录

    },
    //函数：{更新页面样式函数}
    updatePageCss: async function () {

      //css属性数据字典
      PUB.dictCssProp = { width: "宽度", transition: "过渡动画", }



      let cssCode = ""
      this.arrCss.forEach(itemEach => {//循环：{css配置数组}
        let { selector, css, arrProp, desc } = itemEach
        let cssNormal = util.objToCssWithRemark(arrProp)//函数：{将Css对象转成css代码函数}
        cssCode += `
/*${desc}*/
${selector}{${cssNormal}
}`
      })
      this.cssCode = cssCode
      util.addCssToPage({ css: this.cssCode })//调用：{输出css代码到当前页面的函数}
    },

    //函数：{打开css集合添加数据弹窗函数}
    collectionCssAdd: async function (formData = {}) {
      // let ref = `rowCssCode_${docEntity.__id}`//ref定位标记，因为是集合组件，所以内部要进行定位
      this.$refs[this.refRowCssCode].$refs.collection.addGroup(formData)//打开添加数据弹窗
    },


    //函数：{选择demo后的回调函数}
    afterSelectDemo: async function ({ doc }) {
      doc = lodash.cloneDeep(doc);//深拷贝，避免影响数据源
      let { arrCss, arrHtml } = doc
      let { vm_dialog_select_demo } = this;
      vm_dialog_select_demo.hide()
      this.arrHtml = arrHtml//Css代码更新
      this.arrCss = arrCss//Css代码更新
      this.$message.success('切换demo成功');
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
      let { arrCss, arrHtml } = this
      await axios({//修改接口-当前父任务
        method: "post", url: `${PUB.domain}/info/commonModify`,
        data: {
          _id: this.demoId, _systemId: "$all", _dataType: "front_demo",
          _data: { arrCss, arrHtml }
        }
      });
      this.$message.success('修改成功');
    },
    //函数：{保存为我的demo函数}
    showDialogSaveMyDemo: async function () {
      this.isShowDialogSaveMy = true;
      //弹出窗口（填写demo名称），自动创建一个demo数据并跳转页面

    },
    //函数：{ajax保存我的函数}
    ajaxAddMyDemo: async function () {
      let { arrCss, arrHtml } = this
      let dataAdd = { ...this.formDataAddDemo, arrCss, arrHtml }
      let rsp = await axios({
        method: "post", url: `${PUB.domain}/info/commonAdd`,
        data: { "_data": dataAdd, "_systemId": "sys_api", "_dataType": "front_demo" }
      });
      this.$message.success('操作成功');
      console.log(`rsp:####`, rsp);

      let demoId = lodash.get(rsp, `data.addData._id`);

      this.isShowDialogSaveMy = false;
      this.$router.push({ path: 'auto_layout', query: { demoId: demoId } });//跳转登录页-不产生历史记录


    },

    //函数：{获取demo详情函数}
    getDemoDoc: async function () {
      let { data } = await axios({  //请求接口
        method: "post", url: `${PUB.domain}/info/commonDetail`,
        data: { _id: this.demoId, _systemId: "$all" } //传递参数
      });
      this.docDemo = data.doc;
      let { arrCss, arrHtml } = data.doc
      this.arrHtml = arrHtml//Css代码更新
      this.arrCss = arrCss//Css代码更新
    },


  },
  async created() {


    this.demoId = this.$route.query.demoId;//
    if (this.demoId) {//
      this.getDemoDoc(); //调用：{获取demo详情函数}
    }

    await util.loadJs({ url: PUB.urlJS.html_tag })//加载html相关JS
    await util.loadJs({ url: PUB.urlJS.css_prop })//加载css相关JS
    this.readyResource = true
  },
  async mounted() {


    util.ajaxAddVisitRecord({ tagPage: "auto_layout", })//变量：{ajax添加访客记录函数}

    util.changeFavicon(`//qn-dmagic.dmagic.cn/202007171024372424_67675_layout.png`)//函数：{改变网页标题图标的函数}


  }
};
</script>
<style scoped>
.panel_config {
  border-left: 1px solid #999;
  padding: 0 0 0 10px;
}
.box_scroll {
  height: calc(100vh - 155px);
  overflow-y: auto;
  padding: 0 5px 0 0;
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
</style>

<!--全局样式-->
<style >
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

.focus_ele {
  outline: 2px #f00 solid;
}
</style>