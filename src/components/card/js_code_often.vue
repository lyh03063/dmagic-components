<template>
  <div class="item-box TAC DPFC">
    <a class="FX1"  :href="`/#/js_code_edit?jsCodeId=${item.dataId}`"  :target="target">
     <span v-if="item.dataTarget" >{{item.dataTarget.title}}</span>
    </a>
    <span class="C_999">{{item.visitTimes}}次</span>
  </div>
</template>

<script>
export default {
  name: "card_js_code_often",
  mixins: [MIX.base,],
  props: ["item","target"],
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
  background: #fff;
  padding: 2px 0;
  text-align: left;
}
</style>