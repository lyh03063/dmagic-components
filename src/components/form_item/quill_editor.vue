<template>
  <div class>
    <!--富文本编辑器组件-->
    <quillEditor v-model="valueNeed" :options="editorOption" ref="myQuillEditor"></quillEditor>
     <!-- 图片上传组件辅助-->
    <el-upload
      id="quill-upload"
      class="avatar-uploader"
      :action="serverUrl"
      :data="postData"
      name="file"
      :show-file-list="false"
      :on-success="uploadSuccess"
      :on-error="uploadError"
      :before-upload="beforeUpload"
      v-show="false"
    ></el-upload>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor,Quill} from "vue-quill-editor";
import quillConfig from "../../assets/js/quill-config.js";
import { ImageDrop } from '../../assets/js/ImageDrop'
import ImageResize from 'quill-image-resize-module'
Quill.register('modules/imageDrop', ImageDrop)
Quill.register('modules/imageResize', ImageResize)

// import upload_img from "../../components/form_item/upload_img.vue";

// 工具栏配置
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    [{ 'color': [] }, { 'background': [] }],
    [{ 'font': ['宋体','黑体'] }],//这里是传入的字体配置
  ['blockquote', 'code-block'],
   [{ list: "ordered" }, { list: "bullet" }],
  ['clean'],                                   // remove formatting button
  [], //新添加的工具
 
  [{ align: [] }],
  ["link", "image", "video"],
  [
      { 'table-body': 'TBODY' },
      { 'table-insert-rows': 'ITR' },
      { 'table-insert-columns': 'TIC' },
      { 'table-delete-rows': 'IDR' },
      { 'table-delete-columns': 'TDC' },
      { 'table-delete-body': 'TDB' }
    ]
];

export default {
  components: {
    //注册组件
    quillEditor
  },
  mixins: [MIX.form_item], //混入
  props: {},

  data() {
    return {
      postData: {},
      // editorOption: quillConfig,
      serverUrl: window.PUB.urlUpload, // 这里写你要上传的图片服务器地址
      // header: { token: 123 }, // 有的图片服务器要求请求头需要有token之类的参数，写在这里
      detailContent: "", // 富文本内容
      editorOption: {
        placeholder: "",
        theme: "snow", // or 'bubble'
        modules: {
          imageDrop: true,
          imageResize: true,
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              image: function(value) {
                if (value) {
                  console.log(document.querySelector("#quill-upload input"));
                  
                  document.querySelector("#quill-upload input").click();
                } else {
                  this.quill.format("image", false);
                }
              },
              'table-body': function (val) {
        this.quill.getModule('table').insertTable(2, 2) // this引用工具栏实例, val表示按钮是否处于活动状态active
      },
      'table-insert-rows': function () {
        this.quill.getModule('table').insertRowBelow()
      },
      'table-insert-columns': function () {
        this.quill.getModule('table').insertColumnRight()
      },
      'table-delete-rows': function () {
        this.quill.getModule('table').deleteRow()
      },
      'table-delete-columns': function () {
       this.quill.getModule('table').deleteColumn()
      },
      'table-delete-body': function () {
        this.quill.getModule('table').deleteTable()
      }
            }
          }
        }
      }
    };
  },

  methods: {
    // 富文本图片上传前
    async beforeUpload(file) {
      console.log("beforeUpload-1");
      // 显示loading动画
      this.quillUpdateImg = true;
  
      let time = moment().format("YYYYMMDDHHmmSSsss");
          console.log("beforeUpload-2");
      //请求获取token接口

      let { data } = await axios({
        method: "post",
        url: PUB.urlGetQiniuToken,
        data: {
          options: {
            //配置项
            forceSaveKey: true, //使用自定义的key
            saveKey: `${time}_${file.name}`, //自定义的key
            //返回数据格式y
            returnBody: `{"key":   $(key), "hash": $(etag), "w": $(imageInfo.width), "h": $(imageInfo.height), 
            "size": $(fsize),
            "bucket": $(bucket),
            "fname": $(fname),
            "ext": $(ext),
            "time": "$(year)-$(mon)-$(day) $(hour):$(min):$(sec) "
            }`
          }
        }
      });


      console.log("beforeUpload-3");
      console.log("data", data);
      let { token, downloadDomain } = data;
       this.downloadDomain = downloadDomain; //更新七牛云下载域名
      this.postData.token = token;
    },

    uploadSuccess(response, file) {
      // res为图片服务器返回的数据
      // 获取富文本组件实例
      let quill = this.$refs.myQuillEditor.quill;
      // 如果上传成功
      if (response.key) {
        let { key, fname } = response;
      let url = `${this.downloadDomain}/${key}`; //图片的绝对路径
        // 获取光标所在位置
        let length = quill.getSelection().index;
        // 插入图片 
        quill.insertEmbed(length, "image", url);
        // 调整光标到最后
        quill.setSelection(length + 1);
      } else {
        this.$message.error("图片插入失败");
      }
      // loading动画消失
      this.quillUpdateImg = false;
    },

    // 富文本图片上传失败
    uploadError() {
      // loading动画消失
      this.quillUpdateImg = false;
      this.$message.error("图片插入失败");
    }
  },
  mounted() {
    //在mounted钩子里面初始化富文本的样式
    // quillConfig.initButton();
    console.log('window.PUB.urlUpload',window.PUB.urlUpload);
    
  }
};
</script>

<style scoped>
</style>
