import component from './dynamic-form';
import component2 from './list-data';
;

export default {
    install:function (Vue){
        Vue.component('dm_dynamic_form',component)//控制组件标签
        Vue.component('dm_list_data',component2)//控制组件标签
      
    }
}