<template>
  <div class="item-box TAC">
      
    <div class="DPFC">
      <span class="MR10 FS15 FWB">{{ doc.title }}</span>
      
    </div>
  </div>
</template>

<script>
export default {
  name: "data_g_normal",
  mixins: [MIX.base,],
  props: {
    dataTypeP: {},
    doc: {
      default: function () {
        return {
          title: "标题"
        }
      }
    }
  },
  data() {
    return {




    };
  },
  computed: {


  },

  methods: {






  },
  created() {

  }
};
</script>

<style scoped>
</style>