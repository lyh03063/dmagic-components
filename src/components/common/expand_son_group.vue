<template>
  <div class="out" id="id_g">
    <dm_detail_group
      :prop_groupId="row.sonNoteGId || row.sonTaskGId"
      mode="simple"
      v-if="row && (row.sonNoteGId || row.sonTaskGId)"
    ></dm_detail_group>
  </div>
</template>
<script>
export default {
  mixins: [MIX.base,],
  name: "expand_son_group",//
  props: {
    row: {},
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
<style >

</style>