<template>
  <div class="out PS4 showBigIn">
    <!--dm_popper组件-->
    <dm_popper :trigger="cf.ev.target" ref="popper" v-if="cf.vm_row">
      <div
        class="PSR PR22"
        v-if="
          cf.vm_row.getPopoverKey({
            docEntity: cf.doc,
            prop: cf.item.prop,
            index: cf.index,
          })
        "
      >
        <el-input
          type="textarea"
          :rows="1"
          placeholder="请输入内容"
          v-model="cf.item.prop"
        ></el-input>
        <div class="PT6">
          <i
            class="MR10 btn_mimi el-icon-plus"
            @click="
              cf.vm_row.addPropAfter({ docEntity: cf.doc, index: cf.index });
              hide();
            "
            >后面属性</i
          >
          <i
            class="MR10 btn_mimi el-icon-plus"
            @click="
              cf.vm_row.addPropAfter({
                docEntity: cf.doc,
                index,
                position: 'before',
              });
              hide();
            "
            >前面属性</i
          >
          <i
            class="MR10 btn_mimi"
            @click="
              cf.vm_row.addPropAfter({
                docEntity: cf.doc,
                index: cf.index,
                prop: `${cf.item.prop}_1`,
                value: cf.item.value,
              });
              hide();
            "
            >复制</i
          >
          <i
            class="MR10 btn_mimi el-icon-delete"
            @click="deleteProp({ docEntity: cf.doc, index: cf.index })"
            >删除</i
          >
          <label>
            <input v-model="cf.item.ignoreVal" type="checkbox" />
            省略属性值
          </label>
        </div>
        <div class="MT10 DPF">
          <!---->
          <dm_option_input
            class="MR6"
            v-model="cf.item.prop"
            :options="propList(cf.doc.tag)"
            @change="
              showPopoverPropVal({
                docEntity: cf.doc,
                prop: cf.item.prop,
                index: cf.index,
              });hide();
            "
            btnText="私有属性"
            v-if="propList(cf.doc.tag).length"
            :cf="cf.vm_row.cfOptionInput"
          ></dm_option_input>
          <dm_option_input
            class="MR6"
            v-model="cf.item.prop"
            :options="optionsGlobal"
            btnText="全局属性"
            @change="
              showPopoverPropVal({
                docEntity: cf.doc,
                prop: cf.item.prop,index: cf.index,
              });hide();
            "
            :cf="cf.vm_row.cfOptionInput"
          ></dm_option_input>
          <dm_option_input
            class="MR6"
            v-model="cf.item.prop"
            :options="optionsJsEvent"
            @change="
              showPopoverPropVal({
                docEntity: cf.doc,
                prop: cf.item.prop,index: cf.index,
              });hide();
            "
            btnText="JS事件"
            :cf="cf.vm_row.cfOptionInput"
          ></dm_option_input>
          <dm_option_input
            class="MR6"
            v-model="cf.item.prop"
            :options="optionsVueCmd"
            @change="
              showPopoverPropVal({
                docEntity: cf.doc,
                prop: cf.item.prop,index: cf.index,
              });hide();
            "
            btnText="Vue指令"
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
  name: "popper_html_prop",//
  props: {
    index: {},
    vm_row: {},
    doc: {
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
  data() {
    return {
      //全局属性选项
      optionsGlobal: [
        { label: 'class', value: "class" },
        { label: 'style', value: "style" },
        { label: 'id', value: "id" },
        { label: 'title', value: "title" },
        
      ],
      //鼠标事件属性选项
      optionsJsEvent: [
        { label: 'onclick（鼠标点击）', value: "onclick" },
        { label: 'ondblclick（鼠标双击）', value: "ondblclick" },
        { label: 'onmousedown（鼠标按下）', value: "onmousedown" },
        { label: 'onmousemove（鼠标移动）', value: "onmousemove" },
        { label: 'onmouseup（鼠标释放）', value: "onmouseup" },
        { label: 'onmouseenter（鼠标进入）', value: "onmouseenter" },
        { label: 'onmouseleave（鼠标离开）', value: "onmouseleave" },
        { label: 'onmouseover（鼠标悬停）', value: "onmouseover" },
        { label: 'onmouseout（鼠标取消悬停）', value: "onmouseout" },
        { label: 'onkeydown（键盘按下）', value: "onkeydown" },
        { label: 'onkeyup（键盘弹起）', value: "onkeyup" },
        { label: 'onkeypress（键盘敲击）', value: "onkeypress" },
        { label: 'onfocus（表单字段或窗口聚焦）', value: "onfocus" },
        { label: 'onblur（表单字段或窗口失焦）', value: "onblur" },
        { label: 'onchange（表单字段值改变）', value: "onchange" },
        { label: 'onselect（文本被选定）', value: "onselect" },
        { label: 'onresize（窗口调整尺寸）', value: "onresize" },
        { label: 'onload（页面或图像被完成加载）', value: "onload" },
        { label: 'onunload（用户退出页面）', value: "onunload" },
        { label: 'onreset（表单重置）', value: "onreset" },
        { label: 'onsubmit（表单提交）', value: "onsubmit" },
      ],
      //Vue指令属性选项
      optionsVueCmd: [
        { label: 'v-bind（动态属性绑定,缩写为:）', value: ":xxx" },
        { label: 'v-on（事件绑定,缩写为@）', value: "@click" },
        { label: 'v-if（条件判断）', value: "v-if" },
        { label: 'v-else-if（分支条件判断）', value: "v-else-if" },
        { label: 'v-else（其他条件判断）', value: "v-else" },
        { label: 'v-for（循环/遍历）', value: "v-for" },
        { label: 'v-model（双向绑定）', value: "v-model" },
      ],
    };
  },

  computed: {

    //TODO:propList计算属性
    propList: function () {
      let fn = function (tag) {
        let listProp = util.getFormItemsBytag(tag)//调用：{根据html标签获取对应的属性表单项函数}
        if (!listProp) return []
        let options = listProp.map(d => {
          let { label, prop: value } = d
          return { label, value }
        })
        return options
      }
      return fn
    },
  },
  methods: {
    //函数：{showPopoverPropVal}
    showPopoverPropVal: async function ({ docEntity, prop,index }) {
      let { pid } = this.cf.vm_row
      let idNew = `id_${pid}_${docEntity.__id}_${index}_pval`
      console.log(`idNew:####`, idNew);
      let elPropNew = document.querySelector(`#${idNew}`)
      $(elPropNew).trigger("click")//触发一次点击事件，重新定位弹窗-jquery方式
    },
    //函数：{删除一个html属性}
    deleteProp: async function ({ docEntity, index }) {
      docEntity.diyProp.splice(index, 1)
      //当前属性弹窗关闭
      this.hide()//调用：{隐藏popper弹窗函数}
    },
    //函数：{显示popper弹窗函数}
    show: function () {
      if(!this.$refs.popper)return
      this.$refs.popper.showPopper()
    },
    //函数：{隐藏popper弹窗函数}
    hide: function () {
      if(!this.$refs.popper)return
      console.log(`this.$refs:`, this.$refs);
      this.$refs.popper.hidePopper()
    },
  },
  async created() {
  },
  mounted() {
    this.$emit("inited", { vm: this }); //将当前对象抛出
    this.tooltip = document.querySelector('#tooltip_prop');
    this.popperInstance = null;
  }
};
</script>
<style scoped>
</style>