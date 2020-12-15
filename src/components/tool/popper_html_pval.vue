<template>
  <div class="out PS4 showBigIn">
    <!--dm_popper组件-->
    <dm_popper :trigger="cf.ev.target" ref="popper" v-if="cf.vm_row">
      <div class=" PSR PR22">
        <el-input
          type="textarea"
          :autosize="{ minRows: 1, maxRows: 4}"
          placeholder="请输入内容"
          v-model="cf.item.value"
        ></el-input>
        <div
          class="B_ddd P5 MT10"
          v-if="arrPropFrequency(cf.doc.tag, cf.item.prop).length"
        >
          <dm_option_input
            class="MR6"
            v-model="cf.item.value"
            :options="arrPropFrequency(cf.doc.tag, cf.item.prop)"
            btnText="候选值"
            :cf="cf.vm_row.cfOptionInput"
          ></dm_option_input>
        </div>
      </div>
    </dm_popper>
  </div>
</template>
<script>
export default {
  mixins: [MIX.base,],
  name: "popper_html_pval",//
  props: {

    cf: {
      default: function () {
        return {};
      }
    }
  },
  data() {
    return {

    };
  },

  computed: {

    //TODO:arrPropFrequency计算属性-获取当前属性的候选值
    arrPropFrequency: function () {
      let fn = function (tag, prop) {
        let doc = PUB.arrHtmlTag.find(d => d.tag == tag)//变量：{当前标签文档}
        if (!doc) return []
        let { arrProp } = doc//变量：{当前标签的属性数组}
        if (!(arrProp && arrProp.length)) return []
        let docProp = arrProp.find(d => d.prop == prop)
        if (!docProp) return []
        let { arrPropFrequency = [] } = docProp
        return arrPropFrequency
      }
      return fn
    },
  },
  methods: {

    //函数：{显示popper弹窗函数}
    show: function () {
      if(!this.$refs.popper)return
      this.$refs.popper.showPopper()
    },
    //函数：{隐藏popper弹窗函数}
    hide: function () {
      if(!this.$refs.popper)return
      this.$refs.popper.hidePopper()
    },
  },
  async created() {
  },
  mounted() {

  }
};
</script>
<style scoped>
</style>