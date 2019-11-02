<template>
  <div>
    <el-button plain @click="setAddInit" size="mini">设置formDataAddInit</el-button>

    <dm_debug_list>
      <dm_debug_item v-model="visible" text="visible" />
    </dm_debug_list>

    <dm_list_data
      :cf="cfList"
      @after-modify="afterModify"
      @after-show-Dialog-Add="showAdd"
      @after-show-Dialog-Modify="showModify"
      @after-show-Dialog-Detail="showDetail"
    >
      <template #slot_in_toolbar="{data:{tableData}}">插槽内容可显示tableData</template>
      <template v-slot:slot_form_expand_articleTitle="{row}">
        {{row}}
        <el-link type="primary" @click="fold(row)">收起</el-link>
      </template>
      <template #slot_column_CreateTime="{row}">
        <el-popover placement="top-start" width="200" trigger="click" v-model="visible[row.P1]">
          <!--候选值列表-->

          <el-button slot="reference" icon="el-icon-more">插槽{{row.P1}}</el-button>
        </el-popover>
      </template>
    </dm_list_data>
  </div>
</template>

<script>
let T;
import dm_list_data from "../components/list-data/list-data.vue";
import dm_dynamic_form from "../components/list-data/dynamic-form.vue";
export default {
  components: { dm_list_data, dm_dynamic_form },

  data() {
    return {
      visible: {},
      cfList: {
        listIndex: "list_projectContract",
        isShowBreadcrumb: false,
        flag: true,
        sortJsonDefault: { _id: -1 },
        findJsonDefault: { $or: [{ bidStatus: 4 }, { bidStatus: 6 }] },
         url: {
          list: "/crossList?page=paicheng_project", //列表接口
          add: "/crossAdd?page=paicheng_project", //新增接口
          modify: "/crossModify?page=paicheng_project", //修改接口
          detail: "/crossDetail?page=paicheng_project",
          delete: "/crossDelete?page=paicheng_project" //删除接口
        },
        columnOperate: { "min-width": 150 },
        batchBtns: {
          addon: [
            {
              type: "primary",
              uiType: "link",
              text: "新增项目",
              target: "_blank",
              url: "/projectDetail"
            },
            { text: "导出Excel", eventType: "export-excel" },
            { uiType: "slot", slot: "slot_in_toolbar" }
          ]
        },
        singleBtns: {
          addon: [
            {
              title: "删除",
              eventType: "delete",
              cfElBtn: { circle: true, icon: "el-icon-close" }
            },
            {
              uiType: "link",
              text: "项目详情",
              target: "_blank",
              url: "/projectDetail?projectId="
            }
          ]
        },
        dynamicDict: [
          {
            page: "paicheng_operator",
            populateColumn: "operatorDoc",
            idColumn: "operator",
            idColumn2: "P1"
          },
          {
            page: "paicheng_partyA",
            populateColumn: "partyADoc",
            idColumn: "partyAId",
            idColumn2: "P1"
          }
        ],
        columns: [
          {
            label: "Id",
            prop: "P1",
            width: 60,
            fixed: true,
            __id: "201911012219024545_87609"
          },
          {
            label: "项目名称",
            prop: "projectName",
            width: 220,
            fixed: true,
            slot: "slot_column_projectName",
            __id: "201911012219024545_34718"
          },
          {
            label: "合同号",
            prop: "contractNumber",
            width: 100,
            __id: "201911012219024545_47762"
          },
          {
            label: "项目状态",
            prop: "projectStatus",
            width: 90,
            __id: "201911012219024545_14541"
          },
          {
            label: "存风险",
            prop: "hasRisk",
            width: 75,
            __id: "201911012219024545_13192"
          },
          {
            label: "合同状态",
            prop: "contractStatus",
            width: 100,
            __id: "201911012219024545_2371"
          },
          {
            label: "签订时间",
            prop: "signTime",
            width: 100,
            __id: "201911012219024545_4850"
          },
          {
            label: "项目负责人",
            prop: "operator",
            width: 80,
            __id: "201911012219024545_13736"
          },
          {
            label: "发包方",
            prop: "partyAId",
            width: 75,
            __id: "201911012219024545_92249"
          },
          {
            label: "业务类型",
            prop: "businessType",
            width: 90,
            __id: "201911012219024545_63284"
          },
          {
            label: "合同面积 (㎡)",
            prop: "contractAcreage",
            width: 120,
            __id: "201911012219024545_30077"
          },
          {
            label: "合同金额 (元)",
            requireProp: ["cutPayMoney"],
            prop: "contractMoney",
            width: 120,
            __id: "201911012219024545_92806"
          },
          {
            label: "回款金额 （元）",
            prop: "returnMoney",
            width: 100,
            __id: "201911012219084545_91756"
          },
          {
            label: "开票金额（元）",
            prop: "invoiceMoney",
            width: 120,
            __id: "201911012219084545_74909"
          }
        ],
        searchFormItems: [
          { label: "Id", prop: "P1" },
          { label: "项目名称", prop: "projectName", type: "input_find_vague" },
          { label: "合同号", prop: "contractNumber", type: "input" },
          {
            label: "发包方",
            prop: "partyAId",
            type: "select",
            ajax: {
              url: "/i162_getList",
              keyLabel: "companyName",
              keyValue: "P1",
              param: { sheetTarget: { pageId: "P1767" } }
            }
          },
          {
            label: "业务经办",
            prop: "operator",
            type: "select",
            options: [],
            ajax: {
              url: "/i162_getList",
              " keyLabel": "name",
              keyValue: "P1",
              param: { sheetTarget: { pageId: "P1768" } }
            }
          },
          { label: "签订时间", prop: "signTime", type: "time_period" },
          {
            label: "业务类型",
            prop: "businessType",
            type: "select",
            options: [
              { value: 6, label: "自营业务" },
              { value: 1, label: "自营/平台化" },
              { value: 2, label: "创新业务" },
              { value: 3, label: "私人窗" },
              { value: 4, label: "平台业务" },
              { value: 5, label: "自营/合伙" }
            ],
            multiple: true
          },
          {
            label: "项目状态",
            prop: "projectStatus",
            type: "select",
            options: [
              { label: "未开始", value: "0" },
              { label: "在建", value: "1" },
              { label: "已完工", value: "2" },
              { label: "结算后质保", value: "3" },
              { label: "已结案", value: "4" }
            ]
          },
          {
            label: "存风险",
            prop: "hasRisk",
            type: "select",
            options: [{ label: "否", value: "0" }, { label: "是", value: "1" }]
          }
        ],
        detailItems: [],
        formItems: [],
        cfElTable: {
          "header-row-class-name": "n-table-head",
          "row-class-name": "n-table-row"
        },
        isMultipleSelect: true,
        isShowCheckedBox: true,
        isShowSearchForm: true,
        isShowPageLink: true,
        isShowOperateColumn: true,
        isShowToolBar: true,
        isRefreshAfterCUD: true,
        formDataAddInit: {}
      }
    };
  },

  computed: {
    cfData: function() {
      return this.$store.state.cfData;
    },
    flag: function() {
      return true;
    }
  },
  watch: {
    cfData: {
      handler(newName, oldName) {
        var t_json = JSON.stringify(this.cfData); //：{Json对象转换Json字符串函数}
        this.cfList = util.parseJson(t_json);
      },
      // immediate: true,
      deep: true
    }
  },

  methods: {
    async toggleList() {
      let result = !this.isShowList1;
      this.isShowList1 = null;

      await this.$nextTick(); //延迟到视图更新

      this.isShowList1 = result;
    },
    /**
     * @name 自定义单项操作按钮点击函数
     */
    singlebtnClick: function(eventType, row) {
      console.log("bacthBtnClick-singlebtnClick:", eventType);

      console.log("row:####", row);
    },
    /**
     * @name 自定义批量操作按钮点击函数
     */
    bacthBtnClick: function(eventType, selection) {
      console.log("bacthBtnClick-eventType:", eventType);
      console.log("selection:####", selection);
    },

    fold(row) {
      T.$refs.list1.$refs.table.toggleRowExpansion(row, false);
    },
    afterDelete(param, param1) {
      console.log("afterDelete");
      console.log("删除的数据:", param);
    },
    afterAdd(param, param1) {
      console.log("afterAdd");
      console.log("新增后的数据:", param);
      console.log("新增前的数据:", param1);
    },
    afterModify(param, param1) {
      console.log("afterModify");
      console.log("修改后的数据:", param);
      console.log("修改前的数据:", param1);
    },
    setAddInit() {
      this.cfList.formDataAddInit = { a: 1, b: 2, articleTitle: "234" };
    },
    showAdd() {
      this.cfList.formItems = [
        {
          label: "文章标题11",
          prop: "articleTitle",
          width: 200
        }
      ];
    },
    showModify() {
      // this.cfList.formItems = [
      //   {
      //       label: "文章标题11",
      //       prop: "articleTitle",
      //       width: 200
      //     }
      // ]
    },
    showDetail() {
      this.cfList.detailItems = [
        {
          label: "文章标题11",
          prop: "articleTitle",
          width: 200
        }
      ];
    }
  },
  created() {
    T = this;
    T.cfList2 = Object.assign({}, T.cfList, {
      listIndex: "list_demo2", //vuex对应的字段~
      focusMenu: true, //进行菜单聚焦
      twoTitle: "aaa", //面包屑1级菜单
      threeTitle: "bbb" //面包屑2级菜单
    });
  },
  async mounted() {
    this.$parent.showCFForm = true;
    this.$parent.cfForm.formItems = [
      // {
      //   label: "普通文本框(input)",
      //   prop: "prop1",

      // },

      {
        label: "显示查询表单",
        prop: "isShowSearchForm",
        type: "radio",
        default: true,
        options: [{ value: true, label: "是" }, { value: false, label: "否" }]
      },
      {
        label: "显示操作栏",
        prop: "isShowToolBar",
        type: "radio",
        default: true,
        options: [{ value: true, label: "是" }, { value: false, label: "否" }]
      },
      {
        label: "显示面包屑",
        prop: "isShowBreadcrumb",
        type: "radio",
        default: true,
        options: [{ value: true, label: "是" }, { value: false, label: "否" }]
      },
      {
        label: "显示分页",
        prop: "isShowPageLink",
        type: "radio",
        default: true,
        options: [{ value: true, label: "是" }, { value: false, label: "否" }]
      },

      {
        label: "接口地址",
        prop: "url",
        type: "jsonEditor"
      },

      {
        label: "查询表单",
        prop: "searchFormItems",
        type: "collection"
      },
      {
        label: "列配置",
        prop: "columns",
        type: "collection"
      },
      {
        label: "动态数据字典",
        prop: "dynamicDict",
        type: "collection"
      },
      {
        label: "详情弹窗字段",
        prop: "detailItems",
        type: "collection"
      },

      {
        label: "新增、修改表单字段",
        prop: "formItems",
        type: "collection"
      }
    ];

    var strJson = util.stringify(this.cfList);
    let json1 = JSON.parse(strJson);
    this.$store.commit("setCfData", json1);
  }
};
</script>

<style>
</style>
