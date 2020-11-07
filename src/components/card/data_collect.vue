<template>
  <div class="item-box TAC DPF">
    <a class="FX1" target="_blank" :href="linkDetail(item)">
      <span>{{ item.title }}</span>
    </a>
    <span class="C_999">{{
      moment(item.collectTime).format("YYYY-MM-DD HH:mm:ss")
    }}</span>
  </div>
</template>

<script>
export default {
  name: "card_data_collect",
  mixins: [MIX.base,],
  props: ["item"],
  data() {
    return {
    };
  },
  computed: {

    linkDetail() {//详情连接
      return function (item) {
        // let {sysId="sys_api"}=this.$route.params//获取sysId，如果没有的话就跳转sys_api，因为学习主页就是跳sys_api
        // return `#/system/${sysId}/detail_data?dataId=${item._idRel}`
        let { dataType } = item
        let link = `#detail_data?dataId=${item._idRel}`
        if (dataType == "front_demo") { //Q1:前端demo
          link = `#/open/auto_layout?demoId=${item._idRel}`
        }else if (dataType == "group") { //Q1:专题分组
          link = `#/detail_group?groupId=${item._idRel}`
        }
        return link


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
  border-radius: 5px;
  background: #fff;
  padding: 5px 0;
  text-align: left;
}
</style>