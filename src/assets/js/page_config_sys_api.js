
    

{
  let prop = "dataBuilt", objBase = { label: "源数据", prop, }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = { ...objBase, width: 110 };
  F_ITEMS[prop] = { ...objBase ,type:"jsonEditor"};
}
          
{
  let prop = "data_form", objBase = { label: "数据表单", prop, }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = { ...objBase, width: 110 };
  F_ITEMS[prop] = { ...objBase };
}
          
{
  let prop = "path_temp", objBase = { label: "模板路径", prop, }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = { ...objBase, width: 110 };
  F_ITEMS[prop] = { ...objBase };
}
          
{
  let prop = "fileNum", objBase = { label: "文件编号", prop, }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = { ...objBase, width: 110 };
  F_ITEMS[prop] = { ...objBase };
}
          
{
  let prop = "useDesc", objBase = { label: "用途", prop, }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = { ...objBase, width: 115 };
  F_ITEMS[prop] = { ...objBase };
}
          
{
  let prop = "useDate", objBase = { label: "使用日期", prop, }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = {
      ...objBase, width: 100,
     "formatter": function (row) {
        let date=row.useDate
        if(!date)return;
          return moment(date).format("YYYY-MM-DD");
      }
     
  };
  F_ITEMS[prop] = { ...objBase, "type": "date" };
}
          
{
  let prop = "applicant", objBase = { label: "申请人", prop, }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = { ...objBase, width: 65 };
  F_ITEMS[prop] = { ...objBase };
}
          
{
  let prop = "undertaker", objBase = { label: "承办人", prop, }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = { ...objBase, width: 65 };
  F_ITEMS[prop] = { ...objBase };
}
          
{
  let prop = "approver", objBase = { label: "审批人", prop, }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = { ...objBase, width: 65 };
  F_ITEMS[prop] = { ...objBase };
}
          
{
  let prop = "caseId", objBase = { label: "案号", prop, }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = { ...objBase, width: 250 };
  F_ITEMS[prop] = { ...objBase };
}
          
{
  let prop = "judgesAndAssistants", objBase = { label: "承办法官/助理", prop, }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = { ...objBase, width: 110 };
  F_ITEMS[prop] = { ...objBase };
}
          
{
  let prop = "caseParty", objBase = { label: "当事人", prop, }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = { ...objBase, width: 260 };
  F_ITEMS[prop] = { ...objBase,"type": "textarea" };
}
          
{
  let prop = "dateFiling", objBase = { label: "立案时间", prop, }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = {
      ...objBase, width: 100,
      "formatter": function (row) {
        let date=row.dateFiling
        if(!date)return;
          return moment(date).format("YYYY-MM-DD");
      }
  };
  F_ITEMS[prop] = { ...objBase, "type": "date" };
}
          
{
  let prop = "dateClosing", objBase = { label: "结案时间", prop, }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = {
      ...objBase, width: 100,
    "formatter": function (row) {
        let date=row.dateClosing
        if(!date)return;
          return moment(date).format("YYYY-MM-DD");
      }
  };
  F_ITEMS[prop] = { ...objBase, "type": "date" };
}
          
{
  let prop = "caseStatus", objBase = { label: "案件状态", prop, }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = {
      ...objBase, width: 120, "formatter": function (rowData) {
          return lodash.get(DYDICT.caseStatus, rowData.caseStatus + ".label");
      }
  };
  F_ITEMS[prop] = { ...objBase, "type": "select", "options": DYDICT.caseStatus };

}
          
{
  let prop = "caseCourt", objBase = { label: "法院", prop, }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = { ...objBase, width: 100 };
  F_ITEMS[prop] = { ...objBase };
}
          
{
let prop = "g_bankruptcy_file_2", objBase = { label: "三书及工作制度数量", prop, }
D_ITEMS[prop] = { ...objBase, };
COLUMNS[prop] = { ...objBase, width: 70,component:"com_c_g_bankruptcy_file_2",
                 requireProp: ["count_bankruptcy_file_2"], //依赖
                };
F_ITEMS[prop] = { ...objBase };
}
          
{
let prop = "g_bankruptcy_file_1", objBase = { label: "三书及工作制度", prop, }
D_ITEMS[prop] = { ...objBase, };
COLUMNS[prop] = { ...objBase, width: 70,component:"com_c_g_bankruptcy_file_2",
                 requireProp: ["count_bankruptcy_file_2"], //依赖
                };
F_ITEMS[prop] = { ...objBase };
}
          
{
  let prop = "count_bankruptcy_file_1", objBase = { label: "管理人文件数", prop, }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = { ...objBase, width: 70 };
  F_ITEMS[prop] = { ...objBase, type: "number" };
}
          
{
let prop = "g_bankruptcy_file_1", objBase = { label: "管理人资料", prop, }
D_ITEMS[prop] = { ...objBase, };
COLUMNS[prop] = { ...objBase, width: 70,component:"com_c_g_bankruptcy_file_1",
                 requireProp: ["count_bankruptcy_file_1"], //依赖
                };
F_ITEMS[prop] = { ...objBase };
}
          
COLUMNS.operate_g_file = { "prop": "operate_g_file", "label": "操作", "component": "dm_c_operate_g_file", "min-width": 300 };
          
{
  let prop = "fileBuiltUrl", objBase = { label: "文件地址", prop, }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = { ...objBase, width: 110 };
  F_ITEMS[prop] = { ...objBase };
}
          
          
COLUMNS.drag =  {
    label: "拖拽",
    columnKey: "drag",
    component:"dm_btn_drag",
    width:40,
  },

          
COLUMNS.complete_com_g = Object.assign({}, COLUMNS.complete_com, {
  "edit": true,
  cfEdit: {
      idKey: "_idRel2",//数据Id键名
      listIndex: "list_task",
      formItems: [F_ITEMS.complete],//指定表单字段
      paramAddon: {
          _systemId: "sys_api",
          _dataType: "task"
      },
      fnAfterModify: function ({ docOld, docNew }) {//修改后处理回调函数
          docOld.complete = docNew.complete
      }
  }
})

          

{
let prop = "count_company_album", objBase = { label: "相册数", prop, }
D_ITEMS[prop] = { ...objBase, };
COLUMNS[prop] = { ...objBase, width: 70 };
F_ITEMS[prop] = { ...objBase, type: "number" };
}
          
{
  let prop = "g_company_album", objBase = { label: "相册", prop, }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = { ...objBase, width: 70,component:"com_c_g_company_album",
                   requireProp: ["count_company_album"], //依赖
                  };
  F_ITEMS[prop] = { ...objBase };
  }
          
{
let prop = "count_company_image", objBase = { label: "图片数", prop, }
D_ITEMS[prop] = { ...objBase, };
COLUMNS[prop] = { ...objBase, width: 70 };
F_ITEMS[prop] = { ...objBase, type: "number" };
}
          
{
  let prop = "g_company_image", objBase = { label: "关联图片", prop, }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = { ...objBase, width: 70,component:"com_c_g_company_image",
                   requireProp: ["count_company_image"], //依赖
                  };
  F_ITEMS[prop] = { ...objBase };
  }
          
{
let prop = "count_company_file", objBase = { label: "文件数", prop, }
D_ITEMS[prop] = { ...objBase, };
COLUMNS[prop] = { ...objBase, width: 70 };
F_ITEMS[prop] = { ...objBase, type: "number" };
}
          
{
let prop = "g_company_file", objBase = { label: "关联文件", prop, }
D_ITEMS[prop] = { ...objBase, };
COLUMNS[prop] = { ...objBase, width: 70,component:"com_c_g_company_file",
               requireProp: ["count_company_file"], //依赖
              };
F_ITEMS[prop] = { ...objBase };
}
          
{
let prop = "count_company_person", objBase = { label: "人员数", prop, }
D_ITEMS[prop] = { ...objBase, };
COLUMNS[prop] = { ...objBase, width: 70 };
F_ITEMS[prop] = { ...objBase, type: "number" };
}
          
{
let prop = "g_company_person", objBase = { label: "关联人员", prop, }
D_ITEMS[prop] = { ...objBase, };
COLUMNS[prop] = { ...objBase, width: 70,component:"com_c_g_company_person",
               requireProp: ["count_company_person"], //依赖
              };
F_ITEMS[prop] = { ...objBase };
}
          
{
let prop = "count_company_url", objBase = { label: "网址数", prop, }
D_ITEMS[prop] = { ...objBase, };
COLUMNS[prop] = { ...objBase, width: 70 };
F_ITEMS[prop] = { ...objBase, type: "number" };
}
          
{
let prop = "g_company_url", objBase = { label: "关联网址", prop, }
D_ITEMS[prop] = { ...objBase, };
COLUMNS[prop] = { ...objBase, width: 70,component:"com_c_g_company_url",
               requireProp: ["count_company_url"], //依赖countSonTask
              };
F_ITEMS[prop] = { ...objBase };
}
          
          

{
  let prop = "count_person_album", objBase = { label: "相册数", prop, }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = { ...objBase, width: 70 };
  F_ITEMS[prop] = { ...objBase, type: "number" };
}
          
{
let prop = "g_person_album", objBase = { label: "关联相册", prop, }
D_ITEMS[prop] = { ...objBase, };
COLUMNS[prop] = { ...objBase, width: 70,component:"com_c_g_person_album",
                 requireProp: ["count_person_album"], //依赖
                };
F_ITEMS[prop] = { ...objBase };
}
          
{
  let prop = "count_person_image", objBase = { label: "图片数", prop, }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = { ...objBase, width: 70 };
  F_ITEMS[prop] = { ...objBase, type: "number" };
}
          
{
let prop = "g_person_image", objBase = { label: "关联图片", prop, }
D_ITEMS[prop] = { ...objBase, };
COLUMNS[prop] = { ...objBase, width: 70,component:"com_c_g_person_image",
                 requireProp: ["count_person_image"], //依赖
                };
F_ITEMS[prop] = { ...objBase };
}
          
{
let prop = "g_person_url", objBase = { label: "关联网址", prop, }
D_ITEMS[prop] = { ...objBase, };
COLUMNS[prop] = { ...objBase, width: 70,component:"com_c_g_person_url",
               requireProp: ["count_person_url"], //依赖countSonTask
              };
F_ITEMS[prop] = { ...objBase };
}
          
{
let prop = "count_person_url", objBase = { label: "网址数", prop, }
D_ITEMS[prop] = { ...objBase, };
COLUMNS[prop] = { ...objBase, width: 70 };
F_ITEMS[prop] = { ...objBase, type: "number" };
}
          
{
let prop = "g_person_file", objBase = { label: "关联文件", prop, }
D_ITEMS[prop] = { ...objBase, };
COLUMNS[prop] = { ...objBase, width: 70,component:"com_c_g_person_file",
                 requireProp: ["count_person_file"], //依赖
                };
F_ITEMS[prop] = { ...objBase };
}
          
{
  let prop = "count_person_file", objBase = { label: "文件数", prop, }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = { ...objBase, width: 70 };
  F_ITEMS[prop] = { ...objBase, type: "number" };
}
          
          
{
  let prop = "count_album_image", objBase = { label: "图片数", prop, }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = { ...objBase, width: 70 };
  F_ITEMS[prop] = { ...objBase, type: "number" };
}
          
{
let prop = "g_album_image", objBase = { label: "图片", prop, }
D_ITEMS[prop] = { ...objBase, };
COLUMNS[prop] = { ...objBase, width: 70,component:"com_c_g_album_image",
                 requireProp: ["count_album_image"], //依赖
                };
F_ITEMS[prop] = { ...objBase };
}
          
{
  let prop = "countSonNote", objBase = { label: "子笔记数", prop, }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = { ...objBase, width: 70 };
  F_ITEMS[prop] = { ...objBase, type: "number" };
}
          
{
  let prop = "sonNoteGId", objBase = { label: "子笔记", prop, }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = { ...objBase, width: 70,component:"com_c_sonNoteGId",
                   requireProp: ["countSonNote"], //依赖countSonTask
                  };
  F_ITEMS[prop] = { ...objBase };
}
          
{
  let prop = "countSonTask", objBase = { label: "子任务数", prop, }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = { ...objBase, width: 70,component:"com_c_countSonTask" };
  F_ITEMS[prop] = { ...objBase, type: "number" };
}
          
{
  let prop = "sonTaskGId", objBase = { label: "子任务", prop, }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = { ...objBase, width: 70,component:"com_c_sonTaskGId",
                   requireProp: ["countSonTask"], //依赖countSonTask
                  };
  F_ITEMS[prop] = { ...objBase };
}
          
              
  
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
PUB.listCF = {};
PUB.$projectAddon = PUB.$projectAddon || {}//分组数据列表页需要补充的拆解字段，用于聚合查询
PUB.$sys = PUB.$sys || util.getLocalStorageObj(PUB._systemId) || {}; //调用：{从LocalStorage获取一个对象的函数}
          
//#region 公共字典对象配置
PUB.objDictArr = {
  taskType: [
      { value: 1, label: "新需求" },
      { value: 2, label: "bug" },
      { value: 3, label: "其他" }
  ],
  difficulty: [
      { value: 1, label: "简单" },
      { value: 2, label: "一般" },
      { value: 3, label: "困难" },
      { value: 4, label: "很难" }
  ],
  prior: [
      { value: 1, label: "很高" },
      { value: 2, label: "高" },
      { value: 3, label: "中" },
      { value: 4, label: "低" }
  ],
  complete: [
      { value: 0, label: "0%" },
      { value: 0.1, label: "10%" },
      { value: 0.2, label: "20%" },
      { value: 0.3, label: "30%" },
      { value: 0.4, label: "40%" },
      { value: 0.5, label: "50%" },
      { value: 0.6, label: "60%" },
      { value: 0.7, label: "70%" },
      { value: 0.8, label: "80%" },
      { value: 0.9, label: "90%" },
      { value: 1, label: "100%" },
  ],
  complete2: [
      { value: 1, label: "未开始" },//complete==0
      { value: 2, label: "进行中" },//complete>0&&complete>1
      { value: 3, label: "已完成" },//complete>0&&complete>1
  ],
}
//{"P7": Im,"P5":{ $gte: DataStart,$lte: DataEnd } }
PUB.dict = {};//公共数据字典对象，里面会有多个子数据字典对象
//for of循环遍历对象，for of不能直接处理对象，本质上是同个Object.keys拼装一个新数组进行辅助
for (var key of Object.keys(PUB.objDictArr)) {
  PUB.dict[key] = {}
  let arrOpt = PUB.objDictArr[key];
  arrOpt.forEach(itemEach => {//循环：{000数组}
      PUB.dict[key][itemEach.value] = itemEach
  })
}


//#endregion
          
//函数：{获取数据字典值函数}-dictName字典名，value值
PUB.formatterDict = function (dictName, value) {
  return lodash.get(PUB.dict, `${dictName}.${value}.label`);
}
          
PUB.listUrl = {
  list: `/info/getCommonList`, //列表接口
  add: "/info/commonAdd", //新增接口
  modify: "/info/commonModify", //修改接口
  detail: "/info/commonDetail",
  delete: "/info/commonDelete" //删除接口
}
          
PUB.listCFCommon = {
  url: PUB.listUrl,
  columnOperate: { "min-width": 160 },
  //列表单项操作按钮的配置
  singleBtns: {
      addon: [
          util.cfList.sBtns.detail,
          util.cfList.sBtns.modify,
          util.cfList.sBtns.delete,
      ]
  },

}
          
PUB.sBtnDetail = {
  uiType: "link",
  text: "详情",
  target: "_blank",
  //地址格式函数
  urlFormatter: function (row) {
      return `#/detail_data?dataId=${row._id}`;
  }
}
          
PUB.singleBtns_copy_detail = {
  addon: [
      ...util.cfList.sBtns.arrAllBtns,
      PUB.sBtnDetail,
  ]
}
          
PUB.singleBtns_copy_detail_sort = {
  addon: [
      ...util.cfList.sBtns.arrAllBtns,
      ...util.cfList.sBtns.arrSortBtns,
      util.cfList.sBtns.detailEntity,
  ]
}

          
PUB.listCFCommon2 = {
  url: PUB.listUrl,
  columnOperate: { "min-width": 230 },
  //列表单项操作按钮的配置
  singleBtns: PUB.singleBtns_copy_detail,
  //objParamAddon列表接口的附加参数

}
          
PUB.singleBtns_copy_link = {
  addon: [
      ...util.cfList.sBtns.arrAllBtns,

      util.cfList.sBtns.link,
  ]
}

          
PUB.singleBtns_copy_link_sort = {
  addon: [
      ...util.cfList.sBtns.arrAllBtns,
      ...util.cfList.sBtns.arrSortBtns,
      util.cfList.sBtns.link,
  ]
}
          
PUB.listCFCommon3 = {
  url: PUB.listUrl,
  columnOperate: { "min-width": 230 },
  //列表单项操作按钮的配置
  singleBtns: PUB.singleBtns_copy_link,
  //objParamAddon列表接口的附加参数

}

          
PUB.singleBtns4 = {
  addon: [
      ...util.cfList.sBtns.arrAllBtns,
      PUB.sBtnDetail,
      util.cfList.sBtns.link,
  ]
}
          
