<template>
  <div class="out PS4 showBigIn" >
    <!--dm_popper组件-->
    <dm_popper :trigger="cf.ev.target" ref="popper" v-if="cf.vm_row">
      <div class="PS4 PT5"  :style="styleBox" >
        <!--如果是script元素-->
        <dm_js_code_curr
          v-model="cf.doc.text"
          v-if="tag == 'script'"
        ></dm_js_code_curr>
        <!--如果是style元素-->
        <dm_css_code_curr
          v-model="cf.doc.text"
          v-else-if="tag == 'style'"
        ></dm_css_code_curr>
        <!--否则-->
        <el-input
        v-else
          class="WP95 "
          :autosize="{ minRows: 1, maxRows: 4}"
          type="textarea"
          placeholder="请输入内部文本"
          v-model="cf.doc.text"

        ></el-input>
      </div>
    </dm_popper>
  </div>
</template>
<script>
export default {
  mixins: [MIX.base,],
  name: "popper_html_content",//
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
    tag: function () {
      return this.cf.doc[this.cf.vm_row.cf.labelKey]
    },

    styleBox: function () {
      let nWidth = this.tag == 'script' || this.tag == 'style' ? 800 : 500
      return {
        width: `${nWidth}px`

      }
    }


  },
  methods: {

    //函数：{显示popper弹窗函数}
    show: function () {
      if(!this.$refs.popper)return//外部关闭所有弹窗时，这个有可能不存在
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