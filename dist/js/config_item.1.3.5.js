"use strict";

var _systemId = PUB._systemId;
window.DYDICT = window.DYDICT || {}; //公共数据字典对象
window.D_ITEMS = window.D_ITEMS || {}; //详情字段对象
window.COLUMNS = window.COLUMNS || {}; //列字段对象
window.F_ITEMS = window.F_ITEMS || {}; //表单字段对象
var styleMenuPowerItem = "margin-bottom:10px;padding:0 5px";
var styleMenuGPowerItem = "margin-bottom:0;border:none;padding:0";
//函数定义：{获取菜单权限表单配置函数}
function getFormMenuGPower(_ref) {
  var _ref$menuName = _ref.menuName,
      menuName = _ref$menuName === undefined ? "XXX" : _ref$menuName;

  return {
    col_span: 4,
    labelWidth: "10px",
    formItems: [{
      label: "",
      prop: "menuName",
      default: menuName,
      col_span: 4,
      type: "text"
    }, {
      label: "",
      prop: "add",
      col_span: 3,
      type: "checkbox",
      default: false,
      options: [{ value: "1", label: "添加" }]
    }, {
      label: "",
      prop: "copy",
      col_span: 3,
      type: "checkbox",
      default: false,
      options: [{ value: "1", label: "复制" }]
    }, {
      label: "",
      prop: "modify",
      col_span: 3,
      type: "checkbox",
      default: false,
      options: [{ value: "1", label: "修改" }]
    }, {
      label: "",
      prop: "search",
      col_span: 3,
      type: "checkbox",
      default: false,
      options: [{ value: "1", label: "查询" }]
    }, {
      label: "",
      prop: "delete",
      col_span: 3,
      type: "checkbox",
      default: false,
      options: [{ value: "1", label: "删除" }]
    }, {
      label: "",
      prop: "sort",
      col_span: 3,
      type: "checkbox",
      default: false,
      options: [{ value: "1", label: "移位" }]
    }]
  };
}

//字段priceSell:销售价


D_ITEMS.priceSell = { "prop": "priceSell", "label": "销售价" };

COLUMNS.priceSell = { "prop": "priceSell", "label": "销售价", "fixed": false, "edit": false, "width": 90 };

F_ITEMS.priceSell = { "prop": "priceSell", "label": "销售价", "type": "number" };
//字段fileSize:存储大小


D_ITEMS.fileSize = { "prop": "fileSize", "label": "存储大小" };

COLUMNS.fileSize = { "prop": "fileSize", "label": "存储大小", "width": 70, "edit": false, "fixed": false };

F_ITEMS.fileSize = { "prop": "fileSize", "label": "存储大小", "type": "number" };
//字段complete_search:完成度


D_ITEMS.complete_search = { "prop": "complete_search", "label": "完成度" };

COLUMNS.complete_search = { "prop": "complete_search", "label": "完成度", "width": 130, "edit": false, "fixed": false };

F_ITEMS.complete_search = { "prop": "complete_search", "label": "完成度", "component": "com_item_complete_search" };
//字段auditStatus:审核状态
DYDICT.arr_auditStatus = [{ "label": "未审核", "value": 1 }, { "label": "审核不通过", "value": 2 }, { "label": "审核通过", "value": 3 }];DYDICT.auditStatus = { "1": { "label": "未审核", "value": 1 }, "2": { "label": "审核不通过", "value": 2 }, "3": { "label": "审核通过", "value": 3 } };

D_ITEMS.auditStatus = { "prop": "auditStatus", "label": "审核状态", "formatter": function formatter(rowData) {
    return lodash.get(DYDICT.auditStatus, rowData.auditStatus + ".label");
  } };

COLUMNS.auditStatus = { "prop": "auditStatus", "label": "审核状态", "edit": false, "fixed": false, "formatter": function formatter(rowData) {
    return lodash.get(DYDICT.auditStatus, rowData.auditStatus + ".label");
  } };

F_ITEMS.auditStatus = { "prop": "auditStatus", "label": "审核状态", "type": "select", "options": DYDICT.arr_auditStatus };
//字段iconSrc:icon地址


D_ITEMS.iconSrc = { "prop": "iconSrc", "label": "icon地址" };

COLUMNS.iconSrc = { "prop": "iconSrc", "label": "icon地址", "width": 70, "edit": false, "fixed": false };

F_ITEMS.iconSrc = { "prop": "iconSrc", "label": "icon地址", "type": "upload_single", "cfUpload": {} };
//字段_systemId:系统Id


D_ITEMS._systemId = { "prop": "_systemId", "label": "系统Id" };

COLUMNS._systemId = { "prop": "_systemId", "label": "系统Id", "width": 100, "edit": true, "fixed": false };

F_ITEMS._systemId = { "prop": "_systemId", "label": "系统Id", "ajax": { param: { _systemId: _systemId, _dataType: "system" }, url: "/info/getCommonList", keyLabel: "title", keyValue: "systemId" }, "multiple": true };
//字段uploadTime:上传时间


D_ITEMS.uploadTime = { "prop": "uploadTime", "label": "上传时间" };

COLUMNS.uploadTime = { "prop": "uploadTime", "label": "上传时间", "width": 70, "edit": false, "fixed": false };

F_ITEMS.uploadTime = { "prop": "uploadTime", "label": "上传时间" };
//字段fileSource:来源类型


D_ITEMS.fileSource = { "prop": "fileSource", "label": "来源类型" };

COLUMNS.fileSource = { "prop": "fileSource", "label": "来源类型", "fixed": false, "edit": false, "width": 70 };

F_ITEMS.fileSource = { "prop": "fileSource", "label": "来源类型" };
//字段fileKey:文件key


D_ITEMS.fileKey = { "prop": "fileKey", "label": "文件key" };

COLUMNS.fileKey = { "prop": "fileKey", "label": "文件key", "width": 70, "edit": false, "fixed": false };

F_ITEMS.fileKey = { "prop": "fileKey", "label": "文件key" };
//字段fileBucket:桶名


D_ITEMS.fileBucket = { "prop": "fileBucket", "label": "桶名" };

COLUMNS.fileBucket = { "prop": "fileBucket", "label": "桶名", "width": 70, "edit": false, "fixed": false };

F_ITEMS.fileBucket = { "prop": "fileBucket", "label": "桶名" };
//字段imgHeight:图片高度


D_ITEMS.imgHeight = { "prop": "imgHeight", "label": "图片高度" };

COLUMNS.imgHeight = { "prop": "imgHeight", "label": "图片高度", "fixed": false, "edit": false, "width": 70 };

F_ITEMS.imgHeight = { "prop": "imgHeight", "label": "图片高度", "type": "number" };
//字段imgWidth:图片宽度


D_ITEMS.imgWidth = { "prop": "imgWidth", "label": "图片宽度" };

COLUMNS.imgWidth = { "prop": "imgWidth", "label": "图片宽度", "width": 70, "edit": false, "fixed": false };

F_ITEMS.imgWidth = { "prop": "imgWidth", "label": "图片宽度", "type": "number" };
//字段fileExt:文件后缀


D_ITEMS.fileExt = { "prop": "fileExt", "label": "文件后缀" };

COLUMNS.fileExt = { "prop": "fileExt", "label": "文件后缀", "width": 70, "edit": false, "fixed": false };

F_ITEMS.fileExt = { "prop": "fileExt", "label": "文件后缀" };
//字段homeGroupId:首页专题Id


D_ITEMS.homeGroupId = { "prop": "homeGroupId", "label": "首页专题Id" };

COLUMNS.homeGroupId = { "prop": "homeGroupId", "label": "首页专题Id", "width": 90, "edit": false, "fixed": false };

F_ITEMS.homeGroupId = { "prop": "homeGroupId", "label": "首页专题Id" };
//字段treeDataMenu:菜单数据


D_ITEMS.treeDataMenu = { "prop": "treeDataMenu", "label": "菜单数据" };

COLUMNS.treeDataMenu = { "prop": "treeDataMenu", "label": "菜单数据", "edit": false, "fixed": false };

F_ITEMS.treeDataMenu = { "prop": "treeDataMenu", "label": "菜单数据", "type": "tree_data", "cfItem": { idKey: "index", cfTree: { props: { children: 'menuItem', label: 'title' } }, cfForm: { formItems: [F_ITEMS["title"], F_ITEMS["menuIndex"], F_ITEMS["menuRoute"], F_ITEMS["menuIcon"]] } } };
//字段treeData1:树状数据


D_ITEMS.treeData1 = { "prop": "treeData1", "label": "树状数据" };

COLUMNS.treeData1 = { "prop": "treeData1", "label": "树状数据", "width": 70, "edit": false, "fixed": false };

F_ITEMS.treeData1 = { "prop": "treeData1", "label": "树状数据", "type": "tree_data" };
//字段route:路由地址


D_ITEMS.route = { "prop": "route", "label": "路由地址" };

COLUMNS.route = { "prop": "route", "label": "路由地址", "width": 70, "edit": false, "fixed": false };

F_ITEMS.route = { "prop": "route", "label": "路由地址" };
//字段index:菜单索引值


D_ITEMS.index = { "prop": "index", "label": "菜单索引值" };

COLUMNS.index = { "prop": "index", "label": "菜单索引值", "width": 70, "edit": false, "fixed": false };

F_ITEMS.index = { "prop": "index", "label": "菜单索引值", "tips": "该值不允许重复" };
//字段icon:图标样式名


D_ITEMS.icon = { "prop": "icon", "label": "图标样式名" };

COLUMNS.icon = { "prop": "icon", "label": "图标样式名", "width": 70, "edit": false, "fixed": false };

F_ITEMS.icon = { "prop": "icon", "label": "图标样式名" };
//字段receiverName:收货人


D_ITEMS.receiverName = { "prop": "receiverName", "label": "收货人" };

COLUMNS.receiverName = { "prop": "receiverName", "label": "收货人", "width": 70, "edit": false, "fixed": false };

F_ITEMS.receiverName = { "prop": "receiverName", "label": "收货人" };
//字段logoSrc:站点logo


D_ITEMS.logoSrc = { "prop": "logoSrc", "label": "站点logo" };

COLUMNS.logoSrc = { "prop": "logoSrc", "label": "站点logo", "edit": false, "fixed": false };

F_ITEMS.logoSrc = { "prop": "logoSrc", "label": "站点logo", "type": "upload_single", "cfItem": { isAvatar: true, "cfUpload": {} } };
//字段systemId:系统编号


D_ITEMS.systemId = { "prop": "systemId", "label": "系统编号" };

