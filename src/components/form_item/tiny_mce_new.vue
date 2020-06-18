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
  props: ['value', "cf"],
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
      var file = blobInfo.blob();

      let { data: dataToken } = await util.getQiNiuToken(file)//调用：{ajax获取七牛云token的函数}
      let { token } = dataToken




      let { data } = await util.uploadQiNiuFile({ file, token })//调用：{ajax上传文件到七牛云的函数}

      if (data.key) {
        let src = dataToken.downloadDomain + '/' + data.key
        succFun(src)
        //调用：{ajax添加一个文件本部信息函数}
        util.ajaxAddFileBaseInfo({ fileSource: "tiny_mce", fileUrl: src, responseQiniu: data })
      } else {
        failFun(alert('图片上传失败'))
      }
    }
  },
  async mounted() {
    // tinymce.init({});





    let cfTiny = {
      // language_url: '/tinymce_new/langs/zh_CN.js',
      // skin_url: '/tinymce_new/skins/ui/oxide',

      selector: `#${this.id}`,
      language: 'zh_CN', // 需要在官网自己下载一个全局的langs包。同时我提供的powerpaste本身自带一个langs包里面含中文，所以可以100%支持中文。
      plugins: [
        // plugins中，用powerpaste替换原来的paste
        'quickbars', 'lists', 'image', 'autoresize', 'code', 'link', 'autolink', 'codesample', 'table', 'powerpaste',

      ],
      menubar: false,
      statusbar: false,
      // inline: true,
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
      images_upload_handler: this.uploadingImg,//图片上传配置
      contextmenu: "bold italic forecolor  fontcolor| link image imagetools table spellchecker",
      // quickbars_insert_toolbar: 'quickimage quicktable',
      quickbars_selection_toolbar: 'bold  forecolor | link  quickimage |removeformat',
      setup: (editor) => {
        ED = editor;//赋值
        editor.on('input change undo redo execCommand KeyUp', (e) => {
          this.$emit('input', editor.getContent());//往组件外传值
        })
      }
    }
    if (this.cf) {//如果{配置}存在
      Object.assign(cfTiny, this.cf);//合并对象
    }

    await util.loadJs({ url: PUB.urlJS.tinymce })//加载



    tinymce.init(cfTiny)



  },
  beforeCreate() {
  },
  created() {


  }
};
</script>


<style>
.tox-silver-sink {
  z-index: 10000 !important;
}
</style>





