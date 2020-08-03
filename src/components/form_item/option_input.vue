<template>
  <!-- placement不能在对象中传递过来，奇怪 -->
  <el-popover v-model="visible" v-bind="cf.cfPopover" v-if="ready" placement="right">
    <!-- {{valueNeed}}-- -->
    <!-- widthG="100px" -->
    <dm_list_flex_res :list="options" #default="{item}" v-bind="cf.cfListFlex">
      <div class="group">
        <i :class="['frequency-option',{focus:valueNeed==item.value}] " @click="fnClickOp(item)">
          {{item.label
          ||item.value}}
        </i>
      </div>
    </dm_list_flex_res>
    <div class="TAR">
      <a href="javascript:;" class="n-a" @click="clear">清除</a>
    </div>

    <el-button slot="reference" icon="el-icon-more" size="mini"></el-button>
  </el-popover>
</template>

<script>
export default {
  name: "option_input",
  mixins: [MIX.form_item_new], //混入
  props: {
    cf: {
      type: Object,
      default: function () {
        return {}
      }
    },
    options: {
      type: [Array],
      default: function () {
        return [{ label: "选项1", value: "1", }, { label: "选项2", value: "2", }]
      }
    },
  },

  data() {
    return {
      ready: false,
      visible: false,
    };
  },
  methods: {
    //函数：{清除已选项函数}
    clear: async function () {
      this.$emit("input", null)
      this.visible = false;

    },
    //函数：{点击选项函数}
    fnClickOp: async function (option) {
      this.$emit("input", option.value)
      this.visible = false;
    },
    showDialog() {
      alert(`showDialog`);
    },
    initCf() {


      let cfPopover = lodash.get(this.cf, `cfPopover`, {});


      let cfPopoverDefault = {
        "placement": "right",
        width: "200",
        trigger: "hover",
        'open-delay': 0,
      }


      util.setObjDefault(cfPopover, cfPopoverDefault);


      let cfListFlex = lodash.get(this.cf, `cfListFlex`, {});
      let cfListFlexDefault = {
        widthG: "53px",
        spaceY: "5px",


      }
      console.log(`cfPopover:#####`, cfPopover);

      util.setObjDefault(cfListFlex, cfListFlexDefault);





      util.setObjDefault(this.cf, {
        // isShowSearchForm: false,
        cfPopover, cfListFlex
      });

      this.ready = true

    },
  },
  async created() {
    this.initCf()





  },
  mounted() {



  },
};
</script>


<style scoped>
/****************************常用值选项-START****************************/
.frequency-option {
  display: inline-block;
  border: 1px #ddd solid;
  border-radius: 5px;
  line-height: 1;
  padding: 5px 8px;
  background-color: #f0f0f0;
  cursor: pointer;
  color: #999;
  font-style: normal;
  text-align: center;
}
.frequency-option:hover {
  border: 1px #f60 solid;
}

.frequency-option.focus {
  border: 1px #3a0 solid;
}
/****************************常用值选项-END****************************/

.group .frequency-option {
  width: 100%;
}
</style>
