// import Vue from 'vue'
import dm_debug_list from '../components/common/debug_list/debug_list'
import dm_debug_item from '../components/common/debug_item/debug_item'
import dm_dynamic_form from '../components/list-data/dynamic-form.vue'
import dm_list_data from '../components/list-data/list-data.vue'
import dm_loading from '../components/common/loading/loading.vue'
import dm_ajax_populate from '../components/common/ajax_populate/ajax_populate.vue'
import dm_space from '../components/common/space/space.vue'
import dm_select_list_data from '../components/form_item/select_list_data/select_list_data.vue'
import dm_pannel from '../components/common/pannel/index.vue'

import dm_list_flex_res from '../components/common/list_flex_res/index.vue'



import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";
// 引入主题后还需要在 options 中指定主题才会生效

import "codemirror/theme/lucario.css"; //黑背景主题
/**
 * 
eclipse.css,base16-light.css
更多主题查看https://codemirror.net/theme/
 */

import "codemirror/mode/javascript/javascript";
// import "aaaaa";

import "codemirror/addon/selection/active-line"; //高亮当前行
import "codemirror/addon/fold/foldgutter"; //代码折叠-一定要引用
import "codemirror/addon/fold/foldgutter.css"; //代码折叠样式一定要引用
import "codemirror/addon/fold/brace-fold.js"; //代码折叠-一定要引用





const Components = {
  dm_pannel,dm_list_flex_res,
  dm_debug_list, dm_debug_item,
  dm_loading,dm_ajax_populate,dm_space,
  dm_dynamic_form,dm_list_data,
  dm_codemirror:codemirror,
  dm_select_list_data
}


const comment = {
  install: function (Vue) {
 
    //安装以上多个组件
    Object.keys(Components).forEach(name => {
      console.log(`install:${name}`);
      Vue.component(name, Components[name])
      // Vue.component(name, VueComment)
    })

  }
}

console.log("window.Vue:####", window.Vue);
// global 情况下 自动安装
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(comment)
}
// 导出模块
export default comment


