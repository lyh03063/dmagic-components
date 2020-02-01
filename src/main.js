

// import './assets/css/public.css';


import Vue from 'vue'
import 'babel-polyfill'
// import "./assets/js/mix.js";//注意位置要提前

import axios from "axios";
window.axios = axios;
import lodash from 'lodash'//导入lodash方法库
window.lodash = lodash
Vue.prototype.$lodash = lodash//让vue实例中可访问$store

import moment from 'moment'//导入moment方法库
window.moment = moment
Vue.prototype.$moment = moment//让vue实例中可访问$moment

import  "./assets/js/config_column.js"
import  "./assets/js/config_form.js"


import util from "./assets/js/util.js";
window.util = util;

import  comment from "./lib/index.js"
comment.install(Vue)//还真可以共用！！！！！！！20200201


// import space from './components/common/space/index.js';   //默认情况下找的是index文件
// Vue.use(space);   //必须有install
// import debug_list from './components/common/debug_list/index.js';   //导入debug_list
// Vue.use(debug_list);   //作为全局组件，必须有install
// import debug_item from './components/common/debug_item/index.js';   //导入debug_item
// Vue.use(debug_item);   //作为全局组件，必须有install
// import dm_ajax_populate from './components/common/ajax_populate/index.js';   //导入ajax_populate
// Vue.use(dm_ajax_populate);   //作为全局组件，必须有install
// import loading from './components/common/loading/index.js';   //导入loading
// Vue.use(loading);   //作为全局组件，必须有install

// import pannel from './components/common/pannel/index.js';   //导入ajax_populate
// Vue.use(pannel);   //作为全局组件，必须有install
// import list_flex_res from './components/common/list_flex_res/index.js';   //导入ajax_populate
// Vue.use(list_flex_res);   //作为全局组件，必须有install

// //**** 导入dm_dynamic_form和dm_list_data和 dm_ajax_populate*/
// import form_and_list from './components/list-data/index.js';   //
// Vue.use(form_and_list);   //作为全局组件，必须有install


// import dm_select_list_data from './components/form_item/select_list_data/index.js'
// Vue.use(dm_select_list_data);   //作为全局组件，必须有install


import VueRouter from 'vue-router'
Vue.use(VueRouter)

import form_demo from './page/form_demo.vue';   //导入form_demo
import form_demo2 from './page/form_demo2.vue';   //导入form_demo
import list_demo from './page/list_demo.vue';   //导入list_demo
import list_static_demo from './page/list_static_demo.vue';   //导入list_static_demo
import list_common_demo from './page/list_common_demo.vue';   //导入list_common_demo
import upload_qiniu from './page/upload_qiniu.vue';   //导入upload_qiniu
import test from './page/test.vue';   //导入test
import demo_show from './page/demo_show.vue';   //导入demo_show
// 3. 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/form_demo' },
    { path: '/form_demo', component: form_demo },
    { path: '/form_demo2', component: form_demo2 },

    
    { path: '/list_demo', component: list_demo },
    { path: '/list_static_demo', component: list_static_demo },
    { path: '/list_common_demo', component: list_common_demo },
    { path: '/upload_qiniu', component: upload_qiniu },
    { path: '/test', component: test },
    { path: '/demo_show', component: demo_show },
  ]
})



import Vuex from 'vuex'//导入vuex模块
Vue.use(Vuex)//应用组件

const store = new Vuex.Store({//定义Vuex的存储对象
  state: {
    debug: false,
    activeMenuIndex: "",//当前激活的菜单index
    listState: {//存放列表的共享状态，

    },
    defultFindJson: {//存放列表的默认查询参数，
      // list_article:{articleCategory:3  }

    },
    cfData:{//组件配置数据
      isShowSearchForm:false
    }
  },

  mutations: {//变更事件
    setDebug(state, param) {//设置debug模式
      state.debug = param;

    },
    setCfData(state, param) {//设置组件配置数据
      state.cfData= param;

    },
    setListFindJson(state, param) {//设置列表的初始筛选参数值
      state.defultFindJson[param.listIndex] = param.findJson;
      //对listState进行整个对象的变更（深拷贝），因为listState是有注册的，可以触发响应
      let str = JSON.stringify(state.defultFindJson)//对象转换成字符串
      state.defultFindJson = JSON.parse(str)//字符串转换成对象
    },

    initListState(state, param) {//改变列表的初始状态值
      state.listState[param.listIndex] = param.objState;
      //对listState进行整个对象的变更（深拷贝），因为listState是有注册的，可以触发响应
      let str = JSON.stringify(state.listState)//对象转换成字符串
      state.listState = JSON.parse(str)//字符串转换成对象
    },
    changeActiveMenu(state, activeMenuIndex) {//改变聚焦菜单
      state.activeMenuIndex = activeMenuIndex
    },
    openDialogAdd(state, listIndex) {//打开新增弹窗事件
      state.listState[listIndex].isShowDialogAdd = true;
    },
    closeDialogAdd(state, listIndex) {//关闭新增弹窗事件
      state.listState[listIndex].isShowDialogAdd = false;
    },
    openDialogDetail(state, param) {//打开详情弹窗事件
      state.listState[param.listIndex].isShowDialogDetail = true;
      // state.listState[param.listIndex].tableDataDetail.forEach(doc => {
      //   //遍历详情弹窗的表格数据
      //   doc.itemValue = param.row[doc.field]; //修改itemValue
      // });
      state.listState[param.listIndex].row = param.row;//将行数据保存到vuex
    },
    closeDialogDetail(state, listIndex) {//关闭详情弹窗事件
      state.listState[listIndex].isShowDialogDetail = false;
    },
  }
})

Vue.prototype.$store = store//让vue实例中可访问$store

window.$store = store;
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

// Vue.use(ElementUI);


import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

// 代码高亮插件
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);
import 'highlight.js/styles/github.css' //样式文件

Vue.directive('highlight',function (el) {
  let highlight = el.querySelectorAll('pre code');
  highlight.forEach((block)=>{
      hljs.highlightBlock(block)
  })
})


import App from './App.vue'


new Vue({
  el: '#app',
  render: h => h(App),
  router,
})

