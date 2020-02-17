
//#region window.FN函数库
window.FN = {}//存放本站公共函数的对象
//函数：{ajax根据关键词获取关联数据列表的函数}
FN.ajaxlistBykeyword = async function ({ param = {} }) {
    let { data } = await axios({
        //请求接口
        method: "post",
        url: `${PUB.domain}/info/getListBykeyword`,
        data: param
    });
    return data.list;
}

//函数：{分组追加选中数据列表的函数}
FN.ajaxGroupAddSelectData = async function (arr) {
    let minSort = this.$refs.listData.tableData;
    let { tableData } = this.$refs.listData;
    let docLast = tableData.slice(-1); //最后一个元素
    let sortStart = lodash.get(docLast, `[0].sort`, 9999);
    let arrDataAdd = arr.map(doc => {
        return {
            sort: --sortStart,
            _idRel: this.groupId,
            _idRel2: doc._id
        };
    });
    // return;

    let urlAdd = PUB.listCF.list_relation.url.add;
    let ajaxParam = {
        _data: arrDataAdd
    };
    Object.assign(ajaxParam, PUB.listCF.list_relation.paramAddonPublic); //合并公共参数
    let response = await axios({
        //请求接口
        method: "post",
        url: PUB.domain + urlAdd,
        data: ajaxParam //传递参数
    });

    this.$message.success("添加数据成功");
    this.arrSelect2 = []; //清除该数组，否则越积越多
    this.$refs.listData.getDataList(); //列表更新
}



//函数：{初始化处理arrLookup数组函数}
FN.initArrLookup = async function () {
    //****列表查询arrLookup数组由3部分组成：固定的查询，计分板的筛选参数，上方表单的筛选参数
    let arrLookupFromScore = this.arrLookup || []; //来自计分板筛选的arrLookup
    let formDataSearch = lodash.cloneDeep(this.formDataSearch); //深拷贝
    util.clearObj(formDataSearch); //调用：{清除对象中的空属性（null,undefined,空格等）}
    let isValid = util.isNotEmptyObj(formDataSearch); //调用：{判断是否为非空对象的函数}
    let arrLookupSearch = [];
    if (isValid) {
        //如果是非空对象
        arrLookupSearch.push({
            $match: {
                ...formDataSearch //**** */
            }
        });
    }

    //补充联合查询参数，很复杂！！！！

    //固定的查询部分
    let arrLookupFixed = [
        {
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
        }
    ];

    let arrLookup = [
        ...arrLookupFixed,
        ...arrLookupFromScore,
        ...arrLookupSearch
    ];
    this.$set(this.cfList.objParamAddon, "arrLookup", arrLookup);

    //****计分板统计分数需要的arrLookup数组由2部分组成：固定的查询，上方表单的筛选参数
    this.arrLookupScore = [...arrLookupFixed, ...arrLookupSearch];
}

//#endregion


//#region 公共字典对象配置
PUB.objDictArr = {
    taskType: [
        { value: 1, label: "新需求" },
        { value: 2, label: "bug" },
        { value: 3, label: "其他" }
    ],
    difficulty: [
        { value: 1, label: "简单" },
        { value: 2, label: "一般" },
        { value: 3, label: "困难" },
        { value: 4, label: "很难" }
    ],
    prior: [
        { value: 1, label: "很高" },
        { value: 2, label: "高" },
        { value: 3, label: "中" },
        { value: 4, label: "低" }
    ],
    complete: [
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
    ],
    complete2: [
        { value: 1, label: "未开始" },//complete==0
        { value: 2, label: "进行中" },//complete>0&&complete>1
        { value: 3, label: "已完成" },//complete>0&&complete>1
    ],
}
//{"P7": Im,"P5":{ $gte: DataStart,$lte: DataEnd } }
PUB.dict = {};//公共数据字典对象，里面会有多个子数据字典对象
//for of循环遍历对象，for of不能直接处理对象，本质上是同个Object.keys拼装一个新数组进行辅助
for (var key of Object.keys(PUB.objDictArr)) {
    PUB.dict[key] = {}
    let arrOpt = PUB.objDictArr[key];
    arrOpt.forEach(itemEach => {//循环：{000数组}
        PUB.dict[key][itemEach.value] = itemEach
    })
}
/**
    * @name 获取数据字典值函数
    * @param dictName字典名，value值
    */
PUB.formatterDict = function (dictName, value) {
    return lodash.get(PUB.dict, `${dictName}.${value}.label`);
}
//#endregion


