"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _systemId = PUB._systemId;
PUB.$projectAddon = PUB.$projectAddon || {}; //分组数据列表页需要补充的拆解字段，用于聚合查询

//#region window.FN函数库
window.FN = window.FN || {}; //存放本站公共函数的对象
//函数：{ajax根据关键词获取关联数据列表的函数}
FN.ajaxlistBykeyword = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
        var _ref$param = _ref.param,
            param = _ref$param === undefined ? {} : _ref$param;

        var _ref3, data;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return axios({
                            //请求接口
                            method: "post",
                            url: PUB.domain + "/info/getListBykeyword",
                            data: param
                        });

                    case 2:
                        _ref3 = _context.sent;
                        data = _ref3.data;
                        return _context.abrupt("return", data.list);

                    case 5:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function (_x) {
        return _ref2.apply(this, arguments);
    };
}();

//函数：{分组追加选中数据列表的函数}
FN.ajaxGroupAddSelectData = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(arr) {
        var _this = this;

        var tableData, docLast, sortStart, arrDataAdd, urlAdd, ajaxParam, response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        tableData = this.$refs.listData.tableData;
                        docLast = tableData.slice(0); //第一个元素

                        sortStart = lodash.get(docLast, "[0].sort", 9999);
                        arrDataAdd = arr.map(function (doc) {
                            return {
                                sort: ++sortStart,
                                _idRel: _this.groupId,
                                _idRel2: doc._id
                            };
                        });
                        // return;

                        urlAdd = PUB.listCF.list_relation.url.add;
                        ajaxParam = {
                            _data: arrDataAdd
                        };

                        Object.assign(ajaxParam, PUB.listCF.list_relation.paramAddonPublic); //合并公共参数
                        _context2.next = 9;
                        return axios({
                            //请求接口
                            method: "post",
                            url: PUB.domain + urlAdd,
                            data: ajaxParam //传递参数
                        });

                    case 9:
                        response = _context2.sent;


                        this.$message.success("添加数据成功");
                        this.arrSelect2 = []; //清除该数组，否则越积越多
                        this.$refs.listData.getDataList(); //列表更新

                    case 13:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function (_x2) {
        return _ref4.apply(this, arguments);
    };
}();

//#endregion


//#region 公共字典对象配置
PUB.objDictArr = {
    taskType: [{ value: 1, label: "新需求" }, { value: 2, label: "bug" }, { value: 3, label: "其他" }],
    difficulty: [{ value: 1, label: "简单" }, { value: 2, label: "一般" }, { value: 3, label: "困难" }, { value: 4, label: "很难" }],
    prior: [{ value: 1, label: "很高" }, { value: 2, label: "高" }, { value: 3, label: "中" }, { value: 4, label: "低" }],
    complete: [{ value: 0, label: "0%" }, { value: 0.1, label: "10%" }, { value: 0.2, label: "20%" }, { value: 0.3, label: "30%" }, { value: 0.4, label: "40%" }, { value: 0.5, label: "50%" }, { value: 0.6, label: "60%" }, { value: 0.7, label: "70%" }, { value: 0.8, label: "80%" }, { value: 0.9, label: "90%" }, { value: 1, label: "100%" }],
    complete2: [{ value: 1, label: "未开始" }, //complete==0
    { value: 2, label: "进行中" }, //complete>0&&complete>1
    { value: 3, label: "已完成" }]
    //{"P7": Im,"P5":{ $gte: DataStart,$lte: DataEnd } }
};PUB.dict = {}; //公共数据字典对象，里面会有多个子数据字典对象
//for of循环遍历对象，for of不能直接处理对象，本质上是同个Object.keys拼装一个新数组进行辅助
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
    for (var _iterator = Object.keys(PUB.objDictArr)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var key = _step.value;

        PUB.dict[key] = {};
        var arrOpt = PUB.objDictArr[key];
        arrOpt.forEach(function (itemEach) {
            //循环：{000数组}
            PUB.dict[key][itemEach.value] = itemEach;
        });
    }
    /**
        * @name 获取数据字典值函数
        * @param dictName字典名，value值
        */
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

PUB.formatterDict = function (dictName, value) {
    return lodash.get(PUB.dict, dictName + "." + value + ".label");
};
//#endregion


//#region 其他公共变量
//公共的列表对象
PUB.listCF = {};
PUB.listUrl = {
    list: "/info/getCommonList", //列表接口
    add: "/info/commonAdd", //新增接口
    modify: "/info/commonModify", //修改接口
    detail: "/info/commonDetail",
    delete: "/info/commonDelete" //删除接口
};
PUB.listCFCommon = {
    url: PUB.listUrl,
    columnOperate: { "min-width": 160 },
    //列表单项操作按钮的配置
    singleBtns: {
        addon: [util.cfList.sBtns.detail, util.cfList.sBtns.modify, util.cfList.sBtns.delete]
    }

};
var sBtnDetail = {
    uiType: "link",
    text: "详情",
    target: "_blank",
    //地址格式函数
    urlFormatter: function urlFormatter(row) {
        return "#/detail_data?dataId=" + row._id;
    }
};

PUB.singleBtns_copy_detail = {
    addon: [].concat(_toConsumableArray(util.cfList.sBtns.arrAllBtns), [sBtnDetail])
};

PUB.singleBtns_copy_detail_sort = {
    addon: [].concat(_toConsumableArray(util.cfList.sBtns.arrAllBtns), _toConsumableArray(util.cfList.sBtns.arrSortBtns), [util.cfList.sBtns.detailEntity])
};

