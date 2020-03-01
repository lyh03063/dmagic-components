"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

window.COLUMNS = {};
//#region 唐球过来
COLUMNS.Id = {
  label: "Id",
  prop: "P1",
  width: 50
};
COLUMNS.sex = Object.assign({}, D_ITEMS.sex, { width: 50 });
COLUMNS.phone = {
  label: "手机号",
  prop: "phone",
  width: 110
};
COLUMNS.orderId = _extends({}, D_ITEMS.orderId, { width: 160 });
COLUMNS.openid = _extends({}, D_ITEMS.openid);

//#endregion

//#region 龙庭订单
COLUMNS.transaction_id = _extends({}, D_ITEMS.transaction_id);
COLUMNS.timeOrder = _extends({}, D_ITEMS.timeOrder);
COLUMNS.priceOrder = _extends({}, D_ITEMS.priceOrder);
COLUMNS.listGoods = _extends({}, D_ITEMS.listGoods);
COLUMNS.addressObj = _extends({}, D_ITEMS.addressObj);
COLUMNS.remark = _extends({}, D_ITEMS.remark);
COLUMNS.payStatus = _extends({}, D_ITEMS.payStatus);
//#endregion

//#region 通用
COLUMNS.title_fixed = _extends({}, D_ITEMS.title, { width: 320, fixed: true });
COLUMNS.title_fixed_w150 = _extends({}, COLUMNS.title_fixed, { width: 150 });
COLUMNS.title_fixed_w150_edit = _extends({}, COLUMNS.title_fixed_w150, { edit: true });
COLUMNS.title_fixed_edit = _extends({}, COLUMNS.title_fixed, { edit: true });

COLUMNS.desc = _extends({}, D_ITEMS.desc, { width: 160 });
COLUMNS.html_display = _extends({}, D_ITEMS.html_display, { width: 70 });
COLUMNS.importance = _extends({}, D_ITEMS.importance, { width: 70,
  formatter: function formatter(rowData) {
    return lodash.get(DYDICT.importance, rowData.importance + ".label");
  }
});

COLUMNS.importance_edit = _extends({}, COLUMNS.importance, { edit: true
});
COLUMNS._data = _extends({}, D_ITEMS._data, { width: 90 });

COLUMNS.arrGroup = _extends({}, D_ITEMS.arrGroup, { width: 100 });
COLUMNS.countGroup = _extends({}, D_ITEMS.countGroup, { width: 60 });

//#endregion
//#region html_api
COLUMNS.html_display = _extends({}, D_ITEMS.html_display, { width: 70 });
COLUMNS.difficulty = _extends({}, D_ITEMS.difficulty, { width: 70,
  formatter: function formatter(rowData) {
    return lodash.get(DYDICT.difficulty, rowData.difficulty + ".label");
  }
});

COLUMNS.difficulty_edit = _extends({}, COLUMNS.difficulty, { edit: true
});
COLUMNS.english = _extends({}, D_ITEMS.english, { width: 70 });
COLUMNS.html_version = _extends({}, D_ITEMS.html_version, { width: 70 });

COLUMNS.selfClose = _extends({}, D_ITEMS.selfClose, { width: 70 });
COLUMNS.cateIdOld = _extends({}, D_ITEMS.cateIdOld, { width: 70 });
COLUMNS.demoList = _extends({}, D_ITEMS.demoList, { width: 90 });

COLUMNS.css_version = _extends({}, D_ITEMS.css_version, { width: 70 });
//#endregion
//#region 管理员
//  COLUMNS.detail = {...D_ITEMS.detail, width: 120,};
COLUMNS.userName = _extends({}, D_ITEMS.userName, { width: 150 });
COLUMNS.passWord = _extends({}, D_ITEMS.passWord, { width: 150 });
COLUMNS.nickName = _extends({}, D_ITEMS.nickName, { width: 120 });
COLUMNS.role = _extends({}, D_ITEMS.role, { width: 120 });
//#endregion
//#region 角色
COLUMNS.roleName = _extends({}, D_ITEMS.roleName, { width: 120 });
COLUMNS.rolePower = _extends({}, D_ITEMS.rolePower, { width: 120 });
//#endregion
//#region 分类
COLUMNS.category_name = _extends({}, D_ITEMS.category_name, { width: 120 });
COLUMNS.category_remark = _extends({}, D_ITEMS.category_remark, { width: 180 });
//#endregion
//#region 熟悉度等
COLUMNS.familiarity_select = _extends({}, D_ITEMS.familiarity, { width: 120,
  slot: "slot_column_familiarity",
  cfColumn: { "class-name": "table_cell_visible" //补充特殊单元格类名，进行特殊控制！
  } });
