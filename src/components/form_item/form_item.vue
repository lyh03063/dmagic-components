<template>
  <div class="LH32 DPF" ref="formItemBox" v-if="ready">
    <!-- <dm_debug_list>
        <dm_debug_item v-model="valueNeed" />
    </dm_debug_list>-->
    <!--component自定义组件-用于派成的权限树--->
    <component
      :is="item.component"
      v-model="valueNeed[item.prop]"
      :formData="valueNeed"
      v-if="item.component"
    ></component>
    <!--slot自定义组件-注意是isReadyFormData为真时才开始渲染-->
    <slot :name="item.slot" :formData="valueNeed" v-else-if="item.slot"></slot>

    <!--下拉框-->
    <template class v-else-if="item.type=='select'">
      <select_ajax
        ref="select_ajax"
        class
        v-model="valueNeed[item.prop]"
        :multiple="item.multiple"
        :keyLabel="item.ajax.keyLabel"
        :keyValue="item.ajax.keyValue"
        :ajaxUrl="item.ajax.url"
        :param="item.ajax.param"
        v-if="item.ajax"
      ></select_ajax>
      <el-select
        v-model="valueNeed[item.prop]"
        v-else
        clearable
        filterable
        :multiple="item.multiple"
        v-bind="item.cfElSelect"
        collapse-tags
      >
        <el-option
          :label="option.label"
          :value="option.value"
          v-for="option in item.options"
          :key="option.value"
        ></el-option>
      </el-select>
    </template>
    <!--dm_select_ajax_lazy下来选择框懒加载-->
    <dm_select_ajax_lazy
      v-model="valueNeed[item.prop]"
      :cf="item.cfSelectAjaxLazy"
      v-else-if="item.type=='select_ajax_lazy'"
    ></dm_select_ajax_lazy>

    <!--地区选择下拉框-->
    <dm_select_area
      v-model="valueNeed[item.prop]"
      :value-type="item.valueType"
      :cf="item.cfSelectAjaxLazy"
      v-else-if="item.type=='select_area'"
    ></dm_select_area>

    <!--弹窗选择列表-->
    <dm_select_list_data
      class="FX1"
      v-model="valueNeed[item.prop]"
      :cf="item.cfSelectList"
      v-else-if="item.type=='select_list_data'"
    ></dm_select_list_data>

    <!--单选框-->
    <el-radio-group class="MT8" v-model="valueNeed[item.prop]" v-else-if="item.type=='radio'">
      <el-radio
        :label="option.value"
        v-for="option in item.options"
        :key="option.value"
      >{{option.label}}</el-radio>
    </el-radio-group>
    <!--复选框-->
    <el-checkbox-group class="MT8" v-model="valueNeed[item.prop]" v-else-if="item.type=='checkbox'">
      <el-checkbox
        :label="option.value"
        v-for="option in item.options"
        :key="option.value"
      >{{option.label}}</el-checkbox>
    </el-checkbox-group>
    <!--文本域-->
    <el-input type="textarea" v-model="valueNeed[item.prop]" v-else-if="item.type=='textarea'"></el-input>

    <!--date日期选择-->
    <el-date-picker
      v-model="valueNeed[item.prop]"
      value-format="yyyy-MM-dd"
      align="right"
      type="date"
      placeholder="选择日期"
      v-else-if="item.type=='date'"
    ></el-date-picker>
    <!--date日期时间选择-->
    <el-date-picker
      v-model="valueNeed[item.prop]"
      format="yyyy-MM-dd HH:mm"
      value-format="yyyy-MM-dd HH:mm"
      align="right"
      type="datetime"
      placeholder="选择日期时间"
      v-else-if="item.type=='dateTime'"
    ></el-date-picker>
    <!--如果是时间段-->
    <time_period
      v-model="valueNeed[item.prop]"
      v-else-if="item.type=='time_period'"
      :cf="item.cfItem"
    ></time_period>
    <!--如果是百分比滑块-->
    <el-slider
      class="ML10 WP50 slider"
      v-model="valueNeed[item.prop]"
      :step="0.1"
      :max="1"
      height="30"
      show-stops
      v-else-if="item.type=='slider'"
      :marks="marks"
    ></el-slider>

    <!--如果是对象编辑器-->
    <dm_object
      v-model="valueNeed[item.prop]"
      v-else-if="item.type=='object'"
      :cf="item.cfItem"
      class="FX1"
    ></dm_object>

    <!--如果是vue-json编辑器-->
    <vue-json-editor
      v-model="valueNeed[item.prop]"
      v-else-if="item.type=='vueJsonEditor'"
      class="FX1"
      lang="zh"
    ></vue-json-editor>
    <!--如果是普通json编辑器-->
    <dm_json_editor v-model="valueNeed[item.prop]" v-else-if="item.type=='jsonEditor'" class="FX1"></dm_json_editor>
    <!--如果是collection-->
    <dm_collection
      v-model="valueNeed[item.prop]"
      v-else-if="item.type=='collection'"
      :list-type="item.collectionlistType"
      :show-toolbar="item.showToolbar"
      :cf-form="item.collectionCfForm"
      :cfElBtnAdd="item.cfElBtnAdd"
      :dataSlot="item.dataSlot"
      class="FX1"
    >
      <!--递归插槽-->
      <template v-slot:[item.dataSlot]="{doc}">
        <!--输出插槽-->
        <slot :name="item.dataSlot" v-if="item.dataSlot" :doc="doc"></slot>
      </template>
    </dm_collection>
    <!--如果是图片上传控件-->
    <upload_img
      v-model="valueNeed[item.prop]"
      :upload-config="item.uploadConfig"
      v-else-if="item.type=='upload'"
    ></upload_img>

    <!--如果是单个文件上传控件-->
    <upload_single
      v-model="valueNeed[item.prop]"
      :cf="item.cfItem"
      v-else-if="item.type=='upload_single'"
    ></upload_single>
    <!--富文本编辑器-->

    <tiny_mce_new
      class="FX1"
      v-model="valueNeed[item.prop]"
      v-else-if="item.type=='editorTM'"
      :showToolbar="true"
      :pasteImage="item.pasteImage"
      :cf="item.cfTiny"
    ></tiny_mce_new>

    <quill_editor v-model="valueNeed[item.prop]" v-else-if="item.type=='editor'" class="FX1"></quill_editor>
    <!--模糊查询文本框  支持回车查询-->
    <input_find_vague
      v-model="valueNeed[item.prop]"
      v-else-if="item.type=='input_find_vague'"
      @enterClick="$emit('enterClick')"
    ></input_find_vague>

    <!--密码框-->
    <el-input
      placeholder="请输入密码"
      v-model="valueNeed[item.prop]"
      v-else-if="item.type=='password'"
      show-password
    ></el-input>
    <!--json字段输入框，根据prop中是否包含点符号来判断-->
    <json_prop v-model="valueNeed[item.prop]" :prop="item.path" v-else-if="item.path" />

    <!--数字框-->
    <el-input-number
      v-model="valueNeed[item.prop]"
      :controls-position="item.controlsPosition||'right'"
      :min="item.min"
      :max="item.max"
      :class="{'hide-btn':item.hideBtn}"
      v-else-if="item.type=='number'"
    ></el-input-number>

    <!--numberRange数字范围-->

    <template class v-else-if="item.type=='numberRange'">
      <!--如果prop存在-->
      <number_range class v-model="valueNeed[item.prop]" v-bind="item" v-if="item.prop"></number_range>
      <!--如果prop不存在，传入整个valueNeed-->
      <number_range class v-model="valueNeed" v-bind="item" v-else></number_range>
    </template>
    <!--标签列表（数组）-->
    <tag_list v-model="valueNeed[item.prop]" v-else-if="item.type=='tag_list'"></tag_list>

    <!--文本-->
    <span class="PR5" v-else-if="item.type=='text'" :style="item.style">{{valueNeed[item.prop]}}</span>
    <!--树状数据-->
    <dm_tree_data
      class="FX1"
      v-model="valueNeed[item.prop]"
      :cf="item.cfItem"
      v-else-if="item.type=='tree_data'"
      :style="item.style"
    ></dm_tree_data>

    <!--codemirror代码块-->
    <dm_code
      class="FX1"
      v-model="valueNeed[item.prop]"
      :cf="item.cfItem"
      v-else-if="item.type=='codemirror'"
      :style="item.style"
    ></dm_code>
    <!--ajax_populate-->
    <dm_ajax_populate
      v-else-if="item.type=='ajax_populate'"
      :id="valueNeed[item.prop]"
      :populateKey="$lodash.get(item, `cfAjaxPopulate.populateKey`)"
      :page="$lodash.get(item, `cfAjaxPopulate.page`)"
    ></dm_ajax_populate>

    <!--普通文本框  支持enter触发表单提交-->

    <el-input
      class="FX1"
      v-else
      v-model.lazy="valueNeed[item.prop]"
      @keyup.enter.native="$emit('enterClick')"
      clearable
    ></el-input>

    <template class v-if="item.frequency">
      <!--颜色选择器-->
      <el-color-picker
        class="ML5 MT3"
        v-model="valueNeed[item.prop]"
        v-bind="item.frequency.cfColorPicker"
        v-if="item.frequency.type=='color'"
      ></el-color-picker>
      
      <!--普通候选项组件-->
      <dm_option_input
        class="ML5"
        v-else
        :cf="cfOptionInput(cf)"
        v-model="valueNeed[item.prop]"
        :options="cf.frequency.options"
      ></dm_option_input>
    </template>
  </div>