PUB.listCFCommon2 = {
    url: PUB.listUrl,
    columnOperate: { "min-width": 230 },
    //列表单项操作按钮的配置
    singleBtns: PUB.singleBtns_copy_detail
    //objParamAddon列表接口的附加参数

};

PUB.singleBtns_copy_link = {
    addon: [].concat(_toConsumableArray(util.cfList.sBtns.arrAllBtns), [util.cfList.sBtns.link])
};

PUB.singleBtns_copy_link_sort = {
    addon: [].concat(_toConsumableArray(util.cfList.sBtns.arrAllBtns), _toConsumableArray(util.cfList.sBtns.arrSortBtns), [util.cfList.sBtns.link])
};

PUB.listCFCommon3 = {
    url: PUB.listUrl,
    columnOperate: { "min-width": 230 },
    //列表单项操作按钮的配置
    singleBtns: PUB.singleBtns_copy_link
    //objParamAddon列表接口的附加参数

};
PUB.singleBtns4 = {
    addon: [].concat(_toConsumableArray(util.cfList.sBtns.arrAllBtns), [sBtnDetail, util.cfList.sBtns.link])
    //第四套-有详情和链接按钮
};PUB.listCFCommon4 = {
    url: PUB.listUrl,
    columnOperate: { "min-width": 290 },
    //列表单项操作按钮的配置
    singleBtns: PUB.singleBtns4

};

PUB.singleBtns5 = {
    addon: [].concat(_toConsumableArray(util.cfList.sBtns.arrAllBtns))
    //第5套-
};PUB.listCFCommon5 = {
    url: PUB.listUrl,
    columnOperate: { "min-width": 160 },
    //列表单项操作按钮的配置
    singleBtns: PUB.singleBtns5

    //函数：{补充熟悉度ajax配置（动态数据字典）函数}
};window.setFamiliarityAjaxCF = function (listCF) {
    var idKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "_id";

    util.setObjDefault(listCF, { dynamicDict: [] });
    var _systemId = lodash.get(PUB, "_paramAjaxAddon._systemId", PUB._systemId); //变量：{获取_systemId}
    var dict = {
        ajax: {
            param: { _systemId: _systemId, _dataType: "familiarity", findJson: { userId: PUB.$sys.userId } },
            url: "/info/getCommonList"
        },
        populateColumn: "familiarityDoc",
        idColumn: idKey,
        idColumn2: "_idRel"
    };
    listCF.dynamicDict.push(dict); //数据字典加入一项
};
//#endregion


//函数：{初始化处理arrLookup数组函数}
FN.initArrLookup = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(listIndex) {
        var $projectAddon, arrLookupFromScore, formDataSearch, isValid, arrLookupSearch, arrLookupFixed, arrLookup;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        $projectAddon = {};

                        if (listIndex) {
                            $projectAddon = PUB.$projectAddon[listIndex] || {};
                        }
                        //****列表查询arrLookup数组由3部分组成：固定的查询，计分板的筛选参数，上方表单的筛选参数
                        arrLookupFromScore = this.arrLookup || []; //来自计分板筛选的arrLookup

                        formDataSearch = lodash.cloneDeep(this.formDataSearch); //深拷贝

                        util.clearObj(formDataSearch); //调用：{清除对象中的空属性（null,undefined,空格等）}
                        isValid = util.isNotEmptyObj(formDataSearch); //调用：{判断是否为非空对象的函数}

                        arrLookupSearch = [];

                        if (isValid) {
                            //如果是非空对象
                            arrLookupSearch.push({
                                $match: _extends({}, formDataSearch)
                            });
                        }

                        //补充联合查询参数，很复杂！！！！

                        //固定的查询部分
                        arrLookupFixed = [{
                            //联合目标数据表
                            $lookup: {
                                from: "sheet232",
                                localField: "_idRel2",
                                foreignField: "_id",
                                as: "relDoc2"
                            }
                        },
                        //使用$project重新组装，此时targetDoc是数组形式
                        {
                            $project: {
                                _id: 1,
                                _idRel: 1,
                                _idRel2: 1,
                                sort: "$_data.sort", //序号获取
                                targetDoc: "$relDoc2._data"
                            }
                        },
                        //将targetDoc展开
                        {
                            $unwind: "$targetDoc"
                        },
                        //使用$project重新组装
                        {
                            $project: _extends({
                                _id: 1,
                                _idRel: 1,
                                _idRel2: 1,
                                sort: 1, //序号获取
                                title: "$targetDoc.title",
                                link: "$targetDoc.link", //链接地址
                                category: "$targetDoc.category"
                            }, $projectAddon)
                        }];
                        arrLookup = [].concat(arrLookupFixed, _toConsumableArray(arrLookupFromScore), arrLookupSearch);

                        this.$set(this.cfList.objParamAddon, "arrLookup", arrLookup);

                        //****计分板统计分数需要的arrLookup数组由2部分组成：固定的查询，上方表单的筛选参数
                        this.arrLookupScore = [].concat(arrLookupFixed, arrLookupSearch);

                    case 12:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function (_x4) {
        return _ref5.apply(this, arguments);
    };
}();

//#region MIX混入

