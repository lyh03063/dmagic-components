<template>
  <div class="item-box">
    <dm_codemirror class="LH18 FS13" v-model="valueNeed" :options="cf.cfCodeMirror"></dm_codemirror>
  </div>
</template>

<script>
export default {
  mixins: [MIX.form_item_new], //混入
  props: {
    cf: {
      type: Object,
      default: function () {
        return {}
      }
    },
  },

  data() {
    return {
   
    };
  },
  methods: {
    change() {
      this.$emit("input", this.valueNeed); //触发双向绑定
    },
  },
  async created() {
    if (!this.value) {
      this.valueNeed = ""
    }
    let cfCodeMirror = this.cf.cfCodeMirror || {}
    //表单默认配置
    let cfCodeMirrorDefault = {
        // codemirror options
        tabSize: 4,
        mode: "text/javascript",
        theme: "lucario",
        styleActiveLine: true, //当前行高亮
        lineNumbers: true,
        lineWrapping: true, //代码折叠
        matchBrackets: true,
        // line: true,
        // autoCloseBrackets: true,
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
        // more codemirror options, 更多 codemirror 的高级配置...
      }
    util.setObjDefault(cfCodeMirror, cfCodeMirrorDefault);
    //两层配置结构，为了更好拓展
    util.setObjDefault(this.cf, { cfCodeMirror, });

  },
  mounted() {

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.item-box >>> .cm-s-lucario .CodeMirror-selected { background: #999; }
</style>
