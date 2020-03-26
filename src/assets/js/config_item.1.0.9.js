let _systemId = PUB._systemId
//#region DYDICT:公共数据字典对象管理
window.DYDICT = {} //公共数据字典对象
DYDICT.arr_importance = [
    { label: "作废", value: 1 },
    { label: "次要", value: 2 },
    { label: "一般", value: 3 },
    { label: "重要", value: 4 },
    { label: "很重要", value: 5 },
]
DYDICT.importance = lodash.keyBy(DYDICT.arr_importance, 'value')
DYDICT.arr_html_display = [
    { label: "block", value: "block" },
    { label: "inline", value: "inline" },
    { label: "inline-block", value: "inline-block" },
    { label: "none", value: "none" },
]
DYDICT.arr_difficulty = [
    { label: "简单", value: 1 },
    { label: "一般", value: 2 },
    { label: "困难", value: 3 },
    { label: "很难", value: 4 },
]
DYDICT.difficulty = lodash.keyBy(DYDICT.arr_difficulty, 'value')
DYDICT.arr_html_version = [
    { label: "HTML4", value: "HTML4" },
    { label: "HTML5", value: "HTML5" },
]
DYDICT.arr_selfClose = [
    { label: "否", value: "0" },
    { label: "是", value: "1" },
]
DYDICT.selfClose = lodash.keyBy(DYDICT.arr_selfClose, 'value')


DYDICT.arr_boolean = [
    { label: "否", value: 0 },
    { label: "是", value: 1 },
]
DYDICT.boolean = lodash.keyBy(DYDICT.arr_boolean, 'value')


DYDICT.arr_dataType = [
    { label: "知识点", value: "note" },
    { label: "前端demo", value: "front_demo" },
    { label: "习题", value: "exercises" },
    { label: "分组", value: "group" },
    { label: "HtmlApi", value: "html_api" },
    { label: "Js-Api", value: "js_api" },
    { label: "Css-Api", value: "css_api" },
    { label: "视频", value: "vedio" },
    { label: "网址", value: "url" },
]
DYDICT.dataType = lodash.keyBy(DYDICT.arr_dataType, 'value')



DYDICT.arr_payStatus = [
    { label: "未支付", value: 1 },
    { label: "已支付", value: 2 },
    { label: "申请退款中", value: 3 },
    { label: "已退款", value: 4 },
]
DYDICT.payStatus = lodash.keyBy(DYDICT.arr_payStatus, 'value')




DYDICT.arr_prior = [
    { value: 1, label: "很高" },
    { value: 2, label: "高" },
    { value: 3, label: "中" },
    { value: 4, label: "低" }
]
DYDICT.prior = lodash.keyBy(DYDICT.arr_prior, 'value')



DYDICT.arr_taskType = [
    { value: 1, label: "新需求" },
    { value: 2, label: "bug" },
    { value: 3, label: "其他" }
]

DYDICT.taskType = lodash.keyBy(DYDICT.arr_taskType, 'value')




DYDICT.arr_complete = [
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
]
DYDICT.complete = lodash.keyBy(DYDICT.arr_complete, 'value')




DYDICT.arr_complete2 = [
    { value: 1, label: "未开始" },//complete==0
    { value: 2, label: "进行中" },//complete>0&&complete>1
    { value: 3, label: "已完成" },//complete>0&&complete>1
]
DYDICT.complete2 = lodash.keyBy(DYDICT.arr_complete2, 'value')





DYDICT.html_api_category = {
    ajax: {
        param: { _systemId, _dataType: "html_api_category" },
        url: "/info/getCommonList",
    },
    populateColumn: "categoryDoc",
    idColumn: "category",
    idColumn2: "_id"
};
DYDICT.css_api_category = {
    ajax: {
        param: { _systemId, _dataType: "css_api_category" },
        url: "/info/getCommonList",
    },
    populateColumn: "categoryDoc",
    idColumn: "category",
    idColumn2: "_id"
};
DYDICT.js_api_category = {
    ajax: {
        param: { _systemId, _dataType: "js_api_category" },
        url: "/info/getCommonList",
    },
    populateColumn: "categoryDoc",
    idColumn: "category",
    idColumn2: "_id"
};


DYDICT.note_category = {
    ajax: {
        param: { _systemId, _dataType: "note_category" },
        url: "/info/getCommonList",
    },
    populateColumn: "categoryDoc",
    idColumn: "category",
    idColumn2: "_id"
};

DYDICT.order_user = {
    ajax: {
        param: { _systemId: _systemId, _dataType: "user" },
        url: "/info/getCommonList"
    },
    populateColumn: "userDoc",
    idColumn: "openid",
    idColumn2: "openid"
};


//负责人
DYDICT.personCharge = {
    ajax: {
        param: { _systemId, _dataType: "admin" },
        url: "/info/getCommonList",
    },
    populateColumn: "adminDoc",
    idColumn: "personCharge",
    idColumn2: "userName"
};

//#endregion

window.D_ITEMS = {} //公共数据字典对象
window.COLUMNS = {}
window.F_ITEMS = {};

//#region 龙庭订单

D_ITEMS.transaction_id = {
    label: "微信交易号",
    prop: "transaction_id",
};
COLUMNS.transaction_id = { ...D_ITEMS.transaction_id };
F_ITEMS.transaction_id = { ...D_ITEMS.transaction_id };


D_ITEMS.timeOrder = {
    label: "下单时间",
    prop: "timeOrder",
    formatter: function (row) {
        if (!row.timeOrder) return "";
        return moment(row.timeOrder).format("YYYY-MM-DD")
    }

};

COLUMNS.timeOrder = { ...D_ITEMS.timeOrder };
F_ITEMS.timeOrder = { ...D_ITEMS.timeOrder };


D_ITEMS.priceOrder = {
    label: "订单金额",
    prop: "priceOrder",
};
COLUMNS.priceOrder = { ...D_ITEMS.priceOrder };
F_ITEMS.priceOrder = { ...D_ITEMS.priceOrder };

D_ITEMS.listGoods = {
    label: "商品清单",
    prop: "listGoods",
};
COLUMNS.listGoods = { ...D_ITEMS.listGoods };
F_ITEMS.listGoods = { ...D_ITEMS.listGoods, type: "jsonEditor" };

D_ITEMS.addressObj = {
    label: "地址",
    prop: "addressObj",
};
COLUMNS.addressObj = { ...D_ITEMS.addressObj };
F_ITEMS.addressObj = { ...D_ITEMS.addressObj, type: "jsonEditor" };












//#endregion



//#region 唐球过来
D_ITEMS.Id = {
    label: "Id",
    prop: "P1"
};
COLUMNS.Id = {
    label: "Id",
    prop: "P1",
    width: 50
};
F_ITEMS.Id = {
    label: "数据id",
    prop: "P1",
    type: "input"
};


