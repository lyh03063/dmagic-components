<template>
  <div>
    <dm_debug_list>
      <dm_debug_item v-model="cf" text="list-data列表配置" />
      <dm_debug_item v-model="cf.objParamAddon" text="附加的列表查询参数" />
      <dm_debug_item v-model="objParam" text="列表查询参数" />
      <dm_debug_item v-model="cf.searchFormItems" text="筛选表单配置" />
      <dm_debug_item v-model="cf.dynamicDict" text="动态数据字典配置" />
      <dm_debug_item v-model="tableData" text="列表数据" />
    </dm_debug_list>
    <el-breadcrumb separator-class="el-icon-arrow-right" v-if="cf.isShowBreadcrumb" class="MB12">
      <el-breadcrumb-item :to="{ path: '/listHome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{cf.twoTitle}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{cf.threeTitle}}</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="search-form-box MB10" v-if="cf.isShowSearchForm">
      <dynamicForm @submit1="searchList" :cf="cfSearchForm" v-model="objParam.findJson"></dynamicForm>
    </div>
    <!-- v-if="cf.flag"这个规则去掉 -->
    <el-row size="mini" class="MB10" v-if="cf.isShowToolBar">
      <template class v-if="$lodash.hasIn(cf, 'batchBtns.addon')">
        <template class v-for="(item,index) in cf.batchBtns.addon">
          <slot class v-if="item.uiType=='slot'" :name="item.slot" :data="$data"></slot>
          <a
            class="MR10"
            :target="item.target"
            :href="item.url||'javascript:;'"
            :key="index"
            v-else
          >
            <el-button
              v-bind="item.cfElBtn"
              @click="batchBtnClick(item.eventType,item.needSelect)"
              :key="index"
              size="mini"
            >{{$lodash.get(item, `cfElBtn.text`)||item.text}}</el-button>
          </a>
        </template>
      </template>

      <span
        class
        v-html="$lodash.get(cf, `batchBtns.tips.text`)"
        v-if="$lodash.get(cf, `batchBtns.tips`)"
        :style="getTipsStyle(cf)"
      ></span>
    </el-row>

    <!--主列表-->

    <el-table
      highlight-current-row
      ref="table"
      :data="tableData"
      border
      :stripe="true"
      :cell-style="{padding:'3px'}"
      :header-cell-style="{padding:'6px'}"
      style="width: 100%;"
      @selection-change="selectionChange"
    >
      <el-table-column
        fixed
        label="id"
        prop="P1"
        :width="40"
        type="selection"
        v-if="cf.isShowCheckedBox"
      ></el-table-column>
      <el-table-column :width="40" type="expand" v-if="cf.expand" fixed>
        <template slot-scope="props">
          <div v-for="(item,index) in cf.expands" :key="index">
            <div>
              <span style="display:inline-block;width: 80px;">{{item.label}}：</span>
              <!--Q1:有slot-->
              <slot :name="item.slot" :row="props.row" v-if="item.slot"></slot>
              <!--Q2:有formatter-->
              <span class v-else-if="item.formatter">{{item.formatter(props.row)}}</span>
              <span v-else>{{props.row[item.prop]}}</span>
            </div>
          </div>
        </template>
      </el-table-column>

      <template class v-for="column in cf.columns">
        <!--这里不能使用v-bind=“column”,slot会冲突，这点没设计好！！-->
        <el-table-column
          :prop="column.prop"
          :label="column.label"
          :width="column.width"
          :type="column.type"
          :fixed="column.fixed"
          :formatter="column.formatter"
          :show-overflow-tooltip="true"
          :key="column.__id"
        >
          <template slot-scope="scope">
            <!--Q1:有插槽-->
            <slot :name="column.slot" :row="scope.row" v-if="column.slot"></slot>
            <!--Q2:有formatter-->
            <span class v-else-if="column.formatter">{{column.formatter(scope.row)}}</span>
            <!--Q3:可跳转的统计数字链接-->
            <a
              class="link-blue"
              href="javascript:;"
              @click="filterData({pid:scope.row.P1,listIndex:column.statistics.listIndex, targetIdKey:column.statistics.targetIdKey})"
              v-else-if="column.statistics"
            >{{scope.row[column.prop]}}</a>
            <!--Q4:其他-->
            <span class v-else>{{scope.row[column.prop]}}</span>
          </template>
        </el-table-column>
      </template>

      <el-table-column fixed="right" label="操作" min-width="140" v-if="cf.isShowOperateColumn">
        <template slot-scope="scope" class="operation-box">
          <template class v-if="$lodash.hasIn(cf, 'singleBtns.addon')">
            <template class v-for="(item,index) in cf.singleBtns.addon">
              <a
                :class="item.class"
                :target="item.target"
                :title="item.title"
                :href="item.url?item.url+scope.row.P1:'javascript:;'"
                :key="index"
              >
                <el-button
                  v-bind="item.cfElBtn"
                  @click="singleBtnClick(item.eventType,scope.row)"
                  :key="index"
                  size="mini"
                  class="MR5"
                >
                  <template
                    class
                    v-if="!($lodash.get(item, `cfElBtn.circle`))"
                  >{{$lodash.get(item, `cfElBtn.text`)||item.text}}</template>
                </el-button>
              </a>
            </template>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <div class="OFH">
      <el-pagination
        background
        layout="total,prev, pager, next"
        @current-change="handleCurrentChange"
        :total="allCount"
        :pageSize="objParam.pageSize"
        style="float:right;margin:10px 0 0 0;"
        v-if="cf.isShowPageLink"
      ></el-pagination>
    </div>
    <!-- @after-delete="$emit('after-delete')" -->
    <listDialogs
      ref="listDialogs"
      :cf="cf"
      @after-add="(data,olddata)=>{$emit('after-add',data,olddata)}"
      @after-modify="(newdata,olddata)=>{$emit('after-modify',newdata,olddata)}"
      @after-show-Dialog-Modify="(row)=>{$emit('after-show-Dialog-Modify',row)}"
    >
      <template v-slot:[item.slot]="{row}" v-for="item in cf.detailItems">
        <!--根据cf.detailItems循环输出插槽--详情弹窗-->
        <slot :name="item.slot" :row="row" v-if="item.slot"></slot>
      </template>
      <!-- 自定义详情弹窗插槽 -->
      <template v-slot:customDetail="{detailData}">
        <slot name="customDetail" :detailData="detailData"></slot>
      </template>

      <!--这里的for循环的item不要跟上面的重名，否则冲突！！！所以使用formItem-->
      <template v-slot:[formItem.slot]="{formData}" v-for="formItem in cf.formItems">
        <!--根据cf.formItems循环输出插槽--新增修改表单弹窗-->
        <slot :name="formItem.slot" :formData="formData" v-if="formItem.slot"></slot>
      </template>
      <!--列表用到的各种弹窗-->
    </listDialogs>
    <div class></div>
  </div>