MIX.listGroupData = {
    props: {
        groupDoc: {},
        groupId: {},
        dataType: {
            default: "note"
        } //数据类型

    },
    data: function data() {
        return {
            readyAddDialogEntity: true, //是否准备好新增实体的弹窗组件-用于复制时重现初始化
            cfAddDialogEntity: {
                copyId: "5e84ae2520a342107c0ad688",
                tipsAfterAdd: false,
                listType: "common", //通用型列表-影响urlAdd
                cfFormAdd: { paramAddonInit: { _systemId: "sys_api", _dataType: this.dataType } }
            },
            //编辑实体数据弹窗配置
            cfEditDialogEntity: {
                listType: "common", //通用型列表-影响urlModify
                cfFormModify: {
                    paramAddonInit: { _id: "", _systemId: PUB._systemId, _dataType: this.dataType }
                }
            },
            arrSelect2: [],
            cfSelectList2: {
                hideCollection: true,
                dataName: lodash.get(DYDICT, "dataType." + this.dataType + ".label"),
                valueKey: "_id",
                labelKey: "title",
                pageName: "tangball_article",
                multiple: true, //多选
                //需要保留的集合字段
                selectJson: { _id: 1, title: 1 },
                cfList: util.deepCopy(PUB.listCF["list_" + this.dataType])
            },
            //查询表单配置
            cfFormSearch: {
                inline: true, size: "mini", formItems: [F_ITEMS.importance],
                btns: [{ text: "查询", event: "submit", type: "primary", size: "mini" }]
            },
            formDataSearch: {},
            ready: false,
            cfList: util.deepCopy(PUB.listCF["detail_group_" + this.dataType]),
            arrLookupScore: null //计分板需要联合查询配置数组-
        };
    },

    computed: {
        //用于监听变化
        arrLookup: function arrLookup() {
            return this.$store.state.arrLookup[this.cfList.listIndex];
        }
    },
    methods: {
        //函数：{单条数据操作事件}-临时
        singleEvent: function () {
            var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(actionType, doc) {
                var arrNeedRefresh, _idRel2;

                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                arrNeedRefresh = ["up", "down", "top", "bottom"];

                                if (!arrNeedRefresh.includes(actionType)) {
                                    _context4.next = 5;
                                    break;
                                }

                                _context4.next = 4;
                                return util.ajaxGroupDataSort(actionType, doc);

                            case 4:
                                this.$refs.listData.getDataList(); //列表更新

                            case 5:
                                _idRel2 = doc._idRel2;

                                if (!(actionType == "edit_entity")) {
                                    _context4.next = 11;
                                    break;
                                }

                                //如果是编辑实体数据

                                this.cfEditDialogEntity.cfFormModify.paramAddonInit._id = _idRel2; //***修改数据id
                                this.cfEditDialogEntity.visible = true; //打开弹窗
                                _context4.next = 19;
                                break;

                            case 11:
                                if (!(actionType == "copy_entity")) {
                                    _context4.next = 19;
                                    break;
                                }

                                console.log("doc._id:" + doc._id);
                                this.cfAddDialogEntity.copyId = _idRel2;
                                this.readyAddDialogEntity = false;
                                _context4.next = 17;
                                return this.$nextTick();

                            case 17:
                                //延迟到视图更新
                                this.readyAddDialogEntity = true;

                                this.cfAddDialogEntity.visible = true; //打开弹窗

                            case 19:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function singleEvent(_x5, _x6) {
                return _ref6.apply(this, arguments);
            }

            return singleEvent;
        }(),
        bacthEvent: function bacthEvent(actionType, doc) {
            if (actionType == "add_entity") {
                //如果{事件类型}是新增实体
                this.cfAddDialogEntity.visible = true; //打开弹窗
            }
        },
        afterAddEntity: function () {
            var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(doc) {
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                this.ajaxGroupAddData([doc]); //调用：{000函数}

                            case 1:
                            case "end":
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function afterAddEntity(_x7) {
                return _ref7.apply(this, arguments);
            }

            return afterAddEntity;
        }(),

        //函数：{选择并添加数据后的ajax操作函数}
        afterSelect: FN.ajaxGroupAddSelectData,
        ajaxGroupAddData: FN.ajaxGroupAddSelectData, //函数：{添加数据到分组的ajax操作函数}
        //函数：{初始化处理arrLookup数组函数}
        initArrLookup: FN.initArrLookup,
        //函数：{查询表单提交的回调函数}
        searchList: function () {
            var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                this.initArrLookup(this.cfList.listIndex); //调用：{初始化处理arrLookup数组函数}
                                _context6.next = 3;
                                return this.$nextTick();

                            case 3:
                                //延迟到视图更新
                                this.$refs.listData.getDataList(); //列表更新

                            case 4:
                            case "end":
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));

            function searchList() {
                return _ref8.apply(this, arguments);
            }

            return searchList;
        }(),

        //函数：{列表查询后的回调函数}
        afterSearch: function () {
            var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(list) {
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:

                                //设置id数组
                                this.$refs.scorePanel.ajaxGetScore(); //调用：{ajax获取分数函数}
                                if (this.$refs.scorePanel.focusId == undefined) {
                                    //如果没有筛选熟悉度（这里的触发机制还需进一步优化，没有必要一直调用）
                                    this.updateGroupCountData(); //调用：{更新当前分组的数据量的函数}
                                }

                            case 2:
                            case "end":
                                return _context7.stop();
                        }
                    }
                }, _callee7, this);
            }));

            function afterSearch(_x8) {
                return _ref9.apply(this, arguments);
            }

            return afterSearch;
        }(),

        //函数：{更新当前分组的数据量的函数}
        updateGroupCountData: function () {
            var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
                var urlModify, ajaxParam, response;
                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch (_context8.prev = _context8.next) {
                            case 0:
                                urlModify = PUB.listCF.list_group.url.modify;
                                ajaxParam = {
                                    _id: this.groupId, _data: { countData: this.$refs.listData.allCount //获取列表的数据总量
                                    } };

                                Object.assign(ajaxParam, PUB.listCF.list_group.paramAddonPublic); //合并公共参数
                                _context8.next = 5;
                                return axios({
                                    //请求接口
                                    method: "post", url: PUB.domain + urlModify,
                                    data: ajaxParam //传递参数
                                });

                            case 5:
                                response = _context8.sent;

                            case 6:
                            case "end":
                                return _context8.stop();
                        }
                    }
                }, _callee8, this);
            }));

            function updateGroupCountData() {
                return _ref10.apply(this, arguments);
            }

            return updateGroupCountData;
        }(),

        //函数：{增加排除当前分组数据的查询条件的函数}
        excludeCurrGroup: function () {
            var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
                var cfList, findjsonAdd;
                return regeneratorRuntime.wrap(function _callee9$(_context9) {
                    while (1) {
                        switch (_context9.prev = _context9.next) {
                            case 0:
                                /****************************补充排除当前所属分组的查询参数-START****************************/
                                cfList = this.cfSelectList2.cfList;

                                cfList.objParamAddon = cfList.objParamAddon || {};
                                cfList.objParamAddon.findJson = cfList.objParamAddon.findJson || {};
                                findjsonAdd = {
                                    "$or": [{
                                        "_data.arrGroup": {
                                            "$elemMatch": {
                                                "_idRel": {
                                                    "$ne": this.groupId //不属于当前分组
                                                }
                                            }
                                        }
                                    }, {
                                        "_data.arrGroup": {
                                            "$exists": false //分组不存在
                                        }
                                    }, {
                                        "_data.countGroup": 0 //分组数为0
                                    }]
                                };


                                cfList.objParamAddon.findJson = _extends({}, cfList.objParamAddon.findJson, findjsonAdd);
                                /****************************补充排除当前所属分组的查询参数-END****************************/

                            case 5:
                            case "end":
                                return _context9.stop();
                        }
                    }
                }, _callee9, this);
            }));

            function excludeCurrGroup() {
                return _ref11.apply(this, arguments);
            }

            return excludeCurrGroup;
        }()
    },
    created: function () {
        var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
            var addon, itemAdd, sBtnEditEntity;
            return regeneratorRuntime.wrap(function _callee10$(_context10) {
                while (1) {
                    switch (_context10.prev = _context10.next) {
                        case 0:

                            this.excludeCurrGroup(); //调用：{增加排除当前分组数据的查询条件的函数}

                            /****************************弱化新增按钮-START****************************/
                            addon = this.cfList.batchBtns.addon;
                            itemAdd = addon.find(function (doc) {
                                return doc.eventType == "add";
                            });

                            Object.assign(itemAdd, { text: "新增关联Id", cfElBtn: {} }); //合并对象-

                            /****************************弱化新增按钮-END****************************/

                            this.cfList.customDetail = true; //开启自定义详情弹窗
                            this.$set(this.cfList.objParamAddon.findJson, "_idRel", this.groupId);
                            this.initArrLookup(this.cfList.listIndex); //调用：{初始化处理arrLookup数组函数}
                            this.ready = true;
                            //补充熟悉度ajax配置（动态数据字典）,注意要传_idRel2
                            window.setFamiliarityAjaxCF(this.cfList, "_idRel2");

                            /****************************补充编辑实体数据按钮-START****************************/
                            sBtnEditEntity = { eventType: "edit_entity", text: "编辑" };

                            this.cfList.singleBtns.addon.push(sBtnEditEntity);
                            /****************************补充编辑实体数据按钮-END****************************/

                        case 11:
                        case "end":
                            return _context10.stop();
                    }
                }
            }, _callee10, this);
        }));

        function created() {
            return _ref12.apply(this, arguments);
        }

        return created;
    }()
};
//#endregion

