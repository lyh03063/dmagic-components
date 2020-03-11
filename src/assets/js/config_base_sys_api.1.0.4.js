//#region 基本配置
window.PUB = window.PUB|| {}
//PUB.domain = "http://localhost:3000"
//PUB.domain = 'http://test.dmagic.cn'
PUB.domain = "https://www.dmagic.cn"
PUB.urlUpload = `https://up-z2.qiniup.com`//七牛云上传地址（域名）
PUB.urlGetQiniuToken = `${PUB.domain}/api_third_part/get_qiniu_token?scope=dmagic`
PUB.systemName = "前端学习系统";
PUB.KeySys = "api";
let _systemId = `sys_${PUB.KeySys}`;
PUB._systemId = _systemId;




PUB.keyPower = `${PUB.KeySys}_power`;


PUB.$sys=PUB.$sys||util.getLocalStorageObj(PUB._systemId)||{}; //调用：{从LocalStorage获取一个对象的函数}


PUB.logoUrl = "http://www.dmagic.cn/images/IconS/IconS_2578.png";
//#endregion


//#region 菜单列表
//完整的菜单列表
PUB.menuList = [
  {
    //菜单
    index: "listHome",
    route: "/listHome",
    icon: "el-icon-house",
    title: "首页"
  },
  {
    index: "apiCenter",
    icon: "el-icon-document",
    title: "API手册",
    menuItem: [
      {
        index: "list_html_api",
        route: "/list_html_api",
        title: "Html-API"
      },
      {
        index: "list_css_api",
        route: "/list_css_api",
        title: "Css-API"
      },
      {
        index: "list_js_api",
        route: "/list_js_api",
        title: "Javascript-API"
      },
      {
        index: "list_note",
        route: "/list_note",
        title: "笔记"
      },
      {
        index: "list_front_demo",
        route: "/list_common?type=front_demo",
        title: "前端demo"
      },
      {
        index: "list_vedio",
        route: "/list_common?type=vedio",
        title: "视频"
      },
      {
        index: "list_exercises",
        route: "/list_common?type=exercises",
        title: "习题"
      },
      {
        index: "list_url",
        route: "/list_common?type=url",
        title: "网址"
      }
    ]
  },
  {
    index: "newsCenter",
    icon: "el-icon-document",
    title: "其他数据",
    menuItem: [
      {
        index: "list_group",
        route: "/list_common?type=group",
        title: "分组"
      },
      {
        index: "list_html_api_category",
        route: "/list_common?type=html_api_category",
        title: "Html-API分类"
      },
      {
        index: "list_css_api_category",
        route: "/list_common?type=css_api_category",
        title: "Css-API分类"
      },
      {
        index: "list_js_api_category",
        route: "/list_common?type=js_api_category",
        title: "Javascript-API分类"
      },
      {
        index: "list_note_category",
        route: "/list_common?type=note_category",
        title: "笔记分类"
      }
    ]
  },
  {
    index: "systemManage",
    icon: "el-icon-setting",
    title: "系统管理",
    menuItem: [
      {
        index: "list_data_type",
        route: "/list_common?type=data_type",
        title: "数据类型"
      },
      {
        index: "list_all",
        route: "/list_common?type=all",
        title: "所有数据"
      },
      {
        index: "list_relation",
        route: "/list_common?type=relation",
        title: "关系数据"
      },
      {
        index: "list_familiarity",
        route: "/list_common?type=familiarity",
        title: "熟悉度"
      },
      {
        index: "list_admin",
        route: "/list_common?type=admin",
        title: "管理员"
      },
      { index: "list_role", route: "/list_role", title: "角色" }
    ]
  }
];
//#endregion

//#region 路由配置
PUB.arrRouteListName = [
  "modify_password",
  "list_article_category",
  "list_article",
  "list_admin",
  "list_role",
  "list_html_api",
  "list_css_api",
  "list_js_api",
  "list_note",
  "list_all",
  "listHome",
  "list_common",//通用列表
]


//#region 列表模块名数组配置
PUB.arrListName = [
  "html_api", "html_api_category", "css_api", "css_api_category", "js_api", "js_api_category",
  "familiarity", 
  "exercises", "front_demo",
]
//#endregion
//#region 分组数据列表页模块引用配置
//变量：{分组数据列表的模块名称数组}-会在导入js配置文件时用到
PUB.arrDetailGroupMoudles = [
  "note", "group", "url", "vedio"
]

//#endregion  

//变量：{特殊的分组数据列表模块名称数组}-需要有单独对应的分组列表模板vue-会在导入vue文件时用到
PUB.arrGroupMoudlesSpe = [
  "note", "group"
]

