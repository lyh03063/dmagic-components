<template>
  <div class="tinymce-box">
    <textarea :id="id" v-model="myValue"></textarea>
  </div>
</template>
<script>
let ED
export default {
  components: {},
  name: 'tinymce_new',
  props: ['value',  "cf"],
  watch: {
    value(val) {
      //  ED.setContent(val);//编辑器填充内容-这里光标会跳动！！！先不搞

    }
  },
  data() {
    return {
      id: `id_tinymce_${util.getTimeRandom()}`,//随机id，用于tiny_mce初始化
      myValue: this.value
    }
  },

  methods: {

    async uploadingImg(blobInfo, succFun, failFun) {
      var img = blobInfo.blob();
      let time = moment().format("YYYYMMDDHHmmSSsss");
      let requestData = await axios({
        method: "post",
        url: PUB.urlGetQiniuToken,
        data: {
          options: {
            //配置项
            forceSaveKey: true, //使用自定义的key
            saveKey: `${time}_${img.name}`, //自定义的key
            //返回数据格式y
            returnBody: `{      "key": $(key), "hash": $(etag), "w": $(imageInfo.width), "h": $(imageInfo.height),
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
      formData.append("file", img)
      formData.append('token', requestData.data.token)
      let { data } = await axios({
        method: "post",
        url: window.PUB.urlUpload,
        data: formData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      if (data.key) {
        let src = requestData.data.downloadDomain + '/' + data.key
        succFun(src)
      } else {
        failFun(alert('图片上传失败'))
      }
    }
  },
  mounted() {
    console.log(`初始化:${this.id}`);
    // tinymce.init({});
    // tinymce.activeEditor.getBody().setAttribute('contenteditable', false);
    /****************************这段用于隐藏工具栏的-START****************************/
    if (!this.showToolbar) {
      let execute = false
      let time = setInterval(() => {
        if (tinymce.activeEditor.getBody() != null) {
          execute = true
          tinymce.activeEditor.getBody().setAttribute('contenteditable', false)
        }
        if (execute) {
          clearInterval(time)
        }

      }, 100);
    }
    /****************************这段用于隐藏工具栏的-END****************************/




    let cfTiny = {
      language_url: '/tinymce_new/langs/zh_CN.js',
      skin_url: '/tinymce_new/skins/ui/oxide',

      selector: `#${this.id}`,
      language: 'zh_CN', // 需要在官网自己下载一个全局的langs包。同时我提供的powerpaste本身自带一个langs包里面含中文，所以可以100%支持中文。
      plugins: [
        // plugins中，用powerpaste替换原来的paste
        'powerpaste', 'lists', 'image', 'autoresize', 'code', 'link', 'autolink', 'codesample', 'table',

      ],
      menubar: false,
      statusbar: false,

      toolbar: 'undo redo |  formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image  table code link codesample| removeformat',
      max_height: 400,
      min_height: 200,
      autoresize_on_init: true,
      autoresize_overflow_padding: 10,
      default_link_target: "_blank",
      autoresize_bottom_margin: 10,

      powerpaste_word_import: 'propmt',// 参数可以是propmt, merge, clear，效果自行切换对比
      powerpaste_html_import: 'propmt',// propmt, merge, clear
      // powerpaste_allow_local_images: true,
      paste_data_images: false,//这个已经没什么用了
      images_upload_handler: this.uploadingImg,
      setup: (editor) => {
        ED = editor;//赋值
        editor.on('input change undo redo execCommand KeyUp', (e) => {
          this.$emit('input', editor.getContent());
        })
      }
    }
    if (this.cf) {//如果{配置}存在
      Object.assign(cfTiny, this.cf);//合并对象
    }




    tinymce.init(cfTiny)



  },
  beforeCreate() {
  },
  created() {
    if (!this.showToolbar) {
      this.init.toolbar = false
    }

  }
};
</script>


<style>
.tox-silver-sink {
  z-index: 10000 !important;
}
</style>





