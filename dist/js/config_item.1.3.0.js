"use strict";

var _F_ITEMS$extend;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _systemId = PUB._systemId;
//#region DYDICT:公共数据字典对象管理
window.DYDICT = window.DYDICT || {}; //公共数据字典对象
window.D_ITEMS = window.D_ITEMS || {}; //详情字段对象
window.COLUMNS = window.COLUMNS || {}; //列字段对象
window.F_ITEMS = window.F_ITEMS || {}; //表单字段对象


DYDICT.arr_importance = [{ label: "作废", value: 1 }, { label: "次要", value: 2 }, { label: "一般", value: 3 }, { label: "重要", value: 4 }, { label: "很重要", value: 5 }];
DYDICT.importance = lodash.keyBy(DYDICT.arr_importance, 'value');

DYDICT.arr_html_display = [{ label: "block", value: "block" }, { label: "inline", value: "inline" }, { label: "inline-block", value: "inline-block" }, { label: "none", value: "none" }];
DYDICT.arr_difficulty = [{ label: "简单", value: 1 }, { label: "一般", value: 2 }, { label: "困难", value: 3 }, { label: "很难", value: 4 }];

DYDICT.difficulty = lodash.keyBy(DYDICT.arr_difficulty, 'value');

DYDICT.arr_html_version = [{ label: "HTML4", value: "HTML4" }, { label: "HTML5", value: "HTML5" }];
DYDICT.arr_selfClose = [{ label: "否", value: "0" }, { label: "是", value: "1" }];
DYDICT.selfClose = lodash.keyBy(DYDICT.arr_selfClose, 'value');

DYDICT.arr_boolean = [{ label: "否", value: 0 }, { label: "是", value: 1 }];
DYDICT.boolean = lodash.keyBy(DYDICT.arr_boolean, 'value');

DYDICT.arr_dataType = [{ label: "知识点", value: "note" }, { label: "前端demo", value: "front_demo" }, { label: "习题", value: "exercises" }, { label: "分组", value: "group" }, { label: "HtmlApi", value: "html_api" }, { label: "Js-Api", value: "js_api" }, { label: "Css-Api", value: "css_api" }, { label: "视频", value: "vedio" }, { label: "网址", value: "url" }];
DYDICT.dataType = lodash.keyBy(DYDICT.arr_dataType, 'value');

DYDICT.arr_payStatus = [{ label: "未支付", value: 1 }, { label: "已支付", value: 2 }, { label: "申请退款中", value: 3 }, { label: "已退款", value: 4 }];

DYDICT.payStatus = lodash.keyBy(DYDICT.arr_payStatus, 'value');

DYDICT.arr_deliveryStatus = [{ label: "未发货", value: 1 }, { label: "发货中", value: 2 }, { label: "已收货", value: 3 }];
DYDICT.deliveryStatus = lodash.keyBy(DYDICT.arr_deliveryStatus, 'value');

DYDICT.arr_orderSource = [{ label: "微信平台", value: 1 }, { label: "线下登记", value: 2 }];
DYDICT.orderSource = lodash.keyBy(DYDICT.arr_orderSource, 'value');

DYDICT.arr_prior = [{ value: 1, label: "很高" }, { value: 2, label: "高" }, { value: 3, label: "中" }, { value: 4, label: "低" }];
DYDICT.prior = lodash.keyBy(DYDICT.arr_prior, 'value');

DYDICT.arr_taskType = [{ value: 1, label: "新需求" }, { value: 2, label: "bug" }, { value: 4, label: "架构优化" }, { value: 5, label: "性能优化" }, { value: 3, label: "其他" }];

DYDICT.taskType = lodash.keyBy(DYDICT.arr_taskType, 'value');

DYDICT.arr_complete = [{ value: 0, label: "0%" }, { value: 0.1, label: "10%" }, { value: 0.2, label: "20%" }, { value: 0.3, label: "30%" }, { value: 0.4, label: "40%" }, { value: 0.5, label: "50%" }, { value: 0.6, label: "60%" }, { value: 0.7, label: "70%" }, { value: 0.8, label: "80%" }, { value: 0.9, label: "90%" }, { value: 1, label: "100%" }];
DYDICT.complete = lodash.keyBy(DYDICT.arr_complete, 'value');

DYDICT.arr_complete2 = [{ value: 1, label: "未开始" }, //complete==0
{ value: 2, label: "进行中" }, //complete>0&&complete>1
{ value: 3, label: "已完成" }];
DYDICT.complete2 = lodash.keyBy(DYDICT.arr_complete2, 'value');

DYDICT.html_api_category = {
    ajax: {
        param: { _systemId: _systemId, _dataType: "html_api_category" },
        url: "/info/getCommonList"
    },
    populateColumn: "categoryDoc",
    idColumn: "category",
    idColumn2: "_id"
};
DYDICT.css_api_category = {
    ajax: {
        param: { _systemId: _systemId, _dataType: "css_api_category" },
        url: "/info/getCommonList"
    },
    populateColumn: "categoryDoc",
    idColumn: "category",
    idColumn2: "_id"
};
DYDICT.js_api_category = {
    ajax: {
        param: { _systemId: _systemId, _dataType: "js_api_category" },
        url: "/info/getCommonList"
    },
    populateColumn: "categoryDoc",
    idColumn: "category",
    idColumn2: "_id"
};

DYDICT.note_category = {
    ajax: {
        param: { _systemId: _systemId, _dataType: "note_category" },
        url: "/info/getCommonList"
    },
    populateColumn: "categoryDoc",
    idColumn: "category",
    idColumn2: "_id"
};

DYDICT.order_user = {
    ajax: {
        param: { _dataType: "user" },
        url: "/info/getCommonList"
    },
    populateColumn: "userDoc",
    idColumn: "openid",
    idColumn2: "openid"
};

//负责人
DYDICT.personCharge = {
    ajax: {
        param: { _systemId: _systemId, _dataType: "admin" },
        url: "/info/getCommonList"
    },
    populateColumn: "adminDoc",
    idColumn: "personCharge",
    idColumn2: "userName"

};

//#endregion


//#region 标题
{
    var objBase = {
        label: "标题",
        prop: "title"
    };
    D_ITEMS.title = _extends({}, objBase);
    COLUMNS.title_fixed = _extends({}, objBase, { width: 320, fixed: true });
    COLUMNS.title = _extends({}, objBase, { width: 200 });
    COLUMNS.title_w250 = _extends({}, objBase, { width: 250 });
    COLUMNS.title_w300 = _extends({}, objBase, { width: 300 });
    COLUMNS.title_w100 = _extends({}, objBase, { width: 100 });
    COLUMNS.title_w150 = _extends({}, objBase, { width: 150 });
    COLUMNS.title_w200 = _extends({}, objBase, { width: 200 });
    F_ITEMS.title = _extends({}, objBase);
    F_ITEMS.title_search = _extends({}, objBase, { type: "input_find_vague" });

    COLUMNS.title_fixed_w150 = _extends({}, COLUMNS.title_fixed, { width: 150 });
    COLUMNS.title_fixed_w150_edit = _extends({}, COLUMNS.title_fixed_w150, { edit: true });
    COLUMNS.title_fixed_edit = _extends({}, COLUMNS.title_fixed, { edit: true });
}

//#endregion


//#region 龙庭订单

D_ITEMS.transaction_id = {
    label: "微信交易号",
    prop: "transaction_id"
};
COLUMNS.transaction_id = _extends({}, D_ITEMS.transaction_id);
F_ITEMS.transaction_id = _extends({}, D_ITEMS.transaction_id);

D_ITEMS.timeOrder = {
    label: "下单时间", prop: "timeOrder", width: 130,
    formatter: function formatter(row) {
        if (!row.timeOrder) return "";
        return moment(row.timeOrder).format("YYYY-MM-DD HH:mm");
    }

};

COLUMNS.timeOrder = _extends({}, D_ITEMS.timeOrder);
F_ITEMS.timeOrder = _extends({}, D_ITEMS.timeOrder, { type: "dateTime" });
F_ITEMS.timeOrder_search = _extends({}, D_ITEMS.timeOrder, { type: "time_period" });

D_ITEMS.priceOrder = {
    label: "订单金额",
    prop: "priceOrder"
};
COLUMNS.priceOrder = _extends({}, D_ITEMS.priceOrder, { width: 90 });
F_ITEMS.priceOrder = _extends({}, D_ITEMS.priceOrder, { type: "number" });

//#region 商品清单
{
    var _objBase = {
        label: "商品清单",
        prop: "listGoods"
    };
    D_ITEMS.listGoods = _extends({}, _objBase, { component: "com_listGoods"
    });
    COLUMNS.listGoods = _extends({}, _objBase, { width: 70 });
    F_ITEMS.listGoods = _extends({}, _objBase, { type: "jsonEditor" });
}

//#endregion


//#region 收货地址
{
    var _objBase2 = {
        label: "收货地址", prop: "addressObj"
    };
    D_ITEMS.addressObj = _extends({}, _objBase2, { component: "com_addressObj"
    });
    COLUMNS.addressObj = _extends({}, _objBase2, { width: 70 });
    // F_ITEMS.addressObj = { ...objBase, type: "jsonEditor" };
    F_ITEMS.addressObj = {
        label: "收货地址", prop: "addressObj", col_span: 24, //控制显示一行多列
        default: {}, //默认值必须要有，否则新增的时候会出问题
        //控制显示一行多列
        cfForm: {
            col_span: 12,
            formItems: [{
                label: "省市区", valueType: "arrObj", prop: "arrArea", type: "select_area"
            }, {
                label: "详细地址",
                prop: "detail"
            }]
        }
    };
}

//#endregion

