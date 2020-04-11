PUB.listCF = PUB.listCF || {}

PUB.listCF.list_demo = {
  breadcrumb: [
    { value: "首页", path: "/listHome" },
    { value: "其他数据" },
    { value: "文章管理xxxx" }
  ],
  cfElTable: {
    // "@cell-dblclick": "cellDblclick",
    //默认排序图标显示，需要配合sortJsonDefault
    "default-sort": { prop: "CreateTime", order: "descending" }
  },
  // powerPath:"newsCenter.list_article",
  pageSize: 2,
  listIndex: "list_demo", //vuex对应的字段~
  focusMenu: true, //进行菜单聚焦
  expand: true, //是否展开行
  //操作列配置
  columnOperate: {
    "min-width": 200
  },

  //dynamicDict动态数据字典配置
  dynamicDict: [
    {
      page: "tangball_article_category",
      populateColumn: "categoryDoc",
      idColumn: "articleCategory",
      idColumn2: "P1"
    }
  ],
  //列表单项操作按钮的配置
  singleBtns: {
    // detail:false,
    // modify:false,
    //delete: false, //配置基础按钮隐藏（默认显示）
    addon: [
      util.cfList.sBtns.detail,
      util.cfList.sBtns.modify,
      util.cfList.sBtns.copy,
      util.cfList.sBtns.delete,

      {
        title: "单项操作（圆形按钮）",
        eventType: "singleOP1",
        cfElBtn: {
          circle: true,
          icon: "el-icon-user-solid"
        }
      },
      {
        title: "单项操作（普通按钮）",
        text: "操作",
        eventType: "singleOP2"
      },
      {
        uiType: "link",
        text: "新窗口打开页面",
        target: "_blank",
        urlFormatter: function (row) {
          return `http://www.baidu.com?id=${row.name}`;
        },
        url: "http://www.baidu.com?id=" //这里要配置好参数名，内部会把参数加进来
        // url: "http://www.baidu.com?id=" //这里要配置好参数名，内部会把参数加进来
      }
    ]
  },
  //批量操作按钮的配置
  batchBtns: {
    addon: [
      util.cfList.bBtns.add,
      util.cfList.bBtns.delete,
      util.cfList.bBtns.refresh,
      util.cfList.bBtns.exportExcel,
      {
        text: "批量操作（需选数据2）",
        eventType: "bacthOP1",
        needSelect: true,
        hide:true,
        cfElBtn: {
          id:"id_bacthOP1",
          icon: "el-icon-user-solid",
        }
      },
      { text: "其他操作（不需选中数据）", eventType: "bacthOP2" },
      {
        uiType: "link",
        text: "新窗口打开页面",
        target: "_blank",
        url: "http://www.baidu.com",
        cfElBtn: {
          type: "primary",
          icon: "el-icon-user-solid",
          class:"DPN"
        }
      },
      { uiType: "slot", slot: "slot_in_toolbar" }
    ],
    tips: {
      text: "提示语123"
      // style:{"color":"#3a0"}
    }
  },
  formDataAddInit111: {
    bbb: "来自formDataAddInit"
  },
  paramAddonPublic: {
    ccc: "来自paramAddonPublic"
  },
  deleteFindJson: {
    //ajax查询参数中需要删除的参数
    //  articleTitle: true
  },
  //列表接口的附加参数
  objParamAddon: {
    aaa: 1111
  },
  cfSearchForm: {
    watch: {
      //传入监听器
      articleCategory(newVal, oldVal) {
        // this.value.articleTitle = { a: 1 };
      }
    }
  },
  //新增修改弹窗的配置
  cfDialogForm: {
    tips: {
      text: "1,表单的提示语1<br/> 2,表单的提示语2",
      style: { "padding-left": "200px" }
    }
  },
  //新增修改表单的配置
  cfForm: {
    col_span: 12, //控制显示一行多列
    watch: {
      //传入监听器
      articleCategory(newVal, oldVal) {
        this.value.articleTitle = this.value.articleTitle + "a";
      }
    },
    cfFormAdd: {
      col_span: 24 //控制显示一行多列
    }
  },
  url: {
    list: "/crossList?page=info_piece", //列表接口
    add: "/crossAdd?page=info_piece", //新增接口
    modify: "/crossModify?page=info_piece", //修改接口
    detail: "/crossDetail?page=info_piece",
    delete: "/crossDelete?page=info_piece" //删除接口
  },

  //expands展开行的显示字段配置
  expands: [
    {
      label: "",
      prop: "name",
      slot: "slot_form_expand_articleTitle"
    },
    {
      label: "分类名称",
      prop: "articleCategory",
      requireProp: ["articleContent"], //依赖文章详情，列表需返回该字段
      width: 150,
      formatter11111: function (rowData) {
        let name = lodash.get(rowData, "categoryDoc.name");
        return name;
      }
    }
  ],
  //-------列配置数组-------
  columns: [
    COLUMNS.name_fixed,
    {
      label: "案件状态1",
      prop: "status",
      filters: [
        { text: "待立案", value: 1 },
        { text: "已结案", value: 2 }
      ],
      columnKey: "status",
      cfColumn: { "class-name": "table_cell_visible" }
    },
    {
      label: "描述",
      prop: "desc",
      width: 145,
      edit: true,

    },
    {
      sortable: "custom",
      label: "创建时间",
      prop: "CreateTime",
      width: 145,
      slot: "slot_column_CreateTime"
    },
    {

      label: "自定义全局组件",
      prop: "com_test1",
      width: 145,
      component: "com_test1",
    },
    COLUMNS.extend
  ],
  //-------筛选表单字段数组-------
  searchFormItems: [F_ITEMS.select1, F_ITEMS.name_search],
  //-------详情字段数组-------
  detailItems: [COLUMNS.name, {

    label: "自定义全局组件",
    prop: "com_test1",
    width: 145,
    component: "com_test1",
  },],
  //-------新增、修改表单字段数组-------
  formItems: [F_ITEMS.name, F_ITEMS.desc]
}