//第四套-有详情和链接按钮
PUB.listCFCommon4 = {
  url: PUB.listUrl,
  columnOperate: { "min-width": 290 },
  //列表单项操作按钮的配置
  singleBtns: PUB.singleBtns4,

}

          
PUB.singleBtns5 = {
  addon: [
      ...util.cfList.sBtns.arrAllBtns,
  ]
}
          
//第5套-
PUB.listCFCommon5 = {
  url: PUB.listUrl,
  columnOperate: { "min-width": 160 },
  //列表单项操作按钮的配置
  singleBtns: PUB.singleBtns5,

}
          
//变量：{分组数据列表的单项操作按钮配置}
PUB.singleBtns_list_group_data = {
  addon: [
      util.cfList.sBtns.detail,
      util.cfList.sBtns.modify,
      util.cfList.sBtns.copyEntity,
      util.cfList.sBtns.delete,
      ...util.cfList.sBtns.arrSortBtns,
      util.cfList.sBtns.detailEntity,
  ]
}
          
PUB.cfListGPublic = {

  isShowBreadcrumb: false, //面包屑
  isShowSearchForm: false, //查询表单-
  dragSort:true,//允许拖拽排序****
  idKey: "_id", //键名
  pageSize: 20,
  focusMenu: false, //进行菜单聚焦
  ...PUB.listCFCommon3, //展开公共配置
  singleBtns: PUB.singleBtns_list_group_data,
  batchBtns: {
      addon: [
          { uiType: "slot", slot: "slot_btn_select" },
          util.cfList.bBtns.addEntity,
          util.cfList.bBtns.add,
          util.cfList.bBtns.transGroup,
          util.cfList.bBtns.refresh,
          util.cfList.bBtns.delete,
      ],
  },
  sortJsonDefault: { "sort": -1 },
  findJsonDefault: {},

}
          

PUB.arrRouteListName = [
"modify_password",
"listHome",
"list_common",//通用列表
]
          
PUB.arrGroupMoudlesSpe = [
// "group"
]
          
//完整的菜单列表
PUB.menuList = [
{
  //菜单
  index: "listHome",
  route: "listHome",
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
      // route: "list_html_api",
      route: "list_common?type=html_api",
      title: "Html-API"
    },
    {
      index: "list_css_api",
      // route: "list_css_api",
      route: "list_common?type=css_api",
      title: "Css-API"
    },
    {
      index: "list_js_api",
      // route: "list_js_api",
      route: "list_common?type=js_api",
      title: "Javascript-API"
    },
    {
      index: "list_note",
      // route: "list_note",
      route: "list_common?type=note",
      title: "笔记"
    },
    {
      index: "list_front_demo",
      route: "list_common?type=front_demo",
      title: "前端demo"
    },
    {
      index: "list_vedio",
      route: "list_common?type=vedio",
      title: "视频"
    },
    {
      index: "list_exercises",
      route: "list_common?type=exercises",
      title: "习题"
    },
    {
      index: "list_url",
      route: "list_common?type=url",
      title: "网址"
    }
  ]
},
{
  index: "otherData",
  icon: "el-icon-document",
  title: "其他数据",
  menuItem: [
    {
      index: "list_group",
      route: "list_common?type=group",
      title: "分组"
    },
    {
      index: "list_file",
      route: "list_common?type=file",
      title: "文件"
    },
    {
      index: "list_image",
      route: "list_common?type=image",
      title: "图片"
    },
    {
      index: "list_album",
      route: "list_common?type=album",
      title: "相册"
    },
    {
      index: "list_file_base",
      route: "list_common?type=file_base",
      title: "基础文件信息"
    },
    {
      index: "list_score",
      route: "list_common?type=score",
      title: "记分项"
    },
    {
      index: "list_html_api_category",
      route: "list_common?type=html_api_category",
      title: "Html-API分类"
    },
    {
      index: "list_css_api_category",
      route: "list_common?type=css_api_category",
      title: "Css-API分类"
    },
    {
      index: "list_js_api_category",
      route: "list_common?type=js_api_category",
      title: "Javascript-API分类"
    },
    {
      index: "list_note_category",
      route: "list_common?type=note_category",
      title: "笔记分类"
    }
  ]
},
{
  index: "crm",
  icon: "el-icon-document",
  title: "客户管理",
  menuItem: [
    {
      index: "list_person",
      route: "list_common?type=person",
      title: "人员"
    },
    {
      index: "list_company",
      route: "list_common?type=company",
      title: "企业"
    },
  ]
},
{
  index: "projectManage",
  icon: "el-icon-document",
  title: "任务系统",
  menuItem: [
    {
      index: "list_task",
      route: "list_common?type=task",
      title: "任务"
    }
  ]
},
{
  index: "resumeSystem",
  icon: "el-icon-document",
  title: "简历系统",
  menuItem: [
    {
      index: "list_resume",
      route: "list_common?type=resume",
      title: "简历"
    },
    {
      index: "list_resume_project_experience",
      route: "list_common?type=resume_project_experience",
      title: "简历-项目经历"
    },
    {
      index: "list_resume_work_experience",
      route: "list_common?type=resume_work_experience",
      title: "简历-工作经历"
    },
    {
      index: "list_resume_education_experience",
      route: "list_common?type=resume_education_experience",
      title: "简历-教育经历"
    }
  ]
},
{
  index: "systemManage",
  icon: "el-icon-setting",
  title: "系统管理",
  menuItem: [
    {
      index: "list_system",
      route: "list_common?type=system",
      title: "系统表"
    },
    {
      index: "list_data_type",
      route: "list_common?type=data_type",
      title: "数据类型"
    },
    {
      index: "list_all",
      route: "list_common?type=all",
      title: "所有数据"
    },
    {
      index: "list_relation",
      route: "list_common?type=relation",
      title: "关系数据"
    },
    {
      index: "list_familiarity",
      route: "list_common?type=familiarity",
      title: "熟悉度"
    },
    {
      index: "list_admin",
      route: "list_common?type=admin",
      title: "管理员"
    },
    {
      index: "list_role",
      route: "list_common?type=role",
      title: "角色"
    },
    {
      index: "list_data_item",
      route: "list_common?type=data_item",
      title: "数据字段配置"
    },
    {
      index: "list_js_file",
      route: "list_common?type=js_file",
      title: "js文件"
    },
    {
      index: "list_js_code",
      route: "list_common?type=js_code",
      title: "js代码块"
    }
  ]
}
];
          
          
PUB.dataSite = PUB.dataSite || {};
PUB.dataSite.sys_chunqiu = {
cfBanner: {
  cfElCarousel: {
    height: "450px",
    interval: 5000,
  },
  list: [
    {
      title: 'banner2',
      link: 'javascript:;',
      imgSrc: 'http://qn-dmagic.dmagic.cn/chunqiu/banner_big_9.jpg',
    },
    {
      title: 'banner2',
      link: 'javascript:;',
      imgSrc: 'http://qn-dmagic.dmagic.cn/chunqiu/banner_big_7.jpg',
      // imgSrc: 'http://qn-dmagic.dmagic.cn/chunqiu/banner_big_6.jpg',
      // imgSrc: 'http://qn-dmagic.dmagic.cn/chunqiu/banner_big_5.jpg',
      // imgSrc: 'http://qn-dmagic.dmagic.cn/chunqiu/banner_big_2.jpg',
      // imgSrc: 'http://qn-dmagic.dmagic.cn/chunqiu/banner_1200_1.jpg',
    },
    {
      title: 'banner2',
      link: 'javascript:;',
      imgSrc: 'http://qn-dmagic.dmagic.cn/chunqiu/banner_big_4.jpg',
    },


  ],
},

cfPageMenu: {
  cfElMenu: {
    "background-color": "#0091e0",
    "text-color": "#fff",
    "active-text-color": "#ffd04b"
  },
  listMenu: [
    { name: "首页", url: "/" },
    {
      name: "课程体系",
      url: "/productList",
      sonMenu: [
        { name: "专业设置", url: "javascript:;" },
        { name: "培训项目", url: "javascript:;" },

      ]
    },
    {
      name: "创业就业", url: "javascript:;",
      sonMenu: [
        { name: "教学成果", url: "javascript:;" },
        { name: "学员风采", url: "javascript:;" },
        { name: "就业指导", url: "javascript:;" },
      ]
    },


    {
      name: "新闻中心",
      url: "javascript:;",
      sonMenu: [
        { name: "学校动态", url: "javascript:;" },
        { name: "媒体报道", url: "javascript:;" },
        { name: "行业新闻", url: "javascript:;" }
      ]
    },
    {
      name: "关于星孵化",
      url: "javascript:;",
      sonMenu: [
        { name: "学校简介", url: "javascript:;" },
        { name: "发展历程", url: "javascript:;" },
        { name: "核心技术", url: "javascript:;" },
        { name: "教学实景", url: "javascript:;" },
        { name: "师资保障", url: "javascript:;" },
      ]
    },
    {
      name: "学员风采",
      url: "javascript:;",
      sonMenu: [
        { name: "xxx", url: "javascript:;" },
        { name: "xxx1", url: "javascript:;" },
        { name: "xxx2", url: "javascript:;" },

      ]
    },
    {
      name: "案例剖析",
      url: "javascript:;",
      sonMenu: [
        { name: "xxx", url: "javascript:;" },
        { name: "xxx1", url: "javascript:;" },
        { name: "xxx2", url: "javascript:;" },

      ]
    }
  ]

},
cfPageHead: {
  siteName: "春秋教育-烹饪培训",
  cfLogo: {
    title: "星孵化烹饪学校",
    src: "http://qn-dmagic.dmagic.cn/202004231128385151_20083_logo_chunqiu_simple.png",
    width: "86px",
    height: "86px",
    styleText: {
      "font-size": "34px",
      "margin-top": "32px",
      "margin-left": "10px",
      "color": "#333",
    },
    styleBox: {

      "margin-top": "0",
      "height": "86px",
    }
  },
},

cfStudentWork: {
  title: "学生作品",
  list: [
    {
      title: "学生作品1",
      imgSrc: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
    },

    {
      title: "学生作品2",
      imgSrc: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
    },

    {
      title: "学生作品3",
      imgSrc: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
    },

    {
      title: "学生作品4",
      imgSrc: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
    },

  ]
},

cfCourse: {
  title: "课程体系",
  list: [
    {
      title: "粤菜",
      imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course1.png",
      priceSell: 1900,
      priceMarket: 2400,
    },

    {
      title: "火锅",
      imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course2.png",
      priceSell: 1300,
      priceMarket: 2200,
    },

    {
      title: "西餐",
      imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course3.png",
      priceSell: 2900,
      priceMarket: 3400,
    },

    {
      title: "粥粉面",
      imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course4.png",
      priceSell: 1400,
      priceMarket: 2400,
    },
    {
      title: "粤菜",
      imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course1.png",
      priceSell: 1900,
      priceMarket: 2400,
    },

    {
      title: "火锅",
      imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course2.png",
      priceSell: 1300,
      priceMarket: 2200,
    },

    {
      title: "西餐",
      imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course3.png",
      priceSell: 2900,
      priceMarket: 3400,
    },

    {
      title: "粥粉面",
      imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course4.png",
      priceSell: 1400,
      priceMarket: 2400,
    },
  ]
},
cfTeacher: {
  title: "师资力量",
  list: [
    {
      title: "张老师",
      desc: "粤菜料理专家级导师",
      imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/cook1.png"
    },

    {
      title: "李老师",
      desc: "粥粉面专家老师",
      imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/cook2.png"
    },

    {
      title: "黄老师",
      desc: "粥粉面专家老师",
      imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/cook3.png"
    },

    {
      title: "罗老师",
      desc: "粥粉面专家老师",
      imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/cook4.png"
    },

  ]
},
cfSchoolNews: {
  title: "学校新闻",
  // linkMore: "###",
  list: [
    {
      title: "学校动态文章标题1",
      date: "2020-11-22",
    },

    {
      title: "学校动态文章标题2",
      date: "2020-4-22",
    },

    {
      title: "学校动态文章标题3",
      date: "2020-4-22",
    },

    {
      title: "学校动态文章标题4",
      date: "2020-4-22",
    },
    {
      title: "学校动态文章标题4",
      date: "2020-4-22",
    },
    {
      title: "学校动态文章标题4",
      date: "2020-4-22",
    },
    {
      title: "学校动态文章标题4",
      date: "2020-4-22",
    },
    {
      title: "学校动态文章标题4",
      date: "2020-4-22",
    },

  ]
},
cfNews2: {
  title: "行业资讯",
  linkMore: "######",
  list: [
    {
      title: "行业资讯文章标题1",
      date: "2020-11-22",
    },

    {
      title: "行业资讯文章标题2",
      date: "2020-11-22",
    },



  ]
},
cfNewsCenter: {
  title: "新闻中心",
  linkMore: "######",




},
cfSchoolIntro: {
  title: "学校简介",
  linkMore: "######",
  imgSchool: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=405534800,3305762250&fm=26&gp=0.jpg",
  cotent: `江门市春秋教育科技有限公司，成立于2012年，是集学历合作办学、职业行业培训、线上学习平台研发运营、教育装备整合研发的教育科技公司。目前与江门开放大学（原江门市广播电视大学）开展合作办学，为学生提供便利、先进和优质的学习平台和支持服务。
  <br>

  春秋教育本着“发展科技、培养人才、传承文化、服务社会”的宗旨，以解放思想，实事求是，大胆革新为办学理念，依靠品德高尚、专业技术过硬，不断开拓进取的师资团队，建立和发展优秀的教育培训综合服务平台，服务学校，服务学生，服务企业。目前在读学生近4000人，合作办学学校两间，战略合作行业企业两家。<br>
  作为协调各部门运作基础业务部门，教务部是主管教育培训平台的教学工作和实施教学管理与服务的行政职能部门，主要负责学员档案、教学计划、教学质量、考试安排以及教学发展等方面的教学运行与管理工作。
  
  `

},
cfStrength: {
  title: "实力保证",
  linkMore: "######",
  imgSrc: "http://qn-dmagic.dmagic.cn/202004231052135959_57032_1.png"


},

cf_page_list_course: {
  focusMenu: "粤菜",
  breadcrumb: [{ value: "首页", path: "home" }, { value: "课程体系" }, { value: "粤菜" }],
  cfListMain: {
    title: "粤菜体系",
    list: [
      {
        title: "粤菜1",
        imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course1.png",
        priceSell: 1900,
        priceMarket: 2400,
      },

      {
        title: "粤菜2",
        imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course2.png",
        priceSell: 1300,
        priceMarket: 2200,
      },

      {
        title: "粤菜3",
        imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course3.png",
        priceSell: 2900,
        priceMarket: 3400,
      },

      {
        title: "粤菜4",
        imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course4.png",
        priceSell: 1400,
        priceMarket: 2400,
      },
      {
        title: "粤菜",
        imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course1.png",
        priceSell: 1900,
        priceMarket: 2400,
      },

      {
        title: "火锅",
        imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course2.png",
        priceSell: 1300,
        priceMarket: 2200,
      },

      {
        title: "西餐",
        imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course3.png",
        priceSell: 2900,
        priceMarket: 3400,
      },

      {
        title: "粥粉面",
        imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course4.png",
        priceSell: 1400,
        priceMarket: 2400,
      },
    ]
  },
  cfCategory: {
    title: "课程分类",
    list: [
      {
        title: "粤菜",
        imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course1.png",
      },

      {
        title: "火锅",
        imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course2.png",
      },

      {
        title: "西餐",
        imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course3.png",
      },

      {
        title: "粥粉面",
        imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course4.png",
      },
      {
        title: "湘菜",
        imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course1.png",
      },

      {
        title: "火锅",
        imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course2.png",
      },

      {
        title: "西餐",
        imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course3.png",
      },

      {
        title: "粥粉面",
        imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course4.png",
      },
    ]
  }

}
}
          
          
PUB.cfPannel=PUB.cfPannel||{}
PUB.cfPannel.gray_bar = {//浅灰色栏
cfTitleBar: {
  boxMiddle: {
    style: { "font-size": "16px", "padding": "0 0 0 10px" },
  },
  boxMain: {
    style: { "border-bottom": "none", "background": "#f0f0f0" },
  },
},
}
          
PUB.cfRelGList=PUB.cfRelGList||{}
PUB.cfRelGList.normal = {
styleListG: {
  padding: "15px 0  0 0"
},
cfPannel: PUB.cfPannel.gray_bar,//面板配置
cfListG: {
  isShowSearchForm: false,
  cfList: {
    isShowToolBar: false,//批量操作栏
    isShowPageLinkHasAPage: true,//未满一页不显示分页
    cfPagination: { small: true, layout: "total,  prev,  next", }, //分页
  }

}
}
          
PUB.cfForm = PUB.cfForm || {}
PUB.cfForm.watch = PUB.cfForm.watch || {}
PUB.cfForm.watch.file = {
//传入监听器
file(newVal, oldVal) {
  if (!(newVal && newVal.length)) return;//如果不是有效数组，退出
  let doc = lodash.get(newVal, `[0]`)
  let { name } = doc
  console.log(`doc:`, doc);
  if (!this.value.title) {//如果标题是空
    this.value.title = name;
  }
}
}
PUB.cfForm.test = {
formItems: [{ prop: "test", label: "test", default: "test123", }],

}
          
