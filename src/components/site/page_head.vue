<template>
  <div class="H120 BC_fff">
    <div class="page-head-box M_0 clearfix" id="id_page_head">
      <!--页头-->
      <div class="logo-box" :style="cf.cfLogo.styleBox">
        <a href="/" class="logo-img-link" :style="styleLogo">
          <img class="logo-img" :alt="cf.siteName" :src="cf.cfLogo.src" />
        </a>

        <a
          class="logo-text-link"
          href="/"
          :style="cf.cfLogo.styleText"
        >{{cf.cfLogo.title||cf.siteName}}</a>
      </div>

      <div class="F2 FS18 MT30 MR10" >
        <i class="el-icon-phone FS18"></i> 招生电话  <span class="" >0750-3867326</span>
      </div>
    </div>
  </div>
</template>



  

<script>
let T;
export default {
  props: ["cf"],
  data() {
    let T = this;
    return {
      styleLogo: {
        width: T.cf.cfLogo.width,
        height: T.cf.cfLogo.height,
      }
    };
  },


  methods: {

  },
  beforeCreate() {
    T = this;
  },
  created() { },
  mounted() {

  }
};
</script>

<style scoped>








/****************************盛联页头样式-START****************************/

.logo-img {
  width: 100%;
  height: 100%;
}

.link-switch-mobile-menu {
  display: none;
}

.logo-box {
  overflow: hidden;
  float: left;
}
.page-head-box {
  background-color: #fff;
}
@media screen and (max-width: 640px) {
  /*屏幕宽度小于640px*/
  .menu-hide {
    /*移动端菜单隐藏样式*/
    display: none;
  }
  .page-head-box {
    padding: 10px;
  }
  .logo-img-link {
    width: 60px;
    height: 40px;
    float: left;
    margin-right: 10px;
  }

  .logo-text-link:link,
  .logo-text-link:visited {
    color: #666;
    margin-top: 9px;
    font-size: 20px;
    height: 24px;
    line-height: 24px;
    display: inline-block;
  }
  .link-switch-mobile-menu {
    display: block;
    float: right;
  }
}

@media screen and (min-width: 640px) {
  .page-head-box {
    width: 1200px;
    padding-top: 15px;
    padding-bottom: 13px;
  }
  .logo-img-link {
    width: 90px;
    height: 60px;
    float: left;
    margin-right: 10px;
  }
  .logo-text-link:link,
  .logo-text-link:visited {
    color: #666;
    margin-top: 17px;
    font-size: 30px;
    height: 24px;
    line-height: 24px;
    display: inline-block;
  }
}

/****************************盛联页头样式-END****************************/

</style>
