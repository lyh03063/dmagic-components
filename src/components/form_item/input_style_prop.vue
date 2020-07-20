<template>
  <div class="WP100">
    <!-- <div class>input_style_prop</div> -->
    <!-- <el-input placeholder="请输入内容" v-model="valueNeed"></el-input> -->
    <dm_row_css_code v-model="arrProp"></dm_row_css_code>
  </div>
</template>

<script>
export default {
  name: "input_style_prop",
  mixins: [MIX.form_item_new], //混入
  props: {
    cf: {
      type: Object,
      default: function () {
        return {}
      }
    },
    formData: {},
  },

  data() {
    return {
      arrProp: []
    };
  },
  computed: {

  },
  watch: {
    arrProp: {
      handler(newVal, oldVal) {
        console.log('arrProp changed');
        this.valueNeed = util.arrToCssStr(newVal)
      },
      immediate: true,
      deep: true
    },
    valueNeed: {
      handler(newVal, oldVal) {
        console.log('valueNeed changed');
        if(!newVal)return
        this.arrProp = util.cssStrToArr(newVal)

      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    setValue(val) {
      this.valueNeed = val;

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
