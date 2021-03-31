<template>
  <div class="main">
    <dm_debug_list>
      <dm_debug_item v-model="groupId" text="groupId" />
      <dm_debug_item v-model="arrLookup" text="arrLookup" />
      <dm_debug_item v-model="arrSelect2" text="arrSelect2" />
      <dm_debug_item v-model="cfAddDialogEntity" text="添加实体数据配置" />
    </dm_debug_list>

    <!-- <dm_dynamic_form :cf="cfFormSearch" v-model="formDataSearch" @submit="searchList"></dm_dynamic_form> -->
    <!--独立的查询表单-->

    <div
      class="n-boder-box PT18 PL10 PR10 MB10"
      v-if="
        cfFormSearch.formItems.length && cf.isShowSearchForm && mode != 'simple'
      "
    >
      <dm_dynamic_form
        :cf="cfFormSearch"
        v-model="formDataSearch"
        @submit="searchList"
      ></dm_dynamic_form>
    </div>

    <!--数据列表-->
    <dm_list_data
      ref="listData"
      :cf="cfList"
      v-if="ready"
      @inited="initedListData"
      @single-btn-click="singleEvent"
      @bacth-btn-click="bacthEvent"
      @after-delete="afterDelete"
      @after-search="afterSearch"
      @list-event-in="handleListEventIn"
      @sort_by_drag="sort_by_drag"
    >
      <!--分数列插槽-->
      <template v-slot:slot_column_score="{ row }">{{
        $lodash.get(dictScore, `${row._idRel2}.score`)
      }}</template>
      <!--自定义详情弹窗插槽-->
      <!-- <template v-slot:customDetail="{detailData}">
        <detail_data :propDataId="detailData._idRel2"></detail_data>
      </template>-->

      <!--分组数据选择列表按钮插槽----->
      <template v-slot:slot_btn_select>
        <dm_select_list_data
          class="DPIB MR10"
          v-model="arrSelect2"
          :cf="cfSelectList2"
          @inited="initedSelectList"
          @select="afterSelect"
          v-if="$power('groupDataList.all.modify')"
        ></dm_select_list_data>
      </template>
      <!--转移分组按钮插槽-->
      <template v-slot:slot_btn_transGroup>
        <dm_select_list_data
          class="DPIB MR10"
          v-model="arrSelectTransG"
          :cf="cfSelectListTransG"
          @select="afterSelectTransG"
          v-if="$power('groupDataList.all.modify')"
        ></dm_select_list_data>
      </template>
    </dm_list_data>
    <!-- 编辑实体数据弹窗 -->
    <dm_dialog_edit
      :cf="cfEditDialogEntity"
      @after-modify="$refs.listData.getDataList()"
    ></dm_dialog_edit>
    <!-- 新增实体数据弹窗 -->
    <dm_dialog_add
      :cf="cfAddDialogEntity"
      @after-add="afterAddEntity"
      v-if="readyAddDialogEntity"
    ></dm_dialog_add>

    <!--转移分组弹窗-->
    <el-dialog
      custom-class="n-el-dialog"
      width="75%"
      title="转移分组"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :append-to-body="true"
      v-bind:visible.sync="isShowDialogTransG"
      v-if="isShowDialogTransG"
    >
      <div class>
        <el-input
          type="text"
          placeholder="请输入模板分组Id"
          v-model="idTansG"
        ></el-input>
        <div class="TAC PT8">
          <el-button type="primary" @click="transGroup">转移</el-button>
        </div>
      </div>
    </el-dialog>
    <div class v-if="$sys.userId == 13691916429 && mode != 'simple'">
      <el-link
        type="info"
        :href="getEditLink"
        target="_blank"
        v-if="$route.query.edit != 1"
        >编辑</el-link
      >
      <el-link type="info" :href="getNotEditLink" target="_blank" v-else
        >预览</el-link
      >
    </div>
  </div>
</template>

<script>
// let cfSelectList = ;