//#region 其他公共变量
//公共的列表对象
PUB.listCF = {}
PUB.listUrl = {
    list: `/info/getCommonList`, //列表接口
    add: "/info/commonAdd", //新增接口
    modify: "/info/commonModify", //修改接口
    detail: "/info/commonDetail",
    delete: "/info/commonDelete" //删除接口
}
PUB.listCFCommon = {
    url: PUB.listUrl,
    columnOperate: { "min-width": 160 },
    //列表单项操作按钮的配置
    singleBtns: {
        addon: [
            util.cfList.sBtns.detail,
            util.cfList.sBtns.modify,
            util.cfList.sBtns.delete,
        ]
    },
}
let sBtnDetail = {
    uiType: "link",
    text: "详情",
    target: "_blank",
    //地址格式函数
    urlFormatter: function (row) {
        return `#/detail_data?dataId=${row._id}`;
    }
}
let sBtnGDataDetail = {
    uiType: "link",
    text: "查看详情",
    target: "_blank",
    //地址格式函数
    urlFormatter: function (row) {
        return `#/detail_data?dataId=${row._idRel2}`;
    },
}



let sBtnLink = {
    uiType: "link",
    text: "打开链接",
    target: "_blank",
    urlFormatter: function (row) {
        return `${row.link}`;
    },
}
PUB.singleBtns_copy_detail = {
    addon: [
        ...util.cfList.sBtns.arrAllBtns,
        sBtnDetail,
    ]
}

PUB.singleBtns_copy_detail_sort = {
    addon: [
        ...util.cfList.sBtns.arrAllBtns,
        ...util.cfList.sBtns.arrSortBtns,
        sBtnGDataDetail,
    ]
}



PUB.listCFCommon2 = {
    url: PUB.listUrl,
    columnOperate: { "min-width": 230 },
    //列表单项操作按钮的配置
    singleBtns: PUB.singleBtns_copy_detail,
}
PUB.singleBtns_copy_link = {
    addon: [
        ...util.cfList.sBtns.arrAllBtns,

        sBtnLink,
    ]
}

PUB.singleBtns_copy_link_sort = {
    addon: [
        ...util.cfList.sBtns.arrAllBtns,
        ...util.cfList.sBtns.arrSortBtns,
        sBtnLink,
    ]
}



PUB.listCFCommon3 = {
    url: PUB.listUrl,
    columnOperate: { "min-width": 230 },
    //列表单项操作按钮的配置
    singleBtns: PUB.singleBtns_copy_link,
}
PUB.singleBtns4 = {
    addon: [
        ...util.cfList.sBtns.arrAllBtns,
        sBtnDetail,
        sBtnLink,
    ]
}
//第四套-有详情和链接按钮
PUB.listCFCommon4 = {
    url: PUB.listUrl,
    columnOperate: { "min-width": 290 },
    //列表单项操作按钮的配置
    singleBtns: PUB.singleBtns4,
}
//函数：{补充熟悉度ajax配置（动态数据字典）函数}
window.setFamiliarityAjaxCF = function (listCF, idKey = "_id") {
    util.setObjDefault(listCF, { dynamicDict: [] });
    let dict = {
        ajax: {
            param: { _systemId, _dataType: "familiarity", findJson: { userId: PUB.userId }, },
            url: "/info/getCommonList",
        },
        populateColumn: "familiarityDoc",
        idColumn: idKey,
        idColumn2: "_idRel"
    }
    listCF.dynamicDict.push(dict)
}
//#endregion

//#region MIX混入

