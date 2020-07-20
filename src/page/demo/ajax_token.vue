<template>
  <div>
    <el-alert
      title="node.js配合jwt(jsonwebtoken)来实现token的生成和校验，前端在ajax请求时在headers加上token数据"
      type="warning"
    ></el-alert>

    <dm_pannel_new class title="token附加参数设置">
      <div class="PT10">
        <dm_dynamic_form :cf="cfForm" v-model="formData"></dm_dynamic_form>
      </div>
    </dm_pannel_new>

    <dm_pannel_new class="MB20" title="生成/更新token">
      <dm_space height="10"></dm_space>
      <el-button plain @click="getToken" size="mini">测试getToken</el-button>

      <div class="MB10 MT10">
        <el-input
          type="textarea"
          :rows="4"
          placeholder="请输入内容"
          v-model="token"
          @change="changeTextarea"
        ></el-input>
      </div>
    </dm_pannel_new>

    <dm_pannel_new class="MB20" title="测试生成的token">
      <dm_space height="10"></dm_space>
      <el-button plain @click="validToken" size="mini">测试validToken接口</el-button>
      <div class="MT10">校验结果：{{dataValid}}</div>
      <dm_space height="20"></dm_space>
      <el-button plain @click="getData" size="mini">测试testWithToken接口（需要校验token）</el-button>
      <div class="MT10">请求结果：{{dataResult}}</div>
    </dm_pannel_new>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      token: localStorage.tokenCurr,
      dataValid: null,
      formData: {
        trueName: "张三", title: "title1111",
      },
      //查询表单配置
      cfForm: {
        size: "mini",
        formItems: [
          F_ITEMS.trueName,
          F_ITEMS.title,
        ],

      },
      dataResult: null,
    };
  },
  methods: {
    changeTextarea() {
      console.log(`changeTextarea:#####`);
      localStorage.tokenCurr = this.token
    },
    async getToken() {
      let { data } = await util.ajaxWithToken({//请求接口
        method: "post", url: `${PUB.domain}/info/getToken`,
        data: {//传递参数
          formData: this.formData,
        }
      });
      this.token = data.token
      localStorage.tokenCurr = this.token
    },
    async validToken() {

      let { data } = await util.ajaxWithToken({//请求接口
        method: "post", url: `${PUB.domain}/info/validToken`,
        data: {//传递参数

        }
      });
      this.dataValid = data
    },
    async getData() {
      let { data } = await util.ajaxWithToken({//请求接口
        method: "post", url: `${PUB.domain}/info/testWithToken`,
        data: {//传递参数

        }
      });
      this.dataResult = data
    },

  },
  created() { },
  async mounted() {
    let T = this;
    //函数：{智慧耕专用的ajax函数}
    util.ajaxWithToken = function (obj) {
      let { url } = obj;
      let headers = {
        // 'Token': T.token,//携带token,存储在localStorage
        'Token': localStorage.tokenCurr,//携带token,存储在localStorage
      }
      //调用：{获取智慧耕请求服务的公共headers函数}
      return axios({//请求接口
        method: "post", headers, ...obj, url
      });
    }







  }
};
</script>

<style scoped>
</style>
