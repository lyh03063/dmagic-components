<template>
  <div class>
    <!-- <dm_debug_list level-up="0">
      <dm_debug_item v-model="value" text="value"/>
      <dm_debug_item v-model="valueNeed" text="valueNeed"/>
    </dm_debug_list>-->
    <textarea
      class="WP100 H100 PL10 PR10 PT5 PB5"
      v-model="valueNeedStr"
      @change="change"
      @blur="$emit('blur')"
    ></textarea>
  </div>
</template>

<script>
export default {
  mixins: [MIX.form_item], //混入
  //用于列表模糊查询的组件
  props: {
    value: [Object, Array]
  },
  data() {
    return {
      valueNeedStr: ""
    };
  },
  watch: {
    value: {
      handler(newName, oldName) {
        this.valueNeedStr = JSON.stringify(this.value);
      },
      immediate: true,
      deep: true
    }
    // valueNeedStr: {
    //   handler(newName, oldName) {
    //     this.valueNeedStr = JSON.stringify(this.value);
    //   },
    //   immediate: true,
    //   deep: true
    // }
  },
  methods: {
    change() {
      let json = null;
      if (this.valueNeedStr) {
        //Q2：{值}不为空
        try {
          json = JSON.parse(this.valueNeedStr); //函数调用：{Json字符串转换Json对象函数}
        } catch (err) {
          alert("json格式错误");
        }
      }
      this.valueNeed = json;

      this.$emit("change", json); //触发双向绑定
    }
  },
  created() {
    // if (this.value) {
    //   this.valueNeed = JSON.stringify(this.value);
    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