PUB.cfForm.case_temp_1 = {
formItems: [
  {
    prop: "companyName", label: "公司全称", 
    frequency: { sytle: { width: '170px' }, options: [{ value: "汇展科技（深圳）有限公司" },] }
  },
  {
    prop: "companyNameShort", label: "公司简称", 
    frequency: { sytle: { width: '170px' }, options: [{ value: "汇展公司" },] }
  },
  {
    prop: "caseId", label: "案号",
    frequency: { sytle: { width: '170px' }, options: [{ value: "汇展破产债审字第011号" },] }
  },
  {
    prop: "courtDistrict", label: "法院所在区", default: "宝安区",
    frequency: { sytle: { width: '170px' }, options: [{ value: "宝安区" }, { value: "龙岗区" }, { value: "福田区" }, { value: "罗湖区" }, { value: "坪山区" }, { value: "南山区" }, { value: "龙华区" }, { value: "盐田区" },] }

  },
  {
    prop: "applicant", label: "申请人",
    frequency: { sytle: { width: '170px' }, options: [{ value: "黄飞飞等260人" },] }

  },
  {
    prop: "rulingNo", label: "裁定书号",
    frequency: { sytle: { width: '170px' }, options: [{ value: "（2019）粤0306破申17号" },] }

  },
  {
    prop: "rulingTime", label: "裁定书时间",
    frequency: { sytle: { width: '170px' }, options: [{ value: "2019年10月9日" },] }

  },
  {
    prop: "decisionNo", label: "决定书号",
    frequency: { sytle: { width: '170px' }, options: [{ value: "（2019）粤0306破21号" },] }

  },
  {
    prop: "decisionTime", label: "决定书时间",
    frequency: { sytle: { width: '170px' }, options: [{ value: "2019年10月29日" },] }

  },
  {
    prop: "declareClaimTime", label: "申报债权日期",
    frequency: { sytle: { width: '170px' }, options: [{ value: "2019年11月27日" },] }

  },
  {
    prop: "lawfirm", label: "律师事务所", default: "北京市中伦文德（深圳）律师事务所",
    frequency: { sytle: { width: '170px' }, options: [{ value: "北京市中伦文德（深圳）律师事务所" },] }

  },
  {
    prop: "declareClaimFee", label: "申报债权总额",
    frequency: { sytle: { width: '170px' }, options: [{ value: "85062.49" },] }

  },
  {
    prop: "oweSSecurityTime", label: "欠缴社保时间段",
    frequency: { sytle: { width: '170px' }, options: [{ value: "2016年11月至2017年1月" },] }

  },
  {
    prop: "oweSSecurityFee", label: "欠缴社保本金",
    frequency: { sytle: { width: '170px' }, options: [{ value: "55763.85" },] }

  },
  {
    prop: "oweEndowmentFee", label: "欠养老保险费用",
    frequency: { sytle: { width: '170px' }, options: [{ value: "9645.60" },] }

  },
  {
    prop: "oweMedicalFee", label: "欠医疗保险费",
    frequency: { sytle: { width: '170px' }, options: [{ value: "2098.93" },] }

  },
  {
    prop: "lateFee", label: "滞纳金",
    frequency: { sytle: { width: '170px' }, options: [{ value: "29298.64" },] }

  },
  {
    prop: "declareEndTime", label: "申报截止时间",
    frequency: { sytle: { width: '170px' }, options: [{ value: "2019年11月11日" },] }

  },
  {
    prop: "affirmOweSSecurity", label: "社保费本金认定",
    frequency: { sytle: { width: '170px' }, options: [{ value: "44019.32" },] }

  },
  {
    prop: "oweEmployeesFee", label: "职工债权金额",
    frequency: { sytle: { width: '170px' }, options: [{ value: "11744.53" },] }

  },
  {
    prop: "docTime", label: "文档日期",
    frequency: { sytle: { width: '170px' }, options: [{ value: "二零一九年十二月十二日" },] }

  },
],
}
          
          
              
  
window.FN = window.FN || {}//存放本站公共函数的对象//123
          
//函数：{补充熟悉度ajax配置（动态数据字典）函数}
window.setFamiliarityAjaxCF = function (listCF, idKey = "_id") {
  util.setObjDefault(listCF, { dynamicDict: [] });
  let _systemId = lodash.get(PUB, `_paramAjaxAddon._systemId`, PUB._systemId);//变量：{获取_systemId}
  let dict = {
      ajax: {
          param: { _systemId, _dataType: "familiarity", findJson: { userId: PUB.$sys.userId }, },
          url: "/info/getCommonList",
      },
      populateColumn: "familiarityDoc",
      idColumn: idKey,
      idColumn2: "_idRel"
  }
  PUB.dydictNoteFamiliarity=dict;//***存储到公共变量
  listCF.dynamicDict.push(dict)//数据字典加入一项
}
//#endregion
          
//函数：{ajax根据关键词获取关联数据列表的函数}
FN.ajaxlistBykeyword = async function ({ param = {} }) {
  let { data } = await axios({
      //请求接口
      method: "post",
      url: `${PUB.domain}/info/getListBykeyword`,
      data: param
  });
  return data.list;
}
          
//函数：{分组追加选中数据列表的函数}
FN.ajaxGroupAddSelectData = async function (arr) {
  let { tableData } = this.$refs.listData;
  let docLast = tableData.slice(0); //第一个元素
  let sortStart = lodash.get(docLast, `[0].sort`, 9999);
  let arrDataAdd = arr.map(doc => {
      return {
          sort: ++sortStart,
          _idRel: this.groupId,
          _idRel2: doc._id
      };
  });
  // return;
  let urlAdd = PUB.listCF.list_relation.url.add;
  let ajaxParam = {
      _data: arrDataAdd
  };
  Object.assign(ajaxParam, PUB.listCF.list_relation.paramAddonPublic); //合并公共参数
  let response = await axios({
      //请求接口
      method: "post",
      url: PUB.domain + urlAdd,
      data: ajaxParam //传递参数
  });
  this.$message.success("添加数据成功");
  this.arrSelect2 = []; //清除该数组，否则越积越多
  this.$refs.listData.getDataList(); //列表更新
}
//#endregion
          
//调用：{初始化列表权限函数}
let fnInitList = async function () {

//#region 【注意顺序】权限表单项，从菜单遍历拼接！！！
let cfFormForPower = { labelWidth: "150px", formItems: [] }
PUB.menuList.forEach(menuEach_1 => {//循环：{1级菜单}
  let { index: index_1, menuItem, title } = menuEach_1;
  let { formItems } = cfFormForPower
  let objMenu1 = {
    label: title,
    prop: index_1,
    style: styleMenuGPowerItem,
    default: {},
    cfForm: {
      col_span: 12,
      formItems: []
    }
  }
  if (!menuItem) return;
  menuItem.forEach(menuEach_2 => {//循环：{2级菜单}
    let { index: index_2, title } = menuEach_2;
    if (!index_2) return;
    let objMenu2 = {
      prop: index_2,
      style: styleMenuPowerItem,
      cfForm: getFormMenuGPower({ menuName: title })
    }
    objMenu1.cfForm.formItems.push(objMenu2)
  })
  formItems.push(objMenu1)
})
//【】加入分组数据列表的权限选项*****
cfFormForPower.formItems.push(
  {
    label: '分组数据列表',
    prop: "groupDataList",
    style: styleMenuGPowerItem,
    default: {},
    cfForm: {
      col_span: 12,
      formItems: [
        {
          prop: "all",
          style: styleMenuPowerItem,
          cfForm: getFormMenuGPower({ menuName: "所有分组数据" })
        }
      ]
    }
  }
)
let rolePower = {
  ...D_ITEMS.rolePower,
  default: {},
  cfForm: cfFormForPower
};
//****这里通过合并而不是直接赋值，来影响引进引用了F_ITEMS.rolePower的列表页配置
Object.assign(F_ITEMS.rolePower, rolePower);//合并对象
//#endregion
//#region 【注意位置】菜单项批量添加权限路径
PUB.menuList.forEach(menuEach_1 => {//循环：{1级菜单}
  let { index: index_1, menuItem } = menuEach_1;
  if (!menuItem) return;
  menuItem.forEach(menuEach_2 => {//循环：{2级菜单}
    let { index: index_2 } = menuEach_2;
    if (!index_2) return;
    lodash.set(PUB.listCF, `${index_2}.powerPath`, `${index_1}.${index_2}`);//设置权限路径
  })
})
//变量：{分组数据列表页面配置名称数组}
let arrGroupName = ["detail_group_front_demo", "detail_group_note", "detail_group_url", "detail_group_vedio", "aaaa", "aaaa", "aaaa",]
//*** */
arrGroupName.forEach(nameEach => {//循环：{分组数据列表页面配置名称数组}
  if (!PUB.listCF[nameEach]) return;
  PUB.listCF[nameEach].powerPath = `groupDataList.all`//设置权限路径
})
//#endregion
}

fnInitList()
          
//#region listCFaddItemSystemId:列表组件配置补充_systemId列表字段配置函数-用于总后台
FN.listCFaddItemSystemId = function (cfList) {
let map = {
  columns: "COLUMNS", searchFormItems: "F_ITEMS", detailItems: "D_ITEMS", formItems: "F_ITEMS",
}
let arrNeed = ["columns", "searchFormItems", "detailItems", "formItems",]
arrNeed.forEach(prop => {//循环：{需要处理的字段名数组}
  let arrItemsForThis = cfList[prop]
  let varName = map[prop]//公共变量名
  if (!arrItemsForThis) return;
  let existsItem = arrItemsForThis.find(doc => doc.prop == "_systemId")
  if (existsItem) return//如果_systemId字段已存在，不再添加了
  arrItemsForThis.push(window[varName]._systemId)
})
};
//#endregion
          
//函数：{分组追加选中数据列表的函数}
FN.ajaxGroupAddSelectData = async function (arr) {
let { tableData } = this.$refs.listData;
let docLast = tableData.slice(0); //第一个元素
let sortStart = lodash.get(docLast, `[0].sort`, 9999);
let arrDataAdd = arr.map(doc => {
  return {
    sort: ++sortStart,
    _idRel: this.groupId,
    _idRel2: doc._id
  };
});
// return;

let urlAdd = PUB.listCF.list_relation.url.add;
let ajaxParam = {
  _data: arrDataAdd
};
Object.assign(ajaxParam, PUB.listCF.list_relation.paramAddonPublic); //合并公共参数
let response = await axios({
  //请求接口
  method: "post",
  url: PUB.domain + urlAdd,
  data: ajaxParam //传递参数
});

this.$message.success("添加数据成功");
this.arrSelect2 = []; //清除该数组，否则越积越多
this.$refs.listData.getDataList(); //列表更新
}
          
//函数：{初始化处理arrLookup数组函数}
FN.initArrLookup = async function (listIndex) {
  let $projectAddon = {};
  if (listIndex) {
      $projectAddon = PUB.$projectAddon[listIndex] || {}
  }
  //****列表查询arrLookup数组由3部分组成：固定的查询，计分板的筛选参数，上方表单的筛选参数
  let arrLookupFromScore = this.arrLookup || []; //来自计分板筛选的arrLookup
  let formDataSearch = lodash.cloneDeep(this.formDataSearch); //深拷贝
  util.clearObj(formDataSearch); //调用：{清除对象中的空属性（null,undefined,空格等）}
  let isValid = util.isNotEmptyObj(formDataSearch); //调用：{判断是否为非空对象的函数}
  let arrLookupSearch = [];
  if (isValid) {
      //如果是非空对象
      arrLookupSearch.push({
          $match: {
              ...formDataSearch //**** */
          }
      });
  }
  //补充联合查询参数，很复杂！！！！
  


let arrLookupFixed=FN.getArrLookupFixed(listIndex)//调用：{根据页面listIndex获取分组数据列表的联合查询参数的固定部分}
  let arrLookup = [
      ...arrLookupFixed,
      ...arrLookupFromScore,
      ...arrLookupSearch
  ];
  this.$set(this.cfList.objParamAddon, "arrLookup", arrLookup);
  //****计分板统计分数需要的arrLookup数组由2部分组成：固定的查询，上方表单的筛选参数
  this.arrLookupScore = [...arrLookupFixed, ...arrLookupSearch];
}
          

//函数：{根据页面listIndex获取分组数据列表的联合查询参数的固定部分}
FN.getArrLookupFixed =  function (listIndex) {
let $projectAddon = {};
if (listIndex) {
    $projectAddon = PUB.$projectAddon[listIndex] || {}
}
let arrLookupFixed = [
  {
      //联合目标数据表
      $lookup: {
          from: "sheet232",
          localField: "_idRel2",
          foreignField: "_id",
          as: "relDoc2"
      }
  },
  //使用$project重新组装，此时targetDoc是数组形式
  {
      $project: {
          _id: 1,
          _idRel: 1,
          _idRel2: 1,
          sort: "$_data.sort", //序号获取
          targetDoc: "$relDoc2._data"
      }
  },
  //将targetDoc展开
  {
      $unwind: "$targetDoc"
  },
  //使用$project重新组装
  {
      $project: {
          _id: 1,
          _idRel: 1,
          _idRel2: 1,
          sort: 1, //序号获取
          title: "$targetDoc.title",
          link: "$targetDoc.link",//链接地址
          category: "$targetDoc.category",
          ...$projectAddon,//附加的属性***
      }
  }
];

return arrLookupFixed

}
          
//函数：{更新记分项缓存数据函数}
FN.updateItemScore = async function ({ scoreKey, score }) {
//变量：{对应的分组id}
if (!scoreKey) return;
let urlModify = PUB.listCF.list_score.url.modify;
let ajaxParam = {
  findJson: { scoreKey, _userId: PUB.$sys.userId }, //用户名
  _data: {
    _userId: PUB.$sys.userId,
    score, scoreKey
  }
};
Object.assign(ajaxParam, PUB.listCF.list_score.paramAddonPublic); //合并公共参数
await axios({
  //请求接口
  method: "post",
  url: PUB.domain + urlModify,
  data: ajaxParam //传递参数
});
}
          
//函数：{更新分组的用户学习缓存数据函数}
FN.updateGroupUserScore = async function ({ groupId, score }) {
//变量：{对应的分组id}
if (!groupId) return;
let urlModify = PUB.listCF.list_familiarity.url.modify;
let ajaxParam = {
  _idRel: groupId,
  findJson: { _idRel: groupId, _userId: PUB.$sys.userId }, //用户名
  _data: {
    _idRel: groupId,
    _userId: PUB.$sys.userId,
    score,
    dataType: "group"
  }
};
Object.assign(ajaxParam, PUB.listCF.list_familiarity.paramAddonPublic); //合并公共参数
await axios({
  //请求接口
  method: "post",
  url: PUB.domain + urlModify,
  data: ajaxParam //传递参数
});
}
          
//函数：{获取规格链id函数}
FN.getIdSpecChian = function (arrSpecSelected) {
let arrId = arrSpecSelected.map(doc => lodash.get(doc, `objSOp.__id`));
return arrId.sort().join("__");

}
          
//函数：{获取规格链名称函数}
FN.getNameSpecChian = function (arrSpecSelected) {
let arrId = arrSpecSelected.map(doc => lodash.get(doc, `objSOp.name`));
return arrId.join(" + ");

}
          

//函数：{标记不符合条件的组合结果项的函数}
FN.handelCombResult = function ({ listSpecs, arrResult }) {
/****************************标记不符合条件的项-START****************************/
//循环：{规格数组}
listSpecs.forEach((itemEach, index) => {
  if (!itemEach.objSpecTerm) return;
  let indexTerm; //条件规格所在的位置
  let valTerm; //条件值
  for (var prop in itemEach.objSpecTerm) {
    indexTerm = listSpecs.findIndex(doc => doc.name == prop);
    valTerm = itemEach.objSpecTerm[prop];

  }
  //循环：{组合结果数组}
  arrResult.forEach(itemEach => {
    let flag = itemEach[indexTerm].name != valTerm;
    if (flag) {
      itemEach[index] = { name: "——" };
    }
  });
});
return arrResult
/****************************标记不符合条件的项-END****************************/
}
          
//函数：{规格价格列表去重函数}
FN.uniqListSpecPrice = function (listSpecPrice) {
let listSpecPriceNew = [];
//循环：{规格价格列表}
listSpecPrice.forEach(itemEach => {
  let obj = listSpecPriceNew.find(doc => doc.id == itemEach.id);
  //如果{000}000
  if (!obj) {
    listSpecPriceNew.push(itemEach);
  }
});
return listSpecPriceNew
}
//#endregion
          
              
  
MIX.base = {
data() {
  return {
  };
},
computed: {
  $sys() {
    let systemId = this.$route.params.sysId || PUB._systemId;//变量：{当前系统Id}
    let sys = util.getLocalStorageObj(systemId) || {}//调用：{从LocalStorage获取一个对象的函数}
    sys.env = PUB.domain == "https://www.dmagic.cn" ? "pro" : "dev";
    return sys
  },
},
methods: {
  //函数：{根据权限路径返回当前用户权限的函数}
 $power(powerPath) {
  if(PUB.ignorePower)return true;//忽略权限的开关变量
  return lodash.get(window.rolePower, `${powerPath}`);
},
  //函数：{返回数据字典标签函数}
  $dictLable(key, val) {
    return util.getDictLabel(key, val)
  },
},
async created() {
}
}
          
