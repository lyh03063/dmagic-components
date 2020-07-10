// import Vue from 'vue'
import dm_test from '@/components/common/test'
import dm_debug_list from '@/components/common/debug_list/debug_list'
import dm_debug_item from '../components/common/debug_item/debug_item'
import dm_dynamic_form from '../components/list-data/dynamic-form.vue'
import dm_list_data from '../components/list-data/list-data.vue'
import dm_loading from '../components/common/loading/loading.vue'
import dm_ajax_populate from '../components/common/ajax_populate/ajax_populate.vue'
import dm_space from '../components/common/space/space.vue'
import dm_select_list_data from '../components/form_item/select_list_data/select_list_data.vue'
import dm_select_ajax_lazy from '../components/form_item/select_ajax_lazy.vue'
import dm_pannel from '../components/common/pannel/index.vue'

import dm_list_flex_res from '../components/common/list_flex_res/index.vue'
import dm_title_bar from '../components/common/title_bar.vue'
import dm_pannel_new from '../components/common/pannel_new.vue'
import dm_form_item from '../components/form_item/form_item.vue'
import dm_collection from '../components/form_item/collection.vue'
import dm_tree_data from '../components/form_item/tree_data.vue'
import dm_object from '../components/form_item/object.vue'
import dm_select_area from '../components/form_item/select_area.vue'
import dm_form_css from '../components/form_item/form_css.vue'
import dm_json_editor from '../components/form_item/json_editor.vue'


import dm_dialog_edit from '../components/list-data/dialog_edit.vue'

import dm_com_row_js_code from '../components/common/com_row_js_code.vue'
import dm_echart from '../components/common/echart.vue'
import dm_ele from '../components/common/ele.vue'

import dm_aplayer from '../components/common/aplayer.vue'
import dm_drag_box_width from '../components/common/drag_box_width.vue'

import dm_dialog_add from '../components/list-data/dialog_add.vue'
import dm_detail_group_common from '../components/list-data/detail_group_common.vue'
import dm_list_common from '../components/list-data/list_common.vue'
import dm_detail_group from '../components/list-data/detail_group.vue'
import dm_detail_g_list from '../components/list-data/detail_g_list.vue'
import dm_pannel_d_g_list from '../components/list-data/pannel_d_g_list.vue'
import dm_pannel_d_g_list_html_api from '../components/list-data/pannel_d_g_list_html_api.vue'
import dm_rel_list_data from '../components/list-data/rel_list_data.vue'
import dm_pannel_rel_list_data from '../components/list-data/pannel_rel_list_data.vue'
import dm_list_simple from '../components/list-data/list_simple.vue'
import dm_detail_son_data from '../components/list-data/detail_son_data.vue'
import dm_list_visit_history from '../components/list-data/list_visit_history.vue'


//以下两个要用到scss
import dm_manage_home from '../components/manage/listHome.vue'
import dm_modify_password from '../components/manage/modify_password.vue'





import dm_detail_audio from '../components/detail/detail_audio.vue'
import dm_group_audio from '../components/detail/group_audio.vue'
import dm_detail_html_api from '../components/detail/detail_html_api.vue'
import dm_detail_data from '../components/detail/detail_data.vue'


import dm_built_file_from_temp from '../components/bussiness/built_file_from_temp.vue'
import dm_detail_bankruptcy_case from '../components/bussiness/detail_bankruptcy_case.vue'


import dm_c_operate_g_file from '../components/column/operate_g_file.vue'
import dm_c_operate_g from '../components/column/operate_g.vue'
import dm_c_operate_normal from '../components/column/operate_normal.vue'


import { codemirror } from "vue-codemirror";
// import "codemirror/lib/codemirror.css";
// 引入主题后还需要在 options 中指定主题才会生效

// import "codemirror/theme/lucario.css"; //黑背景主题
/**
 * 
eclipse.css,base16-light.css
更多主题查看https://codemirror.net/theme/
 */

import "codemirror/mode/javascript/javascript";//16k左右
// import "aaaaa";

import "codemirror/addon/selection/active-line"; //高亮当前行
import "codemirror/addon/fold/foldgutter"; //代码折叠-一定要引用
import "codemirror/addon/fold/foldgutter.css"; //代码折叠样式一定要引用
import "codemirror/addon/fold/brace-fold.js"; //代码折叠-一定要引用



// highlightSelectionMatches
import 'codemirror/addon/search/match-highlighter.js'//匹配选中单词高亮






import dm_code from '../components/form_item/codemirror.vue'

import dm_auto_layout from '../components/tool/auto_layout.vue'
import dm_dialog_select_demo from '../components/tool/dialog_select_demo.vue'
import dm_single_class_edit from '../components/tool/single_class_edit.vue'
import dm_row_html_tag from '../components/tool/row_html_tag.vue'
import dm_js_file_edit from '../components/tool/js_file_edit.vue'
import dm_js_code_edit from '../components/tool/js_code_edit.vue'
import dm_score_panel from '../components/tool/score_panel.vue'
import com_score_panel from '../components/tool/com_score_panel.vue'

import dm_familiarity_select from '../components/tool/familiarity_select.vue'
import  dm_note_familiarity_select from '../components/tool/note_familiarity_select.vue'


import  dm_card_note_normal from '../components/card/note_normal.vue'
import  dm_card_note_history from '../components/card/note_history.vue'
import  dm_card_js_code_hs from '../components/card/js_code_hs.vue'

const Components = {
  dm_pannel,dm_list_flex_res,dm_test,
  dm_debug_list, dm_debug_item,dm_json_editor,
  dm_loading,dm_ajax_populate,dm_space,
  dm_dynamic_form,dm_list_data,dm_select_ajax_lazy,
  dm_codemirror:codemirror,dm_code,dm_form_css,
  dm_select_list_data,dm_collection,dm_dialog_edit,dm_dialog_add,dm_form_item,
  dm_tree_data,dm_title_bar,dm_pannel_new,dm_select_area,dm_object,
  dm_com_row_js_code,dm_echart,
  dm_detail_group_common,dm_detail_group,dm_detail_g_list,
  dm_pannel_d_g_list,dm_pannel_d_g_list_html_api,
  dm_rel_list_data,dm_pannel_rel_list_data,dm_list_common,
  dm_manage_home,dm_built_file_from_temp,dm_detail_bankruptcy_case,
  dm_modify_password,dm_aplayer,dm_detail_audio,dm_detail_data,dm_drag_box_width,
  dm_group_audio,dm_detail_html_api,
  dm_c_operate_g,dm_c_operate_g_file,dm_c_operate_normal,
  dm_list_simple,dm_detail_son_data,
  dm_ele,dm_auto_layout,dm_dialog_select_demo,dm_single_class_edit,dm_row_html_tag,
  dm_js_file_edit,dm_js_code_edit,dm_score_panel,
  dm_familiarity_select,dm_note_familiarity_select,
  com_score_panel,dm_card_note_normal,dm_card_note_history,dm_card_js_code_hs,
  dm_list_visit_history
}


const comment = {
  install: function (Vue) {
    //安装以上多个组件
    Object.keys(Components).forEach(name => {
      Vue.component(name, Components[name])
      // Vue.component(name, VueComment)
    })

  }
}

// global 情况下 自动安装
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(comment)
}
// 导出模块
export default comment


