<template>
  <div class="upload_box">
    <dm_debug_list>
      <dm_debug_item v-model="isExceed" text="isExceed" />
      <dm_debug_item v-model="valueNeed" text="图片列表" />
      <dm_debug_item v-model="uploadConfigNeed" text="uploadConfigNeed" />
    </dm_debug_list>
    <!-- :file-list="valueNeed"这个会导致出现两次动画,但也没办法去掉 -->
    <!-- 

  name="ImgParame"//这个要注意，直传时不能设置这个
    -->
    <el-upload
      :class="{'exceed':isExceed}"
      :limit="uploadConfigNeed.limit"
      :action="uploadConfigNeed.action"
      :list-type="uploadConfigNeed.listType"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :on-success="uploaded"
      :on-exceed="exceed"
      :multiple="true"
      :before-upload="beforeUpload"
      :data="postData"
      :file-list="valueNeed"
      v-if="!changeOrder&&uploadConfigNeed"
    >
      <i class="el-icon-plus" v-if="uploadConfigNeed.listType=='picture-card'"></i>
      <el-button plain size="mini" v-else>点击上传</el-button>
    </el-upload>
    <el-button
      size="mini"
      plain
      v-if="!changeOrder&&uploadConfigNeed&&uploadConfigNeed.limit>1&&valueNeed.length>1"
      @click="changeOrder=true"
    >排序</el-button>

    <draggable v-model="valueNeed" v-if="changeOrder&&readyJs">
      <div class="photo-box" v-for="(img,index) in valueNeed" :key="index">
        <img :src="img.url" class="photo-img" @mousemove="showtool[index]=true" />
      </div>
    </draggable>
    <div style="clear:both"></div>
    <el-button
      size="mini"
      plain
      v-if="changeOrder"
      @click="changeOrder=false"
      style="margin-top:20px"
    >上传</el-button>
    <el-dialog :visible.sync="dialogVisible" :append-to-body="true">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: "",
  props: {
    uploadConfig: {
      type: Object
    }
  },
  mixins: [MIX.form_item], //混入
  components: { 
    // draggable 
    },
  data() {
    return {
      readyJs:false,
      downloadDomain: "", //七牛云下载域名
      postData: {},
      uploadConfigNeed: null,
      dialogImageUrl: "",
      dialogVisible: false,
      changeOrder: false
    };
  },
  computed: {
    //是否显示上传按钮
    isExceed() {
      let flag = false;
      if (this.uploadConfigNeed) {
        //图片数量小于限制数量的flag
        flag = this.valueNeed.length >= this.uploadConfigNeed.limit;
      }
      return flag;
    },
    showtool() {
      let arr = [];
      arr.length = this.valueNeed.length;
      return arr;
    }
  },
  watch: {
    uploadConfig: {
      handler(newVal, oldVal) {
        this.initConfig(); //函数：{初始化配置函数}
      },
      immediate: true,
      deep: true
    },
    //这个处理从mounted移到这边，主要是考虑后期value还是有可能为空
    value: {
      handler(newVal, oldVal) {
        //如果{value}不存在
        if (!this.value) {
          this.valueNeed = [];
        }
      },
      immediate: true,
      deep: true
    }
  },

  methods: {
    exceed(file, fileList) {
      this.$message.error(`最多只能上传${this.uploadConfigNeed.limit}个文件`);
    },

    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    /**
     * @name 上传前的回调函数
     * @desc 获取七牛云token,指定返回数据格式
     * @param 00000
     */

    async beforeUpload(file) {

      let maxSize = 200
      const isLimit = file.size / 1024 / 1024 < maxSize;
      if (!isLimit) {
        return this.$message.error(`上传文件大小不能超过${maxSize}MB!`);
      }




      let { data: dataToken } = await util.getQiNiuToken(file)//调用：{ajax获取七牛云token的函数}
      let { token, downloadDomain } = dataToken;
      this.downloadDomain = downloadDomain; //更新七牛云下载域名

      this.postData.token = token;

      return isLimit;
    },
    //处理图片上传后的同步
    async uploaded(response) {
      //  response= util.parseJson(response)//转成json
      let { key, fname } = response;
      let url = `${this.downloadDomain}/${key}`; //图片的绝对路径
      this.valueNeed.push({ url, name: fname }); //

      //调用：{ajax添加一个文件本部信息函数}
      util.ajaxAddFileBaseInfo({ fileSource: "upload_img", fileUrl: url, responseQiniu: response })

    





    },


    //处理图片删除后的同步
    handleRemove(file, fileList) {
      this.valueNeed = fileList;
    },
    handlePictureCardPreview(file) {
      if (this.uploadConfigNeed.preview) {
        //如果开启预览
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    },
    initConfig() {
      this.uploadConfigNeed = this.uploadConfig || {};
      //函数：{初始化配置函数}
      let uploadConfigDefault = {
        //默认的上传配置
        limit: 3,
        listType: "picture-card",
        action: window.PUB.urlUpload
      };

      if (this.uploadConfig) {
        //如果有传入上传配置
        this.uploadConfigNeed = Object.assign(
          uploadConfigDefault,
          this.uploadConfigNeed
        ); //合并对象
      } else {
        //否则
        this.uploadConfigNeed = uploadConfigDefault;
      }
    }
  },
  async created(){
    await util.loadJs({ url: PUB.urlJS.sortable })//加载
    await util.loadJs({ url: PUB.urlJS.vuedraggable })//加载

    this.readyJs = true;
  },
  mounted() { }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.photo-box {
  float: left;
  width: 146px;
  height: 146px;
  margin-right: 10px;
}
.photo-img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
.sort-button {
  height: 40px;
  width: 50px;
  float: left;
  border: 1px solid #c0ccda;
  text-align: center;
}
/* 穿透element组件样式 */
/* 补丁，之前是inline-block，会导致按钮隐藏后还会遗留高度 */
.exceed >>> .el-upload {
  display: none;
  /* float: left; */
  /* display: block; */

  /* text-align: left */
}
/* 补丁，删除图片过渡动画，因为可能会出现两次 */
.upload_box >>> .el-upload-list__item {
  transition: none;
}
</style>