MIX.listGroupData = {
props: {
  
  groupDoc: {},
  groupId: {},
  dataType: {
    default: "note"
  },//数据类型

},
data() {
  return {
 
    readyAddDialogEntity: true,//是否准备好新增实体的弹窗组件-用于复制时重现初始化
    //新增实体数据弹窗配置
    cfAddDialogEntity: {
      copyId: null,//这个得先注册一下****
      tipsAfterAdd: false,
      listType: "common", //通用型列表-影响urlAdd
      cfFormAdd: { paramAddonInit: { _dataType: this.dataType } }
    },
    //编辑实体数据弹窗配置
    cfEditDialogEntity: {
      listType: "common", //通用型列表-影响urlModify
      cfFormModify: {
        paramAddonInit: { _id: "", _dataType: this.dataType }
      }
    },
    arrSelect2: [],
    arrSelectTransG: [],
    cfSelectList2: {
      hideCollection: true,
      dataName: lodash.get(DYDICT, `dataType.${this.dataType}.label`),
      valueKey: "_id",
      labelKey: "title",
      pageName: "tangball_article",
      multiple: true, //多选
      //需要保留的集合字段
      selectJson: { _id: 1, title: 1 },
      cfList: util.deepCopy(PUB.listCF[`list_${this.dataType}`])
    },
    cfSelectListTransG: {
      hideCollection: true,
      dataName: lodash.get(DYDICT, `dataType.${this.dataType}.label`),
      valueKey: "_id",
      labelKey: "title",
      pageName: "tangball_article",
      multiple: true, //多选
      //需要保留的集合字段
      selectJson: { _id: 1, title: 1 },
      cfList: util.deepCopy(PUB.listCF[`list_${this.dataType}`])
    },
    //查询表单配置-默认数据
    cfFormSearch: {
      inline: true, "labelWidth": "100px", size: "mini", formItems: [F_ITEMS.importance],
      btns: [{ text: "查询", event: "submit", type: "primary", size: "mini" }]
    },
    formDataSearch: {},
    ready: false,
    cfList: util.deepCopy(PUB.listCF[`detail_group_${this.dataType}`]),
    arrLookupScore: null, //计分板需要联合查询配置数组-
    //----------分组列表用到----------
    dictScore: {} //用户的分组分数数据字典
  };
},
computed: {
  //用于监听变化
  arrLookup: function () {
    return this.$store.state.arrLookup[this.cfList.listIndex];
  }
},
methods: {
  //函数：{选择转移分组后的回调函数}
  afterSelectTransG: async function() {
    alert(`afterSelectTransG`);
    
  },
  //函数：{sort_by_drag事件函数}
  sort_by_drag: async function (param) {
    console.log(`param:`, param);
    let { docOld, docNew } = param
    let sortNumTarget = docNew.sort+1;//***注意是降序排序，+1
    console.log(`sortNumTarget:`, sortNumTarget);
    await util.ajaxGroupDataSort("goto", docOld, sortNumTarget);//调用：{调用分组数据排序接口的函数}

  },
  //***函数：{处理列表内部组件事件的函数}
  handleListEventIn(param) {
    if (param.eventType == "filterDataByFamiliarity") {//如果{事件类型}是根据熟悉度过滤数据
      this.searchList()
    }
  },
  //函数：{单条数据操作事件}-临时
  async singleEvent(actionType, doc) {
    let arrNeedRefresh = ["up", "down", "top", "bottom"]
    if (arrNeedRefresh.includes(actionType)) {//如果是排序类操作
      await util.ajaxGroupDataSort(actionType, doc);
      this.$refs.listData.getDataList(); //列表更新
    }
    let { _idRel2 } = doc
    if (actionType == "edit_entity") {//如果是编辑实体数据

      this.cfEditDialogEntity.cfFormModify.paramAddonInit._id = _idRel2//***修改数据id
      this.cfEditDialogEntity.visible = true;//打开弹窗
    } else if (actionType == "copy_entity") {
      this.cfAddDialogEntity.copyId = _idRel2;
      this.readyAddDialogEntity = false;
      await this.$nextTick();//延迟到视图更新
      this.readyAddDialogEntity = true;



      this.cfAddDialogEntity.visible = true;//打开弹窗

    }
  },
bacthEvent(actionType, docs) {
    if (actionType == "add_entity") {//如果{事件类型}是新增实体
    this.cfAddDialogEntity.copyId = null;//清除copyId
      this.cfAddDialogEntity.visible = true;//打开弹窗

    }else if (actionType == "trans_group") {//如果{事件类型}是新增实体
    this.docsSelected=docs;
    this.isShowDialogTransG=true;
  }
  },
  async afterAddEntity(doc) {
    this.ajaxGroupAddData([doc])//调用：{000函数}
  },
  //函数：{选择并添加数据后的ajax操作函数}
  afterSelect: FN.ajaxGroupAddSelectData,
  ajaxGroupAddData: FN.ajaxGroupAddSelectData,//函数：{添加数据到分组的ajax操作函数}
  //函数：{初始化处理arrLookup数组函数}
  initArrLookup: FN.initArrLookup,
  //函数：{查询表单提交的回调函数}
  async searchList() {
    this.initArrLookup(this.cfList.listIndex); //调用：{初始化处理arrLookup数组函数}
    await this.$nextTick(); //延迟到视图更新
    this.$refs.listData.objParam.pageIndex = 1; //回到第一页
    this.$refs.listData.getDataList(); //列表更新
    this.toSetArrLookupScore()//调用：{设置获取分数的ArrLookup的函数}
  },

  //函数：***{设置获取分数的ArrLookup的函数}
  async toSetArrLookupScore() {
    //计分板子组件，注意定位后是一个数组，取第一个元素//层层定位-繁琐
    let com_score_panel = lodash.get(this, `$refs.listData.$refs.score_panel[0]`);//*** */
    if (!com_score_panel) return
    com_score_panel.setArrLookupScore(this.arrLookupScore)//调用：{设置ArrLookupScore函数}
  },
  //函数：{列表查询后的回调函数}--兼容带计分板和不带计分板的情形
  async afterSearch() {
    //计分板子组件，注意定位后是一个数组，取第一个元素
    let com_score_panel = lodash.get(this, `$refs.listData.$refs.score_panel[0]`);
    if (com_score_panel) {//Q1：{计分板子组件}存在
      // let com_score_panel = this.$refs.listData.$refs.score_panel[0];//目标子组件，注意定位后是一个数组，取第一个元素
      let comTarget2 = com_score_panel.$refs.scorePanel//真正的计分组件
      //设置id数组
      comTarget2.ajaxGetScore(); //调用：{ajax获取分数函数}
      if (comTarget2.focusId == undefined) {
        //如果没有筛选熟悉度（这里的触发机制还需进一步优化，没有必要一直调用）
        this.updateGroupCountData(); //调用：{更新当前分组的数据量的函数}
      }
    } else {//Q2：{计分板子组件}不存在
      this.updateGroupCountData(); //调用：{更新当前分组的数据量的函数}
    }

  },
  //函数：{更新当前分组的数据量的函数}
async updateGroupCountData() {
  let {data:{countData}}  = await axios({
      //请求接口
      method: "post", url: `${PUB.domain}/info/updateGroupCountData` ,
      data: {_id:this.groupId} //传递参数
    });
    this.$emit("update_count",countData);//***抛出计数事件
  },
  //**函数：{增加排除当前分组数据的查询条件的函数}-暂时不用，体验不大好，
  async excludeCurrGroup() {
    let { cfList } = this.cfSelectList2;
    cfList.objParamAddon = cfList.objParamAddon || {};
    cfList.objParamAddon.findJson = cfList.objParamAddon.findJson || {};
    let findjsonAdd = {
      "$or": [{
        "_data.arrGroup": {
          "$elemMatch": {
            "_idRel": {
              "$ne": this.groupId//不属于当前分组
            }
          }
        }
      }, {
        "_data.arrGroup": {
          "$exists": false//分组不存在
        }
      }, {
        "_data.countGroup": 0//分组数为0
      }]
    }

    cfList.objParamAddon.findJson = { ...cfList.objParamAddon.findJson, ...findjsonAdd };
  },

},
async created() {


  /****************************针对group类型进行函数改造/添加-START****************************/
  if (this.dataType == "group") {//如果{数据类型}是分组
    //函数：{列表查询后执行的函数}
    this.afterSearch = async (list) => {
      let arrGroupId = list.map(doc => doc._idRel2);//变量：{分组id数组}
      let datalist = await this.getGroupUserScore(arrGroupId);//调用：{ajax获取的用户学习缓存数据函数}
      if (datalist && datalist.length) {
        datalist.forEach(itemEach => {
          this.$set(this.dictScore, itemEach._idRel, itemEach.score);
        });
      }
    }
    //函数：{ajax获取的用户学习缓存数据函数}
    this.getGroupUserScore = async (arrGroupId) => {
      let urlList = PUB.listCF.list_familiarity.url.list;
      let ajaxParam = {
        findJson: {
          _idRel: { $in: arrGroupId }, dataType: "group", _userId: PUB.$sys.userId
        }
      };
      //获取列表的数据总量
      Object.assign(ajaxParam, PUB.listCF.list_familiarity.paramAddonPublic); //合并公共参数
      let {
        data: { list }
      } = await axios({
        //请求接口
        method: "post",
        url: PUB.domain + urlList,
        data: ajaxParam //传递参数
      });
      return list;
    }

  }
  /****************************针对group类型进行函数改造/添加-END****************************/


  // this.excludeCurrGroup()//调用：{增加排除当前分组数据的查询条件的函数}

  /****************************弱化新增按钮-START****************************/
  let { addon } = this.cfList.batchBtns;
  let itemAdd = addon.find(doc => doc.eventType == "add");
  Object.assign(itemAdd, { text: "新增关联Id", cfElBtn: {} }); //合并对象-

  /****************************弱化新增按钮-END****************************/


  //this.cfList.customDetail = true; //开启自定义详情弹窗
  this.cfList.comDetail = "detail_data"; //启用自定义详情组件
  this.$set(this.cfList.objParamAddon.findJson, "_idRel", this.groupId);
  this.initArrLookup(this.cfList.listIndex); //调用：{初始化处理arrLookup数组函数}



  this.ready = true;
  //补充熟悉度ajax配置（动态数据字典）,注意要传_idRel2
  window.setFamiliarityAjaxCF(this.cfList, "_idRel2");



  /****************************补充编辑实体数据按钮-START****************************/
  let sBtnEditEntity = { eventType: "edit_entity", text: "编辑", };
  this.cfList.singleBtns.addon.push(sBtnEditEntity);
  /****************************补充编辑实体数据按钮-END****************************/
  //***从cfList中获取到需要的查询条件字段******
  this.cfFormSearch.formItems = this.cfList.searchFormItems



},
mounted() {
  //注意此方法要等待组件加载好
  this.toSetArrLookupScore()//调用：{设置获取分数的ArrLookup的函数}
}
}
          
              
  
//#region 管理员列表页
{
  let _dataType = "admin";
  let listIndex = `list_${_dataType}`
  PUB.listCF[listIndex] = {
      idKey: "_id", //键名
      pageSize: 20,
      listIndex, //vuex对应的字段~
      focusMenu: true, //进行菜单聚焦
      breadcrumb: [{ value: "首页", path: "listHome" }, { value: "管理员" }],
      ...PUB.listCFCommon5,//展开公共配置
      //objParamAddon列表接口的附加参数
      objParamAddon: { _dataType },
      //公共的附加参数，针对所有接口
      paramAddonPublic: { _dataType },
      //-------详情字段数组-------
      detailItems: ["Id", "userName", "passWord"],
      //-------列配置数组-------
      columns: ["Id", "userName", "nickName", "role"],
      //-------筛选表单字段数组-------
      searchFormItems: ["Id"],
      //-------新增、修改表单字段数组-------
      formItems: ["userName", "passWord", "nickName", "role"],
  }
  //调用：{改造列表字段配置形式的函数（字符串转对象）}
  util.reformCFListItem(PUB.listCF[listIndex])
}
//#endregion
          
//#region 所有数据列表页
{
  let _dataType = "$all";//特殊类型
  PUB.listCF.list_all = {
      idKey: "_id", //键名
      pageSize: 20,
      listIndex: "list_all", //vuex对应的字段~
      focusMenu: true, //进行菜单聚焦
      breadcrumb: [{ value: "首页", path: "listHome" }, { value: "所有数据" }],
      ...PUB.listCFCommon2,//展开公共配置
      objParamAddon: { _dataType },
      //公共的附加参数，针对所有接口
      paramAddonPublic: { _dataType },
      //-------详情字段数组-------
      detailItems: ["title", "desc"],
      //-------列配置数组-------
      columns: ["title_fixed", "desc"],
      //-------筛选表单字段数组-------
      searchFormItems: ["title_search"],
      //-------新增、修改表单字段数组-------
      formItems: ["title", "desc"],
  }
  util.reformCFListItem(PUB.listCF.list_all)
}
//#endregion
          
//#region 文章分类列表页
{
  let _dataType = "article_category";
  let listIndex = `list_${_dataType}`
  PUB.listCF[listIndex] = {
      idKey: "_id", //键名
      pageSize: 20,
      listIndex, //vuex对应的字段~
      focusMenu: true, //进行菜单聚焦
      breadcrumb: [{ value: "首页", path: "listHome" }, { value: "文章分类" }],
      ...PUB.listCFCommon5,//展开公共配置
      //objParamAddon列表接口的附加参数
      objParamAddon: { _dataType },
      //公共的附加参数，针对所有接口
      paramAddonPublic: { _dataType },
      //-------详情字段数组-------
      detailItems: ["category_name", "category_remark"],
      //-------列配置数组-------
      columns: ["category_name", "category_remark"],
      //-------筛选表单字段数组-------
      searchFormItems: ["category_name"],
      //-------新增、修改表单字段数组-------
      formItems: ["category_name", "category_remark"],
  }
  //调用：{改造列表字段配置形式的函数（字符串转对象）}
  util.reformCFListItem(PUB.listCF[listIndex])
}
//#endregion
          
//#region 文章列表页
{
  let _dataType = "article";
  let listIndex = `list_${_dataType}`
  PUB.listCF[listIndex] = {
      idKey: "_id", //键名
      pageSize: 20,
      listIndex, //vuex对应的字段~
      focusMenu: true, //进行菜单聚焦
      breadcrumb: [{ value: "首页", path: "listHome" }, { value: "文章" }],
      ...PUB.listCFCommon2,//展开公共配置
      //objParamAddon列表接口的附加参数
      objParamAddon: { _dataType },
      //公共的附加参数，针对所有接口
      paramAddonPublic: { _dataType },
      //-------详情字段数组-------
      detailItems: ["title", "desc"],
      //-------列配置数组-------
      columns: ["title_fixed", "desc"],
      //-------筛选表单字段数组-------
      searchFormItems: ["title_search"],
      //-------新增、修改表单字段数组-------
      formItems: ["title", "desc", "detail_paste"],
  }
  //调用：{改造列表字段配置形式的函数（字符串转对象）}
  util.reformCFListItem(PUB.listCF[listIndex])
}
//#endregion
          
//#region 数据类型列表页
{
  let _dataType = "data_type"
  let listIndex = `list_${_dataType}`
  PUB.listCF[listIndex] = {
      idKey: "_id", //键名
      pageSize: 20,
      listIndex, //vuex对应的字段~
      focusMenu: true, //进行菜单聚焦
      breadcrumb: [{ value: "首页", path: "listHome" }, { value: "数据类型" }],
      ...PUB.listCFCommon5,//展开公共配置
      //objParamAddon列表接口的附加参数
      objParamAddon: { _dataType },
      //公共的附加参数，针对所有接口
      paramAddonPublic: { _dataType },
      //-------详情字段数组-------
      detailItems: ["_id", "dataTypekey", "title", "desc"],
      //-------列配置数组-------
      columns: ["title_fixed", "dataTypekey", "desc"],
      //-------筛选表单字段数组-------
      searchFormItems: ["title_search", "dataTypekey"],
      //-------新增、修改表单字段数组-------
      formItems: ["dataTypekey", "title", "desc"],
  }
  //调用：{改造列表字段配置形式的函数（字符串转对象）}
  util.reformCFListItem(PUB.listCF[listIndex])
}
//#endregion
          

//#region 笔记列表页
{
let _dataType = "note";
let listIndex = `list_${_dataType}`
PUB.listCF[listIndex] = {
  idKey: "_id", //键名
  pageSize: 20,
  listIndex, //vuex对应的字段~
  focusMenu: true, //进行菜单聚焦
  breadcrumb: [{ value: "首页", path: "listHome" }, { value: "笔记" }],
  ...PUB.listCFCommon2,//展开公共配置
  //批量操作按钮的配置
  batchBtns: {
    addon: [
      util.cfList.bBtns.add,
      util.cfList.bBtns.delete,
      // { uiType: "slot", slot: "slot_in_toolbar" },
      { uiType: "component", component: "com_score_panel", ref: "score_panel" },
    ],
  },
  //dynamicDict动态数据字典配置
  dynamicDict: [
    DYDICT.note_category
  ],
  //objParamAddon列表接口的附加参数//传入联表查询参数
  objParamAddon: { _dataType, arrLookup: [] },
  //公共的附加参数，针对所有接口
  paramAddonPublic: { _dataType },

  //操作列配置
  columnOperate: {
    "min-width": 210
  },


  //-------详情字段数组-------
  detailItems: ["title", "keyword", "detail", "desc", "category", "importance","sonNoteGId",  "difficulty", "_id", "demoList", "note_linkList", "note_noteList"],
  //-------列配置数组-------
  columns: ["_id", "title_fixed_edit", "countGroup", "keyword_edit", "familiarity_select","sonNoteGId",  "importance_edit", "difficulty_edit", "category_multiple", "demoList"],
  //-------筛选表单字段数组-------
  searchFormItems: ["title_search", "note_category", "importance", "difficulty", "countGroup"],
  //-------新增、修改表单字段数组-------
  formItems: ["title", "link", "importance_radio", "difficulty_radio", "keyword", "note_category", "desc","sonNoteGId",  "detail_paste", "_systemId"],
}
//调用：{改造列表字段配置形式的函数（字符串转对象）}
util.reformCFListItem(PUB.listCF[listIndex])

}


