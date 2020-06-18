<template>
  <div>
    <div class="DPF">
      <div class="W200 MR10">
        <dm_ele
          :tag="doc.tag"
          v-bind="doc.cf"
          :text="doc.text"
          :children="doc.children"
          v-for="(doc,i) in arrLayout"
          :key="i"
        ></dm_ele>
      </div>
      <div class="FX1 panel_config">
        <div class>
          <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="样式配置" name="tab1">
              <el-tabs v-model="active2" tab-position="left">
                <el-tab-pane label="常规样式" name="tab1_1">
                  <!-- <el-button class="MB10" plain @click="switchCf" size="mini">切换</el-button> -->

                  <div class="box_form">
                    <dm_form_css class v-model="formDataCss" v-if="ready1"></dm_form_css>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="悬停样式" name="tab1_2">
                  <div class="box_form">
                    <dm_form_css class v-model="dataCssHover"></dm_form_css>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </el-tab-pane>

            <el-tab-pane label="Html代码" name="tab2">
              <el-input type="textarea" :rows="8" v-model="htmlCode"></el-input>
            </el-tab-pane>
            <el-tab-pane label="Css代码" name="tab3">
              <el-input type="textarea" :rows="8" v-model="cssCode"></el-input>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


//add_css{输出css代码到当前页面}
util.add_css = function (str_css) {
    var CssContent;
    if (str_css) {
        var Dom_Style = document.getElementById("id_layout");//节点定义：{000}
        if (Dom_Style) {//如果对应ID的节点已经存在
            CssContent = Dom_Style.textContent; //变量定义：{000}
            Dom_Style.textContent = str_css;
        } else {
            var style = document.createElement("style"); //节点定义：创建style节点
            style.id = "id_layout"; //指定ID
            style.type = "text/css"; //指定type
            style.textContent = str_css;
            document.getElementsByTagName("HEAD").item(0).appendChild(style);
        }

    }
}


//函数：{将Css对象转成css代码函数}
util.objToCss = function (objCss) {
    let cssCode = ""
    for (var prop in objCss) {
        if (!objCss[prop]) continue;//如果代码无效，跳过
        cssCode += `${prop}:${objCss[prop]}; `
    }
    return cssCode
}




//函数：{返回某节点的html代码的函数}
util.getDomHtml = function ($dom) {
    if (!($dom && $dom.length)) { return ""; }
    var $domOut = $("<div></div>").html($dom.clone(true));//节点定义：{克隆}
    return $domOut.html();
}


//变量：{颜色选择器预定义颜色}
let arrPreColor = [
    '#000000',
    '#999999',
    '#cccccc',
    '#dddddd',
    '#f0f0f0',
    '#ffffff',
    '#ff0000',
    '#ff3300',
    '#ff6600',
    '#ff9900',
    '#33aa00',
    '#409EFF',
    '#67C23A',
    '#E6A23C',
    '#F56C6C',
    '#909399',
]
let frequencyColor = {
    type: "color",
    cfColorPicker: {
        // "show-alpha": true,
        predefine: arrPreColor
    }
}


/****************************a元素-START****************************/
F_ITEMS.href = {
    label: "href(链接地址)",
    prop: "href",
    col_span: 12,
    frequency: {
        sytle: { width: '160px' },
        options: [{ value: "https://www.qq.com" }, { value: "js的API列表.html" }, { value: "#id_floor1" },]
    }
};


F_ITEMS.target = {
    label: "target(是否新窗口打开)",
    prop: "target",
    col_span: 12,
    frequency: {
        sytle: { width: '148px' },
        options: [{ value: "_blank" }, { value: "_self" }]
    }
};
/****************************a元素-END****************************/


/****************************盒子模型-START****************************/
F_ITEMS.width = {
    label: "width(宽度)",
    prop: "width",
    frequency: {
        sytle: { width: '148px' },
        options: [{ value: "100px" }, { value: "50%" }, { value: "5vw" },]
    }

};
F_ITEMS.height = {
    label: "height(高度)",
    prop: "height",
};


F_ITEMS.margin = {
    label: "margin(外边距)",
    prop: "margin",
    frequency: {
        sytle: { width: '148px' },
        options: [
            { value: "10px 20px 30px 40px" },
            { value: "10px 20px 30px" },
            { value: "10px 20px" },
            { value: "10px" },
        ]
    }
};