F_ITEMS.collection_DYDICT_value = {
    label: "值项",
    prop: "arrItem",
    type: "collection",
    cfElBtnAdd: {
        //自定义“新增”按钮
        text: "+添加一组",
        type: "primary",
        size: "mini",
        plain: false
    },
    collectionCfForm: {
        col_span: 12,
        formItems: [{
            label: "标签名",
            prop: "label"
        }, {
            label: "值",
            prop: "value"
        }]
    }
};

F_ITEMS.collection_DYDICT = {
    label: "字典大项",
    style: { "margin-top": "50px" }, //自定义样式
    prop: "collection1",
    type: "collection",
    // collectionlistType: "form",
    // dataSlot: "slot_collection1", //自定义数据插槽
    cfElBtnAdd: {
        //自定义“新增”按钮
        text: "+添加一组",
        type: "primary",
        size: "mini",
        plain: false
    },
    collectionCfForm: {
        col_span: 12,
        formItems: [{
            label: "属性名",
            prop: "prop"
        }, F_ITEMS.collection_DYDICT_value]
    }
};

//#region DYDICT表单
{
    var _objBase3 = {
        label: "DYDICT数据", prop: "DYDICT"
    };
    D_ITEMS.DYDICT = _extends({}, _objBase3);
    COLUMNS.DYDICT = _extends({}, _objBase3, { width: 70 });
    // F_ITEMS.addressObj = { ...objBase, type: "jsonEditor" };
    F_ITEMS.DYDICT = _extends({}, _objBase3, {
        default: {}, //默认值必须要有，否则新增的时候会出问题
        cfForm: {
            col_span: 12, //控制显示一行多列
            formItems: [F_ITEMS.collection_DYDICT]
        }
    });
}

//#endregion


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
    formatter: function formatter(data) {
        if (data.sex == 2) {
            return '女';
        } else if (data.sex == 1) {
            return '男';
        } else {
            return '';
        }
    }
};
COLUMNS.sex = Object.assign({}, D_ITEMS.sex, { width: 50 });
F_ITEMS.sex = {
    label: "性别",
    prop: "sex",
    type: "select",
    options: [{ label: "男", value: 1 }, { label: "女", value: 2 }]
};

D_ITEMS.openid = {
    label: "微信openid",
    prop: "openid"
};
COLUMNS.openid = _extends({}, D_ITEMS.openid);
F_ITEMS.openid = _extends({}, D_ITEMS.openid);

D_ITEMS.phone = {
    label: "手机号",
    prop: "phone"
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

//#region 身份证号
{
    var prop = "idCard";
    var _objBase4 = {
        label: "身份证号",
        prop: prop
    };
    D_ITEMS[prop] = _extends({}, _objBase4);
    COLUMNS[prop] = _extends({}, _objBase4, { width: 70 });
    F_ITEMS[prop] = _extends({}, _objBase4, { type: "input" });
}

//#endregion

//#region 职业
{
    var _prop = "career";
    var _objBase5 = {
        label: "职业",
        prop: _prop
    };
    D_ITEMS[_prop] = _extends({}, _objBase5);
    COLUMNS[_prop] = _extends({}, _objBase5, { width: 70 });
    F_ITEMS[_prop] = _extends({}, _objBase5, { type: "input" });
}

//#endregion


D_ITEMS.remark = {
    label: "备注",
    prop: "remark"
};
D_ITEMS.category_remark = {
    label: "分类说明",
    prop: "remark"
};

COLUMNS.remark = _extends({}, D_ITEMS.remark);
COLUMNS.category_remark = _extends({}, D_ITEMS.category_remark, { width: 180 });

F_ITEMS.remark = _extends({}, D_ITEMS.remark);
F_ITEMS.category_remark = _extends({}, D_ITEMS.category_remark, { type: "textarea" });

D_ITEMS.age = {
    label: "年龄",
    prop: "age"
};
F_ITEMS.age = {
    label: "年龄",
    prop: "age",
    type: "input"
};

D_ITEMS.orderId = {
    label: "订单号",
    prop: "orderId"
};
COLUMNS.orderId = _extends({}, D_ITEMS.orderId, { width: 160 });
F_ITEMS.orderId = _extends({}, D_ITEMS.orderId);

DYDICT.arr_auditStatus = [{ label: "未审核", value: 1 }, { label: "审核不通过", value: 2 }, { label: "审核通过", value: 3 }];
DYDICT.auditStatus = lodash.keyBy(DYDICT.arr_auditStatus, 'value');

D_ITEMS.auditStatus = {
    label: "审核状态",
    prop: "auditStatus",
    formatter: function formatter(rowData) {
        return lodash.get(DYDICT.auditStatus, rowData.auditStatus + ".label");
    }

};
F_ITEMS.auditStatus = {
    label: "审核状态",
    prop: "auditStatus",
    type: "select",
    options: DYDICT.arr_auditStatus
};
//#endregion
//#region 通用数据


D_ITEMS.desc = {
    label: "说明",
    prop: "desc"
};
COLUMNS.desc = _extends({}, D_ITEMS.desc, { width: 160 });
F_ITEMS.desc = _extends({}, D_ITEMS.desc, { type: "textarea" });

D_ITEMS.detail = {
    label: "详情",
    prop: "_detail",
    type: "html"
};
//  COLUMNS.detail = {...D_ITEMS.detail, width: 120,};
F_ITEMS.detail = _extends({}, D_ITEMS.detail, { type: "editorTM", col_span: 24 });

F_ITEMS.detail_paste = _extends({}, F_ITEMS.detail, { pasteImage: true //支持粘贴上传图片的编辑器vue-dm-components.2.3.9

});F_ITEMS.detail_new = _extends({}, F_ITEMS.detail, {
    type: "editorTM",
    pasteImage: true
});

D_ITEMS._data = {
    label: "_data对象",
    prop: "_data"

};
COLUMNS._data = _extends({}, D_ITEMS._data, { width: 90 });
F_ITEMS._data = _extends({}, D_ITEMS._data, { type: "jsonEditor" });

D_ITEMS.arrGroup = {
    label: "所属分组",
    prop: "arrGroup"

};
COLUMNS.arrGroup = _extends({}, D_ITEMS.arrGroup, { width: 100 });

D_ITEMS.countGroup = {
    label: "分组数",
    prop: "countGroup"

};
COLUMNS.countGroup = _extends({}, D_ITEMS.countGroup, { width: 60 });
F_ITEMS.countGroup = _extends({}, D_ITEMS.countGroup, { type: "number" });

//#endregion
//#region 管理员
D_ITEMS.userName = {
    label: "用户名",
    prop: "userName"
};
COLUMNS.userName = _extends({}, D_ITEMS.userName, { width: 150 });
F_ITEMS.userName = _extends({}, D_ITEMS.userName, { type: "input" });

D_ITEMS.passWord = {
    label: "密码",
    prop: "passWord"
};
COLUMNS.passWord = _extends({}, D_ITEMS.passWord, { width: 150 });
F_ITEMS.passWord = _extends({}, D_ITEMS.passWord, { type: "passWord" });

D_ITEMS.nickName = {
    label: "昵称",
    prop: "nickName"
};
COLUMNS.nickName = _extends({}, D_ITEMS.nickName, { width: 120 });
F_ITEMS.nickName = _extends({}, D_ITEMS.nickName, { type: "input" });

D_ITEMS.role = {
    label: "所属角色",
    prop: "role"
};
COLUMNS.role = _extends({}, D_ITEMS.role, { width: 120 });
F_ITEMS.role = {
    label: "所属角色",
    prop: "role",
    type: "select",
    ajax: {
        param: { _dataType: "role" },
        url: "/info/getCommonList",
        keyLabel: "name",
        keyValue: "_id"
    }

    //#endregion
    //#region 角色
};D_ITEMS.roleName = {
    label: "角色名",
    prop: "name"
};
COLUMNS.roleName = _extends({}, D_ITEMS.roleName, { width: 120 });
F_ITEMS.roleName = _extends({}, D_ITEMS.roleName, { type: "input" });

D_ITEMS.rolePower = {
    label: "权限",
    prop: "power"
};
COLUMNS.rolePower = _extends({}, D_ITEMS.rolePower, { width: 120 });
F_ITEMS.rolePower = _extends({}, D_ITEMS.rolePower, {
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
                    prop: "list_article",
                    style: styleMenuPowerItem,
                    cfForm: getFormMenuGPower({ menuName: "资讯列表" })
                }, {
                    prop: "list_article_category",
                    style: styleMenuPowerItem,
                    cfForm: getFormMenuGPower({ menuName: "资讯分类" })
                }]
            }
        }, {
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
                }, {
                    prop: "list_role",
                    style: styleMenuPowerItem,
                    cfForm: getFormMenuGPower({ menuName: "角色" })
                }, {
                    prop: "list_area",
                    style: styleMenuPowerItem,
                    cfForm: getFormMenuGPower({ menuName: "地区管理" })
                }]
            }
        }]
    }
});

//#endregion
//#region 分类
D_ITEMS.category_name = {
    label: "分类名",
    prop: "name"
};
COLUMNS.category_name = _extends({}, D_ITEMS.category_name, { width: 120 });
F_ITEMS.category_name = _extends({}, D_ITEMS.category_name, { type: "input" });

D_ITEMS.category = {
    label: "所属分类",
    prop: "category"
};

