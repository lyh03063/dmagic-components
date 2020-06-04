
    
//let _systemId = PUB._systemId;
PUB.listCF = {};
PUB.$projectAddon = PUB.$projectAddon || {}//分组数据列表页需要补充的拆解字段，用于聚合查询
            
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


//#endregion
            
//函数：{获取数据字典值函数}-dictName字典名，value值
PUB.formatterDict = function (dictName, value) {
    return lodash.get(PUB.dict, `${dictName}.${value}.label`);
}
            
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
            
PUB.sBtnDetail = {
    uiType: "link",
    text: "详情",
    target: "_blank",
    //地址格式函数
    urlFormatter: function (row) {
        return `#/detail_data?dataId=${row._id}`;
    }
}
            
PUB.singleBtns_copy_detail = {
    addon: [
        ...util.cfList.sBtns.arrAllBtns,
        PUB.sBtnDetail,
    ]
}
            
PUB.singleBtns_copy_detail_sort = {
    addon: [
        ...util.cfList.sBtns.arrAllBtns,
        ...util.cfList.sBtns.arrSortBtns,
        util.cfList.sBtns.detailEntity,
    ]
}

            
PUB.listCFCommon2 = {
    url: PUB.listUrl,
    columnOperate: { "min-width": 230 },
    //列表单项操作按钮的配置
    singleBtns: PUB.singleBtns_copy_detail,
    //objParamAddon列表接口的附加参数

}
            
PUB.singleBtns_copy_link = {
    addon: [
        ...util.cfList.sBtns.arrAllBtns,

        util.cfList.sBtns.link,
    ]
}

            
PUB.singleBtns_copy_link_sort = {
    addon: [
        ...util.cfList.sBtns.arrAllBtns,
        ...util.cfList.sBtns.arrSortBtns,
        util.cfList.sBtns.link,
    ]
}
            
PUB.listCFCommon3 = {
    url: PUB.listUrl,
    columnOperate: { "min-width": 230 },
    //列表单项操作按钮的配置
    singleBtns: PUB.singleBtns_copy_link,
    //objParamAddon列表接口的附加参数

}

            
PUB.singleBtns4 = {
    addon: [
        ...util.cfList.sBtns.arrAllBtns,
        PUB.sBtnDetail,
        util.cfList.sBtns.link,
    ]
}
            
//第四套-有详情和链接按钮
PUB.listCFCommon4 = {
    url: PUB.listUrl,
    columnOperate: { "min-width": 290 },
    //列表单项操作按钮的配置
    singleBtns: PUB.singleBtns4,

}

            
PUB.singleBtns5 = {
    addon: [
        ...util.cfList.sBtns.arrAllBtns,
    ]
  }
            
 //第5套-
  PUB.listCFCommon5 = {
    url: PUB.listUrl,
    columnOperate: { "min-width": 160 },
    //列表单项操作按钮的配置
    singleBtns: PUB.singleBtns5,
  
  }
            

PUB.cfListGPublic = {

    isShowBreadcrumb: false, //面包屑
    isShowSearchForm: false, //查询表单-
    idKey: "_id", //键名
    pageSize: 20,
    focusMenu: false, //进行菜单聚焦
    ...PUB.listCFCommon3, //展开公共配置
    singleBtns: PUB.singleBtns_list_group_data,
    batchBtns: {
        addon: [
            { uiType: "slot", slot: "slot_btn_select" },
            util.cfList.bBtns.addEntity,
            util.cfList.bBtns.add,
            util.cfList.bBtns.refresh,

            util.cfList.bBtns.delete,
        ],
    },
    sortJsonDefault: { "sort": -1 },
    findJsonDefault: {},

}
            
//变量：{分组数据列表的单项操作按钮配置}
PUB.singleBtns_list_group_data = {
    addon: [
        util.cfList.sBtns.detail,
        util.cfList.sBtns.modify,
        util.cfList.sBtns.copyEntity,
        util.cfList.sBtns.delete,
        ...util.cfList.sBtns.arrSortBtns,
        util.cfList.sBtns.detailEntity,
    ]
}
            
                
    
window.FN = window.FN || {}//存放本站公共函数的对象
            
