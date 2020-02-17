window.COLUMNS = {}
//#region 唐球过来
COLUMNS.Id = {
  label: "Id",
  prop: "P1",
  width: 50
};
COLUMNS.sex = Object.assign({}, D_ITEMS.sex, { width: 50, })
COLUMNS.phone = {
  label: "手机号",
  prop: "phone",
  width: 110
};
COLUMNS.orderId = { ...D_ITEMS.orderId, width: 160 };
COLUMNS.openid = { ...D_ITEMS.openid };

//#endregion

//#region 龙庭订单
COLUMNS.transaction_id = { ...D_ITEMS.transaction_id };
COLUMNS.timeOrder = { ...D_ITEMS.timeOrder };
COLUMNS.priceOrder = { ...D_ITEMS.priceOrder };
COLUMNS.goodsList = { ...D_ITEMS.goodsList };
COLUMNS.addressObj = { ...D_ITEMS.addressObj };
COLUMNS.remark = { ...D_ITEMS.remark };
COLUMNS.aaa = { ...D_ITEMS.aaa };
//#endregion

//#region 通用
COLUMNS.title_fixed = { ...D_ITEMS.title, width: 320, fixed: true };
COLUMNS.title_fixed_w150 = { ...COLUMNS.title_fixed, width: 150 };
COLUMNS.title_fixed_w150_edit = { ...COLUMNS.title_fixed_w150, edit: true };
COLUMNS.title_fixed_edit = { ...COLUMNS.title_fixed, edit: true };


COLUMNS.desc = { ...D_ITEMS.desc, width: 160, };
COLUMNS.html_display = { ...D_ITEMS.html_display, width: 70, };
COLUMNS.importance = {
  ...D_ITEMS.importance, width: 70,
  formatter: function (rowData) {
    return lodash.get(DYDICT.importance, `${rowData.importance}.label`);
  },
};

COLUMNS.importance_edit = {
  ...COLUMNS.importance, edit: true
};
COLUMNS._data = { ...D_ITEMS._data, width: 90, };

COLUMNS.arrGroup = { ...D_ITEMS.arrGroup, width: 100, };
COLUMNS.countGroup = { ...D_ITEMS.countGroup, width: 60, };

//#endregion
//#region html_api
COLUMNS.html_display = { ...D_ITEMS.html_display, width: 70, };
COLUMNS.difficulty = {
  ...D_ITEMS.difficulty, width: 70,
  formatter: function (rowData) {
    return lodash.get(DYDICT.difficulty, `${rowData.difficulty}.label`);
  },
};

COLUMNS.difficulty_edit = {
  ...COLUMNS.difficulty, edit: true
};
COLUMNS.english = { ...D_ITEMS.english, width: 70, };
COLUMNS.html_version = { ...D_ITEMS.html_version, width: 70, };

COLUMNS.selfClose = { ...D_ITEMS.selfClose, width: 70, };
COLUMNS.cateIdOld = { ...D_ITEMS.cateIdOld, width: 70, };
COLUMNS.demoList = { ...D_ITEMS.demoList, width: 90, };


COLUMNS.css_version = { ...D_ITEMS.css_version, width: 70, };
//#endregion
//#region 管理员
//  COLUMNS.detail = {...D_ITEMS.detail, width: 120,};
COLUMNS.userName = { ...D_ITEMS.userName, width: 150, };
COLUMNS.passWord = { ...D_ITEMS.passWord, width: 150, };
COLUMNS.nickName = { ...D_ITEMS.nickName, width: 120, };
COLUMNS.role = { ...D_ITEMS.role, width: 120, };
//#endregion
//#region 角色
COLUMNS.roleName = { ...D_ITEMS.roleName, width: 120, };
COLUMNS.rolePower = { ...D_ITEMS.rolePower, width: 120, };
//#endregion
//#region 分类
COLUMNS.category_name = { ...D_ITEMS.category_name, width: 120, };
COLUMNS.category_remark = { ...D_ITEMS.category_remark, width: 180, };
//#endregion
//#region 熟悉度等
COLUMNS.familiarity_select = {
  ...D_ITEMS.familiarity, width: 120,
  slot: "slot_column_familiarity",
  cfColumn: { "class-name": "table_cell_visible" }//补充特殊单元格类名，进行特殊控制！
};
COLUMNS.familiarity = {
  ...D_ITEMS.familiarity, width: 100,
};
COLUMNS.dataType = { ...D_ITEMS.dataType, width: 80, };
COLUMNS.dataId = { ...D_ITEMS.dataId, width: 210, };
COLUMNS.userId = { ...D_ITEMS.userId, width: 120, };
COLUMNS._userId = { ...D_ITEMS._userId, width: 120, };
COLUMNS._id = { ...D_ITEMS._id, width: 80,
  sortable: "custom",//开启后端排序
 };