COLUMNS.category = _extends({}, D_ITEMS.category, {
    width: 120,
    formatter: function formatter(rowData) {
        var title = lodash.get(rowData, "categoryDoc.title");
        return title;
    }
});
F_ITEMS.category = _extends({}, D_ITEMS.category, { type: "input" });
F_ITEMS.html_api_category = _extends({}, D_ITEMS.category, {
    type: "select",
    ajax: {
        param: { _dataType: "html_api_category" },
        url: "/info/getCommonList",
        keyLabel: "title",
        keyValue: "_id"
    }
});
F_ITEMS.css_api_category = _extends({}, D_ITEMS.category, {
    type: "select",
    ajax: {
        param: { _dataType: "css_api_category" },
        url: "/info/getCommonList",
        keyLabel: "title",
        keyValue: "_id"
    }
});
F_ITEMS.js_api_category = _extends({}, D_ITEMS.category, {
    type: "select",
    ajax: {
        param: { _dataType: "js_api_category" },
        url: "/info/getCommonList",
        keyLabel: "title",
        keyValue: "_id"
    }
});

F_ITEMS.note_category = _extends({}, D_ITEMS.category, {
    type: "select",
    multiple: true, //多选
    ajax: {
        param: { _dataType: "note_category" },
        url: "/info/getCommonList",
        keyLabel: "title",
        keyValue: "_id"
    }
});

//#endregion
//#region 熟悉度相关
D_ITEMS.familiarity = {
    label: "熟悉度",
    prop: "familiarity"
};

COLUMNS.familiarity_select = _extends({}, D_ITEMS.familiarity, {
    width: 120,
    // slot: "slot_column_familiarity",
    component: "com_note_familiarity_select",
    cfColumn: { "class-name": "table_cell_visible" //补充特殊单元格类名，进行特殊控制！
    } });

COLUMNS.familiarity = _extends({}, D_ITEMS.familiarity, {
    width: 100
});

F_ITEMS.familiarity = _extends({}, D_ITEMS.familiarity, { type: "input" });

D_ITEMS.dataType = {
    label: "数据类型",
    prop: "dataType"
};
COLUMNS.dataType = _extends({}, D_ITEMS.dataType, { width: 80 });
F_ITEMS.dataType = _extends({}, D_ITEMS.dataType, { type: "input" });

D_ITEMS.dataId = {
    label: "数据Id",
    prop: "dataId"
};
COLUMNS.dataId = _extends({}, D_ITEMS.dataId, { width: 210 });
F_ITEMS.dataId = _extends({}, D_ITEMS.dataId, { type: "input" });

D_ITEMS.userId = {
    label: "用户Id",
    prop: "userId"
};
COLUMNS.userId = _extends({}, D_ITEMS.userId, { width: 120 });
F_ITEMS.userId = _extends({}, D_ITEMS.userId, { type: "input" });

D_ITEMS._userId = {
    label: "_userId",
    prop: "_userId"
};
COLUMNS._userId = _extends({}, D_ITEMS._userId, { width: 120 });
F_ITEMS._userId = _extends({}, D_ITEMS._userId, { type: "input" });

D_ITEMS._id = {
    label: "uuid",
    prop: "_id"
};
COLUMNS._id = _extends({}, D_ITEMS._id, {
    width: 80,
    sortable: "custom" //开启后端排序
});

D_ITEMS.studyTime = {
    label: "学习时间",
    prop: "studyTime"
};
COLUMNS.studyTime = _extends({}, D_ITEMS.studyTime, {
    width: 140
});

//#endregion
//#region html-API
D_ITEMS.html_display = {
    label: "块级",
    prop: "display"
};
COLUMNS.html_display = _extends({}, D_ITEMS.html_display, { width: 70 });
F_ITEMS.html_display = _extends({}, D_ITEMS.html_display, {
    type: "select",
    options: DYDICT.arr_html_display
});

D_ITEMS.importance = {
    label: "重要性",
    prop: "importance"
};
COLUMNS.importance = _extends({}, D_ITEMS.importance, {
    width: 70,
    formatter: function formatter(rowData) {
        return lodash.get(DYDICT.importance, rowData.importance + ".label");
    }
});
F_ITEMS.importance = _extends({}, D_ITEMS.importance, {
    type: "select",
    options: DYDICT.arr_importance
});
F_ITEMS.importance_radio = _extends({}, F_ITEMS.importance, {
    type: "radio"
});

D_ITEMS.difficulty = {
    label: "难度",
    prop: "difficulty"
};
COLUMNS.difficulty = _extends({}, D_ITEMS.difficulty, {
    width: 70,
    formatter: function formatter(rowData) {
        return lodash.get(DYDICT.difficulty, rowData.difficulty + ".label");
    }
});
F_ITEMS.difficulty = _extends({}, D_ITEMS.difficulty, {
    type: "select",
    options: DYDICT.arr_difficulty
});
F_ITEMS.difficulty_radio = _extends({}, F_ITEMS.difficulty, {
    type: "radio"
});

D_ITEMS.english = {
    label: "原英文",
    prop: "english"
};
COLUMNS.english = _extends({}, D_ITEMS.english, { width: 70 });
F_ITEMS.english = _extends({}, D_ITEMS.english, {
    type: "input"
});

D_ITEMS.html_version = {
    label: "版本",
    prop: "version"
};
COLUMNS.html_version = _extends({}, D_ITEMS.html_version, { width: 70 });
F_ITEMS.html_version = _extends({}, D_ITEMS.html_version, {
    type: "select",
    options: DYDICT.arr_html_version
});

D_ITEMS.selfClose = {
    label: "自闭合",
    prop: "selfClose"
};
COLUMNS.selfClose = _extends({}, D_ITEMS.selfClose, { width: 70 });
F_ITEMS.selfClose = _extends({}, D_ITEMS.selfClose, {
    type: "select",
    options: DYDICT.arr_selfClose
});

D_ITEMS.cateIdOld = {
    label: "旧分类Id",
    prop: "cateIdOld"
};
COLUMNS.cateIdOld = _extends({}, D_ITEMS.cateIdOld, { width: 70 });
F_ITEMS.cateIdOld = _extends({}, D_ITEMS.cateIdOld, { type: "input" });

D_ITEMS.demoList = {
    label: "demo列表",
    prop: "demoList"
};

COLUMNS.demoList = _extends({}, D_ITEMS.demoList, { width: 90 });

F_ITEMS.demoList = _extends({}, D_ITEMS.demoList, {
    type: "collection",
    collectionlistType: "form",
    // showToolbar: false, //不显示集合的工具栏
    collectionCfForm: {
        col_span: 12,
        formItems: [{
            label: "标题",
            prop: "title",
            type: "input"
        }, {
            label: "链接",
            prop: "link",
            type: "input"
        }]
    }
});

//#endregion


D_ITEMS.css_version = {
    label: "版本",
    prop: "version"
};
COLUMNS.css_version = _extends({}, D_ITEMS.css_version, { width: 70 });

//#region 分组
D_ITEMS.group_dataType = {
    label: "数据类型",
    prop: "dataType"
};
COLUMNS.group_dataType = _extends({}, D_ITEMS.group_dataType, { width: 90 });
F_ITEMS.group_dataType = _extends({}, D_ITEMS.group_dataType, {
    type: "select",
    ajax: {
        param: { _systemId: _systemId, _dataType: "data_type" },
        url: "/info/getCommonList",
        keyLabel: "title",
        keyValue: "key"
    }
});

D_ITEMS.countData = {
    label: "数据量",
    prop: "countData"
};
COLUMNS.countData = _extends({}, D_ITEMS.countData, { width: 80 });

D_ITEMS.score = {
    label: "分数对象",
    prop: "score"
};
COLUMNS.score = _extends({}, D_ITEMS.score, { width: 90 });

D_ITEMS.myScore = {
    label: "我的分数",
    prop: "myScore"
};
COLUMNS.myScore = _extends({}, D_ITEMS.myScore, { width: 90, slot: "slot_column_score" });

D_ITEMS.alias = {
    label: "别名",
    prop: "alias"
};
COLUMNS.alias = _extends({}, D_ITEMS.alias, { width: 130 });
F_ITEMS.alias = _extends({}, D_ITEMS.alias, { type: "input" });

//#endregion
//#region 关系
D_ITEMS._idRel = {
    label: "关联数据1",
    prop: "_idRel"
};
F_ITEMS._idRel = _extends({}, D_ITEMS._idRel, { type: "input" });
COLUMNS._idRel = _extends({}, D_ITEMS._idRel, { width: 220 });

D_ITEMS._idRel2 = {
    label: "关联数据2",
    prop: "_idRel2"
};
COLUMNS._idRel2 = _extends({}, D_ITEMS._idRel2, { width: 220 });
F_ITEMS._idRel2 = _extends({}, D_ITEMS._idRel2, { type: "input" });

D_ITEMS.sort = {
    label: "序号",
    prop: "sort"
};
COLUMNS.sort = _extends({}, D_ITEMS.sort, { width: 70 });
F_ITEMS.sort = _extends({}, D_ITEMS.sort, { type: "number" });

//#endregion
//#region 其他
D_ITEMS.dataTypekey = {
    label: "类型代号",
    prop: "key"
};
COLUMNS.dataTypekey = _extends({}, D_ITEMS.dataTypekey, { width: 120 });
F_ITEMS.dataTypekey = _extends({}, D_ITEMS.dataTypekey, { type: "input" });

//#endregion
//#region 笔记
D_ITEMS.keyword = {
    label: "关键词",
    prop: "keyword"
};
COLUMNS.keyword = _extends({}, D_ITEMS.keyword, { width: 70 });
COLUMNS.keyword_edit = _extends({}, COLUMNS.keyword, { edit: true });
F_ITEMS.keyword = _extends({}, D_ITEMS.keyword, { type: "tag_list" });

D_ITEMS.note_linkList = {
    label: "相关demo列表",
    prop: "demoLinkList"
};
COLUMNS.note_linkList = _extends({}, D_ITEMS.note_linkList, { width: 120 });

D_ITEMS.note_noteList = {
    label: "相关笔记列表",
    prop: "noteList"
};
COLUMNS.note_noteList = _extends({}, D_ITEMS.note_noteList, { width: 120 });

