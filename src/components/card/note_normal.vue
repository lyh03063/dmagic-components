<template>
  <div class="item-box MB10 TAC">
    <p class="FS16 MB8 MT4">{{index}}-{{item.title}}</p>
  </div>
</template>

<script>
export default {
  name: "card_note_normal",
  mixins: [MIX.base,],
  props: ["item","index"],
  data() {
    return {
    };
  },

  methods: {

  },
  created() { }
};
</script>

<style scoped>
.item-box {
  border: 1px #ddd solid;
  border-radius: 5px;
  background: #fff;
  padding: 5px 10px;
  text-align: left;
}
</style>