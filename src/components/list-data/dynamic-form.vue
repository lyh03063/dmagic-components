<template>
  <div class>
    <dm_loading height="200" v-if="!isReadyFormData"></dm_loading>
    <!--isReadyFormData为真时才开始渲染表单，保证里面的组件初始化时，表单初始数据已经准备好-->
    <dm_debug_list>
      <dm_debug_item v-model="formDataNeed" text="formDataNeed" />
      <dm_debug_item v-model="value" text="value" />
      <dm_debug_item v-model="cf" text="配置" />
    </dm_debug_list>
    <el-form
      ref="form"
      :model="value"
      :label-width="cf.labelWidth||'120px'"
      :size="cf.size||'small'"
      :inline="cf.inline"
      v-if="isReadyFormData"
    >
      <el-row>
        <template v-for="(item,index) in cf.formItems">
          <!--这里搞了个特殊的key，其实可以去掉，但编辑器代码会显示红色错误。-->
          <!--而只使用prop或index则代码会报key重复的错误，很奇怪index也会报key重复-->
          <el-col
            :span="item.col_span||cf.col_span"
            :key="item.prop+'_'+index"
            :class="{clearall:clearall}"
            :style="getItemStyle(item)"
          >
            <!-- :style="{'background': 'red', height: '100px'}" -->
            <!-- clear:spanIndex==index, -->
            <div
              v-if="satisfyTerm(item)&&item.cfForm"
              :class="{'form-group-box':true,'form-group-no-label':!item.label}"
            >
              <div class="FWB FS16">{{item.label}}</div>
              <!--递归表单组件，如果有配置prop-->
              <dm_dynamic_form :cf="item.cfForm" v-model="formDataNeed[item.prop]" v-if="item.prop">
                <!--递归插槽-->
                <template
                  v-slot:[formItem.slot]="{formData}"
                  v-for="formItem in item.cfForm.formItems"
                >
                  <!--根据cf.formItems循环输出插槽-->
                  <slot :name="formItem.slot" :formData="formData" v-if="formItem.slot"></slot>
                </template>
              </dm_dynamic_form>
              <!--递归表单组件，如果没有配置prop-->
              <dm_dynamic_form :cf="item.cfForm" v-model="formDataNeed" v-else>
                <!--递归插槽-->
                <template
                  v-slot:[formItem.slot]="{formData}"
                  v-for="formItem in item.cfForm.formItems"
                >
                  <!--根据cf.formItems循环输出插槽-->
                  <slot :name="formItem.slot" :formData="formData" v-if="formItem.slot"></slot>
                </template>
              </dm_dynamic_form>
            </div>

            <el-form-item
              :label="item.label"
              :prop="item.prop"
              :rules="item.rules||[]"
              v-if="satisfyTerm(item)&&!item.cfForm"
            >
              <!--slot自定义组件-注意是isReadyFormData为真时才开始渲染-->
              <slot :name="item.slot" :formData="value" v-if="item.slot"></slot>
              <!--下拉框-->
              <div class v-else-if="item.type=='select'">
                <select_ajax
                  class
                  v-model="formDataNeed[item.prop]"
                  :multiple="item.multiple"
                  :keyLabel="item.ajax.keyLabel"
                  :keyValue="item.ajax.keyValue"
                  :ajaxUrl="item.ajax.url"
                  :param="item.ajax.param"
                  v-if="item.ajax"
                ></select_ajax>
                <el-select
                  v-model="formDataNeed[item.prop]"
                  v-else
                  clearable
                  :multiple="item.multiple"
                  collapse-tags
                >
                  <el-option
                    :label="option.label"
                    :value="option.value"
                    v-for="option in item.options"
                    :key="option.value"
                  ></el-option>
                </el-select>
              </div>

              <!--单选框-->
              <el-radio-group v-model="formDataNeed[item.prop]" v-else-if="item.type=='radio'">
                <el-radio
                  :label="option.value"
                  v-for="option in item.options"
                  :key="option.value"
                >{{option.label}}</el-radio>
              </el-radio-group>
              <!--复选框-->
              <el-checkbox-group
                v-model="formDataNeed[item.prop]"
                v-else-if="item.type=='checkbox'"
              >
                <el-checkbox
                  :label="option.value"
                  v-for="option in item.options"
                  :key="option.value"
                >{{option.label}}</el-checkbox>
              </el-checkbox-group>
              <!--文本域-->
              <el-input
                type="textarea"
                v-model="formDataNeed[item.prop]"
                v-else-if="item.type=='textarea'"
              ></el-input>

              <!--date日期选择-->
              <el-date-picker
                v-model="formDataNeed[item.prop]"
                value-format="yyyy-MM-dd"
                align="right"
                type="date"
                placeholder="选择日期"
                v-else-if="item.type=='date'"
              ></el-date-picker>
              <!--date日期时间选择-->
              <el-date-picker
                v-model="formDataNeed[item.prop]"
                format="yyyy-MM-dd HH:mm"
                value-format="yyyy-MM-dd HH:mm"
                align="right"
                type="datetime"
                placeholder="选择日期时间"
                v-else-if="item.type=='dateTime'"
              ></el-date-picker>
              <!--如果是时间段-->
              <time_period v-model="formDataNeed[item.prop]" v-else-if="item.type=='time_period'"></time_period>
              <!--如果是百分比滑块-->
              <el-slider
                class="ML10 MR50"
                v-model="formDataNeed[item.prop]"
                :step="0.1"
                :max="1"
                height="30"
                show-stops
                v-else-if="item.type=='slider'"
                :marks="marks"
              ></el-slider>

              <!--如果是vue-json编辑器-->
              <vue-json-editor
                v-model="formDataNeed[item.prop]"
                v-else-if="item.type=='vueJsonEditor'"
                lang="zh"
              ></vue-json-editor>
              <!--如果是普通json编辑器-->
              <json_editor v-model="formDataNeed[item.prop]" v-else-if="item.type=='jsonEditor'"></json_editor>
              <!--如果是collection-->
              <collection
                v-model="formDataNeed[item.prop]"
                v-else-if="item.type=='collection'"
                :list-type="item.collectionlistType"
                :show-toolbar="item.showToolbar"
                :cf-form="item.collectionCfForm"
              ></collection>
              <!--如果是图片上传控件-->
              <upload_img
                v-model="formDataNeed[item.prop]"
                :upload-config="item.uploadConfig"
                v-else-if="item.type=='upload'"
              ></upload_img>
              <!--富文本编辑器-->
              <!-- <quillEditor
                v-model="formDataNeed[item.prop]"
                :options="editorOption"
                v-else-if="item.type=='editor'"
              ></quillEditor>-->
              <tiny_mce v-model="formDataNeed[item.prop]"
                v-else-if="item.type=='editorTM'">
                </tiny_mce>
              <quill_editor v-model="formDataNeed[item.prop]" v-else-if="item.type=='editor'"></quill_editor>
              <!--模糊查询文本框-->
              <input_find_vague
                v-model="formDataNeed[item.prop]"
                v-else-if="item.type=='input_find_vague'"
              ></input_find_vague>

              <!--密码框-->

              <el-input
                placeholder="请输入密码"
                v-model="formDataNeed[item.prop]"
                v-else-if="item.type=='password'"
                show-password
              ></el-input>
              <!--json字段输入框，根据prop中是否包含点符号来判断-->
              <json_prop v-model="formDataNeed[item.prop]" :prop="item.path" v-else-if="item.path" />

              <!-- <json_prop
              v-model="formDataNeed[item.prop.split('.')[0]]"
              :prop="item.prop.split('.')[1]"
              v-else-if="item.prop.includes('.')"
              />-->
              <!--普通文本框-->
              <el-input v-model="formDataNeed[item.prop]" v-else></el-input>
            </el-form-item>
          </el-col>
        </template>

        <template class v-if="cf.btns&&cf.btns.length">
          <div class="TAC LH50 clear" v-if="!cf.inline">
            <el-button
              :type="item.type"
              @click="btnClick(item.event,item.validate)"
              v-for="(item,index) in cf.btns"
              :key="index"
              size="normal"
            >{{item.text}}</el-button>
          </div>
          <!-- 查询按钮 -->
          <el-form-item style="display:inline-block;" v-else>
            <el-button
              :type="item.type"
              @click="btnClick(item.event,item.validate)"
              v-for="(item,index) in cf.btns"
              :key="index"
              size="mini"
            >{{item.text}}</el-button>
          </el-form-item>
        </template>
      </el-row>
    </el-form>
  </div>