//#region 【多】标准列表页配置
//#region 管理员列表页


{
    var _dataType = "admin";
    var listIndex = "list_" + _dataType;
    PUB.listCF[listIndex] = _extends({
        idKey: "_id", //键名
        pageSize: 20,
        listIndex: listIndex, //vuex对应的字段~
        focusMenu: true, //进行菜单聚焦
        breadcrumb: [{ value: "首页", path: "listHome" }, { value: "管理员" }]
    }, PUB.listCFCommon5, { //展开公共配置
        //objParamAddon列表接口的附加参数
        objParamAddon: { _dataType: _dataType },
        //公共的附加参数，针对所有接口
        paramAddonPublic: { _dataType: _dataType },

        //-------详情字段数组-------
        detailItems: ["Id", "userName", "passWord"],
        //-------列配置数组-------
        columns: ["Id", "userName", "nickName", "role"],
        //-------筛选表单字段数组-------
        searchFormItems: ["Id"],
        //-------新增、修改表单字段数组-------
        formItems: ["userName", "passWord", "nickName", "role"]
        //调用：{改造列表字段配置形式的函数（字符串转对象）}
    });util.reformCFListItem(PUB.listCF[listIndex]);
}

//#endregion

//#region 所有数据列表页


{

    var _dataType2 = "$all"; //特殊类型

    PUB.listCF.list_all = _extends({
        idKey: "_id", //键名
        pageSize: 20,
        listIndex: "list_all", //vuex对应的字段~
        focusMenu: true, //进行菜单聚焦
        breadcrumb: [{ value: "首页", path: "listHome" }, { value: "所有数据" }]
    }, PUB.listCFCommon2, { //展开公共配置
        objParamAddon: { _dataType: _dataType2 },
        //公共的附加参数，针对所有接口
        paramAddonPublic: { _dataType: _dataType2 },

        //-------详情字段数组-------
        detailItems: ["title", "desc"],
        //-------列配置数组-------
        columns: ["title_fixed", "desc"],
        //-------筛选表单字段数组-------
        searchFormItems: ["title_search"],
        //-------新增、修改表单字段数组-------
        formItems: ["title", "desc"]

    });
    util.reformCFListItem(PUB.listCF.list_all);
}
//#endregion

