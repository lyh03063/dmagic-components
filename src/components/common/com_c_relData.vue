<template>
  <div>
    <a class="n-a-blue" href="javascript:;" @click="showDialog">
      [{{ doc[prop] || 0 }}]</a
    >
    <!-- {{cfListParent.isGroupList}} -->
    <!-- addon: {{ addon }} -->
    <!--子数据弹窗列表-->
    <el-dialog
      custom-class="n-el-dialog"
      width="90%"
      :title="title"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :append-to-body="true"
      v-bind:visible.sync="isShowDialog"
      v-if="isShowDialog"
    >
      <dm_list_data :cf="cfList" @after-search="afterSearch"></dm_list_data>
    </el-dialog>
  </div>
</template>
<script>


export default {
  name: "com_c_relData",
  //用于列表模糊查询的组件
  props: {
    prop: {
      default: "xxxx"
    },
    doc: {
      default: function () {
        return {};
      }
    },
    addon: {//列组件的附加参数
      default: function () {
        return {};
      }
    },
    cfListParent: {//父列表的配置
      default: function () {
        return {};
      }
    }
  },
  data() {
    return {
      cfList: null,

      ready: false,
      isShowDialog: false,
    }
  },
  computed: {
    title() {

      return `关联数据列表`
    }
  },
  methods: {
    //函数：{列表查询后的回调函数}
    afterSearch: async function (arr) {
      let count = arr.length
      console.log(`count:`, count);
      let { dataTypeParent } = this.addon //父级数据类型
      console.log(`dataTypeParent:`, dataTypeParent);
      let idParentData = this.doc._id//有可能是分组数据，也有可能是原始列表数据

      let { isGroupList } = this.cfListParent
      if (isGroupList) { idParentData = this.doc._idRel2 }//如果是分组列表
      console.log(`idParentData:`, idParentData);
      if (!(dataTypeParent && idParentData)) return
      await axios({//修改接口-当前父级数据
        method: "post", url: `${PUB.domain}/info/commonModify`,
        data: { _id: idParentData, _dataType: dataTypeParent, _data: { [this.prop]: count } }
      });
      this.doc[this.prop] = count//修改当前数据,实时更新显示数字

    },

    //函数：{显示子数据弹窗列表函数}
    showDialog: async function () {
      this.isShowDialog = true;
      let { dataType } = this.addon || "note";
      console.log(`dataType:`, dataType);
      //根据数据类型获取对应的列表配置
      let cfList = lodash.get(PUB.listCF, `list_${dataType}`);
      this.cfList = lodash.cloneDeep(cfList)
      let { doc } = this

      let { isGroupList } = this.cfListParent

      let idEntity = doc._id;//变量：{实体数据id}
      if (isGroupList) { idEntity = doc._idRel2 }//如果是分组列表



      if (doc && idEntity) {//提取当前的数据id
        //设置列表查询参数
        lodash.set(this.cfList, `objParamAddon.findJson._idRel`, idEntity);
        this.cfList.searchFormItems = this.cfList.searchFormItems.filter(d => d.prop != "_idRel")//删除掉查询字段
        this.cfList.columns = this.cfList.columns.filter(d => d.prop != "_idRel")//删除掉查询字段
        this.cfList.formItems = this.cfList.formItems.filter(d => d.prop != "_idRel")//删除掉查询字段

        console.log(`this.cfList.formItems:######`, this.cfList.formItems);
        this.cfList.isShowBreadcrumb = false; //面包屑隐藏
        this.cfList.isShowSearchForm = false; //查询表单隐藏
        this.cfList.formDataAddInit = { _idRel: idEntity ,executeStatus:1,typeTimedTask:1}//新增表单的初始数据
      }
      this.ready = true;
    },

  },
  created() {








  }
};
</script>
