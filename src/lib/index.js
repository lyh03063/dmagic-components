// import Vue from 'vue'
import dm_test from '@/components/common/test'


import dm_dynamic_form from '../components/list-data/dynamic-form.vue'
import dm_list_data from '../components/list-data/list-data.vue'

import dm_ajax_populate from '../components/common/ajax_populate/ajax_populate.vue'

import dm_select_list_data from '../components/form_item/select_list_data/select_list_data.vue'
import dm_select_ajax_lazy from '../components/form_item/select_ajax_lazy.vue'

import dm_form_item from '../components/form_item/form_item.vue'
import dm_collection from '../components/form_item/collection.vue'
import dm_tree_data from '../components/form_item/tree_data.vue'
import dm_object from '../components/form_item/object.vue'
import dm_select_area from '../components/form_item/select_area.vue'
import dm_form_css from '../components/form_item/form_css.vue'
import dm_json_editor from '../components/form_item/json_editor.vue'
import dm_input_css_prop from '../components/form_item/input_css_prop.vue'
import dm_input_html_tag from '../components/form_item/input_html_tag.vue'
import dm_input_style_prop from '../components/form_item/input_style_prop.vue'
import dm_auto_css_prop from '../components/form_item/auto_css_prop.vue'
import dm_auto_html_tag from '../components/form_item/auto_html_tag.vue'
import dm_option_input from '../components/form_item/option_input.vue'

import dm_dialog_edit from '../components/list-data/dialog_edit.vue'

import dm_com_row_js_code from '../components/common/com_row_js_code.vue'
import dm_com_row_css_code from '../components/common/com_row_css_code.vue'


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
import dm_list_visit_often from '../components/list-data/list_visit_often.vue'
import dm_list_data_version from '../components/list-data/list_data_version.vue'
import dm_list_data_collect from '../components/list-data/list_data_collect.vue'


//以下两个要用到scss
import dm_manage_home from '../components/manage/listHome.vue'
import dm_modify_password from '../components/manage/modify_password.vue'





import dm_detail_audio from '../components/detail/detail_audio.vue'
import dm_group_audio from '../components/detail/group_audio.vue'
import dm_detail_html_api from '../components/detail/detail_html_api.vue'
import dm_detail_data from '../components/detail/detail_data.vue'
import dm_pannel_son_note from '../components/detail/pannel_son_note.vue'



import dm_built_file_from_temp from '../components/bussiness/built_file_from_temp.vue'
import dm_detail_bankruptcy_case from '../components/bussiness/detail_bankruptcy_case.vue'


import dm_c_operate_g_file from '../components/column/operate_g_file.vue'
import dm_c_operate_g from '../components/column/operate_g.vue'
import dm_c_operate_normal from '../components/column/operate_normal.vue'
import dm_c_party_case from '../components/column/party_case.vue'

import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";//暂时不做懒加载，因为会影响到全屏css
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


/****************************hint-暂时无用-START****************************/
import "codemirror/addon/hint/show-hint.css"; //hint
import "codemirror/addon/hint/show-hint.js"; //
import "codemirror/addon/hint/xml-hint.js"; //
import "codemirror/addon/hint/html-hint.js"; //
/****************************hint-暂时无用-END****************************/


import "codemirror/mode/css/css.js"; //Css高亮

import "codemirror/mode/xml/xml.js"; //html高亮


import "codemirror/addon/display/fullscreen.css"; //全屏Css,要放在codemirror.css后面
import "codemirror/addon/display/fullscreen.js"; //全屏Js





import dm_code from '../components/form_item/codemirror.vue'
import dm_collection_html_prop from '../components/form_item/collection_html_prop.vue'

import dm_auto_layout from '../components/tool/auto_layout.vue'
import dm_dialog_select_demo from '../components/tool/dialog_select_demo.vue'
import dm_dialog_css_prop from '../components/tool/dialog_css_prop.vue'

import dm_dialog_html_tag from '../components/tool/dialog_html_tag.vue'


import dm_single_class_edit from '../components/tool/single_class_edit.vue'
import dm_row_html_tag from '../components/tool/row_html_tag.vue'
import dm_row_css_code from '../components/tool/row_css_code.vue'

