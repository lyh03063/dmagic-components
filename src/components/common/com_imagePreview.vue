



<template>
  <div class="item-box">
    <!-- <img :src="src" alt style="max-width:80px;max-height:60px;" @click="fnClick" /> -->
    <el-image
      style="width:80px;height:60px;"
      :src="src"
      :preview-src-list="srcList"
      fit="scale-down"
      @click="fnClick"
    ></el-image>
  </div>
</template>

<script>
export default {
  name: "com_imagePreview",
  //用于列表模糊查询的组件
  props: ["doc"],
  data() {
    return {
      srcList: [
      ]
    };
  },
  computed: {
    src() {
      let url = lodash.get(this.doc, `file[0].url`, "");
      return url
    }
  },
  methods: {
    fnClick() {
      //加载图片预览列表
       this.vm_list = this.$closest({ vmT: this, name: "dm_list_data" })
      let { tableData } = this.vm_list

      let srcList = tableData.map(doc => {
        let url = lodash.get(doc, `file[0].url`, "");
        return url

      })

      let indexCurr = srcList.findIndex(src => src == this.src)




      let arrDelete = srcList.splice(0, indexCurr)
      srcList.push(...arrDelete)





      this.srcList = srcList

    }
  }, mounted() {
    this.srcList = [this.src]
  }
};
</script>
<style scoped>
.item-box >>> .el-icon-circle-close {
  color: white;
}
</style>