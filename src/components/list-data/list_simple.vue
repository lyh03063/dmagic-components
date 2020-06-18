<template>
  <div class="out">
    <dm_debug_list>
      <dm_debug_item v-model="value" />
    </dm_debug_list>
    <div class>
      <div
        class="list_simple_group DPIB MR5"
        v-for="(doc,idx) in listData"
        v-bind:key="doc._id"
        :style="cf.styleG"
      >
        {{ doc[cf.labelKey] }}
        <span class v-if="idx<listData.length-1">{{cf.splitSign}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mixins: [MIX.base,],
  name: "dm_list_simple",//
  props: {
    value: {},
    cf: {
      default: function () {
        return {};
      }
    }
  },
  data() {
    return {
      listData: []

    };
  },
  watch: {
    value: {
      handler(newVal, oldVal) {
        console.log('value changed');

        if (this.cf.ajax) {//如果{ajax}配置存在
          this.ajaxGetList()//调用：{ajax获取列表数据函数}
        } else {
          this.listData = this.value;
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {

    //函数：{ajax获取列表数据函数}
    ajaxGetList: async function () {
      let arrId = this.value;
      if (arrId && arrId.length) {//如果{000}000

        let paramAxios = this.cf.ajax;//axios参数
        paramAxios.data = paramAxios.data || {}
        paramAxios.data.findJson = paramAxios.data.findJson || {}
        paramAxios.data.findJson[this.cf.idKey] = { $in: arrId }
        util.setObjDefault(paramAxios, {
          method: "post",
        });
        let { data: { list: listAdmin } } = await axios(paramAxios);//ajax请求
        this.listData = listAdmin;

      }


    },

    //函数：{初始化组件配置函数}
    initCF: async function () {

      let cfAAA = lodash.get(this.cf, `cfAAA`, {});
      let cfAAADefault = {
        aaaa: "11111"
      }
      util.setObjDefault(cfAAA, cfAAADefault);
      util.setObjDefault(this.cf, {
        // isShowSearchForm: false,
        splitSign: ",",
        idKey: "_id",
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
/* .group:not(:last-of-type)::after{
  content: ",";

} */
</style>