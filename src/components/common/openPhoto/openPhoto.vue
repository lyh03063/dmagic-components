<template>
  <div class>
    <!--弹出图片显示 -->
    <el-dialog
      :modal="false"
      custom-class="n-el-dialog"
      width="70%"
      title="显示大图"
      :close-on-press-escape="false"
      :visible.sync="showDialogBigImg"
    >
      <div style="z-index:99999" class="TAC">
        <img :src="urlBigImg" alt />
      </div>
    </el-dialog>
    <div>
      <img
        @click.stop="showBigImg(item.url)"
        :src="item.url"
        alt
        v-for="item in album"
        :key="item.url"
        class="W100 H100"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["value"],
  methods: {
    showBigImg(url) {
      this.showDialogBigImg = true;
      this.urlBigImg = url;
    }
  },
  data() {
    return {
      album: null,
      urlBigImg: "",
      showDialogBigImg: false
    };
  },
  mounted() {
    this.album = this.value;
  }
};
</script>