COLUMNS.systemId = { "prop": "systemId", "label": "系统编号", "width": 100, "edit": false, "fixed": false };

F_ITEMS.systemId = { "prop": "systemId", "label": "系统编号" };
//字段complete:完成度


D_ITEMS.complete = { "prop": "complete", "label": "完成度" };

COLUMNS.complete = { "prop": "complete", "label": "完成度", "width": 130, "edit": false, "fixed": false };

F_ITEMS.complete = { "prop": "complete", "label": "完成度", "component": "com_item_complete_search" };
//字段professionalName:xxx


D_ITEMS.professionalName = { "prop": "professionalName", "label": "xxx" };

COLUMNS.professionalName = { "prop": "professionalName", "label": "xxx", "width": 130, "edit": false, "fixed": false };

F_ITEMS.professionalName = { "prop": "professionalName", "label": "xxx" };
//字段diploma:学历


D_ITEMS.diploma = { "prop": "diploma", "label": "学历" };

COLUMNS.diploma = { "prop": "diploma", "label": "学历", "edit": false, "fixed": false };

F_ITEMS.diploma = { "prop": "diploma", "label": "学历" };
//字段inSchoolPeriod:在校时间段


D_ITEMS.inSchoolPeriod = { "prop": "inSchoolPeriod", "label": "在校时间段" };

COLUMNS.inSchoolPeriod = { "prop": "inSchoolPeriod", "label": "在校时间段", "width": 120, "edit": false, "fixed": false };

F_ITEMS.inSchoolPeriod = { "prop": "inSchoolPeriod", "label": "在校时间段", "type": "time_period", "cfItem": { keyStart: "start", keyEnd: "end", "cfDataPicker": { "type": "monthrange", "picker-options": {} } } };
//字段schoolName:学校名称


D_ITEMS.schoolName = { "prop": "schoolName", "label": "学校名称" };

COLUMNS.schoolName = { "prop": "schoolName", "label": "学校名称", "width": 170, "edit": false, "fixed": false };

F_ITEMS.schoolName = { "prop": "schoolName", "label": "学校名称" };
//字段descJob:工作内容描述


D_ITEMS.descJob = { "prop": "descJob", "label": "工作内容描述" };

COLUMNS.descJob = { "prop": "descJob", "label": "工作内容描述", "width": 170, "edit": false, "fixed": false };

F_ITEMS.descJob = { "prop": "descJob", "label": "工作内容描述", "type": "textarea" };
//字段onJobPeriod:在职时间段


D_ITEMS.onJobPeriod = { "prop": "onJobPeriod", "label": "在职时间段" };

COLUMNS.onJobPeriod = { "prop": "onJobPeriod", "label": "在职时间段", "width": 120, "edit": false, "fixed": false };

F_ITEMS.onJobPeriod = { "prop": "onJobPeriod", "label": "在职时间段" };
//字段positionName:职位名称


D_ITEMS.positionName = { "prop": "positionName", "label": "职位名称" };

COLUMNS.positionName = { "prop": "positionName", "label": "职位名称", "width": 100, "edit": false, "fixed": false };

F_ITEMS.positionName = { "prop": "positionName", "label": "职位名称" };
//字段avatarImg:头像上传


D_ITEMS.avatarImg = { "prop": "avatarImg", "label": "头像上传" };

COLUMNS.avatarImg = { "prop": "avatarImg", "label": "头像上传", "width": 70, "edit": false, "fixed": false };

F_ITEMS.avatarImg = { "prop": "avatarImg", "label": "头像上传", "type": "upload_single", "cfItem": { isAvatar: true, "cfUpload": {} } };
//字段companyName:公司名


D_ITEMS.companyName = { "prop": "companyName", "label": "公司名" };

COLUMNS.companyName = { "prop": "companyName", "label": "公司名", "width": 190, "edit": false, "fixed": false };

F_ITEMS.companyName = { "prop": "companyName", "label": "公司名" };F_ITEMS.companyName_search = { "prop": "companyName", "label": "公司名", "type": "input_find_vague" };
//字段imagePreview:图片预览


D_ITEMS.imagePreview = { "prop": "imagePreview", "label": "图片预览", "slotName": "", "component": "com_imagePreview" };

COLUMNS.imagePreview = { "prop": "imagePreview", "label": "图片预览", "width": 100, "edit": false, "fixed": false, "component": "com_imagePreview" };

F_ITEMS.imagePreview = { "prop": "imagePreview", "label": "图片预览" };
//字段file:文件


D_ITEMS.file = { "prop": "file", "label": "文件" };

COLUMNS.file = { "prop": "file", "label": "文件", "width": 190, "edit": false, "fixed": false, "formatter": function formatter(row) {
    return lodash.get(row, "file[0].url", "");
  } };

F_ITEMS.file = { "prop": "file", "label": "文件", "type": "upload", "uploadConfig": { limit: 1, listType: "text" } };
//字段wxNumber:微信号


D_ITEMS.wxNumber = { "prop": "wxNumber", "label": "微信号" };

COLUMNS.wxNumber = { "prop": "wxNumber", "label": "微信号", "edit": false, "fixed": false };

F_ITEMS.wxNumber = { "prop": "wxNumber", "label": "微信号" };
//字段email:邮箱


D_ITEMS.email = { "prop": "email", "label": "邮箱" };

COLUMNS.email = { "prop": "email", "label": "邮箱", "width": 100, "edit": false, "fixed": false };

F_ITEMS.email = { "prop": "email", "label": "邮箱" };F_ITEMS.email_search = { "prop": "email", "label": "邮箱", "type": "input_find_vague" };
//字段qqNumber:QQ号


D_ITEMS.qqNumber = { "prop": "qqNumber", "label": "QQ号" };

COLUMNS.qqNumber = { "prop": "qqNumber", "label": "QQ号", "width": 70, "edit": false, "fixed": false };

F_ITEMS.qqNumber = { "prop": "qqNumber", "label": "QQ号" };F_ITEMS.qqNumber_search = { "prop": "qqNumber", "label": "QQ号", "type": "input_find_vague" };
//字段headSrc:头像


D_ITEMS.headSrc = { "prop": "headSrc", "label": "头像" };

COLUMNS.headSrc = { "prop": "headSrc", "label": "头像", "width": 70, "edit": false, "fixed": false };

F_ITEMS.headSrc = { "prop": "headSrc", "label": "头像", "type": "upload" };
//字段birthday:生日


D_ITEMS.birthday = { "prop": "birthday", "label": "生日" };

COLUMNS.birthday = { "prop": "birthday", "label": "生日", "width": 120, "edit": false, "fixed": false };

F_ITEMS.birthday = { "prop": "birthday", "label": "生日", "type": "date" };
//字段projectName:选择项目


D_ITEMS.projectName = { "prop": "projectName", "label": "选择项目" };

COLUMNS.projectName = { "prop": "projectName", "label": "选择项目", "width": 70, "edit": false, "fixed": false };

F_ITEMS.projectName = { "prop": "projectName", "label": "选择项目" };F_ITEMS.projectName_select_lazy = { "prop": "projectName", "label": "选择项目", "type": "select_ajax_lazy", "cfSelectAjaxLazy": { url: "/crossList?page=paicheng_project", keyLabel: "projectName", keyValue: "P1" } };
//字段album:相册


D_ITEMS.album = { "prop": "album", "label": "相册", "slotName": "slot_detail_item_album" };D_ITEMS.albumVenue = { "prop": "album", "label": "相册", "slotName": "slot_detail_item_album" };

COLUMNS.album = { "prop": "album", "label": "相册", "width": 70, "edit": false, "fixed": false };

F_ITEMS.album = { "prop": "album", "label": "相册", "col_span": 24, "type": "upload" };F_ITEMS.albumVenue = { "prop": "album", "label": "相册", "col_span": 24, "type": "upload", "uploadConfig": { limit: 5 }, "tips": "图片尺寸比例最好保持在1 : 0.8，建议尺寸：宽500px，高400px" };
//字段phoneNumber:联系方式


D_ITEMS.phoneNumber = { "prop": "phoneNumber", "label": "联系方式" };

COLUMNS.phoneNumber = { "prop": "phoneNumber", "label": "联系方式", "width": 140, "edit": false, "fixed": false };

F_ITEMS.phoneNumber = { "prop": "phoneNumber", "label": "联系方式", "rules": [{ required: true, message: "不能为空" }] };
//字段countMatch:赛事数量


D_ITEMS.countMatch = { "prop": "countMatch", "label": "赛事数量" };

COLUMNS.countMatch = { "prop": "countMatch", "label": "赛事数量", "width": 100, "edit": false, "fixed": false };

F_ITEMS.countMatch = { "prop": "countMatch", "label": "赛事数量" };
//字段address:详细地址


D_ITEMS.address = { "prop": "address", "label": "详细地址" };

COLUMNS.address = { "prop": "address", "label": "详细地址", "width": 120, "edit": false, "fixed": false };

F_ITEMS.address = { "prop": "address", "label": "详细地址" };F_ITEMS.address_search = { "prop": "address", "label": "详细地址", "type": "input_find_vague" };
//字段area:所属地区


D_ITEMS.area = { "prop": "area", "label": "所属地区" };

COLUMNS.area = { "prop": "area", "label": "所属地区", "width": 70, "edit": false, "fixed": false };

F_ITEMS.area = { "prop": "area", "label": "所属地区", "slotName": "slot_area", "rules": [{ required: true, message: "不能为空" }] };
//字段joinTime:加盟时间


D_ITEMS.joinTime = { "prop": "joinTime", "label": "加盟时间" };

COLUMNS.joinTime = { "prop": "joinTime", "label": "加盟时间", "width": 130, "edit": false, "fixed": false, "formatter": function formatter(row) {
    return moment(row.time).format("YYYY-MM-DD");
  } };

F_ITEMS.joinTime = { "prop": "joinTime", "label": "加盟时间", "type": "date" };F_ITEMS.joinTime_search = { "prop": "joinTime", "label": "加盟时间", "type": "time_period" };
//字段franchiseeId:加盟商


D_ITEMS.franchiseeId = { "prop": "franchiseeId", "label": "加盟商", "slotName": "slot_detail_item_franchiseeId" };

COLUMNS.franchiseeId = { "prop": "franchiseeId", "label": "加盟商", "width": 100, "edit": false, "fixed": false, "formatter": function formatter(rowData) {
    return lodash.get(rowData, "franchiseeDoc.name");
  } };

F_ITEMS.franchiseeId = { "prop": "franchiseeId", "label": "加盟商", "type": "select", "ajax": { url: "/crossList?page=tangball_franchisee", keyLabel: "name", keyValue: "P1" } };
//字段relNoteList:相关笔记列表


