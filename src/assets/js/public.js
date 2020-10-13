
window.PUB = window.PUB || {}
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
PUB.ignorePower = true;//忽略权限



PUB.urlJS.css_prop="//localhost:3000/built_js/css_prop.js"

PUB.urlJS.html_tag="//localhost:3000/built_js/html_tag.js"

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
            let flag = itemEach[indexTerm].name != valTerm;
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
    label: "网址1111",
    prop: "prop_select_list_data",
    type: "select_list_data",
    cfSelectList: {
        showBtnRefresh: true,
        dataName: "网址111",
        valueKey: "_id",
        labelKey: "title",
        multiple: false, //多选
        //需要保留的集合字段
        selectJson: {
            _id: 1,
            title: 1,
            link: 1
        },
        cfList: list_common_url
    }

};





//菜单列表
PUB.menuDemo = [
    {
        name: "sys_case",
        title: "案管专用",
        menuItem: [
            { name: "detail_bankruptcy_case", title: "案件详情", route: "/manage/detail_bankruptcy_case?caseId=5edc65048d6ed44d5cf18aab" },

        ]
    },

    {
        name: "list_common",
        title: "sys_api",
        menuItem: [
            {
                name: "study_home", title: "学习主页-知识点",
                route: "/study_home/detail_group_g_card?groupId=5e19d9fff3c94a3971f45595"
            },
            {
                name: "list_front_demo", title: "前端demo总表",
                route: "/system/sys_api/manage/list_common?type=front_demo"
            },
            {
                name: "detail_group_demo", title: "在线编程demo仓库",
                route: "/system/sys_api/manage/detail_group?groupId=5eeae46a8ef1562cfc29ecc3"
            },
            {
                name: "list_html_api", title: "html元素列表",
                route: "/system/sys_api/manage/list_common?type=html_api"
            },
            {
                name: "list_html_prop", title: "html属性列表",
                route: "/system/sys_api/manage/list_common?type=html_prop"
            },
            {
                name: "list_common_js_file", title: "JS文件列表",
                route: "/system/sys_api/manage/list_common?type=js_file"
            },
            {
                name: "list_common_js_code", title: "JS代码块列表",
                route: "/system/sys_api/manage/list_common?type=js_code"
            },
            {
                name: "list_note", title: "笔记列表",
                route: "/system/sys_api/manage/list_common?type=note"
            },
            {
                name: "detail_html_api", title: "html详情界面",
                route: "/system/sys_api/manage/detail_html_api?dataId=5dee0e22b944155320f4199d"
            },
        ]
    },

    {
        name: "list",
        title: "列表",
        menuItem: [
            { name: "list_visit_often_demo", title: "列表-最近常用", },
            { name: "list_visit_history_demo", title: "列表-历史记录", },
            { name: "list_demo_hide_table", title: "列表-隐藏表格", },
            { name: "list_demo", title: "list_demo1", route: "/manage/list_demo" },
            { name: "list_static_demo", title: "list_static_demo", route: "/manage/list_static_demo" },
            { name: "list_common_demo", title: "list_common_demo", route: "/manage/list_common_demo" },
            { name: "list_demo_detail_g_list", title: "detail_g_list详情关联数据列表" },
            { name: "select_file_template", title: "案管-选择文件模板" },
            { name: "list_demo_pannel_rel", title: "案管-详情关联列表-涉诉信息" },
            { name: "list_demo_detail_group", title: "detail_group分组数据列表" },
            { name: "list_drag_sort_demo", title: "带拖拽排序功能的list_data" },
            { name: "list_tree_data", title: "带树状数据的list_data" },
            { name: "list_demo_pagination", title: "自定义分页样式的list_data" },
            { name: "list_demo_inited", title: "list_data的初始化外传" },
            { name: "list_demo_diyDetai", title: "list_data：自定义详情" },
            { name: "select_list_data_demo", title: "select_list_data：弹窗选择数据" },
            { name: "edit_list_data", title: "edit_list_data：标准列表的编辑弹窗表单" },
            { name: "add_list_data", title: "add_list_data：标准列表的新增弹窗表单" },
            { name: "switch_systemId", title: "列表-切换系统systemId" },
            { name: "el_table_drag", title: "el_table的拖拽" },
        ]
    },
    {
        name: "form",
        title: "表单",
        menuItem: [
            { name: "form_demo", title: "表单1", route: "/manage/form_demo" },
            { name: "form_demo2", title: "表单2", route: "/manage/form_demo2" },


        ]
    },
    {
        name: "visualization",
        title: "可视化",
        menuItem: [
            { name: "collection_demo", title: "集合" },
            { name: "collection_demo2", title: "html属性集合" },
            { name: "highlight_demo", title: "代码显示高亮" },
            { name: "vedio_demo", title: "视频" },
            { name: "chartAnnulus2", title: "林晓聪chartAnnulus2" },
            { name: "echarts_demo", title: "echarts饼图" },
            { name: "echarts_demo2", title: "echarts折线图" },
            { name: "aplayer_demo", title: "aplayer音频播放器" },
            { name: "aplayer_demo2", title: "aplayer分组音频" },
            { name: "calendar1", title: "日历组件" },
            { name: "tree_data_normal", title: "树数据组件1" },
            { name: "tree_data_menu", title: "树数据组件2" },
           
        ]
    },
    {
        name: "normal",
        title: "常用基础",
        menuItem: [
            { name: "ajax_token", title: "ajax_token测试" },
            { name: "list_simple_demo", title: "list_simple简单列表" },
            { name: "test_debug_list", title: "调试列表组件" },
            { name: "title_bar_demo", title: "标题栏组件" },
            { name: "pannel", title: "面板组件" },
            { name: "pannel_new_demo", title: "面板组件（新）" },
            { name: "list_flex_res", title: "list_flex_res弹性列表" },
            { name: "form_demo3", title: "form_demo3" },
        ]
    },
    {
        name: "other",
        title: "其他",
        menuItem: [
            { name: "draggable_demo", title: "draggable_demo" },
            { name: "row_html_tag_demo", title: "html集合组件测试" },
            { name: "upload_qiniu", title: "upload_qiniu", route: "/manage/upload_qiniu" },
            { name: "test", title: "test", route: "/manage/test" },
            { name: "object_demo", title: "对象demo" },
           
            { name: "goods_cart", title: "购物车" },
            { name: "goods_specs_2", title: "商品规格-后台" },
            { name: "goods_specs_front_2", title: "商品规格-前台" },
            { name: "wx_edit", title: "微信排版" },
            { name: "detail_list_son_note", title: "笔记的子笔记展示" },
            { name: "drag_change_width", title: "拖拽改变盒子宽度" },
        ]
    },
    {
        name: "tool",
        title: "工具",
        menuItem: [
            { name: "tool_old_cf_list", title: "替换旧列表配置" },
            { name: "auto_layout", title: "自动化布局", route: "/open/auto_layout" },
            { name: "js_file_edit", title: "js文件编辑", route: "/js_file_edit?jsFileId=5eb272bb298e45553493e821" },
        ]
    },
];





