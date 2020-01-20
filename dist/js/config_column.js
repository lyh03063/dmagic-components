"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

require("./config_detail.js");

//#region COLUMNS:列字段管理

window.COLUMNS = {};

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
COLUMNS.title_fixed = {
  label: "标题",
  prop: "title",
  width: 160,
  fixed: true
};
COLUMNS.desc = {
  label: "说明",
  prop: "desc",
  showOverflowTooltip: true,
  width: 260
};

COLUMNS.item_prop = _extends({}, D_ITEMS.item_prop, { width: 120 });
COLUMNS.item_label = _extends({}, D_ITEMS.item_label, { width: 160 });
COLUMNS.item_type = _extends({}, D_ITEMS.item_type, { width: 120 });

COLUMNS.aaaa = 11111;
/****************************赛事报名-END****************************/

COLUMNS.category = _extends({}, D_ITEMS.category, {
  width: 120,
  formatter: function formatter(rowData) {
    var title = lodash.get(rowData, "categoryDoc.title");
    return title;
  }
});

//#endregion