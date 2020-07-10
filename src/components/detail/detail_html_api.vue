<template>
  <div class>
    <!-- <div class>docDetail_IN: {{docDetail_IN}}</div> -->
    <dm_pannel_d_g_list_html_api :cf="cfG1" class :doc="docDetail_IN" title="私有属性列表"></dm_pannel_d_g_list_html_api>


    <dm_pannel_d_g_list_html_api :cf="cfG2" class :doc="docDetail_IN" title="公共属性"></dm_pannel_d_g_list_html_api>
  </div>
</template>

<script>
export default {
  name: "dm_detail_html_api",
  components: {},
  props: {
    docDetail: {},//***属性过来的dataId
    
    cf: {
      default: function () {
        return {};
      }
    }
  },
  data() {

    //变量：{分组列表配置}
    let cfRelG1 = {
      ...PUB.cfRelGList.normal,
      dataTypeParent: "html_api",//父级数据类型，缺省的话等于dataType
      dataTypeNameParent: "Html-API",//父级数据类型名称，缺省的话等于dataTypeName

    }


    return {
        docDetail_IN: {},//***属性过来的dataId
      ready: false,
      cfG1: {
        ...cfRelG1,
        dataType: "html_prop",
        dataTypeName: "Html属性",
        column: "g_htmlapi_prop", columnCount: "count_htmlapi_prop",
      },
      cfG2: {
        ...cfRelG1,
        dataType: "html_prop",
        dataTypeName: "Html公共属性",
        column: "g_htmlapi_prop_pub", columnCount: "count_htmlapi_prop_pub",
      },

    };
  },

  methods: {

    //函数：{ajax获取详情函数}
    async getDoc() {
      let { data } = await axios({  //请求接口
        method: "post", url: `${PUB.domain}/info/commonDetail`,
        data: { _id: this.dataId, _systemId: "sys_api" } //传递参数
      });
      this.docDetail_IN = data.doc;

      this.ready = true;

    },


  },

  async created() {
    //这里先设置好这个参数，避免内部的分组列表出异常！！！！
    PUB._paramAjaxAddon = {
      _systemId: "sys_api"
    }
    this.dataId = this.$route.query.dataId;//
    if (this.docDetail) {//
      this.dataId = this.docDetail._id
    }

    this.getDoc()//调用：{ajax获取详情函数}



  },
  async mounted() {
  }
};
</script>

<style scoped>
.btn-big-play {
  width: 100%;
  font-size: 124px;
  text-align: center;
  /* font-weight: 100; */

  height: 160px;
  background: #f0f0f0;
  color: #666;
  cursor: pointer;
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>