// F_ITEMS.select_list_common_url = {"prop":"prop_select_list_data","label":"网址","type":"select_list_data","cfSelectList":{ dataName: "网址", valueKey: "_id", labelKey: "title", pageName: "tangball_article", multiple: true, selectJson: { _id: 1, title: 1, link: 1 }, cfList: list_common_url }};



F_ITEMS.prop_select_list_data = { "prop": "prop_select_list_data", "label": "选择列表", "type": "select_list_data", "rules": [{ required: true, message: "能为空" }], "cfSelectList": cfListSelectActicle };


//变量：{html标签库数组}
PUB.arrHtmlTag = PUB.arrHtmlTag


// PUB.arrCssProp = [
//     {
//         "prop": "float",
//         arrPropVal: [
//             { "label": "右浮动", "value": "right", "desc": "向右浮动", },
//             { "label": "左浮动", "value": "left", "desc": "向左浮动", },
//         ],
//         arrPropFrequency: [
//             { "label": "xxx", "value": "right", "desc": "xxxx", },
//         ]
//     },
//     {
//         "prop": "fl",
//         arrPropVal: [
//             { "label": "F右浮动", "value": "right", },
//             { "label": "R左浮动", "value": "left", "desc": "向左浮动", },
//         ],
//         arrPropFrequency: [
//             { "label": "xxx", "value": "right", "desc": "xxxx", },
//         ]
//     },
// ]
// PUB.arrCssProp =PUB.arrCssProp





