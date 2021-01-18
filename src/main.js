
//路由的定义已经完全转移到线上了
window.axios = axios;
window.lodash = lodash
Vue.prototype.$lodash = lodash //让vue实例中可访问$store
import moment from 'moment' //导入moment方法库
window.moment = moment
Vue.prototype.$moment = moment //让vue实例中可访问$moment

import "./assets/js/public.js"
// import "./assets/js/config_base.1.5.4.js"

import comment from "./lib/index.js"
comment.install(Vue) //还真可以共用！！！！！！！20200201



PUB._paramAjaxAddon = { _systemId: "sys_api" }



util.setVuexDefault()//调用：{设置vuex函数}






import main from './main.vue'

let eleApp= document.querySelector("#app")


if(eleApp){
let configVue = {
    el: '#app',
    render: h => h(main),
}

if (typeof router == 'undefined') {//Q1：路由不存在
    let router = new VueRouter({ routes: [] })
    configVue.router = router
} else {//Q2：路由存在
    configVue.router = router
}

new Vue(configVue)//创建vue实例
}