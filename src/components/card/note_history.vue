<template>
  <div class="item-box TAC DPF">
    <a class="FX1" target="_blank" :href="`/#/detail_data?dataId=${item.dataId}`">
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