</template>

<script>
import vueJsonEditor from "vue-json-editor";
import select_ajax from "../../components/form_item/select_ajax.vue";
import input_find_vague from "../../components/form_item/input_find_vague.vue";

import upload_img from "../../components/form_item/upload_img.vue";
import upload_single from "../../components/form_item/upload_single.vue";
import time_period from "../../components/form_item/time_period.vue";
import json_prop from "../../components/form_item/json_prop.vue";

import quill_editor from "../../components/form_item/quill_editor.vue";
import tiny_mce_new from "../../components/form_item/tiny_mce_new";

import number_range from "../../components/form_item/number_range.vue";
import tag_list from "../../components/form_item/tag_list.vue";


export default {
  name: "form_item", //组件名，用于递归
  components: {
    vueJsonEditor: vueJsonEditor, select_ajax,
    input_find_vague, upload_img, upload_single, time_period, json_prop,
    quill_editor, tiny_mce_new, number_range, tag_list,
  },
  mixins: [MIX.form_item_new], //混入-这个是高风险混入，注意避免双向同步时出现死循环！！！！
  // mixins: [MIX.form_item_2], //新的混入项，优化性能
  props: {
    cf: [Object],
    value: [Object]
  },
  data() {
    return {
      ready: true,
      item: this.cf,
      valueNeed: this.value,
      visibleFrequency: {}, //候选项可见性
      marks: {
        //百分比刻度
        0: "0", 0.1: "10", 0.2: "20", 0.3: "30", 0.4: "40", 0.5: "50",
        0.6: "60", 0.7: "70", 0.8: "80", 0.9: "90", 1: "100"
      },

      predefineColors: [
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585',
        'rgba(255, 69, 0, 0.68)',
        'rgb(255, 120, 0)',
        'hsv(51, 100, 98)',
        'hsva(120, 40, 94, 0.5)',
        'hsl(181, 100%, 37%)',
        'hsla(209, 100%, 56%, 0.73)',
        '#c7158577'
      ]

    };
  },
  computed: {
    //候选项弹性列表配置***
    cfOptionInput: function () {
      let fn = function (cf) {
        let cfNeed = {}
        let style = cf.frequency.style || cf.frequency.sytle || {}
        let widthG = lodash.get(style, `width`);
        let cfListFlex = {}
        if (widthG) {
          cfListFlex.widthG = widthG
        }
        return { cfListFlex }
      }
      return fn

    }
  },

  methods: {
    //函数：{点击候选值后的函数}
    async slectFOption(option) {
      let { dataType } = this.item.frequency
      if (dataType == "array") {//如果{数据类型}是数组
        // this.valueNeed[this.item.prop] = [option.value];
        this.$set(this.valueNeed, this.item.prop, [option.value]);
      } else {
        this.$set(this.valueNeed, this.item.prop, option.value);
        // this.valueNeed[this.item.prop] = option.value;
      }
      this.visibleFrequency[this.item.prop] = false
      this.$nextTickStatus("ready")
    }
  },
  created() { }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/****************************数字输入框隐藏操作按钮-START****************************/
.hide-btn >>> [role="button"] {
  display: none;
}

.hide-btn >>> .el-input__inner {
  padding-right: 15px;
}
/****************************数字输入框隐藏操作按钮-END****************************/
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


/* 让进度条的文字不掉下来 */
.slider >>> .el-slider__marks-text {
  word-break: keep-all;
}
</style>
