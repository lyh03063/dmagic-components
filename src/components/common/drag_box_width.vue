<template>
  <div class>
    <div class="DPF">
      <div class v-bind="cfIN.cfBoxLeft" v-show="cfIN.isShowLeft">
        <slot class name="left"></slot>
      </div>

      <div
        ref="resize"
        class="W3 BC_999 resize"
        @mousedown="fnMousedown"
        style="margin-top:-10px"
        v-if="cfIN.isShowRight&&cfIN.isShowLeft"
      ></div>
      <div class="FX1" v-show="cfIN.isShowRight">
        <slot class name="right"></slot>
      </div>
    </div>
    <!-- {{cfIN}} -->
  </div>
</template>
<script>
export default {
  mixins: [MIX.base,],
  name: "drag_box_width",//
  props: {
    cf: {
      default: function () {
        return {};
      }
    }
  },
  data() {
    return {
      cfIN: {}
    };
  },
  watch: {
    "cf.isShowLeft": {
      handler(newVal, oldVal) {
        this.cfIN.isShowLeft = newVal;
      },
      immediate: true,
      deep: true
    },
    "cf.isShowRight": {
      handler(newVal, oldVal) {
        this.cfIN.isShowRight = newVal;
      },
      immediate: true,
      deep: true
    },
    "cf.nWidthLeft": {
      handler(newVal, oldVal) {
        if (!(this.cfIN.cfBoxLeft && this.cfIN.cfBoxLeft.style)) return
        this.cfIN.nWidthLeft = newVal;
        this.cfIN.cfBoxLeft.style.width = `${this.cfIN.nWidthLeft}px`
      },
      immediate: true,
      deep: true
    }
  },

  computed: {

  },
  methods: {
    //函数：{鼠标按下的回调函数}
    fnMousedown: async function (e) {
      var domResize = this.$refs.resize;//获取dom节点，不需要使用随机id
      let nWidthLeftOld = this.cfIN.nWidthLeft;//变量：{开始拖拽时的初始宽度}
      var startX = e.clientX;

      // 鼠标拖动事件
      document.onmousemove = (e) => {
        var endX = e.clientX;
        var moveLen = (endX - startX); // （endx-startx）=移动的距离。
        this.cfIN.nWidthLeft = nWidthLeftOld + moveLen//新的距离设置

        this.$set(this.cfIN, "nWidthLeft", nWidthLeftOld + moveLen);

        this.$set(this.cfIN, "nWidthLeft", nWidthLeftOld + moveLen);

        this.cfIN.cfBoxLeft.style.width = `${this.cfIN.nWidthLeft}px`
        this.cf.nWidthLeft = this.cfIN.nWidthLeft

      }
      // 鼠标松开事件
      document.onmouseup = (e) => {
        document.onmousemove = null;//注销事件
        document.onmouseup = null;//注销事件
        domResize.releaseCapture && domResize.releaseCapture(); //当你不在需要继续获得鼠标消息就要应该调用ReleaseCapture()释放掉
      }
      domResize.setCapture && domResize.setCapture(); //该函数在属于当前线程的指定窗口里设置鼠标捕获
      return false;
    },
    //函数：{初始化组件配置函数}
    initCF: async function () {
      let cfIN = lodash.cloneDeep(this.cf)//cfIN****************
      let { nWidthLeft = 200, isShowLeft = true, isShowRight = true } = cfIN
      let cfBoxLeft = lodash.get(cfIN, `cfBoxLeft`, {});

      {
        //处理cfBoxLeft
        let style = lodash.get(cfBoxLeft, `style`, {});
        let styleDefault = { width: `${nWidthLeft}px` }//左盒子的默认style配置
        util.setObjDefault(style, styleDefault);
        let cfBoxLeftDefault = { class: " ", style }
        util.setObjDefault(cfBoxLeft, cfBoxLeftDefault);
      }




      util.setObjDefault(cfIN, {
        nWidthLeft, isShowLeft,isShowRight,cfBoxLeft,
      });
      this.cfIN = cfIN







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
.resize {
  cursor: w-resize;
}
</style>