//#endregion
//#region 网址
D_ITEMS.link = {
    label: "网址",
    prop: "link"
};
COLUMNS.link = _extends({}, D_ITEMS.link, { width: 120 });
F_ITEMS.link = _extends({}, D_ITEMS.link, { type: "input" });

//#endregion


//#region 字段属性
{
    var _prop2 = "item_prop",
        _objBase6 = { label: "字段属性", prop: "prop" };
    D_ITEMS[_prop2] = _extends({}, _objBase6);
    COLUMNS[_prop2] = _extends({}, _objBase6, { width: 120 });
    F_ITEMS[_prop2] = _extends({}, _objBase6, { type: "input" });
}
//#endregion


//#region 字段中文名
{
    var _prop3 = "item_label",
        _objBase7 = { label: "字段中文名", prop: "label" };
    D_ITEMS[_prop3] = _extends({}, _objBase7);
    COLUMNS[_prop3] = _extends({}, _objBase7, { width: 160 });
    F_ITEMS[_prop3] = _extends({}, _objBase7, { type: "input" });
    F_ITEMS.label_search = _extends({}, _objBase7, { type: "input_find_vague"
    });
}
//#endregion


//#region 0000
{
    var _prop4 = "item_type",
        _objBase8 = { label: "字段类型", prop: "type" };
    D_ITEMS[_prop4] = _extends({}, _objBase8);
    COLUMNS[_prop4] = _extends({}, _objBase8, { width: 70 });
    F_ITEMS[_prop4] = _extends({}, _objBase8, { type: "input" });
    // F_ITEMS[`${prop}_search`] = { ...objBase, type: "input_find_vague" };
}
//#endregion


//#region 0000
{
    var _prop5 = "aaaa",
        _objBase9 = { label: "0000", prop: _prop5 };
    D_ITEMS[_prop5] = _extends({}, _objBase9);
    COLUMNS[_prop5] = _extends({}, _objBase9, { width: 70 });
    F_ITEMS[_prop5] = _extends({}, _objBase9, { type: "input" });
    // F_ITEMS[`${prop}_search`] = { ...objBase, type: "input_find_vague" };
}
//#endregion

//#region 0000
{
    var _prop6 = "aaaa",
        _objBase10 = { label: "0000", prop: _prop6 };
    D_ITEMS[_prop6] = _extends({}, _objBase10);
    COLUMNS[_prop6] = _extends({}, _objBase10, { width: 70 });
    F_ITEMS[_prop6] = _extends({}, _objBase10, { type: "input" });
    // F_ITEMS[`${prop}_search`] = { ...objBase, type: "input_find_vague" };
}
//#endregion


D_ITEMS.vedio = {
    label: "视频上传",
    prop: "vedio"

};
COLUMNS.vedio = _extends({}, D_ITEMS.vedio, { width: 70 });
F_ITEMS.vedio = _extends({}, D_ITEMS.vedio, {
    type: "upload",
    uploadConfig: {
        limit: 2,
        listType: "text"
    }
});

//#region 商品
D_ITEMS.priceMarket = {
    label: "市场价",
    prop: "priceMarket"

};
COLUMNS.priceMarket = _extends({}, D_ITEMS.priceMarket, { width: 90 });
F_ITEMS.priceMarket = _extends({}, D_ITEMS.priceMarket, { type: "number" });

D_ITEMS.priceSell = {
    label: "销售价",
    prop: "priceSell"

};
COLUMNS.priceSell = _extends({}, D_ITEMS.priceSell, { width: 90 });
F_ITEMS.priceSell = _extends({}, D_ITEMS.priceSell, { type: "number" });

D_ITEMS.isPublish = {
    label: "是否发布",
    prop: "isPublish"

};
COLUMNS.isPublish = _extends({}, D_ITEMS.isPublish, { width: 90 });
F_ITEMS.isPublish = _extends({}, D_ITEMS.isPublish, {
    type: "radio",
    options: DYDICT.arr_boolean
});

D_ITEMS.countOrder = {
    label: "订单数",
    prop: "countOrder"

};
COLUMNS.countOrder = _extends({}, D_ITEMS.countOrder, { width: 90 });
F_ITEMS.countOrder = _extends({}, D_ITEMS.countOrder, { type: "number" });

//#endregion


//#region COLUMNS


//#region 通用


COLUMNS.importance_edit = _extends({}, COLUMNS.importance, {
    edit: true
});

//#endregion
//#region html_api


COLUMNS.difficulty_edit = _extends({}, COLUMNS.difficulty, {
    edit: true
});

//#endregion
//#region 分类等
//单个的分类


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

//#endregion


//#region dm组件库用到

D_ITEMS.name = {
    label: "名称",
    prop: "name"
};

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

//#endregion


//#endregion
F_ITEMS.aaaa = 11111;

//#region dm组件库用到

//#region form_demo的字段


//#region 时间段1(日范围)
{
    var _prop7 = "prop_time_period1",
        _objBase11 = { label: "时间段(日范围)", prop: _prop7 };
    D_ITEMS[_prop7] = _extends({}, _objBase11);
    COLUMNS[_prop7] = _extends({}, _objBase11, { width: 70 });
    F_ITEMS[_prop7] = _extends({}, _objBase11, { type: "time_period"
    });
}
//#endregion

//#region 时间段2(月范围)
{
    var _prop8 = "prop_time_period2",
        _objBase12 = { label: "时间段(月范围)", prop: _prop8 };
    D_ITEMS[_prop8] = _extends({}, _objBase12);
    COLUMNS[_prop8] = _extends({}, _objBase12, { width: 70 });
    F_ITEMS[_prop8] = _extends({}, _objBase12, { type: "time_period",
        cfItem: {
            keyStart: "start",
            keyEnd: "end",
            //两层配置结构，为了更好拓展
            "cfDataPicker": {
                "type": "monthrange",
                "align": "right",
                "unlink-panels": true,
                "range-separator": "至",
                "value-format": "yyyy-MM-dd HH:mm:ss",
                "default-time": ['00:00:01', '23:59:59'],
                "picker-options": {}

            }
        }
    });
}
//#endregion

//#region 时间段3(年)
{
    var _prop9 = "prop_time_period3",
        _objBase13 = { label: "时间段(年)", prop: _prop9 };
    D_ITEMS[_prop9] = _extends({}, _objBase13);
    COLUMNS[_prop9] = _extends({}, _objBase13, { width: 70 });
    F_ITEMS[_prop9] = _extends({}, _objBase13, { type: "time_period",
        cfItem: {
            //两层配置结构，为了更好拓展
            "cfDataPicker": {
                "type": "year",
                "align": "right",
                "unlink-panels": true,
                "range-separator": "至",
                "value-format": "yyyy-MM-dd HH:mm:ss",
                "default-time": ['00:00:01', '23:59:59'],
                "picker-options": {}

            }
        }
    });
}
//#endregion


//#region 单文件上传
{
    var _prop10 = "upload_single1",
        _objBase14 = { label: "单文件上传", prop: _prop10 };
    D_ITEMS[_prop10] = _extends({}, _objBase14);
    COLUMNS[_prop10] = _extends({}, _objBase14, { width: 70 });
    F_ITEMS[_prop10] = _extends({}, _objBase14, { type: "upload_single"
    });
}
//#endregion


//#region 头像上传2
{
    var _prop11 = "uploadAvatar",
        _objBase15 = { label: "头像上传", prop: _prop11 };
    D_ITEMS[_prop11] = _extends({}, _objBase15);
    COLUMNS[_prop11] = _extends({}, _objBase15, { width: 70 });
    F_ITEMS[_prop11] = _extends({}, _objBase15, { type: "upload_single",
        cfItem: {
            isAvatar: true, //头像
            //两层配置结构，为了更好拓展
            "cfUpload": {}
        }
    });
}
//#endregion


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
        }, {
            label: "金额",
            prop: "money"
        }]
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
        }, {
            label: "金额",
            prop: "money"
        }]
    }
};

F_ITEMS.specs_options = {
    label: "规格项",
    prop: "options",
    type: "collection",
    collectionlistType: "form",
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
        }, {
            label: "选项图片",
            prop: "imgSrc"
        }]
    }
};

F_ITEMS.objSpecTerm = {
    label: "规格条件",
    prop: "objSpecTerm",
    type: "jsonEditor"

};

F_ITEMS.listSpecPrice = {
    label: "规格/价格表",
    prop: "listSpecPrice",
    // slot: "slot_form_listSpecPrice",
    component: "com_f_item_listSpecPrice"

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
    rules: [{ required: true, message: "不能为空" }, {
        pattern: /^[\u4E00-\u9FA5]+$/,
        message: "用户名只能为中文"
    }]
};
F_ITEMS.prop_input_find_vague = {
    label: "用于模糊查询文本框(input_find_vague)",
    prop: "prop_input_find_vague",
    type: "input_find_vague"
};
F_ITEMS.memberId = {
    label: "报名球员",
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
            ajax: {
                url: "/crossList?page=tangball_team",
                keyLabel: "name",
                keyValue: "P1"
            }
        }, {
            label: "姓名",
            prop: "name"
        }]
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
    options: [{ value: 1, label: "未开始" }, { value: 2, label: "进行中" }, { value: 3, label: "已完成" }]
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
    label: "富文本编辑器(默认配置)",
    prop: "prop_editorTM",
    type: "editorTM"
};
F_ITEMS.prop_editorTMNew = {
    label: "富文本编辑器(精简插件列表)",
    prop: "prop_editor_new",
    type: "editorTM",
    cfTiny: {
        plugins: ['lists', 'image', 'autoresize', 'link', 'autolink']
    }

};
F_ITEMS.extend = (_F_ITEMS$extend = {
    label: "负责人信息"
}, _defineProperty(_F_ITEMS$extend, "label", "拓展"), _defineProperty(_F_ITEMS$extend, "prop", "extend"), _defineProperty(_F_ITEMS$extend, "default", { diycheckbox: [] }), _defineProperty(_F_ITEMS$extend, "cfForm", {
    col_span: 8,
    labelWidth: "150px",
    formItems: [{
        col_span: 24,
        label: "百分比",
        prop: "percent",
        type: "slider"
    }, {
        label: "diycheckbox(slot实现)",
        prop: "diycheckbox",
        slot: "slot_form_item_diycheckbox",
        rules: [{ required: true, message: "不能为空" }]
    }, {
        col_span: 24,
        label: "姓名",
        prop: "name",
        type: "input"
    }, {
        label: "下拉框(select)",
        prop: "sex",
        type: "select",
        default: 2,
        options: [{ value: 1, label: "男" }, { value: 2, label: "女" }]
    }]
}), _F_ITEMS$extend);
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
        preview: true,
        dataType: "string" //字符串，只支持单图
    } };
