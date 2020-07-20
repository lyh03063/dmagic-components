// import Vue from 'vue'
import dm_debug_list from '@/components/common/debug_list/debug_list'
import dm_debug_item from '../components/common/debug_item/debug_item'
import dm_loading from '../components/common/loading/loading.vue'
import dm_space from '../components/common/space/space.vue'
import dm_pannel from '../components/common/pannel/index.vue'
import dm_list_flex_res from '../components/common/list_flex_res/index.vue'
import dm_title_bar from '../components/common/title_bar.vue'
import dm_pannel_new from '../components/common/pannel_new.vue'
import dm_echart from '../components/common/echart.vue'





const Components = {
  dm_debug_list, dm_debug_item, dm_loading, dm_space, dm_pannel,
  dm_list_flex_res, dm_title_bar, dm_title_bar, dm_pannel_new, dm_echart,

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


