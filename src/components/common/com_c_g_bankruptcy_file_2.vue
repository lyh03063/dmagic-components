<template>
  <div>
    <com_c_sonData class :doc="doc" :cf="cf"></com_c_sonData>
  </div>
</template>

<script>
export default {
  name: "com_c_g_bankruptcy_file_2",
  //用于列表模糊查询的组件
  props: ["doc"],
  data: function () {
    return {
      cf: {
        column: "g_bankruptcy_file_2",
        columnCount: "count_bankruptcy_file_2",
        dataType: "file",
        dataTypeName: "三书及工作制度",
        dataTypeParent: "bankruptcy_case",//父级数据类型，缺省的话等于dataType
        dataTypeNameParent: "破产案件",//父级数据类型名称，缺省的话等于dataTypeName
        // keyTitleParent: "title",//父级数据标题的key，缺省的话等于title
      }
    }

  },

  created() {

  }
};
</script>
