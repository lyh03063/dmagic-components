
<template>
  <div class>
    <dm_debug_list>
      <dm_debug_item v-model="value" text="value" />
      <dm_debug_item v-model="valueNeed" text="valueNeed" />
      <dm_debug_item v-model="label" text="label" />
      <dm_debug_item v-model="selectData" text="selectData" />
      <dm_debug_item v-model="cf" text="cf" />
    </dm_debug_list>

    <div class v-if="ready">
      <span :title="valueNeed" v-if="!cf.multiple">{{label||valueNeed}}</span>
      <div class="" v-show="false">
         <el-input
          placeholder="隐藏辅助文本框，用于更新校验"
          ref="input_help"
          style="width:0px;height:0px;overflow:hidden"
        ></el-input>
      </div>
     
      <span class v-if="!(cf.showToolbar===false)">
        
        <el-button
          plain
          @click="showDialog"
          size="mini"
          v-if="!(cf.showBtnSelect===false)"
        >选择{{cf.dataName||"数据"}}</el-button>
        <i class="el-icon-refresh" title="刷新数据" @click="refresh" v-if="cf.showBtnRefresh"></i>
      </span>

      <div class="MT8" v-if="cf.multiple&&!cf.hideCollection">
        <dm_collection
          v-model="valueNeed"
          :show-toolbar="true"
          :cf-form="{}"
          :hidePart="{'btn-add':1,'btn-edit':1,'btn-copy':1}"
          data-slot="dataSlot1"
        >
          <!--插槽内容-->
          <template v-slot:dataSlot1="{doc}">
            <div class v-if="cf.componentRow">
              <component
                class
                :is="cf.componentRow"
                :doc="doc"
                :docComplete="getDocComplete(doc._id)"
                :cf="cf"
              ></component>
            </div>

            <span class v-else>{{doc[cf.labelKey]}}----</span>
          </template>

          <!--插槽内容-编辑实体数据按钮-->
          <template v-slot:btn_toolbar="{doc}">
            <i
              class="el-icon-edit btn-op ML10 MR10 Cur1"
              title="编辑实体"
              @click="dialogEditEntity(doc)"
            ></i>

            <i
              class="el-icon-document-copy btn-op ML10 MR10 Cur1"
              title="复制实体"
              @click="dialogCopyEntity(doc)"
            ></i>
          </template>
        </dm_collection>
      </div>

      <!--选择数据弹窗-->
      <el-dialog
        custom-class="n-el-dialog"
        width="95%"
        top="5vh"
        :title="`选择${cf.dataName||'数据'}`"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
        :append-to-body="true"
        v-bind:visible.sync="isShowDialog"
        v-if="isShowDialog"
      >
        <div class>
          <dm_list_data :cf="cfList" ref="listSelectData"></dm_list_data>
          <div class="TAC PT10 PB10">
            <el-button type="primary" @click="confirmSelect">确认选择</el-button>
            <el-button plain @click="isShowDialog=false">关闭</el-button>
          </div>
        </div>
      </el-dialog>

      <!--编辑实体数据弹窗-->
      <dm_dialog_edit :cf="cf_IN.cfEditDialogEntity" @after-modify="afterModify"></dm_dialog_edit>
      <!--新增实体数据弹窗-->
      <dm_dialog_add :cf="cf_IN.cfCopyDialogEntity" @after-add="afterAdd"></dm_dialog_add>
    </div>
  </div>
</template>