D_ITEMS.relNoteList = { "prop": "relNoteList", "label": "相关笔记列表" };

COLUMNS.relNoteList = { "prop": "relNoteList", "label": "相关笔记列表", "width": 120, "fixed": false, "edit": false };

F_ITEMS.relNoteList = { "prop": "relNoteList", "label": "相关笔记列表" };
//字段refundStaus:退款状态
DYDICT.arr_refundStaus = [{ "label": "未申请", "value": 1 }, { "label": "已申请退款", "value": 2 }, { "label": "退款成功", "value": 2 }];DYDICT.refundStaus = { "1": { "label": "未申请", "value": 1 }, "2": { "label": "退款成功", "value": 2 } };

D_ITEMS.refundStaus = { "prop": "refundStaus", "label": "退款状态", "formatter": function formatter(rowData) {
    return lodash.get(DYDICT.refundStaus, rowData.refundStaus + ".label");
  } };

COLUMNS.refundStaus = { "prop": "refundStaus", "label": "退款状态", "width": 80, "edit": false, "fixed": false, "formatter": function formatter(rowData) {
    return lodash.get(DYDICT.refundStaus, rowData.refundStaus + ".label");
  } };

F_ITEMS.refundStaus = { "prop": "refundStaus", "label": "退款状态" };
//字段refundFee:退款金额


D_ITEMS.refundFee = { "prop": "refundFee", "label": "退款金额" };

COLUMNS.refundFee = { "prop": "refundFee", "label": "退款金额", "width": 80, "edit": false, "fixed": false };

F_ITEMS.refundFee = { "prop": "refundFee", "label": "退款金额" };
//字段refundId:退款Id


D_ITEMS.refundId = { "prop": "refundId", "label": "退款Id" };

COLUMNS.refundId = { "prop": "refundId", "label": "退款Id", "width": 80, "edit": false, "fixed": false };

F_ITEMS.refundId = { "prop": "refundId", "label": "退款Id" };
//字段scoreKey:记分key


D_ITEMS.scoreKey = { "prop": "scoreKey", "label": "记分key" };

COLUMNS.scoreKey = { "prop": "scoreKey", "label": "记分key", "width": 120, "edit": false, "fixed": false };

F_ITEMS.scoreKey = { "prop": "scoreKey", "label": "记分key" };
//字段actualTime:实耗时


D_ITEMS.actualTime = { "prop": "actualTime", "label": "实耗时" };

COLUMNS.actualTime = { "prop": "actualTime", "label": "实耗时", "fixed": false, "edit": false, "width": 70 };

F_ITEMS.actualTime = { "prop": "actualTime", "label": "实耗时", "frequency": { options: [{ value: 0.3 }, { value: 0.5 }, { value: 1 }, { value: 1.5 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }, { value: 8 }, { value: 10 }, { value: 12 }, { value: 14 }, { value: 16 }] } };
//字段predictTime:预估耗时


D_ITEMS.predictTime = { "prop": "predictTime", "label": "预估耗时" };

COLUMNS.predictTime = { "prop": "predictTime", "label": "预估耗时", "width": 70, "edit": false, "fixed": false };

F_ITEMS.predictTime = { "prop": "predictTime", "label": "预估耗时", "frequency": { options: [{ value: 0.3 }, { value: 0.5 }, { value: 1 }, { value: 1.5 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }, { value: 8 }, { value: 10 }, { value: 12 }, { value: 14 }, { value: 16 }] } };
//字段priceSellSection:价格区间


D_ITEMS.priceSellSection = { "prop": "priceSellSection", "label": "价格区间" };

COLUMNS.priceSellSection = { "prop": "priceSellSection", "label": "价格区间", "width": 70, "edit": false, "fixed": false };

F_ITEMS.priceSellSection = { "prop": "priceSellSection", "label": "价格区间", "type": "text" };
//字段orderNickName:下单人


D_ITEMS.orderNickName = { "prop": "orderNickName", "label": "下单人" };

COLUMNS.orderNickName = { "prop": "orderNickName", "label": "下单人", "width": 70, "edit": false, "fixed": false, "formatter": function formatter(row) {
    return lodash.get(row, "userDoc.nickName");
  } };

F_ITEMS.orderNickName = { "prop": "orderNickName", "label": "下单人" };
//字段deliveryDesc:配送说明


D_ITEMS.deliveryDesc = { "prop": "deliveryDesc", "label": "配送说明" };

COLUMNS.deliveryDesc = { "prop": "deliveryDesc", "label": "配送说明", "width": 70, "edit": false, "fixed": false };

F_ITEMS.deliveryDesc = { "prop": "deliveryDesc", "label": "配送说明", "type": "textarea" };
//字段trueName:真实姓名


D_ITEMS.trueName = { "prop": "trueName", "label": "真实姓名" };

COLUMNS.trueName = { "prop": "trueName", "label": "真实姓名", "width": 70, "edit": false, "fixed": false };

F_ITEMS.trueName = { "prop": "trueName", "label": "真实姓名" };F_ITEMS.trueName_search = { "prop": "trueName", "label": "真实姓名", "type": "input_find_vague" };
//字段prop_vueJsonEditor:json编辑器(vueJsonEditor)


D_ITEMS.prop_vueJsonEditor = { "prop": "prop_vueJsonEditor", "label": "json编辑器(vueJsonEditor)" };

COLUMNS.prop_vueJsonEditor = { "prop": "prop_vueJsonEditor", "label": "json编辑器(vueJsonEditor)", "edit": false, "fixed": false };

F_ITEMS.prop_vueJsonEditor = { "prop": "prop_vueJsonEditor", "label": "json编辑器(vueJsonEditor)", "type": "vueJsonEditor" };
//字段prop_upload:图片上传


D_ITEMS.prop_upload = { "prop": "prop_upload", "label": "图片上传" };

COLUMNS.prop_upload = { "prop": "prop_upload", "label": "图片上传", "edit": false, "fixed": false };

F_ITEMS.prop_upload = { "prop": "prop_upload", "label": "图片上传", "type": "upload", "uploadConfig": { limit: 3, preview: true, dataType: "string" } };
//字段prop_upload2:文件上传2


D_ITEMS.prop_upload2 = { "prop": "prop_upload2", "label": "文件上传2" };

COLUMNS.prop_upload2 = { "prop": "prop_upload2", "label": "文件上传2", "edit": false, "fixed": false };

F_ITEMS.prop_upload2 = { "prop": "prop_upload2", "label": "文件上传2", "type": "upload", "uploadConfig": { limit: 2, listType: "text" } };
//字段prop_editor_new:富文本编辑器(精简插件列表)


D_ITEMS.prop_editor_new = { "prop": "prop_editor_new", "label": "富文本编辑器(精简插件列表)" };

COLUMNS.prop_editor_new = { "prop": "prop_editor_new", "label": "富文本编辑器(精简插件列表)", "edit": false, "fixed": false };

F_ITEMS.prop_editorTMNew = { "prop": "prop_editor_new", "label": "富文本编辑器(精简插件列表)", "cfTiny": { plugins: ['lists', 'image', 'autoresize', 'link', 'autolink'] } };
//字段prop_editorTM:富文本编辑器(默认配置)


D_ITEMS.prop_editorTM = { "prop": "prop_editorTM", "label": "富文本编辑器(默认配置)" };

COLUMNS.prop_editorTM = { "prop": "prop_editorTM", "label": "富文本编辑器(默认配置)", "edit": false, "fixed": false };

F_ITEMS.prop_editorTM = { "prop": "prop_editorTM", "label": "富文本编辑器(默认配置)", "type": "editorTM" };
//字段select1:下拉框(多选)


D_ITEMS.select1 = { "prop": "select1", "label": "下拉框(多选)" };

COLUMNS.select1 = { "prop": "select1", "label": "下拉框(多选)", "edit": false, "fixed": false };

F_ITEMS.select1 = { "prop": "select1", "label": "下拉框(多选)", "type": "select", "multiple": true, "options": [{ value: 1, label: "男" }, { value: 2, label: "女" }] };
//字段complete1:完成情况[被监听]


D_ITEMS.complete1 = { "prop": "complete1", "label": "完成情况[被监听]" };

COLUMNS.complete1 = { "prop": "complete1", "label": "完成情况[被监听]", "edit": false, "fixed": false };

F_ITEMS.complete1 = { "prop": "complete1", "label": "完成情况[被监听]", "type": "select", "notSubmit": true, "toObj": true, "options": [{ value: 1, label: "未开始" }, { value: 2, label: "进行中" }, { value: 3, label: "已完成" }] };
//字段num1:设置component


D_ITEMS.num1 = { "prop": "num1", "label": "设置component" };

COLUMNS.num1 = { "prop": "num1", "label": "设置component", "edit": false, "fixed": false };

F_ITEMS.num1_component = { "prop": "num1", "label": "设置component", "component": "el-input" };
//字段prop4:下拉框(select+ajax)


D_ITEMS.prop4 = { "prop": "prop4", "label": "下拉框(select+ajax)" };

COLUMNS.prop4 = { "prop": "prop4", "label": "下拉框(select+ajax)", "edit": false, "fixed": false };

F_ITEMS.prop4 = { "prop": "prop4", "label": "下拉框(select+ajax)", "type": "select", "ajax": { url: "/crossList?page=mabang-member", param: { a: 1 }, keyLabel: "nickName", keyValue: "userName" }, "multiple": true };
//字段groupMember:小组成员


D_ITEMS.groupMember = { "prop": "groupMember", "label": "小组成员" };

COLUMNS.groupMember = { "prop": "groupMember", "label": "小组成员", "edit": false, "fixed": false };

F_ITEMS.groupMember = { "prop": "groupMember", "label": "小组成员", "type": "collection", "collectionCfForm": { col_span: 12, formItems: [{ label: "球队id", prop: "id", type: "select", ajax: { url: "/crossList?page=tangball_team", keyLabel: "name", keyValue: "P1" } }, { label: "姓名", prop: "name" }] }, "collectionlistType": "form" };
//字段num1_text:文本字段


D_ITEMS.num1_text = { "prop": "num1_text", "label": "文本字段" };

COLUMNS.num1_text = { "prop": "num1_text", "label": "文本字段", "edit": false, "fixed": false };

F_ITEMS.num1_text = { "prop": "num1_text", "label": "文本字段", "type": "text", "style": { color: "#f00" }, "tips": "跟下方数字相同" };
//字段memberId:报名球员


