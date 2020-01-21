import "./config_detail.js"


window.F_ITEMS = {};




//#region form_demo的字段
F_ITEMS.tagList = {
  label: "标签",
  prop: "tagList",
  type: "tag_list"
};

F_ITEMS.Id = {
  label: "数据id",
  prop: "P1",
  type: "input"
};


F_ITEMS.diycheckbox = {
  label: "自定义复选框(slot实现)",
  prop: "diycheckbox",
  slot: "slot_form_item_diycheckbox",
  rules: [{ required: true, message: "不能为空" }]
};



F_ITEMS.num2 = {
  label: "数字2",
  prop: "num2",
  type: "number",
  min: 0,
  max: 3
};
F_ITEMS.num1 = {
  label: "数字(隐藏操作按钮)",
  prop: "num1",
  type: "number",
  min: 0,
  max: 100,
  hideBtn: true,
  frequency: {
    sytle: { width: "48px" },
    options: [{ value: 1 }, { value: 2 }, { value: 3 }]
  }
};
F_ITEMS.collection1 = {
  label: "集合（带工具栏和插槽）1",
  style: { "margin-top": "50px" }, //自定义样式
  prop: "collection1",
  type: "collection",
  // collectionlistType: "form",
  dataSlot: "slot_collection1", //自定义数据插槽
  cfElBtnAdd: {
    //自定义“新增”按钮
    text: "+添加一组",
    type: "primary",
    size: "large",
    plain: false
  },
  collectionCfForm: {
    col_span: 12,
    formItems: [
      {
        label: "时间",
        prop: "time",
        type: "date"
      },
      {
        label: "金额",
        prop: "money"
      }
    ]
  }
};
F_ITEMS.collection2 = {
  label: "集合（无工具栏）",
  prop: "collection2",
  type: "collection",
  collectionlistType: "form",
  showToolbar: false, //不显示集合的工具栏
  collectionCfForm: {
    col_span: 12,
    formItems: [
      {
        label: "时间",
        prop: "time",
        type: "date"
      },
      {
        label: "金额",
        prop: "money"
      }
    ]
  }
};
F_ITEMS.prop_numberRange = {
  label: "数字范围",
  prop: "prop_numberRange",
  type: "numberRange",
  default: { maxN: 4, minN: 1 },
  keyMax: "maxN",
  keyMin: "minN"
};
F_ITEMS.prop1 = {
  label: "普通文本框(input)",
  prop: "prop1",
  type: "input",
  default: "默认文本",
  rules: [
    { required: true, message: "不能为空" },
    {
      pattern: /^[\u4E00-\u9FA5]+$/,
      message: "用户名只能为中文"
    }
  ]
};
F_ITEMS.prop_input_find_vague = {
  label: "用于模糊查询文本框(input_find_vague)",
  prop: "prop_input_find_vague",
  type: "input_find_vague"
};
F_ITEMS.memberId = {
  label: "会员ajax_populate",
  prop: "memberId",
  type: "ajax_populate",
  cfAjaxPopulate: { populateKey: "name", page: "tangball_member" }
};

