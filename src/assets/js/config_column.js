
import "./config_detail.js"
//#region COLUMNS:列字段管理

window.COLUMNS = {}

COLUMNS.name = {
  ...D_ITEMS.name,
  width: 200
};

COLUMNS.name_fixed = {
  ...COLUMNS.name,
  fixed: true
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
   width: 260,
 };
COLUMNS.title_search = {
  label: "标题",
  prop: "title",
  type: "input_find_vague"
};
COLUMNS.aaaa = 11111;
COLUMNS.aaaa = 11111;
COLUMNS.aaaa = 11111;
 /****************************赛事报名-END****************************/


//#endregion