import dm_js_file_edit from '../components/tool/js_file_edit.vue'
import dm_js_code_edit from '../components/tool/js_code_edit.vue'
import dm_css_code_edit from '../components/tool/css_code_edit.vue'
import dm_js_code_curr from '../components/tool/js_code_curr.vue'
import dm_css_code_curr from '../components/tool/css_code_curr.vue'
import dm_score_panel from '../components/tool/score_panel.vue'
import com_score_panel from '../components/tool/com_score_panel.vue'

import dm_familiarity_select from '../components/tool/familiarity_select.vue'
import dm_note_familiarity_select from '../components/tool/note_familiarity_select.vue'


import dm_card_note_normal from '../components/card/note_normal.vue'
import dm_card_note_history from '../components/card/note_history.vue'
import dm_card_data_version from '../components/card/data_version.vue'
import dm_card_note_often from '../components/card/note_often.vue'
import dm_card_front_demo from '../components/card/front_demo.vue'
import dm_card_data_collect from '../components/card/data_collect.vue'

import dm_card_js_code_hs from '../components/card/js_code_hs.vue'
import dm_card_auto_layout_hs from '../components/card/auto_layout_hs.vue'
import dm_card_js_code_often from '../components/card/js_code_often.vue'
import dm_card_front_demo_often from '../components/card/front_demo_often.vue'




//列-完成度显示
import com_complete from '@/components/common/com_complete.vue'
//列-图片预览
import com_imagePreview from '@/components/common/com_imagePreview.vue'


//查询表单-完成度
import com_item_complete_search from '@/components/common/com_item_complete_search.vue'
// 表单-规格价格组件（复杂）
import com_f_item_listSpecPrice from '@/components/common/com_f_item_listSpecPrice.vue'
// 列-订单支付状态和退款操作
import com_c_item_payStatus from '@/components/common/com_c_item_payStatus.vue'

//详情-订单商品列表
import com_listGoods from '@/components/common/com_d_item_listGoods.vue'
//详情-订单地址显示
import com_addressObj from '@/components/common/com_d_item_addressObj.vue'


import com_column_operate_rel_data from '@/components/common/com_c_operate_rel_data.vue'
import com_column_operate_entity_data from '@/components/common/com_c_operate_entity_data.vue'


import com_c_countSonTask from '@/components/common/com_c_countSonTask.vue'
import com_c_sonData from '@/components/common/com_c_sonData.vue'
import com_c_relData from '@/components/common/com_c_relData.vue'
import com_c_sonTaskGId from '@/components/common/com_c_sonTaskGId.vue'
import com_c_sonNoteGId from '@/components/common/com_c_sonNoteGId.vue'
import com_c_g_person_file from '@/components/common/com_c_g_person_file.vue'
import com_c_g_person_url from '@/components/common/com_c_g_person_url.vue'
import com_c_g_person_image from '@/components/common/com_c_g_person_image.vue'
import com_c_g_person_album from '@/components/common/com_c_g_person_album.vue'
import com_c_g_album_image from '@/components/common/com_c_g_album_image.vue'


import com_c_g_company_url from '@/components/common/com_c_g_company_url.vue'
import com_c_g_company_person from '@/components/common/com_c_g_company_person.vue'
import com_c_g_company_file from '@/components/common/com_c_g_company_file.vue'
import com_c_g_company_image from '@/components/common/com_c_g_company_image.vue'
import com_c_g_company_album from '@/components/common/com_c_g_company_album.vue'

import com_c_g_bankruptcy_file_1 from '@/components/common/com_c_g_bankruptcy_file_1.vue'
import com_c_g_bankruptcy_file_2 from '@/components/common/com_c_g_bankruptcy_file_2.vue'

import com_btn_collect from '@/components/common/btn_collect.vue'




import card_course from '@/components/card/course.vue'
import card_goods from '@/components/card/goods.vue'
import card_student_work from '@/components/card/student_work.vue'
import card_case from '@/components/card/case.vue'
import card_case_old from '@/components/card/case_old.vue'
import card_partner from '@/components/card/partner.vue'
import card_product_old from '@/components/card/product_old.vue'


import com_longting_order_statistics from '@/components/bussiness/longting_order_statistics.vue'

import com_block from '@/components/site/block.vue'
import banner from '@/components/site/banner.vue'
import contact_right from '@/components/site/contact_right.vue'
import list_article from '@/components/site/list_article.vue'
import list_article_date from '@/components/site/list_article_date.vue'
import list_article_img from '@/components/site/list_article_img.vue'
import breadcrumb from '@/components/site/n-breadcrumb.vue'//废弃？
import page_foot from '@/components/site/page_foot.vue'
import page_head from '@/components/site/page_head.vue'
import page_menu from '@/components/site/page_menu.vue'
import pannel_list_article_date from '@/components/site/pannel_list_article_date.vue'