//#endregion
          
//***注意位置-补充表单字段，因为这个字段需要继承PUB.listCF.list_note
F_ITEMS.relNoteList = {
  ...D_ITEMS.relNoteList,
  type: "select_list_data",
  cfSelectList: {
      //选择列表配置
      dataName: "笔记",
      valueKey: "_id",
      labelKey: "title",
      multiple: true, //多选
      //需要保留的集合字段
      selectJson: {
          _id: 1,
          title: 1
      },
      cfList: util.deepCopy(PUB.listCF.list_note)
  }
};
          
//#region 笔记分类列表页
{
  let _dataType = "note_category";
  let listIndex = `list_${_dataType}`
  PUB.listCF[listIndex] = {
      idKey: "_id", //键名
      pageSize: 20,
      listIndex, //vuex对应的字段~
      focusMenu: true, //进行菜单聚焦
      breadcrumb: [{ value: "首页", path: "listHome" }, { value: "笔记分类" }],
      ...PUB.listCFCommon5,//展开公共配置
      //objParamAddon列表接口的附加参数
      objParamAddon: { _dataType },
      //公共的附加参数，针对所有接口
      paramAddonPublic: { _dataType },
      //-------详情字段数组-------
      detailItems: ["title", "desc", "category"],
      //-------列配置数组-------
      columns: ["title_fixed", "desc", "category"],
      //-------筛选表单字段数组-------
      searchFormItems: ["title_search"],
      //-------新增、修改表单字段数组-------
      formItems: ["title", "desc"],
  }
  //调用：{改造列表字段配置形式的函数（字符串转对象）}
  util.reformCFListItem(PUB.listCF[listIndex])
}
//#endregion
          
//#region 关系列表页
{
  let _dataType = "relation";
  let listIndex = `list_${_dataType}`
  PUB.listCF[listIndex] = {
      idKey: "_id", //键名
      pageSize: 20,
      listIndex, //vuex对应的字段~
      focusMenu: true, //进行菜单聚焦
      breadcrumb: [{ value: "首页", path: "listHome" }, { value: "关系数据" }],
      ...PUB.listCFCommon5,//展开公共配置
      objParamAddon: { _dataType },
      //公共的附加参数，针对所有接口
      paramAddonPublic: { _dataType },
      //-------详情字段数组-------
      detailItems: ["_id", "_idRel", "_idRel2", "sort"],
      //-------列配置数组-------
      columns: ["_id", "_idRel", "_idRel2", "sort"],
      //-------筛选表单字段数组-------
      searchFormItems: ["_idRel", "_idRel2"],
      //-------新增、修改表单字段数组-------
      formItems: ["_idRel", "_idRel2", "sort"],
  }
  //调用：{改造列表字段配置形式的函数（字符串转对象）}
  util.reformCFListItem(PUB.listCF[listIndex])
}
//#endregion
          
//#region 角色列表页
{
  let _dataType = "role";
  let listIndex = `list_${_dataType}`
  PUB.listCF[listIndex] = {
      idKey: "_id", //键名
      pageSize: 20,
      listIndex, //vuex对应的字段~
      focusMenu: true, //进行菜单聚焦
      breadcrumb: [{ value: "首页", path: "listHome" }, { value: "角色" }],
      ...PUB.listCFCommon5,//展开公共配置
      objParamAddon: { _dataType },
      //公共的附加参数，针对所有接口
      paramAddonPublic: { _dataType },

      //-------详情字段数组-------
      detailItems: ["Id", "roleName", "rolePower"],
      //-------列配置数组-------
      columns: ["Id", "roleName", "rolePower"],
      //-------筛选表单字段数组-------
      searchFormItems: ["Id"],
      //-------新增、修改表单字段数组-------
      formItems: ["roleName", "rolePower"],
  }
  //调用：{改造列表字段配置形式的函数（字符串转对象）}
  util.reformCFListItem(PUB.listCF[listIndex])

}

//#endregion
          

//#region 视频列表页
{
  let _dataType = "vedio";
  let listIndex = `list_${_dataType}`
  PUB.listCF[listIndex] = {
      idKey: "_id", //键名
      pageSize: 20,
      listIndex, //vuex对应的字段~
      focusMenu: true, //进行菜单聚焦
      breadcrumb: [{ value: "首页", path: "listHome" }, { value: "教学视频" }],
      ...PUB.listCFCommon2,//展开公共配置

      objParamAddon: { _dataType },
      //公共的附加参数，针对所有接口
      paramAddonPublic: { _dataType },


      //-------详情字段数组-------
      detailItems: ["title", "desc", "link", "vedio", "detail"],
      //-------列配置数组-------
      columns: ["title_fixed", "keyword_edit", "countGroup", "_id", "desc", "vedio", "link"],
      //-------筛选表单字段数组-------
      searchFormItems: ["title_search", "countGroup"],
      //-------新增、修改表单字段数组-------
      formItems: ["title", "keyword", "desc", "link", "vedio"],
  }
  //调用：{改造列表字段配置形式的函数（字符串转对象）}
  util.reformCFListItem(PUB.listCF[listIndex])

}


//#endregion
          

//#region 分组列表页
{
let _dataType = "group";
let listIndex = `list_${_dataType}`
PUB.listCF[listIndex] = {
  idKey: "_id", //键名
  pageSize: 20,
  listIndex, //vuex对应的字段~
  focusMenu: true, //进行菜单聚焦
  breadcrumb: [{ value: "首页", path: "listHome" }, { value: "分组" }],
  ...PUB.listCFCommon,//展开公共配置
  //列表单项操作按钮的配置
  singleBtns: {
    addon: [
      ...util.cfList.sBtns.arrAllBtns,
      {
        uiType: "link",
        text: "分组详情",
        target: "_blank",
        url: "#/detail_group?groupId=" //这里要配置好参数名，内部会把参数加进来
      }
    ]
  },
  objParamAddon: { _dataType },
  //公共的附加参数，针对所有接口
  paramAddonPublic: { _dataType },

  //-------详情字段数组-------
  detailItems: ["_id", "title", "alias", "desc", "group_dataType"],
  //-------列配置数组-------
  columns: ["title_fixed", "_id", "alias", "desc", "group_dataType"],
  //-------筛选表单字段数组-------
  searchFormItems: ["title_search", "group_dataType", "alias"],
  //-------新增、修改表单字段数组-------
  formItems: ["title", "alias", "group_dataType", "iconSrc", "desc"],
}
//调用：{改造列表字段配置形式的函数（字符串转对象）}
util.reformCFListItem(PUB.listCF[listIndex])

}
//#endregion
          

{
let _dataType = "url";
let listIndex = `list_${_dataType}`
PUB.listCF[listIndex] = {
  idKey: "_id", //键名
  pageSize: 20,
  listIndex, //vuex对应的字段~
  focusMenu: true, //进行菜单聚焦
  breadcrumb: [{ value: "首页", path: "listHome" }, { value: "网址" }],
  ...PUB.listCFCommon3,//展开公共配置
  //objParamAddon列表接口的附加参数
  // singleBtns:PUB.singleBtns_copy_link_sort,
  objParamAddon: { _dataType },
  //公共的附加参数，针对所有接口
  paramAddonPublic: { _dataType },

  //-------详情字段数组-------
  detailItems: ["title", "desc", "link"],
  //-------列配置数组-------
  columns: ["title_fixed", "_id", "desc", "link"],
  //-------筛选表单字段数组-------
  searchFormItems: ["title_search"],
  //-------新增、修改表单字段数组-------
  formItems: ["title", "link", "desc", "album"],
}
//调用：{改造列表字段配置形式的函数（字符串转对象）}
util.reformCFListItem(PUB.listCF[listIndex])

}
          
              
  
{
let _dataType = "html_api";
let listCFAddon = {
  breadcrumb: [ { value: "首页", path: "listHome" }, { value: "API手册" }, { value: "Html-API" } ],
  ...PUB.listCFCommon4,//展开公共配置
  //批量操作按钮的配置
  batchBtns: {
    addon: [
      util.cfList.bBtns.add,
      util.cfList.bBtns.delete,
      { uiType: "component", component: "com_score_panel", ref: "score_panel" },
      // { uiType: "slot", slot: "slot_in_toolbar" }
    ],
  },
  //dynamicDict动态数据字典配置
  dynamicDict: [
    DYDICT.html_api_category,
  ],
  //objParamAddon列表接口的附加参数
  objParamAddon: {
    _systemId,
    _dataType,
    //传入联表查询参数
    arrLookup: []
  },
  //-------详情字段数组-------
  detailItems: ["_id", "title", "keyword", "desc", "detail", "category", "html_display", "importance", "difficulty", "english", "html_version", "selfClose", "demoList", "cateIdOld"],
  //-------列配置数组-------
  columns: ["title_fixed_w150_edit", "keyword_edit", "desc", "category", "familiarity_select", "html_display", "importance", "difficulty", "english", "html_version", "selfClose", "cateIdOld", "demoList"],
  //-------筛选表单字段数组-------
  searchFormItems: ["title_search", "html_api_category", "html_display", "importance", "difficulty", "html_version", "selfClose"],
  //-------新增、修改表单字段数组-------
  formItems: ["title", "keyword", "html_api_category", "desc", "detail", "html_display", "importance", "difficulty", "english", "html_version", "selfClose", "demoList"],
}
util.handleCommonListCF({_dataType, listCFAddon})//调用：{处理通用列表配置数据函数}
}

          
{
let _dataType = "html_api_category";
let listCFAddon = {
  breadcrumb: [ { value: "首页", path: "listHome" }, { value: "Html-Api分类" } ],
  ...PUB.listCFCommon2,//展开公共配置
  //-------详情字段数组-------
  detailItems: ["title", "desc", "category"],
  //-------列配置数组-------
  columns: ["title_fixed", "desc", "category"],
  //-------筛选表单字段数组-------
  searchFormItems: ["title_search"],
  //-------新增、修改表单字段数组-------
  formItems: ["title", "desc"],
}
util.handleCommonListCF({ _dataType, listCFAddon })//调用：{处理通用列表配置数据函数}
}

          

{
let _dataType = "css_api";
let listCFAddon = {
  breadcrumb: [{ value: "首页", path: "listHome" }, { value: "API手册" }, { value: "Css-API" }],
  ...PUB.listCFCommon4,//展开公共配置
  //批量操作按钮的配置
  batchBtns: {
    addon: [
      util.cfList.bBtns.add, util.cfList.bBtns.delete, 
      { uiType: "component", component: "com_score_panel", ref: "score_panel" },
      // { uiType: "slot", slot: "slot_in_toolbar" }
    ],
  },
  //dynamicDict动态数据字典配置
  dynamicDict: [
    DYDICT.css_api_category,
  ],
  //objParamAddon列表接口的附加参数
  objParamAddon: {
    _systemId,_dataType,arrLookup: [],//传入联表查询参数
  },
  //-------详情字段数组-------
  detailItems: ["_id", "title", "keyword", "desc", "detail", "category", "importance"],
  //-------列配置数组-------
  columns: ["title_fixed_w150", "keyword_edit", "desc", "category", "familiarity_select", "importance"],
  //-------筛选表单字段数组-------
  searchFormItems: ["title_search", "css_api_category", "difficulty"],
  //-------新增、修改表单字段数组-------
  formItems: ["title", "keyword", "css_api_category", "desc", "detail", "importance", "difficulty"],

}
util.handleCommonListCF({_dataType, listCFAddon})//调用：{处理通用列表配置数据函数}
}



          

