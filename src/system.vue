<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: "system",
  data() {
    return {
        systemId:null,
      dataConfigForCopy: "", //用于拷贝的配置字符串
    };
  },
  created() {
    let { sysId } = this.$route.params//获取路由中的sysId
    this.systemId=sysId
    PUB._paramAjaxAddon = { _systemId: sysId }
  },



  mounted() {


  }
};
</script>

<style>
</style>
