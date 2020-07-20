<template>
  <a class="link-box" target="_blank" :href="'/data_detail/'+item._id">
    <el-card :body-style="{ padding: '0px' }" shadow="hover">
       <div class="n-img-box">
        <img :src="item.imgSrc"  />
      </div>
       <div class="n-list-g-titlebar">
        <div class="n-list-g-title" :title="item.title">{{item.title}}</div>
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