<template>
  <component :is="tag" v-bind="cf">
    {{text}}
    <dm_ele
      :tag="d.tag"
      v-bind="d.cf"
      :text="d.text"
      :children="d.children"
      v-for="(d,j) in children"
      :key="j"
    ></dm_ele>
  </component>
</template>
<script>
export default {
  mixins: [MIX.base,],
  name: "dm_ele",//
  props: {
    text: {},
    tag: {},
    children: {},

    cf: {
      default: function () {
        return {};
      }
    }
  },
  watch: {
    cf: {
      handler(newVal, oldVal) {

        console.log(`cf-change:`,this.cf);
        util.clearObj(this.cf); //调用：{清除对象中的空属性（null,undefined,空格等）}
        // this.children.forEach(itemEach => {//循环：{000数组}
        //   let { cf } = itemEach;
        //   console.log(`cf-change:cf`, cf);
        // })
      },
      deep: true
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
        // cfAAA
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