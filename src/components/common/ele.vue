<template>
  <component :is="tag" v-bind="cfEle()" v-if="ready">
    {{text}}
  
    <dm_ele
      :tag="d.tag"
      v-bind="cfEleChild(d)"
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
    },
    diyProp: {
      default: function () {
        return [];
      }
    }
  },
  computed: {
    //根元素的配置
    cfEle() {
      let fn = (d) => {
        let { cf = {}, diyProp = [],children } = this//
        let cfNeed = { ...cf }
        diyProp.forEach(itemEach => {//循环：{自定义属性数组}
          let { prop, value } = itemEach
          cfNeed[prop] = value
        })
        return cfNeed
      }
      return fn
    },
     //子元素的配置-跟父元素几乎
    cfEleChild() {
      let fn = function (d) {
        let { cf = {}, diyProp = [] } = d//
        let cfNeed = { ...cf }
        diyProp.forEach(itemEach => {//循环：{自定义属性数组}
          let { prop, value } = itemEach
      
          cfNeed[prop] = value
        })
        return cfNeed
      }
      return fn
    }

  },
  watch: {
    cf: {
      handler(newVal, oldVal) {
        util.clearObj(this.cf); //调用：{清除对象中的空属性（null,undefined,空格等）}
      },
      deep: true
    },
    children: {
      handler(newVal, oldVal) {
        //监听到children变化时，重新渲染当前节点
        //解决style进行排序时不响应的问题【但这个会导致transition失效，降低了演示的效果】
        // this.$nextTickStatus("ready")
      },
      deep: true
    }
  },

  data() {
    return {
      ready: true,

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