<template>
  <div class>
    <!-- <dm_debug_list level-up="0">

      <dm_debug_item v-model="valueNeed" text="同步的数据"/>
      <dm_debug_item v-model="value" text="外部同步的数据"/>
    </dm_debug_list> -->

    <el-input @input="change" v-model="dataIn" class="W70"></el-input>
  </div>
</template>

<script>
export default {
  mixins: [MIX.form_item],//混入
  props: ["prop"],
  data() {
    return {
      dataIn: null,
    };
  },
  watch: {
    valueNeed: {
      handler(newName, oldName) {
        this.dataIn = lodash.get(this.valueNeed, this.prop);//lodash获取值
      },
      deep: true
    }
  },
  methods: {
    change() {
      lodash.set(this.valueNeed, this.prop, this.dataIn)//设置值
      this.valueNeed = util.deepCopy(this.valueNeed)//强行同步
    }
  },
  created() {
    if (!this.value) {
      this.valueNeed = {}
    }
    this.dataIn = lodash.get(this.valueNeed, this.prop);//lodash获取值

  }
};
</script>

<style scoped>
.el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 70%;
}
</style>