</template>
<script>
// import Vue from "vue";
import listDialogs from "./list-dialogs";
import dynamicForm from "./dynamic-form";
// import { log } from "util";
export default {
  name: "dm_list_data", //组件名，用于递归
  components: { listDialogs, dynamicForm }, //注册组件
  props: {
    cf: {
      //列表的配置
      type: Object,
      default: function() {
        return {};
      }
    }
  },

  data() {
    return {
      //------------------筛选表单组件配置--------------
      cfSearchForm: {
        // col_span: 8,//控制显示一行多列
        labelWidth: "auto",
        size: "mini",
        inline: true,
        formItems: this.cf.searchFormItems,
        watch: lodash.get(this.cf, `cfSearchForm.watch`), //监听器配置
        btns: [{ text: "查询", event: "submit1", type: "primary" }]
      },

      //------------------列表的数据总量--------------
      allCount: 20,
      //------------------ajax请求数据列表的传参对象--------------
      objParam: {
        findJson: {},
        pageIndex: 1, //第1页
        pageSize: this.cf.pageSize || 10 //每页10条
      },

      tableData: [] //列表数据
    };
  },

  watch: {
    "cf.objParamAddon": {
      handler(newName, oldName) {
        Object.assign(this.objParam, this.cf.objParamAddon); //合并对象
        this.objParam = util.deepCopy(this.objParam); //深拷贝强制更新
      },
      immediate: true,
      deep: true
    }
  },

  methods: {
    //选择数据
    selectionChange(val) {
      console.log("selectionChange");
      if (this.cf.isMultipleSelect) return;
      if (val.length > 1) {
        this.$refs.table.clearSelection();
        this.$refs.table.toggleRowSelection(val.pop());
      }
    },
    //获取提示样式的函数
    getTipsStyle(cf) {
      let styleAdd = lodash.get(this.cf, `batchBtns.tips.style`);
      let style = { color: "#f90" };
      return Object.assign(style, styleAdd); //合并对象
    },
    //自定义单项操作按钮的点击事件
    singleBtnClick(eventType, row) {
      this.$emit("single-btn-click", eventType, row);
    },
    //自定义批量操作按钮的点击事件
    batchBtnClick(eventType, needSelect) {
      if (needSelect) {
        //  得到选中的数据对象
        var selection = this.$refs.table.selection;
        //  有选中的就遍历得到P1，进行批量删除
        if (selection.length > 0) {
          this.$emit("bacth-btn-click", eventType, selection); //抛出自定义事件
        } else {
          return this.$message({ message: "未选中数据", type: "error" });
        }

        if (eventType == "delete") {
          //批量删除

          this.deleteSelection();
        }
      } else {
        if (eventType == "add") {
          //新增
          this.showAdd();
        }
      }

      return this.$emit("bacth-btn-click", eventType); //抛出自定义事件
    },
    showAdd() {
      this.$emit("after-show-Dialog-Add");
      this.$store.commit("openDialogAdd", this.cf.listIndex);
    },
    // 删除选中数据的方法
    deleteSelection() {
      //  得到选中的数据对象
      var selects = this.$refs.table.selection;
      //  有选中的就遍历得到P1，进行批量删除
      if (selects.length > 0) {
        var arr = [];
        for (let i = 0; i < selects.length; i++) {
          arr.push(selects[i].P1);
        }
        //  调用方法删除数据
        this.confirmDelete(arr);
        // 没有选中的数据提示用户
      }
    },
    //统计字段筛选数据并跳转页面函数
    filterData(param) {
      let { pid, listIndex, targetIdKey } = param;
      //函数：{筛选数据函数}
      //targetIdKey:筛选目标列表的条件列字段名
      //listIndex页面的标记
      //pid当前的数据id

      this.$store.commit("setListFindJson", {
        //改变列表的初始状态值
        listIndex,
        findJson: { [targetIdKey]: pid } //es6的对象属性名用变量替代的方法
      });
      this.$router.push({ path: "/" + listIndex });
    },
    async showDetail(row) {
      //判断详情接口是否存在，如果存在，进行ajax请求
      this.$emit("after-show-Dialog-Detail", row);
      if (this.cf.url.detail) {
        //如果{详情ajax地址}存在
        let { data } = await axios({
          //请求接口
          method: "post",
          url: PUB.domain + this.cf.url.detail,
          data: {
            id: row.P1
          } //传递参数
        });
        row = data.Doc;
      }

      this.$store.commit("openDialogDetail", {
        listIndex: this.cf.listIndex,
        row: row
      });
    },
    //-------------确认删除数据的函数--------------
    async confirmDelete(dataId) {
      let clickStatus = await this.$confirm("确认删除该数据？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).catch(() => {});

      let deleteData = []; //删除的数据，统一为数组格式
      if (clickStatus == "confirm") {
        let idType = util.type(dataId);
        //如果是id数组（批量删除）
        if (idType == "array") {
          deleteData = this.tableData.filter(doc => dataId.includes(doc.P1));
        } else {
          deleteData = [this.tableData.find(doc => doc.P1 == dataId)];
        }
        deleteData = util.deepCopy(deleteData);

        //用户点击了确认
        await axios({
          //请求接口
          method: "post",
          url: PUB.domain + this.cf.url.delete,
          data: {
            findJson: {
              //用于定位要修改的数据
              P1: dataId
            }
          } //传递参数
        }).catch(function(error) {
          alert("异常:" + error);
        });

        this.$message({
          message: "删除成功",
          duration: 1500,
          type: "success"
        });
        this.$emit("after-delete", deleteData); //触发外部事件
        //如果{增删改操作后是否自动刷新}为真
        if (this.cf.isRefreshAfterCUD) {
          this.getDataList(); //更新数据列表
        }
      }
    },
    //-------------查询列表的函数--------------
    searchList() {
      this.getDataList(); //第一次加载此函数，页面才不会空
    },

    //-------------处理分页变动函数--------------
    handleCurrentChange(pageIndex) {
      this.objParam.pageIndex = pageIndex; //改变ajax传参的第几页
      this.getDataList(); //第一次加载此函数，页面才不会空
    },
    //-------------ajax获取数据列表函数--------------
    async getDataList() {
      //最终需要提交的参数
      let objParamFinal = util.deepCopy(this.objParam); //深拷贝,后续处理数据避免影响查询表单
      /****************************将空数组处理成null-START****************************/
      //for of循环遍历对象，for of不能直接处理对象，本质上是同个Object.keys拼装一个新数组进行辅助
      let obj1 = objParamFinal.findJson;
      //将空数组处理成null******
      for (var key of Object.keys(obj1)) {
        let type = util.type(obj1[key]);
        if (type == "array" && obj1[key].length === 0) {
          //如果是空数组
          obj1[key] = null;
        }
        //是否需要删除
        let isDelete = lodash.get(this.cf, `deleteFindJson.${key}`);
        if (isDelete) {
          //如果需要删除
          delete obj1[key];
        }
      }

      /****************************将空数组处理成null-END****************************/

      let { data } = await axios({
        //请求接口
        method: "post",
        url: PUB.domain + this.cf.url.list,
        data: objParamFinal
      });

      let { list, page } = data; //解构赋值
      this.tableData = list;
      this.page = page;
      this.allCount = page.allCount; //更改总数据量

      if (this.cf.dynamicDict) {
        //如果{填充配置数组}存在.

        for await (const populateCFEach of this.cf.dynamicDict) {
          // await   funPopulate(populateCFEach);//调用：{根据填充配置进行一次ajax请求关联数据的函数}
          let { page, populateColumn, idColumn, idColumn2 } = populateCFEach;
          this.tableData = await util.ajaxPopulate({
            listData: this.tableData,
            page,
            populateColumn,
            idColumn,
            idColumn2
          });
        }
      }
      this.$emit("after-search", this.tableData); //触发外部事件
    }
  },

  created() {
    this.cf.isMultipleSelect === false || (this.cf.isMultipleSelect = true);
    this.cf.isShowCheckedBox === false || (this.cf.isShowCheckedBox = true);
    this.cf.isShowSearchForm === false || (this.cf.isShowSearchForm = true);
    this.cf.isShowBreadcrumb === false || (this.cf.isShowBreadcrumb = true);
    this.cf.isShowPageLink === false || (this.cf.isShowPageLink = true);
    this.cf.isShowOperateColumn === false ||
      (this.cf.isShowOperateColumn = true);
    this.cf.isShowToolBar === false || (this.cf.isShowToolBar = true);
    this.cf.isRefreshAfterCUD === false || (this.cf.isRefreshAfterCUD = true);

    let findJsonDefault = this.cf.findJsonDefault || {};
    //读取vuex的当前列表页默认筛选参数
    let defultFindJson = this.$store.state.defultFindJson[this.cf.listIndex];
    if (defultFindJson) {
      //如果{默认的查询参数}存在，清空默认查询参数，避免下次切换时还保留
      Object.assign(findJsonDefault, defultFindJson); //合并对象

      this.$store.commit("setListFindJson", {
        //改变列表的初始状态值
        listIndex: this.cf.listIndex,
        findJson: {}
      });
    }

    this.objParam.findJson = findJsonDefault;
    this.objParam.sortJson = this.cf.sortJsonDefault;

    /****************************拼装selectJson参数-START****************************/
    let selectJson = { P1: 1 }; //P1有时候在列表不显示，但也一定要加上

    this.cf.columns.forEach(columnEach => {
      columnEach.__id = util.getTimeRandom();
      selectJson[columnEach.prop] = 1;
      //如果依赖字段存在**
      if (columnEach.requireProp && columnEach.requireProp.length) {
        columnEach.requireProp.forEach(rPropEach => {
          selectJson[rPropEach] = 1;
        });
      }
    });

    this.objParam.selectJson = selectJson;
    /****************************拼装selectJson参数-END****************************/

    // 如果当前页面需要自定义查询接口数据
    if (this.cf.findJson) {
      this.objParam.findJson[this.cf.findJson.type] = this.cf.findJson.value;
    }

    let objState = {
      //列表的vuex初始状态对象
      isShowDialogAdd: false, //是否显示新增弹窗
      isShowDialogDetail: false, //是否显示详情弹窗
      row: {} //当前查看详情的行数据
    };

    this.$store.commit("initListState", {
      //改变列表的初始状态值
      listIndex: this.cf.listIndex,
      objState: objState
    });

    if (this.cf.focusMenu) {
      //如果需要聚焦菜单
      this.$store.commit("changeActiveMenu", this.cf.listIndex); //菜单聚焦
    }

    //添加标准批量操作按钮
    let batchBtnsAddon = lodash.get(this.cf, `batchBtns.addon`);
    if (!batchBtnsAddon) {
      lodash.set(this.cf, `batchBtns.addon`, [
        util.cfList.bBtns.add,
        util.cfList.bBtns.delete
      ]);
    }

    //添加标准单选操作按钮
    let singleBtnsAddon = lodash.get(this.cf, `singleBtns.addon`);
    if (!singleBtnsAddon) {
      lodash.set(this.cf, `singleBtns.addon`, [
        util.cfList.sBtns.detail,
        util.cfList.sBtns.modify,
        util.cfList.sBtns.delete
      ]);
    }

    //监听标准的单选操作按钮事件
    this.$on("single-btn-click", function(eventType, row) {
      if (eventType == "delete") {
        this.confirmDelete(row.P1);
      } else if (eventType == "modify") {
        this.$refs.listDialogs.showModify(row);
      } else if (eventType == "detail") {
        this.showDetail(row);
      }
    });
  },

  async mounted() {
    await util.timeout(30); //延迟,处理getDataList中处理空数组字段需要，
    console.log("神奇！！");
    //不加这一句的话一开始空数组是undefined，但提交时却变成 []，神奇！！
    //等待模板加载后，
    this.getDataList(); //第一次加载此函数，页面才不会空
  }
};
</script>


<style scoped>
.search-form-box {
  border: 1px #ebeef5 solid;
  border-radius: 5px;
  padding: 15px 5px 0 12px;
}
.cell .el-button + .el-button {
  margin-left: 0px;
}

body .table-normal td {
  line-height: 150%;
}
</style>
