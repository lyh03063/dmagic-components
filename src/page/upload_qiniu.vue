<template>
  <div>
    <dm_debug_list>
      <dm_debug_item v-model="res" text="res" />
      <dm_debug_item v-model="fileResult" text="fileResult" />
    </dm_debug_list>

    <el-upload
      class="avatar-uploade"
      :multiple="true"
      :action="actionPath"
      :before-upload="beforeUpload"
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
      res: null,
      fileResult: null,
      postData: {},
      imageUrl: "",
      actionPath: "https://up-z2.qiniup.com" //根据地区的不同，这个直传域名有可能不同
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
    async beforeUpload(file) {
      let time = moment().format("YYYYMMDDHHmmSSsss");
      //请求获取token接口
      let { data } = await axios({
        method: "post",
        url: PUB.urlGetQiniuToken,
        data: {
          options: {//配置项
            forceSaveKey: true,//使用自定义的key
            saveKey: `${time}_${file.name}`,//自定义的key
            //返回数据格式y
            returnBody: `{"key":   $(key), "hash": $(etag), "w": $(imageInfo.width), "h": $(imageInfo.height),
            "size": $(fsize),
            "bucket": $(bucket),
            "fname": $(fname),
            "ext": $(ext),
            "time": "$(year)-$(mon)-$(day) $(hour):$(min):$(sec) ",
            }`
          }
        }
      });

      console.log("data", data);

      let { token } = data;
      this.postData.token = token;

      // this.postData.forceSaveKey = true;
      // this.postData.saveKey = "$(imageInfo.width)";
      console.log("file", file);
      const isLt2M = file.size / 1024 / 1024 < 200;

      if (!isLt2M) {
        this.$message.error("上传文件大小不能超过 200MB!");
      }
      return isLt2M;
    }
  },
  async created() {
    this.$store.commit("changeActiveMenu",'upload_qiniu');
    // var token;
    // var policy = {};
    // var bucketName = "test";
    // var AK = "NRMJl2D1rXCOG3G9lqUAraOAkNzNxIn84n4iYbJ0";
    // var SK = "CA9R-Qlijmw-WcAS2CDDyBGmh7zxW42y6f1TRsxI";
    // var deadline = Math.round(new Date().getTime() / 1000) + 3600;
    // policy.scope = bucketName;
    // policy.deadline = deadline;
    //  policy.forceSaveKey = true;
    //  policy.saveKey = "1234";//指定文件名
    // token = genUpToken(AK, SK, policy);
    // console.log("token", token);
    // this.postData.token = token;
  }
};
</script>

<style>
</style>
