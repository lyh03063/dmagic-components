
window.PUB = window.PUB|| {}
PUB.domain = "http://localhost:3000"
//PUB.domain = 'http://test.dmagic.cn'
//PUB.domain = "https://www.dmagic.cn"
PUB.urlUpload = `https://up-z2.qiniup.com`//七牛云上传地址（域名）
PUB.urlGetQiniuToken = `${PUB.domain}/api_third_part/get_qiniu_token?scope=dmagic`
PUB.systemName = "前端学习系统";
PUB.KeySys = "api";
let _systemId = `sys_${PUB.KeySys}`;
PUB._systemId = _systemId;

window.FN = window.FN || {}






//函数：{获取规格链id函数}
FN.getIdSpecChian = function (arrSpecSelected) {
    let arrId = arrSpecSelected.map(doc => lodash.get(doc, `objSOp.__id`));
    return arrId.sort().join("__");

}

//函数：{获取规格链名称函数}
FN.getNameSpecChian = function (arrSpecSelected) {
    let arrId = arrSpecSelected.map(doc => lodash.get(doc, `objSOp.name`));
    return arrId.join(" + ");
}



//函数：{标记不符合条件的组合结果项的函数}
FN.handelCombResult = function ({ listSpecs, arrResult }) {
    /****************************标记不符合条件的项-START****************************/
    //循环：{规格数组}
    listSpecs.forEach((itemEach, index) => {
        if (!itemEach.objSpecTerm) return;
        let indexTerm; //条件规格所在的位置
        let valTerm;//条件值
        for (var prop in itemEach.objSpecTerm) {
            indexTerm = listSpecs.findIndex(doc => doc.name == prop);
            valTerm = itemEach.objSpecTerm[prop];

        }
        //循环：{组合结果数组}
        arrResult.forEach(itemEach => {
            console.log("itemEach[indexTerm].name:", itemEach[indexTerm].name);
            let flag = itemEach[indexTerm].name != valTerm;
            console.log("flag:", flag);
            if (flag) {
                itemEach[index] = { name: "——" };
            }
        });
    });
    return arrResult
    /****************************标记不符合条件的项-END****************************/
}



//函数：{规格价格列表去重函数}
FN.uniqListSpecPrice = function (listSpecPrice) {
    let listSpecPriceNew = [];
    //循环：{规格价格列表}
    listSpecPrice.forEach(itemEach => {
      let obj = listSpecPriceNew.find(doc => doc.id == itemEach.id);
      //如果{000}000
      if (!obj) {
        listSpecPriceNew.push(itemEach);
      }
    });
    return listSpecPriceNew
}


//变量：{规格列表}
let listSpecs = [
    {
        __id: "jixing",
        name: "机型",
        options: [{
            "__id": "jixing_1",
            "name": "风管机",
            "imgSrc": "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=938396482,3800816148&fm=26&gp=0.jpg"
        }, {
            "__id": "jixing_2",
            "name": "挂机",
            "imgSrc": "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3038639374,564763994&fm=26&gp=0.jpg"
        }]
    },
    {
        __id: "pishu",
        name: "匹数",
        options: [
            {
                __id: "pishu_1",
                name: "1~3匹",
                imgSrc: ""
            },
            {
                __id: "pishu_2",
                name: "3匹以上",
                imgSrc: ""
            }
        ]
    }
]




//变量：{表单数据}
let formData = {
    listSpecs: listSpecs,
    listSpecPrice: [{ "spec0": "风管机", "spec1": "1~3匹", "id": "jixing_1__pishu_1", "price1": 0, "stock": 1 }, { "spec0": "风管机", "spec1": "3匹以上", "id": "jixing_1__pishu_2", "price": 2, "stock": 2 }, { "spec0": "挂机", "spec1": "1~3匹", "id": "jixing_2__pishu_1", "price": 3, "stock": 3 }, { "spec0": "挂机", "spec1": "3匹以上", "id": "jixing_2__pishu_2", "price": 4, "stock": 4 }],
    dictSpecPrice: {
        jixing_1__pishu_1: { price: 1, stock: 1 },
        jixing_1__pishu_2: { price: 2, stock: 2 },
        jixing_2__pishu_1: { price: 3, stock: 3 },
        jixing_2__pishu_2: { price: 4, stock: 4 }
    },
}





//#region MIX.goods_cart:商品购物车混入配置
{
    let T;
    MIX.goods_cart = {
        data() {
            return {

            };
        },
        methods: {
            //函数：{000函数}
            aaa: function (xxx) {
                return xxx

            },
            //函数：{000函数}
            aaa: function (xxx) {
                return xxx

            },
            //函数：{000函数}
            aaa: function (xxx) {
                return xxx

            },
            //函数：{000函数}
            aaa: function (xxx) {
                return xxx

            },
        },
        created() {
            T = this;
        },
        mounted() {

        }
    }
}
//#endregion







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

F_ITEMS.select_list_common_url = {"prop":"prop_select_list_data","label":"网址","type":"select_list_data","cfSelectList":{ dataName: "网址", valueKey: "_id", labelKey: "title", pageName: "tangball_article", multiple: true, selectJson: { _id: 1, title: 1, link: 1 }, cfList: list_common_url }};



F_ITEMS.prop_select_list_data = {"prop":"prop_select_list_data","label":"选择列表","type":"select_list_data","rules":[{ required: true, message: "能为空" }],"cfSelectList":cfListSelectActicle};