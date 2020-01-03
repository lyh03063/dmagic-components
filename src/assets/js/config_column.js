
import "./config_detail.js"
//#region COLUMNS:列字段管理

window.COLUMNS = {}

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
COLUMNS.title_fixed = {
  label: "标题",
  prop: "title",
  width: 160,
  fixed: true
};
COLUMNS.desc = {
  label: "说明",
  prop: "desc",
  showOverflowTooltip:true,
  width: 260,
};



COLUMNS.item_prop = { ...D_ITEMS.item_prop, width: 120, };
COLUMNS.item_label = { ...D_ITEMS.item_label, width: 160, };
COLUMNS.item_type = { ...D_ITEMS.item_type, width: 120, };

COLUMNS.aaaa = 11111;
/****************************赛事报名-END****************************/



COLUMNS.category = {
  ...D_ITEMS.category,
  width: 120,
  formatter: function (rowData) {
    let title = lodash.get(rowData, "categoryDoc.title");
    return title;
  }
};





//#endregion