F_ITEMS.margin_all = {

    label: "margin(外边距)",
    prop: "",
    default: {},
    cfForm: {
        col_span: 8,
        labelWidth: "150px",
        formItems: [
            {
                label: "margin-top",
                prop: "margin-top",
                col_span: 12
            },
            {
                label: "margin-right",
                prop: "margin-right",
                col_span: 12
            },
            {
                label: "margin-bottom",
                prop: "margin-bottom",
                col_span: 12
            },
            {
                label: "margin-left",
                prop: "margin-left",
                col_span: 12
            },
        ]
    }
};


F_ITEMS.padding = {
    label: "padding(内边距)",
    prop: "padding",
    frequency: {
        sytle: { width: '148px' },
        options: [
            { value: "10px 20px 30px 40px" },
            { value: "10px 20px 30px" },
            { value: "10px 20px" },
            { value: "10px" },
        ]
    }
};


F_ITEMS.padding_all = {

    label: "padding(内边距)",
    prop: "",

    cfForm: {
        col_span: 8,
        labelWidth: "150px",
        formItems: [
            {
                label: "padding-top",
                prop: "padding-top",
                col_span: 12
            },
            {
                label: "padding-right",
                prop: "padding-right",
                col_span: 12
            },
            {
                label: "padding-bottom",
                prop: "padding-bottom",
                col_span: 12
            },
            {
                label: "padding-left",
                prop: "padding-left",
                col_span: 12
            },
        ]
    }
};



F_ITEMS["border-width"] = {
    label: "border-width(边框宽度)",
    prop: "border-width",
    frequency: {
        sytle: { width: '148px' },
        options: [{ value: "1px" }, { value: "2px" }, { value: "3px" },]
    }
};


F_ITEMS["border-style"] = {
    label: "border-style(边框形式)",
    prop: "border-style",
    frequency: {
        sytle: { width: '148px' },
        options: [{ value: "solid" }, { value: "dotted" }, { value: "dashed" },]
    }
};


F_ITEMS["border-color"] = {
    label: "border-color(边框颜色)",
    prop: "border-color",
    frequency: frequencyColor
};




F_ITEMS.border_all = {

    label: "边框",
    prop: "",
    // default: { diycheckbox: [] },
    cfForm: {
        col_span: 8,
        labelWidth: "150px",
        formItems: [
            
            F_ITEMS["border-color"],
            F_ITEMS["border-width"],
            F_ITEMS["border-style"],
        ]
    }
};


F_ITEMS.border = {
    label: "border(边框)",
    prop: "border",
    frequency: {
        sytle: { width: '148px' },
        options: [{ value: "1px red solid" }, { value: "2px red dotted" }, { value: "3px red dashed" },]
    }
};



/****************************盒子模型-END****************************/



F_ITEMS.display = {
    label: "display(框的类型)",
    prop: "display",
    frequency: {
        sytle: { width: '148px' },
        options: [{ value: "block" }, { value: "inline-block" }, { value: "inline" }, { value: "none" }, { value: "table-cell" }, { value: "flex" }]
    }
};


F_ITEMS["font-size"] = {
    label: "font-size(字体大小)",
    prop: "font-size",
    frequency: {
        sytle: { width: '148px' },
        options: [{ value: "12px" }, { value: "20px" }, { value: "30px" }]
    }
};

F_ITEMS["font-weight"] = {
    label: "font-weight(字体粗细)",
    prop: "font-weight",
    frequency: {
        sytle: { width: '148px' },
        options: [{ value: "normal" }, { value: "bold" }, { value: "bolder" }, { value: "lighter" }]
    }
};


F_ITEMS["font-family"] = {
    label: "font-family(字体系列)",
    prop: "font-family",
    frequency: {
        sytle: { width: '148px' },
        options: [{ value: "Microsoft Yahei" }, { value: "SimSun" }, { value: "SimHei" }]
    }
};

F_ITEMS["line-height"] = {
    label: "line-height(文本行高)",
    prop: "line-height",
    frequency: {
        sytle: { width: '148px' },
        options: [{ value: "20px" }, { value: "150%" }, { value: "1" }]
    }
};

F_ITEMS["text-align"] = {
    label: "text-align(水平文字排列)",
    prop: "text-align",
    frequency: {
        sytle: { width: '148px' },
        options: [{ value: "left" }, { value: "center" }, { value: "right" }]
    }
};
F_ITEMS["text-decoration"] = {
    label: "text-decoration(文本装饰)",
    prop: "text-decoration",
    frequency: {
        sytle: { width: '148px' },
        options: [{ value: "underline" }, { value: "overline" }, { value: "line-through" }, { value: "none" }]
    }
};



