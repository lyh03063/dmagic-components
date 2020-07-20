
<template>
  <div>
    <dm_debug_list>
      <dm_debug_item v-model="cf" />
    </dm_debug_list>

    <!-- height="480px" -->
    <el-carousel class="banner-main" v-bind="cf.cfElCarousel">
      <el-carousel-item v-for="(item,index) in cf.list" :key="index">
        <a :href="item.link">
          <div class="bg_slide" :style="{'background-image': `url(${item.imgSrc})`}">
            <!--背景层-->
          </div>
        </a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
let T;
export default {
  name: "banner",
  props: {
    cf: {},

  },

  data() {
    return {

    };
  },
  methods: {},
  beforeCreate() {
    T = this;
  },
  created() { },

};
</script>

<style scoped>
.bg_slide {
  width: 12;
  height: 100%;
  background-position: center center;
}
</style>