MIX.listGroupData = {
    props: {
        groupDoc: {},
        groupId: {},
        dataType: {
            default: "note"
        },//数据类型

    },
    data() {
        return {
            arrSelect2: [],
            cfSelectList2: {
                hideCollection: true,
                dataName: lodash.get(DYDICT, `dataType.${this.dataType}.label`),
                valueKey: "_id",
                labelKey: "title",
                pageName: "tangball_article",
                multiple: true, //多选
                //需要保留的集合字段
                selectJson: {
                    _id: 1,
                    title: 1
                },
                cfList: util.deepCopy(PUB.listCF[`list_${this.dataType}`])
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
            cfList: util.deepCopy(PUB.listCF[`detail_group_${this.dataType}`]),
            arrLookupScore: null //计分板需要联合查询配置数组-
        };
    },
    computed: {
        //用于监听变化
        arrLookup: function () {
            return this.$store.state.arrLookup[this.cfList.listIndex];
        }
    },
    methods: {
        //函数：{单条数据操作事件}
        async singleEvent(actionType, doc) {
            await util.ajaxGroupDataSort(actionType, doc);
            this.$refs.listData.getDataList(); //列表更新
        },
        //函数：{选择并添加数据后的ajax操作函数}
        afterSelect: FN.ajaxGroupAddSelectData,
        //函数：{初始化处理arrLookup数组函数}
        initArrLookup: FN.initArrLookup,
        //函数：{查询表单提交的回调函数}
        async searchList() {
            this.initArrLookup(); //调用：{初始化处理arrLookup数组函数}
            await this.$nextTick(); //延迟到视图更新
            this.$refs.listData.getDataList(); //列表更新
        },
        //函数：{列表查询后的回调函数}
        async afterSearch(list) {
            let arrId = list.map(doc => doc._idRel2);
            //设置id数组
            this.$refs.scorePanel.ajaxGetScore(); //调用：{ajax获取分数函数}
            if (this.$refs.scorePanel.focusId == undefined) {
                //如果没有筛选熟悉度（这里的触发机制还需进一步优化，没有必要一直调用）
                this.updateGroupCountData(); //调用：{更新当前分组的数据量的函数}
            }
        },
        //函数：{更新当前分组的数据量的函数}
        async updateGroupCountData() {
            let urlModify = PUB.listCF.list_group.url.modify;
            let ajaxParam = {
                _id: this.groupId,
                _data: { countData: this.$refs.listData.allCount } //获取列表的数据总量
            };
            Object.assign(ajaxParam, PUB.listCF.list_group.paramAddonPublic); //合并公共参数
            let response = await axios({
                //请求接口
                method: "post",
                url: PUB.domain + urlModify,
                data: ajaxParam //传递参数
            });
        },

    },
    async created() {
        console.log("created##########-1");
        this.cfList.customDetail = true; //开启自定义详情弹窗
        this.$set(this.cfList.objParamAddon.findJson, "_idRel", this.groupId);
        this.initArrLookup(); //调用：{初始化处理arrLookup数组函数}
        this.ready = true;
        //补充熟悉度ajax配置（动态数据字典）,注意要传_idRel2
        window.setFamiliarityAjaxCF(this.cfList, "_idRel2");
    }
}
//#endregion

let _systemId = PUB._systemId;

//#region 【多】标准列表页配置
//#region 管理员列表页
{
    let _dataType = "admin";

    PUB.listCF.list_admin = {
        idKey: "_id", //键名
        pageSize: 20,
        listIndex: "list_admin", //vuex对应的字段~
        focusMenu: true, //进行菜单聚焦
        threeTitle: "管理员", //面包屑2级菜单
        ...PUB.listCFCommon2,//展开公共配置
        //objParamAddon列表接口的附加参数
        objParamAddon: {
            _systemId,
            _dataType
        },
        //公共的附加参数，针对所有接口
        paramAddonPublic: {
            _systemId,
            _dataType
        },
        //-------列配置数组-------
        columns: [
            COLUMNS.Id,
            COLUMNS.userName,
            COLUMNS.passWord,
            COLUMNS.nickName,
            COLUMNS.role,
        ],
        //-------筛选表单字段数组-------
        searchFormItems: [
            F_ITEMS.Id,
        ],
        //-------详情字段数组-------
        detailItems: [
            D_ITEMS.Id,
            D_ITEMS.userName,
            D_ITEMS.passWord,
        ],
        //-------新增、修改表单字段数组-------
        formItems: [
            F_ITEMS.userName,
            F_ITEMS.passWord,
            F_ITEMS.nickName,
            F_ITEMS.role,
        ]
    }

}
//#endregion

//#region 所有数据列表页
{

    let _dataType = "$all";

    PUB.listCF.list_all = {
        idKey: "_id", //键名
        pageSize: 20,
        listIndex: "list_all", //vuex对应的字段~
        focusMenu: true, //进行菜单聚焦
        breadcrumb: [
            { value: "首页", path: "#/listHome" },
            { value: "所有数据" }
        ],
        ...PUB.listCFCommon2,//展开公共配置
        objParamAddon: {
            _systemId,
            _dataType
        },
        //公共的附加参数，针对所有接口
        paramAddonPublic: {
            _systemId,
            _dataType
        },
        //-------列配置数组-------
        columns: [COLUMNS.title_fixed, COLUMNS.desc],
        //-------筛选表单字段数组-------
        searchFormItems: [F_ITEMS.title_search],
        //-------详情字段数组-------
        detailItems: [D_ITEMS.title, D_ITEMS.desc],
        //-------新增、修改表单字段数组-------
        formItems: [
            F_ITEMS.title,
            F_ITEMS.desc,
        ]
    }

}
//#endregion

//#region 文章分类列表页
{

    let _dataType = "article_category";
    PUB.listCF.list_article_category = {
        idKey: "_id", //键名
        pageSize: 20,
        listIndex: "list_article_category", //vuex对应的字段~
        focusMenu: true, //进行菜单聚焦
        threeTitle: "文章分类", //面包屑2级菜单
        ...PUB.listCFCommon2,//展开公共配置
        //objParamAddon列表接口的附加参数
        objParamAddon: {
            _systemId,
            _dataType
        },
        //公共的附加参数，针对所有接口
        paramAddonPublic: {
            _systemId,
            _dataType
        },
        //-------列配置数组-------
        columns: [

            COLUMNS.category_name,
            COLUMNS.category_remark,

        ],
        //-------筛选表单字段数组-------
        searchFormItems: [
            F_ITEMS.category_name,
        ],
        //-------详情字段数组-------
        detailItems: [

            D_ITEMS.category_name,
            D_ITEMS.category_remark,
        ],
        //-------新增、修改表单字段数组-------
        formItems: [
            F_ITEMS.category_name,
            F_ITEMS.category_remark,
        ]
    }

}
//#endregion

//#region 文章列表页
{

    let _dataType = "article";
    PUB.listCF.list_article = {
        idKey: "_id", //键名
        pageSize: 20,
        listIndex: "list_article", //vuex对应的字段~
        focusMenu: true, //进行菜单聚焦
        threeTitle: "文章", //面包屑2级菜单
        ...PUB.listCFCommon2,//展开公共配置
        //objParamAddon列表接口的附加参数
        objParamAddon: {
            _systemId,
            _dataType
        },
        //公共的附加参数，针对所有接口
        paramAddonPublic: {
            _systemId,
            _dataType
        },
        //-------列配置数组-------
        columns: [COLUMNS.title_fixed, COLUMNS.desc],
        //-------筛选表单字段数组-------
        searchFormItems: [F_ITEMS.title_search],
        //-------详情字段数组-------
        detailItems: [D_ITEMS.title, D_ITEMS.desc],
        //-------新增、修改表单字段数组-------
        formItems: [
            F_ITEMS.title,
            F_ITEMS.desc,
            F_ITEMS.detail,
        ]
    }

}
//#endregion

//#region 数据类型列表页
{

    let _dataType = "data_type";

    PUB.listCF.list_data_type = {
        idKey: "_id", //键名
        pageSize: 20,
        listIndex: "list_data_type", //vuex对应的字段~
        focusMenu: true, //进行菜单聚焦
        breadcrumb: [
            { value: "首页", path: "#/listHome" },
            { value: "数据类型" }
        ],
        ...PUB.listCFCommon2,//展开公共配置
        //objParamAddon列表接口的附加参数
        objParamAddon: {
            _systemId,
            _dataType
        },
        //公共的附加参数，针对所有接口
        paramAddonPublic: {
            _systemId,
            _dataType
        },
        //-------列配置数组-------
        columns: [COLUMNS.title_fixed, COLUMNS.dataTypekey, COLUMNS.desc],
        //-------筛选表单字段数组-------
        searchFormItems: [F_ITEMS.title_search, F_ITEMS.dataTypekey],
        //-------详情字段数组-------
        detailItems: [D_ITEMS._id, D_ITEMS.dataTypekey, D_ITEMS.title, D_ITEMS.desc,],
        //-------新增、修改表单字段数组-------
        formItems: [
            F_ITEMS.dataTypekey,
            F_ITEMS.title,
            F_ITEMS.desc,


        ]
    }

}
//#endregion

//#region 分组列表页
{

    let _dataType = "group";

    PUB.listCF.list_group = {
        idKey: "_id", //键名
        pageSize: 20,
        listIndex: "list_group", //vuex对应的字段~
        focusMenu: true, //进行菜单聚焦
        breadcrumb: [
            { value: "首页", path: "#/listHome" },
            { value: "分组" }
        ],
        ...PUB.listCFCommon,//展开公共配置
        //列表单项操作按钮的配置
        singleBtns: {
            addon: [
                ...util.cfList.sBtns.arrAllBtns,
                {
                    uiType: "link",
                    text: "分组详情",
                    target: "_blank",
                    url: "#/detail_group?groupId=" //这里要配置好参数名，内部会把参数加进来
                }
            ]
        },
        objParamAddon: {
            _systemId,
            _dataType
        },
        //公共的附加参数，针对所有接口
        paramAddonPublic: {
            _systemId,
            _dataType
        },
        //-------列配置数组-------
        columns: [COLUMNS.title_fixed, COLUMNS._id, COLUMNS.alias, COLUMNS.desc, COLUMNS.group_dataType],
        //-------筛选表单字段数组-------
        searchFormItems: [F_ITEMS.title_search],
        //-------详情字段数组-------
        detailItems: [D_ITEMS._id, D_ITEMS.title, D_ITEMS.desc, D_ITEMS.group_dataType],
        //-------新增、修改表单字段数组-------
        formItems: [
            F_ITEMS.title,
            F_ITEMS.alias,
            F_ITEMS.group_dataType,
            F_ITEMS.desc,


        ]
    }

}
//#endregion

//#region 笔记分类列表页
{

    let _dataType = "note_category";
    PUB.listCF.list_note_category = {
        idKey: "_id", //键名
        pageSize: 20,
        listIndex: "list_note_category", //vuex对应的字段~
        focusMenu: true, //进行菜单聚焦
        breadcrumb: [
            { value: "首页", path: "#/listHome" },
            { value: "笔记分类" }
        ],
        ...PUB.listCFCommon2,//展开公共配置
        //objParamAddon列表接口的附加参数
        objParamAddon: {
            _systemId,
            _dataType
        },
        //公共的附加参数，针对所有接口
        paramAddonPublic: {
            _systemId,
            _dataType
        },
        //-------列配置数组-------
        columns: [COLUMNS.title_fixed, COLUMNS.desc, COLUMNS.category],
        //-------筛选表单字段数组-------
        searchFormItems: [F_ITEMS.title_search],
        //-------详情字段数组-------
        detailItems: [D_ITEMS.title, D_ITEMS.desc, D_ITEMS.category],
        //-------新增、修改表单字段数组-------
        formItems: [
            F_ITEMS.title,
            F_ITEMS.desc,

        ]
    }

}
//#endregion

//#region 笔记列表页
{

    let _dataType = "note";
    PUB.listCF.list_note = {
        idKey: "_id", //键名
        pageSize: 20,
        listIndex: "list_note", //vuex对应的字段~
        focusMenu: true, //进行菜单聚焦
        breadcrumb: [
            { value: "首页", path: "#/listHome" },
            { value: "笔记" }
        ],
        ...PUB.listCFCommon2,//展开公共配置
        //批量操作按钮的配置
        batchBtns: {
            addon: [
                util.cfList.bBtns.add,
                util.cfList.bBtns.delete,
                { uiType: "slot", slot: "slot_in_toolbar" }
            ],
        },
        //dynamicDict动态数据字典配置
        dynamicDict: [
            DYDICT.note_category
        ],
        //objParamAddon列表接口的附加参数
        objParamAddon: {
            _systemId,
            _dataType,
            //传入联表查询参数
            arrLookup: []
        },
        //公共的附加参数，针对所有接口
        paramAddonPublic: {
            _systemId,
            _dataType
        },

        //操作列配置
        columnOperate: {
            "min-width": 210
        },
        //-------列配置数组-------
        columns: [COLUMNS._id, COLUMNS.title_fixed_edit, COLUMNS.countGroup, COLUMNS.keyword_edit, COLUMNS.familiarity_select, COLUMNS.importance_edit, COLUMNS.difficulty_edit, COLUMNS.category_multiple, COLUMNS.demoList],
        //-------筛选表单字段数组-------
        searchFormItems: [F_ITEMS.title_search, F_ITEMS.note_category, F_ITEMS.importance, F_ITEMS.difficulty, F_ITEMS.countGroup],
        //-------详情字段数组-------
        detailItems: [D_ITEMS.title, D_ITEMS.keyword, D_ITEMS.detail, D_ITEMS.desc, D_ITEMS.category, D_ITEMS.importance, D_ITEMS.difficulty, D_ITEMS._id, D_ITEMS.demoList, D_ITEMS.note_linkList, D_ITEMS.note_noteList],
        //-------新增、修改表单字段数组-------
        formItems: [
            F_ITEMS.title,
            F_ITEMS.link,
            F_ITEMS.importance_radio,
            F_ITEMS.difficulty_radio,
            F_ITEMS.keyword,
            F_ITEMS.note_category,
            F_ITEMS.desc,
            F_ITEMS.detail,


            //F_ITEMS.demoList,
            //F_ITEMS.note_linkList
        ]
    }

}
//#endregion

//#region 关系列表页
{

    let _dataType = "relation";

    PUB.listCF.list_relation = {
        idKey: "_id", //键名
        pageSize: 20,
        listIndex: "list_relation", //vuex对应的字段~
        focusMenu: true, //进行菜单聚焦
        breadcrumb: [
            { value: "首页", path: "#/listHome" },
            { value: "关系数据" }
        ],
        ...PUB.listCFCommon2,//展开公共配置
        objParamAddon: {
            _systemId,
            _dataType
        },
        //公共的附加参数，针对所有接口
        paramAddonPublic: {
            _systemId,
            _dataType
        },
        //-------列配置数组-------
        columns: [COLUMNS._id, COLUMNS._idRel, COLUMNS._idRel2, COLUMNS.sort],
        //-------筛选表单字段数组-------
        searchFormItems: [F_ITEMS._idRel, F_ITEMS._idRel2,],
        //-------详情字段数组-------
        detailItems: [D_ITEMS._id, D_ITEMS._idRel, D_ITEMS._idRel2, D_ITEMS.sort],
        //-------新增、修改表单字段数组-------
        formItems: [F_ITEMS._idRel, F_ITEMS._idRel2, F_ITEMS.sort,]
    }

}
//#endregion

//#region 角色列表页
{
    let _dataType = "role";
    PUB.listCF.list_role = {
        idKey: "_id", //键名
        pageSize: 20,
        listIndex: "list_role", //vuex对应的字段~
        focusMenu: true, //进行菜单聚焦
        threeTitle: "角色", //面包屑2级菜单
        ...PUB.listCFCommon2,//展开公共配置
        objParamAddon: {
            _systemId,
            _dataType
        },
        //公共的附加参数，针对所有接口
        paramAddonPublic: {
            _systemId,
            _dataType
        },
        //-------列配置数组-------

        columns: [
            COLUMNS.Id,
            COLUMNS.roleName,
            COLUMNS.rolePower
        ],
        //-------筛选表单字段数组-------
        searchFormItems: [
            F_ITEMS.Id
        ],
        //-------详情字段数组-------
        detailItems: [
            COLUMNS.Id,
            COLUMNS.roleName,
            COLUMNS.rolePower
        ],
        //-------新增、修改表单字段数组-------
        formItems: [
            COLUMNS.roleName,
            COLUMNS.rolePower,
        ]
    }

}
//#endregion

//#region 网址列表页
{

    let _dataType = "url";

    PUB.listCF.list_url = {
        idKey: "_id", //键名
        pageSize: 20,
        listIndex: "list_url", //vuex对应的字段~
        focusMenu: true, //进行菜单聚焦
        breadcrumb: [
            { value: "首页", path: "#/listHome" },
            { value: "网址" }
        ],
        ...PUB.listCFCommon3,//展开公共配置
        //objParamAddon列表接口的附加参数
        // singleBtns:PUB.singleBtns_copy_link_sort,
        objParamAddon: {
            _systemId,
            _dataType
        },
        //公共的附加参数，针对所有接口
        paramAddonPublic: {
            _systemId,
            _dataType
        },

        //-------列配置数组-------
        columns: [COLUMNS.title_fixed, COLUMNS._id, COLUMNS.desc, COLUMNS.link,],
        //-------筛选表单字段数组-------
        searchFormItems: [F_ITEMS.title_search],
        //-------详情字段数组-------
        detailItems: [D_ITEMS.title, D_ITEMS.desc, D_ITEMS.link,],
        //-------新增、修改表单字段数组-------
        formItems: [
            F_ITEMS.title,
            F_ITEMS.link,
            F_ITEMS.desc,
            F_ITEMS.album,

        ]
    }

}
//#endregion

//#region 视频列表页
{

    let _dataType = "vedio";

    PUB.listCF.list_vedio = {
        idKey: "_id", //键名
        pageSize: 20,
        listIndex: "list_vedio", //vuex对应的字段~
        focusMenu: true, //进行菜单聚焦
        breadcrumb: [
            { value: "首页", path: "#/listHome" },
            { value: "教学视频" }
        ],
        ...PUB.listCFCommon2,//展开公共配置

        objParamAddon: {
            _systemId,
            _dataType
        },
        //公共的附加参数，针对所有接口
        paramAddonPublic: {
            _systemId,
            _dataType
        },
        //-------列配置数组-------
        columns: [COLUMNS.title_fixed, COLUMNS.keyword_edit, COLUMNS._id, COLUMNS.desc, COLUMNS.vedio, COLUMNS.link],
        //-------筛选表单字段数组-------
        searchFormItems: [F_ITEMS.title_search],
        //-------详情字段数组-------
        detailItems: [D_ITEMS.title, D_ITEMS.desc, D_ITEMS.link, D_ITEMS.vedio, D_ITEMS.detail,],
        //-------新增、修改表单字段数组-------
        formItems: [
            F_ITEMS.title,
            F_ITEMS.keyword,
            F_ITEMS.desc,
            F_ITEMS.link,
            F_ITEMS.vedio,

        ]
    }

}
//#endregion

//#region 000列表页
{

}
//#endregion

//#region 000列表页
{

}
//#endregion

//#endregion



//#region 【多】分组列表配置函数

{

    let _dataType = "relation";



    PUB.listCF.detail_group_group = {
        isShowBreadcrumb: false,//面包屑
        isShowSearchForm: false,//查询表单
        idKey: "_id", //键名
        pageSize: 20,
        listIndex: "detail_group_group", //vuex对应的字段~
        focusMenu: true, //进行菜单聚焦
        ...PUB.listCFCommon,//展开公共配置
        //批量操作按钮的配置
        batchBtns: {

            addon: [
                { uiType: "slot", slot: "slot_btn_select" },
                util.cfList.bBtns.add,

                util.cfList.bBtns.delete,
                { uiType: "slot", slot: "slot_in_toolbar" }
            ],
        },
        //列表单项操作按钮的配置
        singleBtns: {
            addon: [
                // util.cfList.sBtns.detail,
                util.cfList.sBtns.modify,
                util.cfList.sBtns.copy,
                util.cfList.sBtns.delete,

                ...util.cfList.sBtns.arrSortBtns,
                {
                    uiType: "link",
                    text: "查看分组",
                    target: "_blank",
                    //地址格式函数
                    urlFormatter: function (row) {
                        return `#/detail_group?groupId=${row._idRel2}`;
                    },
                }
            ]
        },
        sortJsonDefault: {
            "sort": -1
        },
        findJsonDefault: {

        },
        objParamAddon: {
            findJson: {},

            _systemId,
            _dataType
        },
        //公共的附加参数，针对所有接口
        paramAddonPublic: {
            _systemId,
            _dataType
        },
        //dynamicDict动态数据字典配置
        dynamicDict: [
            DYDICT.note_category
        ],
        //-------列配置数组-------
        columns: [
            // COLUMNS._idRel2,
            COLUMNS.title_fixed,
            COLUMNS.countData,
            COLUMNS.myScore,
            COLUMNS.group_dataType,
            COLUMNS.desc,
            COLUMNS.sort,
        ],
        //-------筛选表单字段数组-------
        searchFormItems: [],
        //-------详情字段数组-------
        detailItems: [D_ITEMS.title, D_ITEMS.desc, D_ITEMS.countData, D_ITEMS._id, D_ITEMS._idRel, D_ITEMS._idRel2, D_ITEMS.sort],
        //-------新增、修改表单字段数组-------
        formItems: [F_ITEMS._idRel, F_ITEMS._idRel2, F_ITEMS.sort,]






    }
    //#endregion


}
//#endregion

//#region 分组下的笔记列表页
{

    let _dataType = "relation";

    PUB.listCF.detail_group_note = {
        isShowBreadcrumb: false,//面包屑
        isShowSearchForm: false,//查询表单-这个去掉会筛选所有数据

        idKey: "_id", //键名
        pageSize: 20,
        listIndex: "detail_group_note", //vuex对应的字段~
        focusMenu: true, //进行菜单聚焦
        ...PUB.listCFCommon,//展开公共配置
        //批量操作按钮的配置
        batchBtns: {

            addon: [
                { uiType: "slot", slot: "slot_btn_select" },
                util.cfList.bBtns.add,
                util.cfList.bBtns.delete,
                { uiType: "slot", slot: "slot_in_toolbar" }
            ],
        },
        //列表单项操作按钮的配置
        singleBtns: PUB.singleBtns_copy_detail_sort,
        sortJsonDefault: {
            "sort": -1
        },
        // findJsonDefault: {

        // },
        objParamAddon: {
            findJson: {},//用了这个就不要使用findJsonDefault
            _systemId,
            _dataType
        },
        //公共的附加参数，针对所有接口
        paramAddonPublic: {
            _systemId,
            _dataType
        },
        //dynamicDict动态数据字典配置
        dynamicDict: [
            DYDICT.note_category
        ],
        //-------列配置数组-------
        columns: [
            // COLUMNS._idRel2,
            COLUMNS.title_fixed,
            // COLUMNS.desc,

            COLUMNS.familiarity_select, COLUMNS.importance, COLUMNS.difficulty,
            COLUMNS.category_multiple,
            COLUMNS.sort,
        ],
        //-------筛选表单字段数组-------
        searchFormItems: [F_ITEMS.importance],
        //-------详情字段数组-------
        detailItems: [D_ITEMS.title, D_ITEMS.detail, D_ITEMS.desc, D_ITEMS.category, D_ITEMS.importance, D_ITEMS._id, D_ITEMS._idRel, D_ITEMS._idRel2, D_ITEMS.sort],
        //-------新增、修改表单字段数组-------
        formItems: [F_ITEMS._idRel, F_ITEMS._idRel2, F_ITEMS.sort,]






    }


}
//#endregion
//#region 分组下的网址列表页
{

    let _dataType = "relation";



    PUB.listCF.detail_group_url = {
        isShowBreadcrumb: false,//面包屑
        isShowSearchForm: false,//查询表单
        idKey: "_id", //键名
        pageSize: 20,
        listIndex: "detail_group_url", //vuex对应的字段~
        focusMenu: true, //进行菜单聚焦

        // ...PUB.listCFCommon,//展开公共配置
        ...PUB.listCFCommon3,//展开公共配置
        singleBtns: PUB.singleBtns_copy_detail_sort,
        batchBtns: {
            addon: [
                { uiType: "slot", slot: "slot_btn_select" },
                util.cfList.bBtns.add,
                util.cfList.bBtns.delete,

            ],
        },
        sortJsonDefault: {
            "sort": -1
        },
        findJsonDefault: {

        },
        objParamAddon: {
            findJson: {},

            _systemId,
            _dataType
        },
        //公共的附加参数，针对所有接口
        paramAddonPublic: {
            _systemId,
            _dataType
        },
        //dynamicDict动态数据字典配置
        dynamicDict: [
            DYDICT.note_category
        ],
        //-------列配置数组-------
        columns: [COLUMNS.title_fixed, COLUMNS._id, COLUMNS.desc, COLUMNS.link, COLUMNS.sort],

        //-------筛选表单字段数组-------
        searchFormItems: [],
        //-------详情字段数组-------
        detailItems: [D_ITEMS.title, D_ITEMS.desc, D_ITEMS.countData, D_ITEMS._id, D_ITEMS._idRel, D_ITEMS._idRel2, D_ITEMS.sort],
        //-------新增、修改表单字段数组-------
        formItems: [F_ITEMS._idRel, F_ITEMS._idRel2, F_ITEMS.sort,]






    }



}
//#endregion

//#region 分组下的视频列表页
{
    let _dataType = "relation";


    PUB.listCF.detail_group_vedio = {
        isShowBreadcrumb: false,//面包屑
        isShowSearchForm: false,//查询表单-
        idKey: "_id", //键名
        pageSize: 20,
        listIndex: "detail_group_vedio", //vuex对应的字段~
        focusMenu: true, //进行菜单聚焦

        // ...PUB.listCFCommon,//展开公共配置
        ...PUB.listCFCommon3,//展开公共配置
        singleBtns: PUB.singleBtns_copy_detail_sort,
        batchBtns: {
            addon: [
                { uiType: "slot", slot: "slot_btn_select" },
                util.cfList.bBtns.add,
                util.cfList.bBtns.delete,

            ],
        },
        sortJsonDefault: {
            "sort": -1
        },
        findJsonDefault: {

        },
        objParamAddon: {
            findJson: {},

            _systemId,
            _dataType
        },
        //公共的附加参数，针对所有接口
        paramAddonPublic: {
            _systemId,
            _dataType
        },
        //dynamicDict动态数据字典配置
        dynamicDict: [
            DYDICT.note_category
        ],
        //-------列配置数组-------
        columns: [COLUMNS.title_fixed, COLUMNS._id, COLUMNS.desc, COLUMNS.link, COLUMNS.sort],

        //-------筛选表单字段数组-------
        searchFormItems: [],
        //-------详情字段数组-------
        detailItems: [D_ITEMS.title, D_ITEMS.desc, D_ITEMS.countData, D_ITEMS._id, D_ITEMS._idRel, D_ITEMS._idRel2, D_ITEMS.sort],
        //-------新增、修改表单字段数组-------
        formItems: [F_ITEMS._idRel, F_ITEMS._idRel2, F_ITEMS.sort,]






    }
    
}
//#endregion
//#region 000列表页
{

}
//#endregion

//#region 000列表页
{

}
//#endregion

//#endregion


