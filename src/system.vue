<template>
<div class="HP100" >

  <dm_debug_list>
      <dm_debug_item v-model="systemDoc"/>
    </dm_debug_list>

 <router-view :systemDoc="systemDoc" v-if="systemDoc" ></router-view>
</div>

</template>

<script>
export default {
  data() {
    return {
      ready: false,
      systemDoc: null,
      sysId: 123,//系统Id
      routerKey: "key1",
      listMenu: [
      ],

    };
  },
  methods: {
  

    //函数：{ajax获取系统doc函数}
    async getDocSystem() {
      let { data: { doc } } = await axios({
        //请求接口
        method: "post",
        url: `${PUB.domain}/info/commonDetail`,
        data: {
          findJson: { systemId: this.sysId },

          _dataType: "system",
          _systemId: "$all"
        } //传递参数
      });
      this.systemDoc = doc
      this.ready = true;
      if (this.systemDoc.iconSrc) {//如果{icon地址}存在
        util.changeFavicon(this.systemDoc.iconSrc)//函数：{改变网页标题图标的函数}
      }
      this.listMenu = this.systemDoc.treeDataMenu || []

      PUB.homeGroupId = this.systemDoc.homeGroupId
      PUB.systemName = this.systemDoc.title
      document.title = this.systemDoc.title

    },

  },
   async created() {
    this.sysId = this.$route.params.sysId;
    PUB._paramAjaxAddon = {
      _systemId: this.sysId
    }
    this.getDocSystem()//调用：{ajax获取系统doc函数}

  }
};
</script>


<style scoped>

</style>
