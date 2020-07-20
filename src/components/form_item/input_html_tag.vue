<template>
  <div class>
    <div class="item-box DPF">
      <el-input class="MR10 W200" placeholder="输入或选择Html元素" v-model="valueNeed"></el-input>
      <el-button plain @click="showDialog" size="mini">选择html元素</el-button>
      <div class=" ML20">
        最近使用：
        <span
          class="C_999 MR5 Cur1"
          v-for="(item,i) in arrHistory"
          :key="i"
          @click="setValue(item.tag)"
        >{{item.tag}}</span>
      </div>

      <!--选择Css属性弹窗组件 -->
      <dm_dialog_html_tag @inited="({vm})=>vm_dialog_css_prop=vm" @select="afterSelectCssProp"></dm_dialog_html_tag>
    </div>
  </div>
</template>

<script>
export default {
  name: "input_html_tag",
  mixins: [MIX.form_item_new], //混入
  props: {
    cf: {
      type: Object,
      default: function () {
        return {}
      }
    },
    formData: {},
  },

  data() {
    return {
      vm_dialog_css_prop: null,
      ready: false,
    };
  },
  computed: {
    arrHistory: function () {
      let listHsHtmlTag = util.getLocalStorageObj("listHsHtmlTag") || []//调用：{从LocalStorage获取一个对象的函数}
      return listHsHtmlTag
    }
  },
  methods: {
    setValue(val) {
      this.valueNeed = val;

    },
    showDialog() {
      let { vm_dialog_css_prop } = this;
      if (!vm_dialog_css_prop) return;
      vm_dialog_css_prop.show()
    },

    //函数：{选择Css属性后的回调函数}
    afterSelectCssProp: async function ({ doc }) {
      let { vm_dialog_css_prop } = this;
      let { title } = doc;
      this.valueNeed = title;
      vm_dialog_css_prop.hide()

    },


  },
  async created() {





  },
  mounted() {



  },
};
</script>


<style scoped>
</style>
