



<template>
  <div class>
    <el-select v-model="value" placeholder="请选择" clearable>
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" ></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "com_item_complete_search", //用于列表查询完成度的组件
  props: ["formData"],
  data() {
    return {
      options: DYDICT.arr_complete2,
      value: ''
    }
  },
  watch: {
    value: {
      handler(newVal, oldVal) {
        if (newVal) {//Q1:{000}
          let dict = {
            1: { "$eq": 0 },
            2: { "$gt": 0, "$lt": 1 },
            3: { "$eq": 1 }
          }
          this.$set(this.formData, "complete", dict[newVal]);//修改真实表单数据
        } else { //Q2:{000}

          this.$set(this.formData, "complete", null);//修改真实表单数据

        }

        // this.formData.complete = dict[newVal];
      },
      immediate: true,
      deep: true
    }
  },
  

  methods: {

  }
};
</script>
