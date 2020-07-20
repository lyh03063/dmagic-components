<template>
  <div>
    <a
      class="n-a"
      href="javascript:;"
      @click="showSonData"
      v-if="doc[this.cf.column]"
    >查看({{doc[this.cf.columnCount]}})</a>
    <a class="n-a" style="color:#ccc" href="javascript:;" @click="addSonDataG" v-else>添加</a>
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
      <dm_detail_group :prop_groupId="doc[this.cf.column]" @update_count="update_count"></dm_detail_group>
      <div class="TAR FS10 C_999">分组id:{{doc[this.cf.column]}}</div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "com_c_sonData",
  //用于列表模糊查询的组件
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
      ready: false,
      isShowDialog: false,
    };
  },
  computed: {
    title() {
      let key = this.cf.keyTitleParent || "title"
      return `【${this.doc[key]}】的${this.cf.dataTypeName}`
    }
  },
  methods: {
    //函数：{分组数据量变更事件函数}-这个应该要处理掉，不过留着关系也不大
    update_count: async function (countData) {
      let dataTypeParent = this.cf.dataTypeParent || this.cf.dataType//父级数据类型
      let idParentData = this.doc._idRel2 || this.doc._id//有可能是分组数据，也有可能是原始列表数据
      await axios({//修改接口-当前父级数据
        method: "post", url: `${PUB.domain}/info/commonModify`,
        data: { _id: idParentData, _dataType: dataTypeParent, _data: { [this.cf.columnCount]: countData } }
      });
      this.doc[this.cf.columnCount] = countData//修改当前数据,实时更新显示数字
    },
    //函数：{显示子数据弹窗列表函数}
    showSonData: async function () {
      this.isShowDialog = true; this.ready = true;
    },
    //函数：{添加子数据分组ID并弹窗显示}-注意这里这里一连串的操作
    addSonDataG: async function () {
      let dataTypeParent = this.cf.dataTypeParent || this.cf.dataType//父级数据类型
      let dataTypeNameParent = this.cf.dataTypeNameParent || this.cf.dataTypeName//父级数据类型名称
      //变量：{父Id}
      let idParentData = this.doc._idRel2 || this.doc._id//有可能是分组数据，也有可能是原始列表数据
      let dataAdd = { title: `${dataTypeNameParent}[${idParentData}]的${this.cf.dataTypeName}列表`, "dataType": this.cf.dataType }
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
            _id: idParentData, _systemId: "$all", _dataType: dataTypeParent, _data
          }
        });
        this.doc[this.cf.column] = _id//修改当前数据
      }
      this.isShowDialog = true;
      this.ready = true;
    },
  },
  created() {
  }
};
</script>
