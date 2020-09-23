<template>
  <div class>
    <a class="" target="_blank" :href="item.link" v-if="item.link">{{item.title}}</a>
    <div class="data_group" v-else>
      <a class="link_img" target="_blank" :href="`#/open/auto_layout?demoId=${item._idRel2}`">
        <img class="WP100 HP100" :src="$lodash.get(item,'album[0]url')" alt />
      </a>
      <div class="H40 PL5 PR5 OFH">{{item.title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {};
  },
  methods: {},
  created() { }
};
</script>

<style scoped>
.data_group {
  border: 1px #ddd solid;
  border-radius: 5px;
}
.link_img {
  display: block;
  width: 200px;
  height: 200px;
  margin: 0 auto;
}

.link_img img {
  object-fit: scale-down;
}
</style>