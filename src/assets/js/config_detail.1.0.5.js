
WIN=WIN


let _systemId = PUB._systemId
//#region DYDICT:公共数据字典对象管理
window.DYDICT = {}//公共数据字典对象
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
    { label: "否", value: 0 },
    { label: "是", value: 1 },
]
DYDICT.selfClose = lodash.keyBy(DYDICT.arr_selfClose, 'value')


DYDICT.arr_boolean = [
    { label: "否", value: 0 },
    { label: "是", value: 1 },
]
DYDICT.boolean = lodash.keyBy(DYDICT.arr_boolean, 'value')


DYDICT.arr_dataType = [
    { label: "课堂笔记", value: "note" },
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



DYDICT.arr_aaaa = [
]
DYDICT.arr_aaaa = [
]
DYDICT.arr_aaaa = [
]
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
DYDICT.aaa = 1111;
DYDICT.aaa = 1111;
//#endregion
window.D_ITEMS = {}//公共数据字典对象


//#region 龙庭订单

D_ITEMS.transaction_id = {
    label: "微信交易号",
    prop: "transaction_id",
};


D_ITEMS.timeOrder = {
    label: "下单时间",
    prop: "timeOrder",
};


D_ITEMS.priceOrder = {
    label: "订单金额",
    prop: "priceOrder",
};

D_ITEMS.goodsList = {
    label: "商品清单",
    prop: "goodsList",
};

D_ITEMS.addressObj = {
    label: "地址",
    prop: "addressObj",
};


//#endregion



//#region 唐球过来
D_ITEMS.Id = {
    label: "Id",
    prop: "P1"
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
D_ITEMS.openid = {
    label: "微信openid",
    prop: "openid",
};
D_ITEMS.phone = {
    label: "手机号",
    prop: "phone",
};
D_ITEMS.idCard = {
    label: "身份证号",
    prop: "idCard",
};
D_ITEMS.career = {
    label: "职业",
    prop: "career",
};
D_ITEMS.remark = {
    label: "备注",
    prop: "remark",
};
D_ITEMS.age = {
    label: "年龄",
    prop: "age",
};

D_ITEMS.orderId = {
    label: "订单号",
    prop: "orderId",
};

D_ITEMS.payStatus = {
    label: "支付状态",
    prop: "payStatus",
    formatter: function (rowData) {
        return lodash.get(DYDICT.payStatus, `${rowData.payStatus}.label`);
    },
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
//#endregion
//#region 通用数据
D_ITEMS.title = {
    label: "标题",
    prop: "title"
};
D_ITEMS.desc = {
    label: "说明",
    prop: "desc"
};
D_ITEMS.detail = {
    label: "详情",
    prop: "_detail",
    type: "html",
};

D_ITEMS._data = {
    label: "_data对象",
    prop: "_data",

};

D_ITEMS.arrGroup = {
    label: "所属分组",
    prop: "arrGroup",

};
D_ITEMS.countGroup = {
    label: "分组数",
    prop: "countGroup",

};

//#endregion
//#region 管理员
D_ITEMS.userName = {
    label: "用户名",
    prop: "userName"
};
D_ITEMS.passWord = {
    label: "密码",
    prop: "passWord"
};
D_ITEMS.nickName = {
    label: "昵称",
    prop: "nickName"
};
D_ITEMS.role = {
    label: "所属角色",
    prop: "role"
};
//#endregion
//#region 角色
D_ITEMS.roleName = {
    label: "角色名",
    prop: "name",
};
D_ITEMS.rolePower = {
    label: "权限",
    prop: "power",
};
//#endregion
//#region 分类
D_ITEMS.category_name = {
    label: "分类名",
    prop: "name",
};
D_ITEMS.category_remark = {
    label: "分类说明",
    prop: "remark",
};
D_ITEMS.category = {
    label: "所属分类",
    prop: "category",
};
//#endregion
//#region 熟悉度相关函数
D_ITEMS.familiarity = {
    label: "熟悉度",
    prop: "familiarity",
};
D_ITEMS.dataType = {
    label: "数据类型",
    prop: "dataType",
};
D_ITEMS.dataId = {
    label: "数据Id",
    prop: "dataId",
};
D_ITEMS.userId = {
    label: "用户Id",
    prop: "userId",
};
D_ITEMS._userId = {
    label: "_userId",
    prop: "_userId",
};
D_ITEMS._id = {
    label: "uuid",
    prop: "_id",
};
D_ITEMS.studyTime = {
    label: "学习时间",
    prop: "studyTime",
};
//#endregion
//#region html-API
D_ITEMS.html_display = {
    label: "块级",
    prop: "display",
};
D_ITEMS.importance = {
    label: "重要性",
    prop: "importance",
};
D_ITEMS.difficulty = {
    label: "难度",
    prop: "difficulty",
};
D_ITEMS.english = {
    label: "原英文",
    prop: "english",
};
D_ITEMS.html_version = {
    label: "版本",
    prop: "version",
};
D_ITEMS.selfClose = {
    label: "自闭合",
    prop: "selfClose",
};
D_ITEMS.cateIdOld = {
    label: "旧分类Id",
    prop: "cateIdOld",
};
D_ITEMS.demoList = {
    label: "demo列表",
    prop: "demoList",
};
//#endregion


D_ITEMS.css_version = {
    label: "版本",
    prop: "version",
};



//#region 分组
D_ITEMS.group_dataType = {
    label: "数据类型",
    prop: "dataType",
};

D_ITEMS.countData = {
    label: "数据量",
    prop: "countData",
};
D_ITEMS.score = {
    label: "分数对象",
    prop: "score",
};
D_ITEMS.myScore = {
    label: "我的分数",
    prop: "myScore",
};

D_ITEMS.alias = {
    label: "别名",
    prop: "alias",
};
//#endregion
//#region 关系
D_ITEMS._idRel = {
    label: "关联数据1",
    prop: "_idRel",
};
D_ITEMS._idRel2 = {
    label: "关联数据2",
    prop: "_idRel2",
};
D_ITEMS.sort = {
    label: "序号",
    prop: "sort",
};
//#endregion
//#region 其他
D_ITEMS.dataTypekey = {
    label: "类型代号",
    prop: "key",
};




//#endregion
//#region 笔记
D_ITEMS.keyword = {
    label: "关键词",
    prop: "keyword",
};
D_ITEMS.note_linkList = {
    label: "相关demo列表",
    prop: "demoLinkList",
};
D_ITEMS.note_noteList = {
    label: "相关笔记列表",
    prop: "noteList",
};
//#endregion
//#region 网址
D_ITEMS.link = {
    label: "网址",
    prop: "link",
};


//#endregion

D_ITEMS.item_prop = {
    label: "prop",
    prop: "prop",
};
D_ITEMS.item_label = {
    label: "label",
    prop: "label",
    width: 160,
};
D_ITEMS.item_type = {
    label: "type",
    prop: "type",
    width: 160,
};

D_ITEMS.vedio = {
    label: "视频上传",
    prop: "vedio",

};

//#region 商品
D_ITEMS.priceMarket = {
    label: "市场价",
    prop: "priceMarket",

};

D_ITEMS.priceSell = {
    label: "销售价",
    prop: "priceSell",

};
D_ITEMS.isPublish = {
    label: "是否发布",
    prop: "isPublish",

};

D_ITEMS.countOrder = {
    label: "订单数",
    prop: "countOrder",

};


//#endregion




D_ITEMS.aaaa = 1111;
D_ITEMS.aaaa = 1111;
D_ITEMS.aaaa = 1111;
D_ITEMS.aaaa = 1111;
