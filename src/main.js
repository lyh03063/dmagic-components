
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











import form_demo from './page/form_demo.vue'; //导入form_demo
import form_demo2 from './page/form_demo2.vue'; //导入form_demo
import list_demo from './page/list_demo.vue'; //导入list_demo
import list_static_demo from './page/list_static_demo.vue'; //导入list_static_demo
import list_common_demo from './page/list_common_demo.vue'; //导入list_common_demo
import upload_qiniu from './page/upload_qiniu.vue'; //导入upload_qiniu
import test from './page/test.vue'; //导入test
import demo_show from './page/demo_show.vue'; //导入demo_show
import detail_audio from './components/detail/detail_audio.vue'; //导入demo_showsrc\components\detail\detail_audio.vue
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
        { path: '/detail_audio', component: detail_audio },
    ]
})



import Vuex from 'vuex' //导入vuex模块
Vue.use(Vuex) //应用组件






// 代码高亮插件
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);
import 'highlight.js/styles/github.css' //样式文件

Vue.directive('highlight', function(el) {
    let highlight = el.querySelectorAll('pre code');
    highlight.forEach((block) => {
        hljs.highlightBlock(block)
    })
})


import App from './App.vue'


new Vue({
    el: '#app',
    render: h => h(App),
    router,
})