
<template>
  <div>
    <dm_debug_list>
      <dm_debug_item v-model="cf" />
    </dm_debug_list>
    <ul>
      <li class="item-article" v-for="(item,i) in cf.list" :key="i">
        <slot class v-if="cf.slot" :doc="item"></slot>
        <a target="_blank" href="javascript:;" v-else>{{item.title}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "list_article",
  props: {
    cf: {},

  },

  data() {
    return {

    };
  },
  methods: {},

  created() { },

};
</script>

<style scoped>
.item-article {
  line-height: 48px;
  border-bottom: 1px dashed #ddd;
}
</style>
