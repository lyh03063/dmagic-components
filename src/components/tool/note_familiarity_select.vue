



<template>
  <div class>
    <dm_debug_list>
      <dm_debug_item v-model="doc" />
    </dm_debug_list>
    <dm_familiarity_select
      v-model="doc.familiarityDoc"
      :data="doc"
 
      :idKey="idKey"
      :key="doc._id"
    ></dm_familiarity_select>
  </div>
</template>

<script>
export default {
  name: "dm_note_familiarity_select",
  components: {
 

  },
  //用于列表模糊查询的组件
  props: ["doc"],
  data() {
    return {
      idKey: "_id"

    };
  },
  created() {

    if (this.doc._idRel2) {//如果存在_idRel2字段，表示来源于专题
      this.idKey = "_idRel2"

    }


  },
  methods: {}
};
</script>
