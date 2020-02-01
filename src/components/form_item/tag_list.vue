<template>
  <div class="DPLB">
   
    <el-tag
      :key="tag"
      v-for="tag in valueNeed"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)"
    >{{tag}}</el-tag>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    ></el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
  </div>
</template>

<script>
export default {
  name: "tag_list",
  props: {
    value: [Array]
  },
  watch: {
    value: {
      handler(newVal, oldVal) {
        if (this.value) {
          this.valueNeed = this.value;
        } else {
          this.valueNeed = [];
        }
      },
      immediate: true, //组件初始化时立即执行一次变动
      deep: true //深度监听
    },
    valueNeed: {
      handler(newVal, oldVal) {
        if (this.valueNeed) {
          this.$emit("input", this.valueNeed); //同步valueNeed值到value
        }
      },
      // immediate: true,//组件初始化时立即执行一次变动
      deep: true //深度监听
    }
  },
  data() {
    return {
      valueNeed:null,
      inputVisible: false,
      inputValue: ""
    };
  },
  methods: {
    handleClose(tag) {
      let index=this.valueNeed.indexOf(tag);
      this.valueNeed.splice(index, 1);//删除
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.valueNeed.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    }
  },
  created() {

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