import dm_left_menu from '@/components/NavMenu/NavMenu'
import dm_user_role from "@/components/common/role"
import dm_video_player from "@/components/common/video_player"



import search_result from '@/page/search_result'
import detail_g_card_link from '@/page/detail_g_card_link'
import detail_group_g_card from '@/page/detail_group_g_card'
import group_home from '@/page/group_home'

import study_home from '@/page/study_home'
import study_user from '@/page/study_user'
import dm_system from '@/page/system/system'
import dm_manage from '@/page/system/manage'

import site_home from '@/page/site/home.vue'
import site_list_course from '@/page/site/list_course.vue'
import site_main from '@/page/site/main.vue'


import dm_login from '@/login.vue'
import dm_manage_base from '@/manage.vue'


const Components = {
  dm_test,
  dm_json_editor, dm_input_css_prop, dm_input_html_tag,
  dm_ajax_populate, dm_input_style_prop, dm_auto_css_prop, dm_auto_html_tag,
  dm_dynamic_form, dm_list_data, dm_select_ajax_lazy,
  dm_codemirror: codemirror, dm_code, dm_form_css, dm_collection_html_prop,
  dm_select_list_data, dm_collection, dm_dialog_edit, dm_dialog_add, dm_form_item, dm_option_input,
  dm_tree_data, dm_select_area, dm_object,
  dm_com_row_js_code, dm_video_player, dm_com_row_css_code,
  dm_detail_group_common, dm_detail_group, dm_detail_g_list,
  dm_pannel_d_g_list, dm_pannel_d_g_list_html_api,
  dm_rel_list_data, dm_pannel_rel_list_data, dm_list_common,
  dm_manage_home, dm_built_file_from_temp, dm_detail_bankruptcy_case,
  dm_modify_password, dm_aplayer, dm_detail_audio, dm_detail_data, dm_drag_box_width,
  dm_group_audio, dm_detail_html_api,
  dm_c_operate_g, dm_c_operate_g_file, dm_c_operate_normal, dm_c_party_case,
  dm_list_simple, dm_detail_son_data, dm_pannel_son_note,
  dm_ele, dm_auto_layout, dm_dialog_select_demo, dm_single_class_edit, dm_row_html_tag,
  dm_dialog_css_prop, dm_dialog_html_tag,
  dm_js_file_edit, dm_js_code_edit, dm_js_code_curr, dm_css_code_curr,
  dm_score_panel, dm_row_css_code,dm_css_code_edit,
  dm_familiarity_select, dm_note_familiarity_select,
  com_score_panel, dm_card_note_normal, dm_card_note_history, dm_card_note_often,
  dm_card_front_demo, dm_card_data_version, dm_card_data_collect,
  dm_card_js_code_hs,dm_card_auto_layout_hs,  dm_card_js_code_often,dm_card_front_demo_often,
  dm_list_visit_history, dm_list_visit_often, dm_list_data_version, dm_list_data_collect,
  com_complete, com_imagePreview, com_item_complete_search, com_f_item_listSpecPrice, com_c_item_payStatus,
  com_listGoods, com_addressObj, com_column_operate_rel_data, com_column_operate_entity_data,
   com_c_countSonTask,com_c_relData,
  com_c_sonData, com_c_sonTaskGId, com_c_sonNoteGId, com_c_g_person_file, com_c_g_person_url,
  com_c_g_person_image, com_c_g_person_album, com_c_g_album_image, com_c_g_company_url, com_c_g_company_person,
  com_c_g_company_file, com_c_g_company_image, com_c_g_company_album,
   com_c_g_bankruptcy_file_1, com_c_g_bankruptcy_file_2,

  card_course, card_goods,com_btn_collect,
  card_student_work, card_case, card_case_old, card_partner, card_product_old,
  com_longting_order_statistics,

  banner, contact_right, list_article, list_article_date, list_article_img,
  breadcrumb, page_foot, page_head, page_menu, pannel_list_article_date, com_block,

  dm_left_menu, dm_user_role,
  search_result, detail_g_card_link, detail_group_g_card, group_home,
  study_home, study_user, dm_manage,
  dm_system, site_home, site_list_course, site_main,

  dm_login, dm_manage_base

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


