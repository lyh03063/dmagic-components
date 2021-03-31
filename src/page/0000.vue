<template>
  <div class="out">xxxxx</div>
</template>
<script>
export default {
  mixins: [MIX.base,],
  name: "xxxxxx",//
  props: {
    cf: {
      default: function () {
        return {};
      }
    }
  },
  data() {
    return {

    };
  },
  methods: {

    //函数：{初始化组件配置函数}
    initCF: async function () {

      let cfAAA = lodash.get(this.cf, `cfAAA`, {});
      let cfAAADefault = {
        aaaa: "11111"
      }
      util.setObjDefault(cfAAA, cfAAADefault);
      util.setObjDefault(this.cf, {
        // isShowSearchForm: false,
        cfAAA
      });

    },
  },
  async created() {
    this.initCF()//调用：{初始化组件配置函数}

  },
  mounted() {
    this.$emit("inited", { vm: this }); //将当前对象抛出
  }
};
</script>
<style scoped>
</style>