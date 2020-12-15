<template>
  <div class="DPIB">
    <template class="" v-for="(tag, index) in valueNeed">
      <!-- 将key改为Index,不要时tag -->
      <!--编辑框,这里用原生的input，因为el-input不支持lazy修饰符
     
      -->
      <input
        v-focus
        :key="index"
        class="n-input DPIB MR10 W200 ML10"
        v-if="editIndex == index"
        v-model.lazy="valueNeed[index]"
        size="small"
         @blur="editIndex = null"
        @keyup.enter.native="editIndex = null"
      >
      <el-tag
        v-else
        closable
        :key="index"
        :disable-transitions="false"
        @click="editIndex = index"
        @close="handleClose(tag)"
        >{{ tag }}</el-tag
      >
    </template>

    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    ></el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput"
      >+ New Tag</el-button
    >
  </div>
</template>

<script>
export default {
  name: "tag_list",
  props: {
    value: [Array]
  },
  data() {
    return {
      editIndex: null,//当前处于编辑状态的索引值
      valueNeed: null,
      inputVisible: false,
      inputValue: ""
    };
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

  methods: {
    handleClose(tag) {
      let index = this.valueNeed.indexOf(tag);
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

    // this.valueNeed = lodash.cloneDeep(this.value)||[];   //深拷贝

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

.n-input:focus{
  border: 1px #ddd solid;

}
</style>
