
<template>
  <div class="com_box">
    <dm_debug_list>
      <dm_debug_item v-model="cf" />
    </dm_debug_list>
    <list_article :cf="cf">
      <!--开启插槽-->
      <template v-slot="{doc}">
        <div class="DPF">
          <div class="img_box" >
            <img class="img_article" src="http://education-1115753.pic47.websiteonline.cn/upload/news02.jpg" alt="" >
          </div>
          <div class="LH32 FX1">
            <div class="MB8" ><a class="news_title" target="_blank" href="javascript:;">{{doc.title}}</a></div>
            
            <div class="MB8" >
               <span class="news_date ">{{doc.date}}</span>
            </div>
            <div class="desc FS14" >
              对于学习者，如果一节课具有惊奇的成分，并且设法迫使学习者完成一些他们一直认为不可能的事情的话，那就成为了探索。探索中有规定，并且这个规定为参加提 供既独特又与之相关的经验......
            </div>
          </div>
          
        </div>
      </template>
    </list_article>
  </div>
</template>

<script>
export default {
  name: "list_article_img",
  components: {

    list_article: () => import("@/components/site/list_article.vue"),
  },
  props: {
    cf: {},

  },

  data() {
    return {

    };
  },
  methods: {},

  created() { 
    this.cf.slot=true;//启用插槽
  },

};
</script>

<style scoped>
.img_box{
  width: 200px;
  height: 130px;
  margin-right: 20px;
}
.img_box img{
  width: 100%;
  height: 100%;
}

.news_title{
  color: #333;
  font-size: 16px;

}

.news_date{
  color: #999;
  font-size: 10px;

}

.com_box >>> .item-article {
  line-height: 32px;
  border-bottom: none;
  margin-bottom: 45px;
}
</style>
