<template>
  <div class="list-data-box" :id="id">
    <dm_debug_list>
      <dm_debug_item v-model="cf" text="list-data列表配置" />
      <dm_debug_item v-model="cf.objParamAddon" text="附加的列表查询参数" />
      <dm_debug_item v-model="objParam" text="列表查询参数" />
      <dm_debug_item v-model="cf.searchFormItems" text="筛选表单配置" />
      <dm_debug_item v-model="cf.dynamicDict" text="动态数据字典配置" />
      <dm_debug_item v-model="tableData" text="列表数据" />
    </dm_debug_list>
    <!-- 兼容之前版本面包屑 -->
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      v-if="cf.isShowBreadcrumb && !cf.breadcrumb"
      class="MB12"
    >
      <el-breadcrumb-item :to="{ path: '/listHome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ cf.twoTitle }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ cf.threeTitle }}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 新面包屑 -->
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      v-if="cf.isShowBreadcrumb && cf.breadcrumb"
      class="MB12"
    >
      <el-breadcrumb-item v-for="(item, index) in cf.breadcrumb" :key="index">
        <!-- <a :href="item.path" v-if="item.path">{{item.value}}</a> -->
        <router-link :to="item.path" v-if="item.path">{{
          item.value
        }}</router-link>
        <span v-else>{{ item.value }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <!--查询表单-->
    <div class="search-form-box MB10" v-if="cf.isShowSearchForm">
      <dm_dynamic_form
        @submit1="searchList"
        :cf="cfSearchForm"
        v-model="objParam.findJson"
      ></dm_dynamic_form>
    </div>
    <!-- v-if="cf.flag"这个规则去掉 -->
    <el-row size="mini" class="MB10" v-show="cf.isShowToolBar">
      <template class v-if="$lodash.hasIn(cf, 'batchBtns.addon')">
        <template class v-for="(item, index) in cf.batchBtns.addon">
          <slot
            class
            v-if="item.uiType == 'slot'"
            :name="item.slot"
            :data="$data"
            :props="$props"
          ></slot>
          <!--组件形式，配置ref用于外部控制-->
          <component
            :key="index"
            v-else-if="item.uiType == 'component'"
            :is="item.component"
            :ref="item.ref"
            @list-event-in="comListEventIn"
            :data="$data"
            :props="$props"
          ></component>
          <a
            class="MR10"
            :target="item.target"
            :href="item.url || 'javascript:;'"
            :key="index"
            v-else
            v-show="!item.hide"
          >
            <el-button
              v-bind="item.cfElBtn"
              @click="batchBtnClick(item.eventType, item.needSelect)"
              :key="index"
              size="mini"
              :id="getBacthButtonId(item)"
              >{{ $lodash.get(item, `cfElBtn.text`) || item.text }}</el-button
            >
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

    <dm_list_flex_res
      class
      :list="tableData"
      v-bind="cf.cfListFlex"
      v-if="!cf.isShowTable"
    >
      <template #noData>
        <slot class name="noData"></slot>
      </template>

      <template #default="{ item, index }">
        <!--如果有配置卡片,通过cfComCard传递附近配置-->
        <component
          :item="item"
          :index="index"
          :is="cf.comCard"
          v-if="cf.comCard"
          v-bind="cf.cfComCard"
        ></component>
        <!--否则--使用插槽-->
        <slot class v-else name="card" :item="item" :index="index">
          <div class>{{ item }}</div>
        </slot>
      </template>
    </dm_list_flex_res>
    <!--主列表-->
    <el-table
      class="table-need-export"
      v-bind="cf.cfElTable"
      v-loading="loading"
      highlight-current-row
      ref="table"
      :data="tableData"
      border
      :stripe="true"
      :cell-style="{ padding: '5px' }"
      :header-cell-style="{ padding: '5px' }"
      style="width: 100%"
      @sort-change="sortChange"
      @selection-change="selectionChange"
      @filter-change="filterHandler"
      :row-key="cf.idKey"
      v-if="cf.isShowTable"
    >
      <el-table-column
        :fixed="getFixed(true)"
        label="Id"
        :prop="cf.idKey"
        :width="26"
        type="selection"
        v-if="cf.isShowCheckedBox"
      ></el-table-column>
      <el-table-column
      
        :width="cf.expandWidth||40"
        type="expand"
        v-if="cf.expand"
        :fixed="getFixed(true)"
      >
        <template slot-scope="props">
          <div class="" v-if="cf.expandsCom">
            <!--自定义组件-->
            <component
              :is="cf.expandsCom"
              :cfListParent="cf"
              :row="props.row"
            ></component>
          </div>
          <div class="" v-else>
            <div v-for="(item, index) in cf.expands" :key="index">
              <div>
                <span style="display: inline-block; width: 80px"
                  >{{ item.label }}：</span
                >
                <!--Q1:有slot-->
                <slot
                  :name="item.slot"
                  :row="props.row"
                  v-if="item.slot"
                ></slot>
                <!--Q2:有formatter-->
                <span class v-else-if="item.formatter">{{
                  item.formatter(props.row)
                }}</span>
                <span v-else>{{ props.row[item.prop] }}</span>
              </div>
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
          :fixed="getFixed(column.fixed)"
          :formatter="column.formatter"
          :sortable="column.sortable"
          :column-key="column.columnKey"
          :filters="column.filters"
          v-bind="column.cfColumn"
          :show-overflow-tooltip="column.showOverflowTooltip"
          :key="column.__id"
        >
          <!--如果是多级表头-->

          <el-table-column
            class
            v-for="(columnSon, i) in column.columnChildren"
            v-bind="columnSon"
            :key="i"
          ></el-table-column>

          <!-- slot-scope="scope" -->
          <template v-slot="scope">
            <div class="DPI">
              <!--Q1:有插槽-->
              <slot
                :name="column.slot"
                :row="scope.row"
                v-if="column.slot"
              ></slot>
              <!--Q2:有formatter-->
              <span class v-else-if="column.formatter">{{
                column.formatter(scope.row)
              }}</span>
              <!--Q4:有组件名--cfAddon附加参数-->
              <component
                v-else-if="column.component"
                :is="column.component"
                @list-event-in="comListEventIn"
                :addon="column.addon"
                :doc="scope.row"
                :prop="column.prop"
                :cfListParent="cf"
              ></component>
              <!--Q5:其他-->
              <span class v-else>{{ scope.row[column.prop] }}</span>
              <i
                class="el-icon-edit icon-edit"
                v-if="column.edit"
                @click="tdEdit(scope.row, column)"
              ></i>
            </div>
          </template>
        </el-table-column>
      </template>
      <el-table-column
        :fixed="getFixed('right')"
        label="操作"
        :min-width="$lodash.get(cf, `columnOperate['min-width']`, 140)"
        v-if="cf.isShowOperateColumn"
      >
        <!-- <div class="" :test="test(scope)" >test调1次</div> -->
        <template class="operation-box" v-slot="scope">
          <!-- <div class="" :test="test(scope)" >test调9次</div> -->
          <template class v-if="$lodash.hasIn(cf, 'singleBtns.addon')">
            <template class v-for="(item, index) in cf.singleBtns.addon">
              <a
                :class="item.class"
                :target="item.target"
                :title="item.title"
                :href="getSigleLinkUrl(item, scope.row)"
                :key="index"
              >
                <el-button
                  v-bind="item.cfElBtn"
                  @click="singleBtnClick(item.eventType, scope.row)"
                  :key="index"
                  size="mini"
                  style="margin-right: 5px"
                >
                  <template class v-if="!$lodash.get(item, `cfElBtn.circle`)">{{
                    $lodash.get(item, `cfElBtn.text`) || item.text
                  }}</template>
                </el-button>
              </a>
            </template>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <div class="OFH" v-if="isShowPageLink">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="objParam.pageIndex"
        :total="allCount"
        :pageSize="objParam.pageSize"
        @size-change="handleSizeChange"
        v-bind="cf.cfPagination"
      ></el-pagination>
    </div>
    <!-- @after-delete="$emit('after-delete')" -->
    <listDialogs
      ref="listDialogs"
      :cf="cf"
      :tableData="tableData"
      @after-add="
        (data, olddata) => {
          $emit('after-add', data, olddata);
        }
      "
      @after-modify="
        (newdata, olddata) => {
          $emit('after-modify', newdata, olddata);
        }
      "
      @after-show-Dialog-Modify="
        (row) => {
          $emit('after-show-Dialog-Modify', row);
        }
      "
    >
      <template v-slot:[item.slot]="{ row }" v-for="item in cf.detailItems">
        <!--根据cf.detailItems循环输出插槽--详情弹窗-->
        <slot :name="item.slot" :row="row" v-if="item.slot"></slot>
      </template>
      <!-- 自定义详情弹窗插槽 -->
      <template v-slot:customDetail="{ detailData }">
        <slot name="customDetail" :detailData="detailData"></slot>
      </template>
      <!--这里的for循环的item不要跟上面的重名，否则冲突！！！所以使用formItem-->
      <template
        v-slot:[formItem.slot]="{ formData }"
        v-for="formItem in cf.formItems"
      >
        <!--根据cf.formItems循环输出插槽--新增修改表单弹窗-->
        <slot
          :name="formItem.slot"
          :formData="formData"
          v-if="formItem.slot"
        ></slot>
      </template>
      <!--列表用到的各种弹窗-->
    </listDialogs>
  </div>
</template>
<script>
// import Vue from "vue";
import listDialogs from "./list-dialogs";

// import { log } from "util";
export default {
  name: "dm_list_data", //组件名，用于递归
  components: {
    listDialogs,
  }, //注册组件
  props: {
    value: Array, //绑定的静态数据
    cf: {
      //列表的配置
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  data() {
    return {
      id: `id_${util.getTimeRandom()}`,//随机Id，导出excel表格时需用到
      loading: false,//加载中




      //------------------筛选表单组件配置--------------
      cfSearchForm: {
        // col_span: 8,//控制显示一行多列
        labelWidth: "90px", size: "mini", inline: true,
        formItems: this.cf.searchFormItems,
        watch: lodash.get(this.cf, `cfSearchForm.watch`), //监听器配置
        btns: [{ text: "查询", event: "submit1", type: "primary" }]
      },
      //------------------列表的数据总量--------------
      allCount: 0,
      //------------------ajax请求数据列表的传参对象--------------
      objParam: {
        findJson: {},
        pageIndex: 1, //第1页
        pageSize: this.cf.pageSize || 10 //每页10条
      },
      tableData: [] //列表数据
    };
  },
  computed: {
    isShowPageLink: function () {

      let flag = this.cf.isShowPageLink

      if (this.cf.isShowPageLinkHasAPage) {//如果{满一页才显示分页}

        let flag2 = this.allCount >= this.objParam.pageSize
        flag = flag && flag2

      }
      return flag

    }


  },
  watch: {
    "cf.objParamAddon": {
      immediate: true, deep: true,
      handler(newVal, oldVal) {
        if (PUB._paramAjaxAddon) {//如果需要合并公共变量的基础ajax参数--注意顺序
          Object.assign(this.objParam, PUB._paramAjaxAddon)//合并公共变量的基础参数
        }
        Object.assign(this.objParam, this.cf.objParamAddon); //合并对象
        this.objParam = util.deepCopy(this.objParam); //深拷贝强制更新
      },
    },
    tableData: {
      //tableData可以使用v-model进行绑定
      handler(newVal, oldVal) {
        this.$emit("input", this.tableData); //触发外部value的改变，使用watch的话不太好，会有延迟
      },
      deep: true
    },
    value: {
      handler(newVal, oldVal) {
        if (this.value) {
          this.tableData = this.value;
        }
      },
      deep: true
    }
  },
  methods: {
    
    //函数：{处理并返回固定列状态函数}
    getFixed: function (flag) {
      if (this.cf.forbidFixed) {//如果禁止固定列
        return false
      }
      return flag


    },
    //函数：{行拖拽功能初始化函数}
    async rowDrop() {

      await util.loadJs({ url: `//qn-static.dmagic.cn/Sortable.1.10.2.min.js` })//加载
      // 此时找到的元素是要拖拽元素的父容器-
      //***注意id的使用，这样才能支持但跟页面内多组拖拽排序
      const tbody = document.querySelector(`#${this.id} .el-table__body-wrapper tbody`);
      const _this = this;
      Sortable.create(tbody, {
        handle: '.drag_handel',//执行拖拽的元素
        //  指定父元素下可被拖拽的子元素
        draggable: ".el-table__row",
        onEnd({ newIndex, oldIndex }) {
          let docOld = _this.tableData[oldIndex];
          let docNew = _this.tableData[newIndex];
          const currRow = _this.tableData.splice(oldIndex, 1)[0];
          _this.tableData.splice(newIndex, 0, currRow);
          _this.$emit("sort_by_drag", { docOld, docNew })//抛出事件
        }
      });
    },
    //函数：{列组件传递的事件函数}
    comListEventIn(param = {}) {
      let { callbackInList, eventType, doc } = param;//变量：{回调函数}
      if (callbackInList) {//如果{回调函数}存在
        callbackInList(this)
      }
      console.log(`param:###`, param);
      if (eventType == "expand_row") {
        this.$refs.table.toggleRowExpansion(doc, true);
      } else if (eventType == "unexpand_row") {
        this.$refs.table.toggleRowExpansion(doc, false);
      }
      this.$emit("list-event-in", param)//继续往列表外传递
    },
    //函数：{获取工具栏按钮id}
    getBacthButtonId(item) {
      return `id_btn_${this.cf.listIndex}_${item.eventType}`
    },
    tableExportExcel: util.tableExportExcel,//导出excel函数
    //函数：{单元格编辑函数}
    async tdEdit(row, column) {
      let { edit, cfEdit, prop } = column;

      if (this.cf.isGroupList) {//Q1：是分组数据列表
        //抛出编辑实体事件
        this.$emit("single-btn-click", "edit_entity", row, {
          filterFormItems: function (formItems) {//字段过滤函数
            return formItems.filter(d => d.prop == prop)
          }
        });
      } else {//Q1：是普通数据列表

        return this.$emit("single-btn-click", "modify", row, {
          filterFormItems: function (formItems) {//字段过滤函数
            console.log(`prop:####`, prop);
            return formItems.filter(d => d.prop == prop)
          }
        });
      }

    },

    test() { },
    getSigleLinkUrl(item, row) {

      /****************************获取当前页面的路径-START****************************/
      let { $route } = this;
      let pathNew;//

      if ($route) {//2020113补充-如果$route存在，有些系统，比如派成系统就没有使用路由，要兼容！！！
        let { path } = $route
        let arrPath = path.split("/")
        arrPath.length--//去掉最后一个目录
        pathNew = arrPath.join("/")
      }

      /****************************获取当前页面的路径-END****************************/
      console.log(`pathNew:####################`, pathNew);


      //注意，这个方法会调用很多次
      let linkNeed = item.url ? item.url + row[this.cf.idKey] : "javascript:;";
      //如果地址格式函数存在
      if (item.urlFormatter) {
        linkNeed = item.urlFormatter(row, pathNew, $route);
      }
      return linkNeed;
    },
    // 表头筛选数据的方法
    filterHandler(filters) {
      for (let key in filters) {
        this.objParam.findJson[key] = filters[key];
        this.getDataList();
      }
    },
    //每页显示数量变动后的回调函数
    handleSizeChange(val) {
      this.objParam.pageSize = val;
      this.getDataList(); //第一次加载此函数，页面才不会空
    },
    //排序变动后的回调函数
    sortChange(param) {
      //order: "descending","ascending"
      //排序规则值数据字典
      let dict1 = { descending: -1, ascending: 1 };
      let sortJsonCurr = {}; //本次排序参数
      let sortRule = dict1[param.order]; //排序规则值
      //如果{排序规则值}存在
      if (sortRule) {
        sortJsonCurr[param.prop] = sortRule;
      }
      //拼接排序参数
      this.objParam.sortJson = Object.assign({}, this.cf.sortJsonDefault, sortJsonCurr);
      this.getDataList(); //第一次加载此函数，页面才不会空
    },
    //选择数据
    selectionChange(val) {
      if (this.cf.isMultipleSelect) return;
      if (val.length > 1) {
        this.$refs.table.clearSelection(); //清除选择
        this.$refs.table.toggleRowSelection(val.pop()); //重新选中一条新数据
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
    async batchBtnClick(eventType, needSelect) {
      let selection
      if (needSelect) {
        //  得到选中的数据对象
        selection = this.$refs.table.selection;
        //  有选中的就遍历得到P1，进行批量删除
        if (selection.length == 0) {
          return this.$message({ message: "未选中数据", type: "error" });
        }
        if (eventType == "delete") {//批量删除
          this.deleteSelection();
        }
      } else {
        if (eventType == "add") {//新增
          this.showAdd();
        } else if (eventType == "refresh") {
          await this.getDataList(); //第一次加载此函数，页面才不会空
          this.$message.success('刷新成功');
        } else if (eventType == "export_excel") {
          await util.loadJs({ url: PUB.urlJS.xlsxFull })//加载
          await util.loadJs({ url: PUB.urlJS.fileSaver })//加载
          let { jQuery } = window;
          if (!jQuery) return console.error("jQuery不存在，请先引用对应的js")
          let elHead = `#${this.id} .el-table__header-wrapper table`;
          let elBody = `#${this.id} .el-table__body-wrapper table`;
          $(elBody).find("tbody").prepend($(elHead).find("tr:first").clone())
          //这个只能导出一部分
          await this.tableExportExcel({ el: elBody, fileName: "数据表" });
          await util.timeout(500); //延迟
          $(elBody).find("tr:first").remove()
        }
      }
      return this.$emit("bacth-btn-click", eventType, selection); //抛出自定义事件
    },
    //TODO:显示新增弹窗
    showAdd() {//显示新增弹窗
      //清空初始化数据ajax地址，赋值数据时可能添加了这个，
      this.$refs.listDialogs.cfAddDialog.cfFormAdd.urlInit = null
      this.$refs.listDialogs.cfAddDialog.visible = true
      this.$refs.listDialogs.formAdd = { ...this.cf.formDataAddInit }//还原表单
      this.$emit("after-show-Dialog-Add");
    },
    //函数：{显示复制数据弹窗函数}
    showCopy(row) {
      this.$refs.listDialogs.cfAddDialog.cfFormAdd.urlInit = this.cf.url.detail
      let rowNew = lodash.cloneDeep(row);
      this.$refs.listDialogs.formAdd = { ...this.cf.formDataAddInit, ...rowNew }
      this.$refs.listDialogs.cfAddDialog.visible = true
      this.$emit("after-show-dialog-copy");
    },
    // 删除选中数据的方法
    deleteSelection() {
      //  得到选中的数据对象
      var selects = this.$refs.table.selection;
      //  有选中的就遍历得到P1，进行批量删除
      if (selects.length > 0) {
        var arr = [];
        for (let i = 0; i < selects.length; i++) {
          arr.push(selects[i][this.cf.idKey]);
        }
        //  调用方法删除数据
        this.confirmDelete(arr);
        // 没有选中的数据提示用户
      }
    },
    //统计字段筛选数据并跳转页面函数
    filterData(param) {
      //pid当前的数据id//listIndex页面的标记//targetIdKey:筛选目标列表的条件列字段名
      let { pid, listIndex, targetIdKey } = param;
      //改变列表的初始状态值//es6的对象属性名用变量替代的方法
      this.$store.commit("setListFindJson", { listIndex, findJson: { [targetIdKey]: pid } });
      this.$router.push({ path: "/" + listIndex });
    },
    async showDetail(row) {
      //判断详情接口是否存在，如果存在，进行ajax请求
      this.$emit("after-show-Dialog-Detail", row);
      let ajaxParam = {
        //键名根据idKey进行判断
        [this.cf.idKey == "_id" ? "_id" : "id"]: row[this.cf.idKey]
      };
      Object.assign(ajaxParam, this.cf.paramAddonPublic); //合并公共参数
      if (this.cf.url.detail) {
        //如果{详情ajax地址}存在
        let { data } = await axios({//请求接口
          method: "post", url: PUB.domain + this.cf.url.detail,
          data: ajaxParam //传递参数
        });
        row = data.Doc || data.doc; //兼容大小写的doc***针对多种接口
      }
      this.$store.commit("openDialogDetail", { listIndex: this.cf.listIndex, row: row });
    },
    //-------------确认删除数据的函数--------------
    async confirmDelete(dataId) {
      let idType = util.type(dataId);
      let textTips = "确认删除该数据？";
      if (idType == "array") {
        textTips = `确认删除选中的${dataId.length}条数据？`;
      }
      let clickStatus = await this.$confirm(textTips, "提示",
        { confirmButtonText: "确定", cancelButtonText: "取消", type: "warning" }
      ).catch(() => { });
      let deleteData = []; //删除的数据，统一为数组格式
      if (clickStatus == "confirm") {

        //如果是id数组（批量删除）
        if (idType == "array") {
          deleteData = this.tableData.filter(doc => dataId.includes(doc[this.cf.idKey]));
        } else {
          deleteData = [this.tableData.find(doc => doc[this.cf.idKey] == dataId)];
        }
        deleteData = util.deepCopy(deleteData);
        if (this.cf.url.delete) { //Q1:{删除数据接口}存在
          let ajaxParam;
          if (this.cf.idKey == "_id") {
            ajaxParam = { _id: dataId };
          } else {
            ajaxParam = {
              findJson: {
                //用于定位要修改的数据
                [this.cf.idKey]: dataId
              }
            };
          }
          Object.assign(ajaxParam, this.cf.paramAddonPublic); //合并公共参数
          //用户点击了确认
          await axios({//请求接口
            method: "post", url: PUB.domain + this.cf.url.delete,
            data: ajaxParam //传递参数
          }).catch(function (error) {
            alert("异常:" + error);
          });
          //如果{增删改操作后是否自动刷新}为真
          if (this.cf.isRefreshAfterCUD) {
            this.getDataList(); //更新数据列表
          }
        } else {//Q2:{删除数据接口}不存在
          let arrId = deleteData.map(doc => doc[this.cf.idKey]); //删除的id数组
          //过滤出剩余数据
          this.tableData = this.tableData.filter(
            doc => !arrId.includes(doc[this.cf.idKey])
          );
          this.$emit("input", this.tableData); //****触发外部value的改变，使用watch的话不太好，会有延迟
        }
        this.$message({ message: "删除成功", duration: 1500, type: "success" });
        this.$emit("after-delete", deleteData); //触发外部事件
      }
    },
    //-------------查询列表的函数--------------
    searchList() {
      this.objParam.pageIndex = 1; //回到第一页
      this.getDataList(); //第一次加载此函数，页面才不会空
    },
    //-------------处理分页变动函数--------------
    handleCurrentChange(pageIndex) {
      this.objParam.pageIndex = pageIndex; //改变ajax传参的第几页
      this.getDataList(); //第一次加载此函数，页面才不会空
    },
    //-------------ajax获取数据列表函数--------------
    async getDataList() {
      this.loading = true;//加上loading
      //最终需要提交的参数
      let objParamFinal = util.deepCopy(this.objParam); //深拷贝,后续处理数据避免影响查询表单
      /****************************将空数组处理成null-START****************************/
      //for of循环遍历对象，for of不能直接处理对象，本质上是同个Object.keys拼装一个新数组进行辅助
      let obj1 = objParamFinal.findJson;
      //将空数组处理成null******
      for (var key of Object.keys(obj1)) {
        let type = util.type(obj1[key]);
        if (type == "array" && obj1[key].length === 0) { //如果是空数组
          obj1[key] = null;
        }
        //是否需要删除
        let isDelete = lodash.get(this.cf, `deleteFindJson.${key}`);
        if (isDelete) {//如果需要删除
          delete obj1[key];
        }
      }
      /****************************将空数组处理成null-END****************************/
      let urlList = lodash.get(this.cf, `url.list`);
      // this.tableData = this.value; //提取静态数据
      if (urlList) {
        //Q1:{列表接口地址}存在
        let { data } = await axios({//请求接口
          method: "post", url: PUB.domain + urlList, data: objParamFinal
        });
        let { list, page } = data; //解构赋值
        this.tableData = list;
        this.page = page;
        this.allCount = page.allCount; //更改总数据量
      } else {
        //Q2:{列表接口地址}不存在-静态数据
        //调用：{查询静态集合列表函数（支持模糊查询）}
        this.tableData = util.searchCollection({ dataBase: this.value, findJson: obj1 });
        // this.$emit("input", this.tableData); //****触发外部value的改变，使用watch的话不太好，会有延迟
      }
      this.loading = false;//取消loading-放在动态数据字典前面，看起来更快加载
      if (this.cf.dynamicDict) {
        //如果{填充配置数组}存在.
        for await (const populateCFEach of this.cf.dynamicDict) {
          let paramPopulate = lodash.cloneDeep(populateCFEach); //深拷贝
          paramPopulate.listData = this.tableData; //补充listData属性
          this.tableData = await util.ajaxPopulate(paramPopulate);
        }
        //这个优化可能没那么简单，要有足够的合并数据机制
        // await Promise.all(this.cf.dynamicDict.map(async populateCFEach => {
        //   let paramPopulate = lodash.cloneDeep(populateCFEach); //深拷贝
        //   paramPopulate.listData = this.tableData; //补充listData属性
        //   this.tableData = await util.ajaxPopulate(paramPopulate);
        // }))
      }
      this.$emit("after-search", this.tableData); //触发外部事件

    },
    //函数：{初始化组件cf配置函数}
    initCF: async function () {

      /****************************分页配置初始化-START****************************/
      let cfPagination = lodash.get(this.cf, `cfPagination`, {});
      let cfPaginationDefault = {
        background: true,
        layout: "total, sizes, prev, pager, next, jumper",
        "page-sizes": [2, 10, 20, 50, 100, 200, 500],
        style: "float:right;margin:10px 0 0 0;",
      }
      util.setObjDefault(cfPagination, cfPaginationDefault);
      /****************************分页配置初始化-END****************************/

      //调用：{给一个对象设置默认属性函数}
      util.setObjDefault(this.cf, {
        idKey: "P1", isMultipleSelect: true, isShowTable: true, isShowCheckedBox: true, isShowSearchForm: true,
        isShowBreadcrumb: true, isShowPageLink: true, isShowOperateColumn: true,
        isRefreshAfterCUD: true, isShowToolBar: true,
        cfElTable: {}, //列表配置对象
        paramAddonPublic: {}, //公共附加参数
        cfPagination,//分页组件配置
      });
      //调用：{给一个对象设置默认属性函数}-//表头样式
      util.setObjDefault(this.cf.cfElTable, {
        "header-row-class-name": "n-table-head",
        "row-class-name": "n-table-row"
      });
    },
  },
  created() {

    this.initCF()//调用：{初始化组件cf配置函数}



    //变量：{来自附加参数的findJson}
    let findJsonFromAddon = lodash.get(this.cf, `objParamAddon.findJson`);
    //优先使用findJsonFromAddon
    let findJsonDefault = findJsonFromAddon || this.cf.findJsonDefault || {};
    //读取vuex的当前列表页默认筛选参数
    let defultFindJson = this.$store.state.defultFindJson[this.cf.listIndex];
    if (defultFindJson) {
      //如果{默认的查询参数}存在，清空默认查询参数，避免下次切换时还保留
      Object.assign(findJsonDefault, defultFindJson); //合并对象
      //改变列表的初始状态值
      this.$store.commit("setListFindJson", { listIndex: this.cf.listIndex, findJson: {} });
    }
    if (PUB._paramAjaxAddon) {//如果需要合并公共变量的基础ajax参数
      Object.assign(this.cf.paramAddonPublic, PUB._paramAjaxAddon)//合并公共变量的基础参数
    }
    this.objParam.findJson = findJsonDefault;
    this.objParam.sortJson = lodash.cloneDeep(this.cf.sortJsonDefault); //处理排序参数
    /****************************拼装selectJson参数-START****************************/
    let selectJson = { [this.cf.idKey]: 1 }; //P1有时候在列表不显示，但也一定要加上
    this.cf.columns.forEach(columnEach => {
      columnEach.__id = util.getTimeRandom();
      selectJson[columnEach.prop] = 1;
      //设置默认值
      util.setObjDefault(columnEach, { showOverflowTooltip: true });
      //如果依赖字段[字段级]存在**
      if (columnEach.requireProp && columnEach.requireProp.length) {
        columnEach.requireProp.forEach(rPropEach => { selectJson[rPropEach] = 1; });
      }
    });

    if (this.cf.requireProp) {//如果依赖字段数组[列表级]存在
      this.cf.requireProp.forEach(rPropEach => { selectJson[rPropEach] = 1; });
    }



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
    //改变列表的初始状态值
    this.$store.commit("initListState", { listIndex: this.cf.listIndex, objState: objState });
    if (this.cf.focusMenu) {
      console.log(`created----############`);
      //如果需要聚焦菜单
      this.$store.commit("changeActiveMenu", this.cf.listIndex); //菜单聚焦
      this.$store.commit("changeActiveMenuName", this.cf.name || "未命名"); //菜单聚焦
    }
    //添加标准批量操作按钮
    let batchBtnsAddon = lodash.get(this.cf, `batchBtns.addon`);
    if (!batchBtnsAddon) {
      lodash.set(this.cf, `batchBtns.addon`, [util.cfList.bBtns.add, util.cfList.bBtns.delete]);
    }
    //添加标准单选操作按钮
    let singleBtnsAddon = lodash.get(this.cf, `singleBtns.addon`);
    if (!singleBtnsAddon) {
      lodash.set(this.cf, `singleBtns.addon`,
        [util.cfList.sBtns.detail, util.cfList.sBtns.modify, util.cfList.sBtns.delete]);
    }
    util.setListPower(this.cf); //调用：{根据当前角色权限设置列表配置的函数}
    //监听标准的单选操作按钮事件
    this.$on("single-btn-click", function (eventType, row, others = {}) {
      if (eventType == "delete") {
        //Q1：删除按钮点击事件
        this.confirmDelete(row[this.cf.idKey]);
      } else if (eventType == "modify") {
        //Q2：修改按钮点击事件
        this.$refs.listDialogs.showModify(row, others);//传递others-如编辑单个字段
      } else if (eventType == "detail") {
        //Q3：详情按钮点击事件
        this.showDetail(row);
      } else if (eventType == "copy") {
        //Q4：复制按钮点击事件
        this.showCopy(row); //调用：{显示复制数据弹窗函数}
      }
    });
  },
  async mounted() {
    this.$emit("inited", { vm: this }); //将当前对象抛出
    await util.timeout(30); //延迟,处理getDataList中处理空数组字段需要，
    console.warn("神奇！！");
    //不加这一句的话一开始空数组是undefined，但提交时却变成 []，神奇！！
    //等待模板加载后，
    this.getDataList(); //第一次加载此函数，页面才不会空
    if (this.cf.dragSort) {//如果{允许拖拽排序}为真
      this.rowDrop();//调用：{行拖拽功能初始化函数}
    }
  }
};
</script>
<style scoped>
.icon-edit {
  position: absolute;
  border-radius: 20%;
  right: 3px;
  padding: 2px;
  top: 8px;
  color: #ccc;
  background-color: rgba(255, 255, 255, 0.5);
}
/* n-table样式-针对element组件 ,但好像对其他项目没有效果！！*/
.list-data-box >>> .n-table-head .cell {
  padding: 0;
  font-weight: normal;
}
.list-data-box >>> .n-table-row .cell {
  padding: 0;
  font-weight: normal;
}
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