D_ITEMS.memberId = { "prop": "memberId", "label": "报名球员" };

COLUMNS.memberId = { "prop": "memberId", "label": "报名球员", "edit": false, "fixed": false };

F_ITEMS.memberId = { "prop": "memberId", "label": "报名球员", "type": "ajax_populate", "cfAjaxPopulate": { populateKey: "name", page: "tangball_member" } };
//字段prop_input_find_vague:用于模糊查询文本框(input_find_vague)


D_ITEMS.prop_input_find_vague = { "prop": "prop_input_find_vague", "label": "用于模糊查询文本框(input_find_vague)" };

COLUMNS.prop_input_find_vague = { "prop": "prop_input_find_vague", "label": "用于模糊查询文本框(input_find_vague)", "edit": false, "fixed": false };

F_ITEMS.prop_input_find_vague = { "prop": "prop_input_find_vague", "label": "用于模糊查询文本框(input_find_vague)", "type": "input_find_vague" };
//字段prop1:普通文本框(input)


D_ITEMS.prop1 = { "prop": "prop1", "label": "普通文本框(input)" };

COLUMNS.prop1 = { "prop": "prop1", "label": "普通文本框(input)", "edit": false, "fixed": false };

F_ITEMS.prop1 = { "prop": "prop1", "label": "普通文本框(input)", "type": "input", "rules": [{ required: true, message: "不能为空" }, { pattern: /^[\\u4E00-\\u9FA5]+$/, message: "用户名只能为中文" }], "default": "默认文本" };
//字段prop_numberRange:数字范围


D_ITEMS.prop_numberRange = { "prop": "prop_numberRange", "label": "数字范围" };

COLUMNS.prop_numberRange = { "prop": "prop_numberRange", "label": "数字范围", "edit": false, "fixed": false };

F_ITEMS.prop_numberRange = { "prop": "prop_numberRange", "label": "数字范围", "type": "numberRange", "default": { maxN: 4, minN: 1 }, "keyMax": "maxN", "keyMin": "minN" };
//字段listSpecPrice:规格/价格表


D_ITEMS.listSpecPrice = { "prop": "listSpecPrice", "label": "规格/价格表" };

COLUMNS.listSpecPrice = { "prop": "listSpecPrice", "label": "规格/价格表", "edit": false, "fixed": false };

F_ITEMS.listSpecPrice = { "prop": "listSpecPrice", "label": "规格/价格表", "component": "com_f_item_listSpecPrice" };
//字段objSpecTerm:规格条件


D_ITEMS.objSpecTerm = { "prop": "objSpecTerm", "label": "规格条件" };

COLUMNS.objSpecTerm = { "prop": "objSpecTerm", "label": "规格条件", "edit": false, "fixed": false };

F_ITEMS.objSpecTerm = { "prop": "objSpecTerm", "label": "规格条件", "type": "jsonEditor" };
//字段options:选项


D_ITEMS.options = { "prop": "options", "label": "选项" };

COLUMNS.options = { "prop": "options", "label": "选项", "fixed": false, "edit": false };

F_ITEMS.specs_options = { "prop": "options", "label": "规格项", "type": "collection", "collectionlistType": "form", "cfElBtnAdd": { text: "+添加一组规格项", type: "primary", size: "mini", plain: false }, "collectionCfForm": { col_span: 12, formItems: [{ label: "选项名", prop: "name", type: "input" }, { label: "选项图片", prop: "imgSrc" }] } };
//字段collection2:集合（无工具栏）


D_ITEMS.collection2 = { "prop": "collection2", "label": "集合（无工具栏）" };

COLUMNS.collection2 = { "prop": "collection2", "label": "集合（无工具栏）", "fixed": false, "edit": false };

F_ITEMS.collection2 = { "prop": "collection2", "label": "集合（无工具栏）", "type": "collection", "collectionlistType": "form", "showToolbar": false, "collectionCfForm": { col_span: 12, formItems: [{ label: "时间", prop: "time", type: "date" }, { label: "金额", prop: "money" }] } };
//字段collection1:集合（带工具栏和插槽）1


D_ITEMS.collection1 = { "prop": "collection1", "label": "集合（带工具栏和插槽）1" };

COLUMNS.collection1 = { "prop": "collection1", "label": "集合（带工具栏和插槽）1", "edit": false, "fixed": false };

F_ITEMS.collection1 = { "prop": "collection1", "label": "集合（带工具栏和插槽）1", "type": "collection", "dataSlot": "slot_collection1", "style": { "margin-top": "50px" }, "cfElBtnAdd": { text: "+添加一组", type: "primary", size: "large", plain: false }, "collectionCfForm": { col_span: 12, formItems: [{ label: "时间", prop: "time", type: "date" }, { label: "金额", prop: "money" }] } };
//字段num2:数字2


D_ITEMS.num2 = { "prop": "num2", "label": "数字2" };

COLUMNS.num2 = { "prop": "num2", "label": "数字2", "edit": false, "fixed": false };

F_ITEMS.num2 = { "prop": "num2", "label": "数字2", "type": "number", "min": 0, "max": 100, "hideBtn": true, "frequency": { sytle: { width: "48px" }, options: [{ value: 1 }, { value: 2 }, { value: 3 }] } };
//字段diycheckbox:diycheckbox


D_ITEMS.diycheckbox = { "prop": "diycheckbox", "label": "diycheckbox" };

COLUMNS.diycheckbox = { "prop": "diycheckbox", "label": "diycheckbox", "edit": false, "fixed": false };

F_ITEMS.diycheckbox = { "prop": "diycheckbox", "label": "diycheckbox", "slotName": "slot_form_item_diycheckbox", "rules": [{ required: true, message: "不能为空" }] };
//字段tagList:标签


D_ITEMS.tagList = { "prop": "tagList", "label": "标签" };

COLUMNS.tagList = { "prop": "tagList", "label": "标签", "edit": false, "fixed": false };

F_ITEMS.tagList = { "prop": "tagList", "label": "标签", "type": "tag_list" };
//字段uploadAvatar:头像上传


D_ITEMS.uploadAvatar = { "prop": "uploadAvatar", "label": "头像上传" };

COLUMNS.uploadAvatar = { "prop": "uploadAvatar", "label": "头像上传", "fixed": false, "edit": false };

F_ITEMS.uploadAvatar = { "prop": "uploadAvatar", "label": "头像上传", "type": "upload_single", "cfItem": { isAvatar: true, "cfUpload": {} } };
//字段upload_single1:单文件上传


D_ITEMS.upload_single1 = { "prop": "upload_single1", "label": "单文件上传" };

COLUMNS.upload_single1 = { "prop": "upload_single1", "label": "单文件上传", "edit": false, "fixed": false };

F_ITEMS.upload_single1 = { "prop": "upload_single1", "label": "单文件上传", "type": "upload_single" };
//字段prop_time_period3:时间段(年)


D_ITEMS.prop_time_period3 = { "prop": "prop_time_period3", "label": "时间段(年)" };

COLUMNS.prop_time_period3 = { "prop": "prop_time_period3", "label": "时间段(年)", "fixed": false, "edit": false, "width": 70 };

F_ITEMS.prop_time_period3 = { "prop": "prop_time_period3", "label": "时间段(年)", "type": "time_period", "cfItem": { "cfDataPicker": { "type": "year", "align": "right", "unlink-panels": true, "range-separator": "至", "value-format": "yyyy-MM-dd HH:mm:ss", "default-time": ['00:00:01', '23:59:59'], "picker-options": {} } } };
//字段xxx:xxx


D_ITEMS.xxx = { "prop": "xxx", "label": "xxx" };

COLUMNS.xxx = { "prop": "xxx", "label": "xxx", "fixed": false, "edit": false };

F_ITEMS.xxx = { "prop": "xxx", "label": "xxx" };
//字段prop_time_period1:时间段(日范围)


D_ITEMS.prop_time_period1 = { "prop": "prop_time_period1", "label": "时间段(日范围)" };

COLUMNS.prop_time_period1 = { "prop": "prop_time_period1", "label": "时间段(日范围)", "width": 70, "edit": false, "fixed": false };

F_ITEMS.prop_time_period1 = { "prop": "prop_time_period1", "label": "时间段(日范围)", "type": "time_period" };
//字段publicationStatus:发布状态


D_ITEMS.publicationStatus = { "prop": "publicationStatus", "label": "发布状态" };

COLUMNS.publicationStatus = { "prop": "publicationStatus", "label": "发布状态", "edit": false, "fixed": false };

F_ITEMS.publicationStatus = { "prop": "publicationStatus", "label": "发布状态", "type": "type", "options": [{ label: "是", value: 1 }, { label: "否", value: 2 }] };
//字段extend:其他


D_ITEMS.extend = { "prop": "extend", "label": "其他" };D_ITEMS.venueOtherInfo = { "prop": "extend", "label": "场馆其他信息" };D_ITEMS.positionInfo = { "prop": "extend", "label": "地图位置信息" };

COLUMNS.extend = { "prop": "extend", "label": "其他", "width": 235, "fixed": false, "edit": false };
COLUMNS.venueOtherInfo = { "prop": "extend", "label": "场馆其他信息", "width": 70, "fixed": false, "edit": false };
COLUMNS.positionInfo = { "prop": "extend", "label": "地图位置信息", "width": 70, "fixed": false, "edit": false };

F_ITEMS.extend = { "prop": "extend", "label": "拓展", "cfForm": { col_span: 8, labelWidth: "150px", formItems: [{ col_span: 24, label: "百分比", prop: "percent", type: "slider" }, { label: "diycheckbox(slot实现)", prop: "diycheckbox", slot: "slot_form_item_diycheckbox", rules: [{ required: true, message: "不能为空" }] }, { col_span: 24, label: "姓名", prop: "name", type: "input" }, { label: "下拉框(select)", prop: "sex", type: "select", default: 2, options: [{ value: 1, label: "男" }, { value: 2, label: "女" }] }] }, "default": { diycheckbox: [] } };F_ITEMS.venueOtherInfo = { "prop": "extend", "label": "场馆其他信息", "default": {}, "cfForm": { formItems: [{ label: "场馆长宽", prop: "venueSize" }, { label: "场馆层数", prop: "floorCount" }, { label: "洞数", prop: "holeCount" }, { label: "打位数", prop: "placesCount" }, { label: "联系人", prop: "contacts" }] } };F_ITEMS.positionInfo = { "prop": "extend", "label": "地图位置信息", "default": {}, "cfForm": { formItems: [{ label: "经度", prop: "longitude" }, { label: "纬度", prop: "latitude" }] } };
//字段countOrder:订单数