//#region 文章分类列表页

{
    var _dataType3 = "article_category";
    var _listIndex = "list_" + _dataType3;
    PUB.listCF[_listIndex] = _extends({
        idKey: "_id", //键名
        pageSize: 20,
        listIndex: _listIndex, //vuex对应的字段~
        focusMenu: true, //进行菜单聚焦

        breadcrumb: [{ value: "首页", path: "listHome" }, { value: "文章分类" }]
    }, PUB.listCFCommon5, { //展开公共配置
        //objParamAddon列表接口的附加参数
        objParamAddon: { _dataType: _dataType3 },
        //公共的附加参数，针对所有接口
        paramAddonPublic: { _dataType: _dataType3 },
        //-------详情字段数组-------
        detailItems: ["category_name", "category_remark"],
        //-------列配置数组-------
        columns: ["category_name", "category_remark"],
        //-------筛选表单字段数组-------
        searchFormItems: ["category_name"],
        //-------新增、修改表单字段数组-------
        formItems: ["category_name", "category_remark"]
        //调用：{改造列表字段配置形式的函数（字符串转对象）}
    });util.reformCFListItem(PUB.listCF[_listIndex]);
}
//#endregion

//#region 文章列表页
{
    var _dataType4 = "article";
    var _listIndex2 = "list_" + _dataType4;
    PUB.listCF[_listIndex2] = _extends({
        idKey: "_id", //键名
        pageSize: 20,
        listIndex: _listIndex2, //vuex对应的字段~
        focusMenu: true, //进行菜单聚焦
        breadcrumb: [{ value: "首页", path: "listHome" }, { value: "文章" }]
    }, PUB.listCFCommon2, { //展开公共配置
        //objParamAddon列表接口的附加参数
        objParamAddon: { _dataType: _dataType4 },
        //公共的附加参数，针对所有接口
        paramAddonPublic: { _dataType: _dataType4 },

        //-------详情字段数组-------
        detailItems: ["title", "desc"],
        //-------列配置数组-------
        columns: ["title_fixed", "desc"],
        //-------筛选表单字段数组-------
        searchFormItems: ["title_search"],
        //-------新增、修改表单字段数组-------
        formItems: ["title", "desc", "detail_paste"]
        //调用：{改造列表字段配置形式的函数（字符串转对象）}
    });util.reformCFListItem(PUB.listCF[_listIndex2]);
}
//#endregion

//#region 数据类型列表页
{
    var _dataType5 = "data_type";
    var _listIndex3 = "list_" + _dataType5;
    PUB.listCF[_listIndex3] = _extends({
        idKey: "_id", //键名
        pageSize: 20,
        listIndex: _listIndex3, //vuex对应的字段~
        focusMenu: true, //进行菜单聚焦
        breadcrumb: [{ value: "首页", path: "listHome" }, { value: "数据类型" }]
    }, PUB.listCFCommon5, { //展开公共配置
        //objParamAddon列表接口的附加参数
        objParamAddon: { _dataType: _dataType5 },
        //公共的附加参数，针对所有接口
        paramAddonPublic: { _dataType: _dataType5 },

        //-------详情字段数组-------
        detailItems: ["_id", "dataTypekey", "title", "desc"],
        //-------列配置数组-------
        columns: ["title_fixed", "dataTypekey", "desc"],
        //-------筛选表单字段数组-------
        searchFormItems: ["title_search", "dataTypekey"],
        //-------新增、修改表单字段数组-------
        formItems: ["dataTypekey", "title", "desc"]
        //调用：{改造列表字段配置形式的函数（字符串转对象）}
    });util.reformCFListItem(PUB.listCF[_listIndex3]);
}
//#endregion


