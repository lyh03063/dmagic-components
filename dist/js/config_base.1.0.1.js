"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//#region 基本配置
window.PUB = {};
PUB.domain = "http://localhost:3000";
//PUB.domain = 'http://test.dmagic.cn'
//PUB.domain = "http://120.76.160.41:3000"
PUB.urlUpload = "https://up-z2.qiniup.com"; //七牛云上传地址（域名）
PUB.urlGetQiniuToken = PUB.domain + "/api_third_part/get_qiniu_token?scope=dmagic";
PUB.systemName = "前端学习系统";
PUB.KeySys = "api";
var _systemId = "sys_" + PUB.KeySys;
PUB._systemId = _systemId;
PUB.keyLoginUser = PUB.KeySys + "_loginUserName";
PUB.keyIsLogin = PUB.KeySys + "_isLogin";
PUB.keyRoleId = PUB.KeySys + "_roleId";
PUB.keyPower = PUB.KeySys + "_power";
PUB.userId = localStorage[PUB.keyLoginUser];
PUB.logoUrl = "http://www.dmagic.cn/images/IconS/IconS_2578.png";
//#endregion

//#region 菜单列表
//完整的菜单列表
PUB.menuList = [{
  //菜单
  index: "listHome",
  route: "/listHome",
  icon: "el-icon-house",
  title: "首页"
}, {
  index: "apiCenter",
  icon: "el-icon-document",
  title: "API手册",
  menuItem: [{
    index: "list_html_api",
    route: "/list_html_api",
    title: "Html-API"
  }, {
    index: "list_css_api",
    route: "/list_css_api",
    title: "Css-API"
  }, {
    index: "list_js_api",
    route: "/list_js_api",
    title: "Javascript-API"
  }, {
    index: "list_note",
    route: "/list_note",
    title: "笔记"
  }, {
    index: "list_front_demo",
    route: "/list_common?type=front_demo",
    title: "前端demo"
  }, {
    index: "list_vedio",
    route: "/list_common?type=vedio",
    title: "视频"
  }, {
    index: "list_exercises",
    route: "/list_common?type=exercises",
    title: "习题"
  }, {
    index: "list_url",
    route: "/list_common?type=url",
    title: "网址"
  }]
}, {
  index: "newsCenter",
  icon: "el-icon-document",
  title: "其他数据",
  menuItem: [{
    index: "list_group",
    route: "/list_common?type=group",
    title: "分组"
  }, {
    index: "list_html_api_category",
    route: "/list_common?type=html_api_category",
    title: "Html-API分类"
  }, {
    index: "list_css_api_category",
    route: "/list_common?type=css_api_category",
    title: "Css-API分类"
  }, {
    index: "list_js_api_category",
    route: "/list_common?type=js_api_category",
    title: "Javascript-API分类"
  }, {
    index: "list_note_category",
    route: "/list_common?type=note_category",
    title: "笔记分类"
  }]
}, {
  index: "systemManage",
  icon: "el-icon-setting",
  title: "系统管理",
  menuItem: [{
    index: "list_data_type",
    route: "/list_common?type=data_type",
    title: "数据类型"
  }, {
    index: "list_all",
    route: "/list_common?type=all",
    title: "所有数据"
  }, {
    index: "list_relation",
    route: "/list_common?type=relation",
    title: "关系数据"
  }, {
    index: "list_familiarity",
    route: "/list_common?type=familiarity",
    title: "熟悉度"
  }, {
    index: "list_admin",
    route: "/list_common?type=admin",
    title: "管理员"
  }, { index: "list_role", route: "/list_role", title: "角色" }]
}];
//#endregion

//#region 路由配置
PUB.arrRouteListName = ["modify_password", "list_article_category", "list_article", "list_admin", "list_role", "list_html_api", "list_css_api", "list_js_api", "list_note", "list_all", "listHome", "list_common"];

//#region 列表模块名数组配置
//变量：{列表名数组}
PUB.arrListName = ["admin", "role", "html_api", "html_api_category", "css_api", "css_api_category", "js_api", "js_api_category", "url", "article", "article_category", "note", "note_category", "vedio", "familiarity", "relation", "group", "all", "data_type", "exercises", "front_demo"];
//#endregion
//#region 分组数据列表页模块引用配置
//变量：{分组数据列表的模块名称数组}-会在导入js配置文件时用到
PUB.arrDetailGroupMoudles = ["note", "group", "url", "vedio"];

