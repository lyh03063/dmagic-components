<template>
  <div class="HP100">
    <dm_debug_list>
      <dm_debug_item v-model="ready" />
    </dm_debug_list>
    <router-view :systemDoc="ready" v-if="ready"></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ready: true,


    };
  },
  methods: {



  },
  async created() {
    this.sysId = this.$route.params.sysId;

  }
};
</script>


<style scoped>
</style>
