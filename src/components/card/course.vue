<template>
  <a class="link-box" target="_blank" :href="'/data_detail/'+item._id">
    <el-card class="item_box" :body-style="{ padding: '0px' }" shadow="hover">
      <div class="n-img-box">
        <img :src="item.imgSrc" />
      </div>

      <div class="item_cover">{{item.title}}</div>
    </el-card>
  </a>
</template>

<script>
export default {
  name: "card_course",
  props: ["item"],
  data() {
    return {};
  },
  methods: {},
  created() { }
};
</script>

<style scoped>
.item_box {
  position: relative;
}
.item_cover {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(3, 3, 3, 0.3);
  width: 100%;
  height: 100%;
  color: #fff;
  font-size: 24px;
  justify-content: center;
  align-items: center;
  
}
.n-img-box {
  height: 195px;
}
</style>