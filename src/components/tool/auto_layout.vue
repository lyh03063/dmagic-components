<template>
  <div>
    <dm_debug_list>
      <dm_debug_item v-model="arrCss" />
      <dm_debug_item v-model="docDemo" />
    </dm_debug_list>
    <div class="H50 DPF BC_000 PL15 MB5" style="background:rgb(84, 92, 100);">
      <div class="LH50 C_fff FS24 MR20 FX1">
        码邦科技-网页在线布局工具
        <!-- <el-button plain @click="test" size="mini">移除data</el-button> -->
      </div>
      <div class="PT8 PR15" v-if="demoId&&docDemo">
        <span class="C_fff FS16">{{docDemo.title}}</span>
        <el-button
          plain
          @click="saveDemo"
          size="mini"
          v-if="$power('groupDataList.all.modify')"
        >保存demo</el-button>
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
                  </div>
                  <div class="box_scroll">
                    <dm_row_html_tag class v-model="arrHtml" ref="rowhtml"></dm_row_html_tag>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="Css配置" name="tab2">
                  <div class="PB8">
                    <el-button plain @click="$refs.collectionCss.addGroup()" size="mini">添加一组样式</el-button>
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
                            <div class="" >docEntity.css:{{docEntity.css}}</div>
                            <dm_single_class_edit v-model="docEntity.css"></dm_single_class_edit>
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


export default {
  mixins: [MIX.base],
  components: {},
  data() {
    return {
      cfDragBox: {
        nWidthLeft: 320,
        cfBoxLeft: { class: " ", style: { 'background-image': "url('http://tool.alixixi.com/csseditor/images/grid.gif')" } },

      },
      demoId: null,
      docDemo: null,
      cfElBtnAdd: { text: "+添加一组样式", type: "info", size: "mini", },
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
          __id111: "202006231111",//这个要加，否则影响集合的
          tag: "div",
          text: "",
          cf: {
            style: {},
            class: "box_out",
          },
          children: [
            {
              __id: "202006231112",
              tag: "div",
              text: "内盒子",
              children: [],
              cf: {
                class: "box_in",
              }
            },
            {
              __id: "202006231113",
              tag: "div",
              text: "内盒子",
              children: [],
              cf: {
                class: "box_in",
              }
            },
          ]
        },
        // {
        //   tag: "div",
        //   text: "盒子3",
        //   cf: {
        //     style: { "padding": "10px" },
        //     class: "box_3",
        //   }
        // },
      ],
      arrCss: [
        // {
        //   selector: ".box_layout",
        //   desc:"通用布局",
        //   css: { "transition": "0.5s", "padding": "10px", "border-width": "1px", "border-style": "solid", "border-color": "#666", }
        // },
        {
          selector: ".box_out",
          desc: "外盒子样式",
          css: { "transition": "0.5s", "width": "100%", "height": "", "border-width": "3px", "border-style": "solid", "border-color": "#666", }
        },
        {
          selector: ".box_in",
          desc: "内盒子样式",
          css: { "transition": "0.5s", "border-width": "3px", "border-style": "solid", "border-color": "#f60", }
        },
        // {
        //   selector: ".box_2",
        //   css: { "transition": "0.5s", "border-width": "3px", "border-style": "solid", "border-color": "#f90", },
        // },
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
    arrCss: {//监听到arrClass变化，立马更新样式
      handler(newVal, oldVal) {
        this.updatePageCss()//调用：{更新页面样式函数}
      },
      immediate: true,
      deep: true
    },
    arrHtml: {//监听到arrClass变化，立马更新样式
      async handler(newVal, oldVal) {
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
      alert(`test`);
      $("#id_html_box").removeAttr("data-v-9e28b8ec")//调用：{返回某节点的html代码的函数}

    },
    //函数：{更新页面样式函数}
    updatePageCss: async function () {

      //css属性数据字典
      let dictCssProp = { width: "宽度", transition: "过渡动画", }

      //函数：{将Css对象转成css代码函数-每行带注释}
      util.objToCssWithRemark = function (objCss) {
        let cssCode = ""
        for (var prop in objCss) {
          if (!objCss[prop]) continue;//如果代码无效，跳过
          cssCode += `
    ${prop}:${objCss[prop]}; /*${dictCssProp[prop] || ''}*/`
        }
        return cssCode
      }



      let cssCode = ""
      this.arrCss.forEach(itemEach => {//循环：{css配置数组}
        let { selector, css, desc } = itemEach
        let cssNormal = util.objToCssWithRemark(css)//函数：{将Css对象转成css代码函数}
        cssCode += `
/*${desc}*/
${selector}{${cssNormal}
}`
      })
      this.cssCode = cssCode
      util.addCssToPage({ css: this.cssCode })//调用：{输出css代码到当前页面的函数}
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
  created() {
    this.demoId = this.$route.query.demoId;//
    if (this.demoId) {//
      this.getDemoDoc(); //调用：{获取demo详情函数}
    }
  },
  async mounted() {


    util.ajaxAddVisitRecord({  tagPage: "auto_layout", })//变量：{ajax添加访客记录函数}




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
