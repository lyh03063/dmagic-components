<template>
  <div class="">
    <div class="DPFC HP100">
      <div
        class="HP100 out FX1"
        :class="classOut"
        :style="styleOut"
        @mouseleave="outMLeave()"
      >
        <div
          class="item"
          :class="getItemClass(item, i)"
          v-for="(item, i) in optionsIN"
          :key="i"
          @mouseenter="itemMEnter(i)"
          @click="itemMClick(item)"
        >
          {{ getItemLabel(item) }}
        </div>
      </div>
      <div class="ML5" v-if="show_value_label_right" style="min-width: 40px">
        {{ valueLable }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "grid_radio", //百分比进度条组件
  mixins: [MIX.form_item_new], //混入
  props: {
    cf_empty_item: {},//空值项配置
    skin: {},//空值项配置
    mode: {//类型
      default: "normal"
    },
    show_item_label: {//显示值项标签
      default: true
    },
    show_value_label_right: {//右侧显示当前值对应标签
      default: false
    },
    options: {//右侧显示当前值对应标签

    }
  },
  data() {
    return {
      valueNeed: this.value,
      indexMEnter: null,//鼠标悬停选项的索引值
      classOut: {},//外盒子class
      styleOut: {},//外盒子样式

    };
  },
  computed: {
    //函数：{当前值对应的label}
    valueLable: function (i) {
      let optionCurr = this.optionsIN.find(d => d.value == this.valueNeed)
      if (!optionCurr) return
      return optionCurr.label
    },
    //函数：{当前值对应的索引}
    valueindex: function (i) {
      let index = this.optionsIN.findIndex(d => d.value == this.valueNeed)
      return index
    },
    //函数：{值项内部显示内容}
    labelInItem: function (i) {

    },
  },


  methods: {
    //函数：{计算值项Class函数}
    getItemLabel: function (item) {
      let { valueindex, indexMEnter, mode, show_item_label } = this
      let { label } = item
      if (!show_item_label) { label = "" }
      return label
    },
    //函数：{计算值项Class函数}
    getItemClass: function (item, i) {
      let { valueindex, indexMEnter, mode } = this
      let obj = { m_enter: i == indexMEnter, m_valid: i == valueindex }
      if (mode == "progress") {
        obj.m_valid = i <= valueindex
      }
      return obj
    },
    //函数：{鼠标离开外盒子的回调函数}
    outMLeave: async function (i) {
      this.indexMEnter = -1
    },
    //函数：{鼠标进入选项的回调函数}
    itemMEnter: async function (i) {
      this.indexMEnter = i
    },
    //函数：{鼠标进入选项的回调函数}
    itemMClick: async function (item) {
      if (this.valueNeed == item.value) return
      this.valueNeed = item.value
      this.$emit("change", this.valueNeed, item);
    },


  },
  created() {


    this.optionsIN = lodash.cloneDeep(this.options)//深拷贝

    if (this.cf_empty_item) {//如果{空值项配置}存在
      let label = lodash.get(this.cf_empty_item, `label`, "全部");
      let item = { label, value: null }
      this.optionsIN.unshift(item)
    }




    if (this.skin) {//如果{空值项配置}存在
      this.classOut[`skin_${this.skin}`] = true//变量：{外盒子class}
    }

    let length = this.optionsIN.length
    let styleOut = {}//变量：{外盒子样式}

    let width = "1fr"
    styleOut["grid-template-columns"] = `repeat(${length}, ${width})`
    this.styleOut = styleOut
  }
};
</script>
<style scoped>
.out {
  background: #ddd;
  display: grid;
  gap: 1px;
  border: 1px #ddd solid;
}
.item {
  color: #999;
  font-size: 12px;
  background: #fff;
  padding: 3px 5px;
  cursor: pointer;
  height: 100%;
  display: grid;
  place-items: center;
}

.m_valid {
  color: #fff;
  background: #67C23A;
}
.m_enter {
  color: #fff;
  background: #E6A23C;
}
/* color_block皮肤差异化处理 */
.out.skin_color_block {
  background: none;
  gap: 10px;
  border: none;
}

/* grid_split皮肤差异化处理 */
.out.skin_grid_split {
  background: none;
  gap: 10px;
  border: none;
}


.out.skin_grid_split  .item {
 border: 1px #ddd solid;

}
</style>