F_ITEMS["font-style"] = {
    label: "font-style(字体风格)",
    prop: "font-style",
    frequency: {
        sytle: { width: '148px' },
        options: [{ value: "normal" }, { value: "italic" }, { value: "oblique" }]
    }
};


F_ITEMS["float"] = {
    label: "float(浮动)",
    prop: "float",
    frequency: {
        sytle: { width: '98px' },
        options: [{ value: "left" }, { value: "right" }, { value: "none" }]
    }
};


F_ITEMS["color"] = {
    label: "color(文本颜色)",
    prop: "color",
    frequency: frequencyColor
};

F_ITEMS["box-sizing"] = {
    label: "box-sizing(盒子类型)",
    prop: "box-sizing",
    frequency: {
        sytle: { width: '148px' },
        options: [{ value: "border-box" }, { value: "content-box" }]
    }
};

let options_distance = [{ value: "10px" }, { value: "-10px" }, { value: "10%" }];
//https://www.runoob.com/cssref/pr-class-position.html
F_ITEMS["position"] = {
    label: "position(定位方法的类型)",
    prop: "position",
    frequency: {
        sytle: { width: '148px' },
        options: [{ value: "relative" }, { value: "absolute" }, { value: "fixed" }, { value: "static" }, { value: "sticky" }]
    }
};




F_ITEMS["top"] = {
    label: "top(上偏移量)",
    prop: "top",
    frequency: {
        sytle: { width: '148px' },
        options: options_distance
    }
};

F_ITEMS["right"] = {
    label: "right(右偏移量)",
    prop: "right",
    frequency: {
        sytle: { width: '148px' },
        options: options_distance
    }
};


F_ITEMS["bottom"] = {
    label: "bottom(下偏移量)",
    prop: "bottom",
    frequency: {
        sytle: { width: '148px' },
        options: options_distance
    }
};


F_ITEMS["left"] = {
    label: "left(左偏移量)",
    prop: "left",
    frequency: {
        sytle: { width: '148px' },
        options: options_distance
    }
};


F_ITEMS["z-index"] = {
    label: "z-index(层级数)",
    prop: "z-index",
    frequency: {
        sytle: { width: '148px' },
        options: [{ value: 1 }, { value: 100 }]
    }
};

F_ITEMS["background-color"] = {
    label: "background-color(背景颜色)",
    prop: "background-color",
    frequency: frequencyColor
};


F_ITEMS["background-image"] = {
    label: "background-image(背景图片)",
    prop: "background-image",
    frequency: {
        sytle: { width: '148px' },
        options: [
            { value: "url(http://www.dmagic.cn/images/IconS/IconS_2568.png)", label: "png图片" },
            { value: "url(http://www.dmagic.cn/images/IconS/jpg/1360.jpg)", label: "jpg图片" },
            { value: "url(http://www.dmagic.cn/images/IconS/jpg/1356.jpg)", label: "jpg图片2" },
            { value: "url(http://dmagic.haolvzhu.com//images/IconS/gif/1.gif)", label: "gif图片" },
            { value: "url(http://qn-static.dmagic.cn/face_2.png)", label: "png图片2" },

            { value: "linear-gradient(#e66465, green, blue)", label: "垂直渐变背景色" },
            { value: "linear-gradient(to right, red , yellow)", label: "水平渐变背景色" },
            { value: "radial-gradient(red, green, blue)", label: "镜像渐变背景色" },
        ]
    }
};


F_ITEMS["background-position"] = {
    label: "background-position(背景图位置)",
    prop: "background-position",
    frequency: {
        sytle: { width: '148px' },
        options: [{ value: "left top" },
        { value: "left center" },
        { value: "right center" },
        { value: "center bottom" },
        { value: "10% 10%" },
        { value: "10px 10px" },
        ]
    }
};

F_ITEMS["background-repeat"] = {
    label: "background-repeat(背景图重复)",
    prop: "background-repeat",
    frequency: {
        sytle: { width: '148px' },
        options: [{ value: "repeat" }, { value: "repeat-x" }, { value: "repeat-y" }, { value: "no-repeat" }]
    }
};

F_ITEMS["background-size"] = {
    label: "background-size(背景尺寸)",
    prop: "background-size",
    frequency: {
        sytle: { width: '148px' },
        options: [{ value: "100%" }, { value: "100px" }, { value: "cover" }, { value: "contain" }]
    }
};