<script>
// import dm_list_data from "../../components/list-data/list-data.vue";
export default {
  mixins: [MIX.form_item_new], //混入
  components: {},
  props: {
    cf: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  name: "select_list_data",

  data() {
    return {
      dict: {},//完整数据的数据字典
      cf_IN: null,
      ready: false,
      label: null, //数据标题
      selectData: [],
      isShowDialog: false, //是否显示弹窗
      cfList: this.cf.cfList,
      listComplete: []


    };
  },
  watch: {
    valueNeed: {
      handler(newVal, oldVal) {
        //触发外部保存数据！！！！，不进行深度监听，降低请求频率
        this.$emit("son_change", this.valueNeed);
      },
    }
  },
  methods: {
    //函数：{修改实体数据后的回调函数}
    afterModify: function (doc, ) {
      let docNeed = this.listComplete.find(d => d._id == doc._id)
      Object.assign(docNeed, doc);//合并对象

    },
    //函数：{添加数据后的回调函数}
    afterAdd: function (doc, formData) {
      let { _id, } = doc
      let { title } = doc._data;
      this.valueNeed.unshift({ _id, title })//签名插入数据
      this.refresh()//调用：{刷新列表函数}
    },


    //函数：{获取完整的文档函数}
    getDocComplete: function (_id) {
      let docNeed = this.listComplete.find(doc => doc._id == _id)
      return docNeed

    },
    //函数：{刷新列表函数}
    refresh: async function () {
      let _systemId = util.getSystemId();//
      //根据当前已选数据的id数组，ajax查询并更新数据
      if (!(this.valueNeed && this.valueNeed.length)) return;


      if (this.cf.multiple) {//如果是多选
        //变量：{已选数据的id数组}
        let arrId = this.valueNeed.map(d => d._id);
        let ajaxListUrl = lodash.get(this.cf.cfList, `url.list`);
        let _dataType = lodash.get(this.cf.cfList, `objParamAddon._dataType`);

        let { data: { list } } = await axios({
          method: "post",
          url: `${PUB.domain}${ajaxListUrl}`,
          data: {
            pageSize: 999, _dataType, _systemId,
            findJson: {
              _id: { $in: arrId }
            }
          }
        });
        this.dict = lodash.keyBy(list, '_id')//变量：{临时数据字典}
        this.listComplete = list;
        this.valueNeed.forEach(doc => {//循环：{已选数据数组}
          let docDict = this.dict[doc._id]//在字典中的文档
          for (var prop in doc) {
            doc[prop] = docDict[prop]//更新
          }
        })
      }





    },
    //函数：{复制实体函数}
    dialogCopyEntity(doc) {
      //更新要修改的数据id
      this.cf_IN.cfCopyDialogEntity.copyId = doc._id
      this.cf_IN.cfCopyDialogEntity.visible = true;//显示弹窗


    },
    //函数：{编辑实体函数}
    dialogEditEntity(doc) {
      //更新要修改的数据id
      this.cf_IN.cfEditDialogEntity.cfFormModify.paramAddonInit._id = doc._id
      this.cf_IN.cfEditDialogEntity.visible = true;//显示弹窗


    },

    showDialog() {
      this.isShowDialog = true; //打开弹窗



      /****************************在列表查询参数中排除已选的数据-START****************************/
      /*
            if (this.cf.multiple) {//如果是多选
              let arrIdWithOut; //变量：{需要排除的id数组}，避免重复显示和添加
              let idKey = this.cf.valueKey; //数据键名
              if (this.valueNeed.length) {//如果已选数据存在
                arrIdWithOut = this.valueNeed.map(doc => doc[idKey]);
              }
              if (!arrIdWithOut) return;
      
              this.cfList.objParamAddon = this.cfList.objParamAddon || {};
              this.cfList.objParamAddon.findJson =
                this.cfList.objParamAddon.findJson || {};
              let findjsonAdd = { [idKey]: { $nin: arrIdWithOut } }; //补充排除id的查询条件
              this.cfList.objParamAddon.findJson = {
                ...this.cfList.objParamAddon.findJson,
                ...findjsonAdd
              };
            }
      */
      /****************************在列表查询参数中排除已选的数据-END****************************/
    },
    //函数：{确认选择数据函数}
    async confirmSelect() {
      //获取选中的数据，此处可优化，使用selection-change事件
      let selection = this.$refs.listSelectData.$refs.table.selection;
      if (!selection.length) return this.$message.error("未选择任何数据");
      this.selectData = util.deepCopy(selection);

      let doc;//当前文档-单选用到
      if (this.cf.multiple) {
        //Q1：多选
        this.valueNeed = this.valueNeed || [];

        let { selectJson } = this.cf;
        if (this.cf.selectJson) {
          this.selectData = this.selectData.map(doc => {
            let obj = {};
            //遍历selectJson对象
            for (let prop in selectJson) {
              if (selectJson[prop]) {
                //如果{selectJson}中存在
                obj[prop] = doc[prop];
              }
            }
            return obj;
          });
        }

        this.valueNeed.push(...this.selectData); //追加
      } else {
        //Q2：单选
        this.valueNeed = lodash.get(this.selectData, `[0].${this.cf.valueKey || "P1"}`);
        doc = lodash.get(this.selectData, `[0]`);//当前文档-单选用到
        this.label = lodash.get(
          this.selectData,
          `[0].${this.cf.labelKey || "name"}`
        );
      }



      this.isShowDialog = false; //关闭弹窗

      this.$emit("select", this.valueNeed, doc); //抛出事件并传递数据
      this.refresh()//调用：{刷新列表函数}

      // this.$forceUpdate()//强制视图更新
      //弹窗内的表单元素聚焦会触发字段的校验，但赋值后并不消失，forceUpdate方法不管用
      //这里用到一个辅助的el-input组件的聚焦失焦来解决
      this.$refs.input_help.focus();
      await this.$nextTick(); //延迟到视图更新
      this.$refs.input_help.blur();
    },

    //函数：{ajax获取label函数}
    ajaxGetLabel: async function () {
      let _systemId = util.getSystemId();//
      if (!(this.value && this.value.length)) return;
      let docNeed
      if (this.cf.pageName) {//Q1：旧版列表
        let { data: { Doc } } = await axios({ //请求接口
          method: "post", url: `${PUB.domain}/crossDetail?page=${this.cf.pageName}`,
          data: { id: this.value }
        });
        docNeed = Doc
      } else {//Q2：通用列表
        let { data: { doc } } = await axios({//请求接口
          method: "post", url: `${PUB.domain}/info/commonDetail`,
          data: { _id: this.value, _systemId }
        });
        docNeed = doc
      }
      if (!docNeed) return;
      this.label = docNeed[this.cf.labelKey];

    }
  },
  created() {
    if (!this.value) {
      //如果{value}不存在
      this.valueNeed = "";
    }
    this.cfList.isShowBreadcrumb = false; //隐藏面包屑导航
    this.cfList.pageSize = 10; //隐藏面包屑导航
    this.cfList.focusMenu = false; //不聚焦菜单

    if (!this.cf.multiple) {//如果不是多选
      this.cf.cfList.isMultipleSelect = false;//列表变成单选
      this.ajaxGetLabel(); //调用：{ajax获取label函数}
    }


    let _systemId = util.getSystemId();//


    let _dataType = lodash.get(this.cf.cfList, `objParamAddon._dataType`);

    if (_dataType) {//如果{_dataType}存在，即通用数据列表
      if (!this.cf.cfEditDialogEntity) {//如果cf.cfEditDialogEntity不存在
        let cfEditDialogEntityDefault = {
          listType: "common", //通用型列表-影响urlModify
          visible: false,
          cfFormModify: {
            paramAddonInit: {
              _id: "xxx", _systemId, _dataType
            }
          }
        }
        this.$set(this.cf, "cfEditDialogEntity", cfEditDialogEntityDefault);
      }

      if (!this.cf.cfCopyDialogEntity) {//如果cf.cfCopyDialogEntity不存在
        let cfCopyDialogEntityDefault = {
          copyId: "xxx",
          listType: "common", //通用型列表-影响urlAdd
          visible: false,
          cfFormAdd: {
            paramAddonInit: {
              _id: "xxx", _systemId, _dataType
            }
          }
        }
        this.$set(this.cf, "cfCopyDialogEntity", cfCopyDialogEntityDefault);
      }





    }


    this.cf_IN = lodash.cloneDeep(this.cf); //使用cf_IN副本，避免出现无限嵌套的情况




    this.ready = true;
    this.refresh()//调用：{刷新列表函数}
  },
  async mounted() {

    this.$emit("inited", { vm: this }); //将当前对象抛出

  }
};
</script>


<style scoped>
</style>