//#endregion  

//变量：{特殊的分组数据列表模块名称数组}-需要有单独对应的分组列表模板vue-会在导入vue文件时用到
PUB.arrGroupMoudlesSpe = ["note", "group"];

//#region window.FN函数库
window.FN = {}; //存放本站公共函数的对象
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

    var minSort, tableData, docLast, sortStart, arrDataAdd, urlAdd, ajaxParam, response;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            minSort = this.$refs.listData.tableData;
            tableData = this.$refs.listData.tableData;
            docLast = tableData.slice(-1); //最后一个元素

            sortStart = lodash.get(docLast, "[0].sort", 9999);
            arrDataAdd = arr.map(function (doc) {
              return {
                sort: --sortStart,
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
            _context2.next = 10;
            return axios({
              //请求接口
              method: "post",
              url: PUB.domain + urlAdd,
              data: ajaxParam //传递参数
            });

          case 10:
            response = _context2.sent;


            this.$message.success("添加数据成功");
            this.arrSelect2 = []; //清除该数组，否则越积越多
            this.$refs.listData.getDataList(); //列表更新

          case 14:
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

//函数：{初始化处理arrLookup数组函数}
FN.initArrLookup = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
  var arrLookupFromScore, formDataSearch, isValid, arrLookupSearch, arrLookupFixed, arrLookup;
  return regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
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
            $project: {
              _id: 1,
              _idRel: 1,
              _idRel2: 1,
              sort: 1, //序号获取
              title: "$targetDoc.title",
              importance: "$targetDoc.importance",
              category: "$targetDoc.category",
              difficulty: "$targetDoc.difficulty"
            }
          }];
          arrLookup = [].concat(arrLookupFixed, _toConsumableArray(arrLookupFromScore), arrLookupSearch);

          this.$set(this.cfList.objParamAddon, "arrLookup", arrLookup);

          //****计分板统计分数需要的arrLookup数组由2部分组成：固定的查询，上方表单的筛选参数
          this.arrLookupScore = [].concat(arrLookupFixed, arrLookupSearch);

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3, this);
}));

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
var sBtnGDataDetail = {
  uiType: "link",
  text: "查看详情",
  target: "_blank",
  //地址格式函数
  urlFormatter: function urlFormatter(row) {
    return "#/detail_data?dataId=" + row._idRel2;
  }
};

var sBtnLink = {
  uiType: "link",
  text: "打开链接",
  target: "_blank",
  urlFormatter: function urlFormatter(row) {
    return "" + row.link;
  }
};
PUB.singleBtns_copy_detail = {
  addon: [].concat(_toConsumableArray(util.cfList.sBtns.arrAllBtns), [sBtnDetail])
};

PUB.singleBtns_copy_detail_sort = {
  addon: [].concat(_toConsumableArray(util.cfList.sBtns.arrAllBtns), _toConsumableArray(util.cfList.sBtns.arrSortBtns), [sBtnGDataDetail])
};

PUB.listCFCommon2 = {
  url: PUB.listUrl,
  columnOperate: { "min-width": 230 },
  //列表单项操作按钮的配置
  singleBtns: PUB.singleBtns_copy_detail
};
PUB.singleBtns_copy_link = {
  addon: [].concat(_toConsumableArray(util.cfList.sBtns.arrAllBtns), [sBtnLink])
};

PUB.singleBtns_copy_link_sort = {
  addon: [].concat(_toConsumableArray(util.cfList.sBtns.arrAllBtns), _toConsumableArray(util.cfList.sBtns.arrSortBtns), [sBtnLink])
};

