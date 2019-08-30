<template>
  <div>
    
<dm_debug_list>
      <dm_debug_item v-model="res" text="res"/>
      <dm_debug_item v-model="fileResult" text="fileResult"/>
    </dm_debug_list>

    <el-upload
      class="avatar-uploade"
      :multiple="true"
      :action="actionPath"
      :before-upload="beforeAvatarUpload"
      :data="postData"
      :on-success="handleAvatarSuccess"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import { genUpToken } from "../assets/js/qiniu_token.js";

export default {
  components: {},

  data() {
    return {
      res:null,
      fileResult:null,
      postData: {},
      imageUrl: "",
      actionPath: "https://up-z2.qiniup.com"//根据地区的不同，这个直传域名有可能不同
    };
  },

  methods: {
    handleAvatarSuccess(res, file) {
      this.fileResult = file;
      this.res = res;
      /**
       * 这里应该根据返回结果进行ajax数据保存
       */
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 200;

      if (!isLt2M) {
        this.$message.error("上传文件大小不能超过 200MB!");
      }
      return isLt2M;
    }
  },
  created() {
    /**
     * 前端获取token，这一步应该交给后端来实现
     */
    var token;
    var policy = {};
    var bucketName = "test";
    var AK = "NRMJl2D1rXCOG3G9lqUAraOAkNzNxIn84n4iYbJ0";
    var SK = "CA9R-Qlijmw-WcAS2CDDyBGmh7zxW42y6f1TRsxI";
    var deadline = Math.round(new Date().getTime() / 1000) + 3600;
    policy.scope = bucketName;
    policy.deadline = deadline;
    token = genUpToken(AK, SK, policy);
    console.log("token", token);
    this.postData.token = token;
  }
};
</script>

<style>
</style>
