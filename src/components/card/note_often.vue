<template>
  <div class="item-box TAC DPFC">
    <a class="FX1" :href="linkDetail(item)" :target="target">
      <span v-if="item.dataTarget">{{item.dataTarget.title}}</span>
    </a>
    <span class="C_999">{{item.visitTimes}}次</span>
  </div>
</template>

<script>
export default {
  name: "card_note_often",
  mixins: [MIX.base,],
  props: ["item", "target"],
  data() {
    return {
    };
  },
  computed: {

    linkDetail() {//笔记详情连接
      return function (item) {
        let { sysId = "sys_api" } = this.$route.params//获取sysId，如果没有的话就跳转sys_api，因为学习主页就是跳sys_api
        return `#/system/${sysId}/detail_data?dataId=${item.dataId}`
      }
    },
  },
  methods: {
    moment: window.moment,

  },
  created() {

  }
};
</script>

<style scoped>
.item-box {
  border-bottom: 1px #ddd solid;
  background: #fff;
  padding: 2px 0;
  text-align: left;
}
</style>