F_ITEMS.prop_vueJsonEditor = {
    label: "json编辑器(vueJsonEditor)",
    prop: "prop_vueJsonEditor",
    type: "vueJsonEditor"
};
//#endregion


//#region 其他表单字段


F_ITEMS.name = {
    label: "标题111",
    prop: "name"
};
F_ITEMS.name_search = {
    label: "标题123",
    prop: "name",
    type: "input_find_vague"
};

//#endregion


//#endregion

//#endregion


//#endregion


//#region 用户信息
D_ITEMS.trueName = {
    label: "真实姓名",
    prop: "trueName"

};
COLUMNS.trueName = _extends({}, D_ITEMS.trueName, { width: 70 });
F_ITEMS.trueName = _extends({}, D_ITEMS.trueName);
F_ITEMS.trueName_search = _extends({}, D_ITEMS.trueName, { type: "input_find_vague" });

//#endregion


//#region 订单信息

D_ITEMS.deliveryDesc = {
    label: "配送说明",
    prop: "deliveryDesc"

};
COLUMNS.deliveryDesc = _extends({}, D_ITEMS.deliveryDesc, { width: 70 });
F_ITEMS.deliveryDesc = _extends({}, D_ITEMS.deliveryDesc, { type: "textarea" });

D_ITEMS.orderNickName = {
    label: "下单人",
    prop: "orderNickName"

};
COLUMNS.orderNickName = _extends({}, D_ITEMS.orderNickName, {
    width: 70,
    formatter: function formatter(row) {
        return lodash.get(row, "userDoc.nickName");
    }
});

D_ITEMS.priceSellSection = {
    label: "价格区间",
    prop: "priceSellSection"

};
COLUMNS.priceSellSection = _extends({}, D_ITEMS.priceSellSection, { width: 70 });
F_ITEMS.priceSellSection = _extends({}, D_ITEMS.priceSellSection, { type: "text" });
//#endregion


//#region旧版信息系统


//#region 任务类型
D_ITEMS.taskType = {
    label: "任务类型",
    prop: "taskType"
};
COLUMNS.taskType = _extends({}, D_ITEMS.taskType, { width: 70,
    formatter: function formatter(row) {
        return lodash.get(DYDICT.taskType, row.taskType + ".label");
    }
});
F_ITEMS.taskType = _extends({}, D_ITEMS.taskType, { type: "select", options: DYDICT.arr_taskType });

F_ITEMS.taskType_radio = _extends({}, D_ITEMS.taskType, { type: "radio", default: 1, options: DYDICT.arr_taskType });
//#endregion


//#region 优先级
D_ITEMS.prior = {
    label: "优先级",
    prop: "prior"
};
COLUMNS.prior = _extends({}, D_ITEMS.prior, { width: 80,
    formatter: function formatter(row) {
        return lodash.get(DYDICT.prior, row.prior + ".label");
    }
});
F_ITEMS.prior = _extends({}, D_ITEMS.prior, { type: "select", options: DYDICT.arr_prior });
F_ITEMS.prior_radio = _extends({}, D_ITEMS.prior, { type: "radio", options: DYDICT.arr_prior });
//#endregion

//#region 完成度
D_ITEMS.complete = {
    label: "完成度",
    prop: "complete"
};
COLUMNS.complete = _extends({}, D_ITEMS.complete, { width: 80,
    slot: "slot_column_complete"
});
COLUMNS.complete_com = _extends({}, D_ITEMS.complete, { width: 80,
    component: "com_complete"
});
F_ITEMS.complete = _extends({}, D_ITEMS.complete, { type: "slider",
    default: 0,
    options: DYDICT.arr_complete
});

//#endregion

//#region 预估耗时
D_ITEMS.predictTime = {
    label: "预估耗时",
    prop: "predictTime"
};
COLUMNS.predictTime = _extends({}, D_ITEMS.predictTime, { width: 70 });
F_ITEMS.predictTime = _extends({}, D_ITEMS.predictTime, { type: "text",
    frequency: { options: [{ value: 0.3 }, { value: 0.5 }, { value: 1 }, { value: 1.5 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }, { value: 8 }, { value: 10 }, { value: 12 }, { value: 14 }, { value: 16 }] }
});
//#endregion

//#region 实耗时
D_ITEMS.actualTime = {
    label: "实耗时",
    prop: "actualTime"
};
COLUMNS.actualTime = _extends({}, D_ITEMS.actualTime, { width: 70 });
F_ITEMS.actualTime = _extends({}, D_ITEMS.actualTime, { type: "text",
    frequency: { options: [{ value: 0.3 }, { value: 0.5 }, { value: 1 }, { value: 1.5 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }, { value: 8 }, { value: 10 }, { value: 12 }, { value: 14 }, { value: 16 }] }
});
//#endregion

//#region 负责人
D_ITEMS.personCharge = {
    label: "负责人",
    prop: "personCharge"
};
COLUMNS.personCharge = _extends({}, D_ITEMS.personCharge, { width: 70,
    formatter: function formatter() {
        if (!row.adminDoc) return;
        var arr1 = util.clearArr(row.adminDoc);
        var arrName = arr1.map(function (doc) {
            return doc.nickName;
        });
        return arrName.join();
    }
    // formatter(row) {//返回姓名-配合动态数据字典
    //     if (!row.adminDoc) return
    //     let arr1 = util.clearArr(row.adminDoc); //调用：{清除对象中的空属性（null,undefined,空格等）}
    //     let arrName = arr1.map(doc => doc.nickName);
    //     return arrName.join()
    // }
});

F_ITEMS.personCharge = _extends({}, D_ITEMS.personCharge, { type: "select",
    multiple: true, //多选
    ajax: {
        param: { _systemId: _systemId, _dataType: "admin" },
        url: "/info/getCommonList",
        keyLabel: "nickName",
        keyValue: "userName"
    },
    frequency: {
        sytle: { width: '48px' },
        dataType: "array",
        options: [{ value: "13691916429", label: "刘咏辉" }, { value: "13415028975", label: "林丰浩" }]
    }
});
//#endregion


//#region 记分key
D_ITEMS.scoreKey = {
    label: "记分key",
    prop: "scoreKey"
};
COLUMNS.scoreKey = _extends({}, D_ITEMS.scoreKey, { width: 120 });
F_ITEMS.scoreKey = _extends({}, D_ITEMS.scoreKey);
//#endregion


D_ITEMS.refundId = {
    label: "退款Id", prop: "refundId", width: 80
};
COLUMNS.refundId = _extends({}, D_ITEMS.refundId);
F_ITEMS.refundId = _extends({}, D_ITEMS.refundId);

D_ITEMS.refundFee = {
    label: "退款金额", prop: "refundFee", width: 80
};
COLUMNS.refundFee = _extends({}, D_ITEMS.refundFee);
F_ITEMS.refundFee = _extends({}, D_ITEMS.refundFee);

DYDICT.arr_refundStaus = [{ label: "未申请", value: 1 }, { label: "已申请退款", value: 2 }, { label: "退款成功", value: 2 }];
DYDICT.refundStaus = lodash.keyBy(DYDICT.arr_refundStaus, 'value');

D_ITEMS.refundStaus = {
    label: "退款状态", prop: "refundStaus", width: 80,
    formatter: function formatter(rowData) {
        return lodash.get(DYDICT.refundStaus, rowData.refundStaus + ".label");
    }
};
COLUMNS.refundStaus = _extends({}, D_ITEMS.refundStaus);
F_ITEMS.refundStaus = _extends({}, D_ITEMS.refundStaus, { type: "select",
    options: DYDICT.arr_payStatus
});

D_ITEMS.relNoteList = {
    label: "相关笔记列表",
    prop: "relNoteList"
};
COLUMNS.relNoteList = _extends({}, D_ITEMS.relNoteList, { width: 120 });

F_ITEMS.relNoteList = _extends({}, D_ITEMS.relNoteList);

//#region 加盟商Id

var franchiseeId = {
    label: "加盟商",
    prop: "franchiseeId"
};
D_ITEMS.franchiseeId = _extends({}, franchiseeId, {
    slot: 'slot_detail_item_franchiseeId'
});
COLUMNS.franchiseeId = _extends({}, franchiseeId, { width: 100,
    formatter: function formatter(rowData) {
        return lodash.get(rowData, "franchiseeDoc.name");
    }
});
F_ITEMS.franchiseeId = _extends({}, franchiseeId, { type: "select",
    ajax: {
        url: "/crossList?page=tangball_franchisee",
        keyLabel: "name",
        keyValue: "P1"
    }
});
//#endregion

