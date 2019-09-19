<template>
  <div class="tinymce-box">
        <Editor v-model="myValue"
          :init="init"
          :disabled='false'
            >
        </Editor>
    </div>
</template>
<script>
import tinymce from 'tinymce/tinymce' //tinymce默认hidden，不引入不显示
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'
import 'tinymce/plugins/image'// 插入上传图片插件
import 'tinymce/plugins/table'// 插入表格插件
import 'tinymce/plugins/lists'// 列表插件
import 'tinymce/plugins/autoresize'
import 'tinymce/plugins/code'
import 'tinymce/plugins/link'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/nonbreaking'
import 'tinymce/plugins/codesample'
export default {
  components:{
        Editor
    },
    name:'tinymce',
    props:['value','showToolbar'],
    watch:{
    myValue:{
      handler(){
        this.$emit('input',this.myValue)
      },
      immediate:true
    }
  },
  data() {
    return {
      init: {
        language_url: '/tinymce/langs/zh_CN.js',
        language: 'zh_CN',
        skin_url: '/tinymce/skins/ui/oxide',
        plugins:'lists image  table  autoresize code link autolink codesample',
        menubar: false,
        statusbar: false,
        toolbar:'undo redo |  formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image  table code link codesample| removeformat',
        autoresize_bottom_margin: 10, 
        max_height:400,
        min_height:200,
        autoresize_on_init: true,
        autoresize_overflow_padding: 10,
        images_upload_handler: this.uploadingImg,
        default_link_target: "_blank"
      },
      myValue:this.value
    }
  },

  methods: {
   async uploadingImg(blobInfo, succFun, failFun){
       var img = blobInfo.blob();
       console.log(img);
       let time = moment().format("YYYYMMDDHHmmSSsss");
      let requestData = await axios({
        method: "post",
        url:PUB.urlGetQiniuToken,
        data: {
          options: {
            //配置项
            forceSaveKey: true, //使用自定义的key
            saveKey: `${time}_${img.name}`, //自定义的key
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
       let formData = new FormData()
       formData.append("file",img)
       formData.append('token',requestData.data.token)
      let { data } = await axios({
        method: "post",
        url:window.PUB.urlUpload,
        data:formData,
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded'
        } 
      })
      if (data.key) {
       let src = requestData.data.downloadDomain+'/'+data.key
        succFun(src)
      }else{
        failFun(alert('图片上传失败'))
      }
    }
  },
  mounted(){
    tinymce.init({});
    
  },
  created(){
    if (!this.showToolbar) {
      this.init.toolbar = false
    }
  }
};
</script>


<style>
    .tox-silver-sink{
        z-index: 10000!important;
    }
</style>