F_ITEMS["border-radius"] = {
    label: "border-radius(圆角)",
    prop: "border-radius",
    frequency: {
        sytle: { width: '148px' },
        options: [{ value: "10px" }, { value: "50%" }]
    }
};

F_ITEMS["outline"] = {
    label: "outline(轮廓)",
    prop: "outline",
    frequency: {
        sytle: { width: '148px' },
        options: [{ value: "1px green solid" }, { value: "2px green dotted" }, { value: "3px green dashed" },]
    }
};

F_ITEMS["letter-spacing"] = {
    label: "letter-spacing(字符间距)",
    prop: "letter-spacing",
    frequency: {
        sytle: { width: '148px' },
        options: [{ value: "normal" }, { value: "20px" }, { value: "-20px" }]
    }
};

F_ITEMS["word-spacing"] = {
    label: "word-spacing(单词间距)",
    prop: "word-spacing",
    frequency: {
        sytle: { width: '148px' },
        options: [{ value: "normal" }, { value: "20px" }, { value: "-20px" }]
    }
};




F_ITEMS["input_type"] = {
    label: "type(字段类型)",
    prop: "type",
    frequency: {
        sytle: { width: '148px' },
        options: [
            { value: "text" },
            { value: "number" },
            { value: "password" },
            { value: "radio" }, { value: "checkbox" },
            { value: "hidden" },
            { value: "file" },
            { value: "button" },
            { value: "submit" },
            { value: "reset" },

            { value: "date" },

        ]
    }
};

F_ITEMS["input_disabled"] = {
    label: "disabled(是否禁用)",
    prop: "disabled",
    type: "radio",
    default: false,
    options: [{ value: false, label: "否" }, { value: true, label: "是" }]

};

F_ITEMS["input_readonly"] = {
    label: "readonly(是否只读)",
    prop: "readonly",
    type: "radio",
    default: false,
    options: [{ value: false, label: "否" }, { value: true, label: "是" }]

};

F_ITEMS["input_maxlength"] = {
    label: "maxlength(值最大长度)",
    prop: "maxlength",
    frequency: {
        sytle: { width: '148px' },
        options: [{ value: "5" }, { value: "10" }]
    }
};
F_ITEMS["input_placeholder"] = {
    label: "placeholder(占位符)",
    prop: "placeholder",
    frequency: {
        sytle: { width: '148px' },
        options: [{ value: "请输入内容" }]
    }
};
F_ITEMS["input_value"] = {
    label: "value(字段值)",
    prop: "value",

};

F_ITEMS["opacity"] = {
    label: "opacity(透明度)",
    prop: "opacity",
    frequency: {
        sytle: { width: '148px' },
        options: [{ value: 0 }, { value: 0.5 }, { value: 1 }]
    }
};





F_ITEMS["vertical-align"] = {
    label: "vertical-align(垂直居中)",
    prop: "vertical-align",
    frequency: {
        sytle: { width: '148px' },
        options: [{ value: "top" }, { value: "middle" }, { value: "bottom" }]
    }
};





F_ITEMS["overflow"] = {
    label: "overflow(溢出)",
    prop: "overflow",
    frequency: {
        sytle: { width: '148px' },
        options: [{ value: "visible" }, { value: "hidden" }, { value: "scroll" }, { value: "auto" }]
    }
};

F_ITEMS["overflow-x"] = {
    label: "overflow-x(横向溢出)",
    prop: "overflow-x",
    frequency: {
        sytle: { width: '148px' },
        options: [{ value: "visible" }, { value: "hidden" }, { value: "scroll" }, { value: "auto" }]
    }
};

F_ITEMS["overflow-y"] = {
    label: "overflow-y(纵向溢出)",
    prop: "overflow-y",
    frequency: {
        sytle: { width: '148px' },
        options: [{ value: "visible" }, { value: "hidden" }, { value: "scroll" }, { value: "auto" }]
    }
};

F_ITEMS["text-overflow"] = {
    label: "text-overflow(文本溢出)",
    prop: "text-overflow",
    frequency: {
        sytle: { width: '148px' },
        options: [{ value: "clip" }, { value: "ellipsis" }]
    }
};

F_ITEMS["white-space"] = {
    label: "white-space(空白处理)",
    prop: "white-space",
    frequency: {
        sytle: { width: '148px' },
        options: [{ value: "normal" }, { value: "pre" }, { value: "nowrap" }, { value: "pre-wrap" }, { value: "pre-line" }]
    }
};

