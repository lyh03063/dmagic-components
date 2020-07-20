<template>
  <a class="link-box" target="_blank" :href="'/goods/'+item._id">
    <el-card :body-style="{ padding: '0px' }" shadow="hover">
       <div class="n-img-box">
        <img :src="item.imgSrc"  />
      </div>
       <div class="titlebar ">
        <div class="title MB6" :title="item.title">{{item.title}}</div>
         <div class="" :title="item.title"> <span class="C_f30 MR8">￥{{item.priceSellSection||item.priceSell}}</span> <span class="C_999 TDEC_LT">￥{{item.priceMarket}}</span></div>
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

.titlebar{
    padding: 5px;

}

  /*屏幕宽度小于640px*/
  @media screen and (max-width: 640px) {
    .title{
      height: 40px;
      overflow: hidden;
    }
    

    
  }

</style>