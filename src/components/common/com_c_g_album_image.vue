<template>
  <div>
    <com_c_sonData class :doc="doc" :cf="cf"></com_c_sonData>
  </div>
</template>

<script>
export default {
  name: "com_c_g_album_image",
  //用于列表模糊查询的组件
  props: ["doc"],
  data: function () {
    return {
      cf: {
        column: "g_album_image",
        columnCount: "count_album_image",
        dataType: "image",
        dataTypeName: "图片",
        dataTypeParent: "album",//父级数据类型，缺省的话等于dataType
        dataTypeNameParent: "相册",//父级数据类型名称，缺省的话等于dataTypeName
        // keyTitleParent: "title",//父级数据标题的key，缺省的话等于title
      }
    }

  },

  created() {

  }
};
</script>