D_ITEMS.countOrder = { "prop": "countOrder", "label": "订单数" };

COLUMNS.countOrder = { "prop": "countOrder", "label": "订单数", "width": 90, "edit": false, "fixed": false };

F_ITEMS.countOrder = { "prop": "countOrder", "label": "订单数", "type": "number" };
//字段isPublish:是否发布


D_ITEMS.isPublish = { "prop": "isPublish", "label": "是否发布" };

COLUMNS.isPublish = { "prop": "isPublish", "label": "是否发布", "width": 90, "edit": false, "fixed": false };

F_ITEMS.isPublish = { "prop": "isPublish", "label": "是否发布", "type": "radio", "options": DYDICT.arr_boolean };
//字段priceMarket:市场价


D_ITEMS.priceMarket = { "prop": "priceMarket", "label": "市场价" };

COLUMNS.priceMarket = { "prop": "priceMarket", "label": "市场价", "width": 90, "edit": false, "fixed": false };

F_ITEMS.priceMarket = { "prop": "priceMarket", "label": "市场价", "type": "number" };
//字段vedio:视频上传


D_ITEMS.vedio = { "prop": "vedio", "label": "视频上传" };

COLUMNS.vedio = { "prop": "vedio", "label": "视频上传", "width": 70, "edit": false, "fixed": false };

F_ITEMS.vedio = { "prop": "vedio", "label": "视频上传", "type": "upload", "uploadConfig": { limit: 2, listType: "text" } };
//字段type:字段类型


D_ITEMS.item_type = { "prop": "type", "label": "字段类型" };

COLUMNS.item_type = { "prop": "type", "label": "字段类型", "width": 70, "edit": false, "fixed": false };

F_ITEMS.item_type = { "prop": "type", "label": "字段类型" };
//字段prop_time_period2:时间段(月范围)


D_ITEMS.prop_time_period2 = { "prop": "prop_time_period2", "label": "时间段(月范围)" };

COLUMNS.prop_time_period2 = { "prop": "prop_time_period2", "label": "时间段(月范围)", "fixed": false, "edit": false };

F_ITEMS.prop_time_period2 = { "prop": "prop_time_period2", "label": "时间段(月范围)", "type": "time_period", "cfItem": { keyStart: "start", keyEnd: "end", "cfDataPicker": { "type": "monthrange", "align": "right", "unlink-panels": true, "range-separator": "至", "value-format": "yyyy-MM-dd HH:mm:ss", "default-time": ['00:00:01', '23:59:59'], "picker-options": {} } } };
//字段prop:字段属性


D_ITEMS.item_prop = { "prop": "prop", "label": "字段属性" };

COLUMNS.item_prop = { "prop": "prop", "label": "字段属性", "edit": false, "fixed": false };

F_ITEMS.item_prop = { "prop": "prop", "label": "字段属性" };
//字段link:网址


D_ITEMS.link = { "prop": "link", "label": "网址" };

COLUMNS.link = { "prop": "link", "label": "网址", "width": 120, "edit": false, "fixed": false };

F_ITEMS.link = { "prop": "link", "label": "网址" };
//字段note_noteList:相关笔记列表


D_ITEMS.note_noteList = { "prop": "note_noteList", "label": "相关笔记列表" };

COLUMNS.note_noteList = { "prop": "note_noteList", "label": "相关笔记列表", "edit": false, "fixed": false, "width": 120 };

F_ITEMS.note_noteList = { "prop": "note_noteList", "label": "相关笔记列表" };
//字段note_linkList:相关demo列表


D_ITEMS.note_linkList = { "prop": "note_linkList", "label": "相关demo列表" };

COLUMNS.note_linkList = { "prop": "note_linkList", "label": "相关demo列表", "width": 120, "fixed": false, "edit": false };

F_ITEMS.note_linkList = { "prop": "note_linkList", "label": "相关demo列表" };
//字段keyword:关键词


D_ITEMS.keyword = { "prop": "keyword", "label": "关键词" };

COLUMNS.keyword = { "prop": "keyword", "label": "关键词", "width": 70, "edit": false, "fixed": false };
COLUMNS.keyword_edit = { "prop": "keyword", "label": "关键词", "width": 70, "edit": true, "fixed": false };

F_ITEMS.keyword = { "prop": "keyword", "label": "关键词", "type": "tag_list" };
//字段key:类型代号


D_ITEMS.dataTypekey = { "prop": "key", "label": "类型代号" };

COLUMNS.dataTypekey = { "prop": "key", "label": "类型代号", "width": 120, "edit": false, "fixed": false };

F_ITEMS.dataTypekey = { "prop": "key", "label": "类型代号" };
//字段label:字段中文名


D_ITEMS.item_label = { "prop": "label", "label": "字段中文名" };

COLUMNS.item_label = { "prop": "label", "label": "字段中文名", "fixed": false, "edit": false, "width": 160 };

F_ITEMS.item_label = { "prop": "label", "label": "字段中文名" };F_ITEMS.label_search = { "prop": "label", "label": "字段中文名", "type": "input_find_vague" };
//字段sort:序号


D_ITEMS.sort = { "prop": "sort", "label": "序号" };

COLUMNS.sort = { "prop": "sort", "label": "序号", "width": 70, "fixed": false, "edit": false };

F_ITEMS.sort = { "prop": "sort", "label": "序号", "type": "number" };
//字段_idRel2:关联数据2


D_ITEMS._idRel2 = { "prop": "_idRel2", "label": "关联数据2" };

COLUMNS._idRel2 = { "prop": "_idRel2", "label": "关联数据2", "edit": false, "fixed": false, "width": 220 };

F_ITEMS._idRel2 = { "prop": "_idRel2", "label": "关联数据2" };
//字段_idRel:关联数据1


D_ITEMS._idRel = { "prop": "_idRel", "label": "关联数据1" };

COLUMNS._idRel = { "prop": "_idRel", "label": "关联数据1", "width": 220, "fixed": false, "edit": false };

F_ITEMS._idRel = { "prop": "_idRel", "label": "关联数据1" };
//字段alias:别名


D_ITEMS.alias = { "prop": "alias", "label": "别名" };

COLUMNS.alias = { "prop": "alias", "label": "别名", "width": 130, "fixed": false, "edit": false };

F_ITEMS.alias = { "prop": "alias", "label": "别名" };
//字段myScore:我的分数


D_ITEMS.myScore = { "prop": "myScore", "label": "我的分数" };

COLUMNS.myScore = { "prop": "myScore", "label": "我的分数", "width": 90, "slotName": "slot_column_score", "fixed": false, "edit": false };

//字段score:分数对象


D_ITEMS.score = { "prop": "score", "label": "分数对象" };

COLUMNS.score = { "prop": "score", "label": "分数对象", "edit": false, "fixed": false, "width": 90 };

//字段countData:数据量


D_ITEMS.countData = { "prop": "countData", "label": "数据量" };

COLUMNS.countData = { "prop": "countData", "label": "数据量", "width": 80, "fixed": false, "edit": false };

//字段css_version:版本


D_ITEMS.css_version = { "prop": "css_version", "label": "版本" };

COLUMNS.css_version = { "prop": "css_version", "label": "版本", "width": 70, "fixed": false, "edit": false };

//字段demoList:demo列表


D_ITEMS.demoList = { "prop": "demoList", "label": "demo列表" };

COLUMNS.demoList = { "prop": "demoList", "label": "demo列表", "width": 90, "fixed": false, "edit": false };

F_ITEMS.demoList = { "prop": "demoList", "label": "demo列表", "type": "collection", "collectionlistType": "form", "collectionCfForm": { col_span: 12, formItems: [{ label: "标题", prop: "title", type: "input" }, { label: "链接", prop: "link", type: "input" }] } };
//字段cateIdOld:旧分类Id


D_ITEMS.cateIdOld = { "prop": "cateIdOld", "label": "旧分类Id" };

COLUMNS.cateIdOld = { "prop": "cateIdOld", "label": "旧分类Id", "width": 70, "fixed": false, "edit": false };

F_ITEMS.cateIdOld = { "prop": "cateIdOld", "label": "旧分类Id" };
//字段english:原英文


D_ITEMS.english = { "prop": "english", "label": "原英文" };

COLUMNS.english = { "prop": "english", "label": "原英文", "width": 70, "fixed": false, "edit": false };

F_ITEMS.english = { "prop": "english", "label": "原英文" };
//字段studyTime:学习时间


D_ITEMS.studyTime = { "prop": "studyTime", "label": "学习时间" };

COLUMNS.studyTime = { "prop": "studyTime", "label": "学习时间", "width": 140, "fixed": false, "edit": false };

//字段_id:uuid


D_ITEMS._id = { "prop": "_id", "label": "uuid" };

COLUMNS._id = { "prop": "_id", "label": "uuid", "width": 80, "fixed": false, "edit": false, "sortable": "custom" };

//字段_userId:_userId


D_ITEMS._userId = { "prop": "_userId", "label": "_userId" };

COLUMNS._userId = { "prop": "_userId", "label": "_userId", "width": 120, "fixed": false, "edit": false };

F_ITEMS._userId = { "prop": "_userId", "label": "_userId" };
//字段userId:用户Id


D_ITEMS.userId = { "prop": "userId", "label": "用户Id" };

COLUMNS.userId = { "prop": "userId", "label": "用户Id", "width": 120, "fixed": false, "edit": false };

F_ITEMS.userId = { "prop": "userId", "label": "用户Id" };
//字段dataId:数据Id


D_ITEMS.dataId = { "prop": "dataId", "label": "数据Id" };

COLUMNS.dataId = { "prop": "dataId", "label": "数据Id", "width": 210, "fixed": false, "edit": false };

F_ITEMS.dataId = { "prop": "dataId", "label": "数据Id" };
//字段familiarity:熟悉度


D_ITEMS.familiarity = { "prop": "familiarity", "label": "熟悉度" };

COLUMNS.familiarity = { "prop": "familiarity", "label": "熟悉度", "width": 100, "fixed": false, "edit": false };
COLUMNS.familiarity_select = { "prop": "familiarity", "label": "熟悉度", "width": 120, "fixed": false, "edit": false, "component": "com_note_familiarity_select", "cfColumn": { "class-name": "table_cell_visible" } };

F_ITEMS.familiarity = { "prop": "familiarity", "label": "熟悉度" };
//字段rolePower:权限


D_ITEMS.rolePower = { "prop": "rolePower", "label": "权限" };

COLUMNS.rolePower = { "prop": "rolePower", "label": "权限", "width": 120, "fixed": false, "edit": false };

