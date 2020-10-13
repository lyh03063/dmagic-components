<template>
  <div>
    {{ arr1 }}
    <dm_pannel_new class="MB20" title="html属性的集合1111">

      <input type="text"  name="name" v-model="tag">
      <!-- {{ dictProp }} -->
      <!-- :listType="collectionlistType" -->
      <dm_collection_html_prop
        :tag="tag"
        class="MT20"
        v-model="arr1"
      ></dm_collection_html_prop>
    </dm_pannel_new>
  </div>
</template>
<script>

export default {
  components: {},
  data() {
    return {
      tag:"img",
      arr1: [
        { prop: "title", value: "这是一个标题" }, { prop: "class", value: "box1 box2" },
      ]
    };
  },
  methods: {

  },
  async created() {

  },
  async mounted() {

  }
};
</script>
<style scoped>
</style>
