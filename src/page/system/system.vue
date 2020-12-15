<template>
  <div class="HP100">
    <dm_debug_list>
      <dm_debug_item v-model="systemDoc" />
    </dm_debug_list>
    <!-- :systemDoc="systemDoc" ttt="xxxx" v-if="systemDoc" -->
    <router-view></router-view>
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



  },
  async created() {
    this.sysId = this.$route.params.sysId;
    PUB._paramAjaxAddon = {
      _systemId: this.sysId
    }

  


  }
};
</script>


<style scoped>
</style>