COLUMNS.familiarity = _extends({}, D_ITEMS.familiarity, { width: 100
});
COLUMNS.dataType = _extends({}, D_ITEMS.dataType, { width: 80 });
COLUMNS.dataId = _extends({}, D_ITEMS.dataId, { width: 210 });
COLUMNS.userId = _extends({}, D_ITEMS.userId, { width: 120 });
COLUMNS._userId = _extends({}, D_ITEMS._userId, { width: 120 });
COLUMNS._id = _extends({}, D_ITEMS._id, { width: 80,
  sortable: "custom" //开启后端排序
});
COLUMNS.myScore = _extends({}, D_ITEMS.myScore, { width: 90 });
COLUMNS.score = _extends({}, D_ITEMS.score, { width: 90 });
//#endregion
//#region 分组
COLUMNS.group_dataType = _extends({}, D_ITEMS.group_dataType, { width: 90 });
COLUMNS.countData = _extends({}, D_ITEMS.countData, { width: 80 });
COLUMNS.myScore = _extends({}, D_ITEMS.myScore, { width: 90, slot: "slot_column_score" });
COLUMNS.alias = _extends({}, D_ITEMS.alias, { width: 130 });
//#endregion
//#region 关系
COLUMNS._idRel = _extends({}, D_ITEMS._idRel, { width: 220 });
COLUMNS._idRel2 = _extends({}, D_ITEMS._idRel2, { width: 220 });
COLUMNS.sort = _extends({}, D_ITEMS.sort, { width: 70 });
//#endregion
//#region 分类等
//单个的分类
COLUMNS.category = _extends({}, D_ITEMS.category, {
  width: 120,
  formatter: function formatter(rowData) {
    var title = lodash.get(rowData, "categoryDoc.title");
    return title;
  }
});
//支持多个的分类
COLUMNS.category_multiple = _extends({}, D_ITEMS.category, {
  width: 120,
  formatter: function formatter(rowData) {
    if (!(rowData.categoryDoc && rowData.categoryDoc.length)) return "";
    var arrCate = rowData.categoryDoc.map(function (doc) {
      return doc.title;
    });
    return arrCate.join();
  }
});
COLUMNS.studyTime = _extends({}, D_ITEMS.studyTime, {
  width: 140
});
COLUMNS.dataTypekey = _extends({}, D_ITEMS.dataTypekey, { width: 120 });

//#endregion

//#region 网址

COLUMNS.link = _extends({}, D_ITEMS.link, { width: 120 });
//#endregion
//#region 笔记
COLUMNS.note_linkList = _extends({}, D_ITEMS.note_linkList, { width: 120 });
COLUMNS.note_noteList = _extends({}, D_ITEMS.note_noteList, { width: 120 });
COLUMNS.keyword = _extends({}, D_ITEMS.keyword, { width: 70 });
COLUMNS.keyword_edit = _extends({}, COLUMNS.keyword, { edit: true });
//#endregion

COLUMNS.vedio = _extends({}, D_ITEMS.vedio, { width: 70 });

//#region dm组件库用到
COLUMNS.item_prop = _extends({}, D_ITEMS.item_prop, { width: 120 });
COLUMNS.item_label = _extends({}, D_ITEMS.item_label, { width: 160 });
COLUMNS.item_type = _extends({}, D_ITEMS.item_type, { width: 120 });

COLUMNS.name = _extends({}, D_ITEMS.name, {
  width: 200
});
COLUMNS.name_fixed = _extends({}, COLUMNS.name, {
  fixed: true,
  edit: true
});

COLUMNS.extend = {
  label: "其他",
  prop: "extend",
  width: 235
};
//#endregion

//#region 商品
COLUMNS.priceMarket = _extends({}, D_ITEMS.priceMarket, { width: 90 });
COLUMNS.priceSell = _extends({}, D_ITEMS.priceSell, { width: 90 });
COLUMNS.isPublish = _extends({}, D_ITEMS.isPublish, { width: 90 });
COLUMNS.countOrder = _extends({}, D_ITEMS.countOrder, { width: 90 });
//#endregion