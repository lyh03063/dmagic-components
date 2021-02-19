<template>
  <div class="out P10">
    <dm_debug_list>
      <dm_debug_item v-model="listData" />
      <dm_debug_item v-model="groupDoc" />
      <dm_debug_item v-model="dataType" />
      <dm_debug_item v-model="ready" />
    </dm_debug_list>
    <div v-if="ready">
      <a target="_blank" :href="`#/group_home/${gid}/`"
        >分组专题</a
      >

      <!--新增一级数据弹窗-->
      <dm_dialog_add
        :cf="cfAddDialogL1"
        @after-add="afterAddEntity"
        v-if="readyAddDialog"
      ></dm_dialog_add>
      <el-button class="MR10" plain @click="fnAdd" size="mini"
        >+新增一级数据</el-button
      >

      <dm_card_data_g
        :doc="doc"
        v-for="doc in listData"
        :key="doc._id"
        :dataTypeP="dataType"
        @single-action="singleAction"
      ></dm_card_data_g>
    </div>
  </div>
</template>
<script>
export default {
  mixins: [MIX.base,],
  name: "list_group_common",//
  props: {
    groupId: {},//属性传来的分组id

    cf: {
      default: function () {
        return {};
      }

    }
  },
  data() {
    return {
      gid: "",//分组id
      ready: false,
      readyAddDialog: false,//准备好新增实体弹窗
      dataType: null,//分组数据类型
      groupDoc: {},//分组详情doc
      listData: [],
      //添加一级数据配置
      cfAddDialogL1: {
        listType: "common", //通用型列表-影响urlAdd
        tipsAfterAdd: false,//新增完成后不提示，因为要连续操作
        cfFormAdd: { paramAddonInit: { _systemId: "sys_api", _dataType: "vedio" } }
      },

    };
  },
  methods: {
    async afterAddEntity(doc) {
      // this.ajaxGroupAddData([doc]) //调用：{000函数}


      let urlAdd = PUB.listCF.list_relation.url.add;//关系数据ajax地址

      let arr = [doc]

      let arrDataAdd = arr.map(doc => {
        return {
          sort: 9999,
          _idRel: this.gid,
          _idRel2: doc._id
        };
      });
      let ajaxParam = {
        _systemId: "sys_api",//待优化
        _data: arrDataAdd
      };
      Object.assign(ajaxParam, PUB.listCF.list_relation.paramAddonPublic); //合并公共参数
      await axios({
        //请求接口
        method: "post",
        url: PUB.domain + urlAdd,
        data: ajaxParam //传递参数
      });

      this.$message.success("添加数据并引用成功")
      this.ajaxGroupDataList()//调用：{ajax获取分组数据列表函数}
    },
    //函数：{添加一级数据函数}
    fnAdd: async function (doc) {
      // let { dataType, _idRel2 } = doc
      // alert(`添加一级数据函数`);
      // debugger
      this.cfAddDialogL1.cfFormAdd.paramAddonInit._dataType = this.dataType;
      this.cfAddDialogL1.visible = true;
      this.$nextTickStatus("readyAddDialog")//重载组件，更新弹窗内部表单



    },
    //函数：{ajax获取分组详情函数}
    async getGroupDoc() {
      let { data } = await axios({  //请求接口
        method: "post", url: `${PUB.domain}/info/commonDetail`,
        data: { _id: this.gid, _systemId: "$all" } //传递参数
      });
      this.groupDoc = data.doc;
      this.dataType = this.groupDoc.dataType;
      this.ready = true;
    },

    //函数：{ajax获取分组数据列表函数}
    ajaxGroupDataList: async function () {


      //提取补充字段对象
      let projectObj = lodash.get(DYDICT.dictDataType, `${this.dataType}.$project`, {});





      let {
        data: { list: list }
      } = await axios({
        method: "post",
        url: `${PUB.domain}/info/getCommonList`,
        data: {
          "findJson": {
            "_idRel": this.gid
          },
          "pageIndex": 1,
          "pageSize": 20,
          "_systemId": "$all",
          "_dataType": "relation",
          "arrLookup": [{
            "$lookup": {
              "from": "sheet232",
              "localField": "_idRel2",
              "foreignField": "_id",
              "as": "relDoc2"
            }
          }, {
            "$project": {
              "_id": 1,
              "_idRel": 1,
              "_idRel2": 1,
              "sort": "$_data.sort",
              "targetDoc": "$relDoc2._data"
            }
          }, {
            "$unwind": "$targetDoc"
          }, {
            "$project": {
              "_id": 1,
              "_idRel": 1,
              "_idRel2": 1,
              "sort": 1,
              "title": "$targetDoc.title",
              "link": "$targetDoc.link",
              "category": "$targetDoc.category",
              "isPublish": "$targetDoc.isPublish",
              "dataType": "$targetDoc.dataType",
              "countData": "$targetDoc.countData",
              ...projectObj//展开
            }
          }],
          "sortJson": {
            "sort": -1
          },
          "selectJson": {
            "_id": 1,
            "title": 1,
            "countData": 1,
            "isPublish": 1,
            "myScore": 1,
            "dataType": 1,
            "desc": 1,
            "sort": 1,
            "operateEntityData": 1
          }
        }
      });
      this.listData = list
    },

    //函数：{选择单项操作菜单后的回调函数}
    async singleAction({ action, doc = {}, }) {
      let arrSort = ["up", "down", "top", "bottom"]
      let { _id } = doc
      // alert(action);
      if (action == "show_children") {//Q1:xxx
        this.$set(doc, "children", [
          { _id: 1111, title: "标题1" },
          { _id: 2222, title: "标题2" }
        ]);
      } else if (action == "delete_ref") {//Q2:xxx
        // alert(`delete_ref`);
        let index = this.listData.findIndex(d => d._id == _id)
        this.listData.splice(index, 1)//删除
      } else if (arrSort.includes(action)) {//Q3:排序

        await util.ajaxGroupDataSort(action, doc);
        this.ajaxGroupDataList()//调用：{ajax获取分组数据列表函数}

      } else if (action == "copy") {//Q4:复制
        this.cfAddDialogL1.cfFormAdd.paramAddonInit._dataType = this.dataType;
        this.cfAddDialogL1.copyId = doc._idRel2//复制数据的id
        this.cfAddDialogL1.visible = true;
        this.$nextTickStatus("readyAddDialog")//重载组件，更新弹窗内部表单


      }
    },


  },
  async created() {
    this.gid = this.groupId || this.$route.query.gid || "5fdc1be869b45489a89ae97c";//


  },
  async mounted() {
    await this.getGroupDoc()//调用：{ajax获取分组详情函数}
    this.ajaxGroupDataList()//调用：{ajax获取分组数据列表函数}

  }
};
</script>
<style scoped>
</style>