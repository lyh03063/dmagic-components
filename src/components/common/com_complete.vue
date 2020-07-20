<template>
  <div class>
    <el-progress
      :text-inside="true"
      :stroke-width="16"
      :percentage="(doc.complete||0)*100"
      status="success"
      @click.native="fnClick"
    ></el-progress>
  </div>
</template>

<script>
export default {
  name:"com_complete",
  //用于列表模糊查询的组件
  props: ["doc"],
  data() {
    return {};
  },


  methods: {

    fnClick() {
    }
  },
  created() { }
};
</script>