D_ITEMS.sex = {
    label: "性别",
    prop: "sex",
    formatter: function (data) {
        if (data.sex == 2) {
            return '女'
        } else if (data.sex == 1) {
            return '男'
        } else {
            return ''
        }
    }
};
COLUMNS.sex = Object.assign({}, D_ITEMS.sex, { width: 50, })
F_ITEMS.sex = {
    label: "性别",
    prop: "sex",
    type: "select",
    options: [{ label: "男", value: 1 }, { label: "女", value: 2 }]
};

D_ITEMS.openid = {
    label: "微信openid",
    prop: "openid",
};
COLUMNS.openid = { ...D_ITEMS.openid };
F_ITEMS.openid = { ...D_ITEMS.openid };


D_ITEMS.phone = {
    label: "手机号",
    prop: "phone",
};
COLUMNS.phone = {
    label: "手机号",
    prop: "phone",
    width: 110
};

F_ITEMS.phone = {
    label: "手机号",
    prop: "phone",
    type: "input"
};


D_ITEMS.idCard = {
    label: "身份证号",
    prop: "idCard",
};
F_ITEMS.idCard = {
    label: "身份证号",
    prop: "idCard"
};

D_ITEMS.career = {
    label: "职业",
    prop: "career",
};
F_ITEMS.career = {
    label: "职业",
    prop: "career",
    type: "input"
};

D_ITEMS.remark = {
    label: "备注",
    prop: "remark",
};
COLUMNS.remark = { ...D_ITEMS.remark };
F_ITEMS.remark = { ...D_ITEMS.remark };



D_ITEMS.age = {
    label: "年龄",
    prop: "age",
};
F_ITEMS.age = {
    label: "年龄",
    prop: "age",
    type: "input"
};


D_ITEMS.orderId = {
    label: "订单号",
    prop: "orderId",
};
COLUMNS.orderId = { ...D_ITEMS.orderId, width: 160 };
F_ITEMS.orderId = { ...D_ITEMS.orderId };


D_ITEMS.payStatus = {
    label: "支付状态",
    prop: "payStatus",
    formatter: function (rowData) {
        return lodash.get(DYDICT.payStatus, `${rowData.payStatus}.label`);
    },
};

COLUMNS.payStatus = { ...D_ITEMS.payStatus };

COLUMNS.payStatus_slot = { ...D_ITEMS.payStatus, slot: "slot_column_payStatus", width: 130, };

F_ITEMS.payStatus = {
    ...D_ITEMS.payStatus,
    type: "select",
    options: DYDICT.arr_payStatus
};


D_ITEMS.auditStatus = {
    label: "审核状态",
    prop: "auditStatus",
    formatter: function (rowData) {
        if (rowData.auditStatus == 1) {
            return "未审核";
        } else if (rowData.auditStatus == 2) {
            return "审核不通过";
        } else if (rowData.auditStatus == 3) {
            return "审核通过";
        } else {
            return "";
        }
    }
};
F_ITEMS.auditStatus = {
    label: "审核状态",
    prop: "auditStatus",
    type: "select",
    options: [
        { label: "未审核", value: 1 },
        { label: "审核不通过", value: 2 },
        { label: "审核通过", value: 3 }
    ]
};
//#endregion
//#region 通用数据
D_ITEMS.title = {
    label: "标题",
    prop: "title"
};
COLUMNS.title_fixed = { ...D_ITEMS.title, width: 320, fixed: true };
F_ITEMS.title = { ...D_ITEMS.title };
F_ITEMS.title_search = { ...D_ITEMS.title, type: "input_find_vague" };



D_ITEMS.desc = {
    label: "说明",
    prop: "desc"
};
COLUMNS.desc = { ...D_ITEMS.desc, width: 160, };
F_ITEMS.desc = { ...D_ITEMS.desc, type: "textarea" };


D_ITEMS.detail = {
    label: "详情",
    prop: "_detail",
    type: "html",
};
//  COLUMNS.detail = {...D_ITEMS.detail, width: 120,};
F_ITEMS.detail = { ...D_ITEMS.detail, type: "editorTM" };


D_ITEMS._data = {
    label: "_data对象",
    prop: "_data",

};
COLUMNS._data = { ...D_ITEMS._data, width: 90, };
F_ITEMS._data = { ...D_ITEMS._data, type: "jsonEditor" };


D_ITEMS.arrGroup = {
    label: "所属分组",
    prop: "arrGroup",

};
COLUMNS.arrGroup = { ...D_ITEMS.arrGroup, width: 100, };


D_ITEMS.countGroup = {
    label: "分组数",
    prop: "countGroup",

};
COLUMNS.countGroup = { ...D_ITEMS.countGroup, width: 60, };
F_ITEMS.countGroup = { ...D_ITEMS.countGroup, type: "number" };

//#endregion
//#region 管理员
D_ITEMS.userName = {
    label: "用户名",
    prop: "userName"
};
COLUMNS.userName = { ...D_ITEMS.userName, width: 150, };
F_ITEMS.userName = { ...D_ITEMS.userName, type: "input" };


D_ITEMS.passWord = {
    label: "密码",
    prop: "passWord"
};
COLUMNS.passWord = { ...D_ITEMS.passWord, width: 150, };
F_ITEMS.passWord = { ...D_ITEMS.passWord, type: "passWord" };

D_ITEMS.nickName = {
    label: "昵称",
    prop: "nickName"
};
COLUMNS.nickName = { ...D_ITEMS.nickName, width: 120, };
F_ITEMS.nickName = { ...D_ITEMS.nickName, type: "input" };


D_ITEMS.role = {
    label: "所属角色",
    prop: "role"
};
COLUMNS.role = { ...D_ITEMS.role, width: 120, };
F_ITEMS.role = {
    label: "所属角色",
    prop: "role",
    type: "select",
    ajax: {
        param: { _systemId, _dataType: "role" },
        url: "/info/getCommonList",
        keyLabel: "name",
        keyValue: "_id"
    }
}



//#endregion
//#region 角色
D_ITEMS.roleName = {
    label: "角色名",
    prop: "name",
};
COLUMNS.roleName = { ...D_ITEMS.roleName, width: 120, };
F_ITEMS.roleName = { ...D_ITEMS.roleName, type: "input" };

D_ITEMS.rolePower = {
    label: "权限",
    prop: "power",
};
COLUMNS.rolePower = { ...D_ITEMS.rolePower, width: 120, };
F_ITEMS.rolePower = {
    ...D_ITEMS.rolePower,
    default: {},
    cfForm: {
        labelWidth: "150px",
        formItems: [{
            label: "资讯中心",
            prop: "newsCenter",
            style: styleMenuGPowerItem,
            default: {},
            cfForm: {
                col_span: 12,
                formItems: [{
                    // label: "资讯列表",
                    prop: "list_article",
                    style: styleMenuPowerItem,
                    cfForm: getFormMenuGPower({ menuName: "资讯列表" })
                },
                {
                    // label: "资讯分类",
                    prop: "list_article_category",
                    style: styleMenuPowerItem,
                    cfForm: getFormMenuGPower({ menuName: "资讯分类" })
                },
                ]
            }
        },
        {
            label: "系统管理",
            prop: "systemManage",
            style: styleMenuGPowerItem,
            default: {},
            cfForm: {
                col_span: 12,
                formItems: [{
                    prop: "list_admin",
                    style: styleMenuPowerItem,
                    cfForm: getFormMenuGPower({ menuName: "管理员" })
                },
                {
                    prop: "list_role",
                    style: styleMenuPowerItem,
                    cfForm: getFormMenuGPower({ menuName: "角色" })
                },
                {
                    prop: "list_area",
                    style: styleMenuPowerItem,
                    cfForm: getFormMenuGPower({ menuName: "地区管理" })
                },
                ]
            }
        }
        ]
    }
};



