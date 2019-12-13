"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var WIN = void 0;
if (typeof window === "undefined") {
    //如果{000}000
    WIN = global;
} else {
    WIN = window;
}
WIN.PUB = {};
WIN.PUB.domain = "http://120.76.160.41:3000";
// WIN.PUB.domain = "http://localhost:3000"
//WIN.PUB.domain = 'http://test.dmagic.cn'
// WIN.PUB.urlUpload = `${PUB.domain}/api_third_part/qiniu_upload?scope=test`
WIN.PUB.urlUpload = "https://up-z2.qiniup.com"; //七牛云上传地址（域名）
WIN.PUB.urlGetQiniuToken = PUB.domain + "/api_third_part/get_qiniu_token?scope=test";
WIN.util = {};
//#region deepCopy:深拷贝函数
util.deepCopy = function (obj) {
    //深拷贝一个Json对象的函数
    return lodash.cloneDeep(obj);
};
//#endregion
//#region type:返回对象数据类型函数
var class2type = {},

//用于记录[object class]样式  
arrObjs = "Boolean Number String Function Array Date RegExp Null Undefined".split(" ");
for (var i = 0, l = arrObjs.length; i < l; i++) {
    class2type["[object " + arrObjs[i] + "]"] = arrObjs[i].toLowerCase();
}
util.type = function (obj) {
    return class2type[Object.prototype.toString.call(obj)] || "object";
};
//#endregion
//#region timeout:基于promise的延迟函数
util.timeout = function (ms) {
    //使用promise封装一个延迟方法
    return new Promise(function (resolve) {
        //resolve延迟解决后的回调函数, reject延迟异常的处理函数
        setTimeout(resolve, ms, 'done');
    });
};
//#endregion
//#region getTimeStatus:获取时间段状态函数
/**
 * 
 * @param {开始时间} _json.startTime
 * @param {结束时间} _json.endTime
 *  @param {当前时间} _json.currTime
 */
