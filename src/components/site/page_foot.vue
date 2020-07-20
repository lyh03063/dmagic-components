<template>
  <div class="nav-box box-res">
    <div class="layout1200 DPF">
      <div class="FX1">
         <div class="LH30">
        <b class="C_ddd">友情链接：</b>
        <a href="javascript:;" class="nav">春秋教育集团</a>
        <el-divider direction="vertical"></el-divider>
        <a href="javascript:;" class="nav">五邑大学</a>
        <el-divider direction="vertical"></el-divider>
        <a href="javascript:;" class="nav">xx学院</a>
      </div>
      <div class="LH30">
        <a href="javascript:;" class="nav">首页</a>
        <el-divider direction="vertical"></el-divider>
        <a href="javascript:;" class="nav">课程介绍</a>
        <el-divider direction="vertical"></el-divider>
        <a href="javascript:;" class="nav">名师风采</a>
        <el-divider direction="vertical"></el-divider>
        <a href="javascript:;" class="nav">学生作品</a>
        <el-divider direction="vertical"></el-divider>
        <a href="javascript:;" class="nav">资讯中心</a>
        <el-divider direction="vertical"></el-divider>
        <a href="javascript:;" class="nav">联系我们</a>
      </div>
      <div class="LH30">地址:江门市江海区金瓯路284号火炬大厦704 粤ICP备16125716号</div>
      <div class="LH30">邮政编码：529000 电话：0750-3867326</div>
      </div>
      <div class="W100 H100 MR20">
        <img class="W100 H100" src="https://tpl-cad7f78-pic22.websiteonline.cn/upload/rlzt.jpg" alt="" >
        <div class="TAC LH30" >微信公众号</div>
      </div>
      <div class="W100 H100">
        <img class="W100 H100" src="https://tpl-cad7f78-pic22.websiteonline.cn/upload/rlzt.jpg" alt="" >
        <div class="TAC LH30" >抖音账号</div>
      </div>
     
    </div>
  </div>
</template>

<script>
let T;
export default {
  components: {
  },
  props: ["productList"],
  data() {
    return {};
  },
  methods: {},
  beforeCreate() {
    T = this;
  },
  created() { }
};
</script>
<style scoped>
a {
  color: #ddd;
}

.nav-box {
  width: 100%;
  font-size: 12px;
  line-height: 20px;
  background-color: #5a5a5a;
  padding-top: 20px;
  padding-bottom: 20px;
  color: #ddd;
}
.nav {
  cursor: pointer;
}
.nav:hover {
  color: #fff;
}
</style>