//#endregion
//#region 分类
D_ITEMS.category_name = {
    label: "分类名",
    prop: "name",
};
COLUMNS.category_name = { ...D_ITEMS.category_name, width: 120, };
F_ITEMS.category_name = { ...D_ITEMS.category_name, type: "input" };

D_ITEMS.category_remark = {
    label: "分类说明",
    prop: "remark",
};
COLUMNS.category_remark = { ...D_ITEMS.category_remark, width: 180, };
F_ITEMS.category_remark = { ...D_ITEMS.category_remark, type: "textarea" };

D_ITEMS.category = {
    label: "所属分类",
    prop: "category",
};

COLUMNS.category = {
    ...D_ITEMS.category,
    width: 120,
    formatter: function (rowData) {
        let title = lodash.get(rowData, "categoryDoc.title");
        return title;
    },
};
F_ITEMS.category = { ...D_ITEMS.category, type: "input" };
F_ITEMS.html_api_category = {
    ...D_ITEMS.category,
    type: "select",
    ajax: {
        param: { _systemId, _dataType: "html_api_category" },
        url: "/info/getCommonList",
        keyLabel: "title",
        keyValue: "_id"
    }
};
F_ITEMS.css_api_category = {
    ...D_ITEMS.category,
    type: "select",
    ajax: {
        param: { _systemId, _dataType: "css_api_category" },
        url: "/info/getCommonList",
        keyLabel: "title",
        keyValue: "_id"
    }
};
F_ITEMS.js_api_category = {
    ...D_ITEMS.category,
    type: "select",
    ajax: {
        param: { _systemId, _dataType: "js_api_category" },
        url: "/info/getCommonList",
        keyLabel: "title",
        keyValue: "_id"
    }
};



F_ITEMS.note_category = {
    ...D_ITEMS.category,
    type: "select",
    multiple: true, //多选
    ajax: {
        param: { _systemId, _dataType: "note_category" },
        url: "/info/getCommonList",
        keyLabel: "title",
        keyValue: "_id"
    }
};




//#endregion
//#region 熟悉度相关
D_ITEMS.familiarity = {
    label: "熟悉度",
    prop: "familiarity",
};
COLUMNS.familiarity_select = {
    ...D_ITEMS.familiarity,
    width: 120,
    slot: "slot_column_familiarity",
    cfColumn: { "class-name": "table_cell_visible" } //补充特殊单元格类名，进行特殊控制！
};
COLUMNS.familiarity = {
    ...D_ITEMS.familiarity,
    width: 100,
};

F_ITEMS.familiarity = { ...D_ITEMS.familiarity, type: "input" };

D_ITEMS.dataType = {
    label: "数据类型",
    prop: "dataType",
};
COLUMNS.dataType = { ...D_ITEMS.dataType, width: 80, };
F_ITEMS.dataType = { ...D_ITEMS.dataType, type: "input" };

D_ITEMS.dataId = {
    label: "数据Id",
    prop: "dataId",
};
COLUMNS.dataId = { ...D_ITEMS.dataId, width: 210, };
F_ITEMS.dataId = { ...D_ITEMS.dataId, type: "input" };

D_ITEMS.userId = {
    label: "用户Id",
    prop: "userId",
};
COLUMNS.userId = { ...D_ITEMS.userId, width: 120, };
F_ITEMS.userId = { ...D_ITEMS.userId, type: "input" };

D_ITEMS._userId = {
    label: "_userId",
    prop: "_userId",
};
COLUMNS._userId = { ...D_ITEMS._userId, width: 120, };
F_ITEMS._userId = { ...D_ITEMS._userId, type: "input" };

D_ITEMS._id = {
    label: "uuid",
    prop: "_id",
};
COLUMNS._id = {
    ...D_ITEMS._id,
    width: 80,
    sortable: "custom", //开启后端排序
};

D_ITEMS.studyTime = {
    label: "学习时间",
    prop: "studyTime",
};
COLUMNS.studyTime = {
    ...D_ITEMS.studyTime,
    width: 140,
};


//#endregion
//#region html-API
D_ITEMS.html_display = {
    label: "块级",
    prop: "display",
};
COLUMNS.html_display = { ...D_ITEMS.html_display, width: 70, };
F_ITEMS.html_display = {
    ...D_ITEMS.html_display,
    type: "select",
    options: DYDICT.arr_html_display
};

D_ITEMS.importance = {
    label: "重要性",
    prop: "importance",
};
COLUMNS.importance = {
    ...D_ITEMS.importance,
    width: 70,
    formatter: function (rowData) {
        return lodash.get(DYDICT.importance, `${rowData.importance}.label`);
    },
};
F_ITEMS.importance = {
    ...D_ITEMS.importance,
    type: "select",
    options: DYDICT.arr_importance
};
F_ITEMS.importance_radio = {
    ...F_ITEMS.importance,
    type: "radio"
};



D_ITEMS.difficulty = {
    label: "难度",
    prop: "difficulty",
};
COLUMNS.difficulty = {
    ...D_ITEMS.difficulty,
    width: 70,
    formatter: function (rowData) {
        return lodash.get(DYDICT.difficulty, `${rowData.difficulty}.label`);
    },
};
F_ITEMS.difficulty = {
    ...D_ITEMS.difficulty,
    type: "select",
    options: DYDICT.arr_difficulty
};
F_ITEMS.difficulty_radio = {
    ...F_ITEMS.difficulty,
    type: "radio"
};


D_ITEMS.english = {
    label: "原英文",
    prop: "english",
};
COLUMNS.english = { ...D_ITEMS.english, width: 70, };
F_ITEMS.english = {
    ...D_ITEMS.english,
    type: "input",
};

D_ITEMS.html_version = {
    label: "版本",
    prop: "version",
};
COLUMNS.html_version = { ...D_ITEMS.html_version, width: 70, };
F_ITEMS.html_version = {
    ...D_ITEMS.html_version,
    type: "select",
    options: DYDICT.arr_html_version
};

D_ITEMS.selfClose = {
    label: "自闭合",
    prop: "selfClose",
};
COLUMNS.selfClose = { ...D_ITEMS.selfClose, width: 70, };
F_ITEMS.selfClose = {
    ...D_ITEMS.selfClose,
    type: "select",
    options: DYDICT.arr_selfClose
};


