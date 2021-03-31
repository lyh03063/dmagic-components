<template>
  <div class>
    <el-progress
      :text-inside="true"
      :stroke-width="16"
      :percentage="(doc.complete || 0) * 100"
      status="success"
      @click.native="fnClick"
    ></el-progress>
  </div>
</template>

<script>
export default {
  name: "com_complete",
  //百分比进度条组件
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
