<template>
  <div>
    <dm_list_data :cf="cfList" ref="listData"></dm_list_data>
  </div>
</template>

<script>

export default {
  components: {},
  props: ["aaa"],

  data() {
    return {

      //第4组配置
      cfList: PUB.listCF["list_url"]
    };
  },
  methods: {

  },
  created() {

    PUB._paramAjaxAddon = {
  _systemId: "sys_longting"
}
    
    delete this.cfList.objParamAddon._systemId//临时清除
    // this.cfList.objParamAddon = this.cfList.objParamAddon || {}

    // Object.assign(this.cfList.objParamAddon, PUB._paramAjaxAddon);//合并对象




  },
  async mounted() { }
};
</script>

<style>
</style>