//函数：{补充熟悉度ajax配置（动态数据字典）函数}
window.setFamiliarityAjaxCF = function (listCF, idKey = "_id") {
    util.setObjDefault(listCF, { dynamicDict: [] });
    let _systemId = lodash.get(PUB, `_paramAjaxAddon._systemId`, PUB._systemId);//变量：{获取_systemId}
    let dict = {
        ajax: {
            param: {  _dataType: "familiarity", findJson: { userId: PUB.$sys.userId }, },
            url: "/info/getCommonList",
        },
        populateColumn: "familiarityDoc",
        idColumn: idKey,
        idColumn2: "_idRel"
    }
    listCF.dynamicDict.push(dict)//数据字典加入一项
}
//#endregion
            
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
    let { tableData } = this.$refs.listData;
    let docLast = tableData.slice(0); //第一个元素
    let sortStart = lodash.get(docLast, `[0].sort`, 9999);
    let arrDataAdd = arr.map(doc => {
        return {
            sort: ++sortStart,
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
//#endregion
            
//函数：{初始化处理arrLookup数组函数}
FN.initArrLookup = async function (listIndex) {
    let $projectAddon = {};
    if (listIndex) {
        $projectAddon = PUB.$projectAddon[listIndex] || {}
    }
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
                link: "$targetDoc.link",//链接地址
                category: "$targetDoc.category",
                ...$projectAddon,//附加的属性***
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
            readyAddDialogEntity: true,//是否准备好新增实体的弹窗组件-用于复制时重现初始化
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
                dataName: lodash.get(DYDICT, `dataType.${this.dataType}.label`),
                valueKey: "_id",
                labelKey: "title",
                pageName: "tangball_article",
                multiple: true, //多选
                //需要保留的集合字段
                selectJson: { _id: 1, title: 1 },
                cfList: util.deepCopy(PUB.listCF[`list_${this.dataType}`])
            },
            //查询表单配置
            cfFormSearch: {
                inline: true, size: "mini", formItems: [F_ITEMS.importance],
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
        //函数：{单条数据操作事件}-临时
        async singleEvent(actionType, doc) {
            let arrNeedRefresh = ["up", "down", "top", "bottom"]
            if (arrNeedRefresh.includes(actionType)) {//如果是排序类操作
                await util.ajaxGroupDataSort(actionType, doc);
                this.$refs.listData.getDataList(); //列表更新
            }
            let { _idRel2 } = doc
            if (actionType == "edit_entity") {//如果是编辑实体数据
                this.cfEditDialogEntity.cfFormModify.paramAddonInit._id = _idRel2//***修改数据id
                this.cfEditDialogEntity.visible = true;//打开弹窗
            } else if (actionType == "copy_entity") {
                console.log(`doc._id:${doc._id}`);
                this.cfAddDialogEntity.copyId = _idRel2;
                this.readyAddDialogEntity = false;
                await this.$nextTick();//延迟到视图更新
                this.readyAddDialogEntity = true;
                this.cfAddDialogEntity.visible = true;//打开弹窗
            }
        },
        bacthEvent(actionType, doc) {
            if (actionType == "add_entity") {//如果{事件类型}是新增实体
                this.cfAddDialogEntity.visible = true;//打开弹窗
            }
        },
        async afterAddEntity(doc) {
            this.ajaxGroupAddData([doc])//调用：{000函数}
        },
        //函数：{选择并添加数据后的ajax操作函数}
        afterSelect: FN.ajaxGroupAddSelectData,
        ajaxGroupAddData: FN.ajaxGroupAddSelectData,//函数：{添加数据到分组的ajax操作函数}
        //函数：{初始化处理arrLookup数组函数}
        initArrLookup: FN.initArrLookup,
        //函数：{查询表单提交的回调函数}
        async searchList() {
            this.initArrLookup(this.cfList.listIndex); //调用：{初始化处理arrLookup数组函数}
            await this.$nextTick(); //延迟到视图更新
            this.$refs.listData.getDataList(); //列表更新
        },
        //函数：{列表查询后的回调函数}
        async afterSearch(list) {
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
                _id: this.groupId, _data: { countData: this.$refs.listData.allCount } //获取列表的数据总量
            };
            Object.assign(ajaxParam, PUB.listCF.list_group.paramAddonPublic); //合并公共参数
            let response = await axios({
                //请求接口
                method: "post", url: PUB.domain + urlModify,
                data: ajaxParam //传递参数
            });
        },
        //函数：{增加排除当前分组数据的查询条件的函数}
        async excludeCurrGroup() {
            /****************************补充排除当前所属分组的查询参数-START****************************/
            let { cfList } = this.cfSelectList2;
            cfList.objParamAddon = cfList.objParamAddon || {};
            cfList.objParamAddon.findJson = cfList.objParamAddon.findJson || {};
            let findjsonAdd = {
                "$or": [{
                    "_data.arrGroup": {
                        "$elemMatch": {
                            "_idRel": {
                                "$ne": this.groupId//不属于当前分组
                            }
                        }
                    }
                }, {
                    "_data.arrGroup": {
                        "$exists": false//分组不存在
                    }
                }, {
                    "_data.countGroup": 0//分组数为0
                }]
            }
            cfList.objParamAddon.findJson = { ...cfList.objParamAddon.findJson, ...findjsonAdd };
            /****************************补充排除当前所属分组的查询参数-END****************************/
        },
    },
    async created() {
        this.excludeCurrGroup()//调用：{增加排除当前分组数据的查询条件的函数}
        /****************************弱化新增按钮-START****************************/
        let { addon } = this.cfList.batchBtns;
        let itemAdd = addon.find(doc => doc.eventType == "add");
        Object.assign(itemAdd, { text: "新增关联Id", cfElBtn: {} }); //合并对象-
        /****************************弱化新增按钮-END****************************/
        this.cfList.customDetail = true; //开启自定义详情弹窗
        this.$set(this.cfList.objParamAddon.findJson, "_idRel", this.groupId);
        this.initArrLookup(this.cfList.listIndex); //调用：{初始化处理arrLookup数组函数}
        this.ready = true;
        //补充熟悉度ajax配置（动态数据字典）,注意要传_idRel2
        window.setFamiliarityAjaxCF(this.cfList, "_idRel2");
        /****************************补充编辑实体数据按钮-START****************************/
        let sBtnEditEntity = { eventType: "edit_entity", text: "编辑", };
        this.cfList.singleBtns.addon.push(sBtnEditEntity);
        /****************************补充编辑实体数据按钮-END****************************/
    }
}
//#endregion
            
                
    PUB.cfForm = PUB.cfForm || {}
PUB.cfForm.watch = PUB.cfForm.watch || {}
PUB.cfForm.watch.file = {
  //传入监听器
  file(newVal, oldVal) {
    if (!(newVal && newVal.length)) return;//如果不是有效数组，退出
    let doc = lodash.get(newVal, `[0]`)
    let { name } = doc
    console.log(`doc:`, doc);
    if (!this.value.title) {//如果标题是空
      this.value.title = name;
    }
  }
}
                
    
//#region 管理员列表页
{
    let _dataType = "admin";
    let listIndex = `list_${_dataType}`
    PUB.listCF[listIndex] = {
        idKey: "_id", //键名
        pageSize: 20,
        listIndex, //vuex对应的字段~
        focusMenu: true, //进行菜单聚焦
        breadcrumb: [{ value: "首页", path: "listHome" }, { value: "管理员" }],
        ...PUB.listCFCommon5,//展开公共配置
        //objParamAddon列表接口的附加参数
        objParamAddon: { _dataType },
        //公共的附加参数，针对所有接口
        paramAddonPublic: { _dataType },
        //-------详情字段数组-------
        detailItems: ["Id", "userName", "passWord"],
        //-------列配置数组-------
        columns: ["Id", "userName", "nickName", "role"],
        //-------筛选表单字段数组-------
        searchFormItems: ["Id"],
        //-------新增、修改表单字段数组-------
        formItems: ["userName", "passWord", "nickName", "role"],
    }
    //调用：{改造列表字段配置形式的函数（字符串转对象）}
    util.reformCFListItem(PUB.listCF[listIndex])
}
//#endregion
            
//#region 所有数据列表页
{
    let _dataType = "$all";//特殊类型
    PUB.listCF.list_all = {
        idKey: "_id", //键名
        pageSize: 20,
        listIndex: "list_all", //vuex对应的字段~
        focusMenu: true, //进行菜单聚焦
        breadcrumb: [{ value: "首页", path: "listHome" }, { value: "所有数据" }],
        ...PUB.listCFCommon2,//展开公共配置
        objParamAddon: { _dataType },
        //公共的附加参数，针对所有接口
        paramAddonPublic: { _dataType },
        //-------详情字段数组-------
        detailItems: ["title", "desc"],
        //-------列配置数组-------
        columns: ["title_fixed", "desc"],
        //-------筛选表单字段数组-------
        searchFormItems: ["title_search"],
        //-------新增、修改表单字段数组-------
        formItems: ["title", "desc"],
    }
    util.reformCFListItem(PUB.listCF.list_all)
}
//#endregion
            
//#region 文章分类列表页
{
    let _dataType = "article_category";
    let listIndex = `list_${_dataType}`
    PUB.listCF[listIndex] = {
        idKey: "_id", //键名
        pageSize: 20,
        listIndex, //vuex对应的字段~
        focusMenu: true, //进行菜单聚焦
        breadcrumb: [{ value: "首页", path: "listHome" }, { value: "文章分类" }],
        ...PUB.listCFCommon5,//展开公共配置
        //objParamAddon列表接口的附加参数
        objParamAddon: { _dataType },
        //公共的附加参数，针对所有接口
        paramAddonPublic: { _dataType },
        //-------详情字段数组-------
        detailItems: ["category_name", "category_remark"],
        //-------列配置数组-------
        columns: ["category_name", "category_remark"],
        //-------筛选表单字段数组-------
        searchFormItems: ["category_name"],
        //-------新增、修改表单字段数组-------
        formItems: ["category_name", "category_remark"],
    }
    //调用：{改造列表字段配置形式的函数（字符串转对象）}
    util.reformCFListItem(PUB.listCF[listIndex])
}
//#endregion
            
//#region 文章列表页
{
    let _dataType = "article";
    let listIndex = `list_${_dataType}`
    PUB.listCF[listIndex] = {
        idKey: "_id", //键名
        pageSize: 20,
        listIndex, //vuex对应的字段~
        focusMenu: true, //进行菜单聚焦
        breadcrumb: [{ value: "首页", path: "listHome" }, { value: "文章" }],
        ...PUB.listCFCommon2,//展开公共配置
        //objParamAddon列表接口的附加参数
        objParamAddon: { _dataType },
        //公共的附加参数，针对所有接口
        paramAddonPublic: { _dataType },
        //-------详情字段数组-------
        detailItems: ["title", "desc"],
        //-------列配置数组-------
        columns: ["title_fixed", "desc"],
        //-------筛选表单字段数组-------
        searchFormItems: ["title_search"],
        //-------新增、修改表单字段数组-------
        formItems: ["title", "desc", "detail_paste"],
    }
    //调用：{改造列表字段配置形式的函数（字符串转对象）}
    util.reformCFListItem(PUB.listCF[listIndex])
}
//#endregion
            
//#region 数据类型列表页
{
    let _dataType = "data_type"
    let listIndex = `list_${_dataType}`
    PUB.listCF[listIndex] = {
        idKey: "_id", //键名
        pageSize: 20,
        listIndex, //vuex对应的字段~
        focusMenu: true, //进行菜单聚焦
        breadcrumb: [{ value: "首页", path: "listHome" }, { value: "数据类型" }],
        ...PUB.listCFCommon5,//展开公共配置
        //objParamAddon列表接口的附加参数
        objParamAddon: { _dataType },
        //公共的附加参数，针对所有接口
        paramAddonPublic: { _dataType },
        //-------详情字段数组-------
        detailItems: ["_id", "dataTypekey", "title", "desc"],
        //-------列配置数组-------
        columns: ["title_fixed", "dataTypekey", "desc"],
        //-------筛选表单字段数组-------
        searchFormItems: ["title_search", "dataTypekey"],
        //-------新增、修改表单字段数组-------
        formItems: ["dataTypekey", "title", "desc"],
    }
    //调用：{改造列表字段配置形式的函数（字符串转对象）}
    util.reformCFListItem(PUB.listCF[listIndex])
}
//#endregion
            

//#region 笔记列表页
{
  let _dataType = "note";
  let listIndex = `list_${_dataType}`
  PUB.listCF[listIndex] = {
    idKey: "_id", //键名
    pageSize: 20,
    listIndex, //vuex对应的字段~
    focusMenu: true, //进行菜单聚焦
    breadcrumb: [{ value: "首页", path: "listHome" }, { value: "笔记" }],
    ...PUB.listCFCommon2,//展开公共配置
    //批量操作按钮的配置
    batchBtns: {
      addon: [
        util.cfList.bBtns.add,
        util.cfList.bBtns.delete,
        // { uiType: "slot", slot: "slot_in_toolbar" },
        { uiType: "component", component: "com_score_panel", ref: "score_panel" },
      ],
    },
    //dynamicDict动态数据字典配置
    dynamicDict: [
      DYDICT.note_category
    ],
    //objParamAddon列表接口的附加参数//传入联表查询参数
    objParamAddon: { _dataType, arrLookup: [] },
    //公共的附加参数，针对所有接口
    paramAddonPublic: { _dataType },

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
    formItems: ["title", "link", "importance_radio", "difficulty_radio", "keyword", "note_category", "desc", "detail_paste", "_systemId"],
  }
  //调用：{改造列表字段配置形式的函数（字符串转对象）}
  util.reformCFListItem(PUB.listCF[listIndex])

}


//#endregion
            
//#region 笔记分类列表页
{
    let _dataType = "note_category";
    let listIndex = `list_${_dataType}`
    PUB.listCF[listIndex] = {
        idKey: "_id", //键名
        pageSize: 20,
        listIndex, //vuex对应的字段~
        focusMenu: true, //进行菜单聚焦
        breadcrumb: [{ value: "首页", path: "listHome" }, { value: "笔记分类" }],
        ...PUB.listCFCommon5,//展开公共配置
        //objParamAddon列表接口的附加参数
        objParamAddon: { _dataType },
        //公共的附加参数，针对所有接口
        paramAddonPublic: { _dataType },
        //-------详情字段数组-------
        detailItems: ["title", "desc", "category"],
        //-------列配置数组-------
        columns: ["title_fixed", "desc", "category"],
        //-------筛选表单字段数组-------
        searchFormItems: ["title_search"],
        //-------新增、修改表单字段数组-------
        formItems: ["title", "desc"],
    }
    //调用：{改造列表字段配置形式的函数（字符串转对象）}
    util.reformCFListItem(PUB.listCF[listIndex])
}
//#endregion
            
//#region 关系列表页
{
    let _dataType = "relation";
    let listIndex = `list_${_dataType}`
    PUB.listCF[listIndex] = {
        idKey: "_id", //键名
        pageSize: 20,
        listIndex, //vuex对应的字段~
        focusMenu: true, //进行菜单聚焦
        breadcrumb: [{ value: "首页", path: "listHome" }, { value: "关系数据" }],
        ...PUB.listCFCommon5,//展开公共配置
        objParamAddon: { _dataType },
        //公共的附加参数，针对所有接口
        paramAddonPublic: { _dataType },
        //-------详情字段数组-------
        detailItems: ["_id", "_idRel", "_idRel2", "sort"],
        //-------列配置数组-------
        columns: ["_id", "_idRel", "_idRel2", "sort"],
        //-------筛选表单字段数组-------
        searchFormItems: ["_idRel", "_idRel2"],
        //-------新增、修改表单字段数组-------
        formItems: ["_idRel", "_idRel2", "sort"],
    }
    //调用：{改造列表字段配置形式的函数（字符串转对象）}
    util.reformCFListItem(PUB.listCF[listIndex])
}
//#endregion
            
//#region 角色列表页
{
    let _dataType = "role";
    let listIndex = `list_${_dataType}`
    PUB.listCF[listIndex] = {
        idKey: "_id", //键名
        pageSize: 20,
        listIndex, //vuex对应的字段~
        focusMenu: true, //进行菜单聚焦
        breadcrumb: [{ value: "首页", path: "listHome" }, { value: "角色" }],
        ...PUB.listCFCommon5,//展开公共配置
        objParamAddon: { _dataType },
        //公共的附加参数，针对所有接口
        paramAddonPublic: { _dataType },

        //-------详情字段数组-------
        detailItems: ["Id", "roleName", "rolePower"],
        //-------列配置数组-------
        columns: ["Id", "roleName", "rolePower"],
        //-------筛选表单字段数组-------
        searchFormItems: ["Id"],
        //-------新增、修改表单字段数组-------
        formItems: ["roleName", "rolePower"],
    }
    //调用：{改造列表字段配置形式的函数（字符串转对象）}
    util.reformCFListItem(PUB.listCF[listIndex])

}

//#endregion
            

//#region 视频列表页
{
    let _dataType = "vedio";
    let listIndex = `list_${_dataType}`
    PUB.listCF[listIndex] = {
        idKey: "_id", //键名
        pageSize: 20,
        listIndex, //vuex对应的字段~
        focusMenu: true, //进行菜单聚焦
        breadcrumb: [{ value: "首页", path: "listHome" }, { value: "教学视频" }],
        ...PUB.listCFCommon2,//展开公共配置

        objParamAddon: { _dataType },
        //公共的附加参数，针对所有接口
        paramAddonPublic: { _dataType },


        //-------详情字段数组-------
        detailItems: ["title", "desc", "link", "vedio", "detail"],
        //-------列配置数组-------
        columns: ["title_fixed", "keyword_edit", "countGroup", "_id", "desc", "vedio", "link"],
        //-------筛选表单字段数组-------
        searchFormItems: ["title_search", "countGroup"],
        //-------新增、修改表单字段数组-------
        formItems: ["title", "keyword", "desc", "link", "vedio"],
    }
    //调用：{改造列表字段配置形式的函数（字符串转对象）}
    util.reformCFListItem(PUB.listCF[listIndex])

}


//#endregion
            

//#region 分组列表页
{
  let _dataType = "group";
  let listIndex = `list_${_dataType}`
  PUB.listCF[listIndex] = {
    idKey: "_id", //键名
    pageSize: 20,
    listIndex, //vuex对应的字段~
    focusMenu: true, //进行菜单聚焦
    breadcrumb: [{ value: "首页", path: "listHome" }, { value: "分组" }],
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
    objParamAddon: { _dataType },
    //公共的附加参数，针对所有接口
    paramAddonPublic: { _dataType },

    //-------详情字段数组-------
    detailItems: ["_id", "title", "alias", "desc", "group_dataType"],
    //-------列配置数组-------
    columns: ["title_fixed", "_id", "alias", "desc", "group_dataType"],
    //-------筛选表单字段数组-------
    searchFormItems: ["title_search", "group_dataType", "alias"],
    //-------新增、修改表单字段数组-------
    formItems: ["title", "alias", "group_dataType", "iconSrc", "desc"],
  }
  //调用：{改造列表字段配置形式的函数（字符串转对象）}
  util.reformCFListItem(PUB.listCF[listIndex])

}
//#endregion
            

{
  let _dataType = "url";
  let listIndex = `list_${_dataType}`
  PUB.listCF[listIndex] = {
    idKey: "_id", //键名
    pageSize: 20,
    listIndex, //vuex对应的字段~
    focusMenu: true, //进行菜单聚焦
    breadcrumb: [{ value: "首页", path: "listHome" }, { value: "网址" }],
    ...PUB.listCFCommon3,//展开公共配置
    //objParamAddon列表接口的附加参数
    // singleBtns:PUB.singleBtns_copy_link_sort,
    objParamAddon: { _dataType },
    //公共的附加参数，针对所有接口
    paramAddonPublic: { _dataType },

    //-------详情字段数组-------
    detailItems: ["title", "desc", "link"],
    //-------列配置数组-------
    columns: ["title_fixed", "_id", "desc", "link"],
    //-------筛选表单字段数组-------
    searchFormItems: ["title_search"],
    //-------新增、修改表单字段数组-------
    formItems: ["title", "link", "desc", "album"],
  }
  //调用：{改造列表字段配置形式的函数（字符串转对象）}
  util.reformCFListItem(PUB.listCF[listIndex])

}
            
                
    {
    let _dataType = "file_base";
    let listCFAddon = {
        breadcrumb: [{ value: "首页", path: "listHome" }, { value: "基础文件" }],
        ...PUB.listCFCommon2,//展开公共配置


        singleBtns: {
            addon: [
                ...util.cfList.sBtns.arrAllBtns,
                util.cfList.sBtns.link,
            ]
        },



        //-------详情字段数组-------
        detailItems: ["_id", "title", "fileSize", "fileExt", "imgWidth", "imgHeight", "fileBucket", "fileKey", "_userId", "systemId"],
        //-------列配置数组-------
        columns: ["_id", "title_fixed_w150", "fileSource", "fileSize", "fileExt", "imgWidth", "imgHeight", "fileBucket", "link", "fileKey", "uploadTime", "systemId",],
        //-------筛选表单字段数组-------
        searchFormItems: ["title_search", "_userId"],
        //-------新增、修改表单字段数组-------
        formItems: [],

    }
    util.handleCommonListCF({ _dataType, listCFAddon })//调用：{处理通用列表配置数据函数}
}







                
    {
  let _dataType = "familiarity";
  let listCFAddon = {
    breadcrumb: [ { value: "首页", path: "listHome" }, { value: "熟悉度" } ],
    ...PUB.listCFCommon,//展开公共配置
    //dynamicDict动态数据字典配置
    dynamicDict: [
      DYDICT.html_api_category
    ],
    //-------详情字段数组-------
    detailItems: ["familiarity", "dataType", "dataId", "userId", "studyTime"],
    //-------列配置数组-------
    columns: ["familiarity", "score", "dataType", "dataId", "_userId", "userId", "_idRel", "studyTime"],
    //-------筛选表单字段数组-------
    searchFormItems: ["dataId", "userId", "_userId", "_idRel"],
    //-------新增、修改表单字段数组-------
    formItems: ["familiarity", "dataType", "dataId", "userId", "_userId"],

  }
  util.handleCommonListCF({_dataType, listCFAddon})//调用：{处理通用列表配置数据函数}
}




                
    {
  let _dataType = "exercises";
  let listCFAddon = {
    breadcrumb: [ { value: "首页", path: "listHome" }, { value: "前端习题" } ],
    ...PUB.listCFCommon2,//展开公共配置
    //-------详情字段数组-------
    detailItems: ["title", "desc", "category", "detail"],
    //-------列配置数组-------
    columns: ["title_fixed", "desc", "category"],
    //-------筛选表单字段数组-------
    searchFormItems: ["title_search"],
    //-------新增、修改表单字段数组-------
    formItems: ["title", "desc", "detail"],

  }
  util.handleCommonListCF({_dataType, listCFAddon})//调用：{处理通用列表配置数据函数}
}



                
    

{
  let _dataType = "data_item";
  let listCFAddon = {
    breadcrumb: [{ value: "首页", path: "listHome" }, { value: "数据字典" }],
    ...PUB.listCFCommon2,//展开公共配置
    //批量操作按钮的配置
    batchBtns: {

      addon: [
        util.cfList.bBtns.add,
        util.cfList.bBtns.delete,
       
        { text: "生成调试版本Js文件", eventType: "buildDebugJs" },
        {
          uiType: "link",
          text: "生成Js文件并上传七牛云",
          target: "_blank",
          url: `${PUB.domain}/dist/html/tool.html#/toolApiDebug/5ea571f18bce0f5338b95f17`,
          // cfElBtn: {
          //   type: "primary",
          //   icon: "el-icon-user-solid"
          // }
        },

        // { text: "生成Js文件并上传七牛云", eventType: "buildDebugQiNiuJs" },//暂时不好实现
      ]
    },

    sortJsonDefault: { sort: -1 },//默认排序
    //-------详情字段数组-------
    detailItems: ["title",],
    //-------列配置数组-------
    columns: ["item_prop", "item_label", "desc", "sort_edit",],
    //-------筛选表单字段数组-------
    searchFormItems: ["item_prop_search", "label_search",],
    //-------新增、修改表单字段数组-------
    formItems: ["item_prop", "item_label", "desc", "sort", "cfDict", "cfDyDict", "arrCfDItem", "arrCfCItem", "arrCfFItem", "objAddonItem"],

  }
  util.handleCommonListCF({ _dataType, listCFAddon })//调用：{处理通用列表配置数据函数}
}



                
    
{
  let _dataType = "css_api";
  let listCFAddon = {
    breadcrumb: [{ value: "首页", path: "listHome" }, { value: "API手册" }, { value: "Css-API" }],
    ...PUB.listCFCommon4,//展开公共配置
    //批量操作按钮的配置
    batchBtns: {
      addon: [
        util.cfList.bBtns.add, util.cfList.bBtns.delete, 
        { uiType: "component", component: "com_score_panel", ref: "score_panel" },
        // { uiType: "slot", slot: "slot_in_toolbar" }
      ],
    },
    //dynamicDict动态数据字典配置
    dynamicDict: [
      DYDICT.css_api_category,
    ],
    //objParamAddon列表接口的附加参数
    objParamAddon: {
     _dataType,arrLookup: [],//传入联表查询参数
    },
    //-------详情字段数组-------
    detailItems: ["_id", "title", "keyword", "desc", "detail", "category", "importance"],
    //-------列配置数组-------
    columns: ["title_fixed_w150", "keyword_edit", "desc", "category", "familiarity_select", "importance"],
    //-------筛选表单字段数组-------
    searchFormItems: ["title_search", "css_api_category", "difficulty"],
    //-------新增、修改表单字段数组-------
    formItems: ["title", "keyword", "css_api_category", "desc", "detail", "importance", "difficulty"],

  }
  util.handleCommonListCF({_dataType, listCFAddon})//调用：{处理通用列表配置数据函数}
}



                
    
{
  let _dataType = "css_api_category";
  let listCFAddon = {
    breadcrumb: [ { value: "首页", path: "listHome" }, { value: "Css-API分类" } ],
    ...PUB.listCFCommon2,//展开公共配置
    //-------详情字段数组-------
    detailItems: ["title", "desc", "category"],
    //-------列配置数组-------
    columns: ["title_fixed", "desc", "category"],
    //-------筛选表单字段数组-------
    searchFormItems: ["title_search"],
    //-------新增、修改表单字段数组-------
    formItems: ["title", "desc"],
  }
  util.handleCommonListCF({ _dataType, listCFAddon })//调用：{处理通用列表配置数据函数}
}



                
    {
    let _dataType = "company";
    let listCFAddon = {
        breadcrumb: [{ value: "首页", path: "listHome" }, { value: "公司" }],
        ...PUB.listCFCommon5,//展开公共配置
        //cfForm新增修改表单的配置
        cfForm: {
            col_span: 12, //控制显示一行多列
        },

        objParamAddon: { _dataType },
        //公共的附加参数，针对所有接口
        paramAddonPublic: { _dataType },
        //-------详情字段数组-------
        detailItems: ["_id", "companyName", "desc", "phone", "address", "_userId"],
        //-------列配置数组-------
        columns: ["companyName", "desc", "phone", "address", "_userId"],
        //-------筛选表单字段数组-------
        searchFormItems: ["companyName_search"],
        //-------新增、修改表单字段数组-------
        formItems: ["companyName", "desc","phone", "address",  ],

    }
    util.handleCommonListCF({ _dataType, listCFAddon })//调用：{处理通用列表配置数据函数}
}

                
    {
  let _dataType = "user";
  let listCFAddon = {
    breadcrumb: [{ value: "首页", path: "listHome" }, { value: "用户" }],
    ...PUB.listCFCommon5,//展开公共配置
    //-------详情字段数组-------
    detailItems: ["trueName", "nickName", "openid", "phone", "sex", "countOrder"],
    //-------列配置数组-------
    columns: ["CreateTime", "nickName", "openid", "phone", "sex", "countOrder"],
    //-------筛选表单字段数组-------
    searchFormItems: ["nickName", "openid"],
    //-------新增、修改表单字段数组-------
    formItems: ["trueName", "nickName", "openid", "phone", "sex"],
  }
  util.handleCommonListCF({ _dataType, listCFAddon })//调用：{处理通用列表配置数据函数}
}

                
    //***注意位置-补充表单字段，因为这个字段需要继承PUB.listCF.list_note
F_ITEMS.relNoteList = {
    ...D_ITEMS.relNoteList,
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
};
                
    {
    let _dataType = "task";
    let listCFAddon = {
        breadcrumb: [{ value: "首页", path: "listHome" }, { value: "任务" }],
        //dynamicDict动态数据字典配置
        dynamicDict: [
            DYDICT.personCharge,
        ],
        //新增修改表单的配置
        cfForm: {
            col_span: 12, //控制显示一行多列
        },
        ...PUB.listCFCommon2,//展开公共配置
        objParamAddon: {  _dataType },
        //公共的附加参数，针对所有接口
        paramAddonPublic: { _dataType },
        detailItems: ["_id", "title", "taskType", "prior", "complete", "personCharge", "predictTime", "actualTime", "detail"],
        columns: ["_id", "title_fixed_edit", "taskType", "prior", "complete_com", "personCharge", "predictTime", "actualTime"],
        searchFormItems: ["title_search","complete_search", "taskType", "prior", "personCharge",],
        formItems: ["title", "taskType_radio", "prior_radio", "complete", "personCharge", "predictTime", "actualTime", "detail_new", "relNoteList"],
    }
    util.handleCommonListCF({_dataType, listCFAddon})//调用：{处理通用列表配置数据函数}
  }
{
    PUB.listCF.list_task_my = lodash.cloneDeep(PUB.listCF.list_task);//**** */
    let listIndex = `list_task_my`
    PUB.listCF[listIndex] = {
        ...PUB.listCF.list_task_my,
        isShowBreadcrumb: false,//面包屑
        detailItems: ["_id", "title", "taskType", "prior", "complete", "predictTime", "actualTime"],
        columns: ["_id", "title_fixed_edit", "taskType", "prior", "complete_com", "predictTime", "actualTime"],
        searchFormItems: ["title","complete_search", "taskType", "prior",],
    }
    util.reformCFListItem(PUB.listCF[listIndex])
}

                
    {
  let _dataType = "system";
  let listCFAddon = {
    breadcrumb: [ { value: "首页", path: "listHome" }, { value: "系统" } ],
    ...PUB.listCFCommon5,//展开公共配置
    singleBtns: {
      addon: [
        util.cfList.sBtns.detail,
        util.cfList.sBtns.modify,
        util.cfList.sBtns.delete,
        util.cfList.sBtns.goSystem
      ]
    },
    //-------详情字段数组-------
    detailItems: ["_id", "title","systemId", "desc", "_userId"],
    //-------列配置数组-------
    columns: ["CreateTime","_id","title_fixed_edit", "systemId","desc", "_userId"],
    //-------筛选表单字段数组-------
    searchFormItems: ["title_search","systemId", ],
    //-------新增、修改表单字段数组-------
    formItems: ["title","systemId","logoSrc","iconSrc",   "desc",   "homeGroupId",   "treeDataMenu"],
  }
  util.handleCommonListCF({_dataType, listCFAddon})//调用：{处理通用列表配置数据函数}
}

                
    {
  let _dataType = "score";
  let listCFAddon = {
    breadcrumb: [ { value: "首页", path: "listHome" }, { value: "记分项" } ],
    ...PUB.listCFCommon5,//展开公共配置
    //-------详情字段数组-------
    detailItems: ["_id", "scoreKey", "score", "_userId"],
    //-------列配置数组-------
    columns: ["scoreKey", "score", "_userId"],
    //-------筛选表单字段数组-------
    searchFormItems: ["scoreKey", "_userId"],
    //-------新增、修改表单字段数组-------
    formItems: ["scoreKey", "_userId"],
  }
  util.handleCommonListCF({_dataType, listCFAddon})//调用：{处理通用列表配置数据函数}
}

                
    //######################




//#region 简历-项目经历
{
    let _dataType = "resume_project_experience";
    let listCFAddon = {
        breadcrumb: [{ value: "首页", path: "listHome" }, { value: "简历-项目经历" }],
        ...PUB.listCFCommon2,//展开公共配置
        detailItems: ["title", "desc", "link"],
        columns: ["title_fixed", "_id", "desc", "link"],
        searchFormItems: ["title_search"],
        formItems: ["title", "link", "desc", "album"],
    }
    util.handleCommonListCF({ _dataType, listCFAddon })//调用：{处理通用列表配置数据函数}
}
//#endregion
            
//#region 简历-工作经历
{
    let _dataType = "resume_work_experience";
    let listCFAddon = {
        breadcrumb: [{ value: "首页", path: "listHome" }, { value: "简历-工作经历" }],
        ...PUB.listCFCommon2,//展开公共配置
        detailItems: ["companyName", "positionName", "onJobPeriod", "descJob"],
        columns: ["companyName", "positionName", "onJobPeriod", "descJob"],
        searchFormItems: ["companyName"],
        formItems: ["companyName", "positionName", "onJobPeriod", "descJob"],
    }
    util.handleCommonListCF({ _dataType, listCFAddon })//调用：{处理通用列表配置数据函数}
}
//#endregion
            
//#region 简历-教育经历
{
    let _dataType = "resume_education_experience";
    let listCFAddon = {
        breadcrumb: [{ value: "首页", path: "listHome" }, { value: "简历-教育经历" }],
        ...PUB.listCFCommon2,//展开公共配置
        detailItems: ["schoolName","inSchoolPeriod","diploma","professionalName", ],
        columns: ["schoolName","inSchoolPeriod","diploma","professionalName", ],
        searchFormItems: ["schoolName"],
        formItems: ["schoolName","inSchoolPeriod","diploma","professionalName", ],
    }
    util.handleCommonListCF({ _dataType, listCFAddon })//调用：{处理通用列表配置数据函数}
}
//#endregion
            
//#region 字段-我的项目经历
{
    let prop = "relProjectExperience", objBase = { label: "我的项目经历", prop, }
    D_ITEMS[prop] = { ...objBase, };
    COLUMNS[prop] = { ...objBase, width: 100, };
    F_ITEMS[prop] = { ...objBase, type: "input" };
    F_ITEMS[prop] = {
        ...objBase, type: "select_list_data",
        cfSelectList: {//选择列表配置
            dataName: "项目经历", valueKey: "_id", labelKey: "title",
            multiple: true, //多选
            selectJson: { _id: 1, title: 1, desc: 1, }, //需要保留的集合字段
            cfList: util.deepCopy(PUB.listCF.list_resume_project_experience)
        }
    };
}
//#endregion
//#region 字段-我的工作经历
{
    let prop = "relWorkExperience", objBase = { label: "我的工作经历", prop, }
    D_ITEMS[prop] = { ...objBase, };
    COLUMNS[prop] = { ...objBase, width: 70, };
    F_ITEMS[prop] = { ...objBase, type: "input" };
    F_ITEMS[prop] = {
        ...objBase, type: "select_list_data",
        cfSelectList: {//选择列表配置
            dataName: "工作经历", valueKey: "_id", labelKey: "companyName", multiple: true, //多选
            selectJson: { _id: 1, companyName: 1, }, //需要保留的集合字段
            cfList: util.deepCopy(PUB.listCF.list_resume_work_experience)
        }
    };
}
//#endregion
//#region 字段-我的教育经历
{
    let prop = "relEducationExperience", objBase = { label: "我的教育经历", prop, }
    D_ITEMS[prop] = { ...objBase, };
    COLUMNS[prop] = { ...objBase, width: 70, };
    F_ITEMS[prop] = { ...objBase, type: "input" };
    F_ITEMS[prop] = {
        ...objBase, type: "select_list_data",
        cfSelectList: {//选择列表配置
            dataName: "教育经历", valueKey: "_id", labelKey: "schoolName", multiple: true, //多选
            selectJson: { _id: 1, schoolName: 1, }, //需要保留的集合字段
            cfList: util.deepCopy(PUB.listCF.list_resume_education_experience)
        }
    };
}
//#endregion
//#region 简历-放最下面，因为要引用上面的列表配置
{
    let _dataType = "resume";
    let listCFAddon = {
        breadcrumb: [{ value: "首页", path: "listHome" }, { value: "简历" }],
        ...PUB.listCFCommon2,//展开公共配置
        detailItems: ["trueName", "phone", "email", "desc", "avatarImg",
        "relWorkExperience", "relProjectExperience","relEducationExperience",],
        columns: ["trueName", "phone", "email", "desc", "avatarImg",],
        searchFormItems: ["trueName_search"],
        formItems: ["trueName", "phone", "email", "desc", "avatarImg",
         "relWorkExperience", "relProjectExperience","relEducationExperience",],
    }
    util.handleCommonListCF({ _dataType, listCFAddon })//调用：{处理通用列表配置数据函数}
}
//#endregion
            
                
    {
  let _dataType = "project_case";
  let listCFAddon = {
    breadcrumb: [{ value: "首页", path: "listHome" }, { value: "工程案例" }],
    ...PUB.listCFCommon5,//展开公共配置
    //-------详情字段数组-------
    detailItems: ["title", "desc", "link"],
    //-------列配置数组-------
    columns: ["title_fixed", "_id", "desc", "link"],
    //-------筛选表单字段数组-------
    searchFormItems: ["title_search"],
    //-------新增、修改表单字段数组-------
    formItems: ["title", "desc", "album", "detail"],
  }
  util.handleCommonListCF({ _dataType, listCFAddon })//调用：{处理通用列表配置数据函数}
}

                
    {
  let _dataType = "person";
  let listCFAddon = {
    breadcrumb: [{ value: "首页", path: "listHome" }, { value: "人员" }],
    ...PUB.listCFCommon5,//展开公共配置
    //cfForm新增修改表单的配置
    cfForm: {
      col_span: 12, //控制显示一行多列
    },
    objParamAddon: { _dataType},
    //公共的附加参数，针对所有接口
    paramAddonPublic: { _dataType},
    //-------详情字段数组-------
    detailItems: ["_id", "trueName", "desc", "phone", "address", "career", "_userId"],
    //-------列配置数组-------
    columns: ["trueName", "desc", "phone", "address", "career", "_userId"],
    //-------筛选表单字段数组-------
    searchFormItems: ["trueName_search"],
    //-------新增、修改表单字段数组-------
    formItems: ["trueName", "career", "phone", "address", "birthday", "email", "idCard", "qqNumber", "desc", "headSrc",],
  }
  util.handleCommonListCF({_dataType, listCFAddon})//调用：{处理通用列表配置数据函数}
}

                
    {
  let _dataType = "order";
  let listCFAddon = {
    ...PUB.listCFCommon5,//展开公共配置
    breadcrumb: [{ value: "首页", path: "listHome" }, { value: "线上订单" }],
    //动态数据字典
    dynamicDict: [
      DYDICT.order_user
    ],
    objParamAddon: {
      findJson: { orderSource: { $ne: 2 } }, //筛选条件！！！
      _dataType
    },
    //-------详情字段数组-------
    detailItems: ["orderId", "_id", "openid", "timeOrder", "priceOrder", "listGoods", "payStatus", "receiverName", "phone", "addressObj", "remark"],
    //-------列配置数组-------
    columns: ["orderId", "orderNickName", "receiverName", "phone", "timeOrder", "priceOrder", "payStatus_com", "deliveryStatus", "openid"],
    //-------筛选表单字段数组-------
    searchFormItems: ["orderId", "timeOrder_search", "payStatus", "deliveryStatus",],
    //-------新增、修改表单字段数组-------
    formItems: ["orderId", "openid", "payStatus", "deliveryStatus", "remark", "orderSource","addressObj", ],
  }
  util.handleCommonListCF({ _dataType, listCFAddon })//调用：{处理通用列表配置数据函数}
}

                
    {
    let _dataType = "order";
    PUB.listCF.list_order_offline = lodash.cloneDeep(PUB.listCF.list_order);//**** */
    let listIndex = `list_order_offline`
    PUB.listCF[listIndex] = {
        ...PUB.listCF.list_order_offline,
        breadcrumb: [{ value: "首页", path: "listHome" }, { value: "线下订单" }],
        listIndex,
        _dataType,
        objParamAddon: {
            findJson: { orderSource: 2 }, //筛选条件！！！
            _dataType
        },
        cfForm: {
            col_span: 12, //控制显示一行多列
            watch: PUB.cfForm.watch.file 
          },
        formDataAddInit: {
            orderSource: 2
        },
        //-------详情字段数组-------
        detailItems: ["orderId", "_id", "timeOrder", "priceOrder", "listGoods", "payStatus", "receiverName", "phone", "addressObj", "remark"],
        //-------列配置数组"orderId",-------
        columns: ["orderGoodsDesc",  "receiverName", "phone", "timeOrder", "priceOrder", "payStatus_com", "deliveryStatus",],
        //-------筛选表单字段数组-------
        searchFormItems: ["orderId", "timeOrder_search", "payStatus", "deliveryStatus",],
        //-------新增、修改表单字段数组"orderSource",-------
        formItems: ["orderGoodsDesc", "receiverName", "priceOrder", "timeOrder", "phone", "payStatus", "deliveryStatus", "remark","addressObj",],
    }
    util.reformCFListItem(PUB.listCF[listIndex])
}

                
    {
  let _dataType = "js_code";
  let listCFAddon = {
    breadcrumb: [{ value: "首页", path: "listHome" }, { value: "js代码块" }],
    ...PUB.listCFCommon5,//展开公共配置
    //-------详情字段数组-------
    detailItems: ["_id", "title", "jsCode", "desc", "_userId"],
    //-------列配置数组-------
    columns: ["_id", "title_fixed_edit", "desc","countJsCode"],
    //-------筛选表单字段数组-------
    searchFormItems: ["title_search", "systemId",],
    //-------新增、修改表单字段数组-------
    formItems: ["title","desc", "jsCode",],
  }
  util.handleCommonListCF({ _dataType, listCFAddon })//调用：{处理通用列表配置数据函数}
}
                
    //#region 字段-相关js代码块
{
  let prop = "relJsCode", objBase = { label: "相关js代码块", prop, }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = { ...objBase, width: 70, };
  F_ITEMS[prop] = { ...objBase, type: "input" };
  F_ITEMS[prop] = {
    ...objBase, type: "select_list_data",
    cfSelectList: {//选择列表配置
      dataName: "js代码块", valueKey: "_id", labelKey: "title", multiple: true, //多选
      selectJson: { _id: 1, title: 1, }, //需要保留的集合字段
      cfList: util.deepCopy(PUB.listCF.list_js_code)
    }
  };
}
//#endregion



    //#region 字段-相关js代码块
    {
        let prop = "relJsCode", objBase = { label: "相关js代码块", prop, }
        D_ITEMS[prop] = { ...objBase, };
        COLUMNS[prop] = { ...objBase, width: 70, };
        F_ITEMS[prop] = { ...objBase, type: "input" };
        F_ITEMS[prop] = {
          ...objBase, type: "select_list_data",
          cfSelectList: {//选择列表配置
            dataName: "js代码块", valueKey: "_id", labelKey: "title", multiple: true, //多选
            selectJson: { _id: 1, title: 1, }, //需要保留的集合字段
            cfList: lodash.cloneDeep(PUB.listCF.list_js_code),
            componentRow:"dm_com_row_js_code"
          }
        };
      }

      
      //#endregion
{
  let _dataType = "js_file";
  let listCFAddon = {
    breadcrumb: [{ value: "首页", path: "listHome" }, { value: "js_文件" }],
    ...PUB.listCFCommon5,//展开公共配置
    //-------详情字段数组-------
    detailItems: ["_id", "title", "fileName","desc","relJsCode",  "_userId"],
    //-------列配置数组-------
    columns: ["_id", "title","fileName", "desc","countJsCode"],
    //-------筛选表单字段数组-------
    searchFormItems: ["file", "systemId",],
    //-------新增、修改表单字段数组-------
    formItems: ["title","fileName", "desc","relJsCode"],
  }
  util.handleCommonListCF({ _dataType, listCFAddon })//调用：{处理通用列表配置数据函数}
}
 PUB.listCF.list_js_code.formItems.push(lodash.cloneDeep(F_ITEMS.relJsCode))


                
    {
  let _dataType = "js_api";
  let listCFAddon = {
    breadcrumb: [ { value: "首页", path: "listHome" }, { value: "API手册" }, { value: "Javascript-API" } ],
    ...PUB.listCFCommon2,//展开公共配置
    //批量操作按钮的配置
    batchBtns: {
      addon: [
        util.cfList.bBtns.add,
        util.cfList.bBtns.delete,
        // { uiType: "slot", slot: "slot_in_toolbar" }
        { uiType: "component", component: "com_score_panel", ref: "score_panel" },
      ],
    },
    //dynamicDict动态数据字典配置
    dynamicDict: [
      DYDICT.js_api_category,
    ],
    //objParamAddon列表接口的附加参数
    objParamAddon: {
      _dataType,
      //传入联表查询参数
      arrLookup: []
    },
    //-------详情字段数组-------
    detailItems: ["_id", "title", "keyword", "desc", "detail", "category", "importance", "difficulty", "english", "cateIdOld"],
    //-------列配置数组-------
    columns: ["title_fixed_w150_edit", "keyword_edit", "desc", "category", "familiarity_select", "importance", "difficulty", "english", "cateIdOld"],
    //-------筛选表单字段数组-------
    searchFormItems: ["title_search", "js_api_category", "importance", "difficulty"],
    //-------新增、修改表单字段数组-------
    formItems: ["title", "link", "keyword", "js_api_category", "desc", "detail", "importance", "difficulty", "english"],
  }
  util.handleCommonListCF({ _dataType, listCFAddon })//调用：{处理通用列表配置数据函数}
}

                
    {
  let _dataType = "js_api_category";
  let listCFAddon = {
    breadcrumb: [ { value: "首页", path: "listHome" }, { value: "Javascript-api分类" } ],
    ...PUB.listCFCommon2,//展开公共配置
    //-------详情字段数组-------
    detailItems: ["title", "desc", "cateIdOld"],
    //-------列配置数组-------
    columns: ["title_fixed", "desc", "cateIdOld"],
    //-------筛选表单字段数组-------
    searchFormItems: ["title_search"],
    //-------新增、修改表单字段数组-------
    formItems: ["title", "cateIdOld", "desc"],
  }
  util.handleCommonListCF({_dataType, listCFAddon})//调用：{处理通用列表配置数据函数}
}

                
    {
    let _dataType = "image";
    let listCFAddon = {
        breadcrumb: [{ value: "首页", path: "listHome" }, { value: "图片" }],
        ...PUB.listCFCommon2,//展开公共配置
        //cfForm新增修改表单的配置
        cfForm: {
            col_span: 12, //控制显示一行多列
            watch: PUB.cfForm.watch.file 
        },
        columnOperate: { "min-width": 320 },
        singleBtns: {
            addon: [
                ...util.cfList.sBtns.arrAllBtns,
                util.cfList.sBtns.download, util.cfList.sBtns.openFile,
            ]
        },
        //-------详情字段数组-------
        detailItems: ["_id", "title", "imagePreview", "file", "fileSize", "fileExt", "imgWidth", "imgHeight", "_userId"],
        //-------列配置数组-------
        columns: ["_id", "imagePreview", "title", "file", "fileSize", "fileExt", "imgWidth", "imgHeight", "_userId"],
        //-------筛选表单字段数组-------
        searchFormItems: ["title_search", "_userId"],
        //-------新增、修改表单字段数组-------
        formItems: ["title", "file"],
    }
    util.handleCommonListCF({ _dataType, listCFAddon })//调用：{处理通用列表配置数据函数}
}

                
    {
  let _dataType = "html_api";
  let listCFAddon = {
    breadcrumb: [ { value: "首页", path: "listHome" }, { value: "API手册" }, { value: "Html-API" } ],
    ...PUB.listCFCommon4,//展开公共配置
    //批量操作按钮的配置
    batchBtns: {
      addon: [
        util.cfList.bBtns.add,
        util.cfList.bBtns.delete,
        { uiType: "component", component: "com_score_panel", ref: "score_panel" },
        // { uiType: "slot", slot: "slot_in_toolbar" }
      ],
    },
    //dynamicDict动态数据字典配置
    dynamicDict: [
      DYDICT.html_api_category,
    ],
    //objParamAddon列表接口的附加参数
    objParamAddon: {
      _dataType,
      //传入联表查询参数
      arrLookup: []
    },
    //-------详情字段数组-------
    detailItems: ["_id", "title", "keyword", "desc", "detail", "category", "html_display", "importance", "difficulty", "english", "html_version", "selfClose", "demoList", "cateIdOld"],
    //-------列配置数组-------
    columns: ["title_fixed_w150_edit", "keyword_edit", "desc", "category", "familiarity_select", "html_display", "importance", "difficulty", "english", "html_version", "selfClose", "cateIdOld", "demoList"],
    //-------筛选表单字段数组-------
    searchFormItems: ["title_search", "html_api_category", "html_display", "importance", "difficulty", "html_version", "selfClose"],
    //-------新增、修改表单字段数组-------
    formItems: ["title", "keyword", "html_api_category", "desc", "detail", "html_display", "importance", "difficulty", "english", "html_version", "selfClose", "demoList"],
  }
  util.handleCommonListCF({_dataType, listCFAddon})//调用：{处理通用列表配置数据函数}
}

                
    {
  let _dataType = "html_api_category";
  let listCFAddon = {
    breadcrumb: [ { value: "首页", path: "listHome" }, { value: "Html-Api分类" } ],
    ...PUB.listCFCommon2,//展开公共配置
    //-------详情字段数组-------
    detailItems: ["title", "desc", "category"],
    //-------列配置数组-------
    columns: ["title_fixed", "desc", "category"],
    //-------筛选表单字段数组-------
    searchFormItems: ["title_search"],
    //-------新增、修改表单字段数组-------
    formItems: ["title", "desc"],
  }
  util.handleCommonListCF({ _dataType, listCFAddon })//调用：{处理通用列表配置数据函数}
}

                
    //#region 商品/服务
{
    let _dataType = "goods";
    let listCFAddon = {
        breadcrumb: [{ value: "首页", path: "listHome" }, { value: "商品/服务" }],
        ...PUB.listCFCommon2,//展开公共配置
        singleBtns: {
            addon: [
                ...util.cfList.sBtns.arrAllBtns,
                {
                    uiType: "link",
                    text: "查看前台展示",
                    target: "_blank",
                    urlFormatter: function (row) {
                        return `http://www.szltkt.cn/goods/${row._id}`;
                    },
                },
            ]
        },
        //-------详情字段数组-------
        detailItems: ["title", "desc", "deliveryDesc", "priceMarket", "priceSell", "priceSellSection", "isPublish", "countOrder"],
        //-------列配置数组-------
        columns: ["title_fixed", "_id", "desc", "priceMarket", "priceSell", "priceSellSection", "isPublish", "countOrder"],
        //-------筛选表单字段数组-------
        searchFormItems: ["title_search"],
        //-------新增、修改表单字段数组-------
        formItems: ["title", "desc", "album", "deliveryDesc", "detail", "priceMarket", "priceSell",  "isPublish", "listSpecPrice"],
    }
    util.handleCommonListCF({ _dataType, listCFAddon })//调用：{处理通用列表配置数据函数}
}
//#endregion

                
    {
  let _dataType = "front_demo";
  let listCFAddon = {
    breadcrumb: [ { value: "首页", path: "listHome" }, { value: "前端Demo" } ],
    ...PUB.listCFCommon4,//展开公共配置
    "detailItems": ["title", "keyword", "link", "desc", "category", "detail", "_id"],
    "columns": ["title_fixed_edit", "_id", "keyword_edit", "link", "desc", "category"],
    "searchFormItems": ["title_search"],
    "formItems": ["title", "link", "keyword", "desc", "detail"]
  }
  util.handleCommonListCF({_dataType, listCFAddon})//调用：{处理通用列表配置数据函数}
}

                
    {
  let _dataType = "file";
  let listCFAddon = {
    breadcrumb: [{ value: "首页", path: "listHome" }, { value: "文件" }],
    ...PUB.listCFCommon5,//展开公共配置

    columnOperate: { "min-width": 320 },
    singleBtns: {
      addon: [
        ...util.cfList.sBtns.arrAllBtns,
        util.cfList.sBtns.download,
        util.cfList.sBtns.openFile,
      ]
    },
    cfForm: {
      col_span: 12, //控制显示一行多列
      watch: PUB.cfForm.watch.file 
    },



    //-------详情字段数组-------
    detailItems: ["_id", "title", "file", "_userId"],
    //-------列配置数组-------
    columns: ["_id", "title_fixed_edit", "file", "_userId"],
    //-------筛选表单字段数组-------
    searchFormItems: ["title_search", "_userId"],
    //-------新增、修改表单字段数组-------
    formItems: ["title", "file"],

  }
  util.handleCommonListCF({ _dataType, listCFAddon })//调用：{处理通用列表配置数据函数}
}







                
    
//#region 分组下的视频列表页
{
    let _dataType = "relation";
    let listIndex = "detail_group_vedio"
    PUB.listCF[listIndex] = {
        ...PUB.cfListGPublic,
        listIndex, //vuex对应的字段~
        objParamAddon: { findJson: {}, _dataType },
        paramAddonPublic: { _dataType },//公共的附加参数，针对所有接口
        //dynamicDict动态数据字典配置
        dynamicDict: [DYDICT.note_category],
        //-------详情字段数组-------
        detailItems: ["title", "desc", "countData", "_id", "_idRel", "_idRel2", "sort"],
        //-------列配置数组-------
        columns: ["title_fixed", "_id", "desc", "link", "sort"],
        //-------筛选表单字段数组-------
        searchFormItems: ["title_search",],
        //-------新增、修改表单字段数组-------
        formItems: ["_idRel", "_idRel2", "sort"],
    }
    util.reformCFListItem(PUB.listCF[listIndex])
}
  //#endregion
            

//#region 分组下的商品列表页
{
  let _dataType = "relation";


  PUB.listCF.detail_group_goods = {
    ...PUB.cfListGPublic,
    listIndex: "detail_group_goods", //vuex对应的字段~
    singleBtns: PUB.singleBtns_copy_detail_sort,


    objParamAddon: {
      findJson: {},
      _dataType
    },
    //公共的附加参数，针对所有接口
    paramAddonPublic: {
      _dataType
    },

    //-------详情字段数组-------
    detailItems: ["title", "desc", "countData", "_id", "_idRel", "_idRel2", "sort"],
    //-------列配置数组-------
    columns: ["title_fixed", "_id", "desc", "link", "sort"],
    //-------筛选表单字段数组-------
    searchFormItems: [],
    //-------新增、修改表单字段数组-------
    formItems: ["_idRel", "_idRel2", "sort"],



  }
  util.reformCFListItem(PUB.listCF.detail_group_goods)
}
//#endregion
            

//#region 分组下的网址列表页
{
  let _dataType = "relation";
  let listIndex = "detail_group_url"
  PUB.listCF[listIndex] = {
    ...PUB.cfListGPublic,
    listIndex, //vuex对应的字段~
    singleBtns: {
      addon: [
        ...PUB.singleBtns_list_group_data.addon,
        util.cfList.sBtns.link
      ]
    },
    objParamAddon: { findJson: {}, _dataType },
    paramAddonPublic: { _dataType },//公共的附加参数，针对所有接口
    //dynamicDict动态数据字典配置
    dynamicDict: [DYDICT.note_category],
    //-------详情字段数组-------
    detailItems: ["title", "desc", "countData", "_id", "_idRel", "_idRel2", "sort"],
    //-------列配置数组-------
    columns: ["title_fixed", "_id", "desc", "link", "sort"],
    //-------筛选表单字段数组-------
    searchFormItems: ["title_search",],
    //-------新增、修改表单字段数组-------
    formItems: ["_idRel", "_idRel2", "sort"],
  }
  util.reformCFListItem(PUB.listCF[listIndex])
}
//#endregion
            


//#region 分组下的人员列表页
{
  let listIndex = "detail_group_person"
  let _dataType = "relation";
  PUB.listCF[listIndex] = {
    ...PUB.cfListGPublic, listIndex, //vuex对应的字段~
    //列表单项操作按钮的配置
    singleBtns: {
      addon: [
        ...PUB.singleBtns_list_group_data.addon,
      ]
    },
    objParamAddon: { findJson: {}, _dataType },
    paramAddonPublic: { _dataType },//公共的附加参数，针对所有接口
    //-------详情字段数组-------
    detailItems: ["title", "desc", "countData", "_id", "_idRel", "_idRel2", "sort"],
    //-------列配置数组-------
    columns: ["trueName", "phone", "sort"],
    //-------筛选表单字段数组-------
    searchFormItems: ["trueName_search", "phone"],
    //-------新增、修改表单字段数组-------
    formItems: ["_idRel", "_idRel2", "sort"],


  }
  //需要补充的拆解字段****
  PUB.$projectAddon[listIndex] = {
    trueName: "$targetDoc.trueName", phone: "$targetDoc.phone",
  }


  util.reformCFListItem(PUB.listCF[listIndex])
}
//#endregion
            

//#region 分组下的图片列表页
{
  let listIndex = "detail_group_image"
  let _dataType = "relation";
  PUB.listCF[listIndex] = {
    ...PUB.cfListGPublic, listIndex, //vuex对应的字段~
    //列表单项操作按钮的配置
    singleBtns: {
      addon: [
        ...PUB.singleBtns_list_group_data.addon,
        util.cfList.sBtns.download,
        util.cfList.sBtns.openFile,
      ]
    },
    listIndex: "detail_group_image", //vuex对应的字段~
    objParamAddon: { findJson: {}, _dataType },
    paramAddonPublic: { _dataType },//公共的附加参数，针对所有接口
    //-------详情字段数组-------
    detailItems: ["title", "desc", "countData", "_id", "_idRel", "_idRel2", "sort"],
    //-------列配置数组-------
    columns: ["imagePreview", "title", "file", "sort"],
    //-------筛选表单字段数组-------
    searchFormItems: ["title_search",],
    //-------新增、修改表单字段数组-------
    formItems: ["_idRel", "_idRel2", "sort"],
  }
  util.reformCFListItem(PUB.listCF[listIndex])
  //需要补充的拆解字段****
  PUB.$projectAddon[listIndex] = {
    file: "$targetDoc.file",
  }

}
//#endregion
            

//#region 分组下的文件列表页
{
  let listIndex = "detail_group_file"
  let _dataType = "relation";
  PUB.listCF[listIndex] = {
    ...PUB.cfListGPublic, listIndex, //vuex对应的字段~
    //列表单项操作按钮的配置
    singleBtns: {
      addon: [
        ...PUB.singleBtns_list_group_data.addon,
        util.cfList.sBtns.download, util.cfList.sBtns.openFile,
      ]
    },

    objParamAddon: { findJson: {}, _dataType },
    paramAddonPublic: { _dataType },//公共的附加参数，针对所有接口
    //-------详情字段数组-------
    detailItems: ["title", "desc", "countData", "_id", "_idRel", "_idRel2", "sort"],
    //-------列配置数组-------
    columns: ["title_fixed", "file", "sort"],
    //-------筛选表单字段数组-------
    searchFormItems: ["title_search",],
    //-------新增、修改表单字段数组-------
    formItems: ["_idRel", "_idRel2", "sort"],
  }
  util.reformCFListItem(PUB.listCF[listIndex])
  //需要补充的拆解字段****
  PUB.$projectAddon[listIndex] = {
    file: "$targetDoc.file",
  }

}
//#endregion
            

//#region 分组下的任务列表页
{
  let listIndex = "detail_group_task"
  let _dataType = "relation";
  PUB.listCF[listIndex] = {
    ...PUB.cfListGPublic, listIndex, //vuex对应的字段~
    //列表单项操作按钮的配置
    objParamAddon: { findJson: {}, _dataType },
    paramAddonPublic: { _dataType },//公共的附加参数，针对所有接口
    dynamicDict: [DYDICT.personCharge,],
    //-------详情字段数组-------
    detailItems: ["title", "desc", "countData", "_id", "_idRel", "_idRel2", "sort"],
    //-------列配置数组-------
    columns: ["title_fixed", "taskType", "prior", "complete_com", "personCharge", "predictTime", "actualTime", "sort"],
    //-------筛选表单字段数组-------
    searchFormItems: ["title_search", "complete_search", "prior", "personCharge",],
    //-------新增、修改表单字段数组-------
    formItems: ["_idRel", "_idRel2", "sort"],
  }
  util.reformCFListItem(PUB.listCF[listIndex])
  //需要补充的拆解字段****
  PUB.$projectAddon[listIndex] = {
    taskType: "$targetDoc.taskType", prior: "$targetDoc.prior", complete: "$targetDoc.complete",
    personCharge: "$targetDoc.personCharge", predictTime: "$targetDoc.predictTime", actualTime: "$targetDoc.actualTime",
  }
}
//#endregion
            

//#region 分组下的demo列表页
{
  let listIndex = "detail_group_front_demo"
  let _dataType = "relation";
  PUB.listCF[listIndex] = {
    ...PUB.cfListGPublic, listIndex, //vuex对应的字段~
    //列表单项操作按钮的配置
    singleBtns: {
      addon: [
        ...PUB.singleBtns_list_group_data.addon,
        util.cfList.sBtns.link
      ]
    },
    objParamAddon: { findJson: {}, _dataType },
    paramAddonPublic: { _dataType },//公共的附加参数，针对所有接口
    //-------详情字段数组-------
    detailItems: ["title", "desc", "countData", "_id", "_idRel", "_idRel2", "sort"],
    //-------列配置数组-------
    columns: ["title_fixed", "_id", "desc", "link", "sort"],
    //-------筛选表单字段数组-------
    searchFormItems: ["title_search",],
    //-------新增、修改表单字段数组-------
    formItems: ["_idRel", "_idRel2", "sort"],
  }
  util.reformCFListItem(PUB.listCF[listIndex])
}
//#endregion
            

//#region 分组下的笔记列表页
{

  let _dataType = "relation";
  let listIndex = "detail_group_note"
  PUB.listCF[listIndex] = {
    ...PUB.cfListGPublic,
    listIndex, //vuex对应的字段~
    //批量操作按钮的配置
    batchBtns: {
      addon: [
        ...PUB.cfListGPublic.batchBtns.addon,
        // { uiType: "slot", slot: "slot_in_toolbar" },
        { uiType: "component", component: "com_score_panel", ref: "score_panel" },
      ],
    },
    //列表单项操作按钮的配置
    // singleBtns: PUB.singleBtns_copy_detail_sort,
    singleBtns: {
      addon: [
        ...PUB.singleBtns_list_group_data.addon,
      ]
    },
    objParamAddon: { findJson: {}, _dataType },
    paramAddonPublic: { _dataType },//公共的附加参数，针对所有接口
    //dynamicDict动态数据字典配置
    dynamicDict: [DYDICT.note_category],
    //-------详情字段数组-------
    detailItems: ["title", "detail", "desc", "category", "importance", "_id", "_idRel", "_idRel2", "sort"],
    //-------列配置数组-------
    columns: ["title_fixed", "familiarity_select", "importance", "difficulty", "category_multiple", "sort"],
    //-------筛选表单字段数组-------
    searchFormItems: ["title_search", "importance", "difficulty",],
    //-------新增、修改表单字段数组-------
    formItems: ["_idRel", "_idRel2", "sort"],
  }
  util.reformCFListItem(PUB.listCF[listIndex])
  //需要补充的拆解字段****
  PUB.$projectAddon[listIndex] = {
    importance: "$targetDoc.importance", difficulty: "$targetDoc.difficulty"
  }

}
//#endregion
            

//#region 分组下的分组列表页
{
  let _dataType = "relation";
  let listIndex = "detail_group_group"
  PUB.listCF[listIndex] = {
    ...PUB.cfListGPublic,
    listIndex, //vuex对应的字段~
    //列表单项操作按钮的配置
    singleBtns: {
      addon: [
        ...PUB.singleBtns_list_group_data.addon,
        util.cfList.sBtns.linkGroup
      ]
    },
    objParamAddon: { findJson: {}, _dataType },
    paramAddonPublic: { _dataType },//公共的附加参数，针对所有接口
    dynamicDict: [DYDICT.note_category], //dynamicDict动态数据字典配置
    //-------详情字段数组-------
    detailItems: ["title", "desc", "countData", "_id", "_idRel", "_idRel2", "sort"],
    //-------列配置数组-------
    columns: ["title_fixed", "countData", "myScore", "group_dataType", "desc", "sort"],
    //-------筛选表单字段数组-------
    searchFormItems: ["title_search",],
    //-------新增、修改表单字段数组-------
    formItems: ["_idRel", "_idRel2", "sort"],
  }
  //#endregion
  util.reformCFListItem(PUB.listCF[listIndex])
  //需要补充的拆解字段****
  PUB.$projectAddon[listIndex] = {
    dataType: "$targetDoc.dataType",
    countData: "$targetDoc.countData"
  }
}
//#endregion

            
                