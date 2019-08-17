// import Vue from 'vue'
import dm_debug_list from '../components/common/debug_list/debug_list'
import dm_debug_item from '../components/common/debug_item/debug_item'
import dm_dynamic_form from '../components/list-data/dynamic-form.vue'
import dm_list_data from '../components/list-data/list-data.vue'
import dm_loading from '../components/common/loading/loading.vue'
import dm_ajax_populate from '../components/common/ajax_populate/ajax_populate.vue'
import dm_space from '../components/common/space/space.vue'
const Components = {
  dm_debug_list, dm_debug_item,
  dm_loading,dm_ajax_populate,dm_space,
  dm_dynamic_form,dm_list_data,
}


const comment = {
  install: function (Vue) {
    //安装以上多个组件
    Object.keys(Components).forEach(name => {
      console.log("name################1", name);
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