//#region 分组列表页
{
    var _dataType6 = "group";
    var _listIndex4 = "list_" + _dataType6;
    PUB.listCF[_listIndex4] = _extends({
        idKey: "_id", //键名
        pageSize: 20,
        listIndex: _listIndex4, //vuex对应的字段~
        focusMenu: true, //进行菜单聚焦
        breadcrumb: [{ value: "首页", path: "listHome" }, { value: "分组" }]
    }, PUB.listCFCommon, { //展开公共配置
        //列表单项操作按钮的配置
        singleBtns: {
            addon: [].concat(_toConsumableArray(util.cfList.sBtns.arrAllBtns), [{
                uiType: "link",
                text: "分组详情",
                target: "_blank",
                url: "#/detail_group?groupId=" //这里要配置好参数名，内部会把参数加进来
            }])
        },
        objParamAddon: { _dataType: _dataType6 },
        //公共的附加参数，针对所有接口
        paramAddonPublic: { _dataType: _dataType6 },

        //-------详情字段数组-------
        detailItems: ["_id", "title", "alias", "desc", "group_dataType"],
        //-------列配置数组-------
        columns: ["title_fixed", "_id", "alias", "desc", "group_dataType"],
        //-------筛选表单字段数组-------
        searchFormItems: ["title_search", "group_dataType", "alias"],
        //-------新增、修改表单字段数组-------
        formItems: ["title", "alias", "group_dataType", "iconSrc", "desc"]
        //调用：{改造列表字段配置形式的函数（字符串转对象）}
    });util.reformCFListItem(PUB.listCF[_listIndex4]);
}
//#endregion

//#region 笔记分类列表页
{
    var _dataType7 = "note_category";
    var _listIndex5 = "list_" + _dataType7;
    PUB.listCF[_listIndex5] = _extends({
        idKey: "_id", //键名
        pageSize: 20,
        listIndex: _listIndex5, //vuex对应的字段~
        focusMenu: true, //进行菜单聚焦
        breadcrumb: [{ value: "首页", path: "listHome" }, { value: "笔记分类" }]
    }, PUB.listCFCommon5, { //展开公共配置
        //objParamAddon列表接口的附加参数
        objParamAddon: { _dataType: _dataType7 },
        //公共的附加参数，针对所有接口
        paramAddonPublic: { _dataType: _dataType7 },

        //-------详情字段数组-------
        detailItems: ["title", "desc", "category"],
        //-------列配置数组-------
        columns: ["title_fixed", "desc", "category"],
        //-------筛选表单字段数组-------
        searchFormItems: ["title_search"],
        //-------新增、修改表单字段数组-------
        formItems: ["title", "desc"]
        //调用：{改造列表字段配置形式的函数（字符串转对象）}
    });util.reformCFListItem(PUB.listCF[_listIndex5]);
}

//#endregion


//#region 笔记列表页
{
    var _dataType8 = "note";
    var _listIndex6 = "list_" + _dataType8;
    PUB.listCF[_listIndex6] = _extends({
        idKey: "_id", //键名
        pageSize: 20,
        listIndex: _listIndex6, //vuex对应的字段~
        focusMenu: true, //进行菜单聚焦
        breadcrumb: [{ value: "首页", path: "listHome" }, { value: "笔记" }]
    }, PUB.listCFCommon2, { //展开公共配置
        //批量操作按钮的配置
        batchBtns: {
            addon: [util.cfList.bBtns.add, util.cfList.bBtns.delete,
            // { uiType: "slot", slot: "slot_in_toolbar" },
            { uiType: "component", component: "com_score_panel", ref: "score_panel" }]
        },
        //dynamicDict动态数据字典配置
        dynamicDict: [DYDICT.note_category],
        //objParamAddon列表接口的附加参数//传入联表查询参数
        objParamAddon: { _dataType: _dataType8, arrLookup: [] },
        //公共的附加参数，针对所有接口
        paramAddonPublic: { _dataType: _dataType8 },

        //操作列配置
        columnOperate: {
            "min-width": 210
        },

        //-------详情字段数组-------
        detailItems: ["title", "keyword", "detail", "desc", "category", "importance", "difficulty", "_id", "demoList", "note_linkList", "note_noteList"],
        //-------列配置数组-------
        columns: ["_id", "title_fixed_edit", "countGroup", "keyword_edit", "familiarity_select", "importance_edit", "difficulty_edit", "category_multiple", "demoList"],
        //-------筛选表单字段数组-------
        searchFormItems: ["title_search", "note_category", "importance", "difficulty", "countGroup"],
        //-------新增、修改表单字段数组-------
        formItems: ["title", "link", "importance_radio", "difficulty_radio", "keyword", "note_category", "desc", "detail_paste", "_systemId"]
        //调用：{改造列表字段配置形式的函数（字符串转对象）}
    });util.reformCFListItem(PUB.listCF[_listIndex6]);
}

//#endregion


//#endregion

//***注意位置-补充表单字段，因为这个字段需要继承PUB.listCF.list_note
F_ITEMS.relNoteList = _extends({}, D_ITEMS.relNoteList, {
    type: "select_list_data",
    cfSelectList: {
        //选择列表配置
        dataName: "笔记",
        valueKey: "_id",
        labelKey: "title",
        multiple: true, //多选
        //需要保留的集合字段
        selectJson: {
            _id: 1,
            title: 1
        },
        cfList: util.deepCopy(PUB.listCF.list_note)
    }
});

//#region 关系列表页
{
    var _dataType9 = "relation";
    var _listIndex7 = "list_" + _dataType9;
    PUB.listCF[_listIndex7] = _extends({
        idKey: "_id", //键名
        pageSize: 20,
        listIndex: _listIndex7, //vuex对应的字段~
        focusMenu: true, //进行菜单聚焦
        breadcrumb: [{ value: "首页", path: "listHome" }, { value: "关系数据" }]
    }, PUB.listCFCommon5, { //展开公共配置
        objParamAddon: { _dataType: _dataType9 },
        //公共的附加参数，针对所有接口
        paramAddonPublic: { _dataType: _dataType9 },

        //-------详情字段数组-------
        detailItems: ["_id", "_idRel", "_idRel2", "sort"],
        //-------列配置数组-------
        columns: ["_id", "_idRel", "_idRel2", "sort"],
        //-------筛选表单字段数组-------
        searchFormItems: ["_idRel", "_idRel2"],
        //-------新增、修改表单字段数组-------
        formItems: ["_idRel", "_idRel2", "sort"]
        //调用：{改造列表字段配置形式的函数（字符串转对象）}
    });util.reformCFListItem(PUB.listCF[_listIndex7]);
}