F_ITEMS.num1_text = {
  label: "文本字段",
  prop: "num1",
  type: "text",
  style: { color: "#f00" },
  tips: "跟下方数字相同"
};
F_ITEMS.groupMember = {
  label: "小组成员",
  prop: "groupMember",
  type: "collection",
  collectionlistType: "form",
  collectionCfForm: {
    col_span: 12,
    formItems: [
      {
        label: "球队id",
        prop: "id",
        type: "select",
        // default:19,
        ajax: {
          url: "/crossList?page=tangball_team",
          keyLabel: "name",
          keyValue: "P1"
        }
      },
      {
        label: "姓名",
        prop: "name"
      }
    ]
  }
};
F_ITEMS.prop4 = {
  label: "下拉框(select+ajax)",
  prop: "prop4",
  type: "select",
  multiple: true, //多选
  ajax: {
    url: "/crossList?page=mabang-member",
    param: { a: 1 },
    keyLabel: "nickName",
    keyValue: "userName"
  }
};
F_ITEMS.num1_component = {
  label: "设置component",
  prop: "num1",
  type: "text",

  component: "el-input"
};
F_ITEMS.complete1 = {
  label: "完成情况[被监听]",
  prop: "complete1",
  type: "select",
  notSubmit: true, //不提交
  toObj: true, //提交（查询）时转成对象，值项应该是json字符串
  // multiple:true,//多选

  options: [
    { value: 1, label: "未开始" }, //complete==0
    { value: 2, label: "进行中" }, //complete>0&&complete>1
    { value: 3, label: "已完成" } //complete>0&&complete>1
  ]
};
F_ITEMS.select1 = {
  label: "下拉框(多选)",
  prop: "select1",
  type: "select",
  // default: [2],
  multiple: true, //多选
  options: [{ value: 1, label: "男" }, { value: 2, label: "女" }]
};
F_ITEMS.prop_editorTM = {
  label: "富文本编辑器(TinyMCE)",
  prop: "prop_editorTM",
  type: "editorTM"
};
F_ITEMS.extend = {
  label: "负责人信息",
  label: "拓展",
  prop: "extend",
  default: { diycheckbox: [] },
  cfForm: {
    col_span: 8,
    labelWidth: "150px",
    formItems: [
      {
        col_span: 24,
        label: "百分比",
        prop: "percent",
        type: "slider"
      },
      {
        label: "diycheckbox(slot实现)",
        prop: "diycheckbox",
        slot: "slot_form_item_diycheckbox",
        rules: [{ required: true, message: "不能为空" }]
      },
      {
        col_span: 24,
        label: "姓名",
        prop: "name",
        type: "input"
      },
      {
        label: "下拉框(select)",
        prop: "sex",
        type: "select",
        default: 2,
        // multiple:true,//多选
        options: [
          { value: 1, label: "男" },
          { value: 2, label: "女" }
        ]
      }
    ]
  }
};
F_ITEMS.prop_upload2 = {
  label: "文件上传2",
  prop: "prop_upload2",
  type: "upload",
  uploadConfig: {
    limit: 2,
    listType: "text"
  }
};
F_ITEMS.prop_upload = {
  label: "图片上传",
  prop: "prop_upload",
  type: "upload",
  uploadConfig: {
    limit: 3,
    preview: true
  }
};
F_ITEMS.prop_vueJsonEditor = {
  label: "json编辑器(vueJsonEditor)",
  prop: "prop_vueJsonEditor",
  type: "vueJsonEditor"
};
//#endregion


//#region 其他表单字段

F_ITEMS.label_search = {
  label: "label",
  prop: "label",
  type: "input_find_vague"
};

F_ITEMS.item_label = {
  label: "label说明",
  prop: "label",
  type: "input"
};
F_ITEMS.item_prop = {
  label: "prop属性名",
  prop: "prop",
  type: "input"
};
F_ITEMS.item_type = {
  label: "type",
  prop: "type",
  type: "input"
};
F_ITEMS.name = {
  label: "标题111",
  prop: "name",
}
F_ITEMS.name_search = {
  label: "标题123",
  prop: "name",
  type: "input_find_vague"
};


F_ITEMS.title = { ...D_ITEMS.title };
F_ITEMS.desc = { ...D_ITEMS.desc, type: "textarea" };
F_ITEMS.detail = { ...D_ITEMS.detail, type: "editorTM" };
F_ITEMS.title_search = { ...D_ITEMS.title, type: "input_find_vague" };



F_ITEMS.importance = {
  "label": "重要性",
  "prop": "importance",
  "type": "select",
  "options": [{
    "label": "作废",
    "value": 1
  }, {
    "label": "次要",
    "value": 2
  }, {
    "label": "一般",
    "value": 3
  }, {
    "label": "重要",
    "value": 4
  }, {
    "label": "很重要",
    "value": 5
  }]
};

//#endregion

//#region 文章列表选择配置
let cfListSelectActicle = {
  //选择列表配置
  dataName: "文章",
  valueKey: "P1",
  labelKey: "articleTitle",
  pageName: "tangball_article",
  multiple: true,//多选
  cfList: {
    pageSize: 10,
    focusMenu: false, //进行菜单聚焦
    isShowBreadcrumb: false, //面包屑
    isShowToolBar: false, //批量操作栏
    isShowOperateColumn: false, //单项操作列
    isRefreshAfterCUD: false, //是否在增删改操作后自动更新列表
    // isMultipleSelect: false, //不支持多选
    url: {
      list: "/crossList?page=tangball_article" //列表接口
    },
    dynamicDict: [
      {
        page: "tangball_article_category",
        populateColumn: "categoryDoc",
        idColumn: "articleCategory",
        idColumn2: "P1"
      }
    ],
    //-------列配置数组-------
    columns: [
      {
        label: "文章标题aaa",
        prop: "articleTitle",
        width: 260
      },
      {
        label: "分类名称",
        prop: "articleCategory",
        requireProp: ["articleContent"], //依赖文章详情，列表需返回该字段
        width: "auto",
        formatter: function (rowData) {
          let name = lodash.get(rowData, "categoryDoc.name");
          return name;
        }
      }
    ],
    //-------筛选表单字段数组-------
    searchFormItems: [
      {
        label: "下拉框(多选)",
        prop: "select1",
        type: "select",
        // default: [2],
        multiple: true, //多选
        options: [{ value: 1, label: "男" }, { value: 2, label: "女" }]
      },
      {
        label: "文章分类",
        prop: "articleCategory",
        type: "select",
        ajax: {
          url: "/crossList?page=tangball_article_category",
          keyLabel: "name",
          keyValue: "P1"
        }
      },
      {
        label: "文章标题",
        prop: "articleTitle",
        type: "input_find_vague"
      }
    ]
  }
};