//#region 加盟时间
D_ITEMS.joinTime = {
    label: "加盟时间",
    prop: "time"
};
COLUMNS.joinTime = _extends({}, D_ITEMS.joinTime, { width: 130,
    formatter: function formatter(row) {
        return moment(row.time).format("YYYY-MM-DD");
    }
});
F_ITEMS.joinTime_search = _extends({}, D_ITEMS.joinTime, { type: "time_period" });
F_ITEMS.joinTime = _extends({}, D_ITEMS.joinTime, { type: "date" });
//#endregion

//#region 场馆名称
D_ITEMS.venueName = {
    label: "场馆名称",
    prop: "name"
};
COLUMNS.venueName = _extends({}, D_ITEMS.venueName, { width: 200 });
F_ITEMS.venueName = _extends({}, D_ITEMS.venueName, { type: "input",
    rules: [{ required: true, message: "不能为空" }]
});
//#endregion

//#region 所属地区
D_ITEMS.area = {
    label: "所属地区",
    prop: "area"
};
COLUMNS.area = _extends({}, D_ITEMS.area, { width: 70 });
F_ITEMS.area = _extends({}, D_ITEMS.area, { slot: "slot_area",
    rules: [{ required: true, message: "不能为空" }]
});
//#endregion


//#region 详细地址
{
    var _prop12 = "address";
    var _objBase16 = {
        label: "详细地址",
        prop: _prop12
    };
    D_ITEMS[_prop12] = _extends({}, _objBase16);
    COLUMNS[_prop12] = _extends({}, _objBase16, { width: 120 });
    F_ITEMS[_prop12] = _extends({}, _objBase16, { type: "input" });
    F_ITEMS[_prop12 + "_search"] = _extends({}, _objBase16, { type: "input_find_vague" });
}

//#endregion


//#region 赛事数量
D_ITEMS.countMatch = {
    label: "赛事数量",
    prop: "countMatch"
};
COLUMNS.countMatch = _extends({}, D_ITEMS.countMatch, { width: 100 });
F_ITEMS.countMatch = _extends({}, D_ITEMS.countMatch, { type: "input" });
//#endregion

//#region 联系方式
D_ITEMS.phoneNumber = {
    label: "联系方式",
    prop: "phoneNumber"
};
COLUMNS.phoneNumber = _extends({}, D_ITEMS.phoneNumber, { width: 140 });
F_ITEMS.phoneNumber = _extends({}, D_ITEMS.phoneNumber, { type: "input",
    rules: [{ required: true, message: "不能为空" }]
});
//#endregion


//#region 相册
{
    var album = {
        label: "相册",
        prop: "album"

    };
    D_ITEMS.album = _extends({}, album, {
        slot: "slot_detail_item_album"
    });
    COLUMNS.album = _extends({}, D_ITEMS.album, { width: 70 });

    F_ITEMS.album = _extends({}, album, {
        type: "upload",
        col_span: 24 //控制显示一行多列
        // tips: "可上传多张图"
    });

    D_ITEMS.albumVenue = _extends({}, album, {
        slot: "slot_detail_item_album"
    });
    F_ITEMS.albumVenue = _extends({}, album, {
        type: "upload",
        tips: "图片尺寸比例最好保持在1 : 0.8，建议尺寸：宽500px，高400px",
        uploadConfig: {
            limit: 5
        }

    });
}

//#endregion

//#region 场馆其他信息
D_ITEMS.venueOtherInfo = {
    label: "场馆其他信息",
    prop: "extend"
};
COLUMNS.venueOtherInfo = _extends({}, D_ITEMS.venueOtherInfo, { width: 70 });
F_ITEMS.venueOtherInfo = _extends({}, D_ITEMS.venueOtherInfo, { default: {}, //默认值必须要有，否则新增的时候会出问题
    cfForm: {
        formItems: [{
            label: "场馆长宽",
            prop: "venueSize"
        }, {
            label: "场馆层数",
            prop: "floorCount"
        }, {
            label: "洞数",
            prop: "holeCount"
        }, {
            label: "打位数",
            prop: "placesCount"
        }, {
            label: "联系人",
            prop: "contacts"
        }]
    }
});
//#endregion


//#region 地图位置信息
D_ITEMS.positionInfo = {
    label: "地图位置信息",
    prop: "extend"
};
COLUMNS.positionInfo = _extends({}, D_ITEMS.positionInfo, { width: 70 });
F_ITEMS.positionInfo = _extends({}, D_ITEMS.positionInfo, { default: {}, //默认值必须要有，否则新增的时候会出问题
    cfForm: {
        formItems: [{
            label: "经度",
            prop: "longitude"
        }, {
            label: "纬度",
            prop: "latitude"
        }]
    }
});
//#endregion


//#region 选择项目
{
    var _objBase17 = {
        label: "选择项目",
        prop: "projectName"
    };
    D_ITEMS.projectName = _extends({}, _objBase17);
    COLUMNS.projectName = _extends({}, _objBase17, { width: 70 });
    F_ITEMS.projectName_select_lazy = _extends({}, _objBase17, { type: "select_ajax_lazy",
        cfSelectAjaxLazy: {
            url: "/crossList?page=paicheng_project",
            keyLabel: "projectName",
            keyValue: "P1"
        }
    });
}

//#endregion

//#region 生日
{
    var _objBase18 = {
        label: "生日",
        prop: "birthday"
    };
    D_ITEMS.birthday = _extends({}, _objBase18);
    COLUMNS.birthday = _extends({}, _objBase18, { width: 120 });
    F_ITEMS.birthday = _extends({}, _objBase18, { type: "date" });
}

//#endregion

//#region 头像
{
    var _objBase19 = {
        label: "头像",
        prop: "headSrc"
    };
    D_ITEMS.headSrc = _extends({}, _objBase19);
    COLUMNS.headSrc = _extends({}, _objBase19, { width: 70 });
    F_ITEMS.headSrc = _extends({}, _objBase19, { type: "upload" });
}

//#endregion

//#region QQ号
{
    var _prop13 = "qqNumber";
    var _objBase20 = {
        label: "QQ号",
        prop: _prop13
    };
    D_ITEMS[_prop13] = _extends({}, _objBase20);
    COLUMNS[_prop13] = _extends({}, _objBase20, { width: 70 });
    F_ITEMS[_prop13] = _extends({}, _objBase20, { type: "input" });
    F_ITEMS[_prop13 + "_search"] = _extends({}, _objBase20, { type: "input_find_vague" });
}

//#endregion


//#region 邮箱
{
    var _prop14 = "email";
    var _objBase21 = {
        label: "邮箱",
        prop: _prop14
    };
    D_ITEMS[_prop14] = _extends({}, _objBase21);
    COLUMNS[_prop14] = _extends({}, _objBase21, { width: 100 });
    F_ITEMS[_prop14] = _extends({}, _objBase21, { type: "input" });
    F_ITEMS[_prop14 + "_search"] = _extends({}, _objBase21, { type: "input_find_vague" });
}

//#endregion


//#region 微信号
{
    var _prop15 = "wxNumber",
        _objBase22 = { label: "微信号", prop: _prop15 };
    D_ITEMS[_prop15] = _extends({}, _objBase22);
    COLUMNS[_prop15] = _extends({}, _objBase22, { width: 70 });
    F_ITEMS[_prop15] = _extends({}, _objBase22, { type: "input" });
}
//#endregion


//#region 文件
{
    var _objBase23 = {
        label: "文件",
        prop: "file"
    };
    D_ITEMS.file = _extends({}, _objBase23);
    COLUMNS.file = _extends({}, _objBase23, { width: 190,
        formatter: function formatter(row) {
            return lodash.get(row, "file[0].url", "");
        }

    });

    F_ITEMS.file = _extends({}, _objBase23, { type: "upload",
        uploadConfig: {
            limit: 1,
            listType: "text"
        }

    });
}

//#endregion


//#region 图片预览
{
    var _objBase24 = {
        label: "图片预览",
        prop: "imagePreview"
    };
    D_ITEMS.imagePreview = _extends({}, _objBase24, {
        component: "com_imagePreview"
    });
    COLUMNS.imagePreview = _extends({}, _objBase24, { width: 100, component: "com_imagePreview" });
}

//#endregion


//#region 公司名
{
    var _prop16 = "companyName";
    var _objBase25 = {
        label: "公司名",
        prop: _prop16
    };
    D_ITEMS[_prop16] = _extends({}, _objBase25);
    COLUMNS[_prop16] = _extends({}, _objBase25, { width: 190 });
    F_ITEMS[_prop16] = _extends({}, _objBase25, { type: "input" });
    F_ITEMS[_prop16 + "_search"] = _extends({}, _objBase25, { type: "input_find_vague" });
}

//#endregion

//#region 头像上传2
{
    var _prop17 = "avatarImg",
        _objBase26 = { label: "头像上传", prop: _prop17 };
    D_ITEMS[_prop17] = _extends({}, _objBase26);
    COLUMNS[_prop17] = _extends({}, _objBase26, { width: 70 });
    F_ITEMS[_prop17] = _extends({}, _objBase26, { type: "upload_single", //两层配置结构，为了更好拓展
        cfItem: {
            isAvatar: true,
            "cfUpload": {}
        }
    });
}
//#endregion


//#region 职位名称
{
    var _prop18 = "positionName",
        _objBase27 = { label: "职位名称", prop: _prop18 };
    D_ITEMS[_prop18] = _extends({}, _objBase27);
    COLUMNS[_prop18] = _extends({}, _objBase27, { width: 100 });
    F_ITEMS[_prop18] = _extends({}, _objBase27, { type: "input" });
    // F_ITEMS[`${prop}_search`] = { ...objBase, type: "input_find_vague" };
}
//#endregion

