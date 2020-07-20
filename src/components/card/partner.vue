<template>

 <img :title="item.title||item.name" :src="item.imgSrc" />
 
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {};
  },
  methods: {},
  created() {}
};
</script>

<style scoped>
img {
  width: 100%;
  height: 100%;
}
</style>