F_ITEMS["box-shadow"] = {
    label: "box-shadow(阴影)",
    prop: "box-shadow",
    frequency: {
        sytle: { width: '148px' },
        options: [{ value: " 2px 2px 5px #999" }]
    }
};

F_ITEMS["transform"] = {
    label: "transform(转换)",
    prop: "transform",
    frequency: {
        sytle: { width: '148px' },
        options: [
            { value: "translate(10%, 10%)" },
            { value: "translate(10px, 10px)" },
            { value: "rotate(30deg)" },
            { value: "scale(1.2)" },
            { value: "scale(1.2,3)" },
            { value: "skew(30deg, 20deg)" },

        ]

    }
};

F_ITEMS["transform-origin"] = {
    label: "transform-origin(变换基准点)",
    prop: "transform-origin",
    tips: "允许您更改转化元素的基准点位置",
    frequency: {
        sytle: { width: '148px' },
        options: [{ value: "0 0" }, { value: "100% 100%" }, { value: "top left" }, { value: "center center" }]
    }
};




F_ITEMS["transition"] = {
    label: "transition(过渡)",
    prop: "transition",
    frequency: {
        sytle: { width: '148px' },
        options: [{ value: "1s" }]
    }
};
F_ITEMS["aaaaa"] = {
    label: "aaaaa(0000)",
    prop: "aaaaa",
    frequency: {
        sytle: { width: '148px' },
        options: [{ value: "bbbbb" }, { value: "bbbbb" }, { value: "bbbbb" }, { value: "bbbbb" }]
    }
};
F_ITEMS["aaaaa"] = {
    label: "aaaaa(0000)",
    prop: "aaaaa",
    frequency: {
        sytle: { width: '148px' },
        options: [{ value: "bbbbb" }, { value: "bbbbb" }, { value: "bbbbb" }, { value: "bbbbb" }]
    }
};
  //#endregion


export default {
  components: {},
  data() {
    return {
      ready1: true,//第一个表单是否准备好
      activeName: "tab1",
      active2: "tab1_1",
      formDataCss: { "padding": "10px", "transition": "0.5s", "width": "180px", "height": "180px", "border-width": "3px", "border-style": "solid", "border-color": "#ff0000", },
      dataCssHover: {},
      htmlCode: "",
      cssCode: "",

      arrLayout: [
        {
          tag: "div",
          text: "演示盒子",
          cf: {
            id: "id_box1",
            style: {},
            class: "ele_layout MB8",
          },

        },

      ]

    };
  },
  watch: {
    formDataCss: {
      handler(newVal, oldVal) {
        console.log('formDataCss changed');
        this.saveCss()//调用：{保存样式函数}

      },
      immediate: true,
      deep: true
    },
    dataCssHover: {
      handler(newVal, oldVal) {
        console.log('dataCssHover changed');
        this.saveCss()//调用：{保存样式函数}

      },
      immediate: true,
      deep: true
    },
  },
  methods: {

    //函数：{保存样式函数}
    saveCss: async function () {
      let { formDataCss: objCss } = this;
      let cssCode = util.objToCss(objCss)//函数：{将Css对象转成css代码函数}
      this.cssCode = `
/*盒子样式*/
.ele_layout{${cssCode}}
      `
      let cssHover = this.getCssHover()//调用：{000函数}
      this.cssCode += cssHover
      util.add_css(this.cssCode)
    },
    //函数：{获取hover样式代码函数}
    getCssHover: function () {
      //将对象转成css代码
      let { dataCssHover: objCss } = this;
      let cssCode = util.objToCss(objCss)//函数：{将Css对象转成css代码函数}
      cssCode = `
/*鼠标悬停样式*/
.ele_layout:hover{${cssCode}}`
      return cssCode

    },
    //函数：{切换经典配置函数}
    switchCf: async function () {
      this.formDataCss = {
        color: "#fff", display: "inline-block", padding: "0 20px", height: "28px",
        "line-height": "26px", "background-color": "#0092dd",
        "cursor": "pointer", "font-size": "14px", "border-radius": "3px"
      }




      this.$nextTickStatus("ready1")

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
.ele_layout {
  border: 1px #ddd solid;
  border-radius: 5px;
}

.panel_config {
  border-left: 1px solid #999;
  padding: 0 0 0 10px;
}

.box_form {
  height: calc(100vh - 150px);
  overflow-y: auto;
  padding: 0 10px 0 10px;
}
.el-input__inner {
  color: #000;
  /* font-weight: 700; */
  font-family: Arial, Helvetica, sans-serif;
}
</style>