F_ITEMS.rolePower = { "prop": "rolePower", "label": "权限", "cfForm": { labelWidth: "150px", formItems: [{ label: "资讯中心", prop: "newsCenter", style: styleMenuGPowerItem, default: {}, cfForm: { col_span: 12, formItems: [{ prop: "list_article", style: styleMenuPowerItem, cfForm: getFormMenuGPower({ menuName: "资讯列表" }) }, { prop: "list_article_category", style: styleMenuPowerItem, cfForm: getFormMenuGPower({ menuName: "资讯分类" }) }] } }, { label: "系统管理", prop: "systemManage", style: styleMenuGPowerItem, default: {}, cfForm: { col_span: 12, formItems: [{ prop: "list_admin", style: styleMenuPowerItem, cfForm: getFormMenuGPower({ menuName: "管理员" }) }, { prop: "list_role", style: styleMenuPowerItem, cfForm: getFormMenuGPower({ menuName: "角色" }) }, { prop: "list_area", style: styleMenuPowerItem, cfForm: getFormMenuGPower({ menuName: "地区管理" }) }] } }] }, "default": {} };
//字段name:名称


D_ITEMS.name = { "prop": "name", "label": "名称" };D_ITEMS.roleName = { "prop": "name", "label": "角色名" };D_ITEMS.category_name = { "prop": "name", "label": "分类名" };D_ITEMS.venueName = { "prop": "name", "label": "场馆名称" };

COLUMNS.name = { "prop": "name", "label": "名称", "edit": false, "fixed": false, "width": 200 };
COLUMNS.name_fixed = { "prop": "name", "label": "名称", "edit": true, "fixed": true, "width": 200 };
COLUMNS.roleName = { "prop": "name", "label": "角色名", "width": 120, "fixed": false, "edit": false };
COLUMNS.category_name = { "prop": "name", "label": "分类名", "width": 120, "fixed": false, "edit": false };
COLUMNS.venueName = { "prop": "name", "label": "场馆名称", "width": 200, "fixed": false, "edit": false };

F_ITEMS.name = { "prop": "name", "label": "标题" };F_ITEMS.name_search = { "prop": "name", "label": "标题", "type": "input_find_vague" };F_ITEMS.roleName = { "prop": "name", "label": "角色名" };F_ITEMS.category_name = { "prop": "name", "label": "分类名" };F_ITEMS.venueName = { "prop": "name", "label": "场馆名称", "rules": [{ required: true, message: "不能为空" }] };
//字段role:所属角色


D_ITEMS.role = { "prop": "role", "label": "所属角色" };

COLUMNS.role = { "prop": "role", "label": "所属角色", "width": 120, "fixed": false, "edit": false };

F_ITEMS.role = { "prop": "role", "label": "所属角色", "type": "select", "ajax": { param: { _dataType: "role" }, url: "/info/getCommonList", keyLabel: "name", keyValue: "_id" } };
//字段nickName:昵称


D_ITEMS.nickName = { "prop": "nickName", "label": "昵称" };

COLUMNS.nickName = { "prop": "nickName", "label": "昵称", "edit": false, "fixed": false, "width": 120 };

F_ITEMS.nickName = { "prop": "nickName", "label": "昵称" };
//字段passWord:密码


D_ITEMS.passWord = { "prop": "passWord", "label": "密码" };

COLUMNS.passWord = { "prop": "passWord", "label": "密码", "width": 150, "fixed": false, "edit": false };

F_ITEMS.passWord = { "prop": "passWord", "label": "密码", "type": "passWord" };
//字段userName:用户名


D_ITEMS.userName = { "prop": "userName", "label": "用户名" };

COLUMNS.userName = { "prop": "userName", "label": "用户名", "width": 150, "fixed": false, "edit": false };

F_ITEMS.userName = { "prop": "userName", "label": "用户名" };
//字段countGroup:分组数


COLUMNS.countGroup = { "prop": "countGroup", "label": "分组数", "width": 60, "fixed": false, "edit": false };

F_ITEMS.countGroup = { "prop": "countGroup", "label": "分组数", "type": "number" };
//字段arrGroup:所属分组


D_ITEMS.arrGroup = { "prop": "arrGroup", "label": "所属分组" };

COLUMNS.arrGroup = { "prop": "arrGroup", "label": "所属分组", "width": 100, "fixed": false, "edit": false };

//字段_data:_data对象


D_ITEMS._data = { "prop": "_data", "label": "_data对象" };

COLUMNS._data = { "prop": "_data", "label": "_data对象", "width": 90, "fixed": false, "edit": false };

F_ITEMS._data = { "prop": "_data", "label": "_data对象", "type": "jsonEditor" };
//字段_detail:详情


D_ITEMS.detail = { "prop": "_detail", "label": "详情", "type": "html" };

COLUMNS.detail = { "prop": "_detail", "label": "详情", "fixed": false, "edit": false };

F_ITEMS.detail = { "prop": "_detail", "label": "详情", "col_span": 24, "type": "editorTM" };F_ITEMS.detail_paste = { "prop": "_detail", "label": "详情", "col_span": 24, "type": "editorTM", "pasteImage": true };F_ITEMS.detail_new = { "prop": "_detail", "label": "详情", "col_span": 24, "type": "editorTM", "pasteImage": true };
//字段desc:说明


D_ITEMS.desc = { "prop": "desc", "label": "说明" };

COLUMNS.desc = { "prop": "desc", "label": "说明", "width": 160, "fixed": false, "edit": false };

F_ITEMS.desc = { "prop": "desc", "label": "说明", "type": "textarea" };
//字段orderId:订单号


D_ITEMS.orderId = { "prop": "orderId", "label": "订单号" };

COLUMNS.orderId = { "prop": "orderId", "label": "订单号", "width": 160, "fixed": false, "edit": false };

F_ITEMS.orderId = { "prop": "orderId", "label": "订单号" };
//字段age:年龄


D_ITEMS.age = { "prop": "age", "label": "年龄" };

COLUMNS.age = { "prop": "age", "label": "年龄", "fixed": false, "edit": false };

F_ITEMS.age = { "prop": "age", "label": "年龄", "type": "number" };
//字段remark:备注


D_ITEMS.remark = { "prop": "remark", "label": "备注" };D_ITEMS.category_remark = { "prop": "remark", "label": "分类说明" };

COLUMNS.remark = { "prop": "remark", "label": "备注", "width": 70, "fixed": false, "edit": false };
COLUMNS.category_remark = { "prop": "remark", "label": "分类说明", "width": 180, "fixed": false, "edit": false };

F_ITEMS.remark = { "prop": "remark", "label": "备注" };F_ITEMS.category_remark = { "prop": "remark", "label": "分类说明", "type": "textarea" };
//字段career:职业


D_ITEMS.career = { "prop": "career", "label": "职业" };

COLUMNS.career = { "prop": "career", "label": "职业", "edit": false, "fixed": false, "width": 70 };

F_ITEMS.career = { "prop": "career", "label": "职业" };
//字段idCard:身份证号


D_ITEMS.idCard = { "prop": "idCard", "label": "身份证号" };

COLUMNS.idCard = { "prop": "idCard", "label": "身份证号", "width": 70, "fixed": false, "edit": false };

F_ITEMS.idCard = { "prop": "idCard", "label": "身份证号" };
//字段phone:手机号


D_ITEMS.phone = { "prop": "phone", "label": "手机号" };

COLUMNS.phone = { "prop": "phone", "label": "手机号", "width": 110, "fixed": false, "edit": false };

F_ITEMS.phone = { "prop": "phone", "label": "手机号" };
//字段openid:微信openid


D_ITEMS.openid = { "prop": "openid", "label": "微信openid" };

COLUMNS.openid = { "prop": "openid", "label": "微信openid", "fixed": false, "edit": false };

F_ITEMS.openid = { "prop": "openid", "label": "微信openid" };
//字段sex:性别


D_ITEMS.sex = { "prop": "sex", "label": "性别" };

COLUMNS.sex = { "prop": "sex", "label": "性别", "width": 50, "fixed": false, "edit": false };

F_ITEMS.sex = { "prop": "sex", "label": "性别", "type": "select", "options": [{ label: "男", value: 1 }, { label: "女", value: 2 }] };
//字段Id:Id


D_ITEMS.Id = { "prop": "Id", "label": "Id" };

COLUMNS.Id = { "prop": "Id", "label": "Id", "width": 50, "fixed": false, "edit": false };

F_ITEMS.Id = { "prop": "Id", "label": "数据id", "type": "input" };
//字段DYDICT:DYDICT数据


D_ITEMS.DYDICT = { "prop": "DYDICT", "label": "DYDICT数据" };

COLUMNS.DYDICT = { "prop": "DYDICT", "label": "DYDICT数据", "fixed": false, "edit": false };

F_ITEMS.DYDICT = { "prop": "DYDICT", "label": "DYDICT数据", "cfForm": { col_span: 12, formItems: [F_ITEMS.collection_DYDICT] }, "default": {} };
//字段arrItem:值项


F_ITEMS.collection_DYDICT_value = { "prop": "arrItem", "label": "值项", "type": "collection", "collectionCfForm": { col_span: 8, formItems: [{ label: "标签名", prop: "label" }, { label: "值", prop: "value" }] }, "cfElBtnAdd": { text: "+添加一组", type: "primary", size: "mini", plain: false } };
//字段addressObj:收货地址


D_ITEMS.addressObj = { "prop": "addressObj", "label": "收货地址", "component": "com_addressObj" };

COLUMNS.addressObj = { "prop": "addressObj", "label": "收货地址", "width": 70, "fixed": false, "edit": false };

F_ITEMS.addressObj = { "prop": "addressObj", "label": "收货地址", "col_span": 24, "default": {}, "varType": "", "cfForm": { col_span: 12, formItems: [{ label: "省市区", valueType: "arrObj", prop: "arrArea", type: "select_area" }, { label: "详细地址", prop: "detail" }] } };
//字段listGoods:商品清单


D_ITEMS.listGoods = { "prop": "listGoods", "label": "商品清单", "component": "com_listGoods" };

COLUMNS.listGoods = { "prop": "listGoods", "label": "商品清单", "width": 70, "fixed": false, "edit": false };

F_ITEMS.listGoods = { "prop": "listGoods", "label": "商品清单", "type": "jsonEditor" };
//字段priceOrder:订单金额


D_ITEMS.priceOrder = { "prop": "priceOrder", "label": "订单金额" };

COLUMNS.priceOrder = { "prop": "priceOrder", "label": "订单金额", "width": 90, "fixed": false, "edit": false };

