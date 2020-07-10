<template>
  <div class="out">
    <dm_debug_list>
      <dm_debug_item v-model="doc" />
    </dm_debug_list>

    <!-- <el-button plain @click="test">外部按钮调用组件方法</el-button> -->
    <!--分组列表组件-->
    <dm_detail_group
      :style="cf.styleListG"
      :cf="cf.cfListG"
      :prop_groupId="doc[cf.column]"
      @inited="initedDetailGCommon"
      @single-btn-click="singleBtnClick"
      v-if="doc[cf.column]"
    ></dm_detail_group>
    <div class="MT10" v-else>
      暂未启用列表功能，
      <a href="javascript:;" @click="createG">点此启用</a>
    </div>
  </div>
</template>
<script>
export default {
  mixins: [MIX.base,],
  name: "dm_detail_g_list",//详情页使用的关联数据列表
  props: {
    doc: {},
    cf: {
      default: function () {
        return {};
      }
    }
  },
  data() {
    return {

    };
  },
  methods: {
     //函数：{单条数据操作事件}
    singleBtnClick: async function (actionType, row) {
      this.$emit("single-btn-click", actionType, row);
    },
    //函数：{创建分组函数}
    createG: async function () {
      let dataTypeParent = this.cf.dataTypeParent || this.cf.dataType//父级数据类型
      let dataTypeNameParent = this.cf.dataTypeNameParent || this.cf.dataTypeName//父级数据类型名称
      //变量：{父Id}
      let idParentData = this.doc._idRel2 || this.doc._id//有可能是分组数据，也有可能是原始列表数据
      let dataAdd = { title: `${dataTypeNameParent}[${idParentData}]的${this.cf.dataTypeName}列表`, "dataType": this.cf.dataType }

      // return

      let _systemId = util.getSystemId();//
      let { data: { addData } } = await axios({//ajax添加一个分组
        method: "post", url: `${PUB.domain}/info/commonAdd`,
        data: { tips: `ajax添加一个分组`, "_data": dataAdd, _systemId, "_dataType": "group" }
      });
      {
        //ajax修改父级数据
        let { _id } = addData;
        let _data = { tips: `ajax修改父级数据` }
        _data[this.cf.column] = _id
        _data[this.cf.columnCount] = 0
        await axios({//修改接口
          method: "post", url: `${PUB.domain}/info/commonModify`,
          data: {
            _id: idParentData, _systemId, _dataType: dataTypeParent, _data
          }
        });
        // this.doc[this.cf.column] = _id//修改当前数据

        this.$set(this.doc, this.cf.column, _id);


      }

      this.ready = true;
    },
    //函数：{detail_group组件加载后的回调函数}
    initedDetailGCommon: async function ({ vm }) {
      this.vm_detail_group = vm;
      //  this.vm_detail_group.vm_detail_group_common.vm_select_list.showDialog()


    },
    //函数：{测试函数}
    test: async function () {
      this.vm_detail_group.vm_detail_group_common.vm_select_list.showDialog()

    },
  },
  async created() {
    let cfAjax = lodash.get(this.cf, `cfAjax`, {});
    let cfAjaxDefault = {
      url: "/msg/smscode", params: {},
    }
    util.setObjDefault(cfAjax, cfAjaxDefault);
    util.setObjDefault(this.cf, {
      cfAjax
    });
  },
  mounted() {
    this.$emit("inited", { vm: this }); //将当前对象抛出
  }
};
</script>
<style scoped>
/* 饿了么表格出现遮挡的问题解决的补丁样式 */
.out >>> .el-table__fixed,.out >>> .el-table__fixed-right {
  height: 1100px !important;
}

</style>