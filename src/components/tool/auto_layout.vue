<template>
  <div>
    <dm_debug_list>
      <dm_debug_item v-model="arrCss" />
    </dm_debug_list>
    <div class="H50 DPF BC_000 PL15 MB15" style="background:rgb(84, 92, 100)">
      <div class="LH50 C_fff FS24">码邦科技- CSS在线编辑器</div>
    </div>
    <div class="DPF PL8 PR8">
      <div
        class="MR5"
        style="width:180px;background-image:url('http://tool.alixixi.com/csseditor/images/grid.gif');"
      >
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
      <div class="FX1 panel_config">
        <div class>
          <div class="PSR">
            <div class="PSA R10 T6" style="z-index:888;">
              <el-button plain @click="dialogSelectDemo" size="mini">demo库</el-button>
            </div>
          </div>

          <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="Css配置" name="tab1">
              <!-- {{arrCss}} -->
              <div class="box_scroll">
                <!--集合组件-->
                <dm_collection
                  v-model="arrCss"
                  :show-toolbar="true"
                  :cf-form="cfFormClass"
                  :hidePart="{}"
                  :showSortNum="false"
                  data-slot="dataSlot1"
                >
                  <!--插槽内容-->
                  <template v-slot:dataSlot1="{doc,docEntity}">
                    <!-- docEntity: {{docEntity}} -->
                    <!-- <div class="FWB FS16 PT4 PB4">{{docEntity.className}}的样式配置</div> -->
                    <!--单类样式编辑组件-->
                    <!-- <dm_single_class_edit v-model="docEntity.css"></dm_single_class_edit> -->

                    <dm_pannel_new
                      :cf="cfPannel"
                      :title="`${docEntity.className}样式配置`"
                      :key="docEntity.className"
                    >
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
                        <dm_single_class_edit v-model="docEntity.css"></dm_single_class_edit>
                      </div>
                    </dm_pannel_new>
                  </template>
                </dm_collection>
              </div>
            </el-tab-pane>

            <el-tab-pane label="Html配置" name="tab2">
              <dm_row_html_tag class v-model="arrHtml"></dm_row_html_tag>
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
  components: {},
  data() {
    return {
      cfPannel: lodash.cloneDeep(cfPannel),
      formDataAddCss: {},
      cfFormClass: {//集合-样式新增，修改的表单
        size: "mini",
        formItems: [
          { prop: "className", label: "类名", type: "input" },
          { prop: "desc", label: "描述", type: "input", },
          {
            show: false,//字段隐藏，主要是活动默认值！！！
            prop: "css", label: "描述", default: { normal: {}, hover: {} }, type: "jsonEditor",
          },
        ],
      },

      focusClass: "box_1",
      arrCss: [
        {
          className: "box_1",
          css: {
            normal: { "transition": "0.5s", "width": "180px", "border-width": "3px", "border-style": "solid", "border-color": "#000", },
            hover: {},//这个不能去掉
          }

        },
        {
          className: "box_2",
          css: {
            normal: { "transition": "0.5s", "border-width": "3px", "border-style": "solid", "border-color": "#f90", },
            hover: {},
          },
        },
        {
          className: "box_3",
          css: {
            normal: { "transition": "0.5s", "width": "60px", "height": "60px", "border-width": "3px", "border-style": "solid", "border-color": "#f90", },
            hover: {},

          },

        },
      ],

      vm_dialog_select_demo: null,//选择demo组件对象
      vm_form_css1: null,
      vm_form_css2: null,




      activeName: "tab1",


      htmlCode: "",
      cssCode: "",

      arrHtml: [
        {
          tag: "div",
          text: "演示盒子",
          cf: {
            id: "id_box1",
            style: {},
            class: "box_1 MB8",
          },
          children: [
            {
              tag: "div",
              text: "盒子1-1",
              cf: {
                style: { "padding": "10px" },
                class: "box_2",
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
      ]

    };
  },

  watch: {
    arrCss: {//监听到arrClass变化，立马更新样式
      handler(newVal, oldVal) {
        console.log('arrCss changed');
        this.updatePageCss()//调用：{更新页面样式函数}


      },
      immediate: true,
      deep: true
    },

  },
  methods: {



    //函数：{更新页面样式函数}
    updatePageCss: async function () {

      let cssCode = ""


      this.arrCss.forEach(itemEach => {//循环：{000数组}
        let { className, css } = itemEach
        let { normal, hover } = css
        let cssNormal = util.objToCss(normal)//函数：{将Css对象转成css代码函数}
        let cssHover = util.objToCss(hover)//函数：{将Css对象转成css代码函数}

        cssCode += `

/*盒子样式*/
.${className}{${cssNormal}}`
        cssCode += `
/*鼠标悬停样式*/
.${className}:hover{${cssHover}}`


      })


      this.cssCode = cssCode
      console.log(`cssCode:############`, cssCode);




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
      // this.updatePageCss()//调用：{更新页面样式函数}
      this.$message.success('切换demo成功');

    },



    //函数：{打开选择demo弹窗函数}
    dialogSelectDemo: async function () {
      let { vm_dialog_select_demo } = this;
      if (!vm_dialog_select_demo) return;
      vm_dialog_select_demo.show()

    },
  },
  created() {



  },
  async mounted() {

    this.htmlCode = util.getDomHtml($("#id_box1"))//调用：{返回某节点的html代码的函数}

  }
};
</script>

<style >
.panel_config {
  border-left: 1px solid #999;
  padding: 0 0 0 10px;
}

.box_scroll {
  height: calc(100vh - 185px);
  overflow-y: auto;
  padding: 0 5px 0 0;
}
.el-input__inner {
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