F_ITEMS.priceOrder = { "prop": "priceOrder", "label": "订单金额", "type": "number" };
//字段transaction_id:微信交易号


D_ITEMS.transaction_id = { "prop": "transaction_id", "label": "微信交易号" };

COLUMNS.transaction_id = { "prop": "transaction_id", "label": "微信交易号", "fixed": false, "edit": false };

//字段personCharge:负责人

DYDICT.personCharge = { "populateColumn": "adminDoc", "idColumn": "personCharge", "idColumn2": "userName", "ajax": { "param": { "_dataType": "admin" }, "url": "/info/getCommonList" } };
D_ITEMS.personCharge = { "prop": "personCharge", "label": "负责人" };

COLUMNS.personCharge = { "prop": "personCharge", "label": "负责人", "edit": false, "fixed": false, "width": 70, "formatter": function formatter(row) {
    if (!row.adminDoc) return;var arr1 = util.clearArr(row.adminDoc);var arrName = arr1.map(function (doc) {
      return doc.nickName;
    });return arrName.join();
  } };

F_ITEMS.personCharge = { "prop": "personCharge", "label": "负责人", "type": "select", "multiple": true, "ajax": { param: { _dataType: "admin" }, url: "/info/getCommonList", keyLabel: "nickName", keyValue: "userName" }, "frequency": { sytle: { width: '48px' }, dataType: "array", options: [{ value: "13691916429", label: "刘咏辉" }, { value: "13415028975", label: "林丰浩" }] } };
//字段order_user:订单用户

DYDICT.order_user = { "ajax": { "url": "/info/getCommonList", "param": { "_dataType": "user" } }, "idColumn2": "openid", "idColumn": "openid", "populateColumn": "userDoc" };

//字段note_category:api分类

DYDICT.note_category = { "populateColumn": "categoryDoc", "idColumn": "category", "idColumn2": "_id", "ajax": { "param": { "_dataType": "note_category" }, "url": "/info/getCommonList" } };

//字段js_api_category:分类

DYDICT.js_api_category = { "ajax": { "url": "/info/getCommonList", "param": { "_dataType": "js_api_category" } }, "idColumn2": "_id", "idColumn": "category", "populateColumn": "categoryDoc" };

//字段css_api_category:分类

DYDICT.css_api_category = { "populateColumn": "categoryDoc", "idColumn": "category", "idColumn2": "_id", "ajax": { "param": { "_dataType": "css_api_category" }, "url": "/info/getCommonList" } };

//字段complete2:完成情况
DYDICT.arr_complete2 = [{ "label": "未开始", "value": 1 }, { "label": "进行中", "value": 2 }, { "label": "已完成", "value": 3 }];DYDICT.complete2 = { "1": { "label": "未开始", "value": 1 }, "2": { "label": "进行中", "value": 2 }, "3": { "label": "已完成", "value": 3 } };

//字段complete:完成度
DYDICT.arr_complete = [{ "label": "0%", "value": 0 }, { "label": "10%", "value": 0.1 }, { "label": "20%", "value": 0.2 }, { "label": "30%", "value": 0.3 }, { "label": "40%", "value": 0.4 }, { "label": "50%", "value": 0.5 }, { "label": "60%", "value": 0.6 }, { "label": "70%", "value": 0.7 }, { "label": "80%", "value": 0.8 }, { "label": "90%", "value": 0.9 }, { "label": "100%", "value": 1 }];DYDICT.complete = { "0": { "label": "0%", "value": 0 }, "1": { "label": "100%", "value": 1 }, "0.1": { "label": "10%", "value": 0.1 }, "0.2": { "label": "20%", "value": 0.2 }, "0.3": { "label": "30%", "value": 0.3 }, "0.4": { "label": "40%", "value": 0.4 }, "0.5": { "label": "50%", "value": 0.5 }, "0.6": { "label": "60%", "value": 0.6 }, "0.7": { "label": "70%", "value": 0.7 }, "0.8": { "label": "80%", "value": 0.8 }, "0.9": { "label": "90%", "value": 0.9 } };

D_ITEMS.complete = { "prop": "complete", "label": "完成度" };

COLUMNS.complete = { "prop": "complete", "label": "完成度", "width": 80, "slotName": "slot_column_complete", "fixed": false, "edit": false };
COLUMNS.complete_com = { "prop": "complete", "label": "完成度", "width": 80, "slotName": "", "fixed": false, "edit": false, "component": "com_complete" };

F_ITEMS.complete = { "prop": "complete", "label": "完成度", "default": "0", "type": "slider", "varType": "number", "options": DYDICT.arr_complete };
//字段taskType:任务类型
DYDICT.arr_taskType = [{ "label": "新需求", "value": 1 }, { "label": "bug", "value": 2 }, { "label": "架构优化", "value": 4 }, { "label": "性能优化", "value": 5 }, { "label": "其他", "value": 3 }];DYDICT.taskType = { "1": { "label": "新需求", "value": 1 }, "2": { "label": "bug", "value": 2 }, "3": { "label": "其他", "value": 3 }, "4": { "label": "架构优化", "value": 4 }, "5": { "label": "性能优化", "value": 5 } };

D_ITEMS.taskType = { "prop": "taskType", "label": "任务类型" };

COLUMNS.taskType = { "prop": "taskType", "label": "任务类型", "width": 70, "fixed": false, "edit": false, "formatter": function formatter(row) {
    return lodash.get(DYDICT.taskType, row.taskType + ".label");
  } };

F_ITEMS.taskType = { "prop": "taskType", "label": "任务类型", "type": "select", "options": DYDICT.arr_taskType };F_ITEMS.taskType_radio = { "prop": "taskType", "label": "任务类型", "type": "radio", "options": DYDICT.arr_taskType };
//字段prior:优先级
DYDICT.arr_prior = [{ "label": "很高", "value": 1 }, { "label": "高", "value": 2 }, { "label": "中", "value": 3 }, { "label": "低", "value": 4 }];DYDICT.prior = { "1": { "label": "很高", "value": 1 }, "2": { "label": "高", "value": 2 }, "3": { "label": "中", "value": 3 }, "4": { "label": "低", "value": 4 } };

D_ITEMS.prior = { "prop": "prior", "label": "优先级" };

COLUMNS.prior = { "prop": "prior", "label": "优先级", "width": 80, "fixed": false, "edit": false, "formatter": function formatter(row) {
    return lodash.get(DYDICT.prior, row.prior + ".label");
  } };

F_ITEMS.prior = { "prop": "prior", "label": "优先级", "type": "select", "options": undefined };F_ITEMS.prior_radio = { "prop": "prior", "label": "优先级", "type": "radio", "options": undefined };
//字段orderSource:订单来源
DYDICT.arr_orderSource = [{ "label": "微信平台", "value": 1 }, { "label": "线下登记", "value": 2 }];DYDICT.orderSource = { "1": { "label": "微信平台", "value": 1 }, "2": { "label": "线下登记", "value": 2 } };

D_ITEMS.orderSource = { "prop": "orderSource", "label": "订单来源" };

COLUMNS.orderSource = { "prop": "orderSource", "label": "订单来源", "width": 70, "fixed": false, "edit": false, "formatter": function formatter(rowData) {
    return lodash.get(DYDICT.orderSource, rowData.orderSource + ".label");
  } };

F_ITEMS.orderSource = { "prop": "orderSource", "label": "订单来源", "type": "select", "options": DYDICT.arr_orderSource };
//字段deliveryStatus:物流状态
DYDICT.arr_deliveryStatus = [{ "label": "未发货", "value": 1 }, { "label": "发货中", "value": 2 }, { "label": "已收货", "value": 3 }];DYDICT.deliveryStatus = { "1": { "label": "未发货", "value": 1 }, "2": { "label": "发货中", "value": 2 }, "3": { "label": "已收货", "value": 3 } };

D_ITEMS.deliveryStatus = { "prop": "deliveryStatus", "label": "物流状态" };

COLUMNS.deliveryStatus = { "prop": "deliveryStatus", "label": "物流状态", "width": 70, "fixed": false, "edit": false, "formatter": function formatter(rowData) {
    return lodash.get(DYDICT.deliveryStatus, rowData.deliveryStatus + ".label");
  } };

F_ITEMS.deliveryStatus = { "prop": "deliveryStatus", "label": "物流状态", "type": "select", "options": DYDICT.arr_deliveryStatus };
//字段CreateTime:创建时间


D_ITEMS.CreateTime = { "prop": "CreateTime", "label": "创建时间" };

COLUMNS.CreateTime = { "prop": "CreateTime", "label": "创建时间", "width": 90, "fixed": false, "edit": false, "formatter": function formatter(row) {
    if (!row.CreateTime) return "";return moment(row.CreateTime).format("YYYY-MM-DD");
  } };

//字段payStatus:支付状态
DYDICT.arr_payStatus = [{ "label": "未支付", "value": 1 }, { "label": "已支付", "value": 2 }, { "label": "申请退款中", "value": 3 }, { "label": "已退款", "value": 4 }];DYDICT.payStatus = { "1": { "label": "未支付", "value": 1 }, "2": { "label": "已支付", "value": 2 }, "3": { "label": "申请退款中", "value": 3 }, "4": { "label": "已退款", "value": 4 } };

D_ITEMS.payStatus = { "prop": "payStatus", "label": "支付状态", "formatter": function formatter(rowData) {
    return lodash.get(DYDICT.payStatus, rowData.payStatus + ".label");
  } };

COLUMNS.payStatus = { "prop": "payStatus", "label": "支付状态", "width": 70, "fixed": false, "edit": false, "formatter": function formatter(rowData) {
    return lodash.get(DYDICT.payStatus, rowData.payStatus + ".label");
  } };
COLUMNS.payStatus_slot = { "prop": "payStatus", "label": "支付状态", "width": 130, "slotName": "slot_column_payStatus", "fixed": false, "edit": false };
COLUMNS.payStatus_com = { "prop": "payStatus", "label": "支付状态", "width": 90, "fixed": false, "edit": false, "component": "com_c_item_payStatus" };

