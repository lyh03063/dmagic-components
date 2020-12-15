<template>
  <div>
    <com_c_sonData
      class=""
      :doc="doc"
      :cf="cf"
      @list-event-in="(param) => $emit('list-event-in', param)"
    ></com_c_sonData>
  </div>
</template>

<script>
export default {
  name: "com_c_sonNoteGId",
  //用于列表模糊查询的组件
  props: ["doc"],
  data: function () {
    return {
      cf: {
        column: "sonNoteGId",
        columnCount: "countSonNote",
        dataType: "note",
        dataTypeName: "笔记",
      }
    }

  },

  created() {

  }
};
</script>
