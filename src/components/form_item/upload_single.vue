<template>
  <div class="item-box">
    <dm_debug_list>
      <dm_debug_item v-model="cf" text="cf" />
      <dm_debug_item v-model="valueNeed" text="valueNeed" />
    </dm_debug_list>

    <el-upload
      v-bind="cf.cfUpload"
      :on-success="uploaded"
      :before-upload="beforeUpload"
      :on-remove="handleRemove"
      :data="postData"
    >
      <div class="avatar-uploader" v-if="cf.isAvatar">
        <img v-if="valueNeed" :src="valueNeed" class="avatar" />
        <i v-if="!valueNeed" class="el-icon-plus avatar-uploader-icon"></i>
      </div>
      <div class v-else>
        <img v-if="valueNeed" :src="valueNeed" style="max-width:160px;max-height:160px" />
        <el-button v-else plain size="mini">点击上传</el-button>
      </div>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: "upload_single",
  props: {
    value: [String],
    cf: {
      default: function () {
        return {}
      },
      type: [Object]
    }
  },
  watch: {
    valueNeed: {
      handler(newVal, oldVal) {
        //变动后的回调
        this.$emit("input", newVal); //同步valueNeed值到value
      },
      // immediate: true,//组件初始化时立即执行一次变动
      deep: true //深度监听
    },
    value: {
      handler(newVal, oldVal) {
        //变动后的回调
        this.valueNeed = newVal; //同步valueNeed值
      },
      immediate: true,//组件初始化时立即执行一次变动
    }
  },
  data() {
    return {
      postData: {},//上传图片时发送的数据
      valueNeed: this.value,

    };
  },
  methods: {
    //处理图片删除后的同步
    handleRemove(file, fileList) {
      this.valueNeed = null;
    },
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
    uploaded(response) {
      //  response= util.parseJson(response)//转成json
      let { key, fname } = response;
      let url = `${this.downloadDomain}/${key}`; //图片的绝对路径
      this.valueNeed = url; //

      //调用：{ajax添加一个文件本部信息函数}
      util.ajaxAddFileBaseInfo({ fileSource: "upload_single", fileUrl: url, responseQiniu: response })
    },
  },
  created() {


    let cfUpload = this.cf.cfUpload || {}

    //上传默认配置
    let cfUploadDefault = {
      "action": window.PUB.urlUpload,//window.PUB.urlUpload
      "show-file-list": !this.cf.isAvatar,//如果是头像，则不显示文件列表
      "limit": 1
    }


    util.setObjDefault(cfUpload, cfUploadDefault);
    //两层配置结构，为了更好拓展
    // this.cf.cfUpload = cfUpload

    util.setObjDefault(this.cf, {
      isAvatar: false,//是否为头像
      cfUpload: cfUpload,

    });


  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item-box >>> .el-upload--text {
  /* display: none; */
}
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader >>> .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
