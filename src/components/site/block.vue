
<template>
  <div class="block-box" :style="styleBox">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "block",
  components: {

  },
  props: {
    height: {
      default:60
    },

    cf: {},
  },

  data() {
    return {
     
    };
  },
  computed: {
    styleBox() {
      return {
        "height": `${this.height}px`, "line-height": `${this.height}px`,

      }
    }
  },
  methods: {},

  created() {

  },

};
</script>

<style scoped>
.block-box {
  line-height: 100px;
  text-align: center;
  border: 1px #f60 dashed;
}
</style>
