<template>
  <div class="BC_fff P5">
    {{ docComplete }}
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="name" name="first">
        <el-input
          placeholder="请输入内容"
          v-model="docComplete.objVCom.comName"
        ></el-input>
      </el-tab-pane>
      <el-tab-pane label="选项对象" name="second" lazy>
         <!--js编辑器-->
        <dm_js_code_curr
          v-model="docComplete.objVCom.optionCode"
        ></dm_js_code_curr>
       
      </el-tab-pane>
      <el-tab-pane label="data" name="data" lazy>
         <!--js编辑器-->
        <dm_js_code_curr
          v-model="docComplete.objVCom.dataCode"
        ></dm_js_code_curr>
       
      </el-tab-pane>

      <el-tab-pane label="methods" name="methods" lazy>
         <!--js编辑器-->
        <dm_js_code_curr
          v-model="docComplete.objVCom.methodsCode"
        ></dm_js_code_curr>
       
      </el-tab-pane>
      <el-tab-pane label="template" name="template" lazy>
        <!--html编辑器-->
        <dm_html_code_curr
          v-model="docComplete.objVCom.template"
        ></dm_html_code_curr>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>




export default {




  name: "form_vue_sfc",
  props: {

    doc: {},
    docComplete: {
      default: function () {
        return {};
      }
    },
    cf: {
      default: function () {
        return {};
      }
    }
  },
  components: {},

  data() {
    return {
      activeName2: 'first'
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },

  created() {






  }
};
</script>

<style scoped>
</style>
