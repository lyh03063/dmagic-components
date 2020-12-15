<template>
  <div class="out PS4">
    <!--dm_popper组件-->
    <dm_popper :trigger="cf.ev.target" ref="popper" v-if="cf.vm_row">
      <div  v-if="cf.vm_row" style="width:260px">
        <div class="MB15">
          <input
            class="W80 MR8"
            type="text"
            v-model="cf.doc.tag"
            placeholder="标签名"
          />
          <input
            type="text"
            v-model="cf.doc.desc"
            placeholder="注释"
            style="width: 120px"
          />
        </div>
        <div class="DPF" style="flex-wrap: wrap">
          <i
            title="+子节点"
            class="MR10 btn_mimi el-icon-plus"
            @click="showDialogAddChild(cf.doc)"
            v-if="cf.doc.children && !isNoChildren(cf.doc)"
            >子节点</i
          >
          <i
            title="+属性"
            class="MR10 btn_mimi el-icon-plus"
            @click="
              cf.vm_row.addPropAfter({
                docEntity: cf.doc,
                index: 0,
                position: 'before',
              }); hide();
            "
            >属性</i
          >
          <i
            title="+子组件"
            class="MR10 btn_mimi el-icon-plus"
            @click="cf.vm_row.showDialogAddCom(cf.doc); hide();"
            v-if="cf.doc.children && !isNoChildren(cf.doc)"
            >子组件</i
          >
          <i
            title="修改节点"
            class="MR10 btn_mimi el-icon-edit"
            @click="
            
              hide();
              cf.vm_row.$refs.collectionTag.showEditDialog(cf.index);
            "
          ></i>
          <div class="H1 BC_f0f0f0 OFH MT10 MB10 WP100"></div>
          <i
            title="上移"
            class="MR10 btn_mimi el-icon-aaa"
            @click="
              cf.vm_row.$refs.collectionTag.move(cf.index, 'up');
              hide();
            "
            >上移</i
          >
          <i
            title="下移"
            class="MR10 btn_mimi el-icon-aaa"
            @click="
              cf.vm_row.$refs.collectionTag.move(cf.index, 'down');
              hide();
            "
            >下移</i
          >
          <i
            title="置顶"
            class="MR10 btn_mimi el-icon-aaa"
            @click="
              cf.vm_row.$refs.collectionTag.move(cf.index, 'top');
              hide();
            "
            >置顶</i
          >
          <i
            title="置底"
            class="MR10 btn_mimi el-icon-aaa"
            @click="
              cf.vm_row.$refs.collectionTag.move(cf.index, 'bottom');
              hide();
            "
            >置底</i
          >
          <i
            title="删除当前节点"
            class="MR10 btn_mimi el-icon-delete"
            @click="
              cf.vm_row.$refs.collectionTag.deleteData(cf.index);
              hide();
            "
          ></i>
          <div class="H1 BC_f0f0f0 OFH MT10 MB10 WP100"></div>
          <i
            title="复制节点"
            class="MR10 btn_mimi el-icon-document-copy"
            @click="
          
              cf.vm_row.$refs.collectionTag.copyData(cf.index);
              hide();
            "
            >节点</i
          >
          <i
            title="复制代码到剪贴板"
            class="MR10 btn_mimi el-icon-document-copy"
            @click="cf.vm_row.copyHtmlCode(cf.doc);hide();"
            >代码</i
          >
          <i
            title="粘贴代码到此"
            class="MR10 btn_mimi el-icon-document-copy"
            @click="cf.vm_row.pasteHtmlForChildren(cf.doc);hide();"
            >粘贴代码到此</i
          >
        </div>
      </div>
    </dm_popper>
  </div>
</template>
<script>
export default {
  mixins: [MIX.base,],
  name: "popper_html_tag",//
  props: {
    cf: {
      default: function () {
        return {};
      }
    }
  },
  computed: {
    //没有子元素
    isNoChildren: function () {
      let arr = ["img", "input", "br", "hr", "meta", "script", "link", "title",]
      let fn = function (doc) {
        let { tag } = doc
        return arr.includes(tag)
      }
      return fn
    },
  },
  data() {
    return {
    };
  },
  methods: {
    //函数：{显示添加子元素弹窗函数}
    showDialogAddChild: async function (docEntity) {
      let { vm_row } = this.cf
    
      let key = `children_${vm_row.pid}__${docEntity.__id}`;//ref变量
      vm_row.$refs[key].$refs.collectionTag.addGroup()//弹窗打开
      vm_row.$set(docEntity, "showChildren", true);//强行展开
    },
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