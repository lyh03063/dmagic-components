<template>
  <div class="out PS4">
    <!-- <button @click="showPopper">button123</button> -->
    <div ref="tooltip" class="tooltip" >
      <!--关闭按钮-->
      <i class="el-icon-close btn_pop_close" @click="hidePopper"></i>
      <!--插槽---增加了show的判断，让内部的内容实时更新-->
      <slot v-if="show"> </slot>

      <div class="arrow" data-popper-arrow></div>
    </div>
  </div>
</template>
<script>
export default {
  mixins: [MIX.base,],
  name: "popper",//
  props: {
    trigger: {},

    cf: {
      default: function () {
        return {};
      }
    }
  },

  data() {
    return {
      show:false,
    };
  },
  methods: {

    //函数：{显示popper弹窗函数}
    showPopper: async function () {
      this.show=true;
      let eleTrigger = this.trigger
      this.tooltip.setAttribute('data-show', '');
      this.popperInstance = Popper.createPopper(eleTrigger, this.tooltip, {
        placement: 'bottom',
        eventsEnabled: false,
        // modifiers: [
        // ],

        modifiers: [ //注意是数组形式
          {
            name: 'offset',
            options: {
              offset: [0, 8],
            },
          },
          {
            name: 'computeStyles', //这个name还一定要
            options: {
              gpuAcceleration: false, //不启用transform样式
            },
          },
        ],
      });
    },
    //函数：{隐藏popper弹窗函数}
    hidePopper: async function () {
       this.show=false;
      this.tooltip.removeAttribute('data-show', '');
      if (this.popperInstance) {
        this.popperInstance.destroy();
        this.popperInstance = null;
      }
    },
  },
  async created() {
  },
  mounted() {

    this.tooltip = this.$refs.tooltip;
    this.popperInstance = null;
  }
};
</script>
<style scoped>
.tooltip {
  width: auto;
  border: 1px #666 solid;
  border-radius: 5px;
  background: #fff;
  padding: 4px 8px;
  font-size: 13px;
  border-radius: 4px;
  display: none;
  z-index: 99;
}
.tooltip[data-show] {
  display: block;
}
.arrow,
.arrow::before {
  position: absolute;
  width: 8px;
  height: 8px;
  z-index: -1;
}
.arrow::before {
  content: "";
  transform: rotate(45deg);
  background: #fff;
  /* 箭头加上边框 */
  border: 1px #666 solid;
}
.tooltip[data-popper-placement^="top"] > .arrow {
  bottom: -4px;
}
.tooltip[data-popper-placement^="bottom"] > .arrow {
  top: -4px;
}
.tooltip[data-popper-placement^="left"] > .arrow {
  right: -4px;
}
.tooltip[data-popper-placement^="right"] > .arrow {
  left: -4px;
}
/* 向上箭头的边框处理 */
.tooltip[data-popper-placement^="top"] .arrow::before {
  border-left: none;
  border-top: none;
}
/* 向右箭头的边框处理 */
.tooltip[data-popper-placement^="right"] .arrow::before {
  border-right: none;
  border-top: none;
}
/* 向下箭头的边框处理 */
.tooltip[data-popper-placement^="bottom"] .arrow::before {
  border-right: none;
  border-bottom: none;
}
/* 向左箭头的边框处理 */
.tooltip[data-popper-placement^="left"] .arrow::before {
  border-left: none;
  border-bottom: none;
}
</style>