D_ITEMS.cateIdOld = {
    label: "旧分类Id",
    prop: "cateIdOld",
};
COLUMNS.cateIdOld = { ...D_ITEMS.cateIdOld, width: 70, };
F_ITEMS.cateIdOld = { ...D_ITEMS.cateIdOld, type: "input" };

D_ITEMS.demoList = {
    label: "demo列表",
    prop: "demoList",
};

COLUMNS.demoList = { ...D_ITEMS.demoList, width: 90, };

F_ITEMS.demoList = {
    ...D_ITEMS.demoList,
    type: "collection",
    collectionlistType: "form",
    // showToolbar: false, //不显示集合的工具栏
    collectionCfForm: {
        col_span: 12,
        formItems: [{
            label: "标题",
            prop: "title",
            type: "input"
        },
        {
            label: "链接",
            prop: "link",
            type: "input"
        },
        ]
    }
};

//#endregion


D_ITEMS.css_version = {
    label: "版本",
    prop: "version",
};
COLUMNS.css_version = { ...D_ITEMS.css_version, width: 70, };


//#region 分组
D_ITEMS.group_dataType = {
    label: "数据类型",
    prop: "dataType",
};
COLUMNS.group_dataType = { ...D_ITEMS.group_dataType, width: 90, };
F_ITEMS.group_dataType = {
    ...D_ITEMS.group_dataType,
    type: "select",
    ajax: {
        param: { _systemId, _dataType: "data_type" },
        url: "/info/getCommonList",
        keyLabel: "title",
        keyValue: "key"
    }
};

D_ITEMS.countData = {
    label: "数据量",
    prop: "countData",
};
COLUMNS.countData = { ...D_ITEMS.countData, width: 80, };

D_ITEMS.score = {
    label: "分数对象",
    prop: "score",
};
COLUMNS.score = { ...D_ITEMS.score, width: 90, };

D_ITEMS.myScore = {
    label: "我的分数",
    prop: "myScore",
};
COLUMNS.myScore = { ...D_ITEMS.myScore, width: 90, slot: "slot_column_score", };

D_ITEMS.alias = {
    label: "别名",
    prop: "alias",
};
COLUMNS.alias = { ...D_ITEMS.alias, width: 130 };
F_ITEMS.alias = { ...D_ITEMS.alias, type: "input", };


//#endregion
//#region 关系
D_ITEMS._idRel = {
    label: "关联数据1",
    prop: "_idRel",
};
F_ITEMS._idRel = { ...D_ITEMS._idRel, type: "input" };
COLUMNS._idRel = { ...D_ITEMS._idRel, width: 220, };

D_ITEMS._idRel2 = {
    label: "关联数据2",
    prop: "_idRel2",
};
COLUMNS._idRel2 = { ...D_ITEMS._idRel2, width: 220, };
F_ITEMS._idRel2 = { ...D_ITEMS._idRel2, type: "input" };

D_ITEMS.sort = {
    label: "序号",
    prop: "sort",
};
COLUMNS.sort = { ...D_ITEMS.sort, width: 70, };
F_ITEMS.sort = { ...D_ITEMS.sort, type: "number" };

//#endregion
//#region 其他
D_ITEMS.dataTypekey = {
    label: "类型代号",
    prop: "key",
};
COLUMNS.dataTypekey = { ...D_ITEMS.dataTypekey, width: 120, };
F_ITEMS.dataTypekey = { ...D_ITEMS.dataTypekey, type: "input" };



//#endregion
//#region 笔记
D_ITEMS.keyword = {
    label: "关键词",
    prop: "keyword",
};
COLUMNS.keyword = { ...D_ITEMS.keyword, width: 70, };
COLUMNS.keyword_edit = { ...COLUMNS.keyword, edit: true, };
F_ITEMS.keyword = { ...D_ITEMS.keyword, type: "tag_list" };

D_ITEMS.note_linkList = {
    label: "相关demo列表",
    prop: "demoLinkList",
};
COLUMNS.note_linkList = { ...D_ITEMS.note_linkList, width: 120, };


D_ITEMS.note_noteList = {
    label: "相关笔记列表",
    prop: "noteList",
};
COLUMNS.note_noteList = { ...D_ITEMS.note_noteList, width: 120, };

//#endregion
//#region 网址
D_ITEMS.link = {
    label: "网址",
    prop: "link",
};
COLUMNS.link = { ...D_ITEMS.link, width: 120, };
F_ITEMS.link = { ...D_ITEMS.link, type: "input" };

//#endregion



D_ITEMS.item_prop = {
    label: "prop",
    prop: "prop",
};
COLUMNS.item_prop = { ...D_ITEMS.item_prop, width: 120, };
F_ITEMS.item_prop = {
    label: "prop属性名",
    prop: "prop",
    type: "input"
};

D_ITEMS.item_label = {
    label: "label",
    prop: "label",
    width: 160,
};
F_ITEMS.label_search = {
    label: "label",
    prop: "label",
    type: "input_find_vague"
};

COLUMNS.item_label = { ...D_ITEMS.item_label, width: 160, };
F_ITEMS.item_label = {
    label: "label说明",
    prop: "label",
    type: "input"
};

D_ITEMS.item_type = {
    label: "type",
    prop: "type",
    width: 160,
};
COLUMNS.item_type = { ...D_ITEMS.item_type, width: 120, };

F_ITEMS.item_type = {
    label: "type",
    prop: "type",
    type: "input"
};


D_ITEMS.vedio = {
    label: "视频上传",
    prop: "vedio",

};
COLUMNS.vedio = { ...D_ITEMS.vedio, width: 70, };
F_ITEMS.vedio = {
    ...D_ITEMS.vedio,
    type: "upload",
    uploadConfig: {
        limit: 2,
        listType: "text"
    }
};


//#region 商品
D_ITEMS.priceMarket = {
    label: "市场价",
    prop: "priceMarket",

};
COLUMNS.priceMarket = { ...D_ITEMS.priceMarket, width: 90, };
F_ITEMS.priceMarket = { ...D_ITEMS.priceMarket, type: "number" };

D_ITEMS.priceSell = {
    label: "销售价",
    prop: "priceSell",

};
COLUMNS.priceSell = { ...D_ITEMS.priceSell, width: 90, };
F_ITEMS.priceSell = { ...D_ITEMS.priceSell, type: "number" };

D_ITEMS.isPublish = {
    label: "是否发布",
    prop: "isPublish",

};
COLUMNS.isPublish = { ...D_ITEMS.isPublish, width: 90, };
F_ITEMS.isPublish = {
    ...D_ITEMS.isPublish,
    type: "radio",
    options: DYDICT.arr_boolean
};

D_ITEMS.countOrder = {
    label: "订单数",
    prop: "countOrder",

};
COLUMNS.countOrder = { ...D_ITEMS.countOrder, width: 90, };
F_ITEMS.countOrder = { ...D_ITEMS.countOrder, type: "number" };