{
let _dataType = "css_api_category";
let listCFAddon = {
  breadcrumb: [ { value: "首页", path: "listHome" }, { value: "Css-API分类" } ],
  ...PUB.listCFCommon2,//展开公共配置
  //-------详情字段数组-------
  detailItems: ["title", "desc", "category"],
  //-------列配置数组-------
  columns: ["title_fixed", "desc", "category"],
  //-------筛选表单字段数组-------
  searchFormItems: ["title_search"],
  //-------新增、修改表单字段数组-------
  formItems: ["title", "desc"],
}
util.handleCommonListCF({ _dataType, listCFAddon })//调用：{处理通用列表配置数据函数}
}



          
{
let _dataType = "js_api";
let listCFAddon = {
  breadcrumb: [ { value: "首页", path: "listHome" }, { value: "API手册" }, { value: "Javascript-API" } ],
  ...PUB.listCFCommon2,//展开公共配置
  //批量操作按钮的配置
  batchBtns: {
    addon: [
      util.cfList.bBtns.add,
      util.cfList.bBtns.delete,
      // { uiType: "slot", slot: "slot_in_toolbar" }
      { uiType: "component", component: "com_score_panel", ref: "score_panel" },
    ],
  },
  //dynamicDict动态数据字典配置
  dynamicDict: [
    DYDICT.js_api_category,
  ],
  //objParamAddon列表接口的附加参数
  objParamAddon: {
    _dataType,
    //传入联表查询参数
    arrLookup: []
  },
  //-------详情字段数组-------
  detailItems: ["_id", "title", "keyword", "desc", "detail", "category", "importance", "difficulty", "english", "cateIdOld"],
  //-------列配置数组-------
  columns: ["title_fixed_w150_edit", "keyword_edit", "desc", "category", "familiarity_select", "importance", "difficulty", "english", "cateIdOld"],
  //-------筛选表单字段数组-------
  searchFormItems: ["title_search", "js_api_category", "importance", "difficulty"],
  //-------新增、修改表单字段数组-------
  formItems: ["title", "link", "keyword", "js_api_category", "desc", "detail", "importance", "difficulty", "english"],
}
util.handleCommonListCF({ _dataType, listCFAddon })//调用：{处理通用列表配置数据函数}
}

          
{
let _dataType = "js_api_category";
let listCFAddon = {
  breadcrumb: [ { value: "首页", path: "listHome" }, { value: "Javascript-api分类" } ],
  ...PUB.listCFCommon2,//展开公共配置
  //-------详情字段数组-------
  detailItems: ["title", "desc", "cateIdOld"],
  //-------列配置数组-------
  columns: ["title_fixed", "desc", "cateIdOld"],
  //-------筛选表单字段数组-------
  searchFormItems: ["title_search"],
  //-------新增、修改表单字段数组-------
  formItems: ["title", "cateIdOld", "desc"],
}
util.handleCommonListCF({_dataType, listCFAddon})//调用：{处理通用列表配置数据函数}
}

          
{
let _dataType = "score";
let listCFAddon = {
  breadcrumb: [ { value: "首页", path: "listHome" }, { value: "记分项" } ],
  ...PUB.listCFCommon5,//展开公共配置
  //-------详情字段数组-------
  detailItems: ["_id", "scoreKey", "score", "_userId"],
  //-------列配置数组-------
  columns: ["scoreKey", "score", "_userId"],
  //-------筛选表单字段数组-------
  searchFormItems: ["scoreKey", "_userId"],
  //-------新增、修改表单字段数组-------
  formItems: ["scoreKey", "_userId"],
}
util.handleCommonListCF({_dataType, listCFAddon})//调用：{处理通用列表配置数据函数}
}

          
{
let _dataType = "familiarity";
let listCFAddon = {
  breadcrumb: [ { value: "首页", path: "listHome" }, { value: "熟悉度" } ],
  ...PUB.listCFCommon,//展开公共配置
  //dynamicDict动态数据字典配置
  dynamicDict: [
    DYDICT.html_api_category
  ],
  //-------详情字段数组-------
  detailItems: ["familiarity", "dataType", "dataId", "userId", "studyTime"],
  //-------列配置数组-------
  columns: ["familiarity", "score", "dataType", "dataId", "_userId", "userId", "_idRel", "studyTime"],
  //-------筛选表单字段数组-------
  searchFormItems: ["dataId", "userId", "_userId", "_idRel"],
  //-------新增、修改表单字段数组-------
  formItems: ["familiarity", "dataType", "dataId", "userId", "_userId"],

}
util.handleCommonListCF({_dataType, listCFAddon})//调用：{处理通用列表配置数据函数}
}




          
{
let _dataType = "exercises";
let listCFAddon = {
  breadcrumb: [ { value: "首页", path: "listHome" }, { value: "前端习题" } ],
  ...PUB.listCFCommon2,//展开公共配置
  //-------详情字段数组-------
  detailItems: ["title", "desc", "category", "detail"],
  //-------列配置数组-------
  columns: ["title_fixed", "desc", "category"],
  //-------筛选表单字段数组-------
  searchFormItems: ["title_search"],
  //-------新增、修改表单字段数组-------
  formItems: ["title", "desc", "detail"],

}
util.handleCommonListCF({_dataType, listCFAddon})//调用：{处理通用列表配置数据函数}
}



          
{
let _dataType = "front_demo";
let listCFAddon = {
  breadcrumb: [ { value: "首页", path: "listHome" }, { value: "前端Demo" } ],
  ...PUB.listCFCommon4,//展开公共配置
  "detailItems": ["title", "keyword", "link", "desc", "category", "detail", "_id"],
  "columns": ["title_fixed_edit", "_id", "keyword_edit", "link", "desc", "category"],
  "searchFormItems": ["title_search"],
  "formItems": ["title", "link", "keyword", "desc", "detail"]
}
util.handleCommonListCF({_dataType, listCFAddon})//调用：{处理通用列表配置数据函数}
}

          
              
  
//#region 商品/服务
{
  let _dataType = "goods";
  let listCFAddon = {
      breadcrumb: [{ value: "首页", path: "listHome" }, { value: "商品/服务" }],
      ...PUB.listCFCommon2,//展开公共配置
      singleBtns: {
          addon: [
              ...util.cfList.sBtns.arrAllBtns,
              {
                  uiType: "link",
                  text: "查看前台展示",
                  target: "_blank",
                  urlFormatter: function (row) {
                      return `http://www.szltkt.cn/goods/${row._id}`;
                  },
              },
          ]
      },
      //-------详情字段数组-------
      detailItems: ["title", "desc", "deliveryDesc", "priceMarket", "priceSell", "priceSellSection", "isPublish", "countOrder"],
      //-------列配置数组-------
      columns: ["title_fixed", "_id", "desc", "priceMarket", "priceSell", "priceSellSection", "isPublish", "countOrder"],
      //-------筛选表单字段数组-------
      searchFormItems: ["title_search"],
      //-------新增、修改表单字段数组-------
      formItems: ["title", "desc", "album", "deliveryDesc", "detail", "priceMarket", "priceSell",  "isPublish", "listSpecPrice"],
  }
  util.handleCommonListCF({ _dataType, listCFAddon })//调用：{处理通用列表配置数据函数}
}
//#endregion

          
{
let _dataType = "user";
let listCFAddon = {
  breadcrumb: [{ value: "首页", path: "listHome" }, { value: "用户" }],
  ...PUB.listCFCommon5,//展开公共配置
  //-------详情字段数组-------
  detailItems: ["trueName", "nickName", "openid", "phone", "sex", "countOrder"],
  //-------列配置数组-------
  columns: ["CreateTime", "nickName", "openid", "phone", "sex", "countOrder"],
  //-------筛选表单字段数组-------
  searchFormItems: ["nickName", "openid"],
  //-------新增、修改表单字段数组-------
  formItems: ["trueName", "nickName", "openid", "phone", "sex"],
}
util.handleCommonListCF({ _dataType, listCFAddon })//调用：{处理通用列表配置数据函数}
}

          
{
let _dataType = "order";
let listCFAddon = {
  ...PUB.listCFCommon5,//展开公共配置
  breadcrumb: [{ value: "首页", path: "listHome" }, { value: "线上订单" }],
  //动态数据字典
  dynamicDict: [
    DYDICT.order_user
  ],
  objParamAddon: {
    findJson: { orderSource: { $ne: 2 } }, //筛选条件！！！
    _dataType
  },
  //-------详情字段数组-------
  detailItems: ["orderId", "_id", "openid", "timeOrder", "priceOrder", "listGoods", "payStatus", "receiverName", "phone", "addressObj", "remark"],
  //-------列配置数组-------
  columns: ["orderId", "orderNickName", "receiverName", "phone", "timeOrder", "priceOrder", "payStatus_com", "deliveryStatus", "openid"],
  //-------筛选表单字段数组-------
  searchFormItems: ["orderId", "timeOrder_search", "payStatus", "deliveryStatus",],
  //-------新增、修改表单字段数组-------
  formItems: ["orderId", "openid", "payStatus", "deliveryStatus", "remark", "orderSource","addressObj", ],
}
util.handleCommonListCF({ _dataType, listCFAddon })//调用：{处理通用列表配置数据函数}
}

          
{
  let _dataType = "order";
  PUB.listCF.list_order_offline = lodash.cloneDeep(PUB.listCF.list_order);//**** */
  let listIndex = `list_order_offline`
  PUB.listCF[listIndex] = {
      ...PUB.listCF.list_order_offline,
     batchBtns: {
      
        addon: [
 util.cfList.bBtns.add,
 util.cfList.bBtns.exportExcel,
 util.cfList.bBtns.delete,
      { uiType: "component", component: "com_longting_order_statistics",ref:"stat_panel" },
        ],
      },

      breadcrumb: [{ value: "首页", path: "listHome" }, { value: "线下订单" }],
      listIndex,
      _dataType,
      objParamAddon: {
          findJson: { orderSource: 2 }, //筛选条件！！！
          _dataType
      },
      cfForm: {
          col_span: 12, //控制显示一行多列
          watch: PUB.cfForm.watch.file 
        },
      formDataAddInit: {
          orderSource: 2
      },
      //-------详情字段数组-------
      detailItems: ["orderId", "_id", "timeOrder", "priceOrder", "listGoods", "payStatus", "receiverName", "phone", "addressObj", "remark"],
      //-------列配置数组"orderId",-------
      columns: ["orderGoodsDesc",  "receiverName", "phone", "timeOrder", "priceOrder", "payStatus_com", "timeAppointVisit","visitServiceStatus","serviceWorker","serviceRemark",],
      //-------筛选表单字段数组-------
      searchFormItems: ["orderGoodsDesc_search", "orderId", "timeOrder_search", "payStatus", "deliveryStatus",],
      //-------新增、修改表单字段数组"orderSource",-------
      formItems: ["orderGoodsDesc", "receiverName", "priceOrder", "timeOrder", "phone", "payStatus", "timeAppointVisit","visitServiceStatus","serviceWorker","serviceRemark","addressObj",],
  }
  util.reformCFListItem(PUB.listCF[listIndex])
}

          
              
  


{
let _dataType = "data_item";
let listCFAddon = {
  breadcrumb: [{ value: "首页", path: "listHome" }, { value: "数据字典" }],
  ...PUB.listCFCommon2,//展开公共配置
  //批量操作按钮的配置
  batchBtns: {

    addon: [
      util.cfList.bBtns.add,
      util.cfList.bBtns.delete,
     
      { text: "生成调试版本Js文件", eventType: "buildDebugJs" },
      {
        uiType: "link",
        text: "生成Js文件并上传七牛云",
        target: "_blank",
        url: `${PUB.domain}/dist/html/tool.html#/toolApiDebug/5ea571f18bce0f5338b95f17`,
        // cfElBtn: {
        //   type: "primary",
        //   icon: "el-icon-user-solid"
        // }
      },

      // { text: "生成Js文件并上传七牛云", eventType: "buildDebugQiNiuJs" },//暂时不好实现
    ]
  },

  sortJsonDefault: { sort: -1 },//默认排序
  //-------详情字段数组-------
  detailItems: ["title",],
  //-------列配置数组-------
  columns: ["item_prop", "item_label", "desc", "sort_edit",],
  //-------筛选表单字段数组-------
  searchFormItems: ["item_prop_search", "label_search",],
  //-------新增、修改表单字段数组-------
  formItems: ["item_prop", "item_label", "desc", "sort", "cfDict", "cfDyDict", "arrCfDItem", "arrCfCItem", "arrCfFItem", "objAddonItem"],

}
util.handleCommonListCF({ _dataType, listCFAddon })//调用：{处理通用列表配置数据函数}
}



          
{
let _dataType = "js_code";
let listCFAddon = {
  breadcrumb: [{ value: "首页", path: "listHome" }, { value: "js代码块" }],
  ...PUB.listCFCommon5,//展开公共配置
  //-------详情字段数组-------
  detailItems: ["_id", "title", "jsCode", "desc", "_userId"],
  //-------列配置数组-------
  columns: ["_id", "title_fixed_edit", "desc","countJsCode"],
  //-------筛选表单字段数组-------
  searchFormItems: ["title_search", "systemId",],
  //-------新增、修改表单字段数组-------
  formItems: ["title","desc", "jsCode",],
}
util.handleCommonListCF({ _dataType, listCFAddon })//调用：{处理通用列表配置数据函数}
}
          
//#region 字段-相关js代码块
{
let prop = "relJsCode", objBase = { label: "相关js代码块", prop, }
D_ITEMS[prop] = { ...objBase, };
COLUMNS[prop] = { ...objBase, width: 70, };
F_ITEMS[prop] = { ...objBase, type: "input" };
F_ITEMS[prop] = {
  ...objBase, type: "select_list_data",
  cfSelectList: {//选择列表配置
      showBtnRefresh: true,
    dataName: "js代码块", valueKey: "_id", labelKey: "title", multiple: true, //多选
    selectJson: { _id: 1, title: 1, }, //需要保留的集合字段
    cfList: util.deepCopy(PUB.listCF.list_js_code),
     componentRow:"dm_com_row_js_code"
  }
};
}
//#endregion
{
let _dataType = "js_file";
let listCFAddon = {
  breadcrumb: [{ value: "首页", path: "listHome" }, { value: "js_文件" }],
  ...PUB.listCFCommon5,//展开公共配置
  singleBtns: {
    addon: [
      ...util.cfList.sBtns.arrAllBtns,
      util.cfList.sBtns.buildDebugJs,
       util.cfList.sBtns.buildProductionJs,

    ]
  },
  //-------详情字段数组-------
  detailItems: ["_id", "title", "fileName","desc","relJsCode",  "_userId"],
  //-------列配置数组-------
  columns: ["_id", "title","fileName", "versionNum", "desc","countJsCode"],
  //-------筛选表单字段数组-------
  searchFormItems: ["file", "systemId",],
  //-------新增、修改表单字段数组-------
  formItems: ["title","fileName", "versionNum", "desc","relJsCode"],
}
util.handleCommonListCF({ _dataType, listCFAddon })//调用：{处理通用列表配置数据函数}
}
PUB.listCF.list_js_code.formItems.push(lodash.cloneDeep(F_ITEMS.relJsCode))//jscode页面补充***


          
              
  
{
let _dataType = "file";
let listCFAddon = {
  breadcrumb: [{ value: "首页", path: "listHome" }, { value: "文件" }],
  ...PUB.listCFCommon5,//展开公共配置

  columnOperate: { "min-width": 320 },
  singleBtns: {
    addon: [
      ...util.cfList.sBtns.arrAllBtns,
      util.cfList.sBtns.download,
      util.cfList.sBtns.openFile,
    ]
  },
  cfForm: {
    col_span: 12, //控制显示一行多列
    watch: PUB.cfForm.watch.file 
  },



  //-------详情字段数组-------
  detailItems: ["_id", "title", "file", "_userId"],
  //-------列配置数组-------
  columns: ["_id", "title_fixed_edit","file",  "desc", "_userId"],
  //-------筛选表单字段数组-------
  searchFormItems: ["title_search", "_userId"],
  //-------新增、修改表单字段数组-------
  formItems: ["title", "file", "desc"],

}
util.handleCommonListCF({ _dataType, listCFAddon })//调用：{处理通用列表配置数据函数}
}







//#region 字段-相关文件
{
let prop = "relFile", objBase = { label: "相关文件", prop, }
D_ITEMS[prop] = { ...objBase, };
COLUMNS[prop] = { ...objBase, width: 70, };
F_ITEMS[prop] = { ...objBase, type: "input" };
F_ITEMS[prop] = {
  ...objBase, type: "select_list_data",
  cfSelectList: {//选择列表配置
    dataName: "文件", valueKey: "_id", labelKey: "title", multiple: true, //多选
    selectJson: { _id: 1, title: 1, }, //需要保留的集合字段
    cfList: util.deepCopy(PUB.listCF.list_file),
     componentRow:"dm_com_row_file"
  }
};
}
//#endregion



          
          
{
  let _dataType = "file_base";
  let listCFAddon = {
      breadcrumb: [{ value: "首页", path: "listHome" }, { value: "基础文件" }],
      ...PUB.listCFCommon2,//展开公共配置


      singleBtns: {
          addon: [
              ...util.cfList.sBtns.arrAllBtns,
              util.cfList.sBtns.link,
          ]
      },



      //-------详情字段数组-------
      detailItems: ["_id", "title", "fileSize", "fileExt", "imgWidth", "imgHeight", "fileBucket", "fileKey", "_userId", "systemId"],
      //-------列配置数组-------
      columns: ["_id", "title_fixed_w150", "fileSource", "fileSize", "fileExt", "imgWidth", "imgHeight", "fileBucket", "link", "fileKey", "uploadTime", "systemId",],
      //-------筛选表单字段数组-------
      searchFormItems: ["title_search", "_userId"],
      //-------新增、修改表单字段数组-------
      formItems: [],

  }
  util.handleCommonListCF({ _dataType, listCFAddon })//调用：{处理通用列表配置数据函数}
}







          
{
  let _dataType = "image";
  let listCFAddon = {
      breadcrumb: [{ value: "首页", path: "listHome" }, { value: "图片" }],
      ...PUB.listCFCommon2,//展开公共配置
      //cfForm新增修改表单的配置
      cfForm: {
          col_span: 12, //控制显示一行多列
          watch: PUB.cfForm.watch.file 
      },
      columnOperate: { "min-width": 320 },
      singleBtns: {
          addon: [
              ...util.cfList.sBtns.arrAllBtns,
              util.cfList.sBtns.download, util.cfList.sBtns.openFile,
          ]
      },
      //-------详情字段数组-------
      detailItems: ["_id", "title", "imagePreview", "file", "fileSize", "fileExt", "imgWidth", "imgHeight", "_userId"],
      //-------列配置数组-------
      columns: ["_id", "imagePreview", "title", "file", "fileSize", "fileExt", "imgWidth", "imgHeight", "_userId"],
      //-------筛选表单字段数组-------
      searchFormItems: ["title_search", "_userId"],
      //-------新增、修改表单字段数组-------
      formItems: ["title", "file"],
  }
  util.handleCommonListCF({ _dataType, listCFAddon })//调用：{处理通用列表配置数据函数}
}

          
{
  let _dataType = "album";
  let listCFAddon = {
      breadcrumb: [{ value: "首页", path: "listHome" }, { value: "相册" }],
      ...PUB.listCFCommon2,//展开公共配置
      //cfForm新增修改表单的配置
      cfForm: {
          col_span: 12, //控制显示一行多列
          watch: PUB.cfForm.watch.file 
      },
 
      //-------详情字段数组-------
      detailItems: ["_id", "title", "_userId"],
      //-------列配置数组-------
      columns: ["_id", "title", "desc", "_userId"],
      //-------筛选表单字段数组-------
      searchFormItems: ["title_search", "_userId"],
      //-------新增、修改表单字段数组-------
      formItems: ["title", "desc"],
  }
  util.handleCommonListCF({ _dataType, listCFAddon })//调用：{处理通用列表配置数据函数}
}

          
              
  
{
  let _dataType = "task";
  let listCFAddon = {
      breadcrumb: [{ value: "首页", path: "listHome" }, { value: "任务" }],
      //dynamicDict动态数据字典配置
      dynamicDict: [
          DYDICT.personCharge,
      ],
      //新增修改表单的配置
      cfForm: {
          col_span: 12, //控制显示一行多列
      },
      ...PUB.listCFCommon2,//展开公共配置
      objParamAddon: {  _dataType },
      //公共的附加参数，针对所有接口
      paramAddonPublic: { _dataType },
      detailItems: ["_id", "title", "taskType", "countSonTask", "sonTaskGId", "prior", "complete", "personCharge", "predictTime", "actualTime", "detail"],
      columns: ["_id", "title_fixed_edit", "sonTaskGId", "taskType", "prior", "complete_com", "personCharge", "predictTime", "actualTime"],
      searchFormItems: ["title_search","complete_search", "taskType", "prior", "personCharge",],
      formItems: ["title", "taskType_radio", "prior_radio", "complete", "personCharge", "predictTime", "actualTime", "detail_new", "sonTaskGId",  "relNoteList"],
  }
  util.handleCommonListCF({_dataType, listCFAddon})//调用：{处理通用列表配置数据函数}
}
{
  PUB.listCF.list_task_my = lodash.cloneDeep(PUB.listCF.list_task);//**** */
  let listIndex = `list_task_my`
  PUB.listCF[listIndex] = {
      ...PUB.listCF.list_task_my,
      isShowBreadcrumb: false,//面包屑
      detailItems: ["_id", "title", "taskType", "prior", "complete", "predictTime", "actualTime"],
      columns: ["_id", "title_fixed_edit", "taskType", "prior", "complete_com", "predictTime", "actualTime"],
      searchFormItems: ["title","complete_search", "taskType", "prior",],
  }
  util.reformCFListItem(PUB.listCF[listIndex])
}