PUB.listCFCommon3 = {
  url: PUB.listUrl,
  columnOperate: { "min-width": 230 },
  //列表单项操作按钮的配置
  singleBtns: PUB.singleBtns_copy_link
};
PUB.singleBtns4 = {
  addon: [].concat(_toConsumableArray(util.cfList.sBtns.arrAllBtns), [sBtnDetail, sBtnLink])
  //第四套-有详情和链接按钮
};PUB.listCFCommon4 = {
  url: PUB.listUrl,
  columnOperate: { "min-width": 270 },
  //列表单项操作按钮的配置
  singleBtns: PUB.singleBtns4
  //函数：{补充熟悉度ajax配置（动态数据字典）函数}
};window.setFamiliarityAjaxCF = function (listCF) {
  var idKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "_id";

  util.setObjDefault(listCF, { dynamicDict: [] });
  var dict = {
    ajax: {
      param: { _systemId: _systemId, _dataType: "familiarity", findJson: { userId: PUB.userId } },
      url: "/info/getCommonList"
    },
    populateColumn: "familiarityDoc",
    idColumn: idKey,
    idColumn2: "_idRel"
  };
  listCF.dynamicDict.push(dict);
};
//#endregion

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
      arrSelect2: [],
      cfSelectList2: {
        hideCollection: true,
        dataName: lodash.get(DYDICT, "dataType." + this.dataType + ".label"),
        valueKey: "_id",
        labelKey: "title",
        pageName: "tangball_article",
        multiple: true, //多选
        //需要保留的集合字段
        selectJson: {
          _id: 1,
          title: 1
        },
        cfList: util.deepCopy(PUB.listCF["list_" + this.dataType])
      },
      //查询表单配置
      cfFormSearch: {
        inline: true,
        size: "mini",
        formItems: [F_ITEMS.importance],
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
    //函数：{单条数据操作事件}
    singleEvent: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(actionType, doc) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return util.ajaxGroupDataSort(actionType, doc);

              case 2:
                this.$refs.listData.getDataList(); //列表更新

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function singleEvent(_x4, _x5) {
        return _ref6.apply(this, arguments);
      }

      return singleEvent;
    }(),

    //函数：{选择并添加数据后的ajax操作函数}
    afterSelect: FN.ajaxGroupAddSelectData,
    //函数：{初始化处理arrLookup数组函数}
    initArrLookup: FN.initArrLookup,
    //函数：{查询表单提交的回调函数}
    searchList: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this.initArrLookup(); //调用：{初始化处理arrLookup数组函数}
                _context5.next = 3;
                return this.$nextTick();

              case 3:
                //延迟到视图更新
                this.$refs.listData.getDataList(); //列表更新

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function searchList() {
        return _ref7.apply(this, arguments);
      }

      return searchList;
    }(),

    //函数：{列表查询后的回调函数}
    afterSearch: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(list) {
        var arrId;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                arrId = list.map(function (doc) {
                  return doc._idRel2;
                });
                //设置id数组

                this.$refs.scorePanel.ajaxGetScore(); //调用：{ajax获取分数函数}
                if (this.$refs.scorePanel.focusId == undefined) {
                  //如果没有筛选熟悉度（这里的触发机制还需进一步优化，没有必要一直调用）
                  this.updateGroupCountData(); //调用：{更新当前分组的数据量的函数}
                }

              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function afterSearch(_x6) {
        return _ref8.apply(this, arguments);
      }

      return afterSearch;
    }(),

    //函数：{更新当前分组的数据量的函数}
    updateGroupCountData: function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var urlModify, ajaxParam, response;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                urlModify = PUB.listCF.list_group.url.modify;
                ajaxParam = {
                  _id: this.groupId,
                  _data: { countData: this.$refs.listData.allCount //获取列表的数据总量
                  } };

                Object.assign(ajaxParam, PUB.listCF.list_group.paramAddonPublic); //合并公共参数
                _context7.next = 5;
                return axios({
                  //请求接口
                  method: "post",
                  url: PUB.domain + urlModify,
                  data: ajaxParam //传递参数
                });

              case 5:
                response = _context7.sent;

              case 6:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function updateGroupCountData() {
        return _ref9.apply(this, arguments);
      }

      return updateGroupCountData;
    }()
  },
  created: function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              console.log("created##########-1");
              this.cfList.customDetail = true; //开启自定义详情弹窗
              this.$set(this.cfList.objParamAddon.findJson, "_idRel", this.groupId);
              this.initArrLookup(); //调用：{初始化处理arrLookup数组函数}
              this.ready = true;
              //补充熟悉度ajax配置（动态数据字典）,注意要传_idRel2
              window.setFamiliarityAjaxCF(this.cfList, "_idRel2");

            case 6:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function created() {
      return _ref10.apply(this, arguments);
    }

    return created;
  }()
};
//#endregion