//#endregion





//#region COLUMNS






//#region 通用

COLUMNS.title_fixed_w150 = { ...COLUMNS.title_fixed, width: 150 };
COLUMNS.title_fixed_w150_edit = { ...COLUMNS.title_fixed_w150, edit: true };
COLUMNS.title_fixed_edit = { ...COLUMNS.title_fixed, edit: true };






COLUMNS.importance_edit = {
    ...COLUMNS.importance,
    edit: true
};





//#endregion
//#region html_api



COLUMNS.difficulty_edit = {
    ...COLUMNS.difficulty,
    edit: true
};









//#endregion
//#region 管理员




//#endregion
//#region 角色


//#endregion
//#region 分类


//#endregion
//#region 熟悉度等







//#endregion
//#region 分组



//#endregion
//#region 关系



//#endregion
//#region 分类等
//单个的分类


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



//#endregion

//#region 网址


//#endregion
//#region 笔记



//#endregion




//#region dm组件库用到




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




//#endregion


//#endregion

//#region F_ITEMS

//#region 唐球过来



F_ITEMS.publicationStatus = {
    label: "发布状态",
    prop: "publicationStatus",
    type: "select",
    options: [{ label: "是", value: 1 }, { label: "否", value: 2 }]
};
F_ITEMS.album = {
    label: "相册",
    prop: "album",
    type: "upload",
    col_span: 24, //控制显示一行多列
    // tips: "可上传多张图"
};
/****************************赛事报名-START****************************/





//#endregion




//#region 分类


//#endregion
//#region 熟悉度



//数据类型

//#endregion
//#region 分组


//#endregion
//#region 关系


//#endregion

//#region 角色
let styleMenuPowerItem = `margin-bottom:10px;padding:0 5px`;
let styleMenuGPowerItem = `margin-bottom:0;border:none;padding:0`;
//函数定义：{获取菜单权限表单配置函数}
function getFormMenuGPower({ menuName = "XXX" }) {
    return {
        col_span: 4,
        labelWidth: "10px",
        formItems: [{
            label: "",
            prop: "menuName",
            default: menuName,
            col_span: 4,
            type: "text"
        },
        {
            label: "",
            prop: "add",
            col_span: 3,
            type: "checkbox",
            default: false,
            options: [{ value: "1", label: "添加" }]
        },
        {
            label: "",
            prop: "copy",
            col_span: 3,
            type: "checkbox",
            default: false,
            options: [{ value: "1", label: "复制" }]
        },
        {
            label: "",
            prop: "modify",
            col_span: 3,
            type: "checkbox",
            default: false,
            options: [{ value: "1", label: "修改" }]
        },
        {
            label: "",
            prop: "search",
            col_span: 3,
            type: "checkbox",
            default: false,
            options: [{ value: "1", label: "查询" }]
        },

        {
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
        },
        ]
    };
}



//#endregion








// import list_note_for_select from "@/assets/js/config/list_note.js"
// //#region 笔记
// F_ITEMS.note_linkList = { ...D_ITEMS.note_linkList, 
//   type: "select_list_data",
//   cfSelectList: {
//     //选择列表配置
//     dataName: "球员",
//     valueKey: "P1",
//     labelKey: "name",
//     pageName: "tangball_member",
//     cfList: list_note_for_select
//   },
//  };

//#endregion
F_ITEMS.aaaa = 11111;



//#region dm组件库用到

