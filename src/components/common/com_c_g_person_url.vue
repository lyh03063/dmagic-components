<template>
  <div>
    <com_c_sonData class :doc="doc" :cf="cf"></com_c_sonData>
  </div>
</template>

<script>
export default {
  name: "com_c_g_person_url",
  //用于列表模糊查询的组件
  props: ["doc"],
  data: function () {
    return {
      cf: {
        column: "g_person_url",
        columnCount: "count_person_url",
        dataType: "url",
        dataTypeName: "网址",
        dataTypeParent: "person",//父级数据类型，缺省的话等于dataType
        dataTypeNameParent: "人员",//父级数据类型名称，缺省的话等于dataTypeName
        keyTitleParent: "trueName",//父级数据标题的key，缺省的话等于title
      }
    }

  },

  created() {

  }
};
</script>