//#region 在职时间段
{
    var _prop19 = "onJobPeriod",
        _objBase28 = { label: "在职时间段", prop: _prop19 };
    D_ITEMS[_prop19] = _extends({}, _objBase28);
    COLUMNS[_prop19] = _extends({}, _objBase28, { width: 120 });
    F_ITEMS[_prop19] = _extends({}, _objBase28, { type: "input" });
    // F_ITEMS[`${prop}_search`] = { ...objBase, type: "input_find_vague" };
}
//#endregion

//#region 工作内容描述
{
    var _prop20 = "descJob",
        _objBase29 = { label: "工作内容描述", prop: "descJob" };
    D_ITEMS[_prop20] = _extends({}, _objBase29);
    COLUMNS[_prop20] = _extends({}, _objBase29, { width: 170 });
    F_ITEMS[_prop20] = _extends({}, _objBase29, { type: "textarea" });
    // F_ITEMS[`${prop}_search`] = { ...objBase, type: "input_find_vague" };
}
//#endregion


//#region 学校名称
{
    var _prop21 = "schoolName",
        _objBase30 = { label: "学校名称", prop: _prop21 };
    D_ITEMS[_prop21] = _extends({}, _objBase30);
    COLUMNS[_prop21] = _extends({}, _objBase30, { width: 170 });
    F_ITEMS[_prop21] = _extends({}, _objBase30, { type: "input" });
    // F_ITEMS[`${prop}_search`] = { ...objBase, type: "input_find_vague" };
}
//#endregion


//#region 在校时间段
{
    var _prop22 = "inSchoolPeriod",
        _objBase31 = { label: "在校时间段", prop: _prop22 };
    D_ITEMS[_prop22] = _extends({}, _objBase31);
    COLUMNS[_prop22] = _extends({}, _objBase31, { width: 120 });
    F_ITEMS[_prop22] = _extends({}, _objBase31, { type: "time_period",
        cfItem: {
            keyStart: "start",
            keyEnd: "end",
            "cfDataPicker": {
                "type": "monthrange",
                "picker-options": {}
            }
        }
    });
    // F_ITEMS[`${prop}_search`] = { ...objBase, type: "input_find_vague" };
}
//#endregion


//#region 学历，
{
    var _prop23 = "diploma",
        _objBase32 = { label: "学历", prop: _prop23 };
    D_ITEMS[_prop23] = _extends({}, _objBase32);
    COLUMNS[_prop23] = _extends({}, _objBase32, { width: 70 });
    F_ITEMS[_prop23] = _extends({}, _objBase32, { type: "input" });
    // F_ITEMS[`${prop}_search`] = { ...objBase, type: "input_find_vague" };
}
//#endregion


//#region 专业名称
{
    var _prop24 = "professionalName",
        _objBase33 = { label: "专业名称", prop: _prop24 };
    D_ITEMS[_prop24] = _extends({}, _objBase33);
    COLUMNS[_prop24] = _extends({}, _objBase33, { width: 130 });
    F_ITEMS[_prop24] = _extends({}, _objBase33, { type: "input" });
    // F_ITEMS[`${prop}_search`] = { ...objBase, type: "input_find_vague" };
}
//#endregion

//#region 完成度-查询
{
    var _prop25 = "complete_search",
        _objBase34 = { label: "完成度", prop: _prop25 };
    D_ITEMS[_prop25] = _extends({}, _objBase34);
    COLUMNS[_prop25] = _extends({}, _objBase34, { width: 130 });
    F_ITEMS[_prop25] = _extends({}, _objBase34, { component: "com_item_complete_search" });
    // F_ITEMS[`${prop}_search`] = { ...objBase, type: "input_find_vague" };
}
//#endregion


//#region 系统编号
{
    var _prop26 = "systemId",
        _objBase35 = { label: "系统编号", prop: _prop26 };
    D_ITEMS[_prop26] = _extends({}, _objBase35);
    COLUMNS[_prop26] = _extends({}, _objBase35, { width: 100 });
    F_ITEMS[_prop26] = _extends({}, _objBase35, { type: "input" });
    // F_ITEMS[`${prop}_search`] = { ...objBase, type: "input_find_vague" };
}
//#endregion


//#region 站点logo
{
    var _prop27 = "logoSrc",
        _objBase36 = { label: "站点logo", prop: _prop27 };
    D_ITEMS[_prop27] = _extends({}, _objBase36);
    COLUMNS[_prop27] = _extends({}, _objBase36, { width: 70 });
    F_ITEMS[_prop27] = _extends({}, _objBase36, { type: "upload_single",
        cfItem: {
            isAvatar: true,
            "cfUpload": {}
        }
    });
}
//#endregion


//#region 收货人
{
    var _objBase37 = {
        label: "收货人",
        prop: "receiverName"
    };
    D_ITEMS.receiverName = _extends({}, _objBase37);
    COLUMNS.receiverName = _extends({}, _objBase37, { width: 70 });
    F_ITEMS.receiverName = _extends({}, _objBase37, { type: "input" });
}

//#endregion


//#region  菜单图标样式名
{
    var _prop28 = "icon",
        _objBase38 = { label: "图标样式名", prop: _prop28 };

    D_ITEMS["menuIcon"] = _extends({}, _objBase38);
    COLUMNS["menuIcon"] = _extends({}, _objBase38, { width: 70 });
    F_ITEMS["menuIcon"] = _extends({}, _objBase38, { type: "input" });
}
//#endregion

//#region 菜单索引值
{
    var _prop29 = "index",
        _objBase39 = { label: "菜单索引值", prop: _prop29 };
    D_ITEMS["menuIndex"] = _extends({}, _objBase39);
    COLUMNS["menuIndex"] = _extends({}, _objBase39, { width: 70 });
    F_ITEMS["menuIndex"] = _extends({}, _objBase39, { type: "input",
        tips: "该值不允许重复"
    });
}
//#endregion

//#region 菜单路由地址
{
    var _prop30 = "route",
        _objBase40 = { label: "路由地址", prop: _prop30 };
    D_ITEMS["menuRoute"] = _extends({}, _objBase40);
    COLUMNS["menuRoute"] = _extends({}, _objBase40, { width: 70 });
    F_ITEMS["menuRoute"] = _extends({}, _objBase40, { type: "input" });
}
//#endregion


//#region 树状数据
{
    var _prop31 = "treeData1",
        _objBase41 = { label: "树状数据", prop: _prop31 };
    D_ITEMS[_prop31] = _extends({}, _objBase41);
    COLUMNS[_prop31] = _extends({}, _objBase41, { width: 70 });
    F_ITEMS[_prop31] = _extends({}, _objBase41, {
        type: "tree_data"
    });
    // F_ITEMS[`${prop}_search`] = { ...objBase, type: "input_find_vague" };
}
//#endregion


//#region 树状数据
{
    var _prop32 = "treeDataMenu",
        _objBase42 = { label: "菜单数据", prop: _prop32 };
    D_ITEMS[_prop32] = _extends({}, _objBase42);
    COLUMNS[_prop32] = _extends({}, _objBase42, { width: 70 });
    F_ITEMS[_prop32] = _extends({}, _objBase42, { type: "tree_data",
        cfItem: {
            idKey: "index",
            cfTree: {
                props: {
                    children: 'menuItem',
                    label: 'title'
                }
            },
            cfForm: {
                formItems: [F_ITEMS["title"], F_ITEMS["menuIndex"], F_ITEMS["menuRoute"], F_ITEMS["menuIcon"]]

            }
        }
    });
    // F_ITEMS[`${prop}_search`] = { ...objBase, type: "input_find_vague" };
}
//#endregion


//#region 支付状态
{
    var _prop33 = "payStatus",
        _objBase43 = { label: "支付状态", prop: _prop33 };
    D_ITEMS[_prop33] = _extends({}, _objBase43, {
        formatter: function formatter(rowData) {
            return lodash.get(DYDICT.payStatus, rowData.payStatus + ".label");
        }
    });
    COLUMNS[_prop33] = _extends({}, _objBase43, { width: 70,
        formatter: function formatter(rowData) {
            return lodash.get(DYDICT.payStatus, rowData.payStatus + ".label");
        }
    });

    COLUMNS.payStatus_slot = _extends({}, _objBase43, { slot: "slot_column_payStatus", width: 130 });
    COLUMNS.payStatus_com = _extends({}, _objBase43, { component: "com_c_item_payStatus", width: 90 });
    F_ITEMS[_prop33] = _extends({}, _objBase43, { type: "select", options: DYDICT.arr_payStatus });
    // F_ITEMS[`${prop}_search`] = { ...objBase, type: "input_find_vague" };
}
//#endregion


//#region 创建时间
{
    var _prop34 = "CreateTime",
        _objBase44 = { label: "创建时间", prop: _prop34 };
    D_ITEMS[_prop34] = _extends({}, _objBase44);
    COLUMNS[_prop34] = _extends({}, _objBase44, { width: 90,
        formatter: function formatter(row) {
            if (!row.CreateTime) return "";
            return moment(row.CreateTime).format("YYYY-MM-DD");
        }
    });
    F_ITEMS[_prop34] = _extends({}, _objBase44, { type: "input" });
    // F_ITEMS[`${prop}_search`] = { ...objBase, type: "input_find_vague" };
}
//#endregion


//#region 首页专题Id
{
    var _prop35 = "homeGroupId",
        _objBase45 = { label: "首页专题Id", prop: _prop35 };
    D_ITEMS[_prop35] = _extends({}, _objBase45);
    COLUMNS[_prop35] = _extends({}, _objBase45, { width: 90

    });
    F_ITEMS[_prop35] = _extends({}, _objBase45, { type: "input" });
    // F_ITEMS[`${prop}_search`] = { ...objBase, type: "input_find_vague" };
}
//#endregion


