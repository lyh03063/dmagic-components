<template>
  <a class="link-box" target="_blank" :href="'/productDetail/'+item.P1">
    <el-card :body-style="{ padding: '0px' }" shadow="hover">
      <div class="n-img-box">
        <img :src="item.album"  />
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



.action-box {
  height: 50px;
  line-height: 50px;
  padding: 0 10px;
}
.case-name {
  width: 160px;
  line-height: 50px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: pointer;
  float: left;
}
.action-button {
  float: right;
  margin-top: 5px;
}


</style>