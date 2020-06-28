<template>
  <div class="out">
    <div class="MB10 DPF">
      
      <div class="FX1 TAL ">
        <el-link icon="el-icon-s-fold" @click="foldAll" class="MR6">全部收起</el-link>
        <el-link icon="el-icon-s-unfold" @click="unfoldAll">全部展开</el-link>
      </div>
    </div>

    <div class="box_form" >
      <dm_form_css
        class
        v-model="valueNeed"
        key="tab1_1"
        @inited="({vm})=>vm_form_css1=vm"
      ></dm_form_css>
    </div>
   
  </div>
</template>
<script>
export default {
  mixins: [MIX.base, MIX.form_item_new],
  name: "single_class_edit",//
  props: {

    cf: {
      default: function () {
        return {};
      }
    }
  },
  data() {
    return {
      active2: "tab1_1",
    

    };
  },
 
 
  methods: {
    //函数：{全部收起函数}
    foldAll: async function () {
      let vm_form = this.vm_form_css1;
      if (this.active2 == "tab1_2") {
        vm_form = this.vm_form_css2
      }
      vm_form.foldAll()

    },
    //函数：{全部展开函数}
    unfoldAll: async function () {
      let vm_form = this.vm_form_css1;
      if (this.active2 == "tab1_2") {
        vm_form = this.vm_form_css2
      }
      vm_form.unfoldAll()

    },

    //函数：{初始化组件配置函数}
    initCF: async function () {

      let cfAAA = lodash.get(this.cf, `cfAAA`, {});
      let cfAAADefault = {
        aaaa: "11111"
      }
      util.setObjDefault(cfAAA, cfAAADefault);
      util.setObjDefault(this.cf, {
        // isShowSearchForm: false,
        cfAAA
      });

    },
  },
  async created() {
    this.initCF()//调用：{初始化组件配置函数}

  },
  mounted() {
    this.$emit("inited", { vm: this }); //将当前对象抛出
  }
};
</script>
<style scoped>
</style>