F_ITEMS.sonTask = {
  prop: "sonTask",
label: "子任务",
  type: "select_list_data",
  cfSelectList: {
      //选择列表配置
      dataName: "任务",
      valueKey: "_id",
      labelKey: "title",
      multiple: true, //多选
      //需要保留的集合字段
      selectJson: {
          _id: 1,
          title: 1
      },
      cfList: util.deepCopy(PUB.listCF.list_task)
  }
};
//PUB.listCF.list_task.formItems.push(lodash.cloneDeep(F_ITEMS.sonTask)); //页面补充***
          
          
{
let _dataType = "system";
let listCFAddon = {
  breadcrumb: [ { value: "首页", path: "listHome" }, { value: "系统" } ],
  ...PUB.listCFCommon5,//展开公共配置
  singleBtns: {
    addon: [
      util.cfList.sBtns.detail,
      util.cfList.sBtns.modify,
      util.cfList.sBtns.copy,
      util.cfList.sBtns.delete,
      util.cfList.sBtns.goSystem
    ]
  },
  //-------详情字段数组-------
  detailItems: ["_id", "title","systemId", "desc", "_userId"],
  //-------列配置数组-------
  columns: ["CreateTime","_id","title_fixed_edit", "systemId","desc", "_userId"],
  //-------筛选表单字段数组-------
  searchFormItems: ["title_search","systemId", ],
  //-------新增、修改表单字段数组-------
  formItems: ["title","systemId","logoSrc","iconSrc",   "desc",   "homeGroupId",   "treeDataMenu"],
}
util.handleCommonListCF({_dataType, listCFAddon})//调用：{处理通用列表配置数据函数}
}

          
{
let _dataType = "person";
let listCFAddon = {
  breadcrumb: [{ value: "首页", path: "listHome" }, { value: "人员" }],
  ...PUB.listCFCommon5,//展开公共配置
  //cfForm新增修改表单的配置
  cfForm: {
    col_span: 12, //控制显示一行多列
  },
  objParamAddon: { _dataType},
  //公共的附加参数，针对所有接口
  paramAddonPublic: { _dataType},
  //-------详情字段数组-------
  detailItems: ["_id", "trueName", "desc", "phone", "address", "career", "_userId"],
  //-------列配置数组-------
  columns: ["trueName", "desc", "phone", "address", "career","g_person_file","g_person_url", "_userId"],
  //-------筛选表单字段数组-------
  searchFormItems: ["trueName_search"],
  //-------新增、修改表单字段数组-------
  formItems: ["trueName", "career", "phone", "address", "birthday", "email", "idCard", "qqNumber", "desc", "headSrc","g_person_file",],
}
util.handleCommonListCF({_dataType, listCFAddon})//调用：{处理通用列表配置数据函数}
}
          
{
  let _dataType = "company";
  let listCFAddon = {
      breadcrumb: [{ value: "首页", path: "listHome" }, { value: "公司" }],
      ...PUB.listCFCommon5,//展开公共配置
      //cfForm新增修改表单的配置
      cfForm: {
          col_span: 12, //控制显示一行多列
      },

      objParamAddon: { _dataType },
      //公共的附加参数，针对所有接口
      paramAddonPublic: { _dataType },
      //-------详情字段数组-------
      detailItems: ["_id", "companyName", "desc", "phone", "address", "_userId"],
      //-------列配置数组-------
      columns: ["companyName", "desc", "phone", "address","g_company_person", "g_company_url", "_userId"],
      //-------筛选表单字段数组-------
      searchFormItems: ["companyName_search"],
      //-------新增、修改表单字段数组-------
      formItems: ["companyName", "desc","phone", "address",  ],

  }
  util.handleCommonListCF({ _dataType, listCFAddon })//调用：{处理通用列表配置数据函数}
}
          
PUB.listCF.temp_relList1 = {
isShowToolBar: false,//批量操作栏
isShowSearchForm: false,//查询表单
isShowBreadcrumb: false,//面包屑
isShowPageLinkHasAPage: true,//未满一页不显示分页
cfPagination: { small: true, layout: "total,  prev,  next", }, //分页

}
          
{
let _dataType = "project_case";
let listCFAddon = {
  breadcrumb: [{ value: "首页", path: "listHome" }, { value: "工程案例" }],
  ...PUB.listCFCommon5,//展开公共配置
  //-------详情字段数组-------
  detailItems: ["title", "desc", "link"],
  //-------列配置数组-------
  columns: ["title_fixed", "_id", "desc", "link"],
  //-------筛选表单字段数组-------
  searchFormItems: ["title_search"],
  //-------新增、修改表单字段数组-------
  formItems: ["title", "desc", "album", "detail"],
}
util.handleCommonListCF({ _dataType, listCFAddon })//调用：{处理通用列表配置数据函数}
}

          
              
  //######################




//#region 简历-项目经历
{
  let _dataType = "resume_project_experience";
  let listCFAddon = {
      breadcrumb: [{ value: "首页", path: "listHome" }, { value: "简历-项目经历" }],
      ...PUB.listCFCommon2,//展开公共配置
      detailItems: ["title", "desc", "link"],
      columns: ["title_fixed", "_id", "desc", "link"],
      searchFormItems: ["title_search"],
      formItems: ["title", "link", "desc", "album"],
  }
  util.handleCommonListCF({ _dataType, listCFAddon })//调用：{处理通用列表配置数据函数}
}
//#endregion
          
//#region 简历-工作经历
{
  let _dataType = "resume_work_experience";
  let listCFAddon = {
      breadcrumb: [{ value: "首页", path: "listHome" }, { value: "简历-工作经历" }],
      ...PUB.listCFCommon2,//展开公共配置
      detailItems: ["companyName", "positionName", "onJobPeriod", "descJob"],
      columns: ["companyName", "positionName", "onJobPeriod", "descJob"],
      searchFormItems: ["companyName"],
      formItems: ["companyName", "positionName", "onJobPeriod", "descJob"],
  }
  util.handleCommonListCF({ _dataType, listCFAddon })//调用：{处理通用列表配置数据函数}
}
//#endregion
          
//#region 简历-教育经历
{
  let _dataType = "resume_education_experience";
  let listCFAddon = {
      breadcrumb: [{ value: "首页", path: "listHome" }, { value: "简历-教育经历" }],
      ...PUB.listCFCommon2,//展开公共配置
      detailItems: ["schoolName","inSchoolPeriod","diploma","professionalName", ],
      columns: ["schoolName","inSchoolPeriod","diploma","professionalName", ],
      searchFormItems: ["schoolName"],
      formItems: ["schoolName","inSchoolPeriod","diploma","professionalName", ],
  }
  util.handleCommonListCF({ _dataType, listCFAddon })//调用：{处理通用列表配置数据函数}
}
//#endregion
          
//#region 字段-我的项目经历
{
  let prop = "relProjectExperience", objBase = { label: "我的项目经历", prop, }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = { ...objBase, width: 100, };
  F_ITEMS[prop] = { ...objBase, type: "input" };
  F_ITEMS[prop] = {
      ...objBase, type: "select_list_data",
      cfSelectList: {//选择列表配置
          dataName: "项目经历", valueKey: "_id", labelKey: "title",
          multiple: true, //多选
          selectJson: { _id: 1, title: 1, desc: 1, }, //需要保留的集合字段
          cfList: util.deepCopy(PUB.listCF.list_resume_project_experience)
      }
  };
}
//#endregion
//#region 字段-我的工作经历
{
  let prop = "relWorkExperience", objBase = { label: "我的工作经历", prop, }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = { ...objBase, width: 70, };
  F_ITEMS[prop] = { ...objBase, type: "input" };
  F_ITEMS[prop] = {
      ...objBase, type: "select_list_data",
      cfSelectList: {//选择列表配置
          dataName: "工作经历", valueKey: "_id", labelKey: "companyName", multiple: true, //多选
          selectJson: { _id: 1, companyName: 1, }, //需要保留的集合字段
          cfList: util.deepCopy(PUB.listCF.list_resume_work_experience)
      }
  };
}
//#endregion
//#region 字段-我的教育经历
{
  let prop = "relEducationExperience", objBase = { label: "我的教育经历", prop, }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = { ...objBase, width: 70, };
  F_ITEMS[prop] = { ...objBase, type: "input" };
  F_ITEMS[prop] = {
      ...objBase, type: "select_list_data",
      cfSelectList: {//选择列表配置
          dataName: "教育经历", valueKey: "_id", labelKey: "schoolName", multiple: true, //多选
          selectJson: { _id: 1, schoolName: 1, }, //需要保留的集合字段
          cfList: util.deepCopy(PUB.listCF.list_resume_education_experience)
      }
  };
}
//#endregion
//#region 简历-放最下面，因为要引用上面的列表配置
{
  let _dataType = "resume";
  let listCFAddon = {
      breadcrumb: [{ value: "首页", path: "listHome" }, { value: "简历" }],
      ...PUB.listCFCommon2,//展开公共配置
      detailItems: ["trueName", "phone", "email", "desc", "avatarImg",
      "relWorkExperience", "relProjectExperience","relEducationExperience",],
      columns: ["trueName", "phone", "email", "desc", "avatarImg",],
      searchFormItems: ["trueName_search"],
      formItems: ["trueName", "phone", "email", "desc", "avatarImg",
       "relWorkExperience", "relProjectExperience","relEducationExperience",],
  }
  util.handleCommonListCF({ _dataType, listCFAddon })//调用：{处理通用列表配置数据函数}
}
//#endregion
          
              
  
//#region 生成的word文件
{
let listIndex = "list_file_built";
  let _dataType = "file";
  let listCFAddon = {
      breadcrumb: [{ value: "首页", path: "listHome" }, { value: "生成的文件" }],
      ...PUB.listCFCommon2,//展开公共配置
     paramAddonPublic: {
              _dataType,originType:2
          },
    //objParamAddon列表接口的附加参数
      objParamAddon: {
        _dataType,
        findJson:{ originType: 2}//查询参数
       
      },
formDataAddInit:{ originType: 2},
    
      detailItems: ["title","desc"],
      columns:  ["title_fixed_w380","_idRel","dataBuilt",],//"
      searchFormItems:  ["title_search",],
      formItems:  ["title","desc","_idRel","dataBuilt",],
  }
  util.handleCommonListCF({ _dataType, listIndex,listCFAddon })//调用：{处理通用列表配置数据函数}
}
//#endregion
          
//#region 文件模板
{
  let _dataType = "file_template";
  let listCFAddon = {
      breadcrumb: [{ value: "首页", path: "listHome" }, { value: "文件模板" }],
      ...PUB.listCFCommon2,//展开公共配置
      detailItems: ["title","desc"],
      columns:  ["title_fixed_w380","desc","path_temp","data_form",],//"
      searchFormItems:  ["title_search",],
      formItems:  ["title","desc","path_temp","data_form",],
  }
  util.handleCommonListCF({ _dataType, listCFAddon })//调用：{处理通用列表配置数据函数}
}
//#endregion
          
//#region 涉案信息
{
  let _dataType = "involved_case";
  let listCFAddon = {
      breadcrumb: [{ value: "首页", path: "listHome" }, { value: "涉案信息" }],
      ...PUB.listCFCommon2,//展开公共配置
    singleBtns: PUB.singleBtns5,
     //dynamicDict动态数据字典配置
      dynamicDict: [
          DYDICT.personCharge,
      ],
      detailItems: ["caseId","judgesAndAssistants","caseParty","dateFiling","dateClosing","caseStatus","caseCourt","desc","_idRel",],
      columns:  ["caseId","judgesAndAssistants","caseParty","dateFiling","dateClosing","caseStatus","caseCourt","desc",],//"g_bankruptcy_file_1", "g_bankruptcy_file_2", 
      searchFormItems:  ["caseId",],
      formItems:  ["caseId","judgesAndAssistants","caseParty","dateFiling","dateClosing","caseStatus","caseCourt","desc",],//,"_idRel"
  }
  util.handleCommonListCF({ _dataType, listCFAddon })//调用：{处理通用列表配置数据函数}
}
//#endregion
          
//#region 破产案件
{
  let _dataType = "seal_use_record";
  let listCFAddon = {
      breadcrumb: [{ value: "首页", path: "listHome" }, { value: "公章使用记录" }],
      ...PUB.listCFCommon2,//展开公共配置
    singleBtns: PUB.singleBtns5,
     //dynamicDict动态数据字典配置
      dynamicDict: [
          DYDICT.personCharge,
      ],
      detailItems:  ["fileNum","useDesc","useDate","applicant","undertaker","approver","_idRel",],
      columns:  ["fileNum","useDesc","useDate","applicant","undertaker","approver",],//"g_bankruptcy_file_1", "g_bankruptcy_file_2", 
      searchFormItems:  ["fileNum",],
      formItems:  ["fileNum","useDesc","useDate","applicant","undertaker","approver",],
  }
  util.handleCommonListCF({ _dataType, listCFAddon })//调用：{处理通用列表配置数据函数}
}
//#endregion
          
//#region 破产案件
{
  let _dataType = "bankruptcy_case";
  let listCFAddon = {
      breadcrumb: [{ value: "首页", path: "listHome" }, { value: "案件" }],
      ...PUB.listCFCommon2,//展开公共配置
    singleBtns: PUB.singleBtns5,
    comDetail:"detail_bankruptcy_case",//启用自定义详情组件
     //dynamicDict动态数据字典配置
      dynamicDict: [
          DYDICT.personCharge,
      ],
      detailItems: ["title","desc"],
      columns:  ["title_fixed_w380","caseId","personCharge","caseStatus"],//"g_bankruptcy_file_1", "g_bankruptcy_file_2", 
      searchFormItems:  ["title_search",],
      formItems:  ["title","caseId","personCharge","caseStatus"],
  }
  util.handleCommonListCF({ _dataType, listCFAddon })//调用：{处理通用列表配置数据函数}
}
//#endregion
          
              
  PUB.cfSelectList = PUB.cfSelectList || {}
PUB.cfSelectList.file_template = {
  dataName: "文件模板",
  valueKey: "_id",
  labelKey: "title",
  multiple: false, //禁止多选
  //需要保留的集合字段
  selectJson: { _id: 1, title: 1, link: 1 },
  cfList: PUB.listCF.list_file_template
}
              
  
//#region 分组下的视频列表页
{
  let _dataType = "relation";
  let listIndex = "detail_group_vedio"
  PUB.listCF[listIndex] = {
      ...PUB.cfListGPublic,
      listIndex, //vuex对应的字段~
      objParamAddon: { findJson: {}, _dataType },
      paramAddonPublic: { _dataType },//公共的附加参数，针对所有接口
      //dynamicDict动态数据字典配置
      dynamicDict: [DYDICT.note_category],
      //-------详情字段数组-------
      detailItems: ["title", "desc", "countData", "_id", "_idRel", "_idRel2", "sort"],
      //-------列配置数组-------
      columns: ["title_fixed", "_id", "desc", "link", "sort"],
      //-------筛选表单字段数组-------
      searchFormItems: ["title_search",],
      //-------新增、修改表单字段数组-------
      formItems: ["_idRel", "_idRel2", "sort"],
  }
  util.reformCFListItem(PUB.listCF[listIndex])
}
//#endregion
          

//#region 分组下的商品列表页
{
let _dataType = "relation";


PUB.listCF.detail_group_goods = {
  ...PUB.cfListGPublic,
  listIndex: "detail_group_goods", //vuex对应的字段~
  singleBtns: PUB.singleBtns_copy_detail_sort,


  objParamAddon: {
    findJson: {},
    _dataType
  },
  //公共的附加参数，针对所有接口
  paramAddonPublic: {
    _dataType
  },

  //-------详情字段数组-------
  detailItems: ["title", "desc", "countData", "_id", "_idRel", "_idRel2", "sort"],
  //-------列配置数组-------
  columns: ["title_fixed", "_id", "desc", "link", "sort"],
  //-------筛选表单字段数组-------
  searchFormItems: [],
  //-------新增、修改表单字段数组-------
  formItems: ["_idRel", "_idRel2", "sort"],



}
util.reformCFListItem(PUB.listCF.detail_group_goods)
}
//#endregion
          

//#region 分组下的网址列表页
{
let _dataType = "relation";
let listIndex = "detail_group_url"
PUB.listCF[listIndex] = {
  ...PUB.cfListGPublic,
  listIndex, //vuex对应的字段~
  singleBtns: {
    addon: [
      ...PUB.singleBtns_list_group_data.addon,
      util.cfList.sBtns.link
    ]
  },
  objParamAddon: { findJson: {}, _dataType },
  paramAddonPublic: { _dataType },//公共的附加参数，针对所有接口
  //dynamicDict动态数据字典配置
  dynamicDict: [DYDICT.note_category],
  //-------详情字段数组-------
  detailItems: ["title", "desc", "countData", "_id", "_idRel", "_idRel2", "sort"],
  //-------列配置数组-------
  columns: ["title_fixed", "_id", "desc", "link", "sort"],
  //-------筛选表单字段数组-------
  searchFormItems: ["title_search",],
  //-------新增、修改表单字段数组-------
  formItems: ["_idRel", "_idRel2", "sort"],
}
util.reformCFListItem(PUB.listCF[listIndex])
}
//#endregion
          
