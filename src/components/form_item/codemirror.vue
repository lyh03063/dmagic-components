<template>
  <div class="item-box">
    <dm_codemirror
      ref="codeM"
      class="LH18 FS16"
      v-model="valueNeed"
      :options="cf.cfCodeMirror"
      v-if="ready"
    ></dm_codemirror>
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
      ready: false,
    };
  },
  methods: {
    change() {
      this.$emit("input", this.valueNeed); //触发双向绑定
    },
  },
  async created() {


    // await util.loadCss({ url: `https://cdn.bootcdn.net/ajax/libs/codemirror/2.33.0/codemirror.css` })//加载
    //await要加，否则代码可能显示不正常！！！
    // await util.loadCss({ url: `//qn-static.dmagic.cn/codemirror.5.41.0/lib/codemirror.css` })//加载
    await util.loadCss({ url: `//qn-static.dmagic.cn/codemirror.5.41.0/theme/lucario.css` })//加载



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
      //匹配选中单词高亮，重要
      highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true },
      // line: true,
      // autoCloseBrackets: true,
      foldGutter: true,
      gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
      extraKeys: {
        "F11": function (cm) {
          // alert(`F11`);

          cm.setOption("fullScreen", !cm.getOption("fullScreen"));
        },
        "Esc": function (cm) {
          if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
        }
      }
      // more codemirror options, 更多 codemirror 的高级配置...
    }
    util.setObjDefault(cfCodeMirror, cfCodeMirrorDefault);
    //两层配置结构，为了更好拓展
    util.setObjDefault(this.cf, { cfCodeMirror, });
    this.ready = true;



  },
  mounted() {



  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item-box >>> .cm-s-lucario .CodeMirror-selected {
  background: #999;
}

/*匹配选中单词的所有单词样式 */
.item-box >>> .cm-matchhighlight {
  background: #666;
}

/*html标签颜色 */
.item-box >>> .cm-tag {
  color: #f90;
}
/*html标签-出错时颜色 */
.item-box >>> .cm-error {
  color: #f00;
}
</style>