util.getTimeStatus = function (param) {
    //
    var start = param.start,
        end = param.end,
        now = param.now;

    var flag = 2;
    var msg = "进行中";
    if (!(start && end)) {
        start = start || "——";
        end = end || "——";
        flag = 4;
        msg = "时间段设置有误，时间段不完整";
        return { flag: flag, msg: msg, start: start, end: end };
    }
    var fomatStr = "YYYY-MM-DD HH:mm";
    now = now || moment();
    now = moment(now).format(fomatStr);
    start = moment(start).format(fomatStr);
    end = moment(end).format(fomatStr);
    //先格式化才能正确比较大小
    if (start > end) {
        start = start || "——";
        end = end || "——";
        flag = 4;
        msg = "时间段设置有误，开始时间大于结束时间";
        return { flag: flag, msg: msg, start: start, end: end };
    }
    if (now < start) {
        //如果当前时间小于开始时间
        msg = "未开始";
        flag = 1;
    } else if (now > end) {
        //如果当前时间大于结束时间
        flag = 3;
        msg = "已结束";
    }
    return { flag: flag, msg: msg, start: start, end: end, now: now };
};
//#endregion
//#region ajaxPopulate:ajax填充数据列表的某个字段函数/可用于动态数据字典
util.ajaxPopulate = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(populateConfig) {
        var ajax, listData, page, populateColumn, idColumn, idColumn2, _populateConfig$findJ, findJson, arrId, urlAjax, paramAjax, url, _ajax$param, param, _ref2, data, dict;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        //补充ajax配置20191128
                        ajax = populateConfig.ajax, listData = populateConfig.listData, page = populateConfig.page, populateColumn = populateConfig.populateColumn, idColumn = populateConfig.idColumn, idColumn2 = populateConfig.idColumn2, _populateConfig$findJ = populateConfig.findJson, findJson = _populateConfig$findJ === undefined ? {} : _populateConfig$findJ;
                        arrId = [];

                        listData.forEach(function (itemEach) {
                            //循环：{原数据数组}
                            var idEach = itemEach[idColumn];
                            if (idEach) {
                                //如果{idEach}存在
                                if (util.type(idEach) == "array") {
                                    //Q1:idEach是数组
                                    arrId = arrId.concat(idEach); //拼接
                                } else {
                                    //Q2:idEach不是数组
                                    arrId.push(idEach);
                                }
                            }
                        });
                        arrId = Array.from(new Set(arrId)); //去重
                        urlAjax = "/crossList?page=" + page;
                        paramAjax = {
                            pageSize: 999
                        };

                        if (ajax) {
                            //如果{ajax配置}存在*****
                            url = ajax.url, _ajax$param = ajax.param, param = _ajax$param === undefined ? {} : _ajax$param;

                            urlAjax = url;
                            Object.assign(paramAjax, param); //合并对象
                        }
                        //补充id数组过滤条件****
                        lodash.set(paramAjax, "findJson." + idColumn2, _extends({
                            "$in": arrId }, findJson));
                        _context.next = 10;
                        return axios({
                            //请求接口
                            method: "post",
                            url: WIN.PUB.domain + urlAjax,
                            data: paramAjax //传递参数
                        });

                    case 10:
                        _ref2 = _context.sent;
                        data = _ref2.data;
                        dict = lodash.keyBy(data.list, idColumn2);

                        listData.forEach(function (itemEach) {
                            //循环：{原数据数组}
                            var idEach = itemEach[idColumn];
                            if (idEach) {
                                //如果{idEach}存在
                                if (util.type(idEach) == "array") {
                                    //Q1:idEach是数组
                                    itemEach[populateColumn] = [];
                                    idEach.forEach(function (idOneEach) {
                                        //循环：{id数组}
                                        itemEach[populateColumn].push(dict[idOneEach]);
                                    });
                                } else {
                                    //Q2:idEach不是数组
                                    itemEach[populateColumn] = dict[idEach];
                                }
                            }
                        });
                        return _context.abrupt("return", util.deepCopy(listData));

                    case 15:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function (_x) {
        return _ref.apply(this, arguments);
    };
}();
//#endregion
//#region stringify:json转字符串函数（含function处理）
util.stringify = function (_json) {
    //函数定义：{json转字符串函数（含function处理）}
    var strJson = JSON.stringify(_json, function (key, val) {
        if (typeof val === "function") {
            return val + ""; //将函数代码转换成字符串
        }
        return val;
    });
    return strJson;
};
//#endregion
//#region parseJson:字符串转json函数（含function还原处理）
util.parseJson = function (str) {
    //函数定义：{字符串转json函数（含function还原处理）}
    //将带function字符串的还原成真正发function
    var json = JSON.parse(str, function (k, v) {
        if (v.indexOf && v.indexOf("function") > -1) {
            return eval("(function(){return " + v + " })()");
        }
        return v;
    });
    return json;
};
//#endregion
//#region moveData:数组元素上下移动函数
util.moveData = function (index, type, list) {
    //函数：{数据移动函数}-注意调用对象的KEY等配置
    list = list || this[this.KEY.arrRelate]; //KEY配置相关数组
    var objIndex = {
        "up": index - 1,
        "down": index + 1,
        "top": 0,
        "bottom": list.length
    };
    if ((type == "up" || type == "top") && index < 1) {
        //如果已到最上
        return alert("已到最上");
    } else if ((type == "down" || type == "bottom") && index >= list.length - 1) {
        //如果已到最上
        return alert("已到最底");
    }
    var doc = list[index];
    list.splice(index, 1); //先删除
    list.splice(objIndex[type], 0, doc); //再插入
};
//#endregion
//#region sortByArrId:根据id数组重排集合的函数
util.sortByArrId = function (param) {
    var list = param.list,
        _param$idKey = param.idKey,
        idKey = _param$idKey === undefined ? "P1" : _param$idKey,
        arrId = param.arrId;

    if (!(list && list.length && arrId && arrId.length)) return list;
    var dict = lodash.keyBy(list, idKey); //转成数据字段，方便重排
    var arrNeed = arrId.map(function (id) {
        return dict[id];
    }); //获取排序后的列表数据
    arrNeed = arrNeed.filter(function (doc) {
        return doc;
    }); //过滤null的数据
    return arrNeed; //获取排序后的列表数据
};
//#endregion
//#region toFixed/money:将数字转换成保留小数点，默认2位
util.toFixed = function (num) {
    var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

    num = parseFloat(num);
    var result = void 0;
    if (isNaN(num) || num == 0 || num === undefined || num === null) {
        //结果为数字
        num = 0;
    }
    result = Number(num.toFixed(length));
    return result;
};
util.money = util.toFixed;
//#endregion
//#region getTimeRandom:返回带时间戳的随机数
util.getTimeRandom = function () {
    return moment().format("YYYYMMDDHHmmSSsss_") + lodash.random(99999);
};
//#endregion
//#region handelItem:处理字段数组的某个字段配置的函数
util.handelItem = function (cf) {
    var action = cf.action,
        items = cf.items,
        prop = cf.prop,
        itemNew = cf.itemNew,
        _cf$key = cf.key,
        key = _cf$key === undefined ? "prop" : _cf$key;

    if (!items) return;
    var index = items.findIndex(function (item) {
        return item[key] == prop;
    });
    if (index < 0) return; //找不到目标，return
    if (action == "replace") {
        //Q1:replace
        this.$set(items, index, itemNew); //修改memberId对应的字段配置
    } else if (action == "delete") {
        //Q2:delete
        items.splice(index, 1);
    }
};
// 
//#endregion
//#region setListPower:根据当前角色权限设置列表配置的函数-需要用到window.rolePower变量
util.setListPower = function (cfList) {
    var powerPath = cfList.powerPath;

    if (!powerPath) return cfList;
    var hasPowerAdd = lodash.get(WIN.rolePower, powerPath + ".add");
    //如果没有新增权限
    if (!hasPowerAdd) {
        //删除新增按钮
        util.handelItem({ items: cfList.batchBtns.addon, action: "delete", key: "eventType", prop: "add" });
    }
    var hasPowerDelete = lodash.get(WIN.rolePower, powerPath + ".delete");
    //如果没有删除权限
    if (!hasPowerDelete) {
        //删除单项删除按钮
        util.handelItem({ items: cfList.singleBtns.addon, action: "delete", key: "eventType", prop: "delete" });
        //删除批量删除按钮
        util.handelItem({ items: cfList.batchBtns.addon, action: "delete", key: "eventType", prop: "delete" });
    }
    var hasPowerModify = lodash.get(WIN.rolePower, powerPath + ".modify");
    //如果没有修改权限
    if (!hasPowerModify) {
        //删除单选修改按钮
        util.handelItem({ items: cfList.singleBtns.addon, action: "delete", key: "eventType", prop: "modify" });
    }
    return cfList;
};
//#endregion
//#region setLocalStorageObj:设置一个对象到LocalStorage函数
util.setLocalStorageObj = function (key, val) {
    if (util.type(val) == "array" || util.type(val) == "object") {
        //Q1:数据类型是数组活对虾
        val = JSON.stringify(val); //Json对象转换Json字符串
    }
    localStorage[key] = val;
};
//#endregion
//#region getLocalStorageObj:从LocalStorage获取一个对象的函数
util.getLocalStorageObj = function (key) {
    if (!localStorage[key]) return false;
    return JSON.parse(localStorage[key]); //
};
//#endregion
//#region cfList:标准列表的一些配置项
util.cfList = {};
util.cfList.bBtns = {};
util.cfList.bBtns.add = {
    text: "新增",
    eventType: "add",
    cfElBtn: {
        type: "primary"
    }
};
util.cfList.bBtns.delete = {
    text: "删除选中",
    eventType: "delete",
    needSelect: true,
    cfElBtn: {}
};
util.cfList.sBtns = {};
util.cfList.sBtns.detail = {
    title: "详情",
    eventType: "detail",
    cfElBtn: {
        circle: true,
        icon: "el-icon-notebook-2"
    }
};
util.cfList.sBtns.modify = {
    title: "编辑",
    eventType: "modify",
    cfElBtn: {
        circle: true,
        icon: "el-icon-edit"
    }
};
util.cfList.sBtns.delete = {
    title: "删除",
    eventType: "delete",
    cfElBtn: {
        circle: true,
        icon: "el-icon-close"
    }
};
util.cfList.sBtns.copy = {
    title: "复制",
    eventType: "copy",
    cfElBtn: {
        circle: true,
        icon: "el-icon-document-copy"
    }
    //#endregion
    //#region setObjDefault:给一个对象设置默认属性（但不整个替换对象，并且默认属性优先级低于已有属性）
};util.setObjDefault = function (obj, objDeault) {
    //for of循环遍历对象，for of不能直接处理对象，本质上是同个Object.keys拼装一个新数组进行辅助
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = Object.keys(objDeault)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;

            if (obj[key] === null || obj[key] === undefined) {
                //如果属性不存在
                obj[key] = objDeault[key];
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
};
//#endregion
//#region setObj:拓展vue实例的data数据函数
util.setObj = function (path, extend) {
    var objOld = lodash.get(this, path);
    var objNew = lodash.cloneDeep(objOld);
    if (objNew === null || objNew === undefined) {
        //如果{000}000
        objNew = {};
    }
    Object.assign(objNew, extend); //合并对象
    lodash.set(this, path, objNew);
};
//#endregion
//#region MIX:MIX混入
var MIX = {};
//表单字段组件配置
MIX.form_item = {
    props: ["value"],
    data: function data() {
        return {
            valueNeed: this.value
        };
    },

    watch: { //监听器，双向同步
        value: {
            handler: function handler(newVal, oldVal) {
                this.valueNeed = this.value;
            },

            deep: true
        },
        valueNeed: {
            handler: function handler(newVal, oldVal) {
                this.$emit("input", this.valueNeed); //同步valueNeed值到value
            },

            // immediate: true,//组件初始化时立即执行一次变动
            deep: true //深度监听
        }
    }
};
WIN.MIX = MIX;
//#endregion
//#region searchCollection:查询静态集合列表函数（支持模糊查询）
util.searchCollection = function () {
    var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _param$findJson = param.findJson,
        findJson = _param$findJson === undefined ? {} : _param$findJson,
        dataBase = param.dataBase;

    var paramVague = {}; //模糊查询参数
    var paramEqual = {}; //等值查询参数
    for (var prop in findJson) {
        var pEach = findJson[prop];
        if (pEach && pEach["$regex"]) {
            //如果带正则
            paramVague[prop] = pEach["$regex"];
        } else if (!(pEach == undefined || pEach == null)) {
            paramEqual[prop] = pEach;
        }
    }
    //第1步，先处理等值查询
    var result = lodash.filter(dataBase, paramEqual);
    //第2步，处理模糊查询
    var searchResult = lodash.filter(result, function (doc) {
        var flag = true;
        for (var prop in paramVague) {
            var flagEach = void 0;
            if (doc[prop]) {
                //如果对象的属性值存在
                flagEach = doc[prop].includes(paramVague[prop]);
            } else {
                flagEach = false;
            }
            flag = flag && flagEach;
        }
        return flag;
    });
    return searchResult;
};
//#endregion


WIN.MIX = MIX;
//#endregion