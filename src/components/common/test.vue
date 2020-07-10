<template>
  <div class="out">
    <div class="P5">开始时obj和obj_IN指向同一个对象</div>
    <div class="P5">obj:{{obj}}</div>
    <div class="P5">obj_IN:{{obj_IN}}</div>

    <el-button plain @click="obj.name+='AAA'" size="mini">直接修改obj.name的属性</el-button>
    <el-button plain @click="obj_IN.name+='AAA'" size="mini">直接修改obj_IN.name属性</el-button>

    <el-button
      plain
      @click="obj.family.father.name+='bbb'"
      size="mini"
    >直接修改obj.family.father.name的属性</el-button>

    <dm_space height="10"></dm_space>
    <el-button plain @click="obj={}" size="mini">直接修改整个obj，报错</el-button>
    <el-button plain @click="obj_IN={name:'bbb'}" size="mini">直接修改整个obj_IN，不报错，但也不再指向obj</el-button>
  </div>
</template>
<script>
export default {
  mixins: [MIX.base,],
  name: "xxxxxx",//
  props: {
    obj: {},
    cf: {
      default: function () {
        return {};
      }
    }
  },
  data() {
    return {
      obj_IN: this.obj,

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
.out {
  border: 1px #ddd solid;
  border-radius: 5px;
  padding: 10px;
}
</style>