//#endregion
//#region 角色列表页


{
    var _dataType10 = "role";
    var _listIndex8 = "list_" + _dataType10;
    PUB.listCF[_listIndex8] = _extends({
        idKey: "_id", //键名
        pageSize: 20,
        listIndex: _listIndex8, //vuex对应的字段~
        focusMenu: true, //进行菜单聚焦
        breadcrumb: [{ value: "首页", path: "listHome" }, { value: "角色" }]
    }, PUB.listCFCommon5, { //展开公共配置
        objParamAddon: { _dataType: _dataType10 },
        //公共的附加参数，针对所有接口
        paramAddonPublic: { _dataType: _dataType10 },

        //-------详情字段数组-------
        detailItems: ["Id", "roleName", "rolePower"],
        //-------列配置数组-------
        columns: ["Id", "roleName", "rolePower"],
        //-------筛选表单字段数组-------
        searchFormItems: ["Id"],
        //-------新增、修改表单字段数组-------
        formItems: ["roleName", "rolePower"]
        //调用：{改造列表字段配置形式的函数（字符串转对象）}
    });util.reformCFListItem(PUB.listCF[_listIndex8]);
}

//#endregion
//#region 网址列表页


{
    var _dataType11 = "url";
    var _listIndex9 = "list_" + _dataType11;
    PUB.listCF[_listIndex9] = _extends({
        idKey: "_id", //键名
        pageSize: 20,
        listIndex: _listIndex9, //vuex对应的字段~
        focusMenu: true, //进行菜单聚焦
        breadcrumb: [{ value: "首页", path: "listHome" }, { value: "网址" }]
    }, PUB.listCFCommon3, { //展开公共配置
        //objParamAddon列表接口的附加参数
        // singleBtns:PUB.singleBtns_copy_link_sort,
        objParamAddon: { _dataType: _dataType11 },
        //公共的附加参数，针对所有接口
        paramAddonPublic: { _dataType: _dataType11 },

        //-------详情字段数组-------
        detailItems: ["title", "desc", "link"],
        //-------列配置数组-------
        columns: ["title_fixed", "_id", "desc", "link"],
        //-------筛选表单字段数组-------
        searchFormItems: ["title_search"],
        //-------新增、修改表单字段数组-------
        formItems: ["title", "link", "desc", "album"]
        //调用：{改造列表字段配置形式的函数（字符串转对象）}
    });util.reformCFListItem(PUB.listCF[_listIndex9]);
}

//#endregion

//#region 视频列表页
{
    var _dataType12 = "vedio";
    var _listIndex10 = "list_" + _dataType12;
    PUB.listCF[_listIndex10] = _extends({
        idKey: "_id", //键名
        pageSize: 20,
        listIndex: _listIndex10, //vuex对应的字段~
        focusMenu: true, //进行菜单聚焦
        breadcrumb: [{ value: "首页", path: "listHome" }, { value: "教学视频" }]
    }, PUB.listCFCommon2, { //展开公共配置

        objParamAddon: { _dataType: _dataType12 },
        //公共的附加参数，针对所有接口
        paramAddonPublic: { _dataType: _dataType12 },

        //-------详情字段数组-------
        detailItems: ["title", "desc", "link", "vedio", "detail"],
        //-------列配置数组-------
        columns: ["title_fixed", "keyword_edit", "countGroup", "_id", "desc", "vedio", "link"],
        //-------筛选表单字段数组-------
        searchFormItems: ["title_search", "countGroup"],
        //-------新增、修改表单字段数组-------
        formItems: ["title", "keyword", "desc", "link", "vedio"]
        //调用：{改造列表字段配置形式的函数（字符串转对象）}
    });util.reformCFListItem(PUB.listCF[_listIndex10]);
}

//#endregion


//变量：{分组数据列表的单项操作按钮配置}
PUB.singleBtns_list_group_data = {
    addon: [util.cfList.sBtns.detail, util.cfList.sBtns.modify, util.cfList.sBtns.copyEntity, util.cfList.sBtns.delete].concat(_toConsumableArray(util.cfList.sBtns.arrSortBtns), [util.cfList.sBtns.detailEntity])
};

