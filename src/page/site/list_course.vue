
<template>
  <div class="main-box2">
    <!-- 导航栏组件 -->
    <page_head :cf="cfPageHead"></page_head>
    <page_menu :cf="cfPageMenu"></page_menu>
    <!-- banner轮播图-->
    <div class="layout1200">
      <div class="MT20 MB20">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="(item,index) in cf_page_list_course.breadcrumb" :key="index">
            <router-link :to="item.path" v-if="item.path">{{item.value}}</router-link>
            <span v-else>{{item.value}}</span>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="DPF">
        <div class="FX1 MR20">
          <dm_pannel_new class="MB20" title="粤菜课程" skin="pannel_A">
            <dm_list_flex_res
              class="MT20"
              :list="cf_page_list_course.cfListMain.list"
              #default="{item}"
              col="3"
              :style_g="{width:'31.5%','margin-bottom':'30px'}"
            >
              <card_goods :item="item"></card_goods>
            </dm_list_flex_res>
          </dm_pannel_new>
        </div>
        <div class="rightBox">
          <dm_pannel_new class="MB20" title="课程分类" skin="pannel_A">
            <dm_list_flex_res
              class="MB20"
              :list="cf_page_list_course.cfCategory.list"
              #default="{item}"
              col="2"
            >
              <button
                :class="`n-button ${item.title==cf_page_list_course.focusMenu?'':'plain'}`"
                style="width:120px"
              >{{item.title}}</button>
            </dm_list_flex_res>
          </dm_pannel_new>
        </div>
      </div>
    </div>

    <!-- 右侧联系我们组件 -->
    <contact_right></contact_right>
    <page_foot></page_foot>
  </div>
</template>




<script>



export default {
  components: {

  },

  data() {

    return {
      ...PUB.dataSite.sys_chunqiu
    };
  },
  methods: {

  },
  async created() {

  }


};
</script>

<style lang="scss" >

a {
  color: #666;
}

a:hover,
a:visited:hover {
  color: #f90;
}

.layout1200 {
  width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

/****************************列表组样式-START****************************/

.n-list-g-titlebar {
  height: 50px;
  line-height: 50px;
  padding: 0 10px;
}

.n-list-g-title {
  /* width: 160px; */
  line-height: 50px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: pointer;
  /* float: left; */
}

/****************************列表组样式-END****************************/

/****************************标准列表图片样式-START****************************/

.n-img-box {
  width: 100%;
  height: 190px;
  overflow: hidden;
}

.n-img-box img {
  width: 100%;
  height: 100%;
  transition: 0.5s;
}

.n-img-box img {
  transform: scale(1.2);
}

/*屏幕宽度小于640px*/

@media screen and (max-width: 640px) {
  .n-img-box {
    height: 35vw;
  }
}

/*屏幕宽度小于360px*/

@media screen and (max-width: 320px) {
  .n-img-box {
    height: 58vw;
  }
}

.rightBox {
  width: 322px;
}
</style>