//#region form_demo的字段
F_ITEMS.tagList = {
    label: "标签",
    prop: "tagList",
    type: "tag_list"
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
        formItems: [{
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
        formItems: [{
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



F_ITEMS.specs_options = {
    label: "规格项",
    // style: { "margin-top": "50px" }, //自定义样式
    prop: "options",
    type: "collection",
    collectionlistType: "form",
    //  dataSlot: "slot_specs_option", //自定义数据插槽
    cfElBtnAdd: {
        //自定义“新增”按钮
        text: "+添加一组规格项",
        type: "primary",
        size: "mini",
        plain: false
    },
    collectionCfForm: {
        col_span: 12,
        formItems: [{
            label: "选项名",
            prop: "name",
            type: "input"
        },
        {
            label: "选项图片",
            prop: "imgSrc"
        }
        ]
    }
};



F_ITEMS.objSpecTerm = {
    label: "规格条件",
    prop: "objSpecTerm",
    type: "jsonEditor",

};



F_ITEMS.listSpecPrice = {
    label: "规格/价格表",
    prop: "listSpecPrice",
    slot: "slot_form_listSpecPrice",

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
        formItems: [{
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
        formItems: [{
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


F_ITEMS.name = {
    label: "标题111",
    prop: "name",
}
F_ITEMS.name_search = {
    label: "标题123",
    prop: "name",
    type: "input_find_vague"
};





//#endregion

//#region 文章列表选择配置
let cfListSelectActicle = {
    //选择列表配置
    dataName: "文章",
    valueKey: "P1",
    labelKey: "articleTitle",
    pageName: "tangball_article",
    multiple: true, //多选
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
        dynamicDict: [{
            page: "tangball_article_category",
            populateColumn: "categoryDoc",
            idColumn: "articleCategory",
            idColumn2: "P1"
        }],
        //-------列配置数组-------
        columns: [{
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
        searchFormItems: [{
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
        multiple: true, //多选
        //需要保留的集合字段
        selectJson: {
            _id: 1,
            title: 1,
            link: 1
        },
        cfList: list_common_url
    }

};





let list_common_note = { "idKey": "_id", "pageSize": 20, "listIndex": "list_note", "focusMenu": true, "breadcrumb": [{ "value": "首页", "path": "#/listHome" }, { "value": "笔记" }], "url": { "list": "/info/getCommonList", "add": "/info/commonAdd", "modify": "/info/commonModify", "detail": "/info/commonDetail", "delete": "/info/commonDelete" }, "columnOperate": { "min-width": 210 }, "singleBtns": { "addon": [{ "title": "详情", "eventType": "detail", "cfElBtn": { "circle": true, "icon": "el-icon-notebook-2" } }, { "title": "编辑", "eventType": "modify", "cfElBtn": { "circle": true, "icon": "el-icon-edit" } }, { "title": "复制", "eventType": "copy", "cfElBtn": { "circle": true, "icon": "el-icon-document-copy" } }, { "title": "删除", "eventType": "delete", "cfElBtn": { "circle": true, "icon": "el-icon-close" } }, { "uiType": "link", "text": "详情", "target": "_blank" }] }, "batchBtns": { "addon": [{ "text": "新增", "eventType": "add", "cfElBtn": { "type": "primary" } }, { "text": "删除选中", "eventType": "delete", "needSelect": true, "cfElBtn": {} }, { "uiType": "slot", "slot": "slot_in_toolbar" }] }, "dynamicDict": [{ "ajax": { "param": { "_systemId": "sys_api", "_dataType": "note_category" }, "url": "/info/getCommonList" }, "populateColumn": "categoryDoc", "idColumn": "category", "idColumn2": "_id" }, { "ajax": { "param": { "_systemId": "sys_api", "_dataType": "familiarity", "findJson": { "userId": "13691916429" } }, "url": "/info/getCommonList" }, "populateColumn": "familiarityDoc", "idColumn": "_id", "idColumn2": "_idRel" }], "objParamAddon": { "_systemId": "sys_api", "_dataType": "note", "arrLookup": [] }, "paramAddonPublic": { "_systemId": "sys_api", "_dataType": "note" }, "columns": [{ "label": "uuid", "prop": "_id", "width": 120, "__id": "202001201645164747_12559", "showOverflowTooltip": true }, { "label": "标题", "prop": "title", "width": 320, "fixed": true, "edit": true, "__id": "202001201645174747_37439", "showOverflowTooltip": true }, { "label": "分组数", "prop": "countGroup", "width": 60, "__id": "202001201645174747_83928", "showOverflowTooltip": true }, { "label": "关键词", "prop": "keyword", "width": 70, "edit": true, "__id": "202001201645174747_95754", "showOverflowTooltip": true }, { "label": "熟悉度", "prop": "familiarity", "width": 120, "slot": "slot_column_familiarity", "cfColumn": { "class-name": "table_cell_visible" }, "__id": "202001201645174747_27106", "showOverflowTooltip": true }, { "label": "重要性", "prop": "importance", "width": 70, "edit": true, "__id": "202001201645174747_78408", "showOverflowTooltip": true }, { "label": "难度", "prop": "difficulty", "width": 70, "edit": true, "__id": "202001201645174747_98176", "showOverflowTooltip": true }, { "label": "所属分类", "prop": "category", "width": 120, "__id": "202001201645174747_78029", "showOverflowTooltip": true }, { "label": "demo列表", "prop": "demoList", "width": 90, "__id": "202001201645174747_35008", "showOverflowTooltip": true }], "searchFormItems": [{ "label": "标题", "prop": "title", "type": "input_find_vague" }, { "label": "所属分类", "prop": "category", "type": "select", "multiple": true, "ajax": { "param": { "_systemId": "sys_api", "_dataType": "note_category" }, "url": "/info/getCommonList", "keyLabel": "title", "keyValue": "_id" } }, { "label": "重要性", "prop": "importance", "type": "select", "options": [{ "label": "作废", "value": 1 }, { "label": "次要", "value": 2 }, { "label": "一般", "value": 3 }, { "label": "重要", "value": 4 }, { "label": "很重要", "value": 5 }] }, { "label": "难度", "prop": "difficulty", "type": "select", "options": [{ "label": "简单", "value": 1 }, { "label": "一般", "value": 2 }, { "label": "困难", "value": 3 }, { "label": "很难", "value": 4 }] }, { "label": "分组数", "prop": "countGroup", "type": "number" }], "detailItems": [{ "label": "标题", "prop": "title" }, { "label": "关键词", "prop": "keyword" }, { "label": "详情", "prop": "_detail", "type": "html" }, { "label": "说明", "prop": "desc" }, { "label": "所属分类", "prop": "category" }, { "label": "重要性", "prop": "importance" }, { "label": "难度", "prop": "difficulty" }, { "label": "uuid", "prop": "_id" }, { "label": "demo列表", "prop": "demoList" }, { "label": "相关demo列表", "prop": "demoLinkList" }, { "label": "相关笔记列表", "prop": "noteList" }], "formItems": [{ "label": "标题", "prop": "title" }, { "label": "网址", "prop": "link", "type": "input" }, { "label": "重要性", "prop": "importance", "type": "radio", "options": [{ "label": "作废", "value": 1 }, { "label": "次要", "value": 2 }, { "label": "一般", "value": 3 }, { "label": "重要", "value": 4 }, { "label": "很重要", "value": 5 }] }, { "label": "难度", "prop": "difficulty", "type": "radio", "options": [{ "label": "简单", "value": 1 }, { "label": "一般", "value": 2 }, { "label": "困难", "value": 3 }, { "label": "很难", "value": 4 }] }, { "label": "关键词", "prop": "keyword", "type": "tag_list" }, { "label": "所属分类", "prop": "category", "type": "select", "multiple": true, "ajax": { "param": { "_systemId": "sys_api", "_dataType": "note_category" }, "url": "/info/getCommonList", "keyLabel": "title", "keyValue": "_id" } }, { "label": "说明", "prop": "desc", "type": "textarea" }, { "label": "详情", "prop": "_detail", "type": "editorTM" }, { "label": "相关demo列表", "prop": "demoLinkList", "type": "select_list_data", "cfSelectList": { "dataName": "网址", "valueKey": "_id", "labelKey": "title", "multiple": true, "selectJson": { "_id": 1, "title": 1, "link": 1 }, "cfList": { "idKey": "_id", "pageSize": 20, "listIndex": "list_url", "focusMenu": true, "breadcrumb": [{ "value": "首页", "path": "#/listHome" }, { "value": "网址" }], "url": { "list": "/info/getCommonList", "add": "/info/commonAdd", "modify": "/info/commonModify", "detail": "/info/commonDetail", "delete": "/info/commonDelete" }, "columnOperate": { "min-width": 230 }, "singleBtns": { "addon": [{ "title": "详情", "eventType": "detail", "cfElBtn": { "circle": true, "icon": "el-icon-notebook-2" } }, { "title": "编辑", "eventType": "modify", "cfElBtn": { "circle": true, "icon": "el-icon-edit" } }, { "title": "复制", "eventType": "copy", "cfElBtn": { "circle": true, "icon": "el-icon-document-copy" } }, { "title": "删除", "eventType": "delete", "cfElBtn": { "circle": true, "icon": "el-icon-close" } }, { "uiType": "link", "text": "查看", "target": "_blank" }] }, "objParamAddon": { "_systemId": "sys_api", "_dataType": "url" }, "paramAddonPublic": { "_systemId": "sys_api", "_dataType": "url" }, "columns": [{ "label": "标题", "prop": "title", "width": 320, "fixed": true }, { "label": "uuid", "prop": "_id", "width": 120 }, { "label": "说明", "prop": "desc", "width": 160 }, { "label": "网址", "prop": "link", "width": 120 }], "searchFormItems": [{ "label": "标题", "prop": "title", "type": "input_find_vague" }], "detailItems": [{ "label": "标题", "prop": "title" }, { "label": "说明", "prop": "desc" }, { "label": "网址", "prop": "link" }], "formItems": [{ "label": "标题", "prop": "title" }, { "label": "网址", "prop": "link", "type": "input" }, { "label": "说明", "prop": "desc", "type": "textarea" }] } } }, { "label": "相关笔记列表", "prop": "noteList", "type": "select_list_data", "cfSelectList": { "dataName": "网址", "valueKey": "_id", "labelKey": "title", "multiple": true, "selectJson": { "_id": 1, "title": 1 }, "cfList": { "idKey": "_id", "pageSize": 20, "listIndex": "list_note", "focusMenu": true, "breadcrumb": [{ "value": "首页", "path": "#/listHome" }, { "value": "笔记" }], "url": { "list": "/info/getCommonList", "add": "/info/commonAdd", "modify": "/info/commonModify", "detail": "/info/commonDetail", "delete": "/info/commonDelete" }, "columnOperate": { "min-width": 210 }, "singleBtns": { "addon": [{ "title": "详情", "eventType": "detail", "cfElBtn": { "circle": true, "icon": "el-icon-notebook-2" } }, { "title": "编辑", "eventType": "modify", "cfElBtn": { "circle": true, "icon": "el-icon-edit" } }, { "title": "复制", "eventType": "copy", "cfElBtn": { "circle": true, "icon": "el-icon-document-copy" } }, { "title": "删除", "eventType": "delete", "cfElBtn": { "circle": true, "icon": "el-icon-close" } }, { "uiType": "link", "text": "详情", "target": "_blank" }] }, "batchBtns": { "addon": [{ "text": "新增", "eventType": "add", "cfElBtn": { "type": "primary" } }, { "text": "删除选中", "eventType": "delete", "needSelect": true, "cfElBtn": {} }, { "uiType": "slot", "slot": "slot_in_toolbar" }] }, "dynamicDict": [{ "ajax": { "param": { "_systemId": "sys_api", "_dataType": "note_category" }, "url": "/info/getCommonList" }, "populateColumn": "categoryDoc", "idColumn": "category", "idColumn2": "_id" }], "objParamAddon": { "_systemId": "sys_api", "_dataType": "note", "arrLookup": [] }, "paramAddonPublic": { "_systemId": "sys_api", "_dataType": "note" }, "columns": [{ "label": "uuid", "prop": "_id", "width": 120 }, { "label": "标题", "prop": "title", "width": 320, "fixed": true, "edit": true }, { "label": "分组数", "prop": "countGroup", "width": 60 }, { "label": "关键词", "prop": "keyword", "width": 70, "edit": true }, { "label": "熟悉度", "prop": "familiarity", "width": 120, "slot": "slot_column_familiarity", "cfColumn": { "class-name": "table_cell_visible" } }, { "label": "重要性", "prop": "importance", "width": 70, "edit": true }, { "label": "难度", "prop": "difficulty", "width": 70, "edit": true }, { "label": "所属分类", "prop": "category", "width": 120 }, { "label": "demo列表", "prop": "demoList", "width": 90 }], "searchFormItems": [{ "label": "标题", "prop": "title", "type": "input_find_vague" }, { "label": "所属分类", "prop": "category", "type": "select", "multiple": true, "ajax": { "param": { "_systemId": "sys_api", "_dataType": "note_category" }, "url": "/info/getCommonList", "keyLabel": "title", "keyValue": "_id" } }, { "label": "重要性", "prop": "importance", "type": "select", "options": [{ "label": "作废", "value": 1 }, { "label": "次要", "value": 2 }, { "label": "一般", "value": 3 }, { "label": "重要", "value": 4 }, { "label": "很重要", "value": 5 }] }, { "label": "难度", "prop": "difficulty", "type": "select", "options": [{ "label": "简单", "value": 1 }, { "label": "一般", "value": 2 }, { "label": "困难", "value": 3 }, { "label": "很难", "value": 4 }] }, { "label": "分组数", "prop": "countGroup", "type": "number" }], "detailItems": [{ "label": "标题", "prop": "title" }, { "label": "关键词", "prop": "keyword" }, { "label": "详情", "prop": "_detail", "type": "html" }, { "label": "说明", "prop": "desc" }, { "label": "所属分类", "prop": "category" }, { "label": "重要性", "prop": "importance" }, { "label": "难度", "prop": "difficulty" }, { "label": "uuid", "prop": "_id" }, { "label": "demo列表", "prop": "demoList" }, { "label": "相关demo列表", "prop": "demoLinkList" }, { "label": "相关笔记列表", "prop": "noteList" }], "formItems": [{ "label": "标题", "prop": "title" }, { "label": "网址", "prop": "link", "type": "input" }, { "label": "重要性", "prop": "importance", "type": "radio", "options": [{ "label": "作废", "value": 1 }, { "label": "次要", "value": 2 }, { "label": "一般", "value": 3 }, { "label": "重要", "value": 4 }, { "label": "很重要", "value": 5 }] }, { "label": "难度", "prop": "difficulty", "type": "radio", "options": [{ "label": "简单", "value": 1 }, { "label": "一般", "value": 2 }, { "label": "困难", "value": 3 }, { "label": "很难", "value": 4 }] }, { "label": "关键词", "prop": "keyword", "type": "tag_list" }, { "label": "所属分类", "prop": "category", "type": "select", "multiple": true, "ajax": { "param": { "_systemId": "sys_api", "_dataType": "note_category" }, "url": "/info/getCommonList", "keyLabel": "title", "keyValue": "_id" } }, { "label": "说明", "prop": "desc", "type": "textarea" }, { "label": "详情", "prop": "_detail", "type": "editorTM" }] } } }], "isMultipleSelect": true, "isShowCheckedBox": true, "isShowSearchForm": true, "isShowBreadcrumb": true, "isShowPageLink": true, "isShowOperateColumn": true, "isRefreshAfterCUD": true, "isShowToolBar": true, "cfElTable": { "header-row-class-name": "n-table-head", "row-class-name": "n-table-row" }, "formDataAddInit": {} }


window.cfSelectList_note = {
    hideCollection: true,//隐藏collection
    dataName: "笔记(不回显)",
    valueKey: "_id",
    labelKey: "title",
    pageName: "tangball_article",
    multiple: true, //多选
    //需要保留的集合字段
    selectJson: {
        _id: 1,
        title: 1,
        link: 1
    },
    cfList: list_common_note
}









//#endregion

//#endregion


//#endregion



//#region 用户信息
D_ITEMS.trueName = {
    label: "真实姓名",
    prop: "trueName",

};
COLUMNS.trueName = { ...D_ITEMS.trueName, width: 70, };
F_ITEMS.trueName = { ...D_ITEMS.trueName };


//#endregion




//#region 订单信息

D_ITEMS.deliveryDesc = {
    label: "配送说明",
    prop: "deliveryDesc",

};
COLUMNS.deliveryDesc = { ...D_ITEMS.deliveryDesc, width: 70, };
F_ITEMS.deliveryDesc = { ...D_ITEMS.deliveryDesc, type: "textarea" };



D_ITEMS.orderNickName = {
    label: "下单人",
    prop: "orderNickName",

};
COLUMNS.orderNickName = {
    ...D_ITEMS.orderNickName,
    width: 70,
    formatter: function (row) {

        return lodash.get(row, `userDoc.nickName`);
    }
};

D_ITEMS.priceSellSection = {
    label: "价格区间",
    prop: "priceSellSection",

};
COLUMNS.priceSellSection = { ...D_ITEMS.priceSellSection, width: 70, };
F_ITEMS.priceSellSection = { ...D_ITEMS.deliverpriceSellSectionyDesc, type: "text" };
//#endregion


//#region旧版信息系统




//#region 任务类型
D_ITEMS.taskType = {
    label: "任务类型",
    prop: "taskType",
};
COLUMNS.taskType = {
    ...D_ITEMS.taskType, width: 70,
    formatter: function (row) {
        return lodash.get(DYDICT.taskType, `${row.taskType}.label`);

    }
};
F_ITEMS.taskType = { ...D_ITEMS.taskType, type: "select", options: DYDICT.arr_taskType };

F_ITEMS.taskType_radio = { ...D_ITEMS.taskType, type: "radio", default: 1, options: DYDICT.arr_taskType };
//#endregion


//#region 优先级
D_ITEMS.prior = {
    label: "优先级",
    prop: "prior",
};
COLUMNS.prior = {
    ...D_ITEMS.prior, width: 80,
    formatter: function (row) {
        return lodash.get(DYDICT.prior, `${row.prior}.label`);
    }
};
F_ITEMS.prior = { ...D_ITEMS.prior, type: "select", options: DYDICT.arr_prior, };
F_ITEMS.prior_radio = { ...D_ITEMS.prior, type: "radio", options: DYDICT.arr_prior, };
//#endregion

//#region 完成度
D_ITEMS.complete = {
    label: "完成度",
    prop: "complete",
};
COLUMNS.complete = {
    ...D_ITEMS.complete, width: 80,
    slot: "slot_column_complete",
};
F_ITEMS.complete = {
    ...D_ITEMS.complete, type: "slider",
    default: 0,
    options: DYDICT.arr_complete
};
//#endregion

//#region 预估耗时
D_ITEMS.predictTime = {
    label: "预估耗时",
    prop: "predictTime",
};
COLUMNS.predictTime = { ...D_ITEMS.predictTime, width: 70, };
F_ITEMS.predictTime = {
    ...D_ITEMS.predictTime, type: "text",
    frequency: { options: [{ value: 0.3 }, { value: 0.5 }, { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }, { value: 8 }, { value: 10 }] }
};
//#endregion

//#region 实耗时
D_ITEMS.actualTime = {
    label: "实耗时",
    prop: "actualTime",
};
COLUMNS.actualTime = { ...D_ITEMS.actualTime, width: 70, };
F_ITEMS.actualTime = {
    ...D_ITEMS.actualTime, type: "text",
    frequency: { options: [{ value: 0.3 }, { value: 0.5 }, { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }, { value: 8 }, { value: 10 }] }
};
//#endregion

//#region 负责人
D_ITEMS.personCharge = {
    label: "负责人",
    prop: "personCharge"
};
COLUMNS.personCharge = {
    ...D_ITEMS.personCharge, width: 70,
    formatter(row) {//返回姓名-配合动态数据字典
        if (!row.adminDoc) return
        let arrName = row.adminDoc.map(doc => doc.nickName);
        return arrName.join()
    }
};
F_ITEMS.personCharge = {
    ...D_ITEMS.personCharge, type: "select", multiple: true, //多选
    ajax: {
        param: { _systemId, _dataType: "data_type" },
        url: "/info/getCommonList",
        keyLabel: "nickName",
        keyValue: "userName"
    }
};
//#endregion





COLUMNS.payStatus_slot = { ...D_ITEMS.payStatus, slot: "slot_column_payStatus", width: 130, };
D_ITEMS.timeOrder = {
    label: "下单时间", prop: "timeOrder", width: 150,
    formatter: function (row) {
        if (!row.timeOrder) return "";
        return moment(row.timeOrder).format("YYYY-MM-DD HH:mm:ss")
    }

};
COLUMNS.timeOrder = { ...D_ITEMS.timeOrder };



D_ITEMS.refundId = {
    label: "退款Id", prop: "refundId", width: 80
}
COLUMNS.refundId = { ...D_ITEMS.refundId };
F_ITEMS.refundId = { ...D_ITEMS.refundId };


D_ITEMS.refundFee = {
    label: "退款金额", prop: "refundFee", width: 80
}
COLUMNS.refundFee = { ...D_ITEMS.refundFee };
F_ITEMS.refundFee = { ...D_ITEMS.refundFee };




DYDICT.arr_refundStaus = [
    { label: "未申请", value: 1 },
    { label: "已申请退款", value: 2 },
    { label: "退款成功", value: 2 },
]
DYDICT.refundStaus = lodash.keyBy(DYDICT.arr_refundStaus, 'value')

D_ITEMS.refundStaus = {
    label: "退款状态", prop: "refundStaus", width: 80,
    formatter: function (rowData) {
        return lodash.get(DYDICT.refundStaus, `${rowData.refundStaus}.label`);
    },
}
COLUMNS.refundStaus = { ...D_ITEMS.refundStaus };
F_ITEMS.refundStaus = {
    ...D_ITEMS.refundStaus, type: "select",
    options: DYDICT.arr_payStatus
};



D_ITEMS.relNoteList = {
    label: "相关笔记列表",
    prop: "relNoteList"
};
COLUMNS.relNoteList = { ...D_ITEMS.relNoteList, width: 120 };

F_ITEMS.relNoteList = {
    ...D_ITEMS.relNoteList
};




//#region 0000
D_ITEMS.aaaa = {
    label: "0000",
    prop: "aaaa",
};
COLUMNS.aaaa = { ...D_ITEMS.aaaa, width: 70, };
F_ITEMS.aaaa = { ...D_ITEMS.aaaa, type: "input" };
//#endregion

//#region 0000
D_ITEMS.aaaa = {
    label: "0000",
    prop: "aaaa",
};
COLUMNS.aaaa = { ...D_ITEMS.aaaa, width: 70, };
F_ITEMS.aaaa = { ...D_ITEMS.aaaa, type: "input" };
//#endregion

//#region 0000
D_ITEMS.aaaa = {
    label: "0000",
    prop: "aaaa",
};
COLUMNS.aaaa = { ...D_ITEMS.aaaa, width: 70, };
F_ITEMS.aaaa = { ...D_ITEMS.aaaa, type: "input" };
//#endregion

//#region 0000
D_ITEMS.aaaa = {
    label: "0000",
    prop: "aaaa",
};
COLUMNS.aaaa = { ...D_ITEMS.aaaa, width: 70, };
F_ITEMS.aaaa = { ...D_ITEMS.aaaa, type: "input" };
//#endregion

//#region 0000
D_ITEMS.aaaa = {
    label: "0000",
    prop: "aaaa",
};
COLUMNS.aaaa = { ...D_ITEMS.aaaa, width: 70, };
F_ITEMS.aaaa = { ...D_ITEMS.aaaa, type: "input" };
//#endregion




//#endregion



