<template>
  <div class="item-box">
    <el-input placeholder="请输入内容" v-model="valueNeed"></el-input>
    <el-button plain @click="showDialog" size="mini">选择属性</el-button>
  </div>
</template>

<script>
export default {
    name:"aaaa",
  mixins: [MIX.form_item_new], //混入
  props: {
    cf: {
      type: Object,
      default: function () {
        return {}
      }
    },
  },

  data() {
    return {
      ready: false,
    };
  },
  methods: {
    showDialog() {
      alert(`showDialog`);
    },
  },
  async created() {





  },
  mounted() {



  },
};
</script>


<style scoped>
</style>
