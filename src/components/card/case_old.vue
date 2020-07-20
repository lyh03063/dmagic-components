<template>
  <a class="link-box" target="_blank" :href="'/projectCaseDetail/'+item.P1">
    <el-card :body-style="{ padding: '0px' }" shadow="hover">
      <div class="n-img-box">
        <img :src="item.imgSrc" />
      </div>
      <div class="n-list-g-titlebar">
        <div class="n-list-g-title" :title="item.name">{{item.name}}</div>
      </div>
    </el-card>
  </a>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {};
  },
  methods: {},
  created() {}
};
</script>

<style scoped>
</style>