export default {
  name: "detail_group_common",
  components: {
    // detail_data: () => import("@/page/detail_data.vue") //数据详情页组件
  },
  mixins: [MIX.base, MIX.listGroupData],
  props: {
    mode: {},//模式：simple：简化版-用于树形展开显示时
    prop_groupId: {},//***属性过来的groupId，这种是组件形式而不是路由形式！！！！
    cf: {
      default: function () {
        return {};
      }
    }
  },
  data() {
    return {
      isShowDialogTransG: false,//是否显示转移分组弹窗
      idTansG: null,//转移的目标分组id
      docsSelected: [],//选中的数据
    };
  },
  computed: {
    getNotEditLink() {
      let { fullPath } = this.$route
      fullPath = fullPath.replace("&edit=1", "")
      return `#${fullPath}`
    },
    getEditLink() {
      // let {edit}=this.$route.query;

      return `#${this.$route.fullPath}&edit=1`

    }

  },
  methods: {



    //函数：{转移分组函数}
    transGroup: async function () {
      if (!this.idTansG) return this.$message.error('分组id必填');

      let arrDataId = []//变量：{实体数据id数组}
      await Promise.all(this.docsSelected.map(async doc => {
        arrDataId.push(doc._idRel2)//数组添加元素：{实体数据id数组}
        //使用ajax方法修改
        await axios({//修改接口-当前父数据
          method: "post", url: `${PUB.domain}/info/commonModify`,
          data: {
            _id: doc._id, _data: { _idRel: this.idTansG }
          }
        });

      }))
      {
        axios({
          //请求接口-批量更新多条数据的父级链条
          method: "post",
          url: `${PUB.domain}/info/batchUpdateArrAncestors`,
          data: { arrDataId } //传递参数
        });
      }


      let dictUpdateRelCount = {
        detail_group_task: {
          column: "sonTaskGId", columnCount: "countSonTask",
        },
        detail_group_note: {
          column: "sonNoteGId", columnCount: "countSonNote",
        },
      }
      {
        let { listIndex } = this.cfList;
        let config = lodash.get(dictUpdateRelCount, `${listIndex}`);

        if (config) {
          let { column, columnCount } = config
          //ajax更新目标分组的数据量
          let { data: { countData } } = await axios({
            method: "post", url: `${PUB.domain}/info/updateGroupCountData`,
            data: { _id: this.idTansG, updateRelCount: { column, columnCount } }
          });
        }


      }







      this.$message.success('转移成功');
      this.$refs.listData.getDataList(); //列表更新
      this.isShowDialogTransG = false;



    },

    //函数：{列表组件加载后的回调函数}
    initedListData: async function ({ vm }) {
      this.vm_list_data = vm;
    },
    //函数：{弹窗选择列表组件加载后的回调函数}
    initedSelectList: async function ({ vm }) {
      this.vm_select_list = vm;
    },

    //函数：{初始化CF配置函数}
    initCf: async function () {

      util.setObjDefault(this.cf, {
        isShowSearchForm: true,
      });

      let { cfList } = this.cf
      if (cfList) {//如果列表配置存在
        Object.assign(this.cfList, cfList);//合并对象

      }
      console.log(`this.cfList:`, this.cfList);

      if (this.mode == 'simple') {//如果是简洁模式

        Object.assign(this.cfList, {
          isShowCheckedBox: false,//选择框
          isShowToolBar: false,//批量操作栏
          isShowPageLink: false,//分页链接
        });//合并对象
      }

    },




  },
  async created() {


    this.initCf(); //调用：{初始化CF配置函数}


    //关系表补充公共参数
    Object.assign(PUB.listCF.list_relation.paramAddonPublic, PUB._paramAjaxAddon);//合并对象
    Object.assign(this.cfList.objParamAddon, PUB._paramAjaxAddon);//合并对象




    // PUB._paramAjaxAddon = {
    //   _systemId: "sys_longting"
    // }


  },
  async mounted() {
    this.$emit("inited", { vm: this }); //将当前对象抛出
  }

};
</script>


<style scoped>
</style>