F_ITEMS.prop_select_list_data = {
  label: "选择列表",
  // default: 48,
  prop: "prop_select_list_data",
  type: "select_list_data",
  cfSelectList: cfListSelectActicle,
  rules: [{ required: true, message: "能为空" }]
};
//#endregion


//#region 通用数据-网址列表选择配置
let list_common_url = { "idKey": "_id", "pageSize": 20, "listIndex": "list_url", "focusMenu": true, "twoTitle": "网址", "url": { "list": "/info/getCommonList", "add": "/info/commonAdd", "modify": "/info/commonModify", "detail": "/info/commonDetail", "delete": "/info/commonDelete" }, "columnOperate": { "min-width": 160 }, "singleBtns": { "addon": [{ "title": "详情", "eventType": "detail", "cfElBtn": { "circle": true, "icon": "el-icon-notebook-2" } }, { "title": "编辑", "eventType": "modify", "cfElBtn": { "circle": true, "icon": "el-icon-edit" } }, { "title": "删除", "eventType": "delete", "cfElBtn": { "circle": true, "icon": "el-icon-close" } }, { "uiType": "link", "text": "打开网址", "target": "_blank" }] }, "objParamAddon": { "_systemId": "sys_api", "_dataType": "url" }, "paramAddonPublic": { "_systemId": "sys_api", "_dataType": "url" }, "columns": [{ "label": "标题", "prop": "title", "width": 320, "fixed": true }, { "label": "说明", "prop": "desc", "width": 160 }, { "label": "网址", "prop": "link", "width": 120 }], "searchFormItems": [{ "label": "标题", "prop": "title", "type": "input_find_vague" }], "detailItems": [{ "label": "标题", "prop": "title" }, { "label": "说明", "prop": "desc" }, { "label": "网址", "prop": "link" }], "formItems": [{ "label": "标题", "prop": "title" }, { "label": "网址", "prop": "link", "type": "input" }, { "label": "说明", "prop": "desc", "type": "textarea" }] }





F_ITEMS.select_list_common_url = {
  label: "网址",
  prop: "prop_select_list_data",
  type: "select_list_data",
  cfSelectList: {
    dataName: "网址",
    valueKey: "_id",
    labelKey: "title",
    pageName: "tangball_article",
    multiple: true,//多选
    //需要保留的集合字段
    selectJson: {
      _id: 1, title: 1, link: 1
    },
    cfList: list_common_url
  }

};




