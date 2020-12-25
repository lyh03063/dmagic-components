
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


 /****************************组件库的一些页面级组件-START****************************/
 const form_demo = { template: '<form_demo></form_demo>' }
 const form_demo2 = { template: '<form_demo2></form_demo2>' }
 const list_demo = { template: '<list_demo></list_demo>' }
 const list_static_demo = { template: '<list_static_demo></list_static_demo>' }
 const list_common_demo = { template: '<list_common_demo></list_common_demo>' }
 const upload_qiniu = { template: '<upload_qiniu></upload_qiniu>' }
 const test = { template: '<test></test>' }
 const demo_show = { template: '<demo_show></demo_show>' }
 const detail_audio = { template: '<detail_audio></detail_audio>' }
 /****************************组件库的一些页面级组件-END****************************/




const list_common = { template: '<dm_list_common></dm_list_common>' }
const detail_bankruptcy_case = { template: '<dm_detail_bankruptcy_case></dm_detail_bankruptcy_case>' }
const auto_layout = { template: '<dm_auto_layout></dm_auto_layout>' }
const js_file_edit = { template: '<dm_js_file_edit></dm_js_file_edit>' }
const js_code_edit = { template: '<dm_js_code_edit></dm_js_code_edit>' }
const css_code_edit = { template: '<dm_css_code_edit></dm_css_code_edit>' }
const detail_html_api = { template: '<dm_detail_html_api></dm_detail_html_api>' }
const detail_data = { template: '<dm_detail_data></dm_detail_data>' }
const detail_group = { template: '<dm_detail_group></dm_detail_group>' }
const dm_manage = { template: '<dm_manage></dm_manage>' }
const detail_group_g_card = { template: '<detail_group_g_card></detail_group_g_card>' }



const listHome = { template: '<dm_manage_home></dm_manage_home>' }
const modify_password = { template: '<dm_modify_password></dm_modify_password>' }


PUB.arrRouteManage = [
    { path: 'listHome', component: listHome },
    { path: 'list_common', component: list_common, },
    { path: 'detail_group', component: detail_group, },
    { path: 'modify_password', component: modify_password },
    { path: 'detail_data', component: detail_data },
    { path: 'detail_group_g_card', component: detail_group_g_card },
]


const search_result = { template: '<search_result></search_result>' }
const detail_g_card_link = { template: '<detail_g_card_link></detail_g_card_link>' }
const group_home = { template: '<group_home></group_home>' }

const study_home = { template: '<study_home></study_home>' }
const study_user = { template: '<study_user></study_user>' }
const dm_login = { template: '<dm_login></dm_login>' }




PUB._paramAjaxAddon = { _systemId: "sys_api" }

import manage from "./App.vue";
import system from "./system.vue";
// 3. 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
    routes: [
        { path: '/', redirect: '/manage' },
        {
            path: '/system/:sysId/', component: system, props: { ttt: 111 },
            children: [//子路由
                { path: 'login', component: dm_login },
                { path: 'detail_data', component: detail_data },
                { path: 'js_file_edit', component: js_file_edit, },
                { path: 'css_code_edit', component: css_code_edit, },
                {
                    path: 'manage', component: dm_manage, props: { ttt: 2222 },//manage
                    children: [//子路由
                        { path: 'detail_html_api', component: detail_html_api, },
                        ...PUB.arrRouteManage,
                    ]
                },
            ]
        },
        {
            path: '/study_home', component: study_home,
            children: [//子路由
                { path: 'detail_group', component: detail_group },
                { path: 'study_user', component: study_user },
                { path: 'search_result', component: search_result },
                { path: 'detail_group_g_card', component: detail_group_g_card },
                { path: 'detail_g_card_link', component: detail_g_card_link },
                ...PUB.arrRouteManage
            ]
        },
        {
            path: '/group_home/:gid', component: group_home,
            children: [//子路由
                { path: 'detail_group', component: detail_group },
                { path: 'study_user', component: study_user },
                { path: 'search_result', component: search_result },
                { path: 'detail_group_g_card', component: detail_group_g_card },
                { path: 'detail_g_card_link', component: detail_g_card_link },
                ...PUB.arrRouteManage
            ]
        },
        {
            path: '/manage',
            component: manage,
            // redirect: 'manage/form_demo', //跳转
            children: [//子路由
                // { path: '/', redirect: 'form_demo' },
                { path: 'form_demo', component: form_demo },
                { path: 'form_demo2', component: form_demo2 },
                { path: 'list_demo', component: list_demo },
                { path: 'list_static_demo', component: list_static_demo },
                { path: 'list_common_demo', component: list_common_demo },
                { path: 'upload_qiniu', component: upload_qiniu },
                { path: 'test', component: test },
                { path: 'demo_show', component: demo_show },
                { path: 'detail_audio', component: detail_audio },

                { path: 'detail_bankruptcy_case', component: detail_bankruptcy_case },
                { path: 'detail_html_api', component: detail_html_api },
                ...PUB.arrRouteManage,
            ]
        },
        { path: '/detail_group', component: detail_group, },
        { path: '/detail_data', component: detail_data },
        { path: '/open/auto_layout', component: auto_layout },
        { path: '/js_file_edit', component: js_file_edit },
        { path: '/js_code_edit', component: js_code_edit },
        { path: '/css_code_edit', component: css_code_edit },
        { path: '/group_home', component: group_home },
    ]
})



import Vuex from 'vuex' //导入vuex模块
Vue.use(Vuex) //应用组件


router.beforeEach((to, from, next) => {
    let systemId = to.params.sysId || from.params.sysId || PUB._systemId;//***获取地址上的_systemId
    let $sys = util.getLocalStorageObj(systemId); //调用：{从LocalStorage获取一个对象的函数}
    PUB.keyPower = `${systemId}_power`;
    window.rolePower = util.getLocalStorageObj(PUB.keyPower);
    // 如果用户未登录，跳转登录页面
    if ($sys.isLogin != 1) {//Q1：未登录
        if (to.path.includes('/site/') || to.path.includes('/site_m/') || to.path.includes('/open/')|| to.path.includes('/detail_data')) {//QK1：to路径中包含/site/表示网站首页
            next();
        } else if (to.path.includes('login')) {//QK2：to路径中包含login
            next();
        } else {//QK3：to路径中包含login
            PUB.goUrlAfterLogin = to.fullPath//变量赋值：{登录后要跳转的地址}
            next(`/system/${systemId}/login`);
        }
    } else {//Q2：已登录
        PUB.goUrlAfterLogin = null//变量赋值：{登录后要跳转的地址}
        next();
    }
})







import main from './main.vue'


new Vue({
    el: '#app',
    render: h => h(main),
    router,
})