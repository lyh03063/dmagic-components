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
        // if (newVal && oldVal && newVal.length != oldVal.length) {
        //   console.log(`oldVal.length:${oldVal.length}----newVal.length:${newVal.length}`);

        // }
        this.valueNeed = util.arrToCssStr(newVal)
      },
      immediate: true,
      deep: true
    },
    "arrProp.length": {
      handler(newVal, oldVal) {
        console.log(`arrProp.length变化`);

      },

    },
    valueNeed: {
      handler(newVal, oldVal) {
        if (!newVal) return
        let arrPropBackup = lodash.cloneDeep(this.arrProp)
        console.log(`valueNeed-arrPropBackup:#######`, arrPropBackup);
        let arrPropNew = util.cssStrToArr(newVal)
        //如果数量没有变化
        if (this.arrProp && arrPropNew && (this.arrProp.length == arrPropNew.length)) {
          this.arrProp.forEach((itemEach, i) => {//循环：{000数组}
            Object.assign(itemEach, arrPropNew[i]);//合并对象
          })
        } else {
          this.arrProp = arrPropNew
        }
        console.log(`valueNeed-this.arrProp:#######`, this.arrProp);


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