COLUMNS.myScore = { ...D_ITEMS.myScore, width: 90, };
COLUMNS.score = { ...D_ITEMS.score, width: 90, };
//#endregion
//#region 分组
COLUMNS.group_dataType = { ...D_ITEMS.group_dataType, width: 90, };
COLUMNS.countData = { ...D_ITEMS.countData, width: 80, };
COLUMNS.myScore = { ...D_ITEMS.myScore, width: 90, slot: "slot_column_score", };
COLUMNS.alias = { ...D_ITEMS.alias, width: 130};
//#endregion
//#region 关系
COLUMNS._idRel = { ...D_ITEMS._idRel, width: 220, };
COLUMNS._idRel2 = { ...D_ITEMS._idRel2, width: 220, };
COLUMNS.sort = { ...D_ITEMS.sort, width: 70, };
//#endregion
//#region 分类等
//单个的分类
COLUMNS.category = {
  ...D_ITEMS.category,
  width: 120,
  formatter: function (rowData) {
    let title = lodash.get(rowData, "categoryDoc.title");
    return title;
  },
};
//支持多个的分类
COLUMNS.category_multiple = {
  ...D_ITEMS.category,
  width: 120,
  formatter: function (rowData) {
    if (!(rowData.categoryDoc && rowData.categoryDoc.length)) return ""
    let arrCate = rowData.categoryDoc.map(doc => {
      return doc.title
    })
    return arrCate.join();
  }
};
COLUMNS.studyTime = {
  ...D_ITEMS.studyTime,
  width: 140,
};
COLUMNS.dataTypekey = { ...D_ITEMS.dataTypekey, width: 120, };

//#endregion

//#region 网址

COLUMNS.link = { ...D_ITEMS.link, width: 120, };
//#endregion
//#region 笔记
COLUMNS.note_linkList = { ...D_ITEMS.note_linkList, width: 120, };
COLUMNS.note_noteList = { ...D_ITEMS.note_noteList, width: 120, };
COLUMNS.keyword = { ...D_ITEMS.keyword, width: 70, };
COLUMNS.keyword_edit = { ...COLUMNS.keyword, edit: true, };
//#endregion

COLUMNS.vedio = { ...D_ITEMS.vedio, width: 70,};


//#region dm组件库用到
COLUMNS.item_prop = { ...D_ITEMS.item_prop, width: 120, };
COLUMNS.item_label = { ...D_ITEMS.item_label, width: 160, };
COLUMNS.item_type = { ...D_ITEMS.item_type, width: 120, };

COLUMNS.name = {
  ...D_ITEMS.name,
  width: 200
};
COLUMNS.name_fixed = {
  ...COLUMNS.name,
  fixed: true,
  edit: true,
};

COLUMNS.extend = {
  label: "其他",
  prop: "extend",
  width: 235
};
//#endregion

//#region 商品
COLUMNS.priceMarket = { ...D_ITEMS.priceMarket, width: 90,};
COLUMNS.priceSell = { ...D_ITEMS.priceSell, width: 90,};
COLUMNS.isPublish = { ...D_ITEMS.isPublish, width: 90,};
COLUMNS.countOrder = { ...D_ITEMS.countOrder, width: 90,};
//#endregion