F_ITEMS.payStatus = { "prop": "payStatus", "label": "支付状态", "type": "select", "options": DYDICT.arr_payStatus };
//字段dataType:数据类型
DYDICT.arr_dataType = [{ "label": "知识点", "value": "note" }, { "label": "前端demo", "value": "front_demo" }, { "label": "习题", "value": "exercises" }, { "label": "分组", "value": "group" }, { "label": "HtmlApi", "value": "html_api" }, { "label": "Js-Api", "value": "js_api" }, { "label": "Css-Api", "value": "css_api" }, { "label": "视频", "value": "vedio" }, { "label": "网址", "value": "url" }];DYDICT.dataType = { "note": { "label": "知识点", "value": "note" }, "front_demo": { "label": "前端demo", "value": "front_demo" }, "exercises": { "label": "习题", "value": "exercises" }, "group": { "label": "分组", "value": "group" }, "html_api": { "label": "HtmlApi", "value": "html_api" }, "js_api": { "label": "Js-Api", "value": "js_api" }, "css_api": { "label": "Css-Api", "value": "css_api" }, "vedio": { "label": "视频", "value": "vedio" }, "url": { "label": "网址", "value": "url" } };

D_ITEMS.dataType = { "prop": "dataType", "label": "数据类型" };D_ITEMS.group_dataType = { "prop": "dataType", "label": "数据类型" };

COLUMNS.dataType = { "prop": "dataType", "label": "数据类型", "width": 80, "fixed": false, "edit": false };
COLUMNS.group_dataType = { "prop": "dataType", "label": "数据类型", "width": 90, "fixed": false, "edit": false };

F_ITEMS.dataType = { "prop": "dataType", "label": "数据类型", "type": "input" };F_ITEMS.group_dataType = { "prop": "dataType", "label": "数据类型", "type": "select", "ajax": { param: { _dataType: "data_type" }, url: "/info/getCommonList", keyLabel: "title", keyValue: "key" } };
//字段boolean:boolean
DYDICT.arr_boolean = [{ "label": "否", "value": 0 }, { "label": "是", "value": 1 }];DYDICT.boolean = { "0": { "label": "否", "value": 0 }, "1": { "label": "是", "value": 1 } };

//字段selfClose:自闭合
DYDICT.arr_selfClose = [{ "label": "否", "value": "0" }, { "label": "是", "value": "1" }];DYDICT.selfClose = { "0": { "label": "否", "value": "0" }, "1": { "label": "是", "value": "1" } };

D_ITEMS.selfClose = { "prop": "selfClose", "label": "自闭合" };

COLUMNS.selfClose = { "prop": "selfClose", "label": "自闭合", "edit": false, "fixed": false, "width": 70 };

F_ITEMS.selfClose = { "prop": "selfClose", "label": "自闭合", "type": "select", "options": DYDICT.arr_selfClose };
//字段html_version:版本
DYDICT.arr_html_version = [{ "label": "HTML4", "value": "HTML4" }, { "label": "HTML5", "value": "HTML5" }];DYDICT.html_version = { "HTML4": { "label": "HTML4", "value": "HTML4" }, "HTML5": { "label": "HTML5", "value": "HTML5" } };

D_ITEMS.html_version = { "prop": "html_version", "label": "版本" };

COLUMNS.html_version = { "prop": "html_version", "label": "版本", "width": 70, "fixed": false, "edit": false };

F_ITEMS.html_version = { "prop": "html_version", "label": "版本", "type": "select", "options": DYDICT.arr_html_version };
//字段difficulty:难度
DYDICT.arr_difficulty = [{ "label": "简单", "value": 1 }, { "label": "一般", "value": 2 }, { "label": "困难", "value": 3 }, { "label": "很难", "value": 4 }];DYDICT.difficulty = { "1": { "label": "简单", "value": 1 }, "2": { "label": "一般", "value": 2 }, "3": { "label": "困难", "value": 3 }, "4": { "label": "很难", "value": 4 } };

D_ITEMS.difficulty = { "prop": "difficulty", "label": "难度" };

COLUMNS.difficulty = { "prop": "difficulty", "label": "难度", "width": 70, "fixed": false, "edit": false, "formatter": function formatter(rowData) {
    return lodash.get(DYDICT.difficulty, rowData.difficulty + ".label");
  } };
COLUMNS.difficulty_edit = { "prop": "difficulty", "label": "难度", "width": 70, "fixed": false, "edit": true, "formatter": function formatter(rowData) {
    return lodash.get(DYDICT.difficulty, rowData.difficulty + ".label");
  } };

F_ITEMS.difficulty = { "prop": "difficulty", "label": "难度", "type": "select", "options": DYDICT.arr_difficulty };F_ITEMS.difficulty_radio = { "prop": "difficulty", "label": "难度", "type": "radio", "options": DYDICT.arr_difficulty };
//字段category:所属分类


D_ITEMS.category = { "prop": "category", "label": "所属分类" };

COLUMNS.category = { "prop": "category", "label": "所属分类", "width": 120, "fixed": false, "edit": false, "formatter": function formatter(rowData) {
    var title = lodash.get(rowData, "categoryDoc.title");return title;
  } };
COLUMNS.category_multiple = { "prop": "category", "label": "所属分类", "width": 120, "fixed": false, "edit": false, "formatter": function formatter(rowData) {
    if (!(rowData.categoryDoc && rowData.categoryDoc.length)) return "";var arrCate = rowData.categoryDoc.map(function (doc) {
      return doc.title;
    });return arrCate.join();
  } };

F_ITEMS.category = { "prop": "category", "label": "所属分类" };F_ITEMS.html_api_category = { "prop": "category", "label": "所属分类", "type": "select", "ajax": { param: { _dataType: "html_api_category" }, url: "/info/getCommonList", keyLabel: "title", keyValue: "_id" } };F_ITEMS.css_api_category = { "prop": "category", "label": "所属分类", "type": "select", "ajax": { param: { _dataType: "css_api_category" }, url: "/info/getCommonList", keyLabel: "title", keyValue: "_id" } };F_ITEMS.js_api_category = { "prop": "category", "label": "所属分类", "type": "select", "ajax": { param: { _dataType: "js_api_category" }, url: "/info/getCommonList", keyLabel: "title", keyValue: "_id" } };F_ITEMS.note_category = { "prop": "category", "label": "所属分类", "type": "select", "multiple": true, "ajax": { param: { _dataType: "note_category" }, url: "/info/getCommonList", keyLabel: "title", keyValue: "_id" } };
//字段title:标题


D_ITEMS.title = { "prop": "title", "label": "标题" };

COLUMNS.title = { "prop": "title", "label": "标题", "width": 100, "edit": false, "fixed": false };
COLUMNS.title_w100 = { "prop": "title", "label": "标题", "width": 100, "edit": false, "fixed": false };
COLUMNS.title_w150 = { "prop": "title", "label": "标题", "width": 150, "edit": false, "fixed": false };
COLUMNS.title_fixed_w150 = { "prop": "title", "label": "标题", "width": 150, "edit": false, "fixed": true };
COLUMNS.title_fixed_w150_edit = { "prop": "title", "label": "标题", "width": 150, "edit": true, "fixed": true };
COLUMNS.title_w200 = { "prop": "title", "label": "标题", "width": 200, "edit": false, "fixed": false };
COLUMNS.title_w250 = { "prop": "title", "label": "标题", "width": 250, "edit": false, "fixed": false };
COLUMNS.title_w300 = { "prop": "title", "label": "标题", "width": 300, "edit": false, "fixed": false };
COLUMNS.title_fixed = { "prop": "title", "label": "标题", "width": 320, "edit": false, "fixed": true };
COLUMNS.title_fixed_edit = { "prop": "title", "label": "标题", "width": 320, "edit": true, "fixed": true };

F_ITEMS.title = { "prop": "title", "label": "标题" };F_ITEMS.title_search = { "prop": "title", "label": "标题", "type": "input_find_vague" };
//字段timeOrder:下单时间


D_ITEMS.timeOrder = { "prop": "timeOrder", "label": "下单时间", "formatter": function formatter(row) {
    if (!row.timeOrder) return "";return moment(row.timeOrder).format("YYYY-MM-DD HH:mm");
  } };

COLUMNS.timeOrder = { "prop": "timeOrder", "label": "下单时间", "item_width": 130, "formatter": function formatter(row) {
    if (!row.timeOrder) return "";return moment(row.timeOrder).format("YYYY-MM-DD HH:mm");
  } };

F_ITEMS.timeOrder = { "prop": "timeOrder", "label": "下单时间", "varType": "string", "type": "dateTime" };F_ITEMS.timeOrder_search = { "prop": "timeOrder", "label": "下单时间", "varType": "string", "type": "time_period" };
//字段html_api_category:html_api分类

DYDICT.html_api_category = { "ajax": { "url": "/info/getCommonList", "param": { "_dataType": "html_api_category" } }, "idColumn2": "_id", "idColumn": "category", "populateColumn": "categoryDoc" };

//字段html_display:块级
DYDICT.arr_html_display = [{ "label": "block", "value": "block" }, { "label": "inline", "value": "inline" }, { "label": "inline-block", "value": "inline-block" }, { "label": "none", "value": "none" }];DYDICT.html_display = { "block": { "label": "block", "value": "block" }, "inline": { "label": "inline", "value": "inline" }, "inline-block": { "label": "inline-block", "value": "inline-block" }, "none": { "label": "none", "value": "none" } };

D_ITEMS.html_display = { "prop": "html_display", "label": "块级" };

COLUMNS.html_display = { "prop": "html_display", "label": "块级", "edit": false, "fixed": false, "width": 70 };

F_ITEMS.html_display = { "prop": "html_display", "label": "块级", "type": "select", "options": DYDICT.arr_html_display };
//字段importance:重要性
DYDICT.arr_importance = [{ "label": "作废", "value": 1 }, { "label": "次要", "value": 2 }, { "label": "一般", "value": 3 }, { "label": "重要", "value": 4 }, { "label": "很重要", "value": 5 }];DYDICT.importance = { "1": { "label": "作废", "value": 1 }, "2": { "label": "次要", "value": 2 }, "3": { "label": "一般", "value": 3 }, "4": { "label": "重要", "value": 4 }, "5": { "label": "很重要", "value": 5 } };

D_ITEMS.importance = { "prop": "importance", "label": "重要性" };

COLUMNS.importance = { "prop": "importance", "label": "重要性", "edit": false, "fixed": false, "width": 70, "formatter": function formatter(rowData) {
    return lodash.get(DYDICT.importance, rowData.importance + ".label");
  } };
COLUMNS.importance_edit = { "prop": "importance", "label": "重要性", "edit": true, "fixed": false, "width": 70, "formatter": function formatter(rowData) {
    return lodash.get(DYDICT.importance, rowData.importance + ".label");
  } };

F_ITEMS.importance = { "prop": "importance", "label": "重要性", "type": "select", "options": DYDICT.arr_importance };F_ITEMS.importance_radio = { "prop": "importance", "label": "重要性", "type": "radio", "options": DYDICT.arr_importance };