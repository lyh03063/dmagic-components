<template>
  <div class="item-box TAC DPF">
    <a class="FX1" target="_blank" :href="linkDetail(item)">
     <span v-if="item.objNote" >{{item.objNote.title}}</span>
    </a>
    <span class="C_999">{{moment(item.timeVisited).format("YYYY-MM-DD HH:mm:ss")}}</span>
  </div>
</template>

<script>
export default {
  name: "card_note_history",
  mixins: [MIX.base,],
  props: ["item"],
  data() {
    return {
    };
  },
  computed: {
   
    linkDetail() {//笔记详情连接
      return function (item) {
        let {sysId="sys_api"}=this.$route.params//获取sysId，如果没有的话就跳转sys_api，因为学习主页就是跳sys_api
        return `#/system/${sysId}/detail_data?dataId=${item.dataId}`
      }
    },
  },

  methods: {
    moment:window.moment,

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