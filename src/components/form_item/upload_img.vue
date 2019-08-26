<template>
  <div class="upload_box">
    <dm_debug_list>
        <dm_debug_item v-model="isExceed" text="isExceed" />
      <dm_debug_item v-model="valueNeed" text="图片列表" />
      <dm_debug_item v-model="uploadConfigNeed" text="uploadConfigNeed" />
    </dm_debug_list>
      <!-- :file-list="valueNeed"这个会导致出现两次动画 -->
    <el-upload
    :class="{'exceed':isExceed}"
      :limit="uploadConfigNeed.limit"
      :action="uploadConfigNeed.action"
      :list-type="uploadConfigNeed.listType"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="uploaded"
      :on-exceed="exceed"
      :before-remove="beforeRemove"

      name="ImgParame"
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

    <draggable v-model="valueNeed" v-if="changeOrder">
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
import draggable from "vuedraggable";
// action="https://jsonplaceholder.typicode.com/posts/"
export default {
  props: {
    uploadConfig: {
      type: Object
    }
  },
  mixins: [MIX.form_item], //混入
  components: { draggable },
  data() {
    return {
      uploadConfigNeed: this.uploadConfig || {},
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
      handler(newName, oldName) {
        this.initConfig(); //函数：{初始化配置函数}
      },
      immediate: true,
      deep: true
    },
    //这个处理从mounted移到这边，主要是考虑后期value还是有可能为空
    value: {
      handler(newName, oldName) {
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
    //处理图片上传后的同步
    uploaded(response) {
      console.log("response", response);
      let { key, downloadDomain, originalname } = response;
      let url = `${downloadDomain}/${key}`; //图片的绝对路径
      this.valueNeed.push({ url, name: originalname }); //
    },

    //处理图片删除后的同步
    handleRemove(file, fileList) {
      console.log(file, fileList);
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
  mounted() {}
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
.exceed >>> .el-upload{
  display:none
  /* float: left; */
  /* display: block; */
 
  /* text-align: left */
}


</style>
