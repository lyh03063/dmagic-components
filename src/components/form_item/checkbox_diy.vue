<template>
  <div class>
    checkbox_diy123
    <div
      :class="{checkbox:true,checked:valueNeed.includes(optionEach.value)}"
      v-for="optionEach in options"
      :key="optionEach.value"
      @click="changeChecked(optionEach.value)"
    >
    {{optionEach.label}}
    </div>

  </div>
</template>

<script>
export default {
  //用于列表模糊查询的组件
  props: {
    value: { type: [Array, Boolean] },
    options: {
      type: [Array],
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      valueNeed: this.value
    };
  },
  methods: {
    changeChecked(value) {
      let index = this.valueNeed.indexOf(value); //索引值
      //Q1:{索引值}大于等于0 ，表示该元素存在于数组，
      if (index >= 0) {
        this.valueNeed.splice(index, 1);//删除
        //Q2:否则
      } else {
        this.valueNeed.push(value);//加入
      }

      this.$emit("input", this.valueNeed); //触发双向绑定
    }
  },
  created() {
    // if (this.value) {
    //   //如果{000}000
    //   this.valueNeed = this.value;
    // } else {
    //   this.valueNeed = [1];
    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*复选框样式*/
.checkbox {
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 2px #333 solid;
  border-radius: 10%;
  margin-right: 10px;
}
/*选中样式*/
.checked {
 
color: white;
  background-color:red 

}
</style>
