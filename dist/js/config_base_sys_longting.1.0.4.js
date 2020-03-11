"use strict";

//#region 基本配置
window.PUB = window.PUB || {};
//PUB.domain = "http://localhost:3000"
//PUB.domain = 'http://test.dmagic.cn'
PUB.domain = "https://www.dmagic.cn";
PUB.urlUpload = "https://up-z2.qiniup.com"; //七牛云上传地址（域名）
PUB.urlUpload = "https://up-z2.qiniup.com"; //七牛云上传地址（域名）
PUB.urlGetQiniuToken = PUB.domain + "/api_third_part/get_qiniu_token?scope=dmagic";
PUB.systemName = "深圳龙庭后台系统";
PUB.KeySys = "longting";
var _systemId = "sys_" + PUB.KeySys;
PUB._systemId = _systemId;
PUB.keyLoginUser = PUB.KeySys + "_loginUserName";
PUB.keyIsLogin = PUB.KeySys + "_isLogin";
PUB.keyRoleId = PUB.KeySys + "_roleId";
PUB.keyPower = PUB.KeySys + "_power";
PUB.userId = localStorage[PUB.keyLoginUser];

PUB.logoUrl = "";
//#endregion

//#region 菜单列表

PUB.menuList = [{
  //菜单
  index: "listHome",
  route: "/listHome",
  icon: "el-icon-house",
  title: "首页"
}, {
  index: "apiCenter",
  icon: "el-icon-document",
  title: "基础数据",
  menuItem: [{
    index: "list_project_case",
    route: "/list_common?type=project_case",
    title: "工程案例"
  }, {
    index: "list_url",
    route: "/list_common?type=url",
    title: "网址"
  }, {
    index: "list_note",
    route: "/list_common?type=note",
    title: "笔记"
  }]
}, {
  index: "OtherData",
  icon: "el-icon-document",
  title: "其他数据",
  menuItem: [{
    index: "list_group",
    route: "/list_common?type=group",
    title: "分组"
  }]
}, {
  index: "systemManage",
  icon: "el-icon-setting",
  title: "系统管理",
  menuItem: [{
    index: "list_data_type",
    route: "/list_common?type=data_type",
    title: "数据类型"
  }, {
    index: "list_all",
    route: "/list_common?type=all",
    title: "所有数据"
  }, {
    index: "list_admin",
    route: "/list_common?type=admin",
    title: "管理员"
  }, { index: "list_role", route: "/list_role", title: "角色" }]
}];
//#endregion


//#region 路由配置
PUB.arrRouteListName = ["modify_password", "list_article_category", "list_article", "list_admin", "list_role", "list_html_api", "list_css_api", "list_js_api", "list_note", "list_all", "listHome", "list_common"];

//#endregion


//#region 列表模块名数组配置
PUB.arrListName = ["project_case", "goods", "order"];
//#endregion
//#region 分组数据列表页模块引用配置
//变量：{分组数据列表的模块名称数组}-会在js配置文件时用到
PUB.arrDetailGroupMoudles = ["note", "group", "url", "project_case"];
//变量：{特殊的分组数据列表模块名称数组}-需要有单独对应的分组列表模板vue-会在导入vue文件时用到
PUB.arrGroupMoudlesSpe = ["note", "group111"];

//#endregion