//#region 分组下的人员列表页
{
let listIndex = "detail_group_person"
let _dataType = "relation";
PUB.listCF[listIndex] = {
  ...PUB.cfListGPublic, listIndex, //vuex对应的字段~
  //列表单项操作按钮的配置
  singleBtns: {
    addon: [
      ...PUB.singleBtns_list_group_data.addon,
    ]
  },
  objParamAddon: { findJson: {}, _dataType },
  paramAddonPublic: { _dataType },//公共的附加参数，针对所有接口
  //-------详情字段数组-------
  detailItems: ["title", "desc", "countData", "_id", "_idRel", "_idRel2", "sort"],
  //-------列配置数组-------
  columns: ["trueName", "phone","g_person_file","g_person_image","g_person_album",  "g_person_url",  "sort"],
  //-------筛选表单字段数组-------
  searchFormItems: ["trueName_search", "phone"],
  //-------新增、修改表单字段数组-------
  formItems: ["_idRel", "_idRel2", "sort"],


}
//需要补充的拆解字段****
PUB.$projectAddon[listIndex] = {
  trueName: "$targetDoc.trueName", phone: "$targetDoc.phone",
  g_person_file: "$targetDoc.g_person_file", count_person_file: "$targetDoc.count_person_file",
  g_person_url: "$targetDoc.g_person_url", count_person_url: "$targetDoc.count_person_url",
   g_person_image: "$targetDoc.g_person_image", count_person_image: "$targetDoc.count_person_image",
  g_person_album: "$targetDoc.g_person_album", count_person_album: "$targetDoc.count_person_album",
}


util.reformCFListItem(PUB.listCF[listIndex])
}
//#endregion
          
//#region 分组下的公司列表页
{
let listIndex = "detail_group_company"
let _dataType = "relation";
PUB.listCF[listIndex] = {
  ...PUB.cfListGPublic, listIndex, //vuex对应的字段~
  //列表单项操作按钮的配置
  singleBtns: {
    addon: [
      ...PUB.singleBtns_list_group_data.addon,
    ]
  },
  objParamAddon: { findJson: {}, _dataType },
  paramAddonPublic: { _dataType },//公共的附加参数，针对所有接口
  //-------详情字段数组-------
  detailItems: ["title", "desc", "countData", "_id", "_idRel", "_idRel2", "sort"],
  //-------列配置数组-------
  columns: ["companyName", "g_company_person","g_company_url", "g_company_file",  "g_company_image","g_company_album",  "sort"],
  //-------筛选表单字段数组-------
  searchFormItems: ["trueName_search", "phone"],
  //-------新增、修改表单字段数组-------
  formItems: ["_idRel", "_idRel2", "sort"],


}
//需要补充的拆解字段****
PUB.$projectAddon[listIndex] = {
  companyName: "$targetDoc.companyName", 
  g_company_person: "$targetDoc.g_company_person", count_company_person: "$targetDoc.count_company_person",
   g_company_url: "$targetDoc.g_company_url", count_company_url: "$targetDoc.count_company_url",
   g_company_file: "$targetDoc.g_company_file", count_company_file: "$targetDoc.count_company_file",
   g_company_image: "$targetDoc.g_company_image", count_company_image: "$targetDoc.count_company_image",
   g_company_album: "$targetDoc.g_company_album", count_company_album: "$targetDoc.count_company_album",
}


util.reformCFListItem(PUB.listCF[listIndex])
}
//#endregion
          
//#region 分组下的相册列表页
{
let listIndex = "detail_group_album"
let _dataType = "relation";
PUB.listCF[listIndex] = {
  ...PUB.cfListGPublic, listIndex, //vuex对应的字段~
  //列表单项操作按钮的配置
  singleBtns: {
    addon: [
      ...PUB.singleBtns_list_group_data.addon,
    ]
  },
  objParamAddon: { findJson: {}, _dataType },
  paramAddonPublic: { _dataType },//公共的附加参数，针对所有接口
  //-------详情字段数组-------
  detailItems: ["title", "desc", "countData", "_id", "_idRel", "_idRel2", "sort"],
  //-------列配置数组-------
  columns: ["title", "desc","g_album_image", "sort"],
  //-------筛选表单字段数组-------
  searchFormItems: ["title_search", "phone"],
  //-------新增、修改表单字段数组-------
  formItems: ["_idRel", "_idRel2", "sort"],


}
//需要补充的拆解字段****
PUB.$projectAddon[listIndex] = {
  trueName: "$targetDoc.trueName", phone: "$targetDoc.phone",
  g_album_image: "$targetDoc.g_album_image", count_album_image: "$targetDoc.count_album_image",

}


util.reformCFListItem(PUB.listCF[listIndex])
}
//#endregion
          

//#region 分组下的图片列表页
{
let listIndex = "detail_group_image"
let _dataType = "relation";
PUB.listCF[listIndex] = {
  ...PUB.cfListGPublic, listIndex, //vuex对应的字段~
  //列表单项操作按钮的配置
  singleBtns: {
    addon: [
      ...PUB.singleBtns_list_group_data.addon,
      util.cfList.sBtns.download,
      util.cfList.sBtns.openFile,
    ]
  },
  listIndex: "detail_group_image", //vuex对应的字段~
  objParamAddon: { findJson: {}, _dataType },
  paramAddonPublic: { _dataType },//公共的附加参数，针对所有接口
  //-------详情字段数组-------
  detailItems: ["title", "desc", "countData", "_id", "_idRel", "_idRel2", "sort"],
  //-------列配置数组-------
  columns: ["imagePreview", "title", "file", "sort","drag", ],
  //-------筛选表单字段数组-------
  searchFormItems: ["title_search",],
  //-------新增、修改表单字段数组-------
  formItems: ["_idRel", "_idRel2", "sort"],
}
util.reformCFListItem(PUB.listCF[listIndex])
//需要补充的拆解字段****
PUB.$projectAddon[listIndex] = {
  file: "$targetDoc.file",
}

}
//#endregion
          
//#region 分组下的文件列表页
{
let listIndex = "detail_group_file"
let _dataType = "relation";
PUB.listCF[listIndex] = {
...PUB.cfListGPublic, listIndex, //vuex对应的字段~
// isShowPageLink: false,//分页链接
isShowOperateColumn: false,//单项操作列
//列表单项操作按钮的配置
singleBtns: {
  addon: [
    ...PUB.singleBtns_list_group_data.addon,
    util.cfList.sBtns.download, util.cfList.sBtns.openFile,
  ]
},

objParamAddon: { findJson: {}, _dataType },
paramAddonPublic: { _dataType },//公共的附加参数，针对所有接口
//-------详情字段数组-------
detailItems: ["title", "desc", "countData", "_id", "_idRel", "_idRel2", "sort"],
//-------列配置数组-------
columns: ["title_fixed_w380","desc","drag", "operate_g_file"],
//-------筛选表单字段数组-------
searchFormItems: ["title_search",],
//-------新增、修改表单字段数组-------
formItems: ["_idRel", "_idRel2", "sort"],
}
util.reformCFListItem(PUB.listCF[listIndex])
//需要补充的拆解字段****
PUB.$projectAddon[listIndex] = {
file: "$targetDoc.file", desc: "$targetDoc.desc",originType: "$targetDoc.originType",
}

}
//#endregion
          
{
  let listIndex = "detail_group_task"
  let _dataType = "relation";
  PUB.listCF[listIndex] = {
      cfElTable: {
          lazy: true,
          "tree-props": { children: 'children', hasChildren: 'countSonTask' },
          load: async function (doc, treeNode, resolve) {
              let { sonTaskGId } = doc
              let arrLookup = FN.getArrLookupFixed(listIndex)//调用：{根据页面listIndex获取分组数据列表的联合查询参数的固定部分}
              console.log(`arrLookup:`, arrLookup);
              //变量：{ajax查询参数}
              let ajaxParams = {
                  "findJson": { "_idRel": sonTaskGId },
                  "pageIndex": 1, "pageSize": 50, "_systemId": "$all", "_dataType": "relation",
                  arrLookup,
                  "sortJson": { "sort": -1 },
                  "selectJson": { "_id": 1, "title": 1, "taskType": 1, "prior": 1, "sonTaskGId": 1, "countSonTask": 1, "complete": 1, "personCharge": 1, "predictTime": 1, "actualTime": 1, "sort": 1, "operateRelData": 1, "operateEntityData": 1 }
              }
              let {
                  data: { list }
              } = await axios({
                  method: "post", url: `${PUB.domain}/info/getCommonList`, data: ajaxParams
              });
              ///info/getCommonList
              {//ajax填充动态数据字典-负责人
                  let paramPopulate = lodash.cloneDeep(DYDICT.personCharge);
                  paramPopulate.listData = list;
                  list = await util.ajaxPopulate(paramPopulate);//调用：{ajax填充动态数据字典}  
              }

              console.log(`list:#`, list);
              // console.log(`treeNode:`, treeNode);
              resolve(list)//返回列表
          },
      },
      ...PUB.cfListGPublic, listIndex, //vuex对应的字段~
      isShowOperateColumn: false,//单项操作列
      //列表单项操作按钮的配置
      objParamAddon: { findJson: {}, _dataType },
      paramAddonPublic: { _dataType },//公共的附加参数，针对所有接口
      dynamicDict: [DYDICT.personCharge,],
      //-------详情字段数组-------
      detailItems: ["title", "desc", "countData", "_id", "_idRel", "_idRel2", "sort"],
      //-------列配置数组-------"operateRelData", 
      columns: ["title_fixed_w380", "sonTaskGId", "taskType", "prior", "complete_com_g", "personCharge", "predictTime", "actualTime", "sort", "drag", "operateEntityData"],
      //-------筛选表单字段数组-------
      searchFormItems: ["title_search", "complete_search", "prior", "personCharge",],
      //-------新增、修改表单字段数组-------
      formItems: ["_idRel", "_idRel2", "sort"],
  }
  util.reformCFListItem(PUB.listCF[listIndex])
  //需要补充的拆解字段****
  PUB.$projectAddon[listIndex] = {
      taskType: "$targetDoc.taskType", prior: "$targetDoc.prior", complete: "$targetDoc.complete",
      personCharge: "$targetDoc.personCharge", predictTime: "$targetDoc.predictTime", actualTime: "$targetDoc.actualTime",
      sonTaskGId: "$targetDoc.sonTaskGId", countSonTask: "$targetDoc.countSonTask",
  }
}
          

//#region 分组下的demo列表页
{
let listIndex = "detail_group_front_demo"
let _dataType = "relation";
PUB.listCF[listIndex] = {
  ...PUB.cfListGPublic, listIndex, //vuex对应的字段~
  //列表单项操作按钮的配置
  singleBtns: {
    addon: [
      ...PUB.singleBtns_list_group_data.addon,
      util.cfList.sBtns.link
    ]
  },
  objParamAddon: { findJson: {}, _dataType },
  paramAddonPublic: { _dataType },//公共的附加参数，针对所有接口
  //-------详情字段数组-------
  detailItems: ["title", "desc", "countData", "_id", "_idRel", "_idRel2", "sort"],
  //-------列配置数组-------
  columns: ["title_fixed", "_id", "desc", "link", "sort"],
  //-------筛选表单字段数组-------
  searchFormItems: ["title_search",],
  //-------新增、修改表单字段数组-------
  formItems: ["_idRel", "_idRel2", "sort"],
}
util.reformCFListItem(PUB.listCF[listIndex])
}
//#endregion
          
//#region 分组下的笔记列表页
{
  let _dataType = "relation";
  let listIndex = "detail_group_note"
  PUB.listCF[listIndex] = {
      ...PUB.cfListGPublic,
      cfElTable: {
          lazy: true,
          "tree-props": { children: 'children', hasChildren: 'countSonNote' },
          load: async function (doc, treeNode, resolve) {
              let { sonNoteGId } = doc
              let arrLookup = FN.getArrLookupFixed(listIndex)//调用：{根据页面listIndex获取分组数据列表的联合查询参数的固定部分}
              console.log(`arrLookup:`, arrLookup);
              //变量：{ajax查询参数}
              let ajaxParams = {
                  "findJson": { "_idRel": sonNoteGId },
                  "pageIndex": 1, "pageSize": 50, "_systemId": "$all", "_dataType": "relation",
                  arrLookup,
                  "sortJson": { "sort": -1 },
                  "selectJson": { "_id": 1, "title": 1, "familiarity": 1, "sonNoteGId": 1, "countSonNote": 1, "importance": 1, "difficulty": 1, "category": 1, "sort": 1, "operateRelData": 1, "operateEntityData": 1 }
              }
              let {
                  data: { list }
              } = await axios({
                  method: "post", url: `${PUB.domain}/info/getCommonList`, data: ajaxParams
              });
              {
                  //填充动态数据字典-分类
                  let paramPopulate = lodash.cloneDeep(DYDICT.note_category);
                  paramPopulate.listData = list;
                  list = await util.ajaxPopulate(paramPopulate);//调用：{ajax填充动态数据字典}
              }
              {
                  //填充动态数据字典-熟悉度
                  let paramPopulate = lodash.cloneDeep(PUB.dydictNoteFamiliarity);
                  paramPopulate.listData = list;
                  list = await util.ajaxPopulate(paramPopulate);//调用：{ajax填充动态数据字典}
              }
              resolve(list)//返回列表
          },
      },
      isShowOperateColumn: false,//单项操作列
      comDetail:"detail_data",//启用自定义详情组件
      listIndex, //vuex对应的字段~
      //批量操作按钮的配置
      batchBtns: {
          addon: [
              ...PUB.cfListGPublic.batchBtns.addon,
              // { uiType: "slot", slot: "slot_in_toolbar" },
              { uiType: "component", component: "com_score_panel", ref: "score_panel" },
          ],
      },
      //列表单项操作按钮的配置
      // singleBtns: PUB.singleBtns_copy_detail_sort,
      singleBtns: {
          addon: [
              ...PUB.singleBtns_list_group_data.addon,
          ]
      },
      objParamAddon: { findJson: {}, _dataType },
      paramAddonPublic: { _dataType },//公共的附加参数，针对所有接口
      //dynamicDict动态数据字典配置
      dynamicDict: [DYDICT.note_category],
      //-------详情字段数组-------
      detailItems: ["title", "detail", "desc", "category", "importance", "_id", "_idRel", "_idRel2", "sort"],
      //-------列配置数组-------
      columns: ["title_fixed_w380", "sonNoteGId", "familiarity_select", "importance", "difficulty", "sort", "drag", "operateEntityData"],//"category_multiple", 
      //-------筛选表单字段数组-------
      searchFormItems: ["title_search", "importance", "difficulty",],
      //-------新增、修改表单字段数组-------
      formItems: ["_idRel", "_idRel2", "sort"],
  }
  util.reformCFListItem(PUB.listCF[listIndex])
  //需要补充的拆解字段****
  PUB.$projectAddon[listIndex] = {
      importance: "$targetDoc.importance", difficulty: "$targetDoc.difficulty", sonNoteGId: "$targetDoc.sonNoteGId", countSonNote: "$targetDoc.countSonNote",
  }
}
//#endregion
          

//#region 分组下的分组列表页
{
let _dataType = "relation";
let listIndex = "detail_group_group"
PUB.listCF[listIndex] = {
  ...PUB.cfListGPublic,
  listIndex, //vuex对应的字段~
  //列表单项操作按钮的配置
  singleBtns: {
    addon: [
      ...PUB.singleBtns_list_group_data.addon,
      util.cfList.sBtns.linkGroup
    ]
  },
  objParamAddon: { findJson: {}, _dataType },
  paramAddonPublic: { _dataType },//公共的附加参数，针对所有接口
  dynamicDict: [DYDICT.note_category], //dynamicDict动态数据字典配置
  //-------详情字段数组-------
  detailItems: ["title", "desc", "countData", "_id", "_idRel", "_idRel2", "sort"],
  //-------列配置数组-------
  columns: ["title_fixed", "countData", "myScore", "group_dataType", "desc", "sort"],
  //-------筛选表单字段数组-------
  searchFormItems: ["title_search",],
  //-------新增、修改表单字段数组-------
  formItems: ["_idRel", "_idRel2", "sort"],
}
//#endregion
util.reformCFListItem(PUB.listCF[listIndex])
//需要补充的拆解字段****
PUB.$projectAddon[listIndex] = {
  dataType: "$targetDoc.dataType",
  countData: "$targetDoc.countData"
}
}
//#endregion

          
              
  const store = new Vuex.Store({//定义Vuex的存储对象
state: {
  debug: false,
  activeMenuIndex: "",//当前激活的菜单index
  listState: {//存放列表的共享状态，
  },
  defultFindJson: {//存放列表的默认查询参数，
    // list_article:{articleCategory:3  }
  },
  arrLookup: {//存放列表的联合查询参数值，
    // list_article:{articleCategory:3  }
  },
},
mutations: {//变更事件
  setDebug(state, param) {//设置debug模式
    state.debug = param;
  },
  setListArrLookup(state, param) {//设置列表的联合查询参数值
    state.arrLookup[param.listIndex] = param.arrLookup;
    //对listState进行整个对象的变更（深拷贝），因为listState是有注册的，可以触发响应
    state.arrLookup = lodash.cloneDeep(state.arrLookup);  //深拷贝
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


  openDialogDetail(state, param) {//打开详情弹窗事件
    state.listState[param.listIndex].isShowDialogDetail = true;
    state.listState[param.listIndex].row = param.row;//将行数据保存到vuex
  },
  closeDialogDetail(state, listIndex) {//关闭详情弹窗事件
    state.listState[listIndex].isShowDialogDetail = false;
  },
}
})




Vue.prototype.$store = store//让vue实例中可访问$store
              