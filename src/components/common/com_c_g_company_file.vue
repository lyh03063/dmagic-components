<template>
  <div>
    <com_c_sonData class :doc="doc" :cf="cf"></com_c_sonData>
  </div>
</template>

<script>
export default {
  name: "com_c_g_company_file",
  //用于列表模糊查询的组件
  props: ["doc"],
  data: function () {
    return {
      cf: {
        column: "g_company_file",
        columnCount: "count_company_file",
        dataType: "file",
        dataTypeName: "文件",
        dataTypeParent: "company",//父级数据类型，缺省的话等于dataType
        dataTypeNameParent: "公司",//父级数据类型名称，缺省的话等于dataTypeName
        keyTitleParent: "companyName",//父级数据标题的key，缺省的话等于title
      }
    }

  },

  created() {

  }
};
</script>