let list_common_note = { "idKey": "_id", "pageSize": 20, "listIndex": "list_note", "focusMenu": true, "breadcrumb": [{ "value": "首页", "path": "#/listHome" }, { "value": "笔记" }], "url": { "list": "/info/getCommonList", "add": "/info/commonAdd", "modify": "/info/commonModify", "detail": "/info/commonDetail", "delete": "/info/commonDelete" }, "columnOperate": { "min-width": 210 }, "singleBtns": { "addon": [{ "title": "详情", "eventType": "detail", "cfElBtn": { "circle": true, "icon": "el-icon-notebook-2" } }, { "title": "编辑", "eventType": "modify", "cfElBtn": { "circle": true, "icon": "el-icon-edit" } }, { "title": "复制", "eventType": "copy", "cfElBtn": { "circle": true, "icon": "el-icon-document-copy" } }, { "title": "删除", "eventType": "delete", "cfElBtn": { "circle": true, "icon": "el-icon-close" } }, { "uiType": "link", "text": "详情", "target": "_blank" }] }, "batchBtns": { "addon": [{ "text": "新增", "eventType": "add", "cfElBtn": { "type": "primary" } }, { "text": "删除选中", "eventType": "delete", "needSelect": true, "cfElBtn": {} }, { "uiType": "slot", "slot": "slot_in_toolbar" }] }, "dynamicDict": [{ "ajax": { "param": { "_systemId": "sys_api", "_dataType": "note_category" }, "url": "/info/getCommonList" }, "populateColumn": "categoryDoc", "idColumn": "category", "idColumn2": "_id" }, { "ajax": { "param": { "_systemId": "sys_api", "_dataType": "familiarity", "findJson": { "userId": "13691916429" } }, "url": "/info/getCommonList" }, "populateColumn": "familiarityDoc", "idColumn": "_id", "idColumn2": "_idRel" }], "objParamAddon": { "_systemId": "sys_api", "_dataType": "note", "arrLookup": [] }, "paramAddonPublic": { "_systemId": "sys_api", "_dataType": "note" }, "columns": [{ "label": "uuid", "prop": "_id", "width": 120, "__id": "202001201645164747_12559", "showOverflowTooltip": true }, { "label": "标题", "prop": "title", "width": 320, "fixed": true, "edit": true, "__id": "202001201645174747_37439", "showOverflowTooltip": true }, { "label": "分组数", "prop": "countGroup", "width": 60, "__id": "202001201645174747_83928", "showOverflowTooltip": true }, { "label": "关键词", "prop": "keyword", "width": 70, "edit": true, "__id": "202001201645174747_95754", "showOverflowTooltip": true }, { "label": "熟悉度", "prop": "familiarity", "width": 120, "slot": "slot_column_familiarity", "cfColumn": { "class-name": "table_cell_visible" }, "__id": "202001201645174747_27106", "showOverflowTooltip": true }, { "label": "重要性", "prop": "importance", "width": 70, "edit": true, "__id": "202001201645174747_78408", "showOverflowTooltip": true }, { "label": "难度", "prop": "difficulty", "width": 70, "edit": true, "__id": "202001201645174747_98176", "showOverflowTooltip": true }, { "label": "所属分类", "prop": "category", "width": 120, "__id": "202001201645174747_78029", "showOverflowTooltip": true }, { "label": "demo列表", "prop": "demoList", "width": 90, "__id": "202001201645174747_35008", "showOverflowTooltip": true }], "searchFormItems": [{ "label": "标题", "prop": "title", "type": "input_find_vague" }, { "label": "所属分类", "prop": "category", "type": "select", "multiple": true, "ajax": { "param": { "_systemId": "sys_api", "_dataType": "note_category" }, "url": "/info/getCommonList", "keyLabel": "title", "keyValue": "_id" } }, { "label": "重要性", "prop": "importance", "type": "select", "options": [{ "label": "作废", "value": 1 }, { "label": "次要", "value": 2 }, { "label": "一般", "value": 3 }, { "label": "重要", "value": 4 }, { "label": "很重要", "value": 5 }] }, { "label": "难度", "prop": "difficulty", "type": "select", "options": [{ "label": "简单", "value": 1 }, { "label": "一般", "value": 2 }, { "label": "困难", "value": 3 }, { "label": "很难", "value": 4 }] }, { "label": "分组数", "prop": "countGroup", "type": "number" }], "detailItems": [{ "label": "标题", "prop": "title" }, { "label": "关键词", "prop": "keyword" }, { "label": "详情", "prop": "_detail", "type": "html" }, { "label": "说明", "prop": "desc" }, { "label": "所属分类", "prop": "category" }, { "label": "重要性", "prop": "importance" }, { "label": "难度", "prop": "difficulty" }, { "label": "uuid", "prop": "_id" }, { "label": "demo列表", "prop": "demoList" }, { "label": "相关demo列表", "prop": "demoLinkList" }, { "label": "相关笔记列表", "prop": "noteList" }], "formItems": [{ "label": "标题", "prop": "title" }, { "label": "网址", "prop": "link", "type": "input" }, { "label": "重要性", "prop": "importance", "type": "radio", "options": [{ "label": "作废", "value": 1 }, { "label": "次要", "value": 2 }, { "label": "一般", "value": 3 }, { "label": "重要", "value": 4 }, { "label": "很重要", "value": 5 }] }, { "label": "难度", "prop": "difficulty", "type": "radio", "options": [{ "label": "简单", "value": 1 }, { "label": "一般", "value": 2 }, { "label": "困难", "value": 3 }, { "label": "很难", "value": 4 }] }, { "label": "关键词", "prop": "keyword", "type": "tag_list" }, { "label": "所属分类", "prop": "category", "type": "select", "multiple": true, "ajax": { "param": { "_systemId": "sys_api", "_dataType": "note_category" }, "url": "/info/getCommonList", "keyLabel": "title", "keyValue": "_id" } }, { "label": "说明", "prop": "desc", "type": "textarea" }, { "label": "详情", "prop": "_detail", "type": "editorTM" }, { "label": "相关demo列表", "prop": "demoLinkList", "type": "select_list_data", "cfSelectList": { "dataName": "网址", "valueKey": "_id", "labelKey": "title", "multiple": true, "selectJson": { "_id": 1, "title": 1, "link": 1 }, "cfList": { "idKey": "_id", "pageSize": 20, "listIndex": "list_url", "focusMenu": true, "breadcrumb": [{ "value": "首页", "path": "#/listHome" }, { "value": "网址" }], "url": { "list": "/info/getCommonList", "add": "/info/commonAdd", "modify": "/info/commonModify", "detail": "/info/commonDetail", "delete": "/info/commonDelete" }, "columnOperate": { "min-width": 230 }, "singleBtns": { "addon": [{ "title": "详情", "eventType": "detail", "cfElBtn": { "circle": true, "icon": "el-icon-notebook-2" } }, { "title": "编辑", "eventType": "modify", "cfElBtn": { "circle": true, "icon": "el-icon-edit" } }, { "title": "复制", "eventType": "copy", "cfElBtn": { "circle": true, "icon": "el-icon-document-copy" } }, { "title": "删除", "eventType": "delete", "cfElBtn": { "circle": true, "icon": "el-icon-close" } }, { "uiType": "link", "text": "查看", "target": "_blank" }] }, "objParamAddon": { "_systemId": "sys_api", "_dataType": "url" }, "paramAddonPublic": { "_systemId": "sys_api", "_dataType": "url" }, "columns": [{ "label": "标题", "prop": "title", "width": 320, "fixed": true }, { "label": "uuid", "prop": "_id", "width": 120 }, { "label": "说明", "prop": "desc", "width": 160 }, { "label": "网址", "prop": "link", "width": 120 }], "searchFormItems": [{ "label": "标题", "prop": "title", "type": "input_find_vague" }], "detailItems": [{ "label": "标题", "prop": "title" }, { "label": "说明", "prop": "desc" }, { "label": "网址", "prop": "link" }], "formItems": [{ "label": "标题", "prop": "title" }, { "label": "网址", "prop": "link", "type": "input" }, { "label": "说明", "prop": "desc", "type": "textarea" }] } } }, { "label": "相关笔记列表", "prop": "noteList", "type": "select_list_data", "cfSelectList": { "dataName": "网址", "valueKey": "_id", "labelKey": "title", "multiple": true, "selectJson": { "_id": 1, "title": 1 }, "cfList": { "idKey": "_id", "pageSize": 20, "listIndex": "list_note", "focusMenu": true, "breadcrumb": [{ "value": "首页", "path": "#/listHome" }, { "value": "笔记" }], "url": { "list": "/info/getCommonList", "add": "/info/commonAdd", "modify": "/info/commonModify", "detail": "/info/commonDetail", "delete": "/info/commonDelete" }, "columnOperate": { "min-width": 210 }, "singleBtns": { "addon": [{ "title": "详情", "eventType": "detail", "cfElBtn": { "circle": true, "icon": "el-icon-notebook-2" } }, { "title": "编辑", "eventType": "modify", "cfElBtn": { "circle": true, "icon": "el-icon-edit" } }, { "title": "复制", "eventType": "copy", "cfElBtn": { "circle": true, "icon": "el-icon-document-copy" } }, { "title": "删除", "eventType": "delete", "cfElBtn": { "circle": true, "icon": "el-icon-close" } }, { "uiType": "link", "text": "详情", "target": "_blank" }] }, "batchBtns": { "addon": [{ "text": "新增", "eventType": "add", "cfElBtn": { "type": "primary" } }, { "text": "删除选中", "eventType": "delete", "needSelect": true, "cfElBtn": {} }, { "uiType": "slot", "slot": "slot_in_toolbar" }] }, "dynamicDict": [{ "ajax": { "param": { "_systemId": "sys_api", "_dataType": "note_category" }, "url": "/info/getCommonList" }, "populateColumn": "categoryDoc", "idColumn": "category", "idColumn2": "_id" }], "objParamAddon": { "_systemId": "sys_api", "_dataType": "note", "arrLookup": [] }, "paramAddonPublic": { "_systemId": "sys_api", "_dataType": "note" }, "columns": [{ "label": "uuid", "prop": "_id", "width": 120 }, { "label": "标题", "prop": "title", "width": 320, "fixed": true, "edit": true }, { "label": "分组数", "prop": "countGroup", "width": 60 }, { "label": "关键词", "prop": "keyword", "width": 70, "edit": true }, { "label": "熟悉度", "prop": "familiarity", "width": 120, "slot": "slot_column_familiarity", "cfColumn": { "class-name": "table_cell_visible" } }, { "label": "重要性", "prop": "importance", "width": 70, "edit": true }, { "label": "难度", "prop": "difficulty", "width": 70, "edit": true }, { "label": "所属分类", "prop": "category", "width": 120 }, { "label": "demo列表", "prop": "demoList", "width": 90 }], "searchFormItems": [{ "label": "标题", "prop": "title", "type": "input_find_vague" }, { "label": "所属分类", "prop": "category", "type": "select", "multiple": true, "ajax": { "param": { "_systemId": "sys_api", "_dataType": "note_category" }, "url": "/info/getCommonList", "keyLabel": "title", "keyValue": "_id" } }, { "label": "重要性", "prop": "importance", "type": "select", "options": [{ "label": "作废", "value": 1 }, { "label": "次要", "value": 2 }, { "label": "一般", "value": 3 }, { "label": "重要", "value": 4 }, { "label": "很重要", "value": 5 }] }, { "label": "难度", "prop": "difficulty", "type": "select", "options": [{ "label": "简单", "value": 1 }, { "label": "一般", "value": 2 }, { "label": "困难", "value": 3 }, { "label": "很难", "value": 4 }] }, { "label": "分组数", "prop": "countGroup", "type": "number" }], "detailItems": [{ "label": "标题", "prop": "title" }, { "label": "关键词", "prop": "keyword" }, { "label": "详情", "prop": "_detail", "type": "html" }, { "label": "说明", "prop": "desc" }, { "label": "所属分类", "prop": "category" }, { "label": "重要性", "prop": "importance" }, { "label": "难度", "prop": "difficulty" }, { "label": "uuid", "prop": "_id" }, { "label": "demo列表", "prop": "demoList" }, { "label": "相关demo列表", "prop": "demoLinkList" }, { "label": "相关笔记列表", "prop": "noteList" }], "formItems": [{ "label": "标题", "prop": "title" }, { "label": "网址", "prop": "link", "type": "input" }, { "label": "重要性", "prop": "importance", "type": "radio", "options": [{ "label": "作废", "value": 1 }, { "label": "次要", "value": 2 }, { "label": "一般", "value": 3 }, { "label": "重要", "value": 4 }, { "label": "很重要", "value": 5 }] }, { "label": "难度", "prop": "difficulty", "type": "radio", "options": [{ "label": "简单", "value": 1 }, { "label": "一般", "value": 2 }, { "label": "困难", "value": 3 }, { "label": "很难", "value": 4 }] }, { "label": "关键词", "prop": "keyword", "type": "tag_list" }, { "label": "所属分类", "prop": "category", "type": "select", "multiple": true, "ajax": { "param": { "_systemId": "sys_api", "_dataType": "note_category" }, "url": "/info/getCommonList", "keyLabel": "title", "keyValue": "_id" } }, { "label": "说明", "prop": "desc", "type": "textarea" }, { "label": "详情", "prop": "_detail", "type": "editorTM" }] } } }], "isMultipleSelect": true, "isShowCheckedBox": true, "isShowSearchForm": true, "isShowBreadcrumb": true, "isShowPageLink": true, "isShowOperateColumn": true, "isRefreshAfterCUD": true, "isShowToolBar": true, "cfElTable": { "header-row-class-name": "n-table-head", "row-class-name": "n-table-row" }, "formDataAddInit": {} }


window.cfSelectList_note = {
  hideCollection: true,
  dataName: "笔记(不回显)",
  valueKey: "_id",
  labelKey: "title",
  pageName: "tangball_article",
  multiple: true,//多选
  //需要保留的集合字段
  selectJson: {
    _id: 1, title: 1, link: 1
  },
  cfList: list_common_note
}




//#endregion