//#region 文件存储大小
{
    var _prop36 = "fileSize",
        _objBase46 = { label: "存储大小", prop: _prop36 };
    D_ITEMS[_prop36] = _extends({}, _objBase46);
    COLUMNS[_prop36] = _extends({}, _objBase46, { width: 70 });
    F_ITEMS[_prop36] = _extends({}, _objBase46, { type: "number" });
}
//#endregion

//#region 文件后缀
{
    var _prop37 = "fileExt",
        _objBase47 = { label: "文件后缀", prop: _prop37 };
    D_ITEMS[_prop37] = _extends({}, _objBase47);
    COLUMNS[_prop37] = _extends({}, _objBase47, { width: 70 });
    F_ITEMS[_prop37] = _extends({}, _objBase47, { type: "input" });
}
//#endregion


//#region 图片宽度
{
    var _prop38 = "imgWidth",
        _objBase48 = { label: "图片宽度", prop: _prop38 };
    D_ITEMS[_prop38] = _extends({}, _objBase48);
    COLUMNS[_prop38] = _extends({}, _objBase48, { width: 70 });
    F_ITEMS[_prop38] = _extends({}, _objBase48, { type: "number" });
}
//#endregion

//#region 图片高度
{
    var _prop39 = "imgHeight",
        _objBase49 = { label: "图片高度", prop: _prop39 };
    D_ITEMS[_prop39] = _extends({}, _objBase49);
    COLUMNS[_prop39] = _extends({}, _objBase49, { width: 70 });
    F_ITEMS[_prop39] = _extends({}, _objBase49, { type: "number" });
}
//#endregion


//#region 桶名
{
    var _prop40 = "fileBucket",
        _objBase50 = { label: "桶名", prop: _prop40 };
    D_ITEMS[_prop40] = _extends({}, _objBase50);
    COLUMNS[_prop40] = _extends({}, _objBase50, { width: 70 });
    F_ITEMS[_prop40] = _extends({}, _objBase50, { type: "input" });
}
//#endregion
//#region 文件key
{
    var _prop41 = "fileKey",
        _objBase51 = { label: "文件key", prop: _prop41 };
    D_ITEMS[_prop41] = _extends({}, _objBase51);
    COLUMNS[_prop41] = _extends({}, _objBase51, { width: 70 });
    F_ITEMS[_prop41] = _extends({}, _objBase51, { type: "input" });
}
//#endregion


//#region 文件来源类型
{
    var _prop42 = "fileSource",
        _objBase52 = { label: "来源类型", prop: _prop42 };
    D_ITEMS[_prop42] = _extends({}, _objBase52);
    COLUMNS[_prop42] = _extends({}, _objBase52, { width: 70 });
    F_ITEMS[_prop42] = _extends({}, _objBase52, { type: "input" });
}
//#endregion

//#region 文件上传时间
{
    var _prop43 = "uploadTime",
        _objBase53 = { label: "上传时间", prop: _prop43 };
    D_ITEMS[_prop43] = _extends({}, _objBase53);
    COLUMNS[_prop43] = _extends({}, _objBase53, { width: 70 });
    F_ITEMS[_prop43] = _extends({}, _objBase53, { type: "input" });
}
//#endregion

//#region 系统Id
{
    var _prop44 = "_systemId",
        _objBase54 = { label: "系统Id", prop: _prop44 };
    D_ITEMS[_prop44] = _extends({}, _objBase54);
    COLUMNS[_prop44] = _extends({}, _objBase54, { width: 100, edit: true });
    F_ITEMS[_prop44] = _extends({}, _objBase54, { type: "select", multiple: true, //多选

        ajax: {
            param: { _systemId: _systemId, _dataType: "system" },
            url: "/info/getCommonList",
            keyLabel: "title",
            keyValue: "systemId"
        }
    });
    // F_ITEMS[`${prop}_search`] = { ...objBase, type: "input_find_vague" };
}
//#endregion

//#region icon地址
{
    var _objBase55 = {
        label: "icon地址",
        prop: "iconSrc"
    };
    D_ITEMS.iconSrc = _extends({}, _objBase55);
    COLUMNS.iconSrc = _extends({}, _objBase55, { width: 70 });
    F_ITEMS.iconSrc = _extends({}, _objBase55, { type: "upload_single",
        cfItem: {
            isAvatar: true,
            "cfUpload": {}
        }

    });
}

//#endregion


//#region 收货状态
{
    var _prop45 = "deliveryStatus",
        _objBase56 = { label: "收货状态", prop: _prop45 };
    D_ITEMS[_prop45] = _extends({}, _objBase56);
    COLUMNS[_prop45] = _extends({}, _objBase56, { width: 70,
        formatter: function formatter(rowData) {
            return lodash.get(DYDICT.deliveryStatus, rowData.deliveryStatus + ".label");
        }
    });

    F_ITEMS[_prop45] = _extends({}, _objBase56, { type: "select", options: DYDICT.arr_deliveryStatus });
}
//#endregion


//#region 订单来源
{
    var _prop46 = "orderSource",
        _objBase57 = { label: "订单来源", prop: _prop46 };
    D_ITEMS[_prop46] = _extends({}, _objBase57);
    COLUMNS[_prop46] = _extends({}, _objBase57, { width: 70,
        formatter: function formatter(rowData) {
            return lodash.get(DYDICT.orderSource, rowData.orderSource + ".label");
        }
    });

    F_ITEMS[_prop46] = _extends({}, _objBase57, { type: "select", options: DYDICT.arr_orderSource });
}
//#endregion


//#region 0000
{
    var _prop47 = "aaaa",
        _objBase58 = { label: "0000", prop: _prop47 };
    D_ITEMS[_prop47] = _extends({}, _objBase58);
    COLUMNS[_prop47] = _extends({}, _objBase58, { width: 70 });
    F_ITEMS[_prop47] = _extends({}, _objBase58, { type: "input" });
    // F_ITEMS[`${prop}_search`] = { ...objBase, type: "input_find_vague" };
}
//#endregion


//#region 0000
{
    var _prop48 = "aaaa",
        _objBase59 = { label: "0000", prop: _prop48 };
    D_ITEMS[_prop48] = _extends({}, _objBase59);
    COLUMNS[_prop48] = _extends({}, _objBase59, { width: 70 });
    F_ITEMS[_prop48] = _extends({}, _objBase59, { type: "input" });
    // F_ITEMS[`${prop}_search`] = { ...objBase, type: "input_find_vague" };
}
//#endregion

//#region 0000
{
    var _prop49 = "aaaa",
        _objBase60 = { label: "0000", prop: _prop49 };
    D_ITEMS[_prop49] = _extends({}, _objBase60);
    COLUMNS[_prop49] = _extends({}, _objBase60, { width: 70 });
    F_ITEMS[_prop49] = _extends({}, _objBase60, { type: "input" });
    // F_ITEMS[`${prop}_search`] = { ...objBase, type: "input_find_vague" };
}
//#endregion

//#region 0000
{
    var _prop50 = "aaaa",
        _objBase61 = { label: "0000", prop: _prop50 };
    D_ITEMS[_prop50] = _extends({}, _objBase61);
    COLUMNS[_prop50] = _extends({}, _objBase61, { width: 70 });
    F_ITEMS[_prop50] = _extends({}, _objBase61, { type: "input" });
    // F_ITEMS[`${prop}_search`] = { ...objBase, type: "input_find_vague" };
}
//#endregion

//#region 0000
{
    var _prop51 = "aaaa",
        _objBase62 = { label: "0000", prop: _prop51 };
    D_ITEMS[_prop51] = _extends({}, _objBase62);
    COLUMNS[_prop51] = _extends({}, _objBase62, { width: 70 });
    F_ITEMS[_prop51] = _extends({}, _objBase62, { type: "input" });
    // F_ITEMS[`${prop}_search`] = { ...objBase, type: "input_find_vague" };
}
//#endregion

//#region 0000
{
    var _prop52 = "aaaa",
        _objBase63 = { label: "0000", prop: _prop52 };
    D_ITEMS[_prop52] = _extends({}, _objBase63);
    COLUMNS[_prop52] = _extends({}, _objBase63, { width: 70 });
    F_ITEMS[_prop52] = _extends({}, _objBase63, { type: "input" });
    // F_ITEMS[`${prop}_search`] = { ...objBase, type: "input_find_vague" };
}
//#endregion

//#region 0000
{
    var _prop53 = "aaaa",
        _objBase64 = { label: "0000", prop: _prop53 };
    D_ITEMS[_prop53] = _extends({}, _objBase64);
    COLUMNS[_prop53] = _extends({}, _objBase64, { width: 70 });
    F_ITEMS[_prop53] = _extends({}, _objBase64, { type: "input" });
    // F_ITEMS[`${prop}_search`] = { ...objBase, type: "input_find_vague" };
}
//#endregion

//#region 0000
{
    var _prop54 = "aaaa",
        _objBase65 = { label: "0000", prop: _prop54 };
    D_ITEMS[_prop54] = _extends({}, _objBase65);
    COLUMNS[_prop54] = _extends({}, _objBase65, { width: 70 });
    F_ITEMS[_prop54] = _extends({}, _objBase65, { type: "input" });
    // F_ITEMS[`${prop}_search`] = { ...objBase, type: "input_find_vague" };
}
//#endregion

//#region 0000
{
    var _prop55 = "aaaa",
        _objBase66 = { label: "0000", prop: _prop55 };
    D_ITEMS[_prop55] = _extends({}, _objBase66);
    COLUMNS[_prop55] = _extends({}, _objBase66, { width: 70 });
    F_ITEMS[_prop55] = _extends({}, _objBase66, { type: "input" });
    // F_ITEMS[`${prop}_search`] = { ...objBase, type: "input_find_vague" };
}
//#endregion

//#endregion