PUB.cfListGPublic = _extends({

    isShowBreadcrumb: false, //面包屑
    isShowSearchForm: false, //查询表单-
    idKey: "_id", //键名
    pageSize: 20,
    focusMenu: false }, PUB.listCFCommon3, { //展开公共配置
    singleBtns: PUB.singleBtns_list_group_data,
    batchBtns: {
        addon: [{ uiType: "slot", slot: "slot_btn_select" }, util.cfList.bBtns.addEntity, util.cfList.bBtns.add, util.cfList.bBtns.refresh, util.cfList.bBtns.delete]
    },
    sortJsonDefault: { "sort": -1 },
    findJsonDefault: {}

    //#region 分组下的分组列表页
});{
    var _dataType13 = "relation";
    var _listIndex11 = "detail_group_group";
    PUB.listCF[_listIndex11] = _extends({}, PUB.cfListGPublic, {
        listIndex: _listIndex11, //vuex对应的字段~
        //列表单项操作按钮的配置
        singleBtns: {
            addon: [].concat(_toConsumableArray(PUB.singleBtns_list_group_data.addon), [util.cfList.sBtns.linkGroup])
        },
        objParamAddon: { findJson: {}, _dataType: _dataType13 },
        paramAddonPublic: { _dataType: _dataType13 }, //公共的附加参数，针对所有接口
        dynamicDict: [DYDICT.note_category], //dynamicDict动态数据字典配置
        //-------详情字段数组-------
        detailItems: ["title", "desc", "countData", "_id", "_idRel", "_idRel2", "sort"],
        //-------列配置数组-------
        columns: ["title_fixed", "countData", "myScore", "group_dataType", "desc", "sort"],
        //-------筛选表单字段数组-------
        searchFormItems: ["title_search"],
        //-------新增、修改表单字段数组-------
        formItems: ["_idRel", "_idRel2", "sort"]
        //#endregion
    });util.reformCFListItem(PUB.listCF[_listIndex11]);
    //需要补充的拆解字段****
    PUB.$projectAddon[_listIndex11] = {
        dataType: "$targetDoc.dataType",
        countData: "$targetDoc.countData"
    };
}
//#endregion
//#region 分组下的笔记列表页
{

    var _dataType14 = "relation";
    var _listIndex12 = "detail_group_note";
    PUB.listCF[_listIndex12] = _extends({}, PUB.cfListGPublic, {
        listIndex: _listIndex12, //vuex对应的字段~
        //批量操作按钮的配置
        batchBtns: {
            addon: [].concat(_toConsumableArray(PUB.cfListGPublic.batchBtns.addon), [{ uiType: "slot", slot: "slot_in_toolbar" }])
        },
        //列表单项操作按钮的配置
        // singleBtns: PUB.singleBtns_copy_detail_sort,
        singleBtns: {
            addon: [].concat(_toConsumableArray(PUB.singleBtns_list_group_data.addon))
        },
        objParamAddon: { findJson: {}, _dataType: _dataType14 },
        paramAddonPublic: { _dataType: _dataType14 }, //公共的附加参数，针对所有接口
        //dynamicDict动态数据字典配置
        dynamicDict: [DYDICT.note_category],
        //-------详情字段数组-------
        detailItems: ["title", "detail", "desc", "category", "importance", "_id", "_idRel", "_idRel2", "sort"],
        //-------列配置数组-------
        columns: ["title_fixed", "familiarity_select", "importance", "difficulty", "category_multiple", "sort"],
        //-------筛选表单字段数组-------
        searchFormItems: ["title_search", "importance", "difficulty"],
        //-------新增、修改表单字段数组-------
        formItems: ["_idRel", "_idRel2", "sort"]
    });
    util.reformCFListItem(PUB.listCF[_listIndex12]);
    //需要补充的拆解字段****
    PUB.$projectAddon[_listIndex12] = {
        importance: "$targetDoc.importance", difficulty: "$targetDoc.difficulty"
    };
}
//#endregion
//#region 分组下的网址列表页
{
    var _dataType15 = "relation";
    var _listIndex13 = "detail_group_url";
    PUB.listCF[_listIndex13] = _extends({}, PUB.cfListGPublic, {
        listIndex: _listIndex13, //vuex对应的字段~
        singleBtns: {
            addon: [].concat(_toConsumableArray(PUB.singleBtns_list_group_data.addon), [util.cfList.sBtns.link])
        },
        objParamAddon: { findJson: {}, _dataType: _dataType15 },
        paramAddonPublic: { _dataType: _dataType15 }, //公共的附加参数，针对所有接口
        //dynamicDict动态数据字典配置
        dynamicDict: [DYDICT.note_category],
        //-------详情字段数组-------
        detailItems: ["title", "desc", "countData", "_id", "_idRel", "_idRel2", "sort"],
        //-------列配置数组-------
        columns: ["title_fixed", "_id", "desc", "link", "sort"],
        //-------筛选表单字段数组-------
        searchFormItems: ["title_search"],
        //-------新增、修改表单字段数组-------
        formItems: ["_idRel", "_idRel2", "sort"]
    });
    util.reformCFListItem(PUB.listCF[_listIndex13]);
}
//#endregion
//#region 分组下的视频列表页
{
    var _dataType16 = "relation";
    var _listIndex14 = "detail_group_vedio";
    PUB.listCF[_listIndex14] = _extends({}, PUB.cfListGPublic, {
        listIndex: _listIndex14, //vuex对应的字段~
        objParamAddon: { findJson: {}, _dataType: _dataType16 },
        paramAddonPublic: { _dataType: _dataType16 }, //公共的附加参数，针对所有接口
        //dynamicDict动态数据字典配置
        dynamicDict: [DYDICT.note_category],
        //-------详情字段数组-------
        detailItems: ["title", "desc", "countData", "_id", "_idRel", "_idRel2", "sort"],
        //-------列配置数组-------
        columns: ["title_fixed", "_id", "desc", "link", "sort"],
        //-------筛选表单字段数组-------
        searchFormItems: ["title_search"],
        //-------新增、修改表单字段数组-------
        formItems: ["_idRel", "_idRel2", "sort"]
    });
    util.reformCFListItem(PUB.listCF[_listIndex14]);
}
//#endregion

//#endregion