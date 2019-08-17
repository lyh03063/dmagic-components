<template>
  <span>
    <slot :doc="doc">{{text}}</slot>
  </span>
</template>

<script>
export default {
  props: {
    id: [String, Number],
    ajax: {
      default: function() {
        return {
          url: "",
          param: {}
        };
      }
    },
    idKey: {
      default: "id"
    },
    page: {
      default: "tangball_franchisee"
    },
    populateKey: {
      default: "name"
    }
  },
  data() {
    return {
      text: "",
      doc: {}
    };
  },
  watch: {
    id: {
      async handler(newName, oldName) {
        this.ajaxGetData();
      }
      // immediate: true
      // deep: true
    }
  },
  methods: {
    async ajaxGetData() {
      if (!this.ajax.url) return;
      if (!(this.id || this.ajax.param)) return;
      this.keyExit = `${this.page}__${this.idKey}__${this.id}`;

      if (this.ajax.param) {
        let str= JSON.stringify(this.ajax.param)
        this.keyExit +=`__${str}`
      }

      console.log("this.keyExit", this.keyExit);

      //函数：{获取缓存数据的函数}
      var getExitDoc = () => {
        let docExit = PUB_ajax_populate[this.keyExit];
        //如果为pending...，表示请求已经发出但还没有完成
        if (docExit == "pending...") {
          setTimeout(() => {
            //延迟函数
            getExitDoc();
          }, 100);
        } else {
          //请求已完成
          console.log("获取到缓存的数据");
          this.doc = docExit; //****** */
          this.text = docExit[this.populateKey];
        }
      };
      if (PUB_ajax_populate[this.keyExit]) {
        return getExitDoc(); //调用：{获取缓存数据的函数}
      }

      /**以下是在没用读取到缓存数据，才发送ajax请求 */
      PUB_ajax_populate[this.keyExit] = "pending...";
      this.ajax.param = this.ajax.param;
      if (this.id) {
        this.ajax.param[this.idKey] = this.id;
      }

      let { data } = await axios({
        //请求接口
        method: "post",
        url: PUB.domain + this.ajax.url,
        data: this.ajax.param //传递参数
      }).catch(function(error) {
        alert("异常:" + error);
      });

      this.doc = data.Doc || {};

      //Q1:{文档存在}
      if (this.doc) {
        this.text = this.doc[this.populateKey];
        PUB_ajax_populate[this.keyExit] = this.doc; //缓存数据
      } else {
        //Q2:{文档不存在}
        this.text = "[error]";
        PUB_ajax_populate[this.keyExit] = {}; //缓存数据
      }
    }
  },
  created() {
    window.PUB_ajax_populate = window.PUB_ajax_populate || {};
    if (this.page) {
      //如果{000}000
      this.ajax.url = `/crossDetail?page=${this.page}`;

      this.ajaxGetData();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