</template>

<script>
// import "quill/dist/quill.core.css";
// import "quill/dist/quill.snow.css";
// import "quill/dist/quill.bubble.css";
// import { quillEditor } from "vue-quill-editor";
// import quillConfig from '../../assets/js/quill-config.js'
import vueJsonEditor from "vue-json-editor";
import select_ajax from "../../components/form_item/select_ajax.vue";
import input_find_vague from "../../components/form_item/input_find_vague.vue";
import json_editor from "../../components/form_item/json_editor.vue";
import upload_img from "../../components/form_item/upload_img.vue";
import time_period from "../../components/form_item/time_period.vue";
import json_prop from "../../components/form_item/json_prop.vue";
import collection from "../../components/form_item/collection.vue";
import quill_editor from "../../components/form_item/quill_editor.vue";
import tiny_mce from '../../components/form_item/tiny_mce'
export default {
  name: "dm_dynamic_form", //组件名，用于递归
  components: {
    //注册组件
    quill_editor,
    vueJsonEditor,
    select_ajax,
    input_find_vague,
    json_editor,
    upload_img,
    time_period,
    json_prop,
    collection,
    tiny_mce
  },
  props: {
    cf: {
      type: Object,
      default() {
        return {
          btns: [
            { text: "提交", event: "submit", type: "primary", validate: true },
            { text: "取消", event: "cancel" }
          ]
          // col_span: 0
        };
      }
    },
    value: Object
    // formData: Object
  },
  data() {
    return {
      marks: {
        0: "0",
        0.1: "10",
        0.2: "20",
        0.3: "30",
        0.4: "40",
        0.5: "50",
        0.6: "60",
        0.7: "70",
        0.8: "80",
        0.9: "90",
        1: "100"
      },
      clearall: false, //控制变为行内块状
      spanIndex: null, //控制span属性值
      isReadyFormData: false, //表单初始化数据是否已备好的逻辑标记
      formDataNeed: this.value || {}
      // editorOption: quillConfig
    };
  },
  watch: {
    formDataNeed: {
      handler(newName, oldName) {
        console.log("formDataNeed变更");
        this.$emit("input", this.formDataNeed);
      },
      deep: true
    },
    value: {
      handler(newName, oldName) {
        console.log("form-value变更");
        this.formDataNeed = this.value || {};
      },
      deep: true
    }
  },
  methods: {
    /**
     * @name 获取该字段样式函数
     */
    getItemStyle: function(item) {
      let styleFinal = {}; //最终的样式对象
      styleFinal["min-height"] = this.cf.itemMinHeight || "51px"; //字段高度
      let { style = {} } = item;
      Object.assign(styleFinal, style); //合并对象

      return styleFinal;
    },

    //给递归表单字段做一层空对象的保障

    initRecursionProp() {
      this.cf.formItems.forEach(itemEach => {
        //循环：{表单字段配置数组}
        if (itemEach.cfForm && itemEach.prop) {
          //如果是递归字段
          this.formDataNeed[itemEach.prop] =
            this.formDataNeed[itemEach.prop] || {};
        }
      });
    },
    satisfyTerm(item) {
      //函数：{返回是否满足显示条件的函数}-用于字段联动
      let flag = true;
      //函数定义：{递归检查条件函数}
      let checkTerm = objTerm => {
        let flagIn = true;
        for (var key in objTerm) {
          //遍历term对象
          //QK1:或查询
          if (key == "$or") {
            //或条件
            let arrOr = objTerm[key]; //变量：{或条件数组}
            let arrFlagOr = []; //变量：{或条件结果数组}
            //循环：{或条件数组}
            arrOr.forEach(orEach => {
              let flagTemp = checkTerm(orEach); //递归获取***
              arrFlagOr.push(flagTemp); //数组添加元素：{或条件结果数组}
            });
            if (!arrFlagOr.includes(true)) {
              //如果{或条件结果数组}连一个true都没有
              return false;
            }
          }
          //QK2:{普通查询}
          else {
            let valueTerm = objTerm[key];
            if (valueTerm != this.formDataNeed[key]) {
              return false;
            }
          }
        }
        return flagIn;
      };

      //如果存在term条件
      if (item.term) {
        flag = checkTerm(item.term);
      }

      return flag;
    },
    btnClick(eventName, validate) {
      //Q1：需要校验
      if (validate) {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.$emit(eventName);
          } else {
            return false;
          }
        });
      } else {
        //Q2：不需要校验
        this.$emit(eventName);
      }
    },
    //初始化表单函数
    initForm() {
      if (this.docGet) {
        //ajax获取到的表单数据存在
        let jsonData = {};
        this.cf.formItems.forEach(itemEach => {
          //循环：{表单字段配置数组}
          jsonData[itemEach.prop] = this.docGet[itemEach.prop];
        });

        //让初始传入的formData但在formItems中未定义的数据也要保留！！
        let json1 = Object.assign(this.docGet, jsonData); //合并对象

        this.formDataNeed = util.deepCopy(json1); //深拷贝，触发完整的双向绑定！！！
        this.initRecursionProp(); //给递归表单字段做一层空对象的保障
      }
      this.isReadyFormData = true; //***表单初始化数据是否已备好的逻辑标记,某些字段需要等待这个标记为true
    }
  },
  async created() {
    this.docGet = this.value || {}; //**** */
    this.initRecursionProp(); //给递归表单字段做一层空对象的保障
    this.cf.formItems.forEach(itemEach => {
      //循环：{表单字段配置数组}处理默认值
      this.docGet[itemEach.prop] =
        this.value[itemEach.prop] || itemEach.default;
    });

    //如果初始化的ajax地址存在
    if (this.cf.urlInit) {
      let { data } = await axios({
        //请求接口
        method: "post",
        url: (PUB.domain || "") + this.cf.urlInit, //注意运算符要用括号
        data: this.cf.paramInit || {
          id: this.value.P1
        } //传递参数
      });
      this.docGet = data.Doc; //这里要使用大写的Doc
    }
    this.initForm(); //调用：{初始化表单函数}
  },
  mounted() {
    if (this.cf.watch) {
      //for of循环遍历对象，for of不能直接处理对象，本质上是同个Object.keys拼装一个新数组进行辅助
      let obj1 = this.cf.watch;
      console.log("Object.keys结果", Object.keys(obj1));
      for (var key of Object.keys(obj1)) {
        console.log(key + ": " + obj1[key]);
   
        // console.log("this.cf.watch####", this.cf.watch);
        this.$watch(`value.${key}`, this.cf.watch[key]);
      }
    }

    this.spanIndex = Math.floor(24 / this.cf.col_span);
    if (!this.cf.col_span && this.cf.inline) {
      //如果form表单已经启动了行内模式和不进行分块
      this.clearall = true; //控制是否变为行内块状元素
      this.cf.col_span = null; //控制不分行
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.clear {
  /* 清除浮动的样式 */
  clear: both;
}

.clearall.el-col {
  /* 当不需要分块时，把所有区块都设置为行内块级元素 */
  display: inline-block;
}
.clear ~ .el-form-item {
  /* 查询按钮，按钮浮动 */
  float: left;
}

.form-group-box {
  border: 1px #ddd solid;
  border-radius: 5px;
  padding: 10px 10px 15px;
  margin: 0 0 20px 0;
}
/* 当标签为空时，把边框也去掉 */
.form-group-no-label {
  border: none;
  padding: 0;
  margin: 0 0 20px 0;
}

/* 防止最下边的子表单出现过大的间距 */

.el-col-24:last-child .form-group-box {
  margin-bottom: 0;
}

/* 防止最下边的字段出现过大的间距,包括双列情况 */
.el-col-12:last-child .el-form-item,
.el-col-12:nth-last-child(2) .el-form-item,
.el-col-24:last-child .el-form-item {
  margin-bottom: 0;
}

/****************************进度条补丁-START****************************/
.el-col >>> .el-slider__marks-text {
  margin-top: 8px;
  line-height: 32px;
  /* 不换行 */
  word-break: keep-all;
}

.el-col >>> .el-slider__runway {
  margin: 15px 0 0 0;
}
/****************************进度条补丁-END****************************/
</style>
