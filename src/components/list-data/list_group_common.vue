<template>
  <div class="out">
    <dm_debug_list>
      <dm_debug_item v-model="listData" />
      <dm_debug_item v-model="groupDoc" />
      <dm_debug_item v-model="dataType" />
      <dm_debug_item v-model="ready" />
    </dm_debug_list>
    <div v-if="ready">
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
    gid: {
      // default:"5e19da15f3c94a3971f45596"
    },
    cf: {
      default: function () {
        return {};
      }
    }
  },
  data() {
    return {
      ready: false,
      dataType: null,//分组数据类型
      groupDoc: {},//分组详情doc
      listData: []

    };
  },
  methods: {
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
              "countData": "$targetDoc.countData"
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
    async singleAction({ action, doc, }) {
      alert(action);
      if (action == "show_children") {//Q1:播放视频
        this.$set(doc, "children", [
          { _id: 1111, title: "标题1" },
          { _id: 2222, title: "标题2" }
        ]);
      }
    },

   
  },
  async created() {
    

  },
  async mounted() {
    await this.getGroupDoc()//调用：{ajax获取分组详情函数}
    this.ajaxGroupDataList()//调用：{ajax获取分组数据列表函数}

  }
};
